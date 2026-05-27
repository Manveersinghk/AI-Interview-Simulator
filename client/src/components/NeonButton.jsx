const variants = {
  primary: "bg-[#00F5FF]/10 text-[#00F5FF] border-[#00F5FF]/60 shadow-[0_0_25px_rgba(0,245,255,0.35)] hover:bg-[#00F5FF]/20 hover:shadow-[0_0_40px_rgba(0,245,255,0.7)]",
  ghost:   "bg-transparent text-slate-200 border-white/15 hover:border-[#00F5FF]/60 hover:text-[#00F5FF] hover:bg-[#00F5FF]/5",
  danger:  "bg-rose-500/10 text-rose-300 border-rose-400/50 shadow-[0_0_20px_rgba(244,63,94,0.35)] hover:bg-rose-500/20",
};
const sizes = { md: "px-6 py-2.5 text-sm", lg: "px-8 py-3.5 text-base" };

export default function NeonButton({
  variant = "primary", size = "md", fullWidth, type = "button", onClick, children,
}) {
  return (
    <button type={type} onClick={onClick}
      className={`rounded-lg border font-semibold tracking-wide transition-all duration-200 backdrop-blur-sm inline-flex items-center justify-center gap-2 ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""}`}>
      {children}
    </button>
  );
}
