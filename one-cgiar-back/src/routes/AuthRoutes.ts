import {Router} from 'express';
import {
  changePassword,
  login,
  validateCGUser,
  generateTocToken,
  validateToCToken
} from '../controllers/AuthController';
import {checkJwt} from '../middlewares/jwt';

const router = Router();

// login
router.post('/login', login);

// change password
router.post('/change-password', changePassword);

// change password
router.get('/cgiar', [checkJwt], validateCGUser);

//Generate ToC Token
router.post('/toc/token', generateTocToken);

//Management ToC Token
router.post('/toc', validateToCToken);

export default router;
