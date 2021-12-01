import {Router} from 'express';
import * as user from '../controllers/UserController';
import {checkJwt} from '../middlewares/jwt';
import {checkRole} from '../middlewares/role';

const router = Router();

// get all users
router.get('/', [checkJwt], user.getUsers);

// get users by roles
router.get('/roles', [checkJwt], user.getUsersByRoles);

// create an user
router.post('/', user.createUsers);
// router.post('/', [checkJwt, checkRole('users', 'createAny')], createUsers);

// get user by id
router.get(
  '/:id([0-9]+)',
  [checkJwt, checkRole('users', 'readAny')],
  user.getUser
);

// search users by key words
router.get(
  '/search',
  [checkJwt, checkRole('users', 'readAny')],
  user.searchUser
);

// update user
router.put(
  '/:id([0-9]+)',
  [checkJwt, checkRole('users', 'updateAny')],
  user.updateUser
);

// delete user
router.delete(
  '/:id([0-9]+)',
  [checkJwt, checkRole('users', 'deleteAny')],
  user.deleteUser
);

// remove user
router.delete(
  '/remove/:id([0-9]+)',
  [checkJwt, checkRole('users', 'deleteAny')],
  user.removeUser
);

export default router;
