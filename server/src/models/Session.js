import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    question: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
    answer: { type: String, default: "" },
    mode: { type: String, enum: ["text", "code", "voice"], default: "text" },
    status: { type: String, enum: ["pending", "answered", "skipped"], default: "pending" },
    score: { type: Number, default: 0 },
    aiComment: { type: String, default: "" },
    answeredAt: { type: Date },
  },
  { _id: false }
);

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    questions: { type: [answerSchema], default: [] },
    overallScore: { type: Number, default: 0 },
    breakdown: {
      dsa: { type: Number, default: 0 },
      communication: { type: Number, default: 0 },
      problemSolving: { type: Number, default: 0 },
      speed: { type: Number, default: 0 },
    },
    feedback: {
      strengths: { type: [String], default: [] },
      improvements: { type: [String], default: [] },
    },
    status: { type: String, enum: ["active", "completed", "abandoned"], default: "active" },
    startedAt: { type: Date, default: Date.now },
    endedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Session", sessionSchema);
