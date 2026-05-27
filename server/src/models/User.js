import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    earnedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, default: "Full Stack Developer" },
    targetRole: { type: String, default: "" },
    experienceLevel: { type: String, enum: ["Junior", "Mid", "Senior", "Staff"], default: "Mid" },
    avatarUrl: { type: String, default: "" },
    achievements: { type: [achievementSchema], default: [] },
    stats: {
      totalSessions: { type: Number, default: 0 },
      avgScore: { type: Number, default: 0 },
      bestStreak: { type: Number, default: 0 },
      currentStreak: { type: Number, default: 0 },
      lastSessionAt: { type: Date },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
