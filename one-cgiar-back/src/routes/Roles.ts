import { Router } from 'express'
import { getAllRoles, createRole, editRole, deleteRole, createPermission, getAllPermissions } from '../controllers/Roles'
import { checkJwt } from '../middlewares/jwt'
import { checkRole } from '../middlewares/role'

const router = Router()

// create role
router.post("/", [checkJwt, checkRole('roles', 'createAny')], createRole);

// get roles
router.get("/", getAllRoles);

// edit role
router.put("/:id", [checkJwt, checkRole('roles', 'updateAny')], editRole);

// delete role
router.delete("/:id", [checkJwt, checkRole('roles', 'deleteAny')], deleteRole);

/***
 * 
 * Permissions
 * 
 */


// create permission
// router.post("/permissions", [checkJwt, checkRole('roles')], createPermission);

// get permission
router.get("/permissions", [checkJwt], getAllPermissions);

export default router;
