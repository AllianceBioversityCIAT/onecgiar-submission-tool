import {Router} from 'express';
import * as stagefull from '../controllers/StageFullProposalController';
import {checkJwt} from '../middlewares/jwt';
import {uploadFile} from '../middlewares/multer';
import {checkRole} from '../middlewares/role';

const router = Router();

/**
 * * GET GENERAL INFORMATION
 */
router.get(
  '/:stageId([0-9]+)/:initiativeId([0-9]+)/general-information',
  [checkJwt, checkRole('initiatives', 'readOwn')],
  stagefull.getGeneralInformation
);

/**
 * *UPSERT GENERAL INFORMATION
 */
router.patch(
  '/:stageId([0-9]+)/:initiativeId([0-9]+)/general-information',
  [checkJwt, checkRole('initiatives', 'updateOwn')],
  stagefull.upsertGeneralInformation
);

/**
 ** GET CONTEXT BY INITIATIVE
 */
router.get(
  '/:stageId([0-9]+)/:initiativeId([0-9]+)/context',
  [checkJwt, checkRole('initiatives', 'readOwn')],
  stagefull.getContext
);

/**
 ** UPSERT CONTEXT
 */
router.patch(
  '/:stageId([0-9]+)/:initiativeId([0-9]+)/context',
  [checkJwt, checkRole('initiatives', 'updateOwn')],
  stagefull.upsertContext
);

/**
 ** UPSERT PROJECTION BENEFITS
 */
router.patch(
  '/projection-benefits/:stageId([0-9]+)/:initiativeId([0-9]+)',
  [checkJwt, checkRole('benefits', 'updateOwn')],
  stagefull.patchProjectionBenefits
);

/**
 ** GET PROJECTION BENEFITS BY INITIATIVE STAGE
 */
router.get(
  '/projection-benefits/:stageId([0-9]+)/:initiativeId([0-9]+)',
  [checkJwt, checkRole('benefits', 'readOwn')],
  stagefull.getProjectionBenefits
);

/**
 ** GET PROJECTION BENEFITS PER IMPACT AREA
 */
router.get(
  '/projection-benefits/:stageId([0-9]+)/:initiativeId([0-9]+)/:impactId([0-9]+)',
  [checkJwt, checkRole('benefits', 'readOwn')],
  stagefull.getProjectionBenefitsByImpact
);

/**
 ** GET WORK PACKAGES BY INITIATIVE STAGE
 */
router.get(
  '/packages/:stageId([0-9]+)/:initiativeId([0-9]+)',
  [checkJwt, checkRole('packages', 'readOwn')],
  stagefull.getWorkPackages
);

/**
 ** GET WORK PACKAGE BY ID
 *! TOC INTEGRATION
 */
router.get(
  '/package/:wrkPkgId([0-9]+)',
  [checkJwt, checkRole('packages', 'readOwn')],
  stagefull.getWorkPackage
);

/**
 ** GET ALL WORK PACKAGE FOR PROPOSAL STAGE
 *? THIS SERVICES IS ONLY FOR CLARISA
 **/
router.get('/packages', stagefull.getAllWorkPackagesProposal);

/**
 ** PATCH WORK PACKAGES
 */
router.patch(
  '/packages/:stageId([0-9]+)/:initiativeId([0-9]+)',
  [checkJwt, checkRole('packages', 'updateOwn')],
  stagefull.patchWorkPackage
);

/**
 ** UPSERT IMPACT STRATEGIES
 */
router.patch(
  '/impact-strategies/:stageId([0-9]+)/:initiativeId([0-9]+)',
  [checkJwt, checkRole('strategies', 'updateOwn')],
  stagefull.patchImpactStrategies
);

/**
 ** GET IMPACT STRATEGIES BY INITIATIVE
 */
router.get(
  '/impact-strategies/:stageId([0-9]+)/:initiativeId([0-9]+)/:impactAreaId([0-9]+)',
  [checkJwt, checkRole('strategies', 'readOwn')],
  stagefull.getImpactStrategies
);

/**
 ** PATCH MELIA PLAN
 */
router.patch(
  '/melia/plan/:stageId([0-9]+)/:initiativeId([0-9]+)',
  [checkJwt, checkRole('melia', 'updateOwn'), uploadFile.any()],
  stagefull.patchMeliaPlan
);

/**
 ** GET MELIA PLAN
 */
router.get(
  '/melia/plan/:stageId([0-9]+)/:initiativeId([0-9]+)/:sectionName',
  [checkJwt, checkRole('melia', 'readOwn')],
  stagefull.getMeliaAndFiles
);

/**
 ** UPSERT MELIA RESULTS FRAMEWORK (TABLES A,B AND C)
 *! TOC INTEGRATION
 * This service does not include the stage Id due to the integration with ToC,
 * for this reason the initiative is taken with the active stage
 */
router.patch(
  '/melia/:initiativeId([0-9]+)',
  [checkJwt, checkRole('melia', 'updateOwn'), uploadFile.any()],
  stagefull.patchMeliaResultsFramework
);

/**
 ** GET MELIA RESULTS FRAMEWORK (TABLES A,B AND C)
 *! TOC INTEGRATION
 * This service does not include the stage Id due to the integration with ToC,
 * for this reason the initiative is taken with the active stage
 */
router.get(
  '/melia/:initiativeId([0-9]+)/:sectionName',
  [checkJwt, checkRole('melia', 'readOwn')],
  stagefull.getMeliaResultsFramework
);

/**
 ** UPSERT MELIA STUDIES AND ACTIVITIES
 */
router.patch(
  '/melia/studies-activities/:stageId([0-9]+)/:initiativeId([0-9]+)',
  [checkJwt, checkRole('melia', 'updateOwn'), uploadFile.any()],
  stagefull.patchMeliaStudiesActivities
);

/**
 ** GET MELIA STUDIES AND ACTIVITIES
 */
router.get(
  '/melia/studies-activities/:stageId([0-9]+)/:initiativeId([0-9]+)',
  [checkJwt, checkRole('melia', 'readOwn')],
  stagefull.getMeliaStudiesActivities
);

/**
 ** UPSERT ISDC RESPONSES
 */
router.patch(
  '/participatory-design/isdc-responses/:initiativeId([0-9]+)/:stageId([0-9]+)',
  [checkJwt, checkRole('initiatives', 'updateOwn'), uploadFile.any()],
  stagefull.patchISDCResponses
);

/**
 ** GET ISDC RESPONSES
 */
router.get(
  '/participatory-design/isdc-responses/:initiativeId([0-9]+)/:stageId([0-9]+)',
  [checkJwt, checkRole('initiatives', 'readOwn')],
  stagefull.getISDCResponses
);

/**
 ** UPSERT MANAGEMENT PLAN RISK BY INITIATIVE
 */
router.patch(
  '/manage-plan/:stageId([0-9]+)/:initiativeId([0-9]+)/:ubication',
  [checkJwt, checkRole('mpr', 'updateOwn'), uploadFile.any()],
  stagefull.patchManagePlanAndFiles
);

/**
 ** GET MANAGEMENT PLAN RISK BY INITIATIVE
 */
router.get(
  '/manage-plan/:stageId([0-9]+)/:initiativeId([0-9]+)/:sectionName',
  [checkJwt, checkRole('mpr', 'readOwn')],
  stagefull.getManagePlanAndFiles
);

/**
 ** UPSERT HUMAN RESOURCES BY INITIATIVE
 */
router.patch(
  '/human-resources/:stageId([0-9]+)/:initiativeId([0-9]+)/:ubication',
  [checkJwt, checkRole('hr', 'updateOwn'), uploadFile.any()],
  stagefull.patchHumanResourcesAndFiles
);

/**
 ** GET HUMAN RESOURCES BY INITIATIVE
 */
router.get(
  '/human-resources/:stageId([0-9]+)/:initiativeId([0-9]+)/:sectionName',
  [checkJwt, checkRole('hr', 'readOwn')],
  stagefull.getHumanResources
);

/**
 ** UPSERT FINANCIAL RESOURCES BY INITIATIVE
 */
router.patch(
  '/financial-resources/:stageId([0-9]+)/:initiativeId([0-9]+)/:sectionName',
  [checkJwt, checkRole('fr', 'updateOwn')],
  stagefull.patchFinancialResources
);

/**
 ** GET FINANCIAL RESOURCES BY INITIATIVE
 */
router.get(
  '/financial-resources/:stageId([0-9]+)/:initiativeId([0-9]+)/:sectionName',
  [checkJwt, checkRole('fr', 'readOwn')],
  stagefull.getFinancialResources
);

/**
 ** UPSERT POLICY COMPLIANCE OVERSIGHT BY INITIATIVE
 */
router.patch(
  '/policy-compliance/:stageId([0-9]+)/:initiativeId([0-9]+)',
  [checkJwt, checkRole('pco', 'updateOwn')],
  stagefull.patchPolicyComplianceOversight
);

/**
 ** GET POLICY COMPLIANCE OVERSIGHT BY INITIATIVE
 */
router.get(
  '/policy-compliance/:stageId([0-9]+)/:initiativeId([0-9]+)',
  [checkJwt, checkRole('pco', 'readOwn')],
  stagefull.getPolicyComplianceOversight
);

/**
 ** UPSERT INNOVATION PACKAGES BY INITIATIVE
 */
router.patch(
  '/innovation-packages/:stageId([0-9]+)/:initiativeId([0-9]+)',
  [checkJwt, checkRole('ip', 'updateOwn')],
  stagefull.patchInnovationPackages
);

/**
 ** GET INNOVATION PACKAGES BY INITIATIVE
 */
router.get(
  '/innovation-packages/:stageId([0-9]+)/:initiativeId([0-9]+)',
  [checkJwt, checkRole('ip', 'readOwn')],
  stagefull.getInnovationPackages
);

/**
 ** PATCH TOCS
 *! TOC INTEGRATION
 * This service does not include the stage Id due to the integration with ToC,
 * for this reason the initiative is taken with the active stage
 */
router.patch('/toc/:initiativeId([0-9]+)', [checkJwt], stagefull.patchTocs);

/**
 ** GET TOC
 *! TOC INTEGRATION
 */
router.get(
  '/toc/:stageId([0-9]+)/:initiativeId([0-9]+)',
  [checkJwt],
  stagefull.getTocByInitiative
);

/**
 ** GET END OF INITIATIVE OUTCOMES FROM TOC TOOL
 *! TOC INTEGRATION
 */
router.get(
  '/eoi/:stageId([0-9]+)/:initiativeId([0-9]+)',
  [checkJwt, checkRole('initiatives', 'updateOwn')],
  stagefull.getEndofInitiativeOutcome
);
/**
 ** POST INITIATIVES APPROVAL
 */
router.post(
  '/approve-initiative',
  [checkJwt, checkRole('initiatives', 'updateOwn')],
  stagefull.postInitiativeApproval
);


/**
 ** POST INITIATIVES APPROVAL
 */
router.patch(
  '/tracks/:stageId([0-9]+)/:initiativeId([0-9]+)',
  [checkJwt, checkRole('initiatives', 'updateOwn')],
  stagefull.patchTracksYears
);

export default router;
