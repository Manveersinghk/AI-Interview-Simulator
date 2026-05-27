import { z } from "zod";

export const startSessionSchema = z.object({
  topic: z.string().trim().optional(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]).optional(),
  questionCount: z.number().int().min(1).max(20).default(10),
});

export const submitAnswerSchema = z.object({
  questionId: z.string().min(1),
  answer: z.string().max(20000),
  mode: z.enum(["text", "code", "voice"]).default("text"),
});

export const skipSchema = z.object({
  questionId: z.string().min(1),
});
