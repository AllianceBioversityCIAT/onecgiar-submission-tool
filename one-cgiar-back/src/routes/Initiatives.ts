import { Router } from 'express';
import { getInitiatives, createInitiative, createStage, assignStageToInitiative, assignActArsByInitvStg, assignKeyPartnerByInitvStg, assignTOCFilesByInitvStg, getInitiativesByUser } from '../controllers/Initiatives';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';

const router = Router();

// get initiatives
router.get("/", [checkJwt, checkRole('initiatives', 'readAny')], getInitiatives);

// get initiatives by user
router.get("/:userId", [checkJwt, checkRole('initiatives', 'readOwn')], getInitiativesByUser);



// create initiatives
router.post("/", [checkJwt, checkRole('initiatives', 'createOwn')], createInitiative);

// assign stage to initiative
router.post("/assign-stage", [checkJwt, checkRole('initiatives', 'updateAny')], assignStageToInitiative);

// create stages
// router.post("/stages", [checkJwt], createStage);
// router.post("/", [checkJwt, checkRole('stages')], createStage);



// assign action area to stage by initiative
// router.post("/assign-area", [checkJwt], assignActArsByInitvStg);
// router.post("/", [checkJwt, checkRole('stages')], assignActArsByInitvStg);

// assign action area to stage by initiative
// router.post("/assign-partner", [checkJwt], assignKeyPartnerByInitvStg);
// router.post("/", [checkJwt, checkRole('stages')], assignKeyPartnerByInitvStg);

// assign TOC file to stage by initiative
// router.post("/assign-files", [checkJwt], assignTOCFilesByInitvStg);
// router.post("/", [checkJwt, checkRole('stages')], assignTOCFilesByInitvStg);

export default router;