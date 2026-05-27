import { Router } from "express";
import * as ctrl from "../controllers/question.controller.js";
import { requireAuth } from "../middleware/auth.js";

const r = Router();
r.use(requireAuth);
r.get("/", ctrl.listQuestions);
r.get("/:id", ctrl.getQuestion);
export default r;
