import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Code2, Zap, Mic, BarChart2 } from "lucide-react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const FEATURES = [
  { icon: Code2,    color: "#2563EB", label: "Code Mode",   desc: "Real editor, real problems" },
  { icon: Zap,      color: "#16a34a", label: "MCQ Rounds",  desc: "Adaptive & timed" },
  { icon: Mic,      color: "#7c3aed", label: "Voice Mode",  desc: "Speak, Whisper listens" },
  { icon: BarChart2,color: "#dc2626", label: "AI Feedback", desc: "Gemini grades every answer" },
];

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function Auth() {
  const [tab, setTab]               = useState("login");
  const [showPw, setShowPw]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate                    = useNavigate();

  const [loginForm, setLoginForm]     = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "", confirm: "" });

  const inputStyle = {
    width: "100%",
    background: "var(--forge-surface)",
    border: "1px solid var(--forge-border)",
    borderRadius: 12,
    padding: "11px 14px",
    fontSize: 14,
    color: "var(--forge-ink)",
    fontFamily: "'Geist', system-ui, sans-serif",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.18s",
  };

  const labelStyle = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "var(--forge-ink2)",
    marginBottom: 6,
    letterSpacing: "-0.01em",
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to /api/auth/login
    navigate("/practice");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to /api/auth/register
    navigate("/practice");
  };

  const handleGoogleLogin = () => {
    // TODO: connect to /api/auth/google
    window.location.href = "/api/auth/google";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--forge-bg)",
        color: "var(--forge-ink)",
        fontFamily: "'Geist', system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Navbar ── */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 32px",
          borderBottom: "1px solid var(--forge-border)",
          background: "var(--forge-surface)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.04em", color: "var(--forge-ink)" }}>
            Interview<span style={{ color: "var(--forge-accent)" }}>Forge</span>
          </span>
        </Link>
        <Link to="/interview" style={{ textDecoration: "none" }}>
          <button
            style={{
              background: "var(--forge-ink)",
              border: "none",
              borderRadius: 12,
              padding: "8px 18px",
              fontSize: 13,
              fontWeight: 700,
              color: "var(--forge-bg)",
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            Go to app <ArrowRight size={14} />
          </button>
        </Link>
      </nav>

      {/* ── Main ── */}
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>

        {/* ── Left panel ── */}
        <div
          style={{
            width: "44%",
            background: "var(--forge-surface)",
            borderRight: "1px solid var(--forge-border)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 48px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* blob decorations matching Landing */}
          <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "var(--forge-accent)", opacity: 0.06, top: -60, left: -80, pointerEvents: "none" }} />
          <div style={{ position: "absolute", width: 180, height: 180, borderRadius: "50%", background: "#2563EB", opacity: 0.06, bottom: 40, right: -40, pointerEvents: "none" }} />

          <motion.div {...fade(0)} style={{ textAlign: "center", marginBottom: 48, position: "relative" }}>
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 10 }}>
              Interview<span style={{ color: "var(--forge-accent)" }}>Forge</span>
            </div>
            <div style={{ fontSize: 14, color: "var(--forge-ink2)", lineHeight: 1.6, maxWidth: 280 }}>
              AI-powered adaptive interview practice. Crack your next interview.
            </div>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, width: "100%", maxWidth: 340, position: "relative" }}>
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.label}
                {...fade(0.06 + i * 0.06)}
                style={{
                  background: "var(--forge-bg)",
                  border: "1px solid var(--forge-border)",
                  borderRadius: 16,
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: `${f.color}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 10,
                  }}
                >
                  <f.icon size={16} color={f.color} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 3 }}>{f.label}</div>
                <div style={{ fontSize: 11, color: "var(--forge-ink3)", lineHeight: 1.5 }}>{f.desc}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fade(0.35)}
            style={{
              marginTop: 36,
              padding: "16px 20px",
              background: "var(--forge-bg)",
              border: "1px solid var(--forge-border)",
              borderRadius: 16,
              width: "100%",
              maxWidth: 340,
              position: "relative",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              {["10K+\nQuestions", "94%\nPlacement", "8\nDomains"].map((s) => {
                const [val, lbl] = s.split("\n");
                return (
                  <div key={lbl} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.04em", fontFamily: "'Geist Mono', monospace" }}>{val}</div>
                    <div style={{ fontSize: 10, color: "var(--forge-ink3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{lbl}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ── Right panel (form) ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 48px",
            background: "var(--forge-bg)",
          }}
        >
          <motion.div {...fade(0.1)} style={{ width: "100%", maxWidth: 400 }}>

            {/* Tab toggle */}
            <div
              style={{
                display: "flex",
                background: "var(--forge-surface)",
                border: "1px solid var(--forge-border)",
                borderRadius: 14,
                padding: 4,
                marginBottom: 32,
              }}
            >
              {["login", "register"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    flex: 1,
                    padding: "9px 0",
                    border: "none",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 700,
                    fontFamily: "inherit",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    background: tab === t ? "var(--forge-ink)" : "transparent",
                    color: tab === t ? "var(--forge-bg)" : "var(--forge-ink2)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {t === "login" ? "Sign in" : "Register"}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {tab === "login" ? (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  onSubmit={handleLoginSubmit}
                >
                  <div style={{ marginBottom: 28 }}>
                    <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 6 }}>
                      Welcome back
                    </div>
                    <div style={{ fontSize: 14, color: "var(--forge-ink2)" }}>
                      Sign in to continue forging
                    </div>
                  </div>

                  {/* Google */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGoogleLogin}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      padding: "11px 0",
                      background: "var(--forge-surface)",
                      border: "1.5px solid var(--forge-border2)",
                      borderRadius: 12,
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--forge-ink)",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      marginBottom: 20,
                    }}
                  >
                    <GoogleIcon />
                    Continue with Google
                  </motion.button>

                  {/* Divider */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    <div style={{ flex: 1, height: 1, background: "var(--forge-border)" }} />
                    <span style={{ fontSize: 12, color: "var(--forge-ink3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>or</span>
                    <div style={{ flex: 1, height: 1, background: "var(--forge-border)" }} />
                  </div>

                  {/* Email */}
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Email</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = "var(--forge-accent)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "var(--forge-border)"; }}
                    />
                  </div>

                  {/* Password */}
                  <div style={{ marginBottom: 10 }}>
                    <label style={labelStyle}>Password</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type={showPw ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        style={{ ...inputStyle, paddingRight: 42 }}
                        onFocus={(e) => { e.target.style.borderColor = "var(--forge-accent)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "var(--forge-border)"; }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw(!showPw)}
                        style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--forge-ink3)", display: "flex", alignItems: "center" }}
                      >
                        {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div style={{ textAlign: "right", marginBottom: 24 }}>
                    <button
                      type="button"
                      style={{ background: "none", border: "none", fontSize: 12, color: "var(--forge-accent)", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
                    >
                      Forgot password?
                    </button>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      width: "100%",
                      padding: "13px 0",
                      background: "var(--forge-ink)",
                      color: "var(--forge-bg)",
                      border: "none",
                      borderRadius: 12,
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      letterSpacing: "-0.01em",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    Sign in <ArrowRight size={15} />
                  </motion.button>

                  <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "var(--forge-ink2)" }}>
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setTab("register")}
                      style={{ background: "none", border: "none", color: "var(--forge-accent)", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: 13 }}
                    >
                      Register
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.form
                  key="register"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  onSubmit={handleRegisterSubmit}
                >
                  <div style={{ marginBottom: 28 }}>
                    <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 6 }}>
                      Create account
                    </div>
                    <div style={{ fontSize: 14, color: "var(--forge-ink2)" }}>
                      Start your interview prep journey
                    </div>
                  </div>

                  {/* Google */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGoogleLogin}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      padding: "11px 0",
                      background: "var(--forge-surface)",
                      border: "1.5px solid var(--forge-border2)",
                      borderRadius: 12,
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--forge-ink)",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      marginBottom: 20,
                    }}
                  >
                    <GoogleIcon />
                    Continue with Google
                  </motion.button>

                  {/* Divider */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    <div style={{ flex: 1, height: 1, background: "var(--forge-border)" }} />
                    <span style={{ fontSize: 12, color: "var(--forge-ink3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>or</span>
                    <div style={{ flex: 1, height: 1, background: "var(--forge-border)" }} />
                  </div>

                  {/* Name */}
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Manveer Singh"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = "var(--forge-accent)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "var(--forge-border)"; }}
                    />
                  </div>

                  {/* Email */}
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Email</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = "var(--forge-accent)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "var(--forge-border)"; }}
                    />
                  </div>

                  {/* Password */}
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Password</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type={showPw ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        style={{ ...inputStyle, paddingRight: 42 }}
                        onFocus={(e) => { e.target.style.borderColor = "var(--forge-accent)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "var(--forge-border)"; }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw(!showPw)}
                        style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--forge-ink3)", display: "flex", alignItems: "center" }}
                      >
                        {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div style={{ marginBottom: 24 }}>
                    <label style={labelStyle}>Confirm Password</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type={showConfirm ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        value={registerForm.confirm}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirm: e.target.value })}
                        style={{ ...inputStyle, paddingRight: 42 }}
                        onFocus={(e) => { e.target.style.borderColor = "var(--forge-accent)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "var(--forge-border)"; }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--forge-ink3)", display: "flex", alignItems: "center" }}
                      >
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      width: "100%",
                      padding: "13px 0",
                      background: "var(--forge-ink)",
                      color: "var(--forge-bg)",
                      border: "none",
                      borderRadius: 12,
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      letterSpacing: "-0.01em",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    Create account <ArrowRight size={15} />
                  </motion.button>

                  <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "var(--forge-ink2)" }}>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setTab("login")}
                      style={{ background: "none", border: "none", color: "var(--forge-accent)", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: 13 }}
                    >
                      Sign in
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}