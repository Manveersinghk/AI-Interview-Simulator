import { Router } from "express";
import * as ctrl from "../controllers/user.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { updateUserSchema } from "../validators/user.schema.js";

const r = Router();
r.use(requireAuth);
r.get("/me", ctrl.getMe);
r.patch("/me", validate(updateUserSchema), ctrl.updateMe);
r.delete("/me", ctrl.deleteMe);
r.get("/me/achievements", ctrl.getAchievements);
export default r;
