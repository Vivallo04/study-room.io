import mongoose from 'mongoose';
import config from '../config/config';
import app from './express';

import environments from "./environments/environment";
import {environmentDevelopment} from "./environments/environment.development";
import {environmentProduction} from "./environments/environment.production";
import {environmentIntegration} from "./environments/environment.integration";
import {environmentStage} from "./environments/environment.stage";



let environment = environments;

switch (config.env) {
    case "development":
        console.info("Initializing " + `${config.env.toString()}` + " mode");
        environment = environmentDevelopment;
        break;
    case "integration":
        console.info("Initializing " + `${config.env.toString()}` + " mode");
        environment = environmentIntegration;
        break;
    case "stage":
        console.info("Initializing " + `${config.env.toString()}` + " mode");
        environment = environmentStage;
        break;
    case "production":
        console.info("Initializing " + `${config.env.toString()}` + " mode");
        environment = environmentProduction;
        break;
    default:
        console.info("Initializing " + `${config.env.toString()}` + " mode");
        environment = environmentDevelopment;
}

// Configure Mongoose and define a connection with the MongoDB database
mongoose.Promise = global.Promise;
    mongoose.connect(environment.baseUrls.mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

/**
 * If connected successfully to the database print it.
*/
mongoose.connection.on('connected', () => {
    console.log(`Successfully connected to the database: ${environment.baseUrls.mongoUri}`);
});

/**
 * Return an error if unable to connect to the database.*/
mongoose.connection.on('error', () => {
    throw new Error(`Unable to connect to database: ${environment.baseUrls.mongoUri}`);
});


/**
 * Start the server with the Express App.
 */
app.listen(environment.port, function onStart(error) {
    if (error) {
        console.log(error);
    }
    console.info('Server start on port %s', environment.port);
});