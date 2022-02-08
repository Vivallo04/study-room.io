/**
 * The config variables are defined as follows:
 * env: To differentiate between development and production
 * port: To define the listening port for the server
 * jwtSecret: The secret key to be used to sign JWT
 * mongoUri: The location of the MongoDB database instance
 */
const config = {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET || "Study_Key",
};

export default config;