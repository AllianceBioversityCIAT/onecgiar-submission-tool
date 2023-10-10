import {Router} from 'express';
import {checkJwt} from '../middlewares/jwt';
import * as previewController from '../controllers/PreviewsController';
import * as stagefull from '../controllers/StageFullProposalController';
import * as initiatives from '../controllers/InitiativesController';

const router = Router();

/**
 *
 * PREVIEWS
 *
 */

// GET ALL INITIATIVES
/**
 * @api {get} previews/initiatives 1. Get all initiatives
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetInitiatives
 * @apiGroup Previews
 *
 * @apiDescription  Shows all initiatives
 *
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/previews/initiatives/
 *
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/previews/initiatives/
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
 *                 "official_code":"INIT-2"
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
router.get('/initiatives/', [checkJwt], initiatives.getInitiatives);

// GET WORK PACKAGES PER INITIATIVE WITH ACTIVE STAGE
/**
 * @api {get} previews/packages/:initiativeId 2. Get Work Packages per Initiative
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetWorkPackage
 * @apiGroup Previews
 *
 * @apiDescription  Shows work packages data from initiatives
 *
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/previews/packages/2
 *
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/previews/packages/2
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
 *                 "id": 41,
 *                 "active": 1,
 *                 "name": "Market intelligence",
 *                 "acronym": "Work Package 1",
 *                 "results": "CGIAR GI initiatives and public and private sector partners collaboratively share, access and use a shared digital infrastructure for global and local market intelligence to build and prioritize investment cases, develop product profiles and address stage gate decision making.",
 *                 "pathway_content": "Design and implement market intelligence that characterizes current and future needs and perceptions of improved value across crops, varieties and traits in key regions. Approaches will consider priorities and needs of different actors (e.g., processors, seed businesses, consumers, women and men farmers) and potential mediating factors (e.g., policies, trade, technology, market structure, culture).",
 *                 "is_global": null,
 *                 "regions": [],
 *                 "countries": []
 *
 *             }
 *
 * 			     ]
 *     },
 *     "title": "Workpackages."
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
  [checkJwt],
  previewController.getPreviewWorkPackages
);

/**
 * GET ALL WORK PACKAGES
 * 
 * ! THIS SERVICE IS USED BY CLARISA
 */
/**
 * @api {get} stages-control/proposal/packages Work package - Request All work packages
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetAllWorkPackage
 * @apiGroup Proposal
 *
 * @apiDescription  Shows all work packages for CLARISA
 *
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/packages
 *
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/packages
 *
 * @apiHeader {String} auth
 *
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

/**
 * GET PREVIEW GEOGRAPHIC SCOPE
 */
/**
 * @api {get} previews/geographic-scope/:initiativeId/:stageId 3. Get Geographic Scope per Initiative
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetPreviewGeographicScope
 * @apiGroup Previews
 *
 * @apiDescription  Shows Geographic Scope per Initiative
 *
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/previews/geographic-scope/1/3
 *
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/previews/geographic-scope/1/3
 *
 * @apiHeader {String} auth token
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *     "response": {
 *         "previewGeographicScope": {
 *             "GeoScope": {
 *                 "regions": [
 *                     {
 *                         "clarisa_region_code": 4,
 *                         "name": "East and Southern Africa",
 *                         "acronym": "ESA"
 *                     },
 *                     {
 *                         "clarisa_region_code": 5,
 *                         "name": "South Asia",
 *                         "acronym": "SA"
 *                     }
 *                 ],
 *                 "countries": [
 *                     {
 *                         "clarisa_country_code": 4,
 *                         "isoAlpha2": "AF",
 *                         "name": "Afghanistan"
 *                     },
 *                     {
 *                         "clarisa_code": 8,
 *                         "isoAlpha2": "AL",
 *                         "name": "Albania"
 *                     }
 *                 ]
 *             }
 *         }
 *     },
 *     "title": "Previews:Get Geographic Scope per initiative"
 * }
 *
 * @apiError Error : ERROR Get Geographic Scope per initiative: Previews General
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "ERROR Get Geographic Scope per initiative: Previews General", error }
 */
router.get(
  '/geographic-scope/:initiativeId([0-9]+)/:stageId([0-9]+)',
  [checkJwt],
  previewController.getPreviewGeographicScope
);

/**
 * GET ALL GEOGRAPHIC SCOPE
 */
/**
 * @api {get} previews/all-geographic-scope/:stageId 4. Get all Geographic Scope
 * @apiPermission admin
 * @apiName GetPreviewGeographicScopeGeneral
 * @apiGroup Previews
 *
 * @apiDescription  Shows Geographic Scope
 *
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/previews/all-geographic-scope/3
 *
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/previews/all-geographic-scope/1/3
 *
 * @apiHeader {String} auth token
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "response": {
 *         "previewGeographicScope": {
 *             "GeoScope": {
 *                 "regions": [
 *                     {
 *                         "clarisa_region_code": 4,
 *                         "name": "East and Southern Africa",
 *                         "acronym": "ESA",
 *                         "initiative_code": "INIT-1"
 *                     },
 *                     {
 *                         "clarisa_region_code": 5,
 *                         "name": "South Asia",
 *                         "acronym": "SA",
 *                         "initiative_code": "INIT-1"
 *                     },
 *                     {
 *                         "clarisa_region_code": 4,
 *                         "name": "East and Southern Africa",
 *                         "acronym": "ESA",
 *                         "initiative_code": "INIT-5"
 *                     },
 *                     {
 *                         "clarisa_region_code": 5,
 *                         "name": "South Asia",
 *                         "acronym": "SA",
 *                         "initiative_code": "INIT-5"
 *                     }
 *                 ],
 *                 "countries": [
 *                     {
 *                         "clarisa_country_code": 4,
 *                         "isoAlpha2": "AF",
 *                         "name": "Afghanistan",
 *                         "initiative_code": "INIT-1"
 *                     },
 *                     {
 *                         "clarisa_country_code": 8,
 *                         "isoAlpha2": "AL",
 *                         "name": "Albania",
 *                         "initiative_code": "INIT-1"
 *                     }
 *                 ]
 *             }
 *         }
 *     },
 *     "title": "Previews:Get all Geographic Scope"
 * }
 *
 * @apiError Error : ERROR Get all Geographic Scope: Previews General
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "ERROR Get all Geographic Scope: Previews General", error }
 */
router.get(
  '/all-geographic-scope/:initiativeId([0-9]+)/:stageId([0-9]+)',
  [checkJwt],
  previewController.getAllGeographicScope
);

/**
 * GET PREVIEW PARTNERS PER INITIATIVE
 */
/**
 * @api {get} previews/partners/:initiativeId/:stageId 5. Get Partners per Initiative
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetPreviewPartners
 * @apiGroup Previews
 *
 * @apiDescription  Shows Partners per Initiative
 *
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/previews/partners/1/3
 *
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/previews/partners/1/3
 *
 * @apiHeader {String} auth token
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "response": {
 *         "previewPartners": [
 *             {
 *                 "code": 1,
 *                 "acronym": "WUR",
 *                 "institution_type": "University",
 *                 "office_location": "NL",
 *                 "name": "Wageningen University and Research Centre",
 *                 "impact_area": "Poverty reduction, livelihoods and jobs",
 *                 "demand": 0,
 *                 "innovation": 0,
 *                 "scaling": 0,
 *                 "website": "http://www.wur.nl/en.htm"
 *             },
 *             {
 *                 "code": 1,
 *                 "acronym": "WUR",
 *                 "institution_type": "University",
 *                 "office_location": "NL",
 *                 "name": "Wageningen University and Research Centre",
 *                 "impact_area": "Nutrition, health and food security",
 *                 "demand": 1,
 *                 "innovation": 0,
 *                 "scaling": 1,
 *                 "website": "http://www.wur.nl/en.htm"
 *             }
 *         ]
 *     },
 *     "title": "Previews:Get Partners per initiative"
 * }
 *
 * @apiError Error : Get Partners per initiative: Previews General
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Get Partners per initiative: Previews General", error }
 */
router.get(
  '/partners/:initiativeId([0-9]+)/:stageId([0-9]+)',
  [checkJwt],
  previewController.getPreviewPartners
);

/**
 * GET PREVIEW PROJECTED BENEFITS
 */
/**
 * @api {get} previews/preview-projected-benefits/:initiativeId/:stageId 6. Get Projected benefits per Initiative
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetPreviewProjectedBenefits
 * @apiGroup Previews
 *
 * @apiDescription  Shows Projected benefits per Initiative
 *
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/previews/projected-benefits/1/3
 *
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/previews/projected-benefits/1/3
 *
 * @apiHeader {String} auth token
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "response": {
 *         "previewProjectedBenefits": {
 *             "impactAreas": [
 *                 {
 *                     "id": 778,
 *                     "impact_area_id": 1,
 *                     "impact_area_name": "Nutrition, health and food security",
 *                     "impactIndicators": {
 *                         "id": 778,
 *                         "impact_area_indicator_id": 4,
 *                         "impact_area_indicator_name": "#cases communicable and noncommunicable diseases",
 *                         "depth_scale_id": 2,
 *                         "depth_scale_name": null,
 *                         "probability_id": 2,
 *                         "probability_name": null,
 *                         "dimensions": [
 *                             {
 *                                 "projection_id": 778,
 *                                 "depth_description": "Life saving",
 *                                 "targetUnit": "Millions",
 *                                 "breadth_value": "100.00000000"
 *                             }
 *                         ]
 *                     }
 *                 }
 *             ]
 *         }
 *     },
 *     "title": "Previews:Get Projected Benefits"
 * }
 *
 * @apiError ERROR Get Projected Benefits: Previews General
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "ERROR Get Projected Benefits: Previews General", error }
 */
router.get(
  '/projected-benefits/:initiativeId([0-9]+)/:stageId([0-9]+)',
  [checkJwt],
  previewController.getPreviewProjectedBenefits
);

/**
 * PREVIEW RISK ASSESSMENT
 */
/**
 * @api {get} previews/risk-assessment/:initiativeId/:stageId 7. Get Risk Assessment per Initiative
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetPreviewRiskAssessment
 * @apiGroup Previews
 *
 * @apiDescription  Shows Risk Assessment per Initiative
 *
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/previews/risk-assessment/1/3
 *
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/previews/risk-assessment/1/3
 *
 * @apiHeader {String} auth token
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "response": {
 *         "previewRiskAssessment": {
 *             "managePlan": {
 *                 "id": 3,
 *                 "initvStgId": 34,
 *                 "riskassessment": [
 *                     {
 *                         "id": 61,
 *                         "risks_achieving_impact": "Business interruption or delays due to pandemic, war, natural disaster or other incident affecting the Initiative or key dependencies",
 *                         "risks_theme": "Operational",
 *                         "description_risk": "Failure to articulate a value proposition for the Initiative that outlines clearly the pathway from research to impact\n",
 *                         "likelihood": 1,
 *                         "impact": 5,
 *                         "risk_score": 0,
 *                         "manage_plan_risk_id": 3,
 *                         "active": 1,
 *                         "opportunities": [
 *                             {
 *                                 "id": 29,
 *                                 "opportunities_description": "test",
 *                                 "risk_assessment_id": 61,
 *                                 "active": 1
 *                             }
 *                         ]
 *                     },
 *                     {
 *                         "id": 62,
 *                         "risks_achieving_impact": "Capability, and capacity constraints within and across the regions may hinder the uptake of innovations",
 *                         "risks_theme": "Fit for purpose partnerships",
 *                         "description_risk": "Failure to articulate a value proposition for the Initiative that outlines clearly the pathway from research to impact\n",
 *                         "likelihood": 0,
 *                         "impact": 0,
 *                         "risk_score": 0,
 *                         "manage_plan_risk_id": 3,
 *                         "active": 1,
 *                         "opportunities": []
 *                     }
 *                 ]
 *             }
 *         }
 *     },
 *     "title": "Previews:Risk Assessment"
 * }
 *
 * @apiError Error : ERROR Preview Risk Assessment: Previews General
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "ERROR Preview Risk Assessment: Previews General", error }
 */
router.get(
  '/risk-assessment/:initiativeId([0-9]+)/:stageId([0-9]+)',
  [checkJwt],
  previewController.getPreviewRiskAssessment
);

/**
 * GET HUMAN RESOURCES
 */
/**
 * @api {get} previews/human-resources/:initiativeId/:stageId 8. Get Human Resources per Initiative
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetPreviewHumanResources
 * @apiGroup Previews
 *
 * @apiDescription  Shows Preview Human Resources per Initiative
 *
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/previews/human-resources/1/3
 *
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/previews/human-resources/1/3
 *
 * @apiHeader {String} auth token
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "response": {
 *         "previewHumanResources": {
 *             "initiativeTeam": [
 *                 {
 *                     "category": "Research",
 *                     "area_expertise": "Research leadership and management",
 *                     "key_accountabilities": "Provide leadership"
 *                 }
 *             ]
 *         }
 *     },
 *     "title": "Previews:Preview Human Resources"
 * }
 *
 * @apiError ERROR Get Preview Human Resources: Previews General
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "ERROR Get Preview Human Resources: Previews General", error }
 */
router.get(
  '/human-resources/:initiativeId([0-9]+)/:stageId([0-9]+)',
  [checkJwt],
  previewController.getPreviewHumanResources
);

/**
 * GET FINANCIAL RESOURCES
 */
/**
 * @api {get} previews/financial-resources/:initiativeId/:stageId 9. Get Financial Resources per Initiative
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetPreviewFinancialResources
 * @apiGroup Previews
 *
 * @apiDescription  Shows Preview Financial Resources per Initiative
 *
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/previews/financial-resources/1/3
 *
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/previews/financial-resources/1/3
 *
 * @apiHeader {String} auth token
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "response": {
 *         "previewFinancialResources": {
 *             "financialResources": [
 *                 {
 *                     "description": "crosscutting_workpackages",
 *                     "year": "2022",
 *                     "value": "100"
 *                 },
 *                 {
 *                     "description": "innovation_packages",
 *                     "year": "2022",
 *                     "value": "100"
 *                 },
 *                 {
 *                     "description": "Work Package 1",
 *                     "year": "2022",
 *                     "value": "100"
 *                 },
 *                 {
 *                     "description": "Work Package 2",
 *                     "year": "2022",
 *                     "value": "100"
 *                 }
 *             ]
 *         }
 *     },
 *     "title": "Previews:Preview Financial Resources"
 * }
 *
 *
 * @apiError ERROR Get Preview Financial Resources: Previews General
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "ERROR Get Preview Financial Resources: Previews General", error }
 */
router.get(
  '/financial-resources/:initiativeId([0-9]+)/:stageId([0-9]+)',
  [checkJwt],
  previewController.getPreviewFinancialResources
);

export default router;
