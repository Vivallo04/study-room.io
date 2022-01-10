import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import config from './../../config/config';

// Four controller functions to handle the backend
// user auth using JSON Web Tokens
const signin = async (req, res) => {
    try {
        let user = await User.findOne({
            "email": req.body.email
        });
        if (!user) {
            return res.status('401').json({
                error: "User not found"
            });
        }
        if (!user.authenticate(req.body.password)) {
            return res.status('401').send({
                error: "Email and password don't match."
            });
        }

        const token = jwt.sign({ _id: user._id}, config.jwtSecret);

        res.cookie('t', token, {
            expire: new Date() + 9999
        });

        return res.json({
            token, 
            user: {
                _id: user._id, 
                name: user.name, 
                email: user.email
            }
        });

    } catch (error) {
        return res.status('401').json({
            error: "Could not sign in"
        });
    }
};

/**
 * Clear the response cookie containing the signed JWT. 
 * @param {*} req server request
 * @param {*} res server response
 * @returns 
 */
const signout = async (req, res) => {
    res.clearCookie("t");
    return res.status('200').json({
        message: "Signed out"
    });
};


/**
 * Verify that the incoming request has a valid
 * JWT in the Authorization Header. If the token 
 * is valid, append the verified user's ID to an 'auth' key 
 * to the request object. Otherwise, throw an error. 
 */
const requireSignin = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth', 
    algorithms: ['RS256']
});

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id;
    if (!(authorized)) {
        return res.status('403').json({
            error: "User is not authorized"
        });
    }
    next();
};

export default {signin, signout, requireSignin, hasAuthorization};