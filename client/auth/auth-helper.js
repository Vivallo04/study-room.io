import { signout } from './api-auth.js'
import jwt from "jsonwebtoken";


/**
 * In order to save the JWT credentials that we receive from the 
 * server on successful sign-in, we use the *authenticate* method.
 */
const auth = {
    isAuthenticated() {
        if (typeof window == "undefined") {
            return false;
        }
        if (sessionStorage.getItem('jwt')) {
            return JSON.parse(sessionStorage.getItem('jwt'));
        } else {
            return false;
        }
    },

    authenticate(jwt, cb) {
        if (typeof window !== "undefined")
            sessionStorage.setItem('jwt', JSON.stringify(jwt));
        cb();
    },

    clearJWT(cb) {
        if (typeof window !== "undefined")
            sessionStorage.removeItem('jwt');
        cb();
        //optional
        signout().then((data) => {
            document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        });
    }
};

export default { auth };
