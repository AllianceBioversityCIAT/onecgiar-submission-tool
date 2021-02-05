import { Router } from 'express';
import { addRegionWorkPackage, createConcept, createWorkPackage, getInitiativeConcept, getRegionWorkPackage, updateWorkPackage } from '../controllers/StageConcept';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';


const router = Router();

/***
 * 
 * CONCEPT
 * 
 */


// create initiatives concept
router.post("/concept", [checkJwt, checkRole('initiatives', 'createOwn')], createConcept);

// get initiatives concept
router.get("/concept/:initvStgId", [checkJwt, checkRole('initiatives', 'readOwn')], getInitiativeConcept);
// router.get("/:initiativeId/stage/:stageId", [checkJwt, checkRole('initiatives', 'readOwn')], getInitiativeConcept);


// create work package
router.post("/concept/packages", [checkJwt, checkRole('initiatives', 'createOwn')], createWorkPackage);

// get regions to work packages
router.get("/concept/packages/regions/:wrkPkgId", [checkJwt, checkRole('initiatives', 'readOwn')], getRegionWorkPackage);

// add regions to work packages
router.post("/concept/packages/regions", [checkJwt, checkRole('initiatives', 'createOwn')], addRegionWorkPackage);

// update work package
router.patch("/concept/packages", [checkJwt, checkRole('initiatives', 'createOwn')], updateWorkPackage);

export default router;