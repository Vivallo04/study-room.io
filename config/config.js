/**
 * The config variables are defined as follows:
 * env: To differentiate between development and production
 * port: To define the listening port for the server
 * jwtSecret: The secret key to be used to sign JWT
 * mongoUri: The location of the MongoDB database instance
 */
const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "Study_Key",
    mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST ||
        'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017') + '/studyroom-development'
};

export default config;