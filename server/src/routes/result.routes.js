import { Router } from "express";
import * as ctrl from "../controllers/result.controller.js";
import { requireAuth } from "../middleware/auth.js";

const r = Router();
r.use(requireAuth);
r.get("/:sessionId", ctrl.getResult);
export default r;
