import mongoose from 'mongoose';
import config from './../config/config'
import app from './express';


// Configure Mongoose and define a connection with the MongoDB database
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then();

/**
 * If connected successfully to the database print it.
 */
mongoose.connection.on('connected', () => {
    console.log(`Successfully connected to the database: ${config.mongoUri}`);
});

/**
 * Return an error if unable to connect to the database.
 */
mongoose.connection.on('error', () => {
    throw new Error(`Unable to connect to database: ${config.mongoUri}`);
});


/** 
 * Start the server with the Express App.
 */
app.listen(config.port, function onStart(error) {
    if (error) {
        console.log(error);
    }
    console.info('Server start on port %s', config.port);
});