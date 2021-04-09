import { Router } from 'express'
import { changePassword, login, validateCGUser } from '../controllers/Auth'
import { checkJwt } from '../middlewares/jwt'

const router = Router();

// login
router.post('/login', login);

// change password
router.post('/change-password', [checkJwt], changePassword);


// change password
router.get('/cgiar', [checkJwt], validateCGUser);


export default router;