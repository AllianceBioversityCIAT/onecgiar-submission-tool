import {Router} from 'express';
import {
  changePassword,
  login,
  validateCGUser,
  generateTocToken,
  validateToCToken,
  pusherAuth,
  pusherUpdate
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
router.post('/toc/token', [checkJwt], generateTocToken);

//Management ToC Token
router.post('/toc', validateToCToken);

//Authentication Pusher
router.post('/pusherauth/:initiativeId([0-9]+)/:userId', pusherAuth);

//Authentication Pusher
router.post('/pusher/update', pusherUpdate);

export default router;
