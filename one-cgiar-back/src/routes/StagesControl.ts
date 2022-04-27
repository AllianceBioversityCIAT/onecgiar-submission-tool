import {Router} from 'express';
import preConcept from './ConceptRoutes';
import proposal from './FullProposalRoutes';

const router = Router();

// concept routes
router.use('/pre-concept', preConcept);
// full proposal routes
router.use('/full-proposal', proposal);

export default router;
