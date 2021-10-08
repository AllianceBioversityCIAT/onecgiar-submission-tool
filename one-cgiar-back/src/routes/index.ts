import { Router, Request, Response } from "express";
import auth from "./Auth";
import user from "./User";
import roles from "./Roles";
import initiatives from "./Initiatives";
import stagesControl from "./StagesControl";
import metaData from "./MetaDataRoutes";

const Routes = Router();
Routes.use("/auth", auth);
Routes.use("/users", user);
Routes.use("/roles", roles);
Routes.use("/initiatives", initiatives);
Routes.use("/stages-control", stagesControl);
Routes.use("/meta",metaData);

export default Routes;