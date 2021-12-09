import 'reflect-metadata';
import express from 'express';
// import bodyParser from "body-parser";
import {createConnection} from 'typeorm';
import loaders from './loaders';
import {errorHandler} from './middlewares/error-handler';
import path from 'path';
import {BaseError} from './handlers/BaseError';

require('dotenv').config();

if (!process.env.PORT) {
  process.exit(1);
}

// get the unhandled rejection and throw it to another fallback handler we already have.
process.on('unhandledRejection', (reason: Error) => {
  throw new BaseError(reason.name, 503, reason.message, true);
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

    await loaders({expressApp: app});

    app.listen(PORT, `${HOST}`, () => {
      console.log(path.join(parentDir, 'uploads'));
      console.log(`Current parent directory: ${parentDir} `);
      console.log(`Server started on port ${PORT} and host ${HOST}!`);
    });
  })
  .catch((error) => {
    console.log('error typeorm connection');
    console.log(error);
  });
