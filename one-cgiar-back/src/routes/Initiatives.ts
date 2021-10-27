import { Router } from 'express';
import * as clarisa from '../controllers/Clarisa';
import * as initiatives from '../controllers/Initiatives';
import * as toc from '../controllers/Toc';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';

const router = Router();

// get initiatives
// router.get("/", [checkJwt, checkRole('initiatives', 'readAny')], getInitiatives);
/**
 * @api {get} /initiatives Initiatives - Request all Initiative
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetInitiatives
 * @apiGroup Initiatives
 * 
 * @apiDescription  Shows all initiatives
 * 
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/initiatives/
 * 
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/initiatives/
 * @apiHeader {String} auth
 * 
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "response": {
 *         "initiatives": [
 *             {
 *                 "initvStgId": 35,
 *                 "id": 2,
 *                 "name": "Accelerated Crop Improvement through Precision Genetic Technologies",
 *                 "oficial_code":"INIT-2"
 *                 "status": "Editing",
 *                 "action_area_id": "1",
 *                 "action_area_description": "Systems Transformation",
 *                 "active": 1,
 *                 "stageId": 3,
 *                 "description": "Stage 3: Full Proposal",
 *                 "stages": [
 *                     {
 *                         "id": 2,
 *                         "initvStgId": 2,
 *                         "stageId": 2,
 *                         "active": 0
 *                     },
 *                     {
 *                         "id": 2,
 *                         "initvStgId": 35,
 *                         "stageId": 3,
 *                         "active": 1
 *                     }
 *                 ]
 *             }
 * 			
 * 			        ]
 *     },
 *     "title": "All Initiatives."
 * }
 *
 * @apiError Error : Get Initiatives.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Get Initiatives:", error }
 */
router.get("/", [checkJwt], initiatives.getInitiatives);

// get initiatives by user
router.get("/own", [checkJwt, checkRole('initiatives', 'readOwn')], initiatives.getInitiativesByUser);

// get roles by user in initiative
router.get("/:initiativeId([0-9]+)/roles/", [checkJwt, checkRole('initiatives', 'readOwn')], initiatives.getUserRoleByInitiative);

// create initiatives
router.post("/", [checkJwt, checkRole('initiatives', 'createOwn')], initiatives.createInitiative);






// get users by initiative
/**
 * @api {get} initiatives/initiativeId([0-9]+)/users/ Users by initiative - Request users by initiative
 * @apiVersion 1.0.2
 * @apiPermission all
 * @apiName GetUserInitiative
 * @apiGroup Manage Access
 * 
 * @apiDescription  Shows users by initiative data 
 * 
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/intiatives/2/users/
 * 
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/intiatives/2/users/
 *
 * @apiHeader {String} auth
 * 
 * @apiParam {Number} initiativeId Id initiative
 * 
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "response": {
 *         "users": [
 *             {
 *                 "userId": 41,
 *                 "first_name": "First Name",
 *                 "last_name": "Last Name",
 *                 "email": "e.mail@mail.org",
 *                 "role_name": "Science Group Directors/Designated (SGD) / Initiative Design Team",
 *                 "role_acronym": "SGD",
 *                 "roleId": 1
 *             },
 *              ...
 * 			
 * 			     ]
 *     },
 *     "title": "Users by Initiative"
 * }
 *
 * @apiError Error : Get users by initiative.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Get users by initiative:", error }
 */

router.get("/:initiativeId([0-9]+)/users/", [checkJwt], checkRole('initiatives', 'readOwn'), initiatives.getUsersByInitiative);

router.get("/get-initvStgId/:initiativeId([0-9]+)/:stageId([0-9]+)", [checkJwt, checkRole('initiatives', 'readOwn')], initiatives.getInitvStgId);



















// get users by initiative
router.patch("/:initiativeId([0-9]+)/users/", [checkJwt], checkRole('initiatives', 'readOwn'), initiatives.assignUsersByInitiative);


// get stages
router.get("/stages", [checkJwt], initiatives.getStage);

// get stages meta
router.get("/stages-meta/:initiativeId([0-9]+)", [checkJwt], initiatives.getStageMeta);

// create stages
router.post("/stages", [checkJwt, checkRole('stages', 'createAny')], initiatives.createStage);

// assign stage to initiative
router.post("/assign-stage", [checkJwt, checkRole('initiatives', 'updateOwn')], initiatives.assignStageToInitiative);


// assign TOC file to stage by initiative
router.post("/assign-files", [checkJwt, checkRole('stages', 'updateOwn')], initiatives.assignTOCsByInitvStg);

// assign citation / link to initiative/
/**
 * @api {patch} initiatives/add-link/:initiativeId/:stageId Citations - Create and update citations
 * @apiVersion 1.0.0
 * @apiPermission admin
 * @apiName PatchCitations
 * @apiGroup Initiatives
 * 
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/initiatives/add-link/2/3
 * 
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/initiatives/add-link/2/3
 * 
 * @apiHeader {String} auth
 * 
 * @apiParam {Number} initiativeId Id initiative
 * @apiParam {Number} stageId Id stage.
 *
 * @apiParam {String} title citation title
 * @apiParam {String} link citation link 
 * @apiParam {String} table_name table name - Metadata.
 * @apiParam {String} col_name column name - Metadata.
 * @apiParam {Number} citationId This field will be used to update a citation.
 * @apiParam {Boolean} active status.
 * 
 * @apiParamExample {json} Request-Example:
 *  {
 * "title": "test4", 
 * "link": "test4", 
 * "table_name": "context", 
 * "col_name": "priority_setting", 
 * "citationId": null,
 * "active":true
 * }
 * 
 * @apiSuccess {Date} created_at Creation date.
 * @apiSuccess {Date} updated_at  Update date.
 * @apiSuccess {Number} id  citation id.
 * @apiSuccess {String} title  citation title.
 * @apiSuccess {String} link  citation link.
 * @apiSuccess {String} table_name Table to which the citation belongs.
 * @apiSuccess {String} col_name Colum to which the citation belongs.
 * @apiSuccess {Number} active status.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "response": {
 *         "addedLink": {
 *             "initvStg": "35",
 *             "title": "test4",
 *             "link": "test4",
 *             "table_name": "context",
 *             "col_name": "priority_setting",
 *             "active": true,
 *             "updated_at": "2021-07-29T14:09:16.000Z",
 *             "created_at": "2021-07-29T14:09:16.000Z",
 *             "id": 7
 *         }
 *     },
 *     "title": "Initiatives:Add link."
 * }
 *
 * @apiError Error PatchCitations-Add link
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Initiative not found in stage:", error }
 */
router.patch("/add-link/:initiativeId([0-9]+)/:stageId([0-9]+)", [checkJwt, checkRole('initiatives', 'updateOwn')], initiatives.addLink);

// get links to table and column
/**
 * @api {post} initiatives/get-link/:initiativeId/:stageId Citations - Read data of citations.
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName PostCitations
 * @apiGroup Initiatives
 * 
 * @apiDescription  Shows all cititations filtered by initiative id, estage id and status
 * 
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/initiatives/get-link/2/3
 * 
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/initiatives/get-link/2/3
 *
 * @apiHeader {String} auth
 * 
 * @apiParam {Number} initiativeId Id initiative
 * @apiParam {Number} stageId Id stage.
 * 
 * @apiParam {String} table_name table name - Metadata.
 * @apiParam {String} col_name column name - Metadata.
 * @apiParam {Boolean} active status.
 * 
 * @apiParamExample {json} Request-Example:
 * {
 * "table_name": "context", 
 * "col_name": "priority_setting", 
 * "active":true
 * }
 * 
 * @apiSuccess {Date} created_at Creation date.
 * @apiSuccess {Date} updated_at  Update date.
 * @apiSuccess {Number} id  citation id.
 * @apiSuccess {String} title  citation title.
 * @apiSuccess {String} link  citation link.
 * @apiSuccess {String} table_name Table to which the citation belongs.
 * @apiSuccess {String} col_name Colum to which the citation belongs.
 * @apiSuccess {Number} active status.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *   "response": {
 *       "getLinks": [
 *           {
 *               "created_at": "2021-07-28T02:27:29.000Z",
 *               "updated_at": "2021-07-28T02:27:29.000Z",
 *               "id": 6,
 *               "title": "test3",
 *               "link": "test3",
 *               "table_name": "context",
 *               "col_name": "priority_setting",
 *               "active": 0
 *           }
 *       ]
 *   },
 *   "title": "Initiatives:Get link."
 *  }
 *
 * @apiError Error PostCitations-Get link.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Initiative not found in stage:", error }
 */
router.post("/get-link/:initiativeId([0-9]+)/:stageId([0-9]+)", [checkJwt, checkRole('initiatives', 'updateOwn')], initiatives.getLink);

// get initiative summary
/**
 * @api {get} /:initiativeId/summary/:stageId Summary - Request Initiative summary
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetInitiativeSummary
 * @apiGroup Initiatives
 * 
 * @apiDescription  Shows summary data from initiatives
 * 
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/initiatives/1/summary/3
 * 
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/initiatives/1/summary/3
 *
 * @apiHeader {String} auth
 * 
 * @apiParam {Number} initiativeId Id initiative
 * @apiParam {Number} stageId Id stage.
 * 
 * 
 * @apiSuccess {String} generalInformation general information data from initiatives.
 * @apiSuccess {String} geoScope regions and countries from initiatives.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *   "response": {
 *       "getLinks": [
 *           {
 *               "created_at": "2021-07-28T02:27:29.000Z",
 *               "updated_at": "2021-07-28T02:27:29.000Z",
 *               "generalInformation": "{}",
 *               "geoScope": "{}",
 *           }
 *       ]
 *   },
 *   "title": "Initiatives:Get summary."
 *  }
 *
 * @apiError Error : Get summary.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Summary not found in stage:", error }
 */
router.get("/:initiativeId([0-9]+)/summary/:stageId([0-9]+)", [checkJwt, checkRole('initiatives', 'readOwn')], initiatives.getSummary);


/**
 * @api {patch} /:initiativeId/summary/:stageId Summary - Upserts Initiative summary
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName PatchInitiativeSummary
 * @apiGroup Initiatives
 * 
 * @apiDescription  Upserts summary data from initiatives
 * 
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/initiatives/1/summary/3
 * 
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/initiatives/1/summary/3
 *
 * @apiHeader {String} auth
 * 
 * @apiParam {Number} initiativeId Id initiative
 * @apiParam {Number} stageId Id stage.
 * 
 * 
 * @apiSuccess {String} generalInformation general information data from initiatives.
 * @apiSuccess {String} geoScope regions and countries from initiatives.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *   "response": {
 *       "getLinks": [
 *           {
 *               "created_at": "2021-07-28T02:27:29.000Z",
 *               "updated_at": "2021-07-28T02:27:29.000Z",
 *               "generalInformation": "{}",
 *               "geoScope": "{}",
 *           }
 *       ]
 *   },
 *   "title": "Initiatives:Upsert summary."
 *  }
 *
 * @apiError Error : Upsert summary.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Summary not found in stage:", error }
 */
router.patch("/:initiativeId([0-9]+)/summary/:stageId([0-9]+)", [checkJwt, checkRole('initiatives', 'updateOwn')], initiatives.upsertSummary);

// assign budget
/**
 * @api {patch} initiatives/add-budget/:initiativeId/:stageId Budget - Create and update budget
 * @apiVersion 1.0.0
 * @apiPermission admin
 * @apiName PatchBudget
 * @apiGroup Initiatives
 * 
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/initiatives/add-budget/2/3
 * 
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/initiatives/add-budget/2/3
 * 
 * @apiHeader {String} auth
 * 
 * @apiParam {Number} initiativeId Id initiative
 * @apiParam {Number} stageId Id stage.
 *
 * @apiParam {Number} value budget value 
 * @apiParam {String} table_name table name - Metadata.
 * @apiParam {String} col_name column name - Metadata.
 * @apiParam {Number} budgetId This field will be used to update a budget.
 * @apiParam {Boolean} active status.
 * 
 * @apiParamExample {json} Request-Example:
 *  {
 * "value": 2352, 
 * "table_name": "context", 
 * "col_name": "priority_setting", 
 * "citationId": null,
 * "active":true
 * }
 * 
 * @apiSuccess {Date} created_at Creation date.
 * @apiSuccess {Date} updated_at  Update date.
 * @apiSuccess {Number} id  budget id.
 * @apiSuccess {Number} value budget value.
 * @apiSuccess {String} table_name Table to which the budget belongs.
 * @apiSuccess {String} col_name Colum to which the budget belongs.
 * @apiSuccess {Number} active status.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *   response: {
 *     addedBudget: {
 *       initvStg: '35',
 *       value: '1234',
 *       table_name: 'general-information',
 *       col_name: 'budget',
 *       active: '1',
 *       updated_at: '2021-08-12T20:39:05.000Z',
 *       created_at: '2021-08-12T20:39:05.000Z',
 *       id: 3
 *     }
 *   },
 *   title: 'Initiatives:Add Budget.'
 * }
 *
 * @apiError Error PatchBudget-Add budget
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Add budget: Error:", error }
 */
router.patch("/add-budget/:initiativeId([0-9]+)/:stageId([0-9]+)", [checkJwt, checkRole('initiatives', 'updateOwn')], initiatives.addBudget);


// get budget
/**
 * @api {post} initiatives/get-budget/:initiativeId/:stageId Budget - Read data of Budget.
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName PostBudget
 * @apiGroup Initiatives
 * 
 * @apiDescription  Shows budget filtered by initiative id, estage id and status
 * 
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/initiatives/get-budget/2/3
 * 
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/initiatives/get-budget/2/3
 *
 * @apiHeader {String} auth
 * 
 * @apiParam {Number} initiativeId Id initiative
 * @apiParam {Number} stageId Id stage.
 * 
 * @apiParam {String} table_name table name - Metadata.
 * @apiParam {String} col_name column name - Metadata.
 * @apiParam {Boolean} active status.
 * 
 * @apiParamExample {json} Request-Example:
 * {
 * "table_name": "general-information", 
 * "col_name": "budget", 
 * "active":true
 * }
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *   response: {
 *     getBudget: {
 *       created_at: '2021-08-12T20:30:22.000Z',
 *       updated_at: '2021-08-12T20:30:22.000Z',
 *       id: 1,
 *       value: '123.1200',
 *       table_name: 'general-information',
 *       col_name: 'budget',
 *       active: 0
 *     }
 *   },
 *   title: 'Initiatives:Get budget.'
 * }
 *
 * @apiError Error PostCitations-Get Budget.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Initiative not found in stage:", error }
 */
router.post("/get-budget/:initiativeId([0-9]+)/:stageId([0-9]+)", [checkJwt, checkRole('initiatives', 'updateOwn')], initiatives.getBudget);
router.delete("/delete-budget/:idBudget", [checkJwt], initiatives.removeBudget);


// get depth scale per impact indicator
/**
 * @api {get} /initiatives/depth-scale/:impactIndicatorId Get Depth Scale.
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetDepthScale
 * @apiGroup Initiatives
 * 
 * @apiDescription  Show validations (Green Checks)
 * 
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/initiatives/depth-scale/1
 * 
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/initiatives/depth-scale/1
 *
 * @apiHeader {String} auth Token
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "response": {
 *         "depthScale": [
 *             {
 *                 "id": 21,
 *                 "impactIndicatorId": 6,
 *                 "name": "Not applicable",
 *                 "active": 1,
 *                 "created_at": "2021-09-08T19:38:14.000Z",
 *                 "updated_at": "2021-09-08T19:38:14.000Z"
 *             }
 *         ]
 *     },
 *     "title": "Get Depth Scale."
 * }
 * 
 *
 * @apiError Error Get Depth Scale..
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Get Depth Scale.", error }
 */
router.get("/depth-scale/:impactIndicatorId([0-9]+)", [checkJwt], initiatives.getDepthScale);


// get depth description per impact indicator
/**
 * @api {get} /initiatives/depth-description/:impactIndicatorId Get Depth Description.
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetDepthDescription
 * @apiGroup Initiatives
 * 
 * @apiDescription  Show validations (Green Checks)
 * 
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/initiatives/depth-description/1
 * 
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/initiatives/depth-description/1
 *
 * @apiHeader {String} auth Token
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "response": {
 *         "depthScale": [
 *             {
 *                 "id": 21,
 *                 "impactIndicatorId": 6,
 *                 "name": "Not applicable",
 *                 "active": 1,
 *                 "created_at": "2021-09-08T19:38:14.000Z",
 *                 "updated_at": "2021-09-08T19:38:14.000Z"
 *             }
 *         ]
 *     },
 *     "title": "Get Depth Description."
 * }
 * 
 *
 * @apiError Error Get Depth Description.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Get Depth Description.", error }
 */
router.get("/depth-description/:impactIndicatorId([0-9]+)", [checkJwt], initiatives.getDepthDescription);




/**
 * 
 * Submit and replication
 */

// replicate to next stage
router.post("/replica/:currentInitiativeId([0-9]+)", [checkJwt], initiatives.replicationProcess);



/**
 * 
 * CLARISA to ST
 * 
 */

//get institutions from submission
router.get("/institutions", [checkJwt], initiatives.getInstitutions);

//get action areas from submission
router.get("/areas", [checkJwt], initiatives.getActionAreas);

//get impact areas from submission
router.get("/impact-areas", [checkJwt], initiatives.requestImpactAreas);

// get institutions types from submission
router.get("/institutions/types", [checkJwt], initiatives.getInstitutionsTypes);

// get Global targets
router.get("/global-targets", [checkJwt], initiatives.getGlobalTargets);

//get countries
router.get("/countries", [checkJwt], initiatives.getCountries);

//get regions
router.get("/regions", [checkJwt], initiatives.getRegions);


/**
 * 
 * CLARISA
 * 
 */

//get Action areas
// router.get("/areas", [checkJwt], initiatives.getActionAreas);
//get countries
// router.get("/countries", [checkJwt], initiatives.getCountries);
//get regions
// router.get("/regions", [checkJwt], initiatives.getRegions);
//get institutions from clarisa
// router.get("/institutions", [checkJwt], initiatives.getInstitutions);
// get institutions types
// router.get("/institutions/types", [checkJwt], initiatives.getInstitutionsTypes);
// get crps
router.get("/cgiar-entities", [checkJwt], clarisa.getClaCRPs);
//request institutions
router.post("/institutions/institution-requests", [checkJwt], clarisa.requestClaInstitution);
//get Impact areas
// router.get("/impact-areas", [checkJwt], initiatives.requestImpactAreas);
//get Impact areas inticators
router.get("/impact-areas/inidicators", [checkJwt], initiatives.requestImpactAreasIndicators);
//get Impact areas inticators
router.get("/projected-benefits", [checkJwt], initiatives.requestProjectedBenefits);
//get projected probabilities
router.get("/projected-probabilities", [checkJwt], initiatives.getProjectedProbabilities);
//get SDG Targets
router.get("/sdg-targets", [checkJwt], initiatives.getSdgTargets);
//get Action Areas Outcomes Indicators
router.get("/action-areas/outcomes-indicators", [checkJwt], initiatives.getActionAreasOutcomesIndicators);


/**
 * 
 * TOC
 * 
 */


//get Toc Narrative
router.get("/toc/narrative/:TocId", [checkJwt], toc.getTocNarrative);

export default router;