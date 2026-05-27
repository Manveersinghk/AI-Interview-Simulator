import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mic, MicOff, ChevronRight, Volume2, XCircle, CheckCircle2, AlertCircle } from "lucide-react";

/**
 * TODO (backend):
 * 1. TTS for HR questions: api.post("/voice/speak", { text }) → audio stream
 * 2. STT for user answer:  send audio blob to /voice/transcribe (Whisper)
 * 3. AI evaluation:        api.post("/voice/evaluate", { questionId, transcript })
 * 4. Replace MOCK_HR_QUESTIONS with api.get("/voice/questions")
 */

const MOCK_HR_QUESTIONS = [
  {
    id: "h1",
    question: "Tell me about yourself and why you're interested in this role.",
    tip: "Keep it under 2 minutes. Cover: who you are, what you've built, why this company.",
    duration: 120,
  },
  {
    id: "h2",
    question: "Describe a challenging project you worked on. What was your role and what did you learn?",
    tip: "Use STAR format. Mention JBLS or InterviewForge with specific technical decisions.",
    duration: 150,
  },
  {
    id: "h3",
    question: "Tell me about a time you disagreed with a teammate or senior on a technical decision.",
    tip: "Show maturity. Focus on communication process, not just the outcome.",
    duration: 120,
  },
  {
    id: "h4",
    question: "Where do you see yourself in 3-5 years? How does this role fit your goals?",
    tip: "Be specific about skills you want to build. Align with the company's domain.",
    duration: 90,
  },
  {
    id: "h5",
    question: "What's your biggest technical weakness, and what are you doing to improve it?",
    tip: "Be honest — pick a real gap you're actively working on. Shows self-awareness.",
    duration: 90,
  },
  {
    id: "h6",
    question: "How do you handle tight deadlines and multiple priorities at the same time?",
    tip: "Give a real example. Mention tools/processes you use: Notion, GitHub issues, sprints.",
    duration: 120,
  },
  {
    id: "h7",
    question: "Do you have any questions for us?",
    tip: "Always ask something! Try: 'What does the onboarding look like?' or 'What does success look like in 90 days?'",
    duration: 60,
  },
];

// ── Animated SVG HR Avatar ─────────────────────────────────────────────────
function HRAvatar({ speaking, listening }) {
  const ringCount = 4;

  return (
    <div style={{ position: "relative", width: 220, height: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* outer pulse rings when speaking */}
      {speaking && Array.from({ length: ringCount }).map((_, i) => (
        <motion.div key={i}
          animate={{ scale: [1, 1.6 + i * 0.2], opacity: [0.35, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.35, ease: "easeOut" }}
          style={{ position: "absolute", width: 140, height: 140, borderRadius: "50%", border: "1.5px solid var(--forge-accent)", pointerEvents: "none" }}
        />
      ))}

      {/* listening rings */}
      {listening && Array.from({ length: 3 }).map((_, i) => (
        <motion.div key={i}
          animate={{ scale: [1, 1.4 + i * 0.15], opacity: [0.3, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.3, ease: "easeOut" }}
          style={{ position: "absolute", width: 140, height: 140, borderRadius: "50%", border: "1.5px solid #7c3aed", pointerEvents: "none" }}
        />
      ))}

      {/* main circle */}
      <motion.div
        animate={speaking ? { scale: [1, 1.04, 1] } : listening ? { scale: [1, 1.02, 1] } : { scale: 1 }}
        transition={speaking || listening ? { duration: speaking ? 0.9 : 1.2, repeat: Infinity, ease: "easeInOut" } : {}}
        style={{ width: 140, height: 140, borderRadius: "50%", background: "var(--forge-surface)", border: `2px solid ${speaking ? "var(--forge-accent)" : listening ? "#7c3aed" : "var(--forge-border)"}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative", transition: "border-color 0.3s", boxShadow: speaking ? "0 0 32px var(--forge-accent)30" : listening ? "0 0 32px #7c3aed30" : "none" }}
      >
        {/* SVG face */}
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* background */}
          <circle cx="50" cy="50" r="50" fill="#13131F" />

          {/* body / shirt */}
          <ellipse cx="50" cy="88" rx="28" ry="16" fill="#1e293b" />
          <rect x="33" y="76" width="34" height="24" rx="4" fill="#1e293b" />

          {/* collar */}
          <path d="M44 76 L50 84 L56 76" stroke="#334155" strokeWidth="1.5" fill="none" />

          {/* neck */}
          <rect x="44" y="68" width="12" height="12" rx="4" fill="#c8a882" />

          {/* head */}
          <ellipse cx="50" cy="52" rx="20" ry="22" fill="#c8a882" />

          {/* hair */}
          <ellipse cx="50" cy="32" rx="20" ry="10" fill="#2d1b00" />
          <rect x="30" y="30" width="40" height="10" rx="2" fill="#2d1b00" />

          {/* ears */}
          <ellipse cx="30" cy="52" rx="4" ry="5" fill="#c8a882" />
          <ellipse cx="70" cy="52" rx="4" ry="5" fill="#c8a882" />

          {/* eyes */}
          <ellipse cx="42" cy="50" rx="4" ry="4.5" fill="white" />
          <ellipse cx="58" cy="50" rx="4" ry="4.5" fill="white" />
          <motion.ellipse cx="42" cy="50" rx="2.5" ry="2.5" fill="#1e293b"
            animate={speaking ? { cy: [50, 50.5, 50] } : {}}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
          <motion.ellipse cx="58" cy="50" rx="2.5" ry="2.5" fill="#1e293b"
            animate={speaking ? { cy: [50, 50.5, 50] } : {}}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
          {/* pupils */}
          <circle cx="42.8" cy="49.3" r="1" fill="white" />
          <circle cx="58.8" cy="49.3" r="1" fill="white" />

          {/* eyebrows */}
          <path d="M38 44.5 Q42 42.5 46 44" stroke="#4a3000" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M54 44 Q58 42.5 62 44.5" stroke="#4a3000" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* mouth — animates when speaking */}
          <motion.path
            d={speaking ? "M44 60 Q50 65 56 60" : "M44 60 Q50 62 56 60"}
            stroke="#8b5e3c" strokeWidth="1.5" strokeLinecap="round" fill="none"
            animate={speaking ? { d: ["M44 60 Q50 65 56 60", "M44 60 Q50 63 56 60", "M44 60 Q50 66 56 60", "M44 60 Q50 63 56 60"] } : {}}
            transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* nose */}
          <path d="M48 53 Q50 57 52 53" stroke="#a07850" strokeWidth="1" fill="none" strokeLinecap="round" />

          {/* status indicator dot */}
          <circle cx="70" cy="32" r="5" fill={speaking ? "var(--forge-accent)" : listening ? "#7c3aed" : "#334155"} />
          <motion.circle cx="70" cy="32" r="5" fill="transparent" stroke={speaking ? "var(--forge-accent)" : "#7c3aed"} strokeWidth="2"
            animate={(speaking || listening) ? { r: [5, 9], opacity: [0.6, 0] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </svg>
      </motion.div>

      {/* name tag */}
      <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", background: "var(--forge-surface)", border: "1px solid var(--forge-border)", borderRadius: 20, padding: "4px 14px", fontSize: 11, fontWeight: 700, color: "var(--forge-ink2)", whiteSpace: "nowrap", letterSpacing: "0.03em" }}>
        Priya Sharma · HR Manager
      </div>
    </div>
  );
}

// ── Sound wave visualiser ──────────────────────────────────────────────────
function SoundWave({ active, color = "var(--forge-accent)" }) {
  const bars = 28;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, height: 36 }}>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div key={i}
          animate={active ? { scaleY: [0.15, Math.random() * 0.8 + 0.2, 0.15] } : { scaleY: 0.1 }}
          transition={active ? { duration: 0.4 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.03, ease: "easeInOut" } : { duration: 0.3 }}
          style={{ width: 3, height: 28, borderRadius: 2, background: color, transformOrigin: "center" }}
        />
      ))}
    </div>
  );
}

// ── main ───────────────────────────────────────────────────────────────────
export default function VoiceRoom() {
  const navigate                      = useNavigate();
  const [idx, setIdx]                 = useState(0);
  const [phase, setPhase]             = useState("intro"); // intro | speaking | listening | review | done
  const [transcript, setTranscript]   = useState("");
  const [allAnswers, setAllAnswers]    = useState([]);
  const [timeLeft, setTimeLeft]       = useState(0);
  const [showEndModal, setShowEndModal] = useState(false);
  const recognitionRef                = useRef(null);
  const timerRef                      = useRef(null);

  const q = MOCK_HR_QUESTIONS[idx];

  // simulate HR speaking with a timer then switch to listening
  const startQuestion = () => {
    setPhase("speaking");
    setTranscript("");
    // TODO: call TTS api here and play audio
    // Simulate HR speaking for 3s then open mic
    setTimeout(() => setPhase("listening"), 3000);
  };

  // start recording
  useEffect(() => {
    if (phase !== "listening") return;
    setTimeLeft(q.duration);

    // Web Speech API
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SR();
      rec.continuous    = true;
      rec.interimResults = true;
      rec.lang          = "en-US";
      rec.onresult = (e) => {
        let interim = "", final = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          if (e.results[i].isFinal) final += e.results[i][0].transcript;
          else interim += e.results[i][0].transcript;
        }
        setTranscript((prev) => prev + final || interim);
      };
      rec.start();
      recognitionRef.current = rec;
    }

    // countdown timer
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timerRef.current); handleStopListening(); return 0; }
        return t - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
      recognitionRef.current?.stop();
    };
  }, [phase, idx]);

  const handleStopListening = () => {
    clearInterval(timerRef.current);
    recognitionRef.current?.stop();
    setPhase("review");
  };

  const handleNext = () => {
    setAllAnswers((prev) => [...prev, { question: q.question, transcript }]);
    if (idx === MOCK_HR_QUESTIONS.length - 1) {
      setPhase("done");
    } else {
      setIdx((i) => i + 1);
      setPhase("intro");
      setTranscript("");
    }
  };

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");
  const timeColor = timeLeft < 20 ? "#dc2626" : timeLeft < 45 ? "#d97706" : "var(--forge-ink3)";

  if (phase === "done") {
    return (
      <div style={{ minHeight: "100vh", background: "var(--forge-bg)", color: "var(--forge-ink)", fontFamily: "'Geist', system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 24 }}
          style={{ width: 480, background: "var(--forge-surface)", border: "1px solid var(--forge-border)", borderRadius: 24, padding: 40, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>Interview Complete!</div>
          <div style={{ fontSize: 14, color: "var(--forge-ink2)", marginBottom: 28 }}>
            You answered <strong style={{ color: "var(--forge-ink)" }}>{MOCK_HR_QUESTIONS.length}</strong> HR questions. AI feedback is being generated.
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => { setIdx(0); setPhase("intro"); setAllAnswers([]); setTranscript(""); }}
              style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "1px solid var(--forge-border2)", background: "transparent", color: "var(--forge-ink2)", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              Retry
            </button>
            <button onClick={() => navigate("/results")}
              style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "none", background: "var(--forge-ink)", color: "var(--forge-bg)", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              See Feedback
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", background: "var(--forge-bg)", color: "var(--forge-ink)", fontFamily: "'Geist', system-ui, sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* ── Top bar ── */}
      <header style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", borderBottom: "1px solid var(--forge-border)", background: "var(--forge-surface)", flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.04em" }}>
          Interview<span style={{ color: "var(--forge-accent)" }}>Forge</span>
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {MOCK_HR_QUESTIONS.map((_, i) => (
            <div key={i} style={{ width: 20, height: 4, borderRadius: 2, background: i < idx ? "var(--forge-accent)" : i === idx ? "var(--forge-ink)" : "var(--forge-border)" }} />
          ))}
        </div>

        <button onClick={() => setShowEndModal(true)}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10, border: "1px solid #dc262640", background: "#dc262610", color: "#dc2626", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
          <XCircle size={13} /> End
        </button>
      </header>

      {/* ── Main ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* LEFT — avatar + status */}
        <div style={{ width: "45%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRight: "1px solid var(--forge-border)", padding: "32px 24px", gap: 24 }}>

          <HRAvatar speaking={phase === "speaking"} listening={phase === "listening"} />

          {/* status label */}
          <AnimatePresence mode="wait">
            <motion.div key={phase}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              style={{ textAlign: "center" }}
            >
              {phase === "intro" && (
                <div style={{ fontSize: 14, color: "var(--forge-ink2)" }}>Ready for question {idx + 1} of {MOCK_HR_QUESTIONS.length}</div>
              )}
              {phase === "speaking" && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center", fontSize: 13, fontWeight: 700, color: "var(--forge-accent)", marginBottom: 10 }}>
                    <Volume2 size={14} /> Priya is asking...
                  </div>
                  <SoundWave active color="var(--forge-accent)" />
                </div>
              )}
              {phase === "listening" && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#7c3aed", marginBottom: 10 }}>
                    <Mic size={14} /> Listening to you...
                  </div>
                  <SoundWave active color="#7c3aed" />
                </div>
              )}
              {phase === "review" && (
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--forge-ink2)" }}>
                  <CheckCircle2 size={16} color="var(--forge-accent)" style={{ marginBottom: 6, display: "block", margin: "0 auto 6px" }} />
                  Answer recorded
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* timer when listening */}
          {phase === "listening" && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 160, height: 3, borderRadius: 2, background: "var(--forge-border)", overflow: "hidden" }}>
                <motion.div style={{ height: "100%", background: timeColor, borderRadius: 2 }} animate={{ width: `${(timeLeft / q.duration) * 100}%` }} transition={{ duration: 1, ease: "linear" }} />
              </div>
              <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 13, fontWeight: 700, color: timeColor }}>{mm}:{ss}</span>
            </div>
          )}

          {/* action button */}
          <AnimatePresence mode="wait">
            {phase === "intro" && (
              <motion.button key="start" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={startQuestion}
                style={{ padding: "12px 28px", borderRadius: 12, border: "none", background: "var(--forge-ink)", color: "var(--forge-bg)", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8 }}>
                Start Question <ChevronRight size={15} />
              </motion.button>
            )}
            {phase === "listening" && (
              <motion.button key="stop" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={handleStopListening}
                style={{ padding: "12px 28px", borderRadius: 12, border: "1px solid #dc262640", background: "#dc262612", color: "#dc2626", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8 }}>
                <MicOff size={15} /> Stop Recording
              </motion.button>
            )}
            {phase === "review" && (
              <motion.button key="next" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={handleNext}
                style={{ padding: "12px 28px", borderRadius: 12, border: "none", background: "var(--forge-ink)", color: "var(--forge-bg)", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8 }}>
                {idx === MOCK_HR_QUESTIONS.length - 1 ? "Finish Interview" : "Next Question"} <ChevronRight size={15} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT — question + transcript */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* question */}
          <AnimatePresence mode="wait">
            <motion.div key={idx}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              style={{ padding: "28px 28px 20px", borderBottom: "1px solid var(--forge-border)" }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--forge-ink3)", marginBottom: 10 }}>
                Question {idx + 1} of {MOCK_HR_QUESTIONS.length}
              </div>
              <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.4, color: "var(--forge-ink)", marginBottom: 14 }}>
                "{q.question}"
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "10px 14px", background: "#d9770608", border: "1px solid #d9770625", borderRadius: 10 }}>
                <span style={{ fontSize: 13, marginTop: 1 }}>💡</span>
                <span style={{ fontSize: 12, color: "#d97706", lineHeight: 1.6, fontWeight: 500 }}>{q.tip}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* transcript area */}
          <div style={{ flex: 1, padding: "20px 28px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--forge-ink3)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <Mic size={11} /> Your Answer — Live Transcript
            </div>
            <div style={{ flex: 1, background: "var(--forge-surface)", border: "1px solid var(--forge-border)", borderRadius: 14, padding: "18px 20px", overflowY: "auto", position: "relative" }}>
              {transcript ? (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{ fontSize: 15, color: "var(--forge-ink2)", lineHeight: 1.8, margin: 0 }}>
                  {transcript}
                  {phase === "listening" && (
                    <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.7, repeat: Infinity }}
                      style={{ display: "inline-block", width: 2, height: 16, background: "#7c3aed", marginLeft: 3, verticalAlign: "middle", borderRadius: 1 }} />
                  )}
                </motion.p>
              ) : (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                  {phase === "intro" && <div style={{ fontSize: 13, color: "var(--forge-ink3)" }}>Press "Start Question" to begin</div>}
                  {phase === "speaking" && <div style={{ fontSize: 13, color: "var(--forge-ink3)" }}>Listen to the question first...</div>}
                  {phase === "listening" && (
                    <>
                      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.2, repeat: Infinity }}>
                        <Mic size={28} color="#7c3aed" />
                      </motion.div>
                      <div style={{ fontSize: 13, color: "var(--forge-ink3)" }}>Speak now — transcript appears here</div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* word count */}
            {transcript && (
              <div style={{ marginTop: 8, fontSize: 11, color: "var(--forge-ink3)", textAlign: "right" }}>
                {transcript.split(/\s+/).filter(Boolean).length} words
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── End Modal ── */}
      <AnimatePresence>
        {showEndModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, backdropFilter: "blur(4px)" }}>
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              style={{ background: "var(--forge-surface)", border: "1px solid var(--forge-border)", borderRadius: 20, padding: 32, width: 360 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <AlertCircle size={18} color="#dc2626" />
                <span style={{ fontSize: 17, fontWeight: 800 }}>End Interview?</span>
              </div>
              <p style={{ fontSize: 14, color: "var(--forge-ink2)", lineHeight: 1.65, marginBottom: 24 }}>
                You've completed <strong style={{ color: "var(--forge-ink)" }}>{idx}</strong> of <strong style={{ color: "var(--forge-ink)" }}>{MOCK_HR_QUESTIONS.length}</strong> questions.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setShowEndModal(false)}
                  style={{ flex: 1, padding: "11px 0", borderRadius: 10, border: "1px solid var(--forge-border2)", background: "transparent", color: "var(--forge-ink2)", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  Keep going
                </button>
                <button onClick={() => navigate("/results")}
                  style={{ flex: 1, padding: "11px 0", borderRadius: 10, border: "none", background: "#dc2626", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  End & Results
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}