import { Router } from 'express';
import { createConcept, getInitiativeConcept } from '../controllers/StagesControl';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';


const router = Router();


// create initiatives concept
router.post("/concept-info", [checkJwt, checkRole('initiatives', 'createOwn')], createConcept);

// get initiatives concept
router.get("/:initiativeId/stage/:stageId", [checkJwt, checkRole('initiatives', 'readOwn')], getInitiativeConcept);

export default router;