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
router.patch("/packages/:initiativeId([0-9]+)", [checkJwt], stagefull.patchWorkPackage);

router.patch("/projection-benefits/:initiativeId([0-9]+)", [checkJwt], stagefull.patchProjectionBenefits);

router.get("/projection-benefits/:initiativeId([0-9]+)", [checkJwt], stagefull.getProjectionBenefits);

router.get("/projection-benefits/:initiativeId([0-9]+)/:impactId([0-9]+)", [checkJwt], stagefull.getProjectionBenefitsByImpact);

router.patch("/impact-strategies/:initiativeId([0-9]+)", [checkJwt], stagefull.patchImpactStrategies);

router.get("/impact-strategies/:initiativeId([0-9]+)/:impactAreaId([0-9]+)", [checkJwt], stagefull.getImpactStrategies);

// upsert melia and files to initiative
router.patch("/melia/:initiativeId([0-9]+)", [checkJwt, uploadFile.any()], stagefull.patchMeliaAndFiles);

// Get melia and files to initiative
router.get("/melia/:initiativeId([0-9]+)", [checkJwt], stagefull.getMeliaAndFiles);

export default router;