import {Router} from 'express';
import * as stagefull from '../controllers/StageFullProposalController';
import {checkJwt} from '../middlewares/jwt';
import {uploadFile} from '../middlewares/multer';
import {checkRole} from '../middlewares/role';

const router = Router();

// get initiative general information
router.get(
  '/:initiativeId([0-9]+)/general-information',
  [checkJwt, checkRole('initiatives', 'readOwn')],
  stagefull.getGeneralInformation
);

// upsert initiative general information
router.patch(
  '/:initiativeId([0-9]+)/general-information',
  [checkJwt, checkRole('initiatives', 'updateOwn')],
  stagefull.upsertGeneralInformation
);

// get initiative context
router.get(
  '/:initiativeId([0-9]+)/context',
  [checkJwt, checkRole('initiatives', 'readOwn')],
  stagefull.getContext
);

// upsert initiative context
router.patch(
  '/:initiativeId([0-9]+)/context',
  [checkJwt, checkRole('initiatives', 'updateOwn')],
  stagefull.upsertContext
);

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
router.get(
  '/packages/:initiativeId([0-9]+)',
  [checkJwt, checkRole('packages', 'readOwn')],
  stagefull.getWorkPackages
);

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
router.get(
  '/package/:wrkPkgId([0-9]+)',
  [checkJwt, checkRole('packages', 'readOwn')],
  stagefull.getWorkPackage
);

// read all work package
/**
 * @api {get} stages-control/proposal/packages Work package - Request All work packages
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetAllWorkPackage
 * @apiGroup Proposal
 *
 * @apiDescription  Shows all work packages for Clarisas
 *
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/packages
 *
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/packages
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
 *     "title": "Full Proposal: All Work Package."
 * }
 *
 * @apiError Error : Get All work packages.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Get All work packages:", error }
 */
router.get('/packages', stagefull.getAllWorkPackages);

// assign Work Package
/**
 * @api {patch} stages-control/proposal/packages/:wrkPkgId Work Package - Create and update WP
 * @apiVersion 1.0.0
 * @apiPermission admin
 * @apiName PatchWorkPackage
 * @apiGroup Proposal
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
router.patch(
  '/packages/:initiativeId([0-9]+)',
  [checkJwt, checkRole('packages', 'updateOwn')],
  stagefull.patchWorkPackage
);

// upsert projection benefits to initiative
router.patch(
  '/projection-benefits/:initiativeId([0-9]+)',
  [checkJwt, checkRole('benefits', 'updateOwn')],
  stagefull.patchProjectionBenefits
);

// get all projection benefits
router.get(
  '/projection-benefits/:initiativeId([0-9]+)',
  [checkJwt, checkRole('benefits', 'readOwn')],
  stagefull.getProjectionBenefits
);

// get projection benefits per impact area
router.get(
  '/projection-benefits/:initiativeId([0-9]+)/:impactId([0-9]+)',
  [checkJwt, checkRole('benefits', 'readOwn')],
  stagefull.getProjectionBenefitsByImpact
);

// upsert impact strategies to initiative
/**
 * @api {patch} stages-control/proposal/impact-strategies/:initiativeId Impact Strategies - Create and update
 * @apiVersion 1.0.0
 * @apiPermission admin
 * @apiName PatchImpactStrategies
 * @apiGroup Proposal
 *
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/impact-strategies/2
 *
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/impact-strategies/2
 *
 * @apiHeader {String} auth
 *
 * @apiParam {Number} initiativeId Id initiative.
 * @apiParam {Number} id identificator Impact Strategiese.
 * @apiParam {String} challenge_priorization description challenge priorization.
 * @apiParam {String} research_questions description research questions.
 * @apiParam {String} component_work_package description component work package.
 * @apiParam {String} performance_results description performance results.
 * @apiParam {String} human_capacity description human capacity.
 * @apiParam {Number} impact_area_id impact area id.
 * @apiParam {String} impact_area_name impact area name.
 * @apiParam {Boolean} active status.
 * @apiParam {Object} partners partners to updtate.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *     "id": 1,
 *     "active": true,
 *     "challenge_priorization": "Test challenge",
 *     "research_questions": "",
 *     "component_work_package": "",
 *     "performance_results": "",
 *     "human_capacity": "",
 *     "impact_area_id": 1,
 *     "impact_area_name": "Test impact Area",
 *     "partners": [
 *         {
 *             "id": null,
 *             "impact_strategies_id": 1,
 *             "code": 1,
 *             "name": "Wageningen University and Research Centre",
 *             "tag_id": 1,
 *             "institutionTypeId":3,
 *             "institutionType":"CGIAR Center",
 *             "active": true
 *         }
 *     ]
 * }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "response": {
 *         "impactStrategies": {
 *             "upsertedImpactStrategies": {
 *                 "created_at": "2021-09-21T21:13:33.000Z",
 *                 "updated_at": "2021-09-21T21:13:33.000Z",
 *                 "id": 1,
 *                 "initvStgId": 35,
 *                 "active": true,
 *                 "challenge_priorization": "Test challenge",
 *                 "research_questions": "",
 *                 "component_work_package": "",
 *                 "performance_results": "",
 *                 "human_capacity": "",
 *                 "impact_area_id": 1,
 *                 "impact_area_name": "Test impact Area"
 *             },
 *             "upsertedPartners": {
 *                 "id": 1,
 *                 "impact_strategies_id": 1,
 *                 "institutions_id": 1,
 *                 "institutions_name": "Wageningen University and Research Centre",
 *                 "tag_id": 1,
 *                 "institutionTypeId": 3,
 *                 "type_name": "CGIAR Center",
 *                 "active": true,
 *                 "updated_at": "2021-09-21T21:14:11.000Z",
 *                 "created_at": "2021-09-21T21:14:11.000Z"
 *             }
 *         }
 *     },
 *     "title": "Full Proposal: Patch Impact Strategies."
 * }
 *
 * @apiError Error Upsert Impact Strategies: Full proposal
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {"name": "Upsert Impact Strategies: Full proposal","httpCode": 400,"isOperational": false}
 */
router.patch(
  '/impact-strategies/:initiativeId([0-9]+)',
  [checkJwt, checkRole('strategies', 'updateOwn')],
  stagefull.patchImpactStrategies
);

// get impact strategies to initiative
/**
 * @api {get} stages-control/proposal/impact-strategies/:initiativeId/:impactAreaId Impact Strategies - Request Impact Strategies
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetImpactStrategies
 * @apiGroup Proposal
 *
 * @apiDescription  Shows Impact Strategies by impact area
 *
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/impact-strategies/2/1
 *
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/impact-strategies/2/1
 *
 * @apiHeader {String} auth
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "response": {
 *         "impactStrategies": {
 *             "impactStrategies": [
 *                 {
 *                     "id": 2,
 *                     "initvStgId": 42,
 *                     "active": 1,
 *                     "challenge_priorization": "Test challenge",
 *                     "research_questions": "",
 *                     "component_work_package": "",
 *                     "performance_results": "",
 *                     "human_capacity": "",
 *                     "created_at": "2021-09-21T21:32:15.000Z",
 *                     "updated_at": "2021-09-21T21:32:15.000Z",
 *                     "impact_area_id": 1,
 *                     "impact_area_name": "Test impact Area",
 *                     "partners": [
 *                         {
 *                             "id": 3,
 *                             "impact_strategies_id": 2,
 *                             "code": 1,
 *                             "name": "Wageningen University and Research Centre",
 *                             "tag_id": 1,
 *                             "type_id": 3,
 *                             "institutionType": "CGIAR Center",
 *                             "active": 1,
 *                             "created_at": "2021-09-21T21:32:15.000Z",
 *                             "updated_at": "2021-09-21T21:32:15.000Z"
 *                         }
 *                     ]
 *                 }
 *             ]
 *         }
 *     },
 *     "title": "Full Proposal: Get Impact Stretegies."
 * }
 *
 * @apiError Error : Get Impact Strategies: Full proposal.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Get Impact Strategies: Full proposal.", error }
 */
router.get(
  '/impact-strategies/:initiativeId([0-9]+)/:impactAreaId([0-9]+)',
  [checkJwt, checkRole('strategies', 'readOwn')],
  stagefull.getImpactStrategies
);

// upsert melia and files to initiative
/**
 * @api {patch} stages-control/proposal/melia/:initiativeId/ MELIA - Create and update MELIA
 * @apiVersion 1.0.0
 * @apiPermission admin
 * @apiName PatchMELIA
 * @apiGroup Proposal
 *
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/melia/2
 *
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/melia/2
 *
 * @apiHeader {String} auth Token
 *
 * @apiParam {Number} initiativeId Id initiative.
 *
 * @apiParamExample {json} Request-Example:
 * data: [
 *    {
 *        "id": null,
 *        "melia_plan": "new plan",
 *        "active": true,
 *        "result_framework": {
 *            "result_framework_id":1,
 *            "active":true,
 *            "tableA": {
 *                "impact_area": [
 *                    {
 *                        "impact_area_id": 1,
 *                        "impact_area_name": "Nutrition, health and food security",
 *                        "active": true,
 *                        "impact_ara_indicators": [
 *                            {
 *                                "impact_indicator_id": 1,
 *                                "impact_indicator_name": "#people benefiting from relevant CGIAR innovations",
 *                                "active": true,
 *                            },
 *                            {
 *                                "impact_indicator_id": 2,
 *                                "impact_indicator_name": "#people meeting minimum dietary energy requirements",
 *                                "active": true,
 *                            }
 *                        ],
 *                        "global_targets": [
 *                            {
 *                                "global_target_id": 1,
 *                                "global_target_name": "the 3 billion people who do not currently have access to safe and nutritious food.",
 *                                "active": true,
 *                            }
 *                        ],
 *                        "sdg_targets": [
 *                            {
 *                                "sdg_target_id": 1,
 *                                "sdg_target_code": "1.1",
 *                                "sdg_target": "By 2030, eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day",
 *                                "active": true,
 *                            }
 *                        ]
 *                    }
 *                ]
 *            },
 *            "tableB": {
 *                "action_area": [
 *                    {
 *                        "action_area_id": 1,
 *                        "action_area_name": "Systems Transformation",
 *                        "active": true,
 *                        "action_area_outcomes": [
 *                            {
 *                                "outcome_id": 1,
 *                                "outocome_smo_code": "ST 1",
 *                                "outcome_statement": "Farmers use technologies or practices that contribute to improved livelihoods, enhance environmental health and biodiversity, are apt in a context of climate change, and sustain natural resources.",
 *                                "active": true,
 *                                "outcomes_indicators": [
 *                                    {
 *                                        "outcome_indicator_id": 1,
 *                                        "outocome_indicator_smo_code": "STi 1.1",
 *                                        "outcome_indicator_statement": "Number of farmers using climate smart practices disaggregated by gender",
 *                                        "active": true,
 *                                    }
 *                                ]
 *                            }
 *                        ]
 *                    }
 *                ]
 *            },
 *            "tableC": {
 *                "init_wp_out_indicators": [
 *                    {
 *                        "init_wp_out_indicators_id": 1,
 *                        "result_type": "Outcome",
 *                        "result": "WP 1 Intermediate Outcome 1.1. Diverse users satisfactorily accessing disease-free, viable, documented germplasm",
 *                        "is_global": true,
 *                        "active": true,
 *                        "indicators": [
 *                            {
 *                                "indicator_id": 1,
 *                                "indicator_name": "At least 80% user survey responses satisfied or very satisfied",
 *                                "unit_messurament": "Qualitative measure of satisfaction",
 *                                "active": true,
 *                            },
 *                            {
 *                                "indicator_id": 2,
 *                                "indicator_name": "No. of external user requests annually by CGIAR genebanks",
 *                                "unit_messurament": "Nos. of external requests according to specific categories (e.g. NARS. NGOs, Farmers, etc.)",
 *                                "active": true,
 *                            }
 *                        ],
 *                        "geo_scope": {
 *                            "regions": [
 *                                {
 *                                    "id":1,
 *                                    "active":true,
 *                                    "region_id":14,
 *                                    "region_name":"Eastern Africa"
 *
 *                                }
 *                            ],
 *                            "countries": [
 *                                {
 *                                    "id":1,
 *                                    "active":true,
 *                                    "country_id":20,
 *                                    "country_name":"Andorra"
 *
 *                                }
 *                            ]
 *                        },
 *                        "data_management":[
 *                            {
 *                                "id":1,
 *                                "data_source":"Genebank users",
 *                                "data_collection":"User surveys",
 *                                "frequency_data_collection":"Ongoing",
 *                                "active":true,
 *                            },
 *                            {
 *
 *                                "id":2,
 *                                "data_source":"Annual reports on collection status gathered by Crop Trust/CGIAR.",
 *                                "data_collection":"Online reporting tool",
 *                                "frequency_data_collection":"Ongoing",
 *                                "active":true,
 *
 *                            }
 *                        ],
 *                        "base_line":[
 *                            {
 *                                "id":1,
 *                                "active":true,
 *                                "base_line_value":"Customer satisfaction of 80% or higher",
 *                                "base_line_year":"2017"
 *                            },
 *                            {
 *                                "id":2,
 *                                "active":true,
 *                                "base_line_value":"601,811 accessions",
 *                                "base_line_year":"2020"
 *
 *                            }
 *                        ],
 *                        "target":[
 *                            {
 *                                "id":1,
 *                                "active":true,
 *                                "target_value":"80% or higher",
 *                                "target_year":"2024"
 *
 *                            },
 *                            {
 *                                "id":2,
 *                                "active":true,
 *                                "target_value":"650,000",
 *                                "target_year":"2024"
 *
 *                            }
 *                        ]
 *                    }
 *                ]
 *            }
 *        },
 *    }
 *   ]
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "response": {
 *         "melia": {
 *             "upsertedMelia": {
 *                 "created_at": "2021-09-14T19:40:41.000Z",
 *                 "updated_at": "2021-09-14T19:40:41.000Z",
 *                 "id": 5,
 *                 "initvStgId": 35,
 *                 "melia_plan": "test melia 12",
 *                 "active": true
 *                 "result_framework":{}
 *             }
 *         }
 *     },
 *     "title": "Full Proposal: Patch melia."
 * }
 *
 * @apiError Error Upsert melia: Full proposal
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {"name": "Upsert melia: Full proposal","httpCode": 400,"isOperational": false}
 */
router.patch(
  '/melia/:initiativeId([0-9]+)/:ubication/:stageId',
  [checkJwt, checkRole('melia', 'updateOwn'), uploadFile.any()],
  stagefull.patchMeliaAndFiles
);

// Get melia and files to initiative
/**
 * @api {get} stages-control/proposal/melia/:initiativeId/:ubication/:stageId MELIA - Request MELIA
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName getMELIA
 * @apiGroup Proposal
 *
 * @apiDescription  Shows MELIA per initiativeId and section
 *
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/melia/2/result_framework
 *
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/melia/2/result_framework
 *
 * @apiHeader {String} auth
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "response": {
 *         "meliaData": {
 *             "id": 8,
 *             "initvStgId": 44,
 *             "melia_plan": "test melia 14",
 *             "active": 1,
 *             "created_at": "2021-09-21T20:35:13.000Z",
 *             "updated_at": "2021-09-21T20:35:13.000Z",
 *             "files": [
 *                 {
 *                     "id": 85,
 *                     "tocsId": null,
 *                     "url": "http://localhost:3000/uploads/INIT-14/6.melia/stage-3/1632256513858-depth_scale.xlsx",
 *                     "name": "depth_scale.xlsx",
 *                     "active": 1,
 *                     "created_at": "2021-09-21T20:35:13.000Z",
 *                     "updated_at": "2021-09-21T20:35:13.000Z",
 *                     "meliaId": 8,
 *                     "manage_plan_risk_id": null,
 *                     "humanId": null,
 *                     "financial_resources_id": null,
 *                     "section": "result_framework"
 *                 }
 *             ]
 *         }
 *     },
 *     "title": "Full Proposal: melia and files."
 * }
 *
 * @apiError Error : Get melia and files: Full proposal
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Get melia and files: Full proposal", error }
 */
router.get(
  '/melia/:initiativeId([0-9]+)/:sectionName',
  [checkJwt, checkRole('melia', 'readOwn')],
  stagefull.getMeliaAndFiles
);

// upsert management plan risk and files to initiative
/**
 * @api {patch} stages-control/proposal/manage-plan/:initiativeId/:ubication/:stageId Manage Plan and Risk - Create and update MPR
 * @apiVersion 1.0.0
 * @apiPermission admin
 * @apiName PatchManagePlan
 * @apiGroup Proposal
 *
 * @apiDescription  Create and Update Melia
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
 * @apiParam {Object} riskAssessment Risk Assessment.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "id": null,
 *    "management_plan": "new plan",
 *    "active": true,
 *    "section": "management_plan",
 *    "updateFiles": [],
 *    "riskassessment": [
 *        {
 *            "id": null,
 *            "risks_achieving_impact": "TEST TEST TEST",
 *            "description_risk": "TEST TEST",
 *            "likelihood": 5,
 *            "impact": 1,
 *            "risk_score": 4,
 *            "active": true,
 *            "manage_plan_risk_id": null,
 *            "opportinities": [
 *                {
 *                    "id": null,
 *                    "opportunities_description": "TEST",
 *                    "risk_assessment_id": null
 *                }
 *            ]
 *        }
 *    ]
 * }
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
 * "riskAssessment": {
 *           "upsertedRiskAssessment": [
 *               {
 *                   "id": 5,
 *                   "risks_achieving_impact": "TEST TEST TEST",
 *                   "description_risk": "TEST TEST",
 *                   "likelihood": 5,
 *                   "impact": 1,
 *                   "risk_score": 4,
 *                   "active": true,
 *                   "manage_plan_risk_id": 16,
 *                   "updated_at": "2021-11-17T21:20:19.000Z",
 *                   "created_at": "2021-11-17T21:20:19.000Z",
 *                   "opportunities": [
 *                       {
 *                           "id": 3,
 *                           "opportunities_description": "TEST",
 *                           "risk_assessment_id": 5,
 *                           "updated_at": "2021-11-17T21:20:19.000Z",
 *                           "created_at": "2021-11-17T21:20:19.000Z"
 *                       }
 *                   ]
 *               }
 *           ]
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
router.patch(
  '/manage-plan/:initiativeId([0-9]+)/:ubication/:stageId',
  [checkJwt, checkRole('mpr', 'updateOwn'), uploadFile.any()],
  stagefull.patchManagePlanAndFiles
);

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
 *   "response": {
 *       "managePlanData": {
 *           "id": 15,
 *           "initvStgId": 44,
 *           "management_plan": "new plan",
 *           "active": 1,
 *           "created_at": "2021-11-17T21:15:38.000Z",
 *           "updated_at": "2021-11-17T21:15:38.000Z",
 *           "files": [],
 *           "risk_assessment": [
 *               {
 *                   "id": 4,
 *                   "risks_achieving_impact": "TEST TEST TEST",
 *                   "description_risk": "TEST TEST",
 *                   "likelihood": 5,
 *                   "impact": 1,
 *                   "risk_score": 4,
 *                   "manage_plan_risk_id": 15,
 *                   "active": 1,
 *                   "opportinities": [
 *                       [
 *                           {
 *                               "id": 2,
 *                               "opportunities_description": "TEST",
 *                               "risk_assessment_id": 4,
 *                               "active": 1
 *                           }
 *                       ]
 *                   ]
 *               }
 *           ]
 *       }
 *   },
 *   "title": "Full Proposal: GET manage plan risk  and files."
 *  }
 *
 * @apiError Error : Get manage plan risk and files: Full proposal
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Get manage plan risk and files: Full proposal", error }
 */
router.get(
  '/manage-plan/:initiativeId([0-9]+)/:sectionName',
  [checkJwt, checkRole('mpr', 'readOwn')],
  stagefull.getManagePlanAndFiles
);

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
 * @apiParam {Object} initvTeam Initiative Team form
 *
 * @apiParamExample {json} Request-Example:
 * data: [
 * {   "id":null,
 *    "gender_diversity_inclusion": "",
 *   "capacity_development": "",
 *    "active": true,
 *    "section":"initiative-team",
 *    "updateFiles":[],
 *    "initvTeam":[{
 *       "id" : null,
 *       "category": "Research",
 *       "area_expertise": "Research leadership and management",
 *       "key_accountabilities":"Provide leadership",
 *       "active": true
 *   }]
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
 *   "initiativeTeam": {
 *           "upsertedInitiativeTeam": [
 *               {
 *                   "id": 4,
 *                   "category": "Research",
 *                   "area_expertise": "Research leadership and management",
 *                   "key_accountabilities": "Provide leadership",
 *                   "human_resources_id": 5,
 *                   "active": true,
 *                   "updated_at": "2021-11-30T20:06:00.000Z",
 *                   "created_at": "2021-11-30T20:06:00.000Z"
 *               }
 *           ]
 *       },
 *   "title": "Full Proposal: Patch human resources."
 *  }
 *
 * @apiError Error Full Proposal: Patch human resources.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {"name": "Upsert human Resources: Full proposal","httpCode": 400,"isOperational": false}
 */
router.patch(
  '/human-resources/:initiativeId([0-9]+)/:ubication/:stageId',
  [checkJwt, checkRole('hr', 'updateOwn'), uploadFile.any()],
  stagefull.patchHumanResourcesAndFiles
);

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
 *           ],
 *            "initiativeTeam": [
 *               {
 *                   "id": 4,
 *                   "category": "Research",
 *                   "area_expertise": "Research leadership and management",
 *                   "key_accountabilities": "Provide leadership",
 *                   "human_resources_id": 5,
 *                   "active": 1,
 *                   "created_at": "2021-11-30T20:06:00.000Z",
 *                   "updated_at": "2021-11-30T20:06:00.000Z"
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
router.get(
  '/human-resources/:initiativeId([0-9]+)/:sectionName',
  [checkJwt, checkRole('hr', 'readOwn')],
  stagefull.getHumanResources
);

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

// router.patch("/financial-resources/:initiativeId([0-9]+)/:ubication/:stageId", [checkJwt, checkRole('fr', 'updateOwn'), uploadFile.any()], stagefull.patchFinancialResources);
router.patch(
  '/financial-resources/:initiativeId([0-9]+)/:sectionName',
  [checkJwt, checkRole('fr', 'updateOwn')],
  stagefull.patchFinancialResources
);
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
router.get(
  '/financial-resources/:initiativeId([0-9]+)/:sectionName',
  [checkJwt, checkRole('fr', 'readOwn')],
  stagefull.getFinancialResources
);

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
router.patch(
  '/policy-compliance/:initiativeId([0-9]+)',
  [checkJwt, checkRole('pco', 'updateOwn')],
  stagefull.patchPolicyComplianceOversight
);

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
router.get(
  '/policy-compliance/:initiativeId([0-9]+)',
  [checkJwt, checkRole('pco', 'readOwn')],
  stagefull.getPolicyComplianceOversight
);

// upsert innovation packages to initiative
/**
 * @api {patch} stages-control/proposal/innovation-packages/:initiativeId/ Innovation Packages - Create and update IP
 * @apiVersion 1.0.0
 * @apiPermission admin
 * @apiName PatchInnovationPackages
 * @apiGroup Proposal
 *
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/innovation-packages/2
 *
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/innovation-packages/2
 *
 * @apiHeader {String} auth
 *
 * @apiParam {Number} initiativeId Id initiative.
 * @apiParam {Number} id identificator Policy Compliance.
 * @apiParam {String} key_principles description key principles.
 * @apiParam {Boolean} active status.
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *   "id": null,
 *   "key_principles": "Test 1 policy",
 *   "active": true
 *  }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *   "response": {
 *       "innovationPackages": {
 *           "upsertedInnovationPackages": {
 *               "id": 1,
 *               "key_principles": "Test 1 innovation package",
 *               "active": true,
 *               "initvStgId": 35,
 *               "updated_at": "2021-09-22T16:09:07.000Z",
 *               "created_at": "2021-09-22T16:09:07.000Z"
 *           }
 *       }
 *   },
 *   "title": "Full Proposal: Innovation Packages."
 * }
 *
 * @apiError Error Upsert Innovation Packages: Full proposal
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {"name": "Upsert Innovation Packages: Full proposal","httpCode": 400,"isOperational": false}
 */
router.patch(
  '/innovation-packages/:initiativeId([0-9]+)',
  [checkJwt, checkRole('ip', 'updateOwn')],
  stagefull.patchInnovationPackages
);

// Get innovation packages to initiative
/**
 * @api {get} stages-control/proposal/innovation-packages/:initiativeId Innovation Packages - Request PCO
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetInnovationPackages
 * @apiGroup Proposal
 *
 * @apiDescription  Shows Innovation Packages
 *
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/innovation-packages/2
 *
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/innovation-packages/2
 *
 * @apiHeader {String} auth
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *   "response": {
 *       "innovationPackagesData": {
 *           "id": 1,
 *           "initvStgId": 35,
 *           "key_principles": "Test 1 innovation package",
 *           "active": 1,
 *           "created_at": "2021-09-22T16:09:07.000Z",
 *           "updated_at": "2021-09-22T16:09:07.000Z"
 *       }
 *   },
 *   "title": "Full Proposal:Innovation Packages"
 * }
 *
 * @apiError Error : Get InnovationPackages.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Get InnovationPackages.", error }
 */
router.get(
  '/innovation-packages/:initiativeId([0-9]+)',
  [checkJwt, checkRole('ip', 'readOwn')],
  stagefull.getInnovationPackages
);

export default router;
