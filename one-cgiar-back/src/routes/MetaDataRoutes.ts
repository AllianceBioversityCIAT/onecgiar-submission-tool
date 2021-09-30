import { Router } from "express";
import { getMenu, getValidations } from "../controllers/MetaDataController";
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";


const router = Router();

// get menu per stage
/**
 * @api {get} meta/menu/:initiativeId Get Menu.
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetMenu
 * @apiGroup Metadata
 * 
 * @apiDescription  Show metadata from stages,sections and subsections
 * 
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/meta/menu/2
 * 
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/meta/menu/2
 *
 * @apiHeader {String} auth Token
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *   "response": {
 *     "stages": [
 *           {
 *               "stageId": 2,
 *               "description": "Concept",
 *               "active": 0,
 *               "start_date": "2021-02-15T19:22:33.000Z",
 *               "end_date": "2021-02-15T19:22:33.000Z",
 *               "sections": [
 *                   {
 *                       "sectionId": 3,
 *                       "stage": "Concept",
 *                       "description": "context",
 *                       "display_name": "Context",
 *                       "active": 1,
 *                       "visible": 1,
 *                       "orderSection": 2,
 *                       "stageId": 2,
 *                       "subsections": []
 *                   }
 *               ]
 *           }
 *       ]
 *   },
 *   "title": "Initiatives:Get link."
 *  }
 * 
 *
 * @apiError Error GetMenu.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Get Metadata:", error }
 */
router.get("/menu/:initiativeId([0-9]+)", [checkJwt, checkRole('initiatives', 'readOwn')], getMenu);


// get validations per stage
/**
 * @api {get} /meta/validations/menu/:initiativeId/:stageId Get Validations.
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetValidations
 * @apiGroup Metadata
 * 
 * @apiDescription  Show validations (Green Checks)
 * 
 * @apiExample Example usage:
 * https://initiativestest.ciat.cgiar.org/api/meta/validations/menu/2/3
 * 
 * @apiSampleRequest https://initiativestest.ciat.cgiar.org/api/meta/validations/menu/2/3
 *
 * @apiHeader {String} auth Token
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "response": {
 *         "innovationPackages": [
 *             {
 *                 "sectionId": 2,
 *                 "description": "general-information",
 *                 "ValidateGI": "1"
 *             }
 *         ]
 *     },
 *     "title": "Validations General Information:Menu"
 * }
 * 
 *
 * @apiError Error Get validations GI.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Get validations GI", error }
 */
router.get("/validations/menu/:initiativeId([0-9]+)/:stageId([0-9]+)", [checkJwt, checkRole('initiatives', 'readOwn')], getValidations);

export default router;