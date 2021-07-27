import { Router } from 'express';
import { getClaActionAreas, getClaCountries, getClaCRPs, getClaInstitutions, getClaInstitutionsTypes, getClaRegions, requestClaInstitution } from '../controllers/Clarisa';
import { getInitiatives, createInitiative, createStage, assignStageToInitiative, assignTOCsByInitvStg, getInitiativesByUser, getStage, getUsersByInitiative,  assignUsersByInitiative, getUserRoleByInitiative, getStageMeta, getActionAreas, replicationProcess, getCountries, getRegions, getInstitutions, getInstitutionsTypes, addLink } from '../controllers/Initiatives';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';

const router = Router();

// get initiatives
// router.get("/", [checkJwt, checkRole('initiatives', 'readAny')], getInitiatives);

/**
 * @api {get} /initiatives Show all initiatives
 * @apiPermission all
 * @apiName Getinitiatives
 * @apiGroup Initiatives
 *
 * @apiSuccess {String} id id of the recipe.
 * @apiSuccess {String} description  description of the recipe.
 * @apiSuccess {String} ingredients  ingredients of the recipe.
 * @apiSuccess {String} Preparation  Preparation of the recipe.
 * @apiSuccess {String} img_url  image of recipe.
 * @apiSuccess {String} video_url  video of recipe.
 * @apiSuccess {String} portios portios of recipe.
 * @apiSuccess {String} difficulty difficulty of recipe.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
    "id": "2",
    "description": "Salmon en salsa de mantequilla",
    "ingredients": "<ul>\n<li> 2 filetes de Salmon\n<li> 1 Limon (ralladura)\n<li> 2 cucharadas soperas de Mantequilla\n<li> 2 cucharadas soperas de Cilantro (fresco)\n<li>     Sal y Pimienta al gusto\n</ul>",
    "preparation": "<ul>\n<li>\n<span><h4>Adobar los filetes de salmon</h4>\n<p>Adicionamos un poquito de sal y de pemienta por ambas caras del salmon</p>\n<span>\n</li>\n<li>\n<span><h4>Rallar el limon</h4>\n<p>Vamos a rallar la cascara del limon en finos trazos, no debemos rallar mucha cantidad para no excedernos en lo amargo</p>\n<span>\n</li>\n<li>\n<span><h4>Derretir la mantequilla</h4>\n<p>En un sarten ponemos a derretir dos cucharadas soperas de mantequilla y esperamos que se derrita</p>\n<p>Una vez se ha derretido la mantequilla, vamos a mover el sarten un poco y esperamos a que la mantequilla se torne de un color cafe</p>\n<span>\n</li>\n<li>\n<span><h4>Añadir el pescado</h4>\n<p>Cuando notemos que la mantequilla se ha tornado cafe, procedemos a añadir el salmon</p>\n<p>Cocinamos un tiempo aproximado de 4 minutos por ambas caras del filete</p>\n<p>Cuando notemos que el borde del salmon se pone un poco blanco es el indicador preciso para voltearlo</p>\n<span>\n</li>\n<li>\n<span><h4>Añadir adicionales</h4>\n<p>Mientras el salmon esta en coccion añadiremos el jugo de medio limon</p>\n<p>Añadimos la ralladura del limon (1/2 cucharada)</p>\n<p>Añadimos un poco de cilantro fresco</p>\n<p>Con el jugo que se forma vamos bañando el salmon hasta que este bien cocido y listo ya tenemos nuestro plato listo para servir</p>\n<span>\n</li>\n</ul>",
    "preparation_time": "30 minutos",
    "image_url": "https://agromarketco.s3.amazonaws.com/recipes/salmonLimon.png",
    "video_url": null,
    "portions": "2 porciones",
    "difficulty": "baja"
  }
 *
 * @apiError Error getRecipes-
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     { message: "Error getRecipes", error }
 */
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
router.post("/add-link/:initiativeId([0-9]+)/:stageId([0-9]+)", [checkJwt, checkRole('initiatives', 'updateOwn')], addLink);

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