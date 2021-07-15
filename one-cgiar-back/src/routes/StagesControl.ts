import { Router } from 'express';
import { upsertProjectedBenefitWorkPackage, createWorkPackage, getConceptGeneralInfo, getRegionWorkPackage, getTOCFiles, getWorkPackages, upsertConceptGeneralInformation, updateTOCFile, updateWorkPackage, upsertCountryWorkPackage, upsertRegionWorkPackage, upsertTimeFrameProjectedBenefit, getProjectedBenefitWorkPackage, getTimeFramesProjectedBenefit, upsertPartnerships, getConceptNarratives, upsertConceptNarratives, getPartnerships, upsertTOCandFile, getWorkPackage } from '../controllers/StageConcept';
import { checkJwt } from '../middlewares/jwt';
import { uploadFile } from '../middlewares/multer';
import { checkRole } from '../middlewares/role';
import concept from "./ConceptRoutes";
import proposal from "./FullProposalRoutes";



const router = Router();

// concept routes
router.use("/concept", concept);
// full proposal routes
router.use("/proposal", proposal);



export default router;