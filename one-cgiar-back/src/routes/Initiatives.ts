import { Router } from 'express';
import { getClaActionAreas, getClaCountries, getClaCRPs, getClaInstitutions, getClaInstitutionsTypes, getClaRegions, requestClaInstitution } from '../controllers/Clarisa';
import { getInitiatives, createInitiative, createStage, assignStageToInitiative, assignTOCsByInitvStg, 
        getInitiativesByUser, getStage, getUsersByInitiative, assignUsersByInitiative, getUserRoleByInitiative, 
        getStageMeta, getActionAreas, replicationProcess, getCountries, getRegions, getInstitutions, 
        getInstitutionsTypes, addLink, getLink, getSummary, addBudget, getBudget } from '../controllers/Initiatives';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';

const router = Router();

// get initiatives
// router.get("/", [checkJwt, checkRole('initiatives', 'readAny')], getInitiatives);

router.get("/", [checkJwt], getInitiatives);

// get initiatives by user
router.get("/own", [checkJwt, checkRole('initiatives', 'readOwn')], getInitiativesByUser);

// get roles by user in initiative
router.get("/:initiativeId([0-9]+)/roles/", [checkJwt, checkRole('initiatives', 'readOwn')], getUserRoleByInitiative);

// create initiatives
router.post("/", [checkJwt, checkRole('initiatives', 'createOwn')], createInitiative);

// get users by initiative
router.get("/:initiativeId([0-9]+)/users/", [checkJwt], checkRole('initiatives', 'readOwn'), getUsersByInitiative);

// get users by initiative
router.patch("/:initiativeId([0-9]+)/users/", [checkJwt], checkRole('initiatives', 'readOwn'), assignUsersByInitiative);


// get stages
router.get("/stages", [checkJwt], getStage);

// get stages meta
router.get("/stages-meta/:initiativeId([0-9]+)", [checkJwt], getStageMeta);

// create stages
router.post("/stages", [checkJwt, checkRole('stages', 'createAny')], createStage);

// assign stage to initiative
router.post("/assign-stage", [checkJwt, checkRole('initiatives', 'updateOwn')], assignStageToInitiative);


// assign TOC file to stage by initiative
router.post("/assign-files", [checkJwt, checkRole('stages', 'updateOwn')], assignTOCsByInitvStg);

// assign citation / link to initiative/
/**
 * @api {patch} initiatives/add-link/:initiativeId/:stageId Citations - Create and update citations
 * @apiVersion 1.0.0
 * @apiPermission admin
 * @apiName PatchCitations
 * @apiGroup Initiatives
 * 
 * @apiExample Example usage:
 * http://localhost:3000/api/initiatives/add-link/2/3
 * 
 * @apiSampleRequest http://localhost:3000/api/initiatives/add-link/2/3
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
router.patch("/add-link/:initiativeId([0-9]+)/:stageId([0-9]+)", [checkJwt, checkRole('initiatives', 'updateOwn')], addLink);

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
 * http://localhost:3000/api/initiatives/get-link/2/3
 * 
 * @apiSampleRequest http://localhost:3000/api/initiatives/get-link/2/3
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
router.post("/get-link/:initiativeId([0-9]+)/:stageId([0-9]+)", [checkJwt, checkRole('initiatives', 'updateOwn')], getLink);

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
 * http://localhost:3000/api/initiatives/1/summary/3
 * 
 * @apiSampleRequest http://localhost:3000/api/initiatives/1/summary/3
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
router.get("/:initiativeId([0-9]+)/summary/:stageId([0-9]+)", [checkJwt, checkRole('initiatives', 'readOwn')], getSummary);

// assign budget
/**
 * @api {patch} initiatives/add-budget/:initiativeId/:stageId Budget - Create and update budget
 * @apiVersion 1.0.0
 * @apiPermission admin
 * @apiName PatchBudget
 * @apiGroup Initiatives
 * 
 * @apiExample Example usage:
 * http://localhost:3000/api/initiatives/add-budget/2/3
 * 
 * @apiSampleRequest http://localhost:3000/api/initiatives/add-budget/2/3
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
 router.patch("/add-budget/:initiativeId([0-9]+)/:stageId([0-9]+)", [checkJwt, checkRole('initiatives', 'updateOwn')], addBudget);


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
 * http://localhost:3000/api/initiatives/get-budget/2/3
 * 
 * @apiSampleRequest http://localhost:3000/api/initiatives/get-budget/2/3
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
router.post("/get-budget/:initiativeId([0-9]+)/:stageId([0-9]+)", [checkJwt, checkRole('initiatives', 'updateOwn')], getBudget);





/**
 * 
 * Submit and replication
 */

// replicate to next stage
router.post("/replica/:currentInitiativeId([0-9]+)", [checkJwt], replicationProcess);




/**
 * 
 * CLARISA
 * 
 */

//get Action areas
router.get("/areas", [checkJwt], getActionAreas);
//get countries
router.get("/countries", [checkJwt], getCountries);
//get regions
router.get("/regions", [checkJwt], getRegions);
//get institutions
router.get("/institutions", [checkJwt], getInstitutions);
// get institutions types
router.get("/institutions/types", [checkJwt], getInstitutionsTypes);
// get crps
router.get("/cgiar-entities", [checkJwt], getClaCRPs);
//request institutions
router.post("/institutions/institution-requests", [checkJwt], requestClaInstitution);


export default router;