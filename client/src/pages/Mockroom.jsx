import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import InterviewRoom from "./InterviewRoom.jsx";
import MCQRoom from "./MCQRoom.jsx";
import VoiceRoom from "./VoiceRoom.jsx";
import { Code, BarChart2, Mic, CheckCircle2, ChevronRight, Trophy } from "lucide-react";

/**
 * Full Mock Interview — 3 rounds in sequence:
 * Round 1: Coding (InterviewRoom)
 * Round 2: MCQ    (MCQRoom)
 * Round 3: Voice  (VoiceRoom)
 *
 * Each round component calls onComplete() when done.
 * TODO: pass onComplete prop into InterviewRoom, MCQRoom, VoiceRoom
 *       and call it instead of navigate("/results") inside those components.
 */

const ROUNDS = [
  {
    id: "coding",
    label: "Coding Round",
    sublabel: "DSA + Problem Solving",
    icon: Code,
    color: "#2563EB",
    bg: "#2563EB18",
    duration: "~30 min",
    desc: "10 coding questions covering Arrays, Trees, Graphs, DP and System Design. Write solutions in the editor.",
  },
  {
    id: "mcq",
    label: "MCQ Round",
    sublabel: "Core CS Concepts",
    icon: BarChart2,
    color: "#7c3aed",
    bg: "#7c3aed18",
    duration: "~15 min",
    desc: "15 rapid-fire multiple choice questions on DS&A, OS, DBMS, Networks and OOP. 20 seconds per question.",
  },
  {
    id: "voice",
    label: "HR Round",
    sublabel: "Behavioural Interview",
    icon: Mic,
    color: "#16a34a",
    bg: "#16a34a18",
    duration: "~20 min",
    desc: "7 HR questions with an AI interviewer. Speak your answers — Whisper transcribes and Gemini evaluates.",
  },
];

function RoundBadge({ round, status }) {
  const r = ROUNDS[round];
  const Icon = r.icon;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ width: 24, height: 24, borderRadius: "50%", background: status === "done" ? r.color : status === "active" ? r.bg : "var(--forge-border)", border: `1.5px solid ${status === "pending" ? "var(--forge-border)" : r.color}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}>
        {status === "done"
          ? <CheckCircle2 size={13} color="#fff" />
          : <Icon size={12} color={status === "active" ? r.color : "var(--forge-ink3)"} />
        }
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: status === "active" ? "var(--forge-ink)" : status === "done" ? r.color : "var(--forge-ink3)", transition: "color 0.3s" }}>
        {r.label}
      </span>
    </div>
  );
}

function Stepper({ current }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
      {ROUNDS.map((r, i) => {
        const status = i < current ? "done" : i === current ? "active" : "pending";
        return (
          <div key={r.id} style={{ display: "flex", alignItems: "center" }}>
            <RoundBadge round={i} status={status} />
            {i < ROUNDS.length - 1 && (
              <div style={{ width: 32, height: 1.5, background: i < current ? ROUNDS[i].color : "var(--forge-border)", margin: "0 8px", transition: "background 0.4s" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function PreRoundScreen({ roundIdx, onStart }) {
  const r = ROUNDS[roundIdx];
  const Icon = r.icon;
  return (
    <div style={{ minHeight: "100vh", background: "var(--forge-bg)", color: "var(--forge-ink)", fontFamily: "'Geist', system-ui, sans-serif", display: "flex", flexDirection: "column" }}>
      {/* top bar */}
      <header style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", borderBottom: "1px solid var(--forge-border)", background: "var(--forge-surface)", flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.04em" }}>
          Interview<span style={{ color: "var(--forge-accent)" }}>Forge</span>
        </span>
        <Stepper current={roundIdx} />
        <div style={{ fontSize: 12, color: "var(--forge-ink3)", fontWeight: 600 }}>
          Round {roundIdx + 1} of {ROUNDS.length}
        </div>
      </header>

      {/* content */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "100%", maxWidth: 520, textAlign: "center" }}
        >
          {/* icon blob */}
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 88, height: 88, borderRadius: "50%", background: r.bg, border: `2px solid ${r.color}40`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}
          >
            <Icon size={36} color={r.color} />
          </motion.div>

          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: r.color, marginBottom: 10 }}>
            Round {roundIdx + 1}
          </div>
          <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 6 }}>
            {r.label}
          </div>
          <div style={{ fontSize: 15, color: "var(--forge-ink3)", marginBottom: 24, fontWeight: 600 }}>
            {r.sublabel}
          </div>
          <div style={{ fontSize: 15, color: "var(--forge-ink2)", lineHeight: 1.7, maxWidth: 400, margin: "0 auto 32px" }}>
            {r.desc}
          </div>

          {/* meta pills */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 36 }}>
            <div style={{ padding: "6px 16px", borderRadius: 20, background: r.bg, border: `1px solid ${r.color}30`, fontSize: 12, fontWeight: 700, color: r.color }}>
              {r.duration}
            </div>
            {roundIdx === 0 && <div style={{ padding: "6px 16px", borderRadius: 20, background: "var(--forge-surface)", border: "1px solid var(--forge-border)", fontSize: 12, fontWeight: 700, color: "var(--forge-ink2)" }}>10 Questions</div>}
            {roundIdx === 1 && <div style={{ padding: "6px 16px", borderRadius: 20, background: "var(--forge-surface)", border: "1px solid var(--forge-border)", fontSize: 12, fontWeight: 700, color: "var(--forge-ink2)" }}>15 Questions</div>}
            {roundIdx === 2 && <div style={{ padding: "6px 16px", borderRadius: 20, background: "var(--forge-surface)", border: "1px solid var(--forge-border)", fontSize: 12, fontWeight: 700, color: "var(--forge-ink2)" }}>7 Questions</div>}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={onStart}
            style={{ padding: "14px 36px", borderRadius: 14, border: "none", background: "var(--forge-ink)", color: "var(--forge-bg)", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 10, letterSpacing: "-0.01em" }}
          >
            Begin {r.label} <ChevronRight size={16} />
          </motion.button>

          {roundIdx > 0 && (
            <div style={{ marginTop: 14, fontSize: 12, color: "var(--forge-ink3)" }}>
              ✓ Previous round completed
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function MockIntro({ onStart }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--forge-bg)", color: "var(--forge-ink)", fontFamily: "'Geist', system-ui, sans-serif", display: "flex", flexDirection: "column" }}>
      <header style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", borderBottom: "1px solid var(--forge-border)", background: "var(--forge-surface)" }}>
        <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.04em" }}>
          Interview<span style={{ color: "var(--forge-accent)" }}>Forge</span>
        </span>
        <div style={{ padding: "4px 14px", borderRadius: 20, background: "var(--forge-accent)15", border: "1px solid var(--forge-accent)30", fontSize: 11, fontWeight: 700, color: "var(--forge-accent)" }}>
          Full Mock Interview
        </div>
        <div style={{ width: 120 }} />
      </header>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "100%", maxWidth: 640 }}
        >
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ fontSize: 56, marginBottom: 20 }}>🏆</motion.div>
            <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 10 }}>
              Full Mock Interview
            </div>
            <div style={{ fontSize: 16, color: "var(--forge-ink2)", lineHeight: 1.65, maxWidth: 420, margin: "0 auto" }}>
              Simulate a complete placement interview — 3 rounds back to back. Coding, MCQ, then HR. Get a full score at the end.
            </div>
          </div>

          {/* rounds preview */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 36 }}>
            {ROUNDS.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div key={r.id}
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: "var(--forge-surface)", border: "1px solid var(--forge-border)", borderRadius: 14 }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: r.bg, border: `1px solid ${r.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={18} color={r.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 2 }}>{r.label}</div>
                    <div style={{ fontSize: 12, color: "var(--forge-ink3)" }}>{r.sublabel} · {r.duration}</div>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: r.color, background: r.bg, padding: "3px 10px", borderRadius: 20 }}>
                    Round {i + 1}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* total time */}
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 32 }}>
            {[["~65 min", "Total Duration"], ["32 Questions", "Across all rounds"], ["AI Graded", "Instant feedback"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center", padding: "12px 20px", background: "var(--forge-surface)", border: "1px solid var(--forge-border)", borderRadius: 12 }}>
                <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.03em", fontFamily: "'Geist Mono', monospace" }}>{v}</div>
                <div style={{ fontSize: 11, color: "var(--forge-ink3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={onStart}
              style={{ padding: "15px 40px", borderRadius: 14, border: "none", background: "var(--forge-ink)", color: "var(--forge-bg)", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 10 }}
            >
              Start Full Mock <ChevronRight size={16} />
            </motion.button>
            <div style={{ marginTop: 12, fontSize: 12, color: "var(--forge-ink3)" }}>
              Make sure you're in a quiet place. Mic access required for HR round.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FinalResults({ navigate }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--forge-bg)", color: "var(--forge-ink)", fontFamily: "'Geist', system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
        style={{ width: 520, background: "var(--forge-surface)", border: "1px solid var(--forge-border)", borderRadius: 24, padding: 44, textAlign: "center" }}
      >
        <motion.div animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.1, 1] }} transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ fontSize: 64, marginBottom: 16 }}>🎉</motion.div>

        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 8 }}>
          Mock Interview Complete!
        </div>
        <div style={{ fontSize: 15, color: "var(--forge-ink2)", lineHeight: 1.65, marginBottom: 32 }}>
          All 3 rounds finished. Your AI-generated feedback report is ready.
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 32 }}>
          {ROUNDS.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.id} style={{ padding: "14px 10px", background: "var(--forge-bg)", border: "1px solid var(--forge-border)", borderRadius: 12 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: r.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={15} color={r.color} />
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "var(--forge-ink3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{r.label}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: r.color, marginTop: 4 }}>✓ Done</div>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => window.location.reload()}
            style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "1px solid var(--forge-border2)", background: "transparent", color: "var(--forge-ink2)", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            Retry Mock
          </button>
          <button onClick={() => navigate("/results")}
            style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "none", background: "var(--forge-ink)", color: "var(--forge-bg)", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Trophy size={14} /> Full Report
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main orchestrator ──────────────────────────────────────────────────────
export default function MockRoom() {
  const navigate = useNavigate();
  // phase: intro | pre-0 | round-0 | pre-1 | round-1 | pre-2 | round-2 | done
  const [phase, setPhase] = useState("intro");

  const handleIntroStart = () => setPhase("pre-0");
  const handlePreStart   = (i)  => setPhase(`round-${i}`);
  const handleRoundDone  = (i)  => {
    if (i === 2) setPhase("done");
    else setPhase(`pre-${i + 1}`);
  };

  return (
    <AnimatePresence mode="wait">
      {phase === "intro" && (
        <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <MockIntro onStart={handleIntroStart} />
        </motion.div>
      )}

      {phase === "pre-0" && (
        <motion.div key="pre-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <PreRoundScreen roundIdx={0} onStart={() => handlePreStart(0)} />
        </motion.div>
      )}

      {phase === "round-0" && (
        <motion.div key="round-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          {/*
            Pass onComplete={() => handleRoundDone(0)} into InterviewRoom.
            For now it uses its own End Session → navigate("/results").
            TODO: add onComplete prop to InterviewRoom and call it on end.
          */}
          <InterviewRoom onComplete={() => handleRoundDone(0)} />
        </motion.div>
      )}

      {phase === "pre-1" && (
        <motion.div key="pre-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <PreRoundScreen roundIdx={1} onStart={() => handlePreStart(1)} />
        </motion.div>
      )}

      {phase === "round-1" && (
        <motion.div key="round-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          {/*
            TODO: add onComplete prop to MCQRoom and call it on "See Results".
          */}
          <MCQRoom onComplete={() => handleRoundDone(1)} />
        </motion.div>
      )}

      {phase === "pre-2" && (
        <motion.div key="pre-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <PreRoundScreen roundIdx={2} onStart={() => handlePreStart(2)} />
        </motion.div>
      )}

      {phase === "round-2" && (
        <motion.div key="round-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          {/*
            TODO: add onComplete prop to VoiceRoom and call it on "Finish Interview".
          */}
          <VoiceRoom onComplete={() => handleRoundDone(2)} />
        </motion.div>
      )}

      {phase === "done" && (
        <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <FinalResults navigate={navigate} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}