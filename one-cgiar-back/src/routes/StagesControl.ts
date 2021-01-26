import { Router } from 'express';
import { createConcept } from '../controllers/StagesControl';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';


const router = Router();


// create initiatives
router.post("/concept-info", [checkJwt], createConcept);
// router.post("/concept-info", [checkRole(''),checkJwt], createConcept);

export default router;