import { Router } from "express";
import { tocController } from "../controllers/tocControllerResult";

const router = Router();
const TocResultDashboard = new tocController();

// get information toc result dashboard
router.post("/toc", TocResultDashboard.getTocResultDashboard);

export default router;
