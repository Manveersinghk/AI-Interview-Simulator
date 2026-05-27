import Session from "../models/Session.js";
import Question from "../models/Question.js";
import User from "../models/User.js";
import { scoreAnswer, aggregateBreakdown, buildFeedback } from "../utils/scoring.js";

export async function startSession(req, res, next) {
  try {
    const { topic, difficulty, questionCount } = req.body;
    const filter = {};
    if (topic) filter.topic = topic;
    if (difficulty) filter.difficulty = difficulty;
    const pool = await Question.aggregate([{ $match: filter }, { $sample: { size: questionCount } }]);
    if (!pool.length) return res.status(400).json({ error: "No questions available for filter" });

    const session = await Session.create({
      user: req.userId,
      questions: pool.map((q) => ({ question: q._id })),
    });
    const populated = await session.populate("questions.question");
    res.status(201).json({ session: populated });
  } catch (e) { next(e); }
}

export async function getSession(req, res, next) {
  try {
    const session = await Session.findOne({ _id: req.params.id, user: req.userId })
      .populate("questions.question");
    if (!session) return res.status(404).json({ error: "Not found" });
    res.json({ session });
  } catch (e) { next(e); }
}

export async function submitAnswer(req, res, next) {
  try {
    const { questionId, answer, mode } = req.body;
    const session = await Session.findOne({ _id: req.params.id, user: req.userId })
      .populate("questions.question");
    if (!session) return res.status(404).json({ error: "Not found" });
    const item = session.questions.find((x) => String(x.question._id) === String(questionId));
    if (!item) return res.status(404).json({ error: "Question not in session" });

    const { score, comment } = await scoreAnswer({ question: item.question, answer });
    item.answer = answer;
    item.mode = mode;
    item.status = "answered";
    item.score = score;
    item.aiComment = comment;
    item.answeredAt = new Date();
    await session.save();
    res.json({ ok: true, score, comment });
  } catch (e) { next(e); }
}

export async function skipQuestion(req, res, next) {
  try {
    const { questionId } = req.body;
    const session = await Session.findOne({ _id: req.params.id, user: req.userId });
    if (!session) return res.status(404).json({ error: "Not found" });
    const item = session.questions.find((x) => String(x.question) === String(questionId));
    if (!item) return res.status(404).json({ error: "Question not in session" });
    item.status = "skipped";
    await session.save();
    res.json({ ok: true });
  } catch (e) { next(e); }
}

export async function endSession(req, res, next) {
  try {
    const session = await Session.findOne({ _id: req.params.id, user: req.userId })
      .populate("questions.question");
    if (!session) return res.status(404).json({ error: "Not found" });

    const breakdown = aggregateBreakdown(session.questions);
    const feedback = buildFeedback(breakdown);
    const answered = session.questions.filter((q) => q.status === "answered");
    const overall = answered.length
      ? Math.round(answered.reduce((s, q) => s + (q.score || 0), 0) / answered.length)
      : 0;

    session.breakdown = breakdown;
    session.feedback = feedback;
    session.overallScore = overall;
    session.status = "completed";
    session.endedAt = new Date();
    await session.save();

    // bump user stats
    const user = await User.findById(req.userId);
    if (user) {
      const total = (user.stats.totalSessions || 0) + 1;
      const avg = Math.round(((user.stats.avgScore || 0) * (total - 1) + overall) / total);
      user.stats.totalSessions = total;
      user.stats.avgScore = avg;
      user.stats.lastSessionAt = new Date();
      await user.save();
    }

    res.json({ session });
  } catch (e) { next(e); }
}
