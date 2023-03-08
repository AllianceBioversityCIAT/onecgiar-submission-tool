import { Router } from "express";
import { tocController } from "../controllers/tocControllerResult";

const router = Router();
const TocResultDashboard = new tocController();

// get information toc result dashboard
router.post("/toc", TocResultDashboard.getTocResultDashboard);

// Get test
router.get("/toc", TocResultDashboard.getToc)

export default router;
