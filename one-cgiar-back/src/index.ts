import 'reflect-metadata';
import express from 'express';
// import bodyParser from "body-parser";
import cors from 'cors';
import helmet from 'helmet';
import { createConnection } from 'typeorm';
import { startAccsCtrl } from './middlewares/access-control';
import { startMulter } from './middlewares/multer';


import Routes from './routes';
import { errorHandler } from './middlewares/error-handler';
import path from 'path';
import { BaseError } from './handlers/BaseError';


require('dotenv').config();

if (!process.env.PORT) {
    process.exit(1);
}

// get the unhandled rejection and throw it to another fallback handler we already have.
process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
    throw new BaseError(reason.name,503, reason.message, true);
});

process.on('uncaughtException', (error: Error) => {
    errorHandler.handleError(error);
    if (!errorHandler.isTrustedError(error)) {
        process.exit(1);
    }
});

const parentDir = require('path').resolve(process.cwd(), '../');
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
const HOST = process.env.HOST;

createConnection()
    .then(async (connection) => {
        const app = express();
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        // middlewares
        startAccsCtrl();
        startMulter(parentDir);

        app.use(cors());
        app.use(helmet(
            { frameguard: false }
        ));

        app.use(function (req, res, next) {
            res.setHeader(
                "Content-Security-Policy", "script-src 'self' https://apis.google.com http://clarisatest.ciat.cgiar.org/api/ https://initiativestest.ciat.cgiar.org/apiClarisa/*"
            );
            res.setHeader('Cross-Origin-Resource-Policy', 'same-site')
            next();
        });

        app.use(express.static(parentDir + '/one-cgiar-front/dist/submission-tool'));

        // if connection timed out go next()
        // app.use(function (req, res, next) {
        //     res.setTimeout(12000, async function () {
        //         console.log('Request has timed out.');
        //         // await connection.close();
        //         next()
        //     });
        //     // next();

        // });

        console.log(path.resolve('./uploads'))
        // public files
        app.use(express.static('public'))
        // app.use('/public', express.static(path.resolve('./uploads')));

        // routes
        app.use("/api", Routes);

       // load front
        app.get('/', (req, res) => {
            res.sendFile(parentDir + "/one-cgiar-front/dist/submission-tool/index.html")
        });

        app.all('*', (req: any, res: any) => {
            console.log(`[TRACE] Server 200 request: ${req.originalUrl}`);
            res.status(200).sendFile(parentDir + "/one-cgiar-front/dist/submission-tool/index.html");
        });

        app.listen(PORT, `${HOST}`, () => {
            console.log(path.join(parentDir, 'uploads'))
            console.log(`Current parent directory: ${parentDir} `);
            console.log(`Server started on port ${PORT} and host ${HOST}!`);
        });
    })
    .catch(error => {
        console.log('error typeorm connection')
        console.log(error);
    });