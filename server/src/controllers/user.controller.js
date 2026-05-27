import User from "../models/User.js";

export async function getMe(req, res, next) {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json({ user });
  } catch (e) { next(e); }
}

export async function updateMe(req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(req.userId, req.body, { new: true, runValidators: true });
    res.json({ user });
  } catch (e) { next(e); }
}

export async function deleteMe(req, res, next) {
  try {
    await User.findByIdAndDelete(req.userId);
    res.json({ ok: true });
  } catch (e) { next(e); }
}

export async function getAchievements(req, res, next) {
  try {
    const user = await User.findById(req.userId).select("achievements");
    res.json({ achievements: user?.achievements || [] });
  } catch (e) { next(e); }
}
