import { useEffect, useState } from "react";

export default function CircularTimer({ seconds = 180, onEnd }) {
  const [t, setT] = useState(seconds);
  useEffect(() => { setT(seconds); }, [seconds]);
  useEffect(() => {
    if (t <= 0) { onEnd?.(); return; }
    const id = setTimeout(() => setT((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [t, onEnd]);

  const r = 56, c = 2 * Math.PI * r;
  const off = c * (1 - t / seconds);
  const m = Math.floor(t / 60), s = t % 60;

  return (
    <div className="relative w-36 h-36">
      <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
        <circle cx="70" cy="70" r={r} stroke="rgb(51 65 85)" strokeWidth="8" fill="none" />
        <circle cx="70" cy="70" r={r} stroke="#00F5FF" strokeWidth="8" fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={off}
          style={{ filter: "drop-shadow(0 0 6px #00F5FF)" }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-2xl font-semibold text-[#00F5FF] tabular-nums">
          {String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
