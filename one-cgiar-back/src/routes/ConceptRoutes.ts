import {Router} from 'express';
import {uploadFile} from '../middlewares/multer';
import * as stageconcept from '../controllers/StageConceptController';
import {checkJwt} from '../middlewares/jwt';
import {checkRole} from '../middlewares/role';

const router = Router();

// CREATE INITIATIVE
router.post(
  '/create-initiative',
  [checkJwt, checkRole('initiatives', 'updateOwn')],
  stageconcept.createInitiative
);

// get concept general information
router.get(
  '/:initiativeId([0-9]+)/general-information',
  [checkJwt, checkRole('initiatives', 'readOwn')],
  stageconcept.getGeneralInformation
);

// update concept general information
router.patch(
  '/:initiativeId([0-9]+)/general-information',
  [checkJwt, checkRole('initiatives', 'updateOwn')],
  stageconcept.upsertConceptGeneralInformation
);

// get concept narratives
router.get(
  '/:initiativeId([0-9]+)/narratives',
  [checkJwt, checkRole('initiatives', 'readOwn')],
  stageconcept.getConceptNarratives
);

// update initiatives concept narratives
router.patch(
  '/:initiativeId([0-9]+)/narratives',
  [checkJwt, checkRole('initiatives', 'updateOwn')],
  stageconcept.upsertConceptNarratives
);

/**PATCH INITIAL TOC */
router.patch(
  '/initial-toc/:initiativeId([0-9]+)/:ubication/:stageId',
  [checkJwt, checkRole('initiatives', 'updateOwn'), uploadFile.any()],
  stageconcept.upsertIntialToc
);

/**GET INITIAL TOC */
router.get(
  '/initial-toc/:initiativeId([0-9]+)/:sectionName',
  [checkJwt, checkRole('initiatives', 'updateOwn')],
  stageconcept.getInitialToc
);

/**PATCH INITIATIVE STATEMENTS */
router.patch(
  '/initiative-statements/:initiativeId([0-9]+)/',
  [checkJwt, checkRole('initiatives', 'updateOwn')],
  stageconcept.patchInitiativeStatement
);

/**GET INITIATIVE STATEMENTS */
router.get(
  '/initiative-statements/:initiativeId([0-9]+)/',
  [checkJwt, checkRole('initiatives', 'updateOwn')],
  stageconcept.getInitiativeStatement
);

/**PATCH WORK PACKAGES */
router.patch(
  '/packages/:initiativeId([0-9]+)/',
  [checkJwt, checkRole('initiatives', 'updateOwn')],
  stageconcept.patchWorkPackage
);

/**GET WORK PACKAGES BY INITIATIVE*/
router.get(
  '/packages/:initiativeId([0-9]+)/',
  [checkJwt, checkRole('initiatives', 'updateOwn')],
  stageconcept.getWorkPackagesByInitiative
);

/**GET WORK PACKAGES BY WORK PACKAGE*/
router.get(
  '/package/:wrkPkgId([0-9]+)',
  [checkJwt, checkRole('packages', 'readOwn')],
  stageconcept.getWorkPackage
);

// // read work packages list
// router.get("/packages/:initvStgId([0-9]+)", [checkJwt, checkRole('packages', 'readOwn')], getWorkPackages);

// // read work package by id
// router.get("/package/:wrkPkgId([0-9]+)", [checkJwt, checkRole('packages', 'readOwn')], getWorkPackage);

// // create work package
// router.post("/packages", [checkJwt, checkRole('packages', 'createOwn')], createWorkPackage);

// // update work package
// router.patch("/packages", [checkJwt, checkRole('packages', 'createOwn')], updateWorkPackage);

// // get regions to work packages
// router.get("/packages/geo-scope/:wrkPkgId([0-9]+)", [checkJwt, checkRole('packages', 'readOwn')], getRegionWorkPackage);

// // add / remove regions to work packages
// router.patch("/packages/regions", [checkJwt, checkRole('packages', 'createOwn')], upsertRegionWorkPackage);

// // add / remove countries to work packages
// router.patch("/packages/countries", [checkJwt, checkRole('packages', 'createOwn')], upsertCountryWorkPackage);

// // get regions to work packages
// router.get("/packages/benefits/:wrkPkgId([0-9]+)", [checkJwt, checkRole('benefits', 'readOwn')], getProjectedBenefitWorkPackage);

// // add / remove benefits to work package
// router.patch("/packages/benefits", [checkJwt, checkRole('benefits', 'createOwn')], upsertProjectedBenefitWorkPackage);

// // add / remove time frame to benefits
// router.patch("/packages/benefits/timeframes", [checkJwt, checkRole('benefits', 'createOwn')], upsertTimeFrameProjectedBenefit);

// // get regions to work packages
// router.get("/packages/benefits/timeframes/:prjctBnftId([0-9]+)", [checkJwt, checkRole('benefits', 'readOwn')], getTimeFramesProjectedBenefit);

// // upsert TOC to initiative
// router.patch("/tocs/", [checkJwt, checkRole('tocs', 'createOwn'), uploadFile.any()], upsertTOCandFile);

// // get files in TOC
// router.get("/tocs/:initvStgId([0-9]+)/files", [checkJwt, checkRole('tocs', 'readOwn')], getTOCFiles);
// // update TOC in initiative
// // router.patch("/tocs/", [checkJwt, checkRole('tocs', 'updateOwn')], updateTOCConcept);

// // // add file in TOC
// // router.post("/tocs/files/", [checkJwt, checkRole('tocs', 'createOwn'), uploadFile.any()], addTOCFile);

// // // update file in TOC
// router.put("/tocs/files/", [checkJwt, checkRole('tocs', 'updateOwn')], updateTOCFile);

// // upsert partnerships
// router.patch("/partnership/", [checkJwt, checkRole('partnerships', 'updateOwn')], upsertPartnerships);

// // get partnerships
// router.get("/:initvStgId([0-9]+)/partnership/", [checkJwt, checkRole('partnerships', 'readOwn')], getPartnerships);

export default router;
