import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Trophy, Flame, Medal, Star, Zap, Target } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import GlowCard from "../components/GlowCard.jsx";
import StatCard from "../components/StatCard.jsx";
import NeonButton from "../components/NeonButton.jsx";
import NeonBadge from "../components/NeonBadge.jsx";

/**
 * TODO (offline):
 *  - Load user via api.get("/users/me")
 *  - Save edits with api.patch("/users/me", { ...changedFields })
 *  - Delete account with api.delete("/users/me")
 *  - Upload avatar to your storage of choice and PATCH avatarUrl
 */

const ACHIEVEMENTS = [
  { key: "first",    label: "First Session", icon: Star,   earned: true  },
  { key: "fifty",    label: "50 Questions",  icon: Target, earned: true  },
  { key: "streak7",  label: "7-Day Streak",  icon: Flame,  earned: true  },
  { key: "ace",      label: "90+ Score",     icon: Trophy, earned: false },
  { key: "speed",    label: "Speed Demon",   icon: Zap,    earned: true  },
  { key: "veteran",  label: "100 Sessions",  icon: Medal,  earned: false },
];

function EditableField({ label, value, onSave, type = "text" }) {
  const [draft, setDraft] = useState(value);
  const [editing, setEditing] = useState(false);
  const dirty = draft !== value;
  return (
    <div>
      <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-1">{label}</p>
      {editing ? (
        <div className="flex gap-2">
          <input
            type={type} value={draft} onChange={(e) => setDraft(e.target.value)}
            className="flex-1 bg-[#0A0A0F] border border-white/10 rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:border-[#00F5FF] focus:shadow-[0_0_12px_rgba(0,245,255,0.3)]" />
          {dirty && <NeonButton variant="primary" onClick={() => { onSave(draft); setEditing(false); }}>Save</NeonButton>}
          <NeonButton variant="ghost" onClick={() => { setDraft(value); setEditing(false); }}>Cancel</NeonButton>
        </div>
      ) : (
        <button onClick={() => setEditing(true)} className="w-full text-left text-slate-200 hover:text-[#00F5FF] transition">
          {value || <span className="text-slate-600">—</span>}
        </button>
      )}
    </div>
  );
}

export default function Profile() {
  const [user, setUser] = useState({
    name: "Manveer Singh",
    email: "manveer@example.com",
    targetRole: "Senior Backend Engineer",
    experienceLevel: "Mid",
  });
  const update = (k) => (v) => setUser((u) => ({ ...u, [k]: v }));

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-slate-100">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-10">

        {/* Avatar */}
        <section className="flex flex-col items-center text-center">
          <div className="group relative w-32 h-32 rounded-full p-[3px] bg-gradient-to-br from-[#00F5FF] to-[#0088ff] shadow-[0_0_30px_rgba(0,245,255,0.6)]">
            <div className="w-full h-full rounded-full bg-[#0F0F1A] flex items-center justify-center text-3xl font-bold text-[#00F5FF] font-mono">
              MS
            </div>
            <button className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <Camera className="w-6 h-6 text-[#00F5FF]" />
            </button>
          </div>
          <h1 className="mt-4 text-2xl font-bold">{user.name}</h1>
          <div className="mt-2"><NeonBadge color="cyan">Full Stack Developer</NeonBadge></div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Total Sessions" value="47"  delta="up 12%" />
          <StatCard label="Avg Score"      value="73%" delta="up 5%"  />
          <StatCard label="Best Streak"    value="14"  delta="days"   />
        </section>

        {/* Editable info */}
        <section>
          <h2 className="text-xs uppercase tracking-[0.2em] text-[#00F5FF] mb-4 font-semibold">Account</h2>
          <GlowCard className="space-y-5">
            <EditableField label="Name"             value={user.name}            onSave={update("name")} />
            <EditableField label="Email"            value={user.email}           onSave={update("email")} type="email" />
            <EditableField label="Target Role"      value={user.targetRole}      onSave={update("targetRole")} />
            <EditableField label="Experience Level" value={user.experienceLevel} onSave={update("experienceLevel")} />
          </GlowCard>
        </section>

        {/* Achievements */}
        <section>
          <h2 className="text-xs uppercase tracking-[0.2em] text-[#00F5FF] mb-4 font-semibold">Achievements</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((a) => (
              <motion.div key={a.key} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                <div className={`relative rounded-xl border p-5 flex flex-col items-center text-center transition
                  ${a.earned
                    ? "border-[#00F5FF]/40 bg-[#00F5FF]/5 shadow-[0_0_20px_rgba(0,245,255,0.25)] hover:shadow-[0_0_35px_rgba(0,245,255,0.55)]"
                    : "border-white/10 bg-[#0F0F1A]/60 opacity-50 grayscale"}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3
                    ${a.earned ? "bg-[#00F5FF]/15 text-[#00F5FF]" : "bg-white/5 text-slate-500"}`}>
                    <a.icon className="w-6 h-6" />
                  </div>
                  <p className={`text-sm font-semibold ${a.earned ? "text-white" : "text-slate-400"}`}>{a.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Danger zone */}
        <section>
          <h2 className="text-xs uppercase tracking-[0.2em] text-rose-400 mb-4 font-semibold">Danger Zone</h2>
          <div className="rounded-2xl border border-rose-500/30 bg-rose-950/10 p-6 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <p className="font-semibold text-rose-300">Delete Account</p>
              <p className="text-sm text-slate-500 mt-1">
                Permanently remove your account, sessions, and progress. This cannot be undone.
              </p>
            </div>
            <NeonButton variant="danger">Delete Account</NeonButton>
          </div>
        </section>

      </main>
    </div>
  );
}
