import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Ascending, deliberately: Tailwind emits media queries in declaration
    // order, so a breakpoint declared out of order loses to the one after it at
    // widths where both apply (ISSUE-011).
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      nav: "1160px",
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
      // #858A92 until 2026-08-24: 3.13:1 on the page background, below the 4.5:1
      // WCAG AA floor, and it carries real content (dates, captions, the footer).
      "ink-muted": "#6A6F78",
      "ink-body": "#3A3D42",
      border: "#D7DAE0",
      black: "#000000",
      "near-black": "#0A0A0A",
      "canvas-black": "#050505",
      accent: "#1B3FE0",
      "accent-focus": "#1233C4",
      "accent-soft": "#E1E7FF",
      // Recurring literals that earned a name (ISSUE-023). `card-border` is a
      // lighter rule than `border` and is what cards, figures and placeholders
      // use; `border-muted` is the dashed one; `accent-on-dark` is the accent
      // as it appears on the near-black canvases.
      // Text on the near-black bands. `ink-on-dark-muted` replaces a #6C7078
      // literal that sat at 3.98:1 (ISSUE-030).
      "ink-on-dark": "#A7ACB4",
      "ink-on-dark-muted": "#8A8F98",
      "card-border": "#E4E7EE",
      "border-muted": "#C9CEDB",
      "accent-on-dark": "#8FA6FF",
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
      // The fluid display scale, reconciled from what the pages were actually
      // written with — five different page-h1 clamps, and near-duplicates below
      // them (ISSUE-023). Fixed px sizes for UI text are left alone on purpose:
      // 12/13/14/15px are deliberate, not drift.
      // The fluid display scale, reconciled from what the pages were actually
      // written with — five different page-h1 clamps, and near-duplicates below
      // them (ISSUE-023).
      //
      // Sizes only. Line-height and letter-spacing stay on the components,
      // which all set them explicitly today and not always identically for the
      // same size; folding those in means changing how headings look, which is
      // a separate decision from naming their sizes.
      //
      // Fixed px sizes for UI text are left alone on purpose: 12/13/14/15px are
      // deliberate, not drift.
      fontSize: {
        hero: "clamp(2.75rem, 5.8vw, 5.5rem)",
        // Not `page`: `text-page` would collide with the `page` colour token,
        // and the colour wins — the heading renders near-white on white.
        "page-title": "clamp(2.5rem, 5.4vw, 5.25rem)",
        section: "clamp(2.125rem, 4.6vw, 4.25rem)",
        feature: "clamp(1.875rem, 3.6vw, 3.25rem)",
        heading: "clamp(1.875rem, 3.2vw, 2.75rem)",
        subheading: "clamp(1.625rem, 2.6vw, 2.25rem)",
        lead: "clamp(1.375rem, 2.2vw, 1.875rem)",
      },
    },
  },
  plugins: [],
};

export default config;
