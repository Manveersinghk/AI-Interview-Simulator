/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        forge: {
          bg: "#0A0A0F",
          card: "#0F0F1A",
          cyan: "#00F5FF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        cyan: "0 0 25px rgba(0,245,255,0.35)",
        cyanLg: "0 0 40px rgba(0,245,255,0.6)",
      },
      keyframes: {
        pulseRing: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(244,63,94,0.6)" },
          "50%":      { boxShadow: "0 0 0 12px rgba(244,63,94,0)" },
        },
      },
      animation: {
        pulseRing: "pulseRing 1.4s ease-out infinite",
      },
    },
  },
  plugins: [],
};
