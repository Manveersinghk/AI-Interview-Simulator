export default function GlowCard({ children, className = "", accent = false }) {
  return (
    <div className={`relative rounded-2xl border bg-[#0F0F1A]/80 backdrop-blur-md p-6 overflow-hidden ${accent ? "border-l-4 border-l-[#00F5FF] border-y border-r border-white/10" : "border-white/10"} ${className}`}>
      {children}
    </div>
  );
}
