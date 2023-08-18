import express from "express";
import cors from "cors";
import Routes from "./routes";
import {createConnection} from 'typeorm';
import 'reflect-metadata';
import morgan from 'morgan';

const app = express();
createConnection();
app.use(morgan('dev'));
app.set('port',3800)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", Routes);

app.listen(app.get('port'),()=>{
    console.log('server on port',app.get('port'));
    
})

module.exports = app;