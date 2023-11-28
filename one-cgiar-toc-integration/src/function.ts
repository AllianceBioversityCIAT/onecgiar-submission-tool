import express from "express";
import cors from "cors";
import Routes from "./routes";
import 'reflect-metadata';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", Routes);

module.exports = app;
