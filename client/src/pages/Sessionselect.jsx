import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Code2, BarChart2, Mic, Trophy, ArrowRight, Zap, Clock, Star } from "lucide-react";

const MODES = [
  {
    id: "interview",
    icon: Code2,
    color: "#2563EB",
    bg: "#2563EB18",
    border: "#2563EB30",
    label: "Coding Practice",
    sublabel: "DSA + Problem Solving",
    desc: "10 coding questions across Arrays, Trees, Graphs, DP and System Design. Write solutions in a real editor with hints.",
    pills: ["10 Questions", "~30 min", "Hints Available"],
    route: "/interview",
  },
  {
    id: "mcq",
    icon: BarChart2,
    color: "#7c3aed",
    bg: "#7c3aed18",
    border: "#7c3aed30",
    label: "MCQ Practice",
    sublabel: "Core CS Concepts",
    desc: "15 rapid-fire multiple choice questions on DS&A, OS, DBMS, Networks and OOP. 20 seconds per question with instant feedback.",
    pills: ["15 Questions", "~15 min", "Timed"],
    route: "/mcq",
  },
  {
    id: "voice",
    icon: Mic,
    color: "#16a34a",
    bg: "#16a34a18",
    border: "#16a34a30",
    label: "HR Interview",
    sublabel: "Voice Behavioural Round",
    desc: "7 HR questions with an AI interviewer. Speak your answers — speech is transcribed live and evaluated by Gemini.",
    pills: ["7 Questions", "~20 min", "Mic Required"],
    route: "/voice",
  },
  {
    id: "mock",
    icon: Trophy,
    color: "#d97706",
    bg: "#d9770618",
    border: "#d9770630",
    label: "Full Mock Interview",
    sublabel: "All 3 Rounds Combined",
    desc: "Complete placement simulation — Coding → MCQ → HR Voice back to back. Get a full AI-graded report at the end.",
    pills: ["32 Questions", "~65 min", "Full Report"],
    route: "/mock",
    featured: true,
  },
];

const STATS = [
  { icon: Zap,   value: "2000+", label: "Questions" },
  { icon: Star,  value: "94%",   label: "Placement rate" },
  { icon: Clock, value: "~65m",  label: "Full mock duration" },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function SessionSelect() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "var(--forge-bg)", color: "var(--forge-ink)", fontFamily: "'Geist', system-ui, sans-serif" }}>

      {/* ── Navbar ── */}
      <nav style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", borderBottom: "1px solid var(--forge-border)", background: "var(--forge-surface)", position: "sticky", top: 0, zIndex: 30 }}>
        <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.04em", cursor: "pointer" }} onClick={() => navigate("/")}>
          Interview<span style={{ color: "var(--forge-accent)" }}>Forge</span>
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          {[["Coding", "/interview"], ["MCQ", "/mcq"], ["HR Voice", "/voice"], ["Full Mock", "/mock"]].map(([label, route]) => (
            <button key={route} onClick={() => navigate(route)}
              style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid var(--forge-border)", background: "transparent", color: "var(--forge-ink2)", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--forge-accent)"; e.currentTarget.style.color = "var(--forge-ink)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--forge-border)"; e.currentTarget.style.color = "var(--forge-ink2)"; }}
            >
              {label}
            </button>
          ))}
        </div>
        <button onClick={() => navigate("/auth")}
          style={{ padding: "7px 16px", borderRadius: 10, border: "none", background: "var(--forge-ink)", color: "var(--forge-bg)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
          Sign in
        </button>
      </nav>

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "52px 24px 80px" }}>

        {/* ── Header ── */}
        <motion.div {...fade(0)} style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--forge-accent)", marginBottom: 10 }}>
            Choose your session
          </div>
          <h1 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.15, marginBottom: 10 }}>
            What do you want to<br />practice today?
          </h1>
          <p style={{ fontSize: 15, color: "var(--forge-ink2)", lineHeight: 1.65, maxWidth: 460 }}>
            Pick a focused round or go all-in with the full mock. Each session gives you AI feedback and a score.
          </p>
        </motion.div>

        {/* ── Mode cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 32 }}>
          {MODES.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div key={m.id} {...fade(0.06 + i * 0.06)}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => navigate(m.route)}
                style={{
                  padding: "24px", borderRadius: 20, cursor: "pointer",
                  background: "var(--forge-surface)",
                  border: `1px solid ${m.featured ? m.border : "var(--forge-border)"}`,
                  position: "relative", overflow: "hidden",
                  gridColumn: m.featured ? "1 / -1" : "auto",
                }}
              >
                {/* blob deco */}
                <div style={{ position: "absolute", width: 140, height: 140, borderRadius: "50%", background: m.color, opacity: 0.05, bottom: -40, right: -20, pointerEvents: "none" }} />

                {m.featured && (
                  <div style={{ position: "absolute", top: 16, right: 16, padding: "3px 12px", borderRadius: 20, background: m.bg, border: `1px solid ${m.border}`, fontSize: 11, fontWeight: 700, color: m.color }}>
                    ⭐ Recommended
                  </div>
                )}

                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: m.bg, border: `1px solid ${m.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={20} color={m.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 2 }}>{m.label}</div>
                    <div style={{ fontSize: 12, color: "var(--forge-ink3)", fontWeight: 600, marginBottom: 10 }}>{m.sublabel}</div>
                    <div style={{ fontSize: 13, color: "var(--forge-ink2)", lineHeight: 1.65, marginBottom: 14, maxWidth: m.featured ? 560 : 280 }}>{m.desc}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      {m.pills.map((p) => (
                        <span key={p} style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, color: m.color, background: m.bg, border: `1px solid ${m.border}` }}>{p}</span>
                      ))}
                      <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 700, color: m.color }}>
                        Start <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Stats strip ── */}
        <motion.div {...fade(0.3)}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, background: "var(--forge-surface)", border: "1px solid var(--forge-border)", borderRadius: 16, overflow: "hidden" }}
        >
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} style={{ padding: "20px 24px", textAlign: "center", borderRight: i < STATS.length - 1 ? "1px solid var(--forge-border)" : "none" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                  <Icon size={16} color="var(--forge-accent)" />
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.04em", fontFamily: "'Geist Mono', monospace", marginBottom: 3 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "var(--forge-ink3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</div>
              </div>
            );
          })}
        </motion.div>
      </main>
    </div>
  );
}