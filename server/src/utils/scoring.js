/**
 * Plug your AI provider here.
 * Default: deterministic mock scoring so the app runs offline without an API key.
 *
 * Suggested integrations (offline-friendly first):
 *   - Ollama (local):    http://localhost:11434/api/generate
 *   - OpenAI:            https://api.openai.com/v1/chat/completions
 *   - Anthropic:         https://api.anthropic.com/v1/messages
 *
 * Return shape MUST be: { score: 0-100, comment: string }
 */
export async function scoreAnswer({ question, answer }) {
  if (!answer || !answer.trim()) return { score: 0, comment: "No answer provided." };

  // Mock heuristic — length + keyword match.
  const len = Math.min(answer.length, 800);
  const lengthScore = Math.round((len / 800) * 60);
  const keywords = (question.idealAnswer || "")
    .toLowerCase()
    .split(/\W+/)
    .filter((w) => w.length > 4);
  const lower = answer.toLowerCase();
  const hits = keywords.filter((k) => lower.includes(k)).length;
  const keywordScore = Math.min(40, hits * 5);
  const score = Math.min(100, lengthScore + keywordScore);

  return {
    score,
    comment:
      score >= 80
        ? "Strong, clear answer that touches the key points."
        : score >= 60
        ? "Good attempt — tighten the explanation and add a concrete example."
        : "Needs more depth. Cover the core idea and walk through complexity.",
  };
}

export function aggregateBreakdown(answers) {
  // crude bucketing by question category — refine offline.
  const buckets = { DSA: [], Behavioural: [], "System Design": [], "CS Fundamentals": [] };
  for (const a of answers) {
    const cat = a.question?.category || "DSA";
    if (buckets[cat]) buckets[cat].push(a.score || 0);
  }
  const avg = (arr) => (arr.length ? Math.round(arr.reduce((s, n) => s + n, 0) / arr.length) : 0);
  return {
    dsa: avg(buckets.DSA),
    communication: avg(buckets.Behavioural),
    problemSolving: avg([...buckets.DSA, ...buckets["System Design"]]),
    speed: avg(answers.map((a) => a.score || 0)), // TODO: factor real time-to-answer
  };
}

export function buildFeedback(breakdown) {
  const strengths = [];
  const improvements = [];
  if (breakdown.dsa >= 75) strengths.push("Solid grasp of data structures and algorithm patterns.");
  if (breakdown.communication >= 75) strengths.push("Clear, well-structured spoken explanations.");
  if (breakdown.problemSolving >= 75) strengths.push("Strong problem decomposition.");
  if (breakdown.speed >= 75) strengths.push("Efficient pacing across questions.");

  if (breakdown.dsa < 70) improvements.push("Drill medium-difficulty array and tree problems.");
  if (breakdown.communication < 70) improvements.push("Narrate trade-offs out loud while solving.");
  if (breakdown.problemSolving < 70) improvements.push("Practice stating the brute-force approach before optimizing.");
  if (breakdown.speed < 70) improvements.push("Set a 3-minute timer per question to build pace.");

  while (strengths.length < 3) strengths.push("Consistent engagement across the full session.");
  while (improvements.length < 3) improvements.push("Review one new pattern per day to broaden coverage.");

  return { strengths: strengths.slice(0, 3), improvements: improvements.slice(0, 3) };
}
