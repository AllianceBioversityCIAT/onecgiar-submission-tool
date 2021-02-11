import { Router } from 'express';
import { getUsers, createUsers, getUser, updateUser, deleteUser } from '../controllers/User';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';

const router = Router()

// get all users
// router.get('/', getUsers);
router.get('/', [checkJwt], getUsers);

// create an user
// router.post('/', createUsers);
router.post('/', [checkJwt, checkRole('users', 'createAny')], createUsers);

// get user by id
router.get('/:id([0-9]+)', [checkJwt,checkRole('users', 'getAny')], getUser);

// update user
router.put('/:id([0-9]+)', [checkJwt,checkRole('users', 'updateAny')], updateUser);

// delete user
router.delete('/:id([0-9]+)', [checkJwt,checkRole('users', 'deleteAny')], deleteUser);

export default router;