import { motion } from "framer-motion";

const variants = {
  primary: {
    background: "var(--forge-ink)",
    color: "var(--forge-bg)",
    border: "none",
  },
  accent: {
    background: "var(--forge-accent)",
    color: "#fff",
    border: "none",
  },
  outline: {
    background: "transparent",
    color: "var(--forge-ink)",
    border: "1.5px solid var(--forge-border2)",
  },
  ghost: {
    background: "transparent",
    color: "var(--forge-ink2)",
    border: "1px solid var(--forge-border)",
  },
  danger: {
    background: "transparent",
    color: "var(--forge-red)",
    border: "1.5px solid var(--forge-red)",
  },
};

const sizes = {
  sm: { padding: "6px 14px", fontSize: 12, borderRadius: 8 },
  md: { padding: "9px 20px", fontSize: 13, borderRadius: 11 },
  lg: { padding: "14px 28px", fontSize: 15, borderRadius: 14 },
};

export default function ForgeButton({
  variant = "primary",
  size = "md",
  fullWidth = false,
  type = "button",
  onClick,
  disabled = false,
  children,
}) {
  const v = variants[variant];
  const s = sizes[size];

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      style={{
        ...v,
        ...s,
        width: fullWidth ? "100%" : "auto",
        fontFamily: "'Geist', system-ui, sans-serif",
        fontWeight: 700,
        letterSpacing: "-0.01em",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
        transition: "opacity 0.15s",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </motion.button>
  );
}