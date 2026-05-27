import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Mic, MicOff, Code, FileText, ChevronRight, ChevronLeft,
  Lightbulb, Flame, Clock, CheckCircle2, SkipForward,
  XCircle, Send, ChevronDown, ChevronUp, Terminal,
  BookOpen, Target, Zap, BarChart2, AlertCircle, X
} from "lucide-react";

/**
 * TODO (backend):
 *  1. Replace MOCK_QUESTIONS with: api.post("/sessions", { questionCount: 10 })
 *  2. Submit answer  -> api.post(`/sessions/${id}/answer`, { questionId, answer, mode })
 *  3. Skip           -> api.post(`/sessions/${id}/skip`,   { questionId })
 *  4. End session    -> api.post(`/sessions/${id}/end`)   then navigate(`/results/${id}`)
 *  5. Voice mode     -> Web Speech API or /voice endpoint
 */

const MOCK_QUESTIONS = [
  {
    id: "q1", topic: "Arrays", difficulty: "Easy", tag: "Warm-up",
    title: "Two Sum",
    prompt: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] = 2 + 7 = 9" },
      { input: "nums = [3,2,4], target = 6",     output: "[1,2]", explanation: "nums[1] + nums[2] = 2 + 4 = 6" },
    ],
    constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "Only one valid answer exists."],
    hints: ["Try using a hash map to store complements.", "For each num, check if (target - num) exists in your map.", "O(n) time is achievable in a single pass."],
    status: "answered",
  },
  {
    id: "q2", topic: "Strings", difficulty: "Easy", tag: "Warm-up",
    title: "Valid Palindrome",
    prompt: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.",
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: "true", explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"',                    output: "false", explanation: '"raceacar" is not a palindrome.' },
    ],
    constraints: ["1 ≤ s.length ≤ 2×10⁵", "s consists only of printable ASCII characters."],
    hints: ["Use two pointers from both ends.", "Skip non-alphanumeric characters.", "Compare lowercased characters."],
    status: "answered",
  },
  {
    id: "q3", topic: "Sliding Window", difficulty: "Medium", tag: "Core DSA",
    title: "Longest Substring Without Repeating Characters",
    prompt: "Given a string `s`, find the length of the longest substring without repeating characters.\n\nA substring is a contiguous non-empty sequence of characters within a string.",
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with length 3.' },
      { input: 's = "bbbbb"',    output: "1", explanation: 'The answer is "b", with length 1.' },
    ],
    constraints: ["0 ≤ s.length ≤ 5×10⁴", "s consists of English letters, digits, symbols and spaces."],
    hints: ["Use a sliding window approach.", "Maintain a set of characters in the current window.", "When a duplicate is found, shrink from the left."],
    status: "pending",
  },
  {
    id: "q4", topic: "Binary Search", difficulty: "Medium", tag: "Core DSA",
    title: "Search in Rotated Sorted Array",
    prompt: "There is an integer array `nums` sorted in ascending order (with distinct values). Prior to being passed to your function, `nums` is possibly rotated at an unknown pivot index.\n\nGiven the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not.",
    examples: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4", explanation: "0 is at index 4." },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1", explanation: "3 is not in the array." },
    ],
    constraints: ["1 ≤ nums.length ≤ 5000", "-10⁴ ≤ nums[i], target ≤ 10⁴", "All values of nums are unique."],
    hints: ["Standard binary search won't work directly.", "One half is always sorted — figure out which one.", "Check if target lies in the sorted half."],
    status: "pending",
  },
  {
    id: "q5", topic: "Trees", difficulty: "Medium", tag: "Core DSA",
    title: "Binary Tree Level Order Traversal",
    prompt: "Given the `root` of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]", explanation: "3 levels of the tree." },
      { input: "root = [1]",                      output: "[[1]]",              explanation: "Single node." },
    ],
    constraints: ["The number of nodes is in the range [0, 2000].", "-1000 ≤ Node.val ≤ 1000"],
    hints: ["Use a queue (BFS).", "Track level size using queue.length at start of each iteration.", "Collect values per level into a sub-array."],
    status: "skipped",
  },
  {
    id: "q6", topic: "Dynamic Programming", difficulty: "Medium", tag: "Core DSA",
    title: "Coin Change",
    prompt: "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount cannot be made up, return `-1`.",
    examples: [
      { input: "coins = [1,5,11], amount = 11", output: "1",  explanation: "11 = 11." },
      { input: "coins = [2], amount = 3",        output: "-1", explanation: "Cannot make 3 with coins of denomination 2." },
    ],
    constraints: ["1 ≤ coins.length ≤ 12", "1 ≤ coins[i] ≤ 2³¹−1", "0 ≤ amount ≤ 10⁴"],
    hints: ["Classic bottom-up DP.", "dp[i] = min coins to make amount i.", "Initialise dp[0]=0, rest = Infinity."],
    status: "pending",
  },
  {
    id: "q7", topic: "Graphs", difficulty: "Hard", tag: "Advanced",
    title: "Course Schedule II",
    prompt: "There are `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [aᵢ, bᵢ]` indicates you must take course `bᵢ` first.\n\nReturn the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible, return an empty array.",
    examples: [
      { input: "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]", output: "[0,2,1,3]", explanation: "One valid ordering." },
    ],
    constraints: ["1 ≤ numCourses ≤ 2000", "0 ≤ prerequisites.length ≤ numCourses*(numCourses-1)"],
    hints: ["Topological sort using Kahn's algorithm (BFS) or DFS.", "Cycle detection is key — if cycle exists return [].", "Track in-degree of each node."],
    status: "pending",
  },
  {
    id: "q8", topic: "System Design", difficulty: "Hard", tag: "Design",
    title: "Design a URL Shortener",
    prompt: "Design a URL shortening service like bit.ly.\n\nThe system should:\n• Accept a long URL and return a short 6–8 char alias.\n• Redirect short URLs to original URLs with < 10ms latency.\n• Handle 100M URLs and 10B redirects/month.\n• Ensure no collisions.\n\nDiscuss: API design, DB schema, hashing strategy, caching, scalability.",
    examples: [
      { input: "POST /shorten { url: 'https://very-long-url.com/path' }", output: '{ shortUrl: "bit.ly/xK9mP2" }', explanation: "Base62 encoded ID." },
    ],
    constraints: ["Write:Read ratio ≈ 1:100", "Availability > 99.99%", "Short URL length ≤ 8 chars"],
    hints: ["Use auto-increment ID + Base62 encoding.", "Cache hot URLs in Redis with LRU eviction.", "Use consistent hashing for horizontal DB scaling."],
    status: "pending",
  },
  {
    id: "q9", topic: "OS Concepts", difficulty: "Medium", tag: "Core CS",
    title: "Explain Deadlock & Prevention",
    prompt: "Explain what a deadlock is in operating systems.\n\nCover:\n1. The four Coffman conditions for deadlock.\n2. Detection vs Prevention vs Avoidance strategies.\n3. The Banker's Algorithm — how it works and its limitations.\n4. A real-world example from your experience or knowledge.",
    examples: [
      { input: "Process A holds Resource 1, waits for Resource 2.", output: "Deadlock if Process B holds Resource 2 and waits for Resource 1.", explanation: "Circular wait condition." },
    ],
    constraints: ["Answer should be structured.", "Mention at least 2 prevention strategies.", "Include trade-offs."],
    hints: ["Remember: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.", "Avoidance (Banker's) vs Prevention vs Detection+Recovery.", "Think about DB locks as a real-world parallel."],
    status: "pending",
  },
  {
    id: "q10", topic: "Behavioural", difficulty: "Easy", tag: "HR Round",
    title: "Conflict Resolution Story",
    prompt: "Tell me about a time you disagreed with a teammate or senior on a technical decision.\n\nUse the STAR format:\n• Situation — what was the context?\n• Task — what was your role?\n• Action — what specifically did you do?\n• Result — what was the outcome?\n\nBonus: What would you do differently?",
    examples: [
      { input: "Disagreed on REST vs GraphQL for a project", output: "Structured STAR answer covering the decision, communication, and outcome.", explanation: "Shows maturity and communication skill." },
    ],
    constraints: ["Keep answer under 3 minutes if spoken.", "Be specific — avoid generic answers.", "Show self-awareness in the 'what I'd do differently' part."],
    hints: ["Pick a real example from JBLS or college projects.", "Focus on the process, not just the outcome.", "Show you can disagree respectfully and still deliver."],
    status: "pending",
  },
];

const DIFFICULTY_COLOR = {
  Easy:   { color: "#16a34a", bg: "#16a34a18" },
  Medium: { color: "#d97706", bg: "#d9770618" },
  Hard:   { color: "#dc2626", bg: "#dc262618" },
};

const TAG_COLOR = {
  "Warm-up":  { color: "#2563EB", bg: "#2563EB18" },
  "Core DSA": { color: "#16a34a", bg: "#16a34a18" },
  "Advanced": { color: "#7c3aed", bg: "#7c3aed18" },
  "Design":   { color: "#0891b2", bg: "#0891b218" },
  "Core CS":  { color: "#d97706", bg: "#d9770618" },
  "HR Round": { color: "#db2777", bg: "#db277718" },
};

const STATUS_STYLE = {
  answered: { dot: "#16a34a", glow: "0 0 6px #16a34a" },
  pending:  { dot: "#334155", glow: "none" },
  skipped:  { dot: "#d97706", glow: "0 0 6px #d97706" },
};

// ── sub-components ─────────────────────────────────────────────────────────

function Badge({ color, bg, children, size = 12 }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "3px 10px", borderRadius: 20,
      fontSize: size, fontWeight: 700, letterSpacing: "0.02em",
      color, background: bg, border: `1px solid ${color}30`,
      fontFamily: "'Geist', system-ui, sans-serif",
    }}>
      {children}
    </span>
  );
}

function Timer({ seconds: initial }) {
  const [seconds, setSeconds] = useState(initial);
  const pct = seconds / initial;
  const color = seconds < 30 ? "#dc2626" : seconds < 60 ? "#d97706" : "var(--forge-accent)";
  const r = 28, circ = 2 * Math.PI * r;

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width={68} height={68} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={34} cy={34} r={r} fill="none" stroke="#1e293b" strokeWidth={4} />
        <circle cx={34} cy={34} r={r} fill="none" stroke={color} strokeWidth={4}
          strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s linear, stroke 0.5s", filter: `drop-shadow(0 0 6px ${color})` }} />
      </svg>
      <div>
        <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 22, fontWeight: 700, color, lineHeight: 1 }}>
          {mm}:{ss}
        </div>
        <div style={{ fontSize: 11, color: "var(--forge-ink3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>
          remaining
        </div>
      </div>
    </div>
  );
}

function HintsPanel({ hints, visible, onClose }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.22 }}
          style={{
            position: "absolute", bottom: 72, left: 16, right: 16, zIndex: 40,
            background: "var(--forge-surface)", border: "1px solid var(--forge-border)",
            borderRadius: 16, padding: "20px 20px 16px", boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, color: "#d97706" }}>
              <Lightbulb size={15} /> Hints
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--forge-ink3)", display: "flex" }}>
              <X size={15} />
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {hints.map((h, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ minWidth: 20, height: 20, borderRadius: "50%", background: "#d9770618", border: "1px solid #d9770640", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#d97706", marginTop: 1 }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: 13, color: "var(--forge-ink2)", lineHeight: 1.6 }}>{h}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function QuestionPanel({ q, idx, total }) {
  const [showHints, setShowHints] = useState(false);
  const [openExample, setOpenExample] = useState(0);
  const diff = DIFFICULTY_COLOR[q.difficulty];
  const tag  = TAG_COLOR[q.tag] || TAG_COLOR["Core DSA"];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
      {/* header */}
      <div style={{ padding: "20px 24px 0" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          <Badge color={diff.color} bg={diff.bg}>{q.difficulty}</Badge>
          <Badge color={tag.color}  bg={tag.bg}>{q.tag}</Badge>
          <Badge color="var(--forge-ink3)" bg="var(--forge-surface)">{q.topic}</Badge>
        </div>
        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--forge-ink3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
          Question {idx + 1} / {total}
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.25, color: "var(--forge-ink)", marginBottom: 0 }}>
          {q.title}
        </h2>
      </div>

      {/* scrollable body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px 0" }}>
        {/* prompt */}
        <div style={{ fontSize: 14, color: "var(--forge-ink2)", lineHeight: 1.75, marginBottom: 20, whiteSpace: "pre-line" }}>
          {q.prompt}
        </div>

        {/* examples */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--forge-ink3)", marginBottom: 10 }}>
            Examples
          </div>
          {q.examples.map((ex, i) => (
            <div key={i} style={{ marginBottom: 8, borderRadius: 12, border: "1px solid var(--forge-border)", overflow: "hidden" }}>
              <button
                onClick={() => setOpenExample(openExample === i ? -1 : i)}
                style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "var(--forge-surface)", border: "none", cursor: "pointer", fontFamily: "inherit" }}
              >
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--forge-ink2)" }}>Example {i + 1}</span>
                {openExample === i ? <ChevronUp size={13} color="var(--forge-ink3)" /> : <ChevronDown size={13} color="var(--forge-ink3)" />}
              </button>
              <AnimatePresence>
                {openExample === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                    style={{ overflow: "hidden" }}>
                    <div style={{ padding: "12px 14px", background: "var(--forge-bg)", fontSize: 12, fontFamily: "'Geist Mono', monospace", lineHeight: 1.8 }}>
                      <div><span style={{ color: "var(--forge-ink3)" }}>Input: </span><span style={{ color: "var(--forge-ink)" }}>{ex.input}</span></div>
                      <div><span style={{ color: "var(--forge-ink3)" }}>Output: </span><span style={{ color: "var(--forge-accent)" }}>{ex.output}</span></div>
                      {ex.explanation && (
                        <div style={{ marginTop: 6, color: "var(--forge-ink3)", fontFamily: "'Geist', system-ui", fontSize: 11 }}>
                          💡 {ex.explanation}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* constraints */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--forge-ink3)", marginBottom: 10 }}>
            Constraints
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
            {q.constraints.map((c, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "var(--forge-ink2)", fontFamily: "'Geist Mono', monospace" }}>
                <span style={{ color: "var(--forge-accent)", marginTop: 1, flexShrink: 0 }}>•</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* timer + actions */}
      <div style={{ padding: "16px 24px 20px", borderTop: "1px solid var(--forge-border)", display: "flex", flexDirection: "column", gap: 14, position: "relative" }}>
        <Timer seconds={180} />
        <HintsPanel hints={q.hints} visible={showHints} onClose={() => setShowHints(false)} />
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setShowHints((s) => !s)}
            style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              padding: "9px 0", borderRadius: 10, border: "1px solid #d9770640",
              background: showHints ? "#d9770618" : "transparent",
              color: "#d97706", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
              transition: "all 0.18s",
            }}
          >
            <Lightbulb size={14} /> Hints
          </button>
          <button
            style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              padding: "9px 0", borderRadius: 10, border: "1px solid var(--forge-border2)",
              background: "transparent", color: "var(--forge-ink2)", fontSize: 13, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit", transition: "all 0.18s",
            }}
          >
            <SkipForward size={14} /> Skip
          </button>
        </div>
      </div>
    </div>
  );
}

// ── main ───────────────────────────────────────────────────────────────────

export default function InterviewRoom() {
  const navigate     = useNavigate();
  const [activeIdx, setActiveIdx]     = useState(2);
  const [mode, setMode]               = useState("code");
  const [answer, setAnswer]           = useState("");
  const [recording, setRecording]     = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [streak, setStreak]           = useState(2);
  const [submitted, setSubmitted]     = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const textareaRef  = useRef(null);

  const q         = MOCK_QUESTIONS[activeIdx];
  const answered  = MOCK_QUESTIONS.filter((x) => x.status === "answered").length;
  const lineCount = Math.max(answer.split("\n").length, 18);

  const handleSubmit = () => {
    setSubmitted(true);
    setStreak((s) => s + 1);
    setTimeout(() => {
      setSubmitted(false);
      if (activeIdx < MOCK_QUESTIONS.length - 1) setActiveIdx((i) => i + 1);
    }, 1200);
    // TODO: api call
  };

  const handleEnd = () => {
    if (props.onComplete) props.onComplete();
    navigate("/results");
  };

  return (
    <div style={{ height: "100vh", background: "var(--forge-bg)", color: "var(--forge-ink)", fontFamily: "'Geist', system-ui, sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* ── Top bar ── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}
        style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", borderBottom: "1px solid var(--forge-border)", background: "var(--forge-surface)", flexShrink: 0, zIndex: 30 }}
      >
        {/* left */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.04em" }}>
            Interview<span style={{ color: "var(--forge-accent)" }}>Forge</span>
          </span>
          <div style={{ width: 1, height: 20, background: "var(--forge-border)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--forge-ink2)", fontWeight: 600 }}>
            <Target size={13} color="var(--forge-accent)" />
            Placement Mock — Round 1
          </div>
        </div>

        {/* center — progress */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", gap: 3 }}>
            {MOCK_QUESTIONS.map((qq, i) => {
              const s = i === activeIdx ? "active" : qq.status;
              return (
                <motion.div key={qq.id} whileHover={{ scaleY: 1.4 }}
                  onClick={() => setActiveIdx(i)}
                  style={{
                    width: 18, height: 4, borderRadius: 2, cursor: "pointer",
                    background: s === "answered" ? "var(--forge-accent)"
                      : s === "active"   ? "var(--forge-ink)"
                      : s === "skipped"  ? "#d97706"
                      : "var(--forge-border)",
                    transition: "background 0.2s",
                  }}
                />
              );
            })}
          </div>
          <span style={{ fontSize: 11, color: "var(--forge-ink3)", fontWeight: 600 }}>
            {answered}/{MOCK_QUESTIONS.length}
          </span>
        </div>

        {/* right */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* streak */}
          <motion.div
            animate={submitted ? { scale: [1, 1.3, 1] } : {}}
            style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 20, background: "#d9770618", border: "1px solid #d9770640" }}
          >
            <Flame size={13} color="#d97706" />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#d97706" }}>{streak}</span>
          </motion.div>

          <button
            onClick={() => setShowEndModal(true)}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10, border: "1px solid #dc262640", background: "#dc262610", color: "#dc2626", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all 0.18s" }}
          >
            <XCircle size={13} /> End Session
          </button>
        </div>
      </motion.header>

      {/* ── Body ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* LEFT — Question panel (38%) */}
        <motion.aside
          initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "38%", borderRight: "1px solid var(--forge-border)", display: "flex", flexDirection: "column", overflow: "hidden" }}
        >
          <AnimatePresence mode="wait">
            <motion.div key={q.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              style={{ height: "100%" }}
            >
              <QuestionPanel q={q} idx={activeIdx} total={MOCK_QUESTIONS.length} />
            </motion.div>
          </AnimatePresence>
        </motion.aside>

        {/* RIGHT — IDE (62%) */}
        <motion.main
          initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}
        >
          {/* IDE top bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", borderBottom: "1px solid var(--forge-border)", background: "var(--forge-surface)", height: 44, flexShrink: 0 }}>
            <div style={{ display: "flex" }}>
              {[["code", "Code", Code], ["text", "Text", FileText]].map(([k, label, Icon]) => (
                <button key={k} onClick={() => setMode(k)}
                  style={{ position: "relative", display: "flex", alignItems: "center", gap: 6, padding: "0 16px", height: 44, border: "none", background: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600, color: mode === k ? "var(--forge-ink)" : "var(--forge-ink3)", transition: "color 0.15s" }}
                >
                  <Icon size={14} />
                  {label}
                  {mode === k && (
                    <motion.span layoutId="tab-indicator"
                      style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "var(--forge-accent)", borderRadius: "2px 2px 0 0" }}
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#dc2626" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#d97706" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a" }} />
              <div style={{ width: 1, height: 16, background: "var(--forge-border)", margin: "0 4px" }} />
              <span style={{ fontSize: 11, color: "var(--forge-ink3)", fontFamily: "'Geist Mono', monospace" }}>solution.{mode === "code" ? "cpp" : "txt"}</span>
            </div>
          </div>

          {/* Editor area */}
          <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
            <AnimatePresence mode="wait">
              {mode === "code" ? (
                <motion.div key="code"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: "flex", height: "100%", background: "#080810" }}
                >
                  {/* line numbers */}
                  <div style={{ padding: "16px 0", background: "#0a0a14", borderRight: "1px solid var(--forge-border)", userSelect: "none", minWidth: 48, textAlign: "right" }}>
                    {Array.from({ length: lineCount }, (_, i) => (
                      <div key={i} style={{ padding: "0 12px 0 8px", lineHeight: "24px", fontSize: 12, fontFamily: "'Geist Mono', monospace", color: "#334155" }}>
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  {/* code area */}
                  <textarea
                    ref={textareaRef}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder={"// Write your solution in C++\n#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}"}
                    spellCheck={false}
                    style={{ flex: 1, background: "transparent", border: "none", outline: "none", resize: "none", padding: "16px 20px", fontSize: 13, lineHeight: "24px", fontFamily: "'Geist Mono', monospace", color: "#e2e8f0", caretColor: "var(--forge-accent)" }}
                  />
                </motion.div>
              ) : (
                <motion.textarea key="text"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer in detail..."
                  style={{ width: "100%", height: "100%", background: "var(--forge-bg)", border: "none", outline: "none", resize: "none", padding: "24px 28px", fontSize: 15, lineHeight: 1.8, fontFamily: "'Geist', system-ui, sans-serif", color: "var(--forge-ink2)", caretColor: "var(--forge-accent)", boxSizing: "border-box" }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Bottom bar */}
          <div style={{ height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", borderTop: "1px solid var(--forge-border)", background: "var(--forge-surface)", flexShrink: 0 }}>
            {/* voice */}
            <motion.button
              onClick={() => setRecording((r) => !r)}
              animate={recording ? { scale: [1, 1.1, 1] } : {}}
              transition={recording ? { repeat: Infinity, duration: 1.4 } : {}}
              style={{ width: 38, height: 38, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${recording ? "#dc2626" : "var(--forge-accent)"}40`, background: recording ? "#dc262612" : "var(--forge-accent)10", color: recording ? "#dc2626" : "var(--forge-accent)", cursor: "pointer", transition: "all 0.2s" }}
            >
              {recording ? <MicOff size={15} /> : <Mic size={15} />}
            </motion.button>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* submit */}
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="done"
                    initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 20px", borderRadius: 10, background: "var(--forge-accent)18", border: "1px solid var(--forge-accent)40", color: "var(--forge-accent)", fontSize: 13, fontWeight: 700 }}
                  >
                    <CheckCircle2 size={15} /> Submitted!
                  </motion.div>
                ) : (
                  <motion.button key="submit"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={handleSubmit}
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 20px", borderRadius: 10, background: "var(--forge-ink)", border: "none", color: "var(--forge-bg)", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                  >
                    <Send size={13} /> Submit Answer
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.main>

        {/* RIGHT SIDEBAR — question list */}
        <motion.aside
          animate={{ width: sidebarOpen ? 220 : 44 }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
          style={{ borderLeft: "1px solid var(--forge-border)", background: "var(--forge-surface)", display: "flex", flexDirection: "column", overflow: "hidden", flexShrink: 0 }}
        >
          {/* toggle */}
          <button
            onClick={() => setSidebarOpen((s) => !s)}
            style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", borderBottom: "1px solid var(--forge-border)", cursor: "pointer", color: "var(--forge-ink3)", transition: "color 0.15s", flexShrink: 0 }}
          >
            {sidebarOpen ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>

          {sidebarOpen && (
            <div style={{ overflowY: "auto", flex: 1, padding: "8px" }}>
              {/* legend */}
              <div style={{ padding: "8px 6px 10px", display: "flex", gap: 10, borderBottom: "1px solid var(--forge-border)", marginBottom: 6 }}>
                {[["#16a34a", "Done"], ["#334155", "Pending"], ["#d97706", "Skipped"]].map(([c, l]) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
                    <span style={{ fontSize: 9, color: "var(--forge-ink3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{l}</span>
                  </div>
                ))}
              </div>
              {MOCK_QUESTIONS.map((qq, i) => {
                const st = STATUS_STYLE[qq.status];
                const active = i === activeIdx;
                return (
                  <motion.button key={qq.id}
                    whileHover={{ x: 2 }}
                    onClick={() => setActiveIdx(i)}
                    style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 8, padding: "8px 8px", borderRadius: 8, border: "none", borderLeft: `2px solid ${active ? "var(--forge-accent)" : "transparent"}`, background: active ? "var(--forge-bg)" : "transparent", cursor: "pointer", fontFamily: "inherit", marginBottom: 2, transition: "all 0.15s" }}
                  >
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: st.dot, boxShadow: st.glow, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, fontWeight: 700, color: "var(--forge-ink3)", minWidth: 22 }}>Q{i + 1}</span>
                    <span style={{ fontSize: 11, color: active ? "var(--forge-ink)" : "var(--forge-ink2)", fontWeight: active ? 700 : 400, truncate: true, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{qq.title}</span>
                  </motion.button>
                );
              })}
            </div>
          )}
        </motion.aside>
      </div>

      {/* ── End Session Modal ── */}
      <AnimatePresence>
        {showEndModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, backdropFilter: "blur(4px)" }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              style={{ background: "var(--forge-surface)", border: "1px solid var(--forge-border)", borderRadius: 20, padding: "32px", width: 380, boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <AlertCircle size={18} color="#dc2626" />
                <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.03em" }}>End Session?</span>
              </div>
              <p style={{ fontSize: 14, color: "var(--forge-ink2)", lineHeight: 1.65, marginBottom: 24 }}>
                You've answered <strong style={{ color: "var(--forge-ink)" }}>{answered}</strong> of <strong style={{ color: "var(--forge-ink)" }}>{MOCK_QUESTIONS.length}</strong> questions. Ending now will submit your session and take you to results.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => setShowEndModal(false)}
                  style={{ flex: 1, padding: "11px 0", borderRadius: 10, border: "1px solid var(--forge-border2)", background: "transparent", color: "var(--forge-ink2)", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                >
                  Keep going
                </button>
                <button
                  onClick={handleEnd}
                  style={{ flex: 1, padding: "11px 0", borderRadius: 10, border: "none", background: "#dc2626", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                >
                  End & See Results
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}