import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression'
import cors from 'cors';
import helmet from 'helmet';

import template from './../template';


// Modules for the server side rendering




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
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send(template())
});


export default app;