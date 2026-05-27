import Question from "../models/Question.js";

export async function listQuestions(req, res, next) {
  try {
    const { topic, difficulty, limit = 20 } = req.query;
    const filter = {};
    if (topic) filter.topic = topic;
    if (difficulty) filter.difficulty = difficulty;
    const questions = await Question.find(filter).limit(Math.min(Number(limit), 100));
    res.json({ questions });
  } catch (e) { next(e); }
}

export async function getQuestion(req, res, next) {
  try {
    const q = await Question.findById(req.params.id);
    if (!q) return res.status(404).json({ error: "Not found" });
    res.json({ question: q });
  } catch (e) { next(e); }
}
