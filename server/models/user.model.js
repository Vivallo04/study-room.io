import mongoose from 'mongoose';

/**
 * Generate a new Mongoose object schema and
 * specify the properties of each document
 * in a collection.
 *
 * The schema will record user-related information
 * such as :
 *  - name
 *  - email
 *  - created at
 *  - last-updated at
 *  - timestamps
 *  - hashed passwords
 *  - the associated unique password
 */


const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        trim: true,
        required: "Name is required"
    },
    email : {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: "Email is required"
    },
    created : {
        type: Date,
        default: Date.now
    },
    updated: Date,
    hashed_password: {
        type: String,
        required: "Password is required"
    },
    salt: String
});


UserSchema
    .virtual('password')
    .set( function(password) {
        this.password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get( function() {
        return this.password;
    });


UserSchema.path('hashed_password').validate( function(valid){
    if (this.password && this.password.length < 8) {
        this.invalidate('password', 'The password must be at least 8 characters long.');
    }
    if (this.isNew && !this.password) {
        this.invalidate('password', "The password is required.");
    }
}, null);

/**
 * UserSchema methods are used to encrypt the user-provideed password
 *  into a hashed password and the salt stored in the user document when
 *  saved to the database on create or update
 *
 *  - authenticate: Called to verify sign-in attempts by
 *    matching the user-provided password text with the
 *    hashed_password stored in the database for the user.
 *
 *  - encryptPassword: Generates an encrypted hash from the
 *    plain-text password and a unique {salt} value using the
 *    crypto module from Node.
 *
 *    We use the SHA1 hashing algorithm and createHmac from
 *    crypto to generate the cryptographic HMAC hash from the
 *    password text and salt pair.
 *
 *
 *  - makeSalt: Generates a unique random salt value using the
 *    current timestamp at execution and Math.random().
 */
UserSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) == this.hashed_password;
    },
    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')

        } catch(error) {
            return ''
        }
    },
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    }
}


export default mongoose.model('User', UserSchema);