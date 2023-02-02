import {Router} from 'express';
import * as TocResultDashboard from '../toc/controllers/TocControllerResult';

const router = Router();

// get information toc result dashboard
router.post('/toc', TocResultDashboard.getTocResultDashboard);

export default router;