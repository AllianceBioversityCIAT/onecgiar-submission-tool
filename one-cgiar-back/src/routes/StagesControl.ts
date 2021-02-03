import { Router } from 'express';
import { createConcept, createWorkPackage, getInitiativeConcept, updateWorkPackage } from '../controllers/StageConcept';
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
router.get("/:initiativeId/stage/:stageId", [checkJwt, checkRole('initiatives', 'readOwn')], getInitiativeConcept);


// create work package
router.post("/concept/packages", [checkJwt, checkRole('initiatives', 'createOwn')], createWorkPackage);

// update work package
router.patch("/concept/packages", [checkJwt, checkRole('initiatives', 'createOwn')], updateWorkPackage);

export default router;