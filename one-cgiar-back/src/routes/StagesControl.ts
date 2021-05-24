import { Router } from 'express';
import { upsertProjectedBenefitWorkPackage, createWorkPackage, getConceptGeneralInfo, getRegionWorkPackage, getTOCFiles, getWorkPackages, upsertConceptGeneralInformation, updateTOCFile, updateWorkPackage, upsertCountryWorkPackage, upsertRegionWorkPackage, upsertTimeFrameProjectedBenefit, getProjectedBenefitWorkPackage, getTimeFramesProjectedBenefit, upsertPartnerships, getConceptNarratives, upsertConceptNarratives, getPartnerships, upsertTOCandFile, getWorkPackage } from '../controllers/StageConcept';
import { checkJwt } from '../middlewares/jwt';
import { uploadFile } from '../middlewares/multer';
import { checkRole } from '../middlewares/role';


const router = Router();

/***
 * 
 * CONCEPT
 * 
 */


// get initiatives concept general information
router.get("/concept/:initvStgId([0-9]+)/general-information", [checkJwt, checkRole('initiatives', 'readOwn')], getConceptGeneralInfo);

// update initiatives concept general information
router.patch("/concept/general-information", [checkJwt, checkRole('initiatives', 'updateOwn')], upsertConceptGeneralInformation);

// get initiatives concept narratives
router.get("/concept/:initvStgId([0-9]+)/narratives", [checkJwt, checkRole('initiatives', 'readOwn')], getConceptNarratives);

// update initiatives concept narratives
router.patch("/concept/narratives", [checkJwt, checkRole('initiatives', 'updateOwn')], upsertConceptNarratives);



// read work packages list
router.get("/concept/packages/:initvStgId([0-9]+)", [checkJwt, checkRole('packages', 'readOwn')], getWorkPackages);

// read work package by id
router.get("/concept/package/:wrkPkgId([0-9]+)", [checkJwt, checkRole('packages', 'readOwn')], getWorkPackage);

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
router.get("/concept/packages/benefits/timeframes/:prjctBnftId([0-9]+)", [checkJwt, checkRole('benefits', 'readOwn')], getTimeFramesProjectedBenefit);



// upsert TOC to initiative
router.patch("/concept/tocs/", [checkJwt, checkRole('tocs', 'createOwn'), uploadFile.any()], upsertTOCandFile);

// get files in TOC
router.get("/concept/tocs/:initvStgId([0-9]+)/files", [checkJwt, checkRole('tocs', 'readOwn')], getTOCFiles);
// update TOC in initiative
// router.patch("/concept/tocs/", [checkJwt, checkRole('tocs', 'updateOwn')], updateTOCConcept);

// // add file in TOC
// router.post("/concept/tocs/files/", [checkJwt, checkRole('tocs', 'createOwn'), uploadFile.any()], addTOCFile);

// // update file in TOC
router.put("/concept/tocs/files/", [checkJwt, checkRole('tocs', 'updateOwn')], updateTOCFile);



// upsert partnerships
router.patch("/concept/partnership/", [checkJwt, checkRole('partnerships', 'updateOwn')], upsertPartnerships);

// get partnerships
router.get("/concept/:initvStgId([0-9]+)/partnership/", [checkJwt, checkRole('partnerships', 'readOwn')], getPartnerships);




export default router;