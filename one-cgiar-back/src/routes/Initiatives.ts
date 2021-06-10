import { Router } from 'express';
import { getClaActionAreas, getClaCountries, getClaCRPs, getClaInstitutions, getClaInstitutionsTypes, getClaRegions, requestClaInstitution } from '../controllers/Clarisa';
import { getInitiatives, createInitiative, createStage, assignStageToInitiative, assignTOCsByInitvStg, getInitiativesByUser, getStage, getUsersByInitiative,  assignUsersByInitiative, getUserRoleByInitiative, getStageMeta, getActionAreas, replicationProcess, getCountries, getRegions, getInstitutions, getInstitutionsTypes } from '../controllers/Initiatives';
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

// get stages meta
router.get("/stages-meta/:initiativeId([0-9]+)", [checkJwt], getStageMeta);

// create stages
router.post("/stages", [checkJwt, checkRole('stages', 'createAny')], createStage);

// assign stage to initiative
router.post("/assign-stage", [checkJwt, checkRole('initiatives', 'updateOwn')], assignStageToInitiative);


// assign TOC file to stage by initiative
router.post("/assign-files", [checkJwt, checkRole('stages', 'updateOwn')], assignTOCsByInitvStg);


/**
 * 
 * Submit and replication
 */

// replicate to next stage
router.post("/replica/:currentInitiativeId([0-9]+)", [checkJwt], replicationProcess);




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
router.get("/regions", [checkJwt], getRegions);
//get institutions
router.get("/institutions", [checkJwt], getInstitutions);
// get institutions types
router.get("/institutions/types", [checkJwt], getInstitutionsTypes);
// get crps
router.get("/cgiar-entities", [checkJwt], getClaCRPs);
//request institutions
router.post("/institutions/institution-requests", [checkJwt], requestClaInstitution);


export default router;