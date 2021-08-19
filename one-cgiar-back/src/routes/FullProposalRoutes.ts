import { Router } from "express";
import * as stagefull from "../controllers/StageFullProposal";
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";

const router = Router();

// get initiative general information
router.get("/:initiativeId([0-9]+)/general-information", [checkJwt, checkRole('initiatives', 'readOwn')], stagefull.getGeneralInformation);

// upsert initiative general information
router.patch("/:initiativeId([0-9]+)/general-information", [checkJwt, checkRole('initiatives', 'updateOwn')], stagefull.upsertGeneralInformation);

// get initiative context
router.get("/:initiativeId([0-9]+)/context", [checkJwt, checkRole('initiatives', 'readOwn')], stagefull.getContext);

// upsert initiative context
router.patch("/:initiativeId([0-9]+)/context", [checkJwt, checkRole('initiatives', 'updateOwn')], stagefull.upsertContext);

export default router;