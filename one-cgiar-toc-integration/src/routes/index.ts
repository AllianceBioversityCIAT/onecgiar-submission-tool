import { Router } from "express";
import toc from "./tocRoutes";

const Routes = Router();

Routes.use("/toc", toc);


export default Routes;
