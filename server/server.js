import express from 'express'
import devBundle from "./devBundle"
import path from 'path'
import {MongoClient} from 'mongodb'


const app = express();
const url = process.env.MONGODB_URI || 'mongodb: //localhost:27017/study-room'
MongoClient.connect(url, (error, db) => {
    console.log("Connected succesfully to mongodb server");
    db.close();    
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