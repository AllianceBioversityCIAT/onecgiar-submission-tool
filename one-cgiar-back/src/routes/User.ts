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
router.post('/', [checkJwt, checkRole('users')], createUsers);

// get user by id
router.get('/:id', [checkJwt,checkRole('users')], getUser);

// update user
router.put('/:id', [checkJwt,checkRole('users')], updateUser);

// delete user
router.delete('/:id', [checkJwt,checkRole('users')], deleteUser);

export default router;