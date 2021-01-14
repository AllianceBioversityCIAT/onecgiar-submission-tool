import { Router } from 'express';
import { getInitiatives, createInitiative, createStage, assignStageToInitiative, assignActArsByInitvStg, assignKeyPartnerByInitvStg, assignTOCFilesByInitvStg} from '../controllers/Initiatives';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';

const router = Router();


// create initiatives
router.post("/", [checkJwt], createInitiative);
// router.post("/", [checkJwt, checkRole('initiatives')], createInitiative);

// create stages
router.post("/stages", [checkJwt], createStage);
// router.post("/", [checkJwt, checkRole('stages')], createStage);

// assign stage to initiative
router.post("/assign-stage", [checkJwt], assignStageToInitiative);
// router.post("/", [checkJwt, checkRole('stages')], assignStageToInitiative);


// assign action area to stage by initiative
router.post("/assign-area", [checkJwt], assignActArsByInitvStg);
// router.post("/", [checkJwt, checkRole('stages')], assignActArsByInitvStg);

// assign action area to stage by initiative
router.post("/assign-partner", [checkJwt], assignKeyPartnerByInitvStg);
// router.post("/", [checkJwt, checkRole('stages')], assignKeyPartnerByInitvStg);

// assign TOC file to stage by initiative
router.post("/assign-files", [checkJwt], assignTOCFilesByInitvStg);
// router.post("/", [checkJwt, checkRole('stages')], assignTOCFilesByInitvStg);

export default router;