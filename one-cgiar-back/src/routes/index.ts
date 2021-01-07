import { Router, Request, Response } from "express";
import auth from "./Auth";
import user from "./User";
import roles from "./Roles";

const Routes = Router();
Routes.use("/auth", auth);
Routes.use("/users", user);
Routes.use("/roles", roles);

export default Routes;