import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap, BarChart2, Mic, Code2, CheckCircle } from "lucide-react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const FEATURES = [
  {
    icon: Code2,
    color: "#2563EB",
    bg: "#eff6ff",
    darkBg: "#1e3a5f",
    label: "Code Mode",
    desc: "Write real solutions in a Monaco-style editor with syntax highlighting and line numbers.",
  },
  {
    icon: Zap,
    color: "#16a34a",
    bg: "#f0fdf4",
    darkBg: "#14391f",
    label: "MCQ Rounds",
    desc: "Rapid-fire multiple choice across DS&A, OS, DBMS, CN and OOP — timed and adaptive.",
  },
  {
    icon: Mic,
    color: "#7c3aed",
    bg: "#f5f3ff",
    darkBg: "#2e1a5e",
    label: "Voice Mode",
    desc: "Speak your answer. Whisper transcribes, Gemini evaluates communication and clarity.",
  },
  {
    icon: BarChart2,
    color: "#dc2626",
    bg: "#fef2f2",
    darkBg: "#3f1515",
    label: "AI Feedback",
    desc: "Gemini grades every answer — ideal solution, complexity analysis, what to improve.",
  },
];

const STATS = [
  { value: "10K+", label: "Questions" },
  { value: "94%", label: "Placement rate" },
  { value: "8 topics", label: "CS domains" },
  { value: "Gemini", label: "Powered by" },
];

export default function Landing() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--forge-bg)",
        color: "var(--forge-ink)",
        fontFamily: "'Geist', system-ui, sans-serif",
      }}
    >
      {/* ── Navbar ── */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 32px",
          borderBottom: "1px solid var(--forge-border)",
          background: "var(--forge-surface)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.04em" }}>
          Interview<span style={{ color: "var(--forge-accent)" }}>Forge</span>
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link to="/auth">
            <button
              style={{
                background: "transparent",
                border: "1.5px solid var(--forge-border2)",
                borderRadius: 12,
                padding: "8px 18px",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--forge-ink2)",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Sign in
            </button>
          </Link>
          <Link to="/auth">
            <button
              style={{
                background: "var(--forge-ink)",
                border: "none",
                borderRadius: 12,
                padding: "8px 18px",
                fontSize: 13,
                fontWeight: 700,
                color: "var(--forge-bg)",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Get started
            </button>
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "100px 32px 80px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Abstract blobs */}
        <div
          style={{
            position: "absolute",
            width: 340,
            height: 340,
            borderRadius: "50%",
            background: "var(--forge-accent)",
            opacity: 0.06,
            top: 40,
            left: -80,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "#2563EB",
            opacity: 0.06,
            top: 80,
            right: -60,
            pointerEvents: "none",
          }}
        />

        <motion.div {...fade(0)}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 14px",
              borderRadius: 20,
              background: "var(--forge-accent-dim)",
              color: "var(--forge-accent)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            <CheckCircle size={12} />
            Powered by Gemini AI
          </span>
        </motion.div>

        <motion.h1
          {...fade(0.08)}
          style={{
            fontSize: "clamp(42px, 7vw, 72px)",
            fontWeight: 800,
            letterSpacing: "-0.045em",
            lineHeight: 1.08,
            marginBottom: 24,
          }}
        >
          Stop preparing.
          <br />
          <span style={{ color: "var(--forge-accent)" }}>Start performing.</span>
        </motion.h1>

        <motion.p
          {...fade(0.16)}
          style={{
            fontSize: 18,
            color: "var(--forge-ink2)",
            lineHeight: 1.7,
            maxWidth: 520,
            margin: "0 auto 40px",
            fontWeight: 400,
          }}
        >
          AI-powered adaptive interview practice. Code, MCQ, voice — all in one
          place. Gemini grades every answer like a real interviewer.
        </motion.p>

        <motion.div
          {...fade(0.22)}
          style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}
        >
          <Link to="/auth">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "var(--forge-ink)",
                color: "var(--forge-bg)",
                border: "none",
                borderRadius: 14,
                padding: "15px 28px",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: 8,
                letterSpacing: "-0.01em",
              }}
            >
              Start forging <ArrowRight size={16} />
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: "transparent",
              color: "var(--forge-ink2)",
              border: "1.5px solid var(--forge-border2)",
              borderRadius: 14,
              padding: "15px 28px",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Watch demo
          </motion.button>
        </motion.div>
      </section>

      {/* ── Stats strip ── */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        style={{
          borderTop: "1px solid var(--forge-border)",
          borderBottom: "1px solid var(--forge-border)",
          background: "var(--forge-surface)",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "0 32px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                padding: "28px 16px",
                textAlign: "center",
                borderRight: i < 3 ? "1px solid var(--forge-border)" : "none",
              }}
            >
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  marginBottom: 4,
                  fontFamily: "'Geist Mono', monospace",
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: 12, color: "var(--forge-ink3)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── Features ── */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "80px 32px" }}>
        <motion.div {...fade(0)} style={{ marginBottom: 48, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--forge-ink3)", marginBottom: 10 }}>
              What's inside
            </p>
            <h2 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.15 }}>
              Everything you need<br />to crack the interview.
            </h2>
          </div>
          <Link to="/interview">
            <button
              style={{
                background: "transparent",
                border: "1.5px solid var(--forge-border2)",
                borderRadius: 12,
                padding: "10px 20px",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--forge-ink2)",
                cursor: "pointer",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              Try it free <ArrowRight size={14} />
            </button>
          </Link>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.label}
              {...fade(i * 0.07)}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{
                background: "var(--forge-surface)",
                border: "1px solid var(--forge-border)",
                borderRadius: 20,
                padding: "28px",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
              }}
            >
              {/* blob deco */}
              <div
                style={{
                  position: "absolute",
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: f.color,
                  opacity: 0.07,
                  bottom: -30,
                  right: -20,
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: f.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <f.icon size={20} color={f.color} />
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 8 }}>
                {f.label}
              </div>
              <div style={{ fontSize: 13, color: "var(--forge-ink2)", lineHeight: 1.65 }}>
                {f.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px 100px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            background: "var(--forge-ink)",
            borderRadius: 24,
            padding: "52px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 260,
              height: 260,
              borderRadius: "50%",
              background: "var(--forge-accent)",
              opacity: 0.1,
              top: -80,
              right: -60,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 160,
              height: 160,
              borderRadius: "50%",
              background: "#2563EB",
              opacity: 0.1,
              bottom: -50,
              left: 80,
              pointerEvents: "none",
            }}
          />
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.04em", color: "#fff", marginBottom: 8, lineHeight: 1.2 }}>
              Your next offer starts<br />with one session.
            </div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>
              Free to start. No card required.
            </div>
          </div>
          <Link to="/interview">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                background: "#fff",
                color: "#0D0D0D",
                border: "none",
                borderRadius: 14,
                padding: "16px 28px",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexShrink: 0,
              }}
            >
              Start forging <ArrowRight size={16} />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: "1px solid var(--forge-border)",
          padding: "24px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 12,
          color: "var(--forge-ink3)",
        }}
      >
        <span style={{ fontWeight: 800, fontSize: 14, letterSpacing: "-0.03em", color: "var(--forge-ink)" }}>
          Interview<span style={{ color: "var(--forge-accent)" }}>Forge</span>
        </span>
        <span>© 2025 InterviewForge. Built for placement warriors.</span>
      </footer>
    </div>
  );
}