import { Router } from 'express'
import { getUsers, createUsers, getUser, updateUser, deleteUser } from '../controllers/User'
import { checkJwt } from '../middlewares/jwt'
import { checkRole } from '../middlewares/role'
import { RolesHandler } from '../helpers/RolesHandler'

const router = Router()

// get all users
// router.get('/', getUsers);
router.get('/', [checkJwt], getUsers);

// create an user
// router.post('/', createUsers);
router.post('/', [checkJwt], createUsers);

// get user by id
// router.get('/:id', [checkJwt,checkRole([RolesHandler.admin])], getUser);

// update user
// router.put('/:id', [checkJwt,checkRole([RolesHandler.admin])], updateUser);

// delete user
// router.delete('/:id', [checkJwt,checkRole([RolesHandler.admin])], deleteUser);

export default router;