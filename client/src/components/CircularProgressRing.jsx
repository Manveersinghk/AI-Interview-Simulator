export default function CircularProgressRing({ value = 0, size = 220, label }) {
  const r = (size - 24) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - value / 100);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} stroke="rgb(30 41 59)" strokeWidth="12" fill="none" />
        <circle cx={size/2} cy={size/2} r={r} stroke="#00F5FF" strokeWidth="12" fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={off}
          style={{ filter: "drop-shadow(0 0 12px #00F5FF)" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-5xl font-bold text-white">{value}%</span>
        {label && <span className="mt-1 text-sm text-[#00F5FF]" style={{ textShadow: "0 0 8px rgba(0,245,255,0.6)" }}>{label}</span>}
      </div>
    </div>
  );
}
