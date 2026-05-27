import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2, XCircle, ChevronRight, ChevronLeft,
  Clock, Target, Flame, AlertCircle, BarChart2, BookOpen
} from "lucide-react";

/**
 * TODO (backend):
 * 1. Fetch questions: api.get("/mcq/questions?topic=all&count=15")
 * 2. Submit session:  api.post("/mcq/submit", { answers, timeTaken })
 * 3. Replace MOCK_MCQ with API response
 */

const MOCK_MCQ = [
  {
    id: "m1", topic: "Data Structures", difficulty: "Easy",
    question: "What is the time complexity of accessing an element in an array by index?",
    options: ["O(log n)", "O(n)", "O(1)", "O(n²)"],
    correct: 2,
    explanation: "Array elements are stored in contiguous memory. Index-based access directly computes the memory address, making it O(1) — constant time regardless of array size.",
  },
  {
    id: "m2", topic: "Algorithms", difficulty: "Medium",
    question: "Which sorting algorithm has the best average-case time complexity?",
    options: ["Bubble Sort", "Merge Sort", "Quick Sort", "Insertion Sort"],
    correct: 1,
    explanation: "Merge Sort guarantees O(n log n) in all cases. Quick Sort is O(n log n) average but O(n²) worst case. Merge Sort's consistent performance makes it the safest choice.",
  },
  {
    id: "m3", topic: "OS", difficulty: "Medium",
    question: "What is a race condition?",
    options: [
      "When two processes run at the same speed",
      "When output depends on the non-deterministic order of events",
      "When a process waits indefinitely for a resource",
      "When CPU scheduling preempts a process",
    ],
    correct: 1,
    explanation: "A race condition occurs when the system's behavior depends on the sequence or timing of uncontrollable events like thread scheduling — leading to unpredictable bugs.",
  },
  {
    id: "m4", topic: "DBMS", difficulty: "Easy",
    question: "Which SQL command is used to remove all rows from a table without deleting the table?",
    options: ["DROP", "DELETE", "TRUNCATE", "REMOVE"],
    correct: 2,
    explanation: "TRUNCATE removes all rows and resets auto-increment but keeps the table structure. DELETE can be rolled back; TRUNCATE typically cannot. DROP removes the entire table.",
  },
  {
    id: "m5", topic: "Networks", difficulty: "Medium",
    question: "What does the OSI model's Transport Layer primarily handle?",
    options: [
      "Routing packets across networks",
      "End-to-end communication and flow control",
      "Physical transmission of bits",
      "Encryption and data formatting",
    ],
    correct: 1,
    explanation: "The Transport Layer (Layer 4) provides end-to-end communication, segmentation, flow control, and error recovery. TCP and UDP operate at this layer.",
  },
  {
    id: "m6", topic: "OOP", difficulty: "Easy",
    question: "Which OOP principle allows a child class to provide a specific implementation of a method already defined in its parent class?",
    options: ["Encapsulation", "Abstraction", "Overloading", "Overriding"],
    correct: 3,
    explanation: "Method Overriding allows a subclass to provide its own implementation of a method inherited from a superclass — enabling runtime polymorphism.",
  },
  {
    id: "m7", topic: "Data Structures", difficulty: "Hard",
    question: "In a min-heap of n elements, what is the time complexity of extracting the minimum element?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correct: 1,
    explanation: "Extraction removes the root (min) and re-heapifies by sifting down, which takes O(log n). Peeking the min is O(1) but extracting requires maintaining heap property.",
  },
  {
    id: "m8", topic: "Algorithms", difficulty: "Hard",
    question: "Which algorithmic paradigm does Dijkstra's shortest path algorithm follow?",
    options: ["Divide and Conquer", "Dynamic Programming", "Greedy", "Backtracking"],
    correct: 2,
    explanation: "Dijkstra's is a greedy algorithm — at each step it picks the unvisited node with the smallest tentative distance. It makes locally optimal choices to find a global optimum.",
  },
  {
    id: "m9", topic: "OS", difficulty: "Hard",
    question: "Which page replacement algorithm suffers from Belady's Anomaly?",
    options: ["LRU", "FIFO", "Optimal", "LFU"],
    correct: 1,
    explanation: "Belady's Anomaly is a phenomenon where increasing page frames causes more page faults with FIFO. LRU and Optimal algorithms are immune to this anomaly.",
  },
  {
    id: "m10", topic: "DBMS", difficulty: "Medium",
    question: "What does ACID stand for in database transactions?",
    options: [
      "Atomicity, Consistency, Isolation, Durability",
      "Accuracy, Concurrency, Integrity, Distribution",
      "Atomicity, Concurrency, Isolation, Durability",
      "Accuracy, Consistency, Integrity, Durability",
    ],
    correct: 0,
    explanation: "ACID properties ensure reliable database transactions: Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent transactions don't interfere), Durability (committed data persists).",
  },
  {
    id: "m11", topic: "Networks", difficulty: "Easy",
    question: "What is the purpose of the DNS protocol?",
    options: [
      "Encrypts data over the internet",
      "Translates domain names to IP addresses",
      "Routes packets between networks",
      "Manages HTTP connections",
    ],
    correct: 1,
    explanation: "DNS (Domain Name System) acts as the internet's phonebook — translating human-readable domain names like google.com into machine-readable IP addresses.",
  },
  {
    id: "m12", topic: "OOP", difficulty: "Medium",
    question: "Which design pattern ensures a class has only one instance and provides a global access point to it?",
    options: ["Factory", "Observer", "Singleton", "Strategy"],
    correct: 2,
    explanation: "The Singleton pattern restricts instantiation of a class to a single object. It's commonly used for database connections, config managers, and logging systems.",
  },
  {
    id: "m13", topic: "Data Structures", difficulty: "Medium",
    question: "What is the worst-case time complexity of searching in a Binary Search Tree (BST)?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correct: 2,
    explanation: "A skewed BST (all nodes on one side) degenerates into a linked list, making search O(n). Balanced BSTs (AVL, Red-Black) guarantee O(log n) search.",
  },
  {
    id: "m14", topic: "Algorithms", difficulty: "Medium",
    question: "What technique does Memoization use to optimise recursive solutions?",
    options: [
      "Sorting results before recursion",
      "Caching results of subproblems to avoid recomputation",
      "Breaking problem into independent subproblems",
      "Iterating bottom-up through subproblems",
    ],
    correct: 1,
    explanation: "Memoization stores (caches) the results of expensive function calls. When the same inputs occur again, the cached result is returned — a top-down DP approach.",
  },
  {
    id: "m15", topic: "Networks", difficulty: "Hard",
    question: "What is the key difference between TCP and UDP?",
    options: [
      "TCP is faster; UDP is more reliable",
      "TCP is connectionless; UDP is connection-oriented",
      "TCP guarantees delivery and order; UDP does not",
      "TCP works at network layer; UDP at transport layer",
    ],
    correct: 2,
    explanation: "TCP (Transmission Control Protocol) is connection-oriented with guaranteed delivery, ordering, and error checking. UDP (User Datagram Protocol) is faster but unreliable — used in streaming and gaming.",
  },
];

const DIFFICULTY_COLOR = {
  Easy:   { color: "#16a34a", bg: "#16a34a18" },
  Medium: { color: "#d97706", bg: "#d9770618" },
  Hard:   { color: "#dc2626", bg: "#dc262618" },
};

const TOPIC_COLOR = {
  "Data Structures": { color: "#2563EB", bg: "#2563EB18" },
  "Algorithms":      { color: "#7c3aed", bg: "#7c3aed18" },
  "OS":              { color: "#0891b2", bg: "#0891b218" },
  "DBMS":            { color: "#16a34a", bg: "#16a34a18" },
  "Networks":        { color: "#d97706", bg: "#d9770618" },
  "OOP":             { color: "#db2777", bg: "#db277718" },
};

function Badge({ color, bg, children }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, color, background: bg, border: `1px solid ${color}30` }}>
      {children}
    </span>
  );
}

function Timer({ onExpire }) {
  const [seconds, setSeconds] = useState(20);
  const pct   = seconds / 20;
  const color = seconds <= 5 ? "#dc2626" : seconds <= 10 ? "#d97706" : "var(--forge-accent)";

  useEffect(() => {
    setSeconds(20);
  }, [onExpire]);

  useEffect(() => {
    if (seconds <= 0) { onExpire?.(); return; }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 120, height: 4, borderRadius: 2, background: "var(--forge-border)", overflow: "hidden" }}>
        <motion.div
          style={{ height: "100%", borderRadius: 2, background: color, transformOrigin: "left" }}
          animate={{ scaleX: pct }}
          transition={{ duration: 1, ease: "linear" }}
        />
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color, fontFamily: "'Geist Mono', monospace", minWidth: 24 }}>{seconds}s</span>
    </div>
  );
}

export default function MCQRoom() {
  const navigate = useNavigate();
  const [idx, setIdx]             = useState(0);
  const [selected, setSelected]   = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers]     = useState({});
  const [streak, setStreak]       = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timerKey, setTimerKey]   = useState(0);

  const q       = MOCK_MCQ[idx];
  const total   = MOCK_MCQ.length;
  const diff    = DIFFICULTY_COLOR[q.difficulty];
  const topic   = TOPIC_COLOR[q.topic] || TOPIC_COLOR["Algorithms"];
  const correct = answers[q.id]?.correct;
  const score   = Object.values(answers).filter((a) => a.correct).length;

  const handleSelect = (i) => {
    if (confirmed) return;
    setSelected(i);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    const isCorrect = selected === q.correct;
    setAnswers((prev) => ({ ...prev, [q.id]: { selected, correct: isCorrect } }));
    setConfirmed(true);
    if (isCorrect) setStreak((s) => s + 1);
    else setStreak(0);
  };

  const handleNext = () => {
    if (idx === total - 1) { setShowResult(true); return; }
    setIdx((i) => i + 1);
    setSelected(null);
    setConfirmed(false);
    setTimerKey((k) => k + 1);
  };

  const handleExpire = () => {
    if (confirmed) return;
    setAnswers((prev) => ({ ...prev, [q.id]: { selected: -1, correct: false } }));
    setConfirmed(true);
    setStreak(0);
  };

  const optionStyle = (i) => {
    const base = {
      width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 12,
      padding: "14px 18px", borderRadius: 12, border: "1px solid var(--forge-border)",
      background: "transparent", cursor: confirmed ? "default" : "pointer",
      fontFamily: "inherit", fontSize: 14, color: "var(--forge-ink2)",
      transition: "all 0.18s", marginBottom: 10,
    };
    if (!confirmed) {
      if (selected === i) return { ...base, borderColor: "var(--forge-accent)", background: "var(--forge-accent)10", color: "var(--forge-ink)" };
      return base;
    }
    if (i === q.correct) return { ...base, borderColor: "#16a34a", background: "#16a34a12", color: "#16a34a" };
    if (i === selected && i !== q.correct) return { ...base, borderColor: "#dc2626", background: "#dc262612", color: "#dc2626" };
    return { ...base, opacity: 0.4 };
  };

  if (showResult) {
    const pct = Math.round((score / total) * 100);
    return (
      <div style={{ minHeight: "100vh", background: "var(--forge-bg)", color: "var(--forge-ink)", fontFamily: "'Geist', system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 24 }}
          style={{ width: 480, background: "var(--forge-surface)", border: "1px solid var(--forge-border)", borderRadius: 24, padding: 40, textAlign: "center" }}
        >
          <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: "-0.05em", color: pct >= 70 ? "var(--forge-accent)" : "#dc2626", fontFamily: "'Geist Mono', monospace", marginBottom: 4 }}>{pct}%</div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>
            {pct >= 80 ? "Excellent!" : pct >= 60 ? "Good effort!" : "Keep practising!"}
          </div>
          <div style={{ fontSize: 14, color: "var(--forge-ink2)", marginBottom: 28 }}>
            You got <strong style={{ color: "var(--forge-ink)" }}>{score}</strong> of <strong style={{ color: "var(--forge-ink)" }}>{total}</strong> correct
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 28 }}>
            {[["Correct", score, "#16a34a"], ["Wrong", total - score, "#dc2626"], ["Accuracy", `${pct}%`, "var(--forge-accent)"]].map(([l, v, c]) => (
              <div key={l} style={{ background: "var(--forge-bg)", borderRadius: 12, padding: "14px 10px", border: "1px solid var(--forge-border)" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: c, fontFamily: "'Geist Mono', monospace" }}>{v}</div>
                <div style={{ fontSize: 11, color: "var(--forge-ink3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => { setIdx(0); setAnswers({}); setSelected(null); setConfirmed(false); setStreak(0); setShowResult(false); }}
              style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "1px solid var(--forge-border2)", background: "transparent", color: "var(--forge-ink2)", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              Retry
            </button>
            <button onClick={() => navigate("/results")}
              style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "none", background: "var(--forge-ink)", color: "var(--forge-bg)", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              See Results
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--forge-bg)", color: "var(--forge-ink)", fontFamily: "'Geist', system-ui, sans-serif", display: "flex", flexDirection: "column" }}>

      {/* ── Top bar ── */}
      <header style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", borderBottom: "1px solid var(--forge-border)", background: "var(--forge-surface)", flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.04em" }}>
          Interview<span style={{ color: "var(--forge-accent)" }}>Forge</span>
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {MOCK_MCQ.map((qq, i) => (
            <div key={qq.id} style={{ width: 20, height: 4, borderRadius: 2, background: answers[qq.id] ? (answers[qq.id].correct ? "var(--forge-accent)" : "#dc2626") : i === idx ? "var(--forge-ink)" : "var(--forge-border)" }} />
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 20, background: "#d9770618", border: "1px solid #d9770640" }}>
            <Flame size={13} color="#d97706" />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#d97706" }}>{streak}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "var(--forge-ink2)" }}>
            <BarChart2 size={13} /> {score}/{total}
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 24px" }}>
        <div style={{ width: "100%", maxWidth: 680 }}>

          {/* meta */}
          <motion.div key={`meta-${idx}`} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <Badge color={diff.color} bg={diff.bg}>{q.difficulty}</Badge>
              <Badge color={topic.color} bg={topic.bg}>{q.topic}</Badge>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 12, color: "var(--forge-ink3)", fontWeight: 600 }}>{idx + 1} / {total}</span>
              <Timer key={timerKey} onExpire={handleExpire} />
            </div>
          </motion.div>

          {/* question card */}
          <AnimatePresence mode="wait">
            <motion.div key={idx}
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: "var(--forge-surface)", border: "1px solid var(--forge-border)", borderRadius: 20, padding: "28px 28px 24px" }}
            >
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.45, marginBottom: 24, color: "var(--forge-ink)" }}>
                {q.question}
              </div>

              {/* options */}
              <div>
                {q.options.map((opt, i) => (
                  <motion.button key={i} whileHover={!confirmed ? { x: 4 } : {}} onClick={() => handleSelect(i)} style={optionStyle(i)}>
                    <span style={{ width: 26, height: 26, borderRadius: "50%", border: `1px solid ${confirmed && i === q.correct ? "#16a34a" : confirmed && i === selected && i !== q.correct ? "#dc2626" : selected === i && !confirmed ? "var(--forge-accent)" : "var(--forge-border)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0, color: confirmed && i === q.correct ? "#16a34a" : confirmed && i === selected && i !== q.correct ? "#dc2626" : selected === i && !confirmed ? "var(--forge-accent)" : "var(--forge-ink3)", fontFamily: "'Geist Mono', monospace" }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                    {confirmed && i === q.correct && <CheckCircle2 size={16} color="#16a34a" style={{ marginLeft: "auto" }} />}
                    {confirmed && i === selected && i !== q.correct && <XCircle size={16} color="#dc2626" style={{ marginLeft: "auto" }} />}
                  </motion.button>
                ))}
              </div>

              {/* explanation */}
              <AnimatePresence>
                {confirmed && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: "hidden" }}>
                    <div style={{ marginTop: 16, padding: "14px 16px", borderRadius: 12, background: "var(--forge-bg)", border: "1px solid var(--forge-border)", borderLeft: `3px solid ${answers[q.id]?.correct ? "var(--forge-accent)" : "#dc2626"}` }}>
                      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--forge-ink3)", marginBottom: 6 }}>Explanation</div>
                      <div style={{ fontSize: 13, color: "var(--forge-ink2)", lineHeight: 1.65 }}>{q.explanation}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          {/* actions */}
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            {!confirmed ? (
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={handleConfirm}
                disabled={selected === null}
                style={{ flex: 1, padding: "13px 0", borderRadius: 12, border: "none", background: selected !== null ? "var(--forge-ink)" : "var(--forge-border)", color: selected !== null ? "var(--forge-bg)" : "var(--forge-ink3)", fontSize: 14, fontWeight: 700, cursor: selected !== null ? "pointer" : "not-allowed", fontFamily: "inherit", transition: "all 0.18s" }}>
                Confirm Answer
              </motion.button>
            ) : (
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={handleNext}
                style={{ flex: 1, padding: "13px 0", borderRadius: 12, border: "none", background: "var(--forge-ink)", color: "var(--forge-bg)", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {idx === total - 1 ? "See Results" : "Next Question"} <ChevronRight size={16} />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}