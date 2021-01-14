import { Router } from 'express'
import { getAllRoles, createRole, editRole, deleteRole, createPermission, getAllPermissions } from '../controllers/Roles'
import { checkJwt } from '../middlewares/jwt'
import { checkRole } from '../middlewares/role'

const router = Router()

// create role
// router.post("/", createRole);
router.post("/", [checkJwt, checkRole('roles')], createRole);

// get roles
router.get("/", getAllRoles);
// router.get("/", [checkJwt,checkRole([RolesHandler.admin])], getAllRoles);

// edit role
// router.put("/:id", editRole);
router.put("/:id", [checkJwt], editRole);

// delete role
// router.delete("/:id", deleteRole);
router.delete("/:id", [checkJwt], deleteRole);

/***
 * 
 * Permissions
 * 
 */


// create permission
// router.post("/permissions", createPermission);
router.post("/permissions", [checkJwt], createPermission);

// get permission
// router.get("/permissions", getAllPermissions);
router.get("/permissions", [checkJwt], getAllPermissions);

export default router;
