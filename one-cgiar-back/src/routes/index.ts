import { Router } from "express";
import auth from "./AuthRoutes";
import user from "./UserRoutes";
import roles from "./RolesRoutes";
import initiatives from "./InitiativesRoutes";
import stagesControl from "./StagesControl";
import metaData from "./MetaDataRoutes";

const Routes = Router();
Routes.use("/auth", auth);
Routes.use("/users", user);
Routes.use("/roles", roles);
Routes.use("/initiatives", initiatives);
Routes.use("/stages-control", stagesControl);
Routes.use("/meta", metaData);

export default Routes;