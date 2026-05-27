import Session from "../models/Session.js";

export async function getResult(req, res, next) {
  try {
    const session = await Session.findOne({ _id: req.params.sessionId, user: req.userId })
      .populate("questions.question");
    if (!session) return res.status(404).json({ error: "Not found" });
    res.json({
      overallScore: session.overallScore,
      breakdown: session.breakdown,
      feedback: session.feedback,
      review: session.questions.map((q) => ({
        question: q.question,
        answer: q.answer,
        status: q.status,
        score: q.score,
        aiComment: q.aiComment,
      })),
    });
  } catch (e) { next(e); }
}
