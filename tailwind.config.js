/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Newsprint palette — warm paper, ink black, and editorial accents.
        paper: {
          DEFAULT: "#f1ead9",
          deep: "#e9dfc8",
          warm: "#f7f1e1",
          card: "#fbf6e8",
        },
        ink: {
          DEFAULT: "#15110d",
          soft: "#3a322a",
          muted: "#7a6f60",
          faint: "#a89e8b",
        },
        // Bold, hand-mixed accents — not the AI gradient palette.
        vermilion: "#e63322",
        cobalt: "#1d3fb8",
        mustard: "#d9a017",
        sage: "#5a7a4a",
        plum: "#7a2e5a",
      },
      fontFamily: {
        // Dramatic editorial serif for display
        display: ['"Instrument Serif"', '"DM Serif Display"', "Georgia", "serif"],
        // Tight modern sans for body
        sans: ['"Inter Tight"', '"Inter"', "system-ui", "sans-serif"],
        // Typewriter mono for meta / captions
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        editorial: "-0.04em",
        wide: "0.06em",
        wider: "0.16em",
        widest: "0.32em",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-rev": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.15" },
        },
        "stamp-in": {
          "0%": { transform: "scale(2) rotate(-20deg)", opacity: "0" },
          "60%": { transform: "scale(0.92) rotate(-12deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(-8deg)", opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-rev": "marquee-rev 60s linear infinite",
        "spin-slow": "spin 18s linear infinite",
        wiggle: "wiggle 4s ease-in-out infinite",
        blink: "blink 1.2s ease-in-out infinite",
        "stamp-in": "stamp-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      },
      backgroundImage: {
        // Halftone dot pattern used as decorative shading
        halftone:
          "radial-gradient(circle at 1px 1px, rgba(21,17,13,0.35) 1px, transparent 0)",
        // Newsprint paper texture (subtle)
        newsprint:
          "radial-gradient(circle at 25% 30%, rgba(217, 160, 23, 0.06) 0px, transparent 50%), radial-gradient(circle at 75% 70%, rgba(230, 51, 34, 0.04) 0px, transparent 50%)",
      },
    },
  },
  plugins: [],
};
