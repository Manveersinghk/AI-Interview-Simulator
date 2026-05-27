import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { signToken } from "../utils/token.js";

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: "Email already in use" });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, passwordHash });
    const token = signToken(user._id);
    res.status(201).json({ token, user: sanitize(user) });
  } catch (e) { next(e); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    const token = signToken(user._id);
    res.json({ token, user: sanitize(user) });
  } catch (e) { next(e); }
}

export async function me(req, res, next) {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user: sanitize(user) });
  } catch (e) { next(e); }
}

function sanitize(u) {
  return {
    id: u._id,
    name: u.name,
    email: u.email,
    role: u.role,
    targetRole: u.targetRole,
    experienceLevel: u.experienceLevel,
    avatarUrl: u.avatarUrl,
    stats: u.stats,
    achievements: u.achievements,
    createdAt: u.createdAt,
  };
}
