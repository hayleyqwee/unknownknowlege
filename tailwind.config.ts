import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#070b0f",
          panel: "#0a1620",
          accent: "#00ff00",
          blue: "#00aeef",
        },
      },
      boxShadow: {
        glow: "0 0 16px rgba(0, 255, 0, 0.35)",
        blueglow: "0 0 16px rgba(0, 174, 239, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
