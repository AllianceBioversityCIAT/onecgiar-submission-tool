import { Router } from 'express';
import concept from "./ConceptRoutes";
import proposal from "./FullProposalRoutes";



const router = Router();

// concept routes
router.use("/concept", concept);
// full proposal routes
router.use("/proposal", proposal);



export default router;