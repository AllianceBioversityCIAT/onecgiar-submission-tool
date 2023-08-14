import {Router} from 'express';
import * as JobsController from '../controllers/JobsController';
import {checkJwt} from '../middlewares/jwt';

const router = Router();

router.get('/run', [checkJwt], JobsController.runJobs);

export default router;
