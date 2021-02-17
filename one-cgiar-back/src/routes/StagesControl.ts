import { Router } from 'express';
import { upsertProjectedBenefitWorkPackage, addTOCConcept, addTOCFile, createConcept, createWorkPackage, getInitiativeConcept, getRegionWorkPackage, getTOCFiles, getWorkPackages, updateConcept, updateTOCConcept, updateTOCFile, updateWorkPackage, upsertCountryWorkPackage, upsertRegionWorkPackage, upsertTimeFrameProjectedBenefit, getProjectedBenefitWorkPackage, getTimeFramesProjectedBenefit } from '../controllers/StageConcept';
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

// update initiatives concept
router.patch("/concept", [checkJwt, checkRole('initiatives', 'updateOwn')], updateConcept);

// get initiatives concept
router.get("/concept/:initvStgId([0-9]+)", [checkJwt, checkRole('initiatives', 'readOwn')], getInitiativeConcept);




// read work packages
router.get("/concept/packages/:initvStgId([0-9]+)", [checkJwt, checkRole('packages', 'readOwn')], getWorkPackages);

// create work package
router.post("/concept/packages", [checkJwt, checkRole('packages', 'createOwn')], createWorkPackage);

// update work package
router.patch("/concept/packages", [checkJwt, checkRole('packages', 'createOwn')], updateWorkPackage);



// get regions to work packages
router.get("/concept/packages/geo-scope/:wrkPkgId([0-9]+)", [checkJwt, checkRole('packages', 'readOwn')], getRegionWorkPackage);

// add / remove regions to work packages
router.patch("/concept/packages/regions", [checkJwt, checkRole('packages', 'createOwn')], upsertRegionWorkPackage);

// add / remove countries to work packages
router.patch("/concept/packages/countries", [checkJwt, checkRole('packages', 'createOwn')], upsertCountryWorkPackage);



// get regions to work packages
router.get("/concept/packages/benefits/:wrkPkgId([0-9]+)", [checkJwt, checkRole('benefits', 'readOwn')], getProjectedBenefitWorkPackage);

// add / remove benefits to work package
router.patch("/concept/packages/benefits", [checkJwt, checkRole('benefits', 'createOwn')], upsertProjectedBenefitWorkPackage);

// add / remove time frame to benefits
router.patch("/concept/packages/benefits/timeframes", [checkJwt, checkRole('benefits', 'createOwn')], upsertTimeFrameProjectedBenefit);

// get regions to work packages
router.get("/concept/packages/benefits/timeframes/:wrkPkgId([0-9]+)", [checkJwt, checkRole('benefits', 'readOwn')], getTimeFramesProjectedBenefit);



// add TOC to initiative
router.post("/concept/tocs/", [checkJwt, checkRole('tocs', 'createOwn'), uploadFile.any()], addTOCConcept);

// update TOC in initiative
router.patch("/concept/tocs/", [checkJwt, checkRole('tocs', 'updateOwn')], updateTOCConcept);

// add file in TOC
router.post("/concept/tocs/files/", [checkJwt, checkRole('tocs', 'createOwn'), uploadFile.any()], addTOCFile);

// update file in TOC
router.patch("/concept/tocs/files/", [checkJwt, checkRole('tocs', 'updateOwn')], updateTOCFile);

// update file in TOC
router.get("/concept/tocs/files/:tocId([0-9]+)", [checkJwt, checkRole('tocs', 'readOwn')], getTOCFiles);







export default router;