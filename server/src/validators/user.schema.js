import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  email: z.string().trim().email().max(255).optional(),
  targetRole: z.string().trim().max(120).optional(),
  experienceLevel: z.enum(["Junior", "Mid", "Senior", "Staff"]).optional(),
  avatarUrl: z.string().url().max(500).optional().or(z.literal("")),
});
