import { TrendingUp } from "lucide-react";
export default function StatCard({ label, value, delta }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0F0F1A]/80 backdrop-blur-md p-5 shadow-[0_0_25px_rgba(0,245,255,0.08)] hover:shadow-[0_0_25px_rgba(0,245,255,0.25)] transition">
      <p className="text-[11px] uppercase tracking-widest text-slate-400">{label}</p>
      <div className="mt-2 flex items-end justify-between">
        <p className="text-3xl font-semibold text-white">{value}</p>
        {delta && (
          <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-medium">
            <TrendingUp className="w-3 h-3" /> {delta}
          </span>
        )}
      </div>
    </div>
  );
}
