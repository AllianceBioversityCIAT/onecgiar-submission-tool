
import { Router } from "express";
import { getMenu } from "../controllers/MetaDataController";
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";


const router = Router();

// get menu per stage
router.get("/menu/:initiativeId([0-9]+)/:stageId([0-9]+)", [checkJwt, checkRole('initiatives', 'readOwn')], getMenu);

export default router;