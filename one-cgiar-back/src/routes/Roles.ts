import { Router } from 'express'
import { getAllRoles, createRole, editRole, deleteRole } from '../controllers/Roles'
import { checkJwt } from '../middlewares/jwt'
import { checkRole } from '../middlewares/role'
import { RolesHandler } from '../helpers/RolesHandler'

const router = Router()

// create role
router.post("/roles", [checkJwt,checkRole([RolesHandler.admin])], createRole);

// get roles
router.get("/roles", [checkJwt,checkRole([RolesHandler.admin])], getAllRoles);

// edit role
router.put("/roles/:id", [checkJwt,checkRole([RolesHandler.admin])], editRole);

// delete role
router.delete("/roles/:id", [checkJwt,checkRole([RolesHandler.admin])], deleteRole);

export default router;
