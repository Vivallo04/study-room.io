/**
 * This class fetches the user's information.
 * The methods access each user CRUD API endpoints, which
 * the React components use to exchange user data with the
 * server and database as required.
 */


/**
 * Takes user data from the view component, which
 * is where this method is invoked.
 * @param user
 * @returns {Promise<any>}
 */
const create = async(user) => {
    try {
        // Fetch the information from the component and make a POST call.
        let response = await fetch('api/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (e) {
        console.log(e);
    }
};


/**
 * Retrieves all the users in the database.
 * @param signal
 * @returns {Promise<any>}
 */
const list = async(signal) => {
    try {
        let response = await fetch('api/users/', {
            method: 'GET',
            signal: signal,
        });
        return await response.json();
    } catch (e) {
        console.log(e);
    }
};


/**
 * Retrieves a specific user by ID.
 * @param params
 * @param credentials
 * @param signal
 * @returns {Promise<any>}
 */
const read = async(params, credentials, signal) => {
    try {
        let response = await fetch('/api/users/' + params.userByID, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + credentials.t
            }
        });
        return await response.json();
    } catch (e) {
        console.log(e);
    }
};


/**
 *
 * @param params
 * @param credentials
 * @param user
 * @returns {Promise<any>}
 */
const update = async(params, credentials, user) => {
    try {
        let response = await fetch('api/users/' + params.userByID, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + credentials.t
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};


/**
 *
 * @param params
 * @param credentials
 * @returns {Promise<any>}
 */
const remove = async(params, credentials) => {
    try {
        let response = await fetch('api/users/', + params.userByID, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + credentials.t
            }
        });
        return await response.json();
    } catch (e) {
        console.log(e);
    }
};


export { create, list, read, remove, update};