import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        navy: "#071426",
        ink: "#0b172a",
        mist: "#f4f7fb",
        line: "#d9e2ef",
        electric: "#1f7bff",
        "electric-dark": "#1a5fd4",
        success: "#16a34a",
        warning: "#d97706",
        danger: "#dc2626",
        amber: "#f59e0b",
        indigo: "#4f46e5",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(7, 20, 38, 0.10)",
        glow: "0 4px 18px rgba(31, 123, 255, 0.28)",
        "glow-lg": "0 6px 24px rgba(31, 123, 255, 0.38)",
        lift: "0 12px 36px rgba(7, 20, 38, 0.09)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
