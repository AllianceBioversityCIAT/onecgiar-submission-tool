import { Router } from "express";
import * as stagefull from "../controllers/StageFullProposal";
import { checkJwt } from "../middlewares/jwt";
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
 * @api {get} stages-control/proposal/packages/:initiativeId Workpackage - Request workpackage
 * @apiVersion 1.0.2
 * @apiPermission admin
 * @apiName GetWorkPackage
 * @apiGroup Proposal
 * 
 * @apiDescription  Shows workpackage data from initiatives
 * 
 * @apiExample Example usage:
 * http://localhost:3000/api/stages-control/proposal/packages/2
 * 
 * @apiSampleRequest http://localhost:3000/api/stages-control/proposal/packages/2
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


router.get("/package/:wrkPkgId([0-9]+)", [checkJwt, checkRole('packages', 'readOwn')], stagefull.getWorkPackage);

export default router;