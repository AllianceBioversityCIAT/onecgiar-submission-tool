import { Router } from "express";
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";
import * as previewController from "../controllers/PreviewsController";

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
 * @api {get} previews/preview-partners/:initiativeId/stageId Proposal - Request Partners per Initiative
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
 * @apiError Error : Get Preview Partners: Full proposal
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Get Preview Partners: Full proposal", error }
 */
 router.get("/preview-partners/:initiativeId([0-9]+)/:stageId([0-9]+)", [checkJwt, checkRole('strategies', 'readOwn')], previewController.getPreviewPartners);

 /**
  * GET PREVIEW PROJECTED BENEFITS
  */

  router.get("/preview-projected-benefits/:initiativeId([0-9]+)/:stageId([0-9]+)", [checkJwt, checkRole('strategies', 'readOwn')], previewController.getPreviewProjectedBenefits);

export default router;