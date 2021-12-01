import {Router} from 'express';
import {checkJwt} from '../middlewares/jwt';
import {checkRole} from '../middlewares/role';
import * as previewController from '../controllers/PreviewsController';

const router = Router();

/**
 *
 * PREVIEWS
 *
 */

/**
 * GET PREVIEW PARTNERS PER INITIATIVE
 */
/**
 * @api {get} previews/preview-partners/:initiativeId/stageId Previews - Request Partners per Initiative
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetPreviewPartners
 * @apiGroup Previews
 *
 * @apiDescription  Shows Preview Partners per Initiative
 *
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/previews/preview-partners/1/3
 *
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/previews/preview-partners/1/3
 *
 * @apiHeader {String} auth
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "response": {
 *         "previewPartners": [
 *             {
 *                 "partner_name": "Wageningen University and Research Centre",
 *                 "url": "http://www.wur.nl/en.htm",
 *                 "acronym": "WUR",
 *                 "initiative_id": "INIT-1",
 *                 "action_area": "Genetic Innovation",
 *                 "partner_id": "",
 *                 "location": "",
 *                 "organization_type_IATI": "",
 *                 "network_mapping_codes": "",
 *                 "organization_type_clarisa": "University",
 *                 "clarisa_id": 36,
 *                 "demand": 0,
 *                 "innovation": 0,
 *                 "scaling": 0,
 *                 "hq_location_clarisa": "NL",
 *                 "impact_area_id": 2,
 *                 "Source": "impact_satatements"
 *             }
 *         ]
 *     },
 *     "title": "Full Proposal:Preview Partners"
 * }
 *
 * @apiError Error : Get Preview Partners: Previews General
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Get Preview Partners: Previews General", error }
 */
router.get(
  '/preview-partners/:initiativeId([0-9]+)/:stageId([0-9]+)',
  [checkJwt, checkRole('strategies', 'readOwn')],
  previewController.getPreviewPartners
);

/**
 * GET PREVIEW PROJECTED BENEFITS
 */
/**
 * @api {get} previews/preview-projected-benefits/:initiativeId/stageId Previews - Request Projected benefits per Initiative
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetPreviewProjectedBenefits
 * @apiGroup Previews
 *
 * @apiDescription  Shows Preview Projected benefits per Initiative
 *
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/previews/preview-projected-benefits/1/3
 *
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/previews/preview-projected-benefits/1/3
 *
 * @apiHeader {String} auth
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "response": {
 *         "previewProjectedBenefits": [
 *             {
 *                 "id": 778,
 *                 "impact_area_id": 1,
 *                 "impact_area_name": "Nutrition, health and food security",
 *                 "impact_area_indicator_id": 4,
 *                 "impact_area_indicator_name": "#cases communicable and noncommunicable diseases",
 *                 "depth_scale_id": 2,
 *                 "probability_id": 2,
 *                 "depth_scale_name": null,
 *                 "probability_name": null,
 *                 "dimensions": [
 *                     [
 *                         {
 *                             "projectionId": 778,
 *                             "depth_description": "Life saving",
 *                             "breadth_value": "100.00"
 *                         }
 *                     ]
 *                 ]
 *             }
 *         ]
 *     },
 *     "title": "Full Proposal:Preview Partners"
 * }
 *
 * @apiError Error : Get Preview Projected Benefits: Previews General
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Get Preview Projected Benefits: Previews General", error }
 */
router.get(
  '/preview-projected-benefits/:initiativeId([0-9]+)/:stageId([0-9]+)',
  [checkJwt, checkRole('benefits', 'readOwn')],
  previewController.getPreviewProjectedBenefits
);

/**
 * GET PREVIEW GEOGRAPHIC SCOPE
 */
/**
 * @api {get} previews/preview-geographic-scope/:initiativeId/stageId Previews - Request Geographic Scope per Initiative
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetPreviewGeographicScope
 * @apiGroup Previews
 *
 * @apiDescription  Shows Preview Geographic Scope per Initiative
 *
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/previews/preview-geographic-scope/1/3
 *
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/previews/preview-geographic-scope/1/3
 *
 * @apiHeader {String} auth
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *   "response": {
 *       "previewGeographicScope": {
 *           "GeoScope": {
 *               "regions": [
 *                   {
 *                       "region_id": 2,
 *                       "name": "Africa",
 *                       "initvStgId": 34
 *                   }
 *               ],
 *               "countries": [
 *                   {
 *                       "country_id": 4,
 *                       "name": "Afghanistan",
 *                       "initvStgId": 34
 *                   }
 *               ]
 *           }
 *       }
 *   },
 *   "title": "Previews:Preview Geographic Scope"
 * }
 *
 * @apiError Error : ERROR Get Preview Geographic Scope: Previews General
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "ERROR Get Preview Geographic Scope: Previews General", error }
 */
router.get(
  '/preview-geographic-scope/:initiativeId([0-9]+)/:stageId([0-9]+)',
  [checkJwt, checkRole('packages', 'readOwn')],
  previewController.getPreviewGeographicScope
);

/**
 * PREVIEW RISK ASSESSMENT
 */
/**
 * @api {get} previews/preview-risk-assessment/:initiativeId/stageId Previews - Request Risk Assessment per Initiative
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetPreviewRiskAssessment
 * @apiGroup Previews
 *
 * @apiDescription  Shows Preview Risk Assessment per Initiative
 *
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/previews/preview-risk-assessment/1/3
 *
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/previews/preview-risk-assessment/1/3
 *
 * @apiHeader {String} auth
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *   "response": {
 *       "previewRiskAssessment": {
 *           "managePlan": {
 *               "id": 5,
 *               "initvStgId": 33,
 *               "riskassessment": [
 *                   {
 *                       "id": 20,
 *                       "risks_achieving_impact": "TEST ",
 *                       "description_risk": "TEST TEST",
 *                       "likelihood": 5,
 *                       "impact": 1,
 *                       "risk_score": 4,
 *                       "manage_plan_risk_id": 5,
 *                       "active": 1,
 *                       "opportinities": [
 *                           {
 *                               "id": 4,
 *                               "opportunities_description": "TEST",
 *                               "risk_assessment_id": 20,
 *                               "active": 1
 *                           }
 *                       ]
 *                   },
 *                   {
 *                       "id": 21,
 *                       "risks_achieving_impact": "TEST TEST TEST",
 *                       "description_risk": "TEST TEST",
 *                       "likelihood": 5,
 *                       "impact": 1,
 *                       "risk_score": 4,
 *                       "manage_plan_risk_id": 5,
 *                       "active": 1,
 *                       "opportinities": []
 *                   }
 *               ]
 *           }
 *       }
 *   },
 *   "title": "Previews:Preview Risk Assessment"
 *}
 *
 * @apiError Error : ERROR Get Preview Risk Assessment: Previews General
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "ERROR Get Preview Risk Assessment: Previews General", error }
 */
router.get(
  '/preview-risk-assessment/:initiativeId([0-9]+)/:stageId([0-9]+)',
  [checkJwt, checkRole('mpr', 'readOwn')],
  previewController.getPreviewRiskAssessment
);

export default router;
