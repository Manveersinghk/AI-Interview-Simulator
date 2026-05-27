import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function InputField({
  label, type = "text", icon, placeholder, value, onChange, state = "default", error,
}) {
  const [show, setShow] = useState(false);
  const isPwd = type === "password";
  const actual = isPwd ? (show ? "text" : "password") : type;
  const stateMap = {
    default: "border-white/10 focus-within:border-[#00F5FF] focus-within:shadow-[0_0_15px_rgba(0,245,255,0.35)]",
    valid: "border-emerald-400/60 shadow-[0_0_12px_rgba(52,211,153,0.35)]",
    invalid: "border-rose-500/70 shadow-[0_0_12px_rgba(244,63,94,0.4)]",
  };
  return (
    <div>
      {label && <label className="block text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-2 font-semibold">{label}</label>}
      <div className={`relative flex items-center bg-[#0A0A0F] border rounded-lg transition-all ${stateMap[state]}`}>
        {icon && <span className="pl-3 text-slate-500">{icon}</span>}
        <input type={actual} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          className={`w-full bg-transparent py-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-none ${icon ? "pl-2" : "pl-4"} ${isPwd ? "pr-10" : "pr-4"}`} />
        {isPwd && (
          <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 text-slate-400 hover:text-[#00F5FF] transition-colors">
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
    </div>
  );
}
