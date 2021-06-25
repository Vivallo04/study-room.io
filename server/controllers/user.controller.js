import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from './error.controller'

/**
 * This file constains the definitions of the controller
 *  methods that were used in the preceding user route 
 *  declarations as callbacks to be executed when a route 
 *  request is received by the server.
 */
const create = async (req, res, next) => {
    const user = new User(req.body);
    try {
        await user.save();
        return res.status(200).json({
            message: "Successfully signed up!"
        });
    } catch(error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
};


const list = (req, res) => {

;}

const userByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id);
        if (!user) {
            return res.status('400').json({
                error: "User not found"
            });
        req.profile = user;
        next();
        }

    } catch (error) {
        return res.status('400').json({
            error: "Could not retrieve user"
        });
    }
};

const read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

const update = async (req, res, next) => {
    try {
        let user = req.profile;
        user = extend(user, req.body);
        user.updated = Date.now();
        
        await user.save();
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    } catch(error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
};

const remove = async (req, res, next) => {
    try {
        let user = req.profile;
        let deletedUser = await user.remove();
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        res.json(deletedUser);
    
    } catch(error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
};

export default {create , userByID, read, list, remove, update};



