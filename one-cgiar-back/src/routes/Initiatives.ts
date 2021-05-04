import { Router } from 'express';
import { getClaInstitutions, getClaRegions } from '../controllers/Clarisa';
import { getInitiatives, createInitiative, createStage, assignStageToInitiative, assignActArsByInitvStg, assignTOCsByInitvStg, getInitiativesByUser, getActionAreas, getStage, getUsersByInitiative,  getCountries, assignUsersByInitiative, getUserRoleByInitiative } from '../controllers/Initiatives';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';

const router = Router();

// get initiatives
// router.get("/", [checkJwt, checkRole('initiatives', 'readAny')], getInitiatives);
router.get("/", [checkJwt], getInitiatives);

// get initiatives by user
router.get("/own", [checkJwt, checkRole('initiatives', 'readOwn')], getInitiativesByUser);

// get roles by user in initiative
router.get("/:initiativeId([0-9]+)/roles/", [checkJwt, checkRole('initiatives', 'readOwn')], getUserRoleByInitiative);

// create initiatives
router.post("/", [checkJwt, checkRole('initiatives', 'createOwn')], createInitiative);

// get users by initiative
router.get("/:initiativeId([0-9]+)/users/", [checkJwt], checkRole('initiatives', 'readOwn'), getUsersByInitiative);

// get users by initiative
router.patch("/:initiativeId([0-9]+)/users/", [checkJwt], checkRole('initiatives', 'readOwn'), assignUsersByInitiative);


// get stages
router.get("/stages", [checkJwt], getStage);

// create stages
router.post("/stages", [checkJwt, checkRole('stages', 'createAny')], createStage);

// assign stage to initiative
router.post("/assign-stage", [checkJwt, checkRole('initiatives', 'updateOwn')], assignStageToInitiative);


// assign TOC file to stage by initiative
router.post("/assign-files", [checkJwt, checkRole('stages', 'updateOwn')], assignTOCsByInitvStg);



/**
 * 
 * CLARISA
 * 
 */


//get Action areas
router.get("/areas", [checkJwt], getActionAreas);
//get countries
router.get("/countries", [checkJwt], getCountries);
//get regions
router.get("/regions", [checkJwt], getClaRegions);
//get institutions
router.get("/institutions", [checkJwt], getClaInstitutions);
// router.get("/institutions", [checkJwt], getInstitutions);

export default router;