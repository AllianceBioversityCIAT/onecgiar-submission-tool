import { Router } from 'express'
import { getUsers, createUsers, getUser, updateUser, deleteUser } from '../controllers/User'
import { checkJwt } from '../middlewares/jwt'
import { checkRole } from '../middlewares/role'
import { RolesHandler } from '../helpers/RolesHandler'

const router = Router()

// get all users
router.get('/users', [checkJwt,checkRole([RolesHandler.admin])], getUsers);

// create an user
router.post('/users', [checkJwt,checkRole([RolesHandler.admin])], createUsers);

// get user by id
router.get('/users/:id', [checkJwt,checkRole([RolesHandler.admin])], getUser);

// update user
router.put('/users/:id', [checkJwt,checkRole([RolesHandler.admin])], updateUser);

// delete user
router.delete('/users/:id', [checkJwt,checkRole([RolesHandler.admin])], deleteUser);

export default router;