const map = {
  cyan:  "border-[#00F5FF]/40 bg-[#00F5FF]/10 text-[#00F5FF] shadow-[0_0_12px_rgba(0,245,255,0.4)]",
  amber: "border-amber-400/40 bg-amber-500/10 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.4)]",
  rose:  "border-rose-400/40 bg-rose-500/10 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.4)]",
  blue:  "border-blue-400/40 bg-blue-500/10 text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.4)]",
  slate: "border-white/15 bg-white/5 text-slate-300",
};
export default function NeonBadge({ color = "cyan", children }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${map[color]}`}>
      {children}
    </span>
  );
}
