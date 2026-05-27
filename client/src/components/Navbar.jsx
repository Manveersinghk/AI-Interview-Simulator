import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Code2, User, LogOut, Menu, X, Zap } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const NAV_LINKS = [
  { to: "/",         label: "Home",      icon: Zap },
  { to: "/interview",label: "Practice",  icon: Code2 },
  { to: "/profile",  label: "Profile",   icon: User },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "MS";

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: scrolled ? "var(--forge-surface)" : "var(--forge-bg)",
          borderBottom: `1px solid ${scrolled ? "var(--forge-border)" : "transparent"}`,
          transition: "background 0.2s ease, border-color 0.2s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 24px",
            height: 58,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Brand */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontSize: 17,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "var(--forge-ink)",
                fontFamily: "'Geist', system-ui, sans-serif",
              }}
            >
              Interview<span style={{ color: "var(--forge-accent)" }}>Forge</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              background: "var(--forge-surface2)",
              border: "1px solid var(--forge-border)",
              borderRadius: 99,
              padding: "3px",
            }}
            className="hidden-mobile"
          >
            {NAV_LINKS.map(({ to, label }) => {
              const active = location.pathname === to;
              return (
                <Link key={to} to={to} style={{ textDecoration: "none" }}>
                  <motion.span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "6px 16px",
                      borderRadius: 99,
                      fontSize: 13,
                      fontWeight: active ? 700 : 500,
                      color: active ? "var(--forge-bg)" : "var(--forge-ink2)",
                      background: active ? "var(--forge-ink)" : "transparent",
                      cursor: "pointer",
                      transition: "all 0.15s",
                      fontFamily: "'Geist', system-ui, sans-serif",
                      letterSpacing: "-0.01em",
                    }}
                    whileHover={!active ? { color: "var(--forge-ink)" } : {}}
                  >
                    {label}
                  </motion.span>
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {user ? (
              <>
                {/* Avatar */}
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: "var(--forge-accent-dim)",
                      border: "1.5px solid var(--forge-accent-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "var(--forge-accent)",
                      fontFamily: "'Geist Mono', monospace",
                      cursor: "pointer",
                    }}
                  >
                    {initials}
                  </motion.div>
                </Link>

                {/* Logout */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleLogout}
                  title="Sign out"
                  style={{
                    background: "transparent",
                    border: "1px solid var(--forge-border2)",
                    borderRadius: 10,
                    width: 34,
                    height: 34,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "var(--forge-ink3)",
                    transition: "all 0.15s",
                  }}
                >
                  <LogOut size={15} />
                </motion.button>
              </>
            ) : (
              <>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      background: "transparent",
                      border: "1px solid var(--forge-border2)",
                      borderRadius: 10,
                      padding: "7px 16px",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--forge-ink2)",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Sign in
                  </button>
                </Link>
                <Link to="/interview" style={{ textDecoration: "none" }}>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      background: "var(--forge-ink)",
                      border: "none",
                      borderRadius: 10,
                      padding: "7px 16px",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--forge-bg)",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Get started
                  </motion.button>
                </Link>
              </>
            )}

            {/* Mobile hamburger */}
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => setMenuOpen((o) => !o)}
              className="show-mobile"
              style={{
                background: "transparent",
                border: "1px solid var(--forge-border2)",
                borderRadius: 10,
                width: 34,
                height: 34,
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--forge-ink)",
              }}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            style={{
              position: "fixed",
              top: 58,
              left: 0,
              right: 0,
              zIndex: 99,
              background: "var(--forge-surface)",
              borderBottom: "1px solid var(--forge-border)",
              padding: "12px 24px 20px",
            }}
          >
            {NAV_LINKS.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 0",
                      borderBottom: "1px solid var(--forge-border)",
                      fontSize: 15,
                      fontWeight: active ? 700 : 500,
                      color: active ? "var(--forge-accent)" : "var(--forge-ink)",
                    }}
                  >
                    <Icon size={16} />
                    {label}
                  </div>
                </Link>
              );
            })}

            {user && (
              <button
                onClick={handleLogout}
                style={{
                  marginTop: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--forge-red)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <LogOut size={15} /> Sign out
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline responsive styles */}
      <style>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </>
  );
}