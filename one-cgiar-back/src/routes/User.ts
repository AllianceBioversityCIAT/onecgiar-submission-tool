import { Router } from 'express';
import { getUsers, createUsers, getUser, updateUser, deleteUser, getUsersByRoles, searchUser } from '../controllers/User';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';

const router = Router()

// get all users
router.get('/', [checkJwt], getUsers);

// get users by roles
router.get('/roles', [checkJwt], getUsersByRoles);

// create an user
router.post('/', createUsers);
// router.post('/', [checkJwt, checkRole('users', 'createAny')], createUsers);

// get user by id
router.get('/:id([0-9]+)', [checkJwt, checkRole('users', 'readAny')], getUser);

// search users by key words
router.get('/search', [checkJwt, checkRole('users', 'readAny')], searchUser);

// update user
router.put('/:id([0-9]+)', [checkJwt, checkRole('users', 'updateAny')], updateUser);

// delete user
router.delete('/:id([0-9]+)', [checkJwt, checkRole('users', 'deleteAny')], deleteUser);

export default router;