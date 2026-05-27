export default function ProgressBar({ label, value }) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-sm text-slate-200">{label}</span>
        <span className="text-sm text-[#00F5FF] font-medium">{value}%</span>
      </div>
      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#00F5FF] to-[#0088ff] rounded-full shadow-[0_0_10px_rgba(0,245,255,0.6)] transition-all"
             style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
