import {Router} from 'express';
import * as clarisa from '../controllers/Clarisa';
import * as initiatives from '../controllers/InitiativesController';
import * as toc from '../controllers/TocController';
import {checkJwt} from '../middlewares/jwt';
import {checkRole} from '../middlewares/role';

const router = Router();

/**
 ** GET INITIATIVES ACTIVES
 */
router.get('/', [checkJwt], initiatives.getInitiatives);

/**
 ** GET INITIATIVES ALL STATUS
 */
router.get('/all-status', [checkJwt], initiatives.getInitiativesAllStatus);

/**
 ** GET INITIATIVES BY USER
 */
router.get(
  '/own',
  [checkJwt, checkRole('initiatives', 'readOwn')],
  initiatives.getInitiativesByUser
);

/**
 ** GET ROLES BY USER IN INITIATIVE
 */
router.get(
  '/:initiativeId([0-9]+)/roles/',
  [checkJwt, checkRole('initiatives', 'readOwn')],
  initiatives.getUserRoleByInitiative
);

/**
 ** CREATE INITIATIVES
 */
router.post(
  '/',
  [checkJwt, checkRole('initiatives', 'createOwn')],
  initiatives.createInitiative
);

/**
 ** GET USERS BY INITIATIVE
 */
router.get(
  '/:initiativeId([0-9]+)/users/',
  [checkJwt],
  checkRole('initiatives', 'readOwn'),
  initiatives.getUsersByInitiative
);

/**
 ** GET INITIATIVE BY STAGE
 */
router.get(
  '/get-initvStgId/:initiativeId([0-9]+)/:stageId([0-9]+)',
  [checkJwt, checkRole('initiatives', 'readOwn')],
  initiatives.getInitvStgId
);

/**
 ** GET USERS BY INITIATIVE
 */
router.patch(
  '/:initiativeId([0-9]+)/users/',
  [checkJwt],
  checkRole('initiatives', 'readOwn'),
  initiatives.assignUsersByInitiative
);

/**
 ** GET STAGES
 */
router.get('/stages', [checkJwt], initiatives.getStage);

/**
 ** GET STAGES META
 */
router.get(
  '/stages-meta/:initiativeId([0-9]+)',
  [checkJwt],
  initiatives.getStageMeta
);

/**
 ** CREATE STAGES
 */
router.post(
  '/stages',
  [checkJwt, checkRole('stages', 'createAny')],
  initiatives.createStage
);

/**
 ** ASSIGN STAGE TO INITIATIVE
 */
router.post(
  '/assign-stage',
  [checkJwt, checkRole('initiatives', 'updateOwn')],
  initiatives.assignStageToInitiative
);

/**
 ** GET ASSESSMENT STATUS
 */
router.get(
  '/assessment/:initiativeId([0-9]+)/:stageId([0-9]+)/statuses',
  [checkJwt, checkRole('assessment', 'readAny')],
  initiatives.getAssessmentStatus
);

/**
 ** GET SUBMISSION PER INITIATIVE
 */
router.get(
  '/submission/:initiativeId([0-9]+)/:stageId([0-9]+)',
  [checkJwt, checkRole('initiatives', 'readOwn')],
  initiatives.getSubmission
);

/**
 ** SUBMIT INITIATIVE
 */
router.post(
  '/submit/:initiativeId([0-9]+)/:stageId([0-9]+)',
  [checkJwt, checkRole('initiatives', 'updateOwn')],
  initiatives.submitInitiative
);

/**
 ** UPDATE SUBMISSION
 */
router.patch(
  '/assessment/status/:initiativeId([0-9]+)/:stageId([0-9]+)',
  [checkJwt, checkRole('assessment', 'updateAny')],
  initiatives.updateSubmissionStatusByInitiative
);

/**
 ** ASSIGN TOCS BY INITIATIVE
 */
router.post(
  '/assign-files',
  [checkJwt, checkRole('stages', 'updateOwn')],
  initiatives.assignTOCsByInitvStg
);

// assign citation / link to initiative/
router.patch(
  '/add-link/:initiativeId([0-9]+)/:stageId([0-9]+)',
  [checkJwt, checkRole('initiatives', 'updateOwn')],
  initiatives.addLink
);

// get links to table and column
router.post(
  '/get-link/:initiativeId([0-9]+)/:stageId([0-9]+)',
  [checkJwt, checkRole('initiatives', 'updateOwn')],
  initiatives.getLink
);

// get initiative summary
router.get(
  '/:initiativeId([0-9]+)/summary/:stageId([0-9]+)',
  [checkJwt, checkRole('initiatives', 'readOwn')],
  initiatives.getSummary
);

/**
 ** UPSERT SUMMARY
 */
router.patch(
  '/:initiativeId([0-9]+)/summary/:stageId([0-9]+)',
  [checkJwt, checkRole('initiatives', 'updateOwn')],
  initiatives.upsertSummary
);

// assign budget
router.patch(
  '/add-budget/:initiativeId([0-9]+)/:stageId([0-9]+)',
  [checkJwt, checkRole('initiatives', 'updateOwn')],
  initiatives.addBudget
);

// get budget
router.post(
  '/get-budget/:initiativeId([0-9]+)/:stageId([0-9]+)',
  [checkJwt, checkRole('initiatives', 'updateOwn')],
  initiatives.getBudget
);
router.delete('/delete-budget/:idBudget', [checkJwt], initiatives.removeBudget);

// get depth scale per impact indicator
router.get(
  '/depth-scale/:impactIndicatorId([0-9]+)',
  [checkJwt],
  initiatives.getDepthScale
);

// get depth description per impact indicator
router.get(
  '/depth-description/:impactIndicatorId([0-9]+)',
  [checkJwt],
  initiatives.getDepthDescription
);

/**
 * PREVIEW PARTNERS
 */
router.get('/preview-partners/', [checkJwt], initiatives.getPreviewPartners);

/**
 *
 * Submit and replication
 */

// replicate to next stage
router.post(
  '/replica/:stageId([0-9]+)/:initiativeId([0-9]+)',
  [checkJwt],
  initiatives.replicationProcess
);

/**
 *
 * CLARISA to ST
 *
 */

//get institutions from submission
router.get('/institutions', [checkJwt], initiatives.getInstitutions);

//get action areas from submission
router.get('/areas', [checkJwt], initiatives.getActionAreas);

//get impact areas from submission
router.get('/impact-areas', [checkJwt], initiatives.getImpactAreas);

//get impact areas Indicators from submission
router.get(
  '/impact-areas/inidicators',
  [checkJwt],
  initiatives.getImpactAreasIndicators
);

//get SDG Targets
router.get('/sdg-targets', [checkJwt], initiatives.getSdgTargets);

//get Action Areas Outcomes Indicators
router.get(
  '/action-areas/outcomes-indicators',
  [checkJwt],
  initiatives.getActionAreasOutcomesIndicators
);

// get Global targets
router.get('/global-targets', [checkJwt], initiatives.getGlobalTargets);

// get institutions types from submission
router.get('/institutions/types', [checkJwt], initiatives.getInstitutionsTypes);

//get countries
router.get('/countries', [checkJwt], initiatives.getCountries);

//get regions
router.get('/regions', [checkJwt], initiatives.getRegions);

//get regions CGIAR
router.get('/regions-cgiar', [checkJwt], initiatives.getRegionsCgiar);

//Get Risks
router.get('/risks', [checkJwt], initiatives.GetRisks);

//Get Risks Theme
router.get('/risks-theme', [checkJwt], initiatives.GetRisksTheme);

//Get Projected Benefits
router.get('/projected-benefits', [checkJwt], initiatives.getProjectedBenefits);

/**
 *
 * CLARISA
 *
 */

// get crps
router.get('/cgiar-entities', [checkJwt], clarisa.getClaCRPs);
//request institutions
router.post(
  '/institutions/institution-requests',
  [checkJwt],
  clarisa.requestClaInstitution
);

router.get(
  '/projected-probabilities',
  [checkJwt],
  initiatives.getProjectedProbabilities
);

router.get('/toc/narrative/:TocId', [checkJwt], toc.getTocNarrative);

export default router;
