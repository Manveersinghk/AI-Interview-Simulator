import { Link } from "react-router-dom";
import NeonButton from "../components/NeonButton.jsx";
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-7xl font-extrabold text-[#00F5FF]" style={{ textShadow: "0 0 24px rgba(0,245,255,0.7)" }}>404</h1>
      <p className="mt-3 text-slate-400">This route hasn't been forged yet.</p>
      <Link to="/" className="mt-8"><NeonButton variant="primary">Go Home</NeonButton></Link>
    </div>
  );
}
