import { Router } from "express";
import * as stagefull from "../controllers/StageFullProposal";
import { checkJwt } from "../middlewares/jwt";
import { uploadFile } from "../middlewares/multer";
import { checkRole } from "../middlewares/role";

const router = Router();

// get initiative general information
router.get("/:initiativeId([0-9]+)/general-information", [checkJwt, checkRole('initiatives', 'readOwn')], stagefull.getGeneralInformation);

// upsert initiative general information
router.patch("/:initiativeId([0-9]+)/general-information", [checkJwt, checkRole('initiatives', 'updateOwn')], stagefull.upsertGeneralInformation);

// get initiative context
router.get("/:initiativeId([0-9]+)/context", [checkJwt, checkRole('initiatives', 'readOwn')], stagefull.getContext);

// upsert initiative context
router.patch("/:initiativeId([0-9]+)/context", [checkJwt, checkRole('initiatives', 'updateOwn')], stagefull.upsertContext);

// read work packages list
/**
 * @api {get} stages-control/proposal/packages/:initiativeId Work package - Request workpackage
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetWorkPackage
 * @apiGroup Proposal
 * 
 * @apiDescription  Shows work packages data from initiatives
 * 
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/packages/2
 * 
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/packages/2
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
 *         "workpackage": [
 *             {
 *                 "created_at": "2021-05-21T19:14:34.000Z",
 *                 "updated_at": "2021-05-21T19:14:34.000Z",
 *                 "id": 41,
 *                 "active": 1,
 *                 "name": "Market intelligence",
 *                 "acronym": "Work Package 1",
 *                 "results": "CGIAR GI initiatives and public and private sector partners collaboratively share, access and use a shared digital infrastructure for global and local market intelligence to build and prioritize investment cases, develop product profiles and address stage gate decision making.",
 *                 "pathway_content": "Design and implement market intelligence that characterizes current and future needs and perceptions of improved value across crops, varieties and traits in key regions. Approaches will consider priorities and needs of different actors (e.g., processors, seed businesses, consumers, women and men farmers) and potential mediating factors (e.g., policies, trade, technology, market structure, culture).",
 *                 "is_global": null
 *             }
 * 			
 * 			     ]
 *     },
 *     "title": "Full Proposal: Workpackage."
 * }
 *
 * @apiError Error : Get workpackage.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Get workpackage:", error }
 */
router.get("/packages/:initiativeId([0-9]+)", [checkJwt, checkRole('packages', 'readOwn')], stagefull.getWorkPackages);

// read work package for id
/**
 * @api {get} stages-control/proposal/package/:wrkPkgId Work package - Request workpackage for id
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetWorkPackageId
 * @apiGroup Proposal
 * 
 * @apiDescription  Shows work package data from initiatives
 * 
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/package/177
 * 
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/package/177
 *
 * @apiHeader {String} auth
 * 
 * @apiParam {Number} wrkPkgId Id WP
 * 
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *      "response": {
 *          "workpackage": [
 *              {
 *                  "created_at": "2021-08-31T16:39:08.000Z",
 *                  "updated_at": "2021-08-31T16:39:08.000Z",
 *                  "id": 177,
 *                  "active": 1,
 *                  "name": "One CGIAR nodes of excellence for utilization of state-of-the-art precision genetics",
 *                  "acronym": "Work Package 1",
 *                  "results": null,
 *                  "pathway_content": "Gain access and develop state-of-the-art precision genetic technologies  and associated enabling technologies such as allele replacement, DNA-free editing, double haploid; establish three nodes of excellence (LAC, Africa, Asia) with One CGIAR focus crop specialization and linked phenotyping facilities in relevant locations.",
 *                  "is_global": null,
 *                  "regions": [
 *                      {
 *                          "id": 2007,
 *                          "region_id": 5,
 *                          "initvStgId": 35,
 *                          "wrkPkgId": 177
 *                      },
 *                      {
 *                          "id": 2008,
 *                          "region_id": 34,
 *                          "initvStgId": 35,
 *                          "wrkPkgId": 177
 *                      }
 *  
 *                  ],
 *                  "countries": []
 *              }
 *          ]
 *      },
 *      "title": "Full Proposal: Workpackage id."
 *  }
 *
 * @apiError Error : Get workpackage id.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Get workpackage id:", error }
 */
router.get("/package/:wrkPkgId([0-9]+)", [checkJwt, checkRole('packages', 'readOwn')], stagefull.getWorkPackage);

// read all work package
router.get("/packages", stagefull.getAllWorkPackages);

// assign Work Package
/**
 * @api {patch} stages-control/proposal/package/:wrkPkgId Work Package - Create and update WP
 * @apiVersion 1.0.0
 * @apiPermission admin
 * @apiName PatchWorkPackage
 * @apiGroup Proposal
 * 
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/package/2
 * 
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/package/2
 * 
 * @apiHeader {String} auth
 * 
 * @apiParam {Number} initiativeId Id initiative
 *
 * @apiParam {Number} id identificator wp
 * @apiParam {String} acronym short description wp.
 * @apiParam {String} name name wp.
 * @apiParam {String} pathway_content narrative wp.
 * @apiParam {Number} is_global indicator if wp is global.
 * @apiParam {Boolean} active status.
 * @apiParam {Object} regions regions wp.
 * @apiParam {Object} countries countries wp.
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *     "acronym": "Work Package 6",
 *     "name": "khe waza? nuevo 1235411 test",
 *     "pathway_content": "Esta es una humilde prueba",
 *     "is_global": true,
 *     "id": 256,
 *     "regions": [
 *            {
 *             "name": "Eastern Africa",
 *             "parentRegion": {
 *                 "name": "Sub-Saharan Africa",
 *                 "um49Code": 202
 *             },
 *             "um49Code": 14,
 *             "region_id": 14,
 *             "selected": true,
 *             "wrkPkg": 256
 *         }
 *     ],
 *     "countries": []
 * }
 * 
 * 
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{
 *    "response": {
 *        "workpackage": {
 *            "id": 256,
 *            "active": true,
 *            "name": "khe waza? nuevo 1235411 test",
 *            "results": null,
 *            "pathway_content": "Esta es una humilde prueba a",
 *            "is_global": true,
 *            "initvStgId": 35,
 *            "created_at": "2021-09-01T22:54:54.000Z",
 *            "updated_at": "2021-09-01T22:54:54.000Z",
 *            "acronym": "Work Package 7"
 *        },
 *        "upsertedGeoScope": {
 *            "regions": [
 *                {
 *                    "name": "Eastern Africa",
 *                    "parentRegion": {
 *                        "name": "Sub-Saharan Africa",
 *                        "um49Code": 202
 *                    },
 *                    "um49Code": 14,
 *                    "region_id": 14,
 *                    "selected": true,
 *                    "wrkPkg": 256,
 *                    "initvStg": 35,
 *                    "updated_at": "2021-09-10T21:28:44.000Z",
 *                    "created_at": "2021-09-10T21:28:44.000Z",
 *                    "id": 2272
 *                }
 *            ],
 *            "countries": []
 *        }
 *    },
    "title": "Full Proposal: Patch Workpackage."
}
 *
 * @apiError Error Work Package: Full proposal
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {"name": "Work Package: Full proposal","httpCode": 400,"isOperational": false}
 */
router.patch("/packages/:initiativeId([0-9]+)", [checkJwt, checkRole('packages', 'updateOwn')], stagefull.patchWorkPackage);

// upsert projection benefits to initiative
router.patch("/projection-benefits/:initiativeId([0-9]+)", [checkJwt, checkRole('benefits', 'updateOwn')], stagefull.patchProjectionBenefits);

// get all projection benefits
router.get("/projection-benefits/:initiativeId([0-9]+)", [checkJwt, checkRole('benefits', 'readOwn')], stagefull.getProjectionBenefits);

// get projection benefits per impact area
router.get("/projection-benefits/:initiativeId([0-9]+)/:impactId([0-9]+)", [checkJwt, checkRole('benefits', 'readOwn')], stagefull.getProjectionBenefitsByImpact);

// upsert impact strategies to initiative
router.patch("/impact-strategies/:initiativeId([0-9]+)", [checkJwt, checkRole('strategies', 'updateOwn')], stagefull.patchImpactStrategies);

// get impact strategies to initiative
router.get("/impact-strategies/:initiativeId([0-9]+)/:impactAreaId([0-9]+)", [checkJwt, checkRole('strategies', 'readOwn')], stagefull.getImpactStrategies);

// upsert melia and files to initiative
router.patch("/melia/:initiativeId([0-9]+)/:ubication/:stageId", [checkJwt,checkRole('melia', 'updateOwn'), uploadFile.any()], stagefull.patchMeliaAndFiles);

// Get melia and files to initiative
router.get("/melia/:initiativeId([0-9]+)/:sectionName", [checkJwt, checkRole('melia', 'readOwn')], stagefull.getMeliaAndFiles);

// upsert management plan risk and files to initiative
/**
 * @api {patch} stages-control/proposal/manage-plan/:initiativeId/:ubication/:stageId Manage Plan and Risk - Create and update MPR
 * @apiVersion 1.0.0
 * @apiPermission admin
 * @apiName PatchManagePlan
 * @apiGroup Proposal
 * 
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/manage-plan/2/7.manage-plan/3
 * 
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/manage-plan/2/7.manage-plan/3
 * 
 * @apiHeader {String} auth
 * 
 * @apiParam {Number} initiativeId Id initiative
 * @apiParam {Number} id identificator Manage Plan
 * @apiParam {String} gender_diversity_inclusion description gender diversity inclusion.
 * @apiParam {Boolean} active status.
 * @apiParam {String} section section location.
 * @apiParam {Object} updateFiles file to updtate.
 * @apiParam {File} file template Manage Plan
 * 
 * @apiParamExample {json} Request-Example:
 * data: [
 * {   "id":null,
 *     "management_plan": "new plan",
 *     "active": true,
 *     "section":"management_plan",
 *     "updateFiles":[]
 * }
 * ]
 *  
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *   "response": {
 *       "managePlanRisk": {
 *           "upsertedManagePlan": {
 *               "id": 1,
 *               "management_plan": "new plan",
 *               "active": true,
 *               "initvStgId": 35,
 *               "updated_at": "2021-09-20T20:03:51.000Z",
 *               "created_at": "2021-09-20T20:03:51.000Z"
 *           },
 *           "upsertedFile": {
 *               "id": 73,
 *               "active": true,
 *               "manage_plan_risk_id": 1,
 *               "section": "management_plan",
 *               "url": "http://localhost:3000/uploads/INIT-2/7.manage-plan/stage-3/1632168231799-Book1.xlsx",
 *               "name": "Book1.xlsx",
 *               "updated_at": "2021-09-20T20:03:51.000Z",
 *               "created_at": "2021-09-20T20:03:51.000Z"
 *           }
 *       },
 *       "files": [
 *           {
 *               "fieldname": "file",
 *               "originalname": "Book1.xlsx",
 *               "encoding": "7bit",
 *               "mimetype": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
 *               "destination": "./public/uploads/INIT-2/7.manage-plan/stage-3",
 *               "filename": "1632168231799-Book1.xlsx",
 *               "path": "public\\uploads\\INIT-2\\7.manage-plan\\stage-3\\1632168231799-Book1.xlsx",
 *               "size": 22386
 *           }
 *       ]
 *   },
 *   "title": "Full Proposal: Patch management plan and risk."
 *   }
 *
 * @apiError Error Upsert management plan risk: Full proposal
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {"name": "Upsert management plan risk: Full proposal","httpCode": 400,"isOperational": false}
 */
router.patch("/manage-plan/:initiativeId([0-9]+)/:ubication/:stageId", [checkJwt,checkRole('mpr', 'updateOwn'), uploadFile.any()], stagefull.patchManagePlanAndFiles);

// Get management plan risk and files to initiative
/**
 * @api {get} stages-control/proposal/manage-plan/:initiativeId/:ubication/:stageId Manage Plan and Risk - Request MPR
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetManagePlan
 * @apiGroup Proposal
 * 
 * @apiDescription  Shows Manage Plan and Risk
 * 
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/manage-plan/2/management-plan
 * 
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/manage-plan/2/management-plan
 *
 * @apiHeader {String} auth
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "response": {
 *         "managePlanData": {
 *             "id": 1,
 *             "initvStgId": 35,
 *             "management_plan": "new plan",
 *             "active": 1,
 *             "created_at": "2021-09-20T20:03:51.000Z",
 *             "updated_at": "2021-09-20T20:03:51.000Z",
 *             "files": [
 *                 {
 *                     "id": 73,
 *                     "tocsId": null,
 *                     "url": "http://localhost:3000/uploads/INIT-2/7.manage-plan/stage-3/1632168231799-Book1.xlsx",
 *                     "name": "Book1.xlsx",
 *                     "active": 1,
 *                     "created_at": "2021-09-20T20:03:51.000Z",
 *                     "updated_at": "2021-09-20T20:03:51.000Z",
 *                     "meliaId": null,
 *                     "manage_plan_risk_id": 1,
 *                     "humanId": null,
 *                     "financial_resources_id": null,
 *                     "section": "management_plan"
 *                 }
 *             ]
 *         }
 *     },
 *     "title": "Full Proposal: manage plan risk  and files."
 * }
 *
 * @apiError Error : Get manage plan risk and files: Full proposal
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Get manage plan risk and files: Full proposal", error }
 */
router.get("/manage-plan/:initiativeId([0-9]+)/:sectionName", [checkJwt, checkRole('mpr', 'readOwn')], stagefull.getManagePlanAndFiles);

// upsert human resources and files to initiative
/**
 * @api {patch} stages-control/proposal/human-resources/:initiativeId/:ubication/:stageId Human Resources - Create and update HR
 * @apiVersion 1.0.0
 * @apiPermission admin
 * @apiName PatchHumanResources
 * @apiGroup Proposal
 * 
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/human-resources/2/9.human-resources/3
 * 
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/human-resources/2/9.human-resources/3
 * 
 * @apiHeader {String} auth
 * 
 * @apiParam {Number} initiativeId Id initiative
 * @apiParam {Number} id identificator Human Resources
 * @apiParam {String} gender_diversity_inclusion description gender diversity inclusion.
 * @apiParam {String} capacity_development description capacity development.
 * @apiParam {Boolean} active status.
 * @apiParam {String} section section location.
 * @apiParam {Object} updateFiles file to updtate.
 * @apiParam {File} file template Human Resources
 * 
 * @apiParamExample {json} Request-Example:
 * data: [
 * {   "id":null,
 *    "gender_diversity_inclusion": "",
 *   "capacity_development": "",
 *    "active": true,
 *    "section":"initiative-team",
 *    "updateFiles":[]
 * }
 * ]
 *  
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *   "response": {
 *       "humanResources": {
 *           "upsertedHumanResources": {
 *               "id": 1,
 *               "gender_diversity_inclusion": "",
 *               "capacity_development": "",
 *               "active": true,
 *               "initvStgId": 35,
 *               "updated_at": "2021-09-20T19:43:28.000Z",
 *               "created_at": "2021-09-20T19:43:28.000Z"
 *           },
 *           "upsertedFile": {
 *               "id": 72,
 *               "active": true,
 *               "humanId": 1,
 *               "section": "initiative-team",
 *               "url": "http://localhost:3000/uploads/INIT-2/9.human-resources/stage-3/1632167008334-Book1.xlsx",
 *               "name": "Book1.xlsx",
 *               "updated_at": "2021-09-20T19:43:28.000Z",
 *               "created_at": "2021-09-20T19:43:28.000Z"
 *           }
 *       },
 *       "files": [
 *           {
 *               "fieldname": "file",
 *               "originalname": "Book1.xlsx",
 *               "encoding": "7bit",
 *               "mimetype": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
 *               "destination": "./public/uploads/INIT-2/9.human-resources/stage-3",
 *               "filename": "1632167008334-Book1.xlsx",
 *               "path": "public\\uploads\\INIT-2\\9.human-resources\\stage-3\\1632167008334-Book1.xlsx",
 *               "size": 22386
 *           }
 *       ]
 *   },
 *   "title": "Full Proposal: Patch human resources."
 *  }
 *
 * @apiError Error Full Proposal: Patch human resources.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {"name": "Upsert human Resources: Full proposal","httpCode": 400,"isOperational": false}
 */
router.patch("/human-resources/:initiativeId([0-9]+)/:ubication/:stageId", [checkJwt,checkRole('hr', 'updateOwn'), uploadFile.any()], stagefull.patchHumanResourcesAndFiles);

// Get human resources and files to initiative
/**
 * @api {get} stages-control/proposal/human-resources/:initiativeId/:ubication/:stageId Human Resources - Request Human Resources
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetHumanResources
 * @apiGroup Proposal
 * 
 * @apiDescription  Shows Human Resources
 * 
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/human-resources/2/initiative-team
 * 
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/human-resources/2/initiative-team
 *
 * @apiHeader {String} auth
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *   "response": {
 *       "humanResourcesData": {
 *           "id": 1,
 *           "initvStgId": 35,
 *           "gender_diversity_inclusion": "",
 *           "capacity_development": "",
 *           "active": 1,
 *           "created_at": "2021-09-20T19:43:28.000Z",
 *           "updated_at": "2021-09-20T19:43:28.000Z",
 *           "files": [
 *               {
 *                   "id": 72,
 *                   "tocsId": null,
 *                   "url": "http://localhost:3000/uploads/INIT-2/9.human-resources/stage-3/1632167008334-Book1.xlsx",
 *                   "name": "Book1.xlsx",
 *                   "active": 1,
 *                   "created_at": "2021-09-20T19:43:28.000Z",
 *                   "updated_at": "2021-09-20T19:43:28.000Z",
 *                   "meliaId": null,
 *                   "manage_plan_risk_id": null,
 *                   "humanId": 1,
 *                   "financial_resources_id": null,
 *                   "section": "initiative-team"
 *               }
 *           ]
 *       }
 *   },
 *   "title": "Full Proposal:human resources and files."
 *  }
 *
 * @apiError Error : Get human resources and files: Full proposal
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Get human resources and files: Full proposal", error }
 */
router.get("/human-resources/:initiativeId([0-9]+)/:sectionName", [checkJwt, checkRole('hr', 'readOwn')], stagefull.getHumanResources);

// upsert financial resources and files to initiative
/**
 * @api {patch} stages-control/proposal/financial-resources/:initiativeId/:ubication/:stageId Financial Resources - Create and update FR
 * @apiVersion 1.0.0
 * @apiPermission admin
 * @apiName PatchFinancialResources
 * @apiGroup Proposal
 * 
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/financial-resources/2/10.financial-resources/3
 * 
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/financial-resources/2/10.financial-resources/3
 * 
 * @apiHeader {String} auth
 * 
 * @apiParam {Number} initiativeId Id initiative
 * @apiParam {Number} id identificator Financial Resources
 * @apiParam {String} detailed_budget description budget.
 * @apiParam {Boolean} active status.
 * @apiParam {String} section section location.
 * @apiParam {Object} updateFiles file to updtate.
 * @apiParam {File} file template Financial Resources
 * 
 * @apiParamExample {json} Request-Example:
 * data: [
 * {   "id":null,
 *   "detailed_budget": "new detail",
 *   "active": true,
 *   "section":"budget",
 *   "updateFiles":[]
 * }
 * ]
 *  
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
 *   "response": {
 *       "financialResources": {
 *           "upsertedFinancialResources": {
 *               "id": 6,
 *               "detailed_budget": "new detail",
 *                "active": true,
 *                "initvStgId": 35,
 *                "updated_at": "2021-09-20T17:21:59.000Z",
 *                "created_at": "2021-09-20T17:21:59.000Z"
 *            },
 *            "upsertedFile": {
 *                "id": 71,
 *                "active": true,
 *                "financial_resources_id": 6,
 *                "section": "budget",
 *                "url": "http://localhost:3000/uploads/INIT-2/10.financial-resources/stage-3/1632158519519-Book1.xlsx",
 *                "name": "Book1.xlsx",
 *                "updated_at": "2021-09-20T17:21:59.000Z",
 *                "created_at": "2021-09-20T17:21:59.000Z"
 *            }
 *        },
 *        "files": [
 *            {
 *                "fieldname": "file",
 *                "originalname": "Book1.xlsx",
 *                "encoding": "7bit",
 *                "mimetype": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
 *                "destination": "./public/uploads/INIT-2/10.financial-resources/stage-3",
 *                "filename": "1632158519519-Book1.xlsx",
 *                "path": "public\\uploads\\INIT-2\\10.financial-resources\\stage-3\\1632158519519-Book1.xlsx",
 *                "size": 22386
 *            }
 *        ]
 *    },
 *    "title": "Full Proposal: Patch financial resources"
 *}
 *
 * @apiError Error Full Proposal: Patch financial resources
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {"name": "Upsert financial Resources: Full proposal","httpCode": 400,"isOperational": false}
 */
router.patch("/financial-resources/:initiativeId([0-9]+)/:ubication/:stageId", [checkJwt,checkRole('fr', 'updateOwn'), uploadFile.any()], stagefull.patchFinancialResourcesAndFiles);

// Get financial resources and files to initiative
/**
 * @api {get} stages-control/proposal/financial-resources/:initiativeId/:ubication/:stageId Financial Resources - Request Financial Resources
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetFinancialResources
 * @apiGroup Proposal
 * 
 * @apiDescription  Shows Financial Resources
 * 
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/financial-resources/2/budget
 * 
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/financial-resources/2/budget
 *
 * @apiHeader {String} auth
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *   "response": {
 *       "financialResourcesData": {
 *           "id": 2,
 *           "initvStgId": 35,
 *           "detailed_budget": "new detail",
 *           "active": 1,
 *           "created_at": "2021-09-20T17:06:53.000Z",
 *           "updated_at": "2021-09-20T17:06:53.000Z",
 *           "files": [
 *               {
 *                   "id": 69,
 *                   "tocsId": null,
 *                   "url": "http://localhost:3000/uploads/INIT-2/financial-resources/stage-3/1632157613540-Book1.xlsx",
 *                   "name": "Book1.xlsx",
 *                   "active": 1,
 *                   "created_at": "2021-09-20T17:06:53.000Z",
 *                   "updated_at": "2021-09-20T17:06:53.000Z",
 *                   "meliaId": null,
 *                   "manage_plan_risk_id": null,
 *                   "humanId": null,
 *                   "financial_resources_id": 2,
 *                   "section": "budget"
 *               }
 *           ]
 *       }
 *   },
 *   "title": "Full Proposal:financial resources and files."
 * }
 *
 * @apiError Error : Get financial resources and files: Full proposal.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Get financial resources and files: Full proposal.", error }
 */
router.get("/financial-resources/:initiativeId([0-9]+)/:sectionName", [checkJwt, checkRole('fr', 'readOwn')], stagefull.getFinancialResources);

// upsert policy compliance oversight to initiative
/**
 * @api {patch} stages-control/proposal/policy-compliance/:initiativeId/ Policy Compliance - Create and update PCO
 * @apiVersion 1.0.0
 * @apiPermission admin
 * @apiName PatchPolicyCompliance
 * @apiGroup Proposal
 * 
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/policy-compliance/2
 * 
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/policy-compliance/2
 * 
 * @apiHeader {String} auth
 * 
 * @apiParam {Number} initiativeId Id initiative.
 * @apiParam {Number} id identificator Policy Compliance.
 * @apiParam {Boolean} research_governance_policy Policy research governance.
 * @apiParam {Boolean} open_fair_data_policy Policy open fair data.
 * @apiParam {String} open_fair_data_details description Open fair data.
 * @apiParam {Boolean} active status.
 * 
 * @apiParamExample {json} Request-Example:
 *  {
 *   "id": null,
 *   "research_governance_policy": true,
 *   "open_fair_data_policy": false,
 *   "open_fair_data_details": "Test 1 policy",
 *   "active": true
 *  }
 *  
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     "response": {
 *         "policyComplianceOversight": {
 *             "upsertedPolicyCompliance": {
 *                 "id": 3,
 *                 "research_governance_policy": true,
 *                 "open_fair_data_policy": false,
 *                 "open_fair_data_details": "Test 1 policy",
 *                 "active": true,
 *                 "initvStgId": 40,
 *                 "updated_at": "2021-09-21T19:31:10.000Z",
 *                 "created_at": "2021-09-21T19:31:10.000Z"
 *             }
 *         }
 *     },
 *     "title": "Full Proposal: Patch policy compliance oversight."
 * }
 *
 * @apiError Error Upsert policy compliance oversight: Full proposal
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {"name": "Upsert policy compliance oversight: Full proposal","httpCode": 400,"isOperational": false}
 */
router.patch("/policy-compliance/:initiativeId([0-9]+)", [checkJwt,checkRole('pco', 'updateOwn')], stagefull.patchPolicyComplianceOversight);

// Get policy compliance oversight to initiative
/**
 * @api {get} stages-control/proposal/policy-compliance/:initiativeId Policy Compliance - Request PCO
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetPolicyCompliance
 * @apiGroup Proposal
 * 
 * @apiDescription  Shows Policy Compliance Oversight
 * 
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/policy-compliance/10
 * 
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/policy-compliance/10
 *
 * @apiHeader {String} auth
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "response": {
 *         "policyComplianceData": {
 *             "id": 3,
 *             "initvStgId": 40,
 *             "research_governance_policy": 1,
 *             "open_fair_data_policy": 0,
 *             "open_fair_data_details": "Test 1 policy",
 *             "active": 1,
 *             "created_at": "2021-09-21T19:31:10.000Z",
 *             "updated_at": "2021-09-21T19:31:10.000Z"
 *         }
 *     },
 *     "title": "Full Proposal:policy compliance oversight"
 * }
 *
 * @apiError Error : Get policy compliance oversight.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Get policy compliance oversight.", error }
 */
router.get("/policy-compliance/:initiativeId([0-9]+)", [checkJwt, checkRole('pco', 'readOwn')], stagefull.getPolicyComplianceOversight);


export default router;