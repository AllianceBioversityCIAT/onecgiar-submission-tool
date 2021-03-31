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


require('dotenv').config();

if (!process.env.PORT) {
    process.exit(1);
}

// get the unhandled rejection and throw it to another fallback handler we already have.
process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
    throw reason;
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
    .then(async () => {
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
        app.use(express.static(parentDir + '/one-cgiar-front/dist/submission-tool'));

        
        // public files
        app.use('/public', express.static(path.join(parentDir, 'uploads')));

        // routes
        app.use("/api", Routes);

        //load front
        app.get('/', (req, res) => {
            res.sendFile(parentDir + "/one-cgiar-front/dist/submission-tool/index.html")
        });

        app.all('*', (req: any, res: any) => {
            console.log(`[TRACE] Server 404 request: ${req.originalUrl}`);
            console.log(parentDir + '/uploads')
            res.status(200).sendFile(parentDir + "/one-cgiar-front/dist/submission-tool/index.html");
        });

        app.use((err: any, req: any, res: { setHeader: (arg0: string, arg1: string) => void; }, next: any) => {
            res.setHeader('Cross-Origin-Resource-Policy', 'same-site')
            console.log(err)
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