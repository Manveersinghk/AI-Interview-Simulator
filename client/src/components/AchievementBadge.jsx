export default function AchievementBadge({ icon: Icon, label, earned }) {
  return (
    <div className={`group relative rounded-xl border p-5 flex flex-col items-center text-center transition
      ${earned
        ? "border-[#00F5FF]/40 bg-[#00F5FF]/5 shadow-[0_0_20px_rgba(0,245,255,0.25)] hover:shadow-[0_0_30px_rgba(0,245,255,0.5)]"
        : "border-white/10 bg-[#0F0F1A]/60 opacity-60 grayscale"}`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3
        ${earned ? "bg-[#00F5FF]/15 text-[#00F5FF]" : "bg-white/5 text-slate-500"}`}>
        <Icon className="w-6 h-6" />
      </div>
      <p className={`text-sm font-semibold ${earned ? "text-white" : "text-slate-400"}`}>{label}</p>
    </div>
  );
}
