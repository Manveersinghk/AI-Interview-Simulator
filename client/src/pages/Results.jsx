import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronDown, ChevronRight, RotateCcw, LayoutDashboard,
  TrendingUp, TrendingDown, Zap, MessageSquare, Code2, Clock,
  CheckCircle2, AlertCircle, Star
} from "lucide-react";

/**
 * TODO (backend):
 * const { sessionId } = useParams();
 * useEffect(() => { api.get(`/results/${sessionId}`).then(setData); }, [sessionId]);
 */

const MOCK = {
  overall: 78,
  grade: "B+",
  label: "Great performance!",
  breakdown: [
    { key: "dsa",            label: "DSA & Algorithms",  value: 82, icon: Code2,        color: "#2563EB" },
    { key: "communication",  label: "Communication",     value: 71, icon: MessageSquare, color: "#7c3aed" },
    { key: "problemSolving", label: "Problem Solving",   value: 78, icon: Zap,           color: "#16a34a" },
    { key: "speed",          label: "Speed & Efficiency",value: 65, icon: Clock,         color: "#d97706" },
  ],
  feedback: {
    strengths: [
      "Clear articulation of brute-force approaches before optimizing.",
      "Strong handling of edge cases on array problems.",
      "Good use of complexity analysis to justify decisions.",
    ],
    improvements: [
      "Spend less time on clarifying questions — anchor on assumptions sooner.",
      "Add concrete examples when explaining trade-offs in system design.",
      "Practice tree traversal patterns; recursion structure was inconsistent.",
    ],
  },
  review: [
    { id: "q1",  title: "Two Sum",                          topic: "Arrays",        score: 88, yourAnswer: "Used a hash map keyed on the complement, single pass O(n).", idealAnswer: "Single-pass hash map storing complement → index. O(n) time, O(n) space.", aiComment: "Solid. Mention edge cases (duplicates, empty input) explicitly.", snippet: "Given an array of integers and a target, return indices of two numbers that add up to target." },
    { id: "q2",  title: "Valid Palindrome",                 topic: "Strings",       score: 92, yourAnswer: "Two pointer approach, skip non-alphanumeric, compare lowercase.", idealAnswer: "Two pointers from both ends, skip non-alnum chars, lowercase compare. O(n) time O(1) space.", aiComment: "Perfect approach. Good space complexity awareness.", snippet: "Check if a string is a palindrome ignoring non-alphanumeric characters." },
    { id: "q3",  title: "Subarray Sum K",                   topic: "Hashing",       score: 70, yourAnswer: "Prefix sum with a hash map counting frequencies.", idealAnswer: "Prefix sum + hash map: for each index store count of prefix sums, check if (prefixSum - k) exists.", aiComment: "Correct idea but explanation of the frequency map was unclear. Practice verbalising this." , snippet: "Find number of contiguous subarrays whose sum equals k." },
    { id: "q4",  title: "Level Order Traversal",            topic: "Trees",         score: 75, yourAnswer: "BFS using a queue, collect per-level values.", idealAnswer: "BFS queue. Track level size at start of each iteration, collect into sub-array.", aiComment: "Correct. Could have been more concise — avoid re-explaining BFS basics.", snippet: "Return BFS traversal of a binary tree level by level." },
    { id: "q5",  title: "Course Schedule",                  topic: "Graphs",        score: 60, yourAnswer: "DFS cycle detection on the directed graph.", idealAnswer: "Topological sort via Kahn's BFS or DFS with coloring (white/grey/black). Return order or [] on cycle.", aiComment: "Got the cycle detection right but didn't mention Kahn's or produce actual order. Practice both approaches.", snippet: "Detect a cycle in a directed graph of course prerequisites." },
    { id: "q6",  title: "Climbing Stairs",                  topic: "DP",            score: 80, yourAnswer: "Fibonacci DP — dp[i] = dp[i-1] + dp[i-2].", idealAnswer: "dp[i] = dp[i-1] + dp[i-2]. O(n) time, can be O(1) space with two variables.", aiComment: "Correct. Bonus: mention the O(1) space optimisation next time.", snippet: "Count distinct ways to climb n stairs taking 1 or 2 steps at a time." },
    { id: "q7",  title: "Conflict Story",                   topic: "Behavioural",   score: 65, yourAnswer: "Shared a story from JBLS where I disagreed on API design with a senior.", idealAnswer: "STAR format: Situation, Task, Action, Result. Emphasise listening, data-backed argument, outcome.", aiComment: "Good story choice. Didn't follow STAR strictly — result was vague. Quantify the outcome.", snippet: "Tell me about a time you disagreed with a teammate on a technical decision." },
    { id: "q8",  title: "URL Shortener Design",             topic: "System Design", score: 78, yourAnswer: "Base62 encoding on auto-increment IDs, Redis cache, Nginx load balancer.", idealAnswer: "Base62 ID encoding, consistent hashing for DB sharding, Redis LRU cache, CDN for redirects.", aiComment: "Strong fundamentals. Add more on consistency trade-offs and failure modes.", snippet: "Design a scalable URL shortening service handling 10B redirects/month." },
    { id: "q9",  title: "Longest Substring No Repeat",      topic: "Sliding Window", score: 84, yourAnswer: "Sliding window with a set, shrink from left on duplicate.", idealAnswer: "Sliding window + hash map for O(n). Shrink left pointer when duplicate found in window.", aiComment: "Correct and clean. Using a map instead of set gives you exact position — mention that.", snippet: "Find the length of the longest substring without repeating characters." },
    { id: "q10", title: "Valid Parentheses",                 topic: "Stacks",        score: 90, yourAnswer: "Stack — push opens, pop and verify closes.", idealAnswer: "Stack: push opening brackets, on closing check top matches, return stack.empty() at end.", aiComment: "Excellent. Handled all bracket types correctly and checked empty stack condition.", snippet: "Determine if a string of brackets is valid." },
  ],
};

const scoreColor = (v) => v >= 70 ? "#16a34a" : v >= 50 ? "#d97706" : "#dc2626";
const scoreBg    = (v) => v >= 70 ? "#16a34a18" : v >= 50 ? "#d9770618" : "#dc262618";
const ringColor  = (v) => v >= 60 ? "var(--forge-accent)" : v >= 40 ? "#d97706" : "#dc2626";

function CircleScore({ value }) {
  const r    = 54;
  const circ = 2 * Math.PI * r;
  const pct  = value / 100;
  const ringCol = ringColor(value);
  const numCol = scoreColor(value);

  return (
    <div style={{ position: "relative", width: 148, height: 148, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={148} height={148} style={{ position: "absolute", transform: "rotate(-90deg)" }}>
        <circle cx={74} cy={74} r={r} fill="none" stroke="var(--forge-border)" strokeWidth={8} />
        <motion.circle cx={74} cy={74} r={r} fill="none" stroke={ringCol} strokeWidth={8}
          strokeLinecap="round" strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ * (1 - pct) }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: `drop-shadow(0 0 10px ${ringCol})` }}
        />
      </svg>
      <div style={{ textAlign: "center", position: "relative" }}>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.4 }}
          style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.05em", color: numCol, fontFamily: "'Geist Mono', monospace", lineHeight: 1 }}>
          {value}%
        </motion.div>
        <div style={{ fontSize: 11, color: "var(--forge-ink3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginTop: 4 }}>
          Score
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ label, value, icon: Icon, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={15} color={color} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--forge-ink2)" }}>{label}</span>
          <span style={{ fontSize: 13, fontWeight: 800, color, fontFamily: "'Geist Mono', monospace" }}>{value}%</span>
        </div>
        <div style={{ height: 6, borderRadius: 3, background: "var(--forge-border)", overflow: "hidden" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "100%", borderRadius: 3, background: color, boxShadow: `0 0 10px ${color}60` }}
          />
        </div>
      </div>
    </div>
  );
}

function ReviewRow({ item, open, onToggle }) {
  const color = scoreColor(item.score);
  const bg    = scoreBg(item.score);

  return (
    <div style={{ border: "1px solid var(--forge-border)", borderRadius: 12, overflow: "hidden", background: "var(--forge-surface)" }}>
      <button onClick={onToggle}
        style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left", transition: "background 0.15s" }}
        onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
        onMouseLeave={(e) => e.currentTarget.style.background = "none"}
      >
        <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "var(--forge-ink3)", minWidth: 28, fontWeight: 700 }}>
          Q{item.id.slice(1)}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--forge-ink)", marginBottom: 2, letterSpacing: "-0.01em" }}>{item.title}</div>
          <div style={{ fontSize: 12, color: "var(--forge-ink3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.topic}</div>
        </div>
        <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 800, color, background: bg, border: `1px solid ${color}30`, fontFamily: "'Geist Mono', monospace" }}>
          {item.score}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={15} color="var(--forge-ink3)" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 18px 18px", borderTop: "1px solid var(--forge-border)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Question",     body: item.snippet,      accent: false },
                { label: "Your Answer",  body: item.yourAnswer,   accent: false },
                { label: "Ideal Answer", body: item.idealAnswer,  accent: true  },
                { label: "AI Feedback",  body: item.aiComment,    accent: false },
              ].map(({ label, body, accent }) => (
                <div key={label}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", color: accent ? "var(--forge-accent)" : "var(--forge-ink3)", marginBottom: 5 }}>
                    {label}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--forge-ink2)", lineHeight: 1.65 }}>{body}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Results() {
  const navigate   = useNavigate();
  const { sessionId } = useParams();
  const [openId, setOpenId] = useState(null);
  const data = MOCK;

  const avgBreakdown = Math.round(data.breakdown.reduce((a, b) => a + b.value, 0) / data.breakdown.length);

  return (
    <div style={{ minHeight: "100vh", background: "var(--forge-bg)", color: "var(--forge-ink)", fontFamily: "'Geist', system-ui, sans-serif" }}>

      {/* ── Navbar ── */}
      <nav style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", borderBottom: "1px solid var(--forge-border)", background: "var(--forge-surface)", position: "sticky", top: 0, zIndex: 30 }}>
        <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.04em" }}>
          Interview<span style={{ color: "var(--forge-accent)" }}>Forge</span>
        </span>
        <div style={{ fontSize: 12, color: "var(--forge-ink3)", fontWeight: 600 }}>
          Session Results {sessionId ? `· #${sessionId}` : ""}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/interview")}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10, border: "1px solid var(--forge-border2)", background: "transparent", color: "var(--forge-ink2)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            <RotateCcw size={12} /> Practice Again
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/dashboard")}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10, border: "none", background: "var(--forge-ink)", color: "var(--forge-bg)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            <LayoutDashboard size={12} /> Dashboard
          </motion.button>
        </div>
      </nav>

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* ── Score Hero ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: 40, padding: "36px 40px", background: "var(--forge-surface)", border: "1px solid var(--forge-border)", borderRadius: 24, marginBottom: 20, position: "relative", overflow: "hidden" }}
        >
          {/* blob deco */}
          <div style={{ position: "absolute", width: 240, height: 240, borderRadius: "50%", background: "var(--forge-accent)", opacity: 0.04, top: -60, right: -40, pointerEvents: "none" }} />

          <CircleScore value={data.overall} />

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--forge-ink3)", marginBottom: 8 }}>
              Overall Performance
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 6 }}>
              {data.label}
            </div>
            <div style={{ fontSize: 14, color: "var(--forge-ink2)", lineHeight: 1.65, marginBottom: 20, maxWidth: 380 }}>
              You scored in the top tier on DSA and Communication. Focus on Speed and System Design trade-offs for your next session.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { icon: TrendingUp,   label: "Strengths",    value: data.feedback.strengths.length,    color: "#16a34a" },
                { icon: TrendingDown, label: "To Improve",   value: data.feedback.improvements.length, color: "#d97706" },
                { icon: Star,         label: "Questions",    value: data.review.length,                color: "#2563EB" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 10, background: `${color}10`, border: `1px solid ${color}25` }}>
                  <Icon size={13} color={color} />
                  <span style={{ fontSize: 13, fontWeight: 700, color, fontFamily: "'Geist Mono', monospace" }}>{value}</span>
                  <span style={{ fontSize: 11, color: "var(--forge-ink3)", fontWeight: 600 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── Breakdown ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ padding: "28px 32px", background: "var(--forge-surface)", border: "1px solid var(--forge-border)", borderRadius: 20, marginBottom: 20 }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--forge-ink3)", marginBottom: 20 }}>
            Category Breakdown
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {data.breakdown.map((b) => (
              <ProgressBar key={b.key} label={b.label} value={b.value} icon={b.icon} color={b.color} />
            ))}
          </div>
        </motion.section>

        {/* ── AI Feedback ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          style={{ padding: "28px 32px", background: "var(--forge-surface)", border: "1px solid var(--forge-border)", borderLeft: "3px solid var(--forge-accent)", borderRadius: 20, marginBottom: 20 }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--forge-accent)", marginBottom: 20 }}>
            AI Feedback
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
                <CheckCircle2 size={14} color="#16a34a" />
                <span style={{ fontSize: 13, fontWeight: 700, color: "#16a34a" }}>Strengths</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {data.feedback.strengths.map((s) => (
                  <div key={s} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", boxShadow: "0 0 8px #16a34a80", marginTop: 6, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "var(--forge-ink2)", lineHeight: 1.65 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
                <AlertCircle size={14} color="#d97706" />
                <span style={{ fontSize: 13, fontWeight: 700, color: "#d97706" }}>Improve</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {data.feedback.improvements.map((s) => (
                  <div key={s} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#d97706", boxShadow: "0 0 8px #d9770680", marginTop: 6, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "var(--forge-ink2)", lineHeight: 1.65 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── Question Review ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--forge-ink3)", marginBottom: 14 }}>
            Question Review
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {data.review.map((item) => (
              <ReviewRow key={item.id} item={item}
                open={openId === item.id}
                onToggle={() => setOpenId(openId === item.id ? null : item.id)}
              />
            ))}
          </div>
        </motion.section>

        {/* ── CTAs ── */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 48 }}>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/interview")}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 12, border: "1px solid var(--forge-border2)", background: "transparent", color: "var(--forge-ink2)", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            <RotateCcw size={15} /> Practice Again
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/mock")}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 12, border: "none", background: "var(--forge-ink)", color: "var(--forge-bg)", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            Full Mock Interview <ChevronRight size={15} />
          </motion.button>
        </div>
      </main>
    </div>
  );
}