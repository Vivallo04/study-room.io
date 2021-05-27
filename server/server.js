import express from 'express'
import devBundle from "./devBundle"
import path from 'path'
import {MongoClient} from 'mongodb'
import template from './../template'


const app = express();
const url = process.env.MONGODB_URI || 'mongodb: //localhost:27017/studyroom';

app.get('/', (req, res) => {
    res.status(200).send(template())
});

MongoClient.connect(url, (error, db) => {
    console.log("Connected succesfully to mongodb server");
    if (db) {
        db.close();
    }
});

devBundle.compile(app);


const CURRENT_WORKING_DIR = process.cwd();

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

let port = process.env.port || 3000;

app.listen(port, function onStart(error) {
    
    if (error) {
        console.log(error);
    }
    console.info('Server start on port %s', port);
});