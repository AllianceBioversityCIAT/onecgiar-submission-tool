import { Router } from "express";
import { getGeneralInformation, upsertGeneralInformation } from "../controllers/StageFullProposal";
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";

const router = Router();

// get initiative general information
router.get("/:initiativeId([0-9]+)/general-information", [checkJwt, checkRole('initiatives', 'readOwn')], getGeneralInformation);

// upsert initiative general information
router.patch("/:initiativeId([0-9]+)/general-information", [checkJwt, checkRole('initiatives', 'updateOwn')], upsertGeneralInformation);

export default router;