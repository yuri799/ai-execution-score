import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#071426",
        ink: "#0b172a",
        mist: "#f4f7fb",
        line: "#d9e2ef",
        electric: "#1f7bff",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(7, 20, 38, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
