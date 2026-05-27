import { Router } from "express";
import * as ctrl from "../controllers/session.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { startSessionSchema, submitAnswerSchema, skipSchema } from "../validators/session.schema.js";

const r = Router();
r.use(requireAuth);
r.post("/", validate(startSessionSchema), ctrl.startSession);
r.get("/:id", ctrl.getSession);
r.post("/:id/answer", validate(submitAnswerSchema), ctrl.submitAnswer);
r.post("/:id/skip", validate(skipSchema), ctrl.skipQuestion);
r.post("/:id/end", ctrl.endSession);
export default r;
