import { Router } from 'express'
import { changePassword, login } from '../controllers/Auth'
import { checkJwt } from '../middlewares/jwt'

const router = Router();

// login
router.post('/auth/login', login);

// change password
router.post('/auth/change-password', [checkJwt], changePassword);

export default router;