import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression'
import cors from 'cors';
import helmet from 'helmet';

import template from './../template';


// Modules for the server side rendering
import authRoutes from './routes/auth.routes';

/**
 * To handle HTTP requets and serve responses:
 *  - body-parser: Request body-parsing middleware to handle
 *  the complexities of parsing streamable request objects so 
 *  that we can simplify browser-server communication by 
 *  exchanging JSON in the request body.  
 * 
 *  - cookie-parser: Cookie parsing middleware to parse and set
 *  cookies in request objects. 
 * 
 *  - compression: Compression middleware that will attempt to 
 *  compress response bodies for all requests that traverse through 
 *  the middleware
 *  
 *  - helmet: Collection of middleware function to help secure
 *  Express apps by setting various HTTP headers. 
 * 
 *  - cors: Middleware to enable Cross-Origin Resource Sharing.
 */

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', authRoutes);
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send(template())
});

app.use((err, req, res, next ) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({
            "error": err.name + ":" + err.message
        });
    } else if (error) {
        res.status(400).json({
            "error": err.name + ":" + error.message
        });
        console.log(err);
    }
});


export default app;