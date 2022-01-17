import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression'
import cors from 'cors';
import helmet from 'helmet';

import template from './../template';
import path from 'path';

// Modules for the server side rendering
import authRoutes from './routes/auth.routes';
import userRoutes from "./routes/user.routes";
import devBundle from "./devBundle"; // only for development mode, please comment out on prod

/**
 * To handle HTTP requests and server responses:
 *  - body-parser: Request body-parsing middleware to handle
 *  the complexities of parsing streamable request objects so 
 *  that we can simplify browser-server communication by 
 *  exchanging JSON in the request body.  
 * 
 *  - cookie-parser: Cookie parsing middleware to parse and set
 *  cookies in request objects. 
 * 
 *  - compress: Compression middleware that will attempt to
 *  compress response bodies for all requests that traverse through 
 *  the middleware.
 *  
 *  - helmet: Collection of middleware function to help secure
 *  Express apps by setting various HTTP headers. 
 * 
 *  - cors: Middleware to enable Cross-Origin Resource Sharing.
 */

const app = express();
devBundle.compile(app); // only for development mode, please comment out on prod

const CURRENT_WORKING_DIR = process.cwd();

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send(template())
});

app.use((error, req, res, next ) => {
    if (error.name === "UnauthorizedError") {
        res.status(401).json({
            "error": error.name + ":" + error.message
        });
    } else if (error) {
        res.status(400).json({
            "error": error.name + ":" + error.message
        });
        console.log(error);
    }
});


export default app;