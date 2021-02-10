import { Router } from 'express';
import { addProjectedBenefitWorkPackage, addRegionWorkPackage, addTOCConcept, addTOCFile, createConcept, createWorkPackage, getInitiativeConcept, getRegionWorkPackage, getTOCFiles, updateConcept, updateTOCConcept, updateTOCFile, updateWorkPackage } from '../controllers/StageConcept';
import { checkJwt } from '../middlewares/jwt';
import { uploadFile } from '../middlewares/multer';
import { checkRole } from '../middlewares/role';


const router = Router();

/***
 * 
 * CONCEPT
 * 
 */


// create initiatives concept
router.post("/concept", [checkJwt, checkRole('initiatives', 'createOwn')], createConcept);

// create initiatives concept
router.patch("/concept", [checkJwt, checkRole('initiatives', 'updateOwn')], updateConcept);

// get initiatives concept
router.get("/concept/:initvStgId", [checkJwt, checkRole('initiatives', 'readOwn')], getInitiativeConcept);
// router.get("/:initiativeId/stage/:stageId", [checkJwt, checkRole('initiatives', 'readOwn')], getInitiativeConcept);


// create work package
router.post("/concept/packages", [checkJwt, checkRole('packages', 'createOwn')], createWorkPackage);

// get regions to work packages
router.get("/concept/packages/regions/:wrkPkgId", [checkJwt, checkRole('packages', 'readOwn')], getRegionWorkPackage);

// add regions to work packages
router.post("/concept/packages/regions", [checkJwt, checkRole('packages', 'createOwn')], addRegionWorkPackage);

// update work package
router.patch("/concept/packages", [checkJwt, checkRole('packages', 'createOwn')], updateWorkPackage);

// add benefits to initiative
router.post("/concept/packages/benefits/", [checkJwt, checkRole('benefits', 'createOwn')], addProjectedBenefitWorkPackage);





// add TOC to initiative
router.post("/concept/tocs/", [checkJwt, checkRole('tocs', 'createOwn'), uploadFile.any()], addTOCConcept);

// update TOC in initiative
router.patch("/concept/tocs/", [checkJwt, checkRole('tocs', 'updateOwn')], updateTOCConcept);

// add file in TOC
router.post("/concept/tocs/files/", [checkJwt, checkRole('tocs', 'createOwn'), uploadFile.any()], addTOCFile);

// update file in TOC
router.patch("/concept/tocs/files/", [checkJwt, checkRole('tocs', 'updateOwn')], updateTOCFile);

// update file in TOC
router.get("/concept/tocs/files/:tocId", [checkJwt, checkRole('tocs', 'readOwn')], getTOCFiles);







export default router;