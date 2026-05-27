import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true, index: true }, // e.g. Arrays, Trees, System Design
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true, index: true },
    category: { type: String, enum: ["DSA", "Behavioural", "System Design", "CS Fundamentals"], required: true },
    title: { type: String, required: true },
    prompt: { type: String, required: true },
    idealAnswer: { type: String, default: "" },
    timeLimitSeconds: { type: Number, default: 180 },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
