import { Router } from 'express';
import { getInitiatives, createInitiative, createStage, assignStageToInitiative, assignActArsByInitvStg, assignKeyPartnerByInitvStg, assignTOCFilesByInitvStg, getInitiativesByUser } from '../controllers/Initiatives';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';

const router = Router();

// get initiatives
router.get("/", [checkJwt, checkRole('initiatives', 'readAny')], getInitiatives);

// get initiatives by user
router.get("/own", [checkJwt, checkRole('initiatives', 'readOwn')], getInitiativesByUser);

// create initiatives
router.post("/", [checkJwt, checkRole('initiatives', 'createOwn')], createInitiative);

// create stages
router.post("/stages", [checkJwt, checkRole('stages', 'createOwn')], createStage);

// assign stage to initiative
router.post("/assign-stage", [checkJwt, checkRole('initiatives', 'updateOwn')], assignStageToInitiative);

// assign action area to stage by initiative
router.post("/assign-partner", [checkJwt, checkRole('stages', 'updateOwn')], assignKeyPartnerByInitvStg);

// assign TOC file to stage by initiative
router.post("/assign-files", [checkJwt, checkRole('stages', 'updateOwn')], assignTOCFilesByInitvStg);

export default router;