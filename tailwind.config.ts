import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      nav: "1160px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      "page": "#F8F9FB",
      surface: "#F2F3F5",
      "surface-2": "#EAECF0",
      ink: "#111111",
      "ink-secondary": "#62666D",
      "ink-muted": "#858A92",
      "ink-body": "#3A3D42",
      border: "#D7DAE0",
      black: "#000000",
      "near-black": "#0A0A0A",
      "canvas-black": "#050505",
      accent: "#1B3FE0",
      "accent-focus": "#1233C4",
      "accent-soft": "#E1E7FF",
    },
    extend: {
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: ["ui-monospace", "Menlo", "Consolas", "monospace"],
        hand: ["var(--font-caveat)", "cursive"],
      },
      maxWidth: {
        content: "1280px",
      },
      borderRadius: {
        canvas: "40px",
      },
      spacing: {
        "4.5": "18px",
        "13": "52px",
        "18": "72px",
        "30": "120px",
        "38": "152px",
        "48": "192px",
      },
      fontSize: {
        "hero": ["clamp(2.75rem, 2.1rem + 3vw, 6.5rem)", { lineHeight: "0.96", letterSpacing: "-0.02em" }],
        "section": ["clamp(2.125rem, 1.7rem + 2vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.015em" }],
        "case-title": ["clamp(2.625rem, 1.9rem + 3.5vw, 6rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "case-heading": ["clamp(1.75rem, 1.4rem + 1.6vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        "project-title": ["clamp(1.6875rem, 1.4rem + 1.2vw, 2.625rem)", { lineHeight: "1.08" }],
        "subheading": ["clamp(1.375rem, 1.2rem + 0.7vw, 1.875rem)", { lineHeight: "1.2" }],
        "body-lg": ["1.1875rem", { lineHeight: "1.6" }],
        body: ["1.0625rem", { lineHeight: "1.6" }],
        meta: ["0.875rem", { lineHeight: "1.4", letterSpacing: "0.01em" }],
        caption: ["0.8125rem", { lineHeight: "1.4" }],
      },
    },
  },
  plugins: [],
};

export default config;
