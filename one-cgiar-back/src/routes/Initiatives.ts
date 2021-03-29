import { Router } from 'express';
import { getInitiatives, createInitiative, createStage, assignStageToInitiative, assignActArsByInitvStg, assignKeyPartnerByInitvStg, assignTOCsByInitvStg, getInitiativesByUser, getActionAreas, getStage, getUsersByInitiative, getRegions, getCountries } from '../controllers/Initiatives';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';

const router = Router();

// get initiatives
router.get("/", [checkJwt, checkRole('initiatives', 'readAny')], getInitiatives);

// get initiatives by user
router.get("/own", [checkJwt, checkRole('initiatives', 'readOwn')], getInitiativesByUser);

// create initiatives
router.post("/", [checkJwt, checkRole('initiatives', 'createOwn')], createInitiative);

// get users by initiative
router.get("/:initvStgId([0-9]+)/users/", [checkJwt], checkRole('initiatives', 'readOwn'), getUsersByInitiative);

// get stages
router.get("/stages", [checkJwt], getStage);

// create stages
router.post("/stages", [checkJwt, checkRole('stages', 'createAny')], createStage);

// assign stage to initiative
router.post("/assign-stage", [checkJwt, checkRole('initiatives', 'updateOwn')], assignStageToInitiative);

// assign action area to stage by initiative
router.post("/assign-partner", [checkJwt, checkRole('stages', 'updateOwn')], assignKeyPartnerByInitvStg);

// assign TOC file to stage by initiative
router.post("/assign-files", [checkJwt, checkRole('stages', 'updateOwn')], assignTOCsByInitvStg);



/**
 * 
 * CLARISA
 * 
 */


//get Action areas
router.get("/areas", [checkJwt], getActionAreas);
//get regions
router.get("/regions", [checkJwt], getRegions);
//get countries
router.get("/countries", [checkJwt], getCountries);

export default router;