import {Router} from 'express';
import * as roles from '../controllers/RolesController';
import {checkJwt} from '../middlewares/jwt';
import {checkRole} from '../middlewares/role';

const router = Router();

// create role
router.post('/', [checkJwt, checkRole('roles', 'createAny')], roles.createRole);

// get roles
router.get('/', roles.getAllRoles);

// edit role
router.put(
  '/:id([0-9]+)',
  [checkJwt, checkRole('roles', 'updateAny')],
  roles.editRole
);

// delete role
router.delete(
  '/:id([0-9]+)',
  [checkJwt, checkRole('roles', 'deleteAny')],
  roles.deleteRole
);

/***
 *
 * Permissions
 *
 */

// create permission
router.post(
  '/permissions',
  [checkJwt, checkRole('roles', 'createAny')],
  roles.createPermission
);

// get permission
router.get('/permissions', [checkJwt], roles.getAllPermissions);

export default router;
