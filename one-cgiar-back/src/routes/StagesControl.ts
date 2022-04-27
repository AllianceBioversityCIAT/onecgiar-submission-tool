import {Router} from 'express';
import preConcept from './ConceptRoutes';
import proposal from './FullProposalRoutes';

const router = Router();

// concept routes
router.use('/pre-concept', preConcept);
// full proposal routes
router.use('/proposal', proposal);

export default router;
