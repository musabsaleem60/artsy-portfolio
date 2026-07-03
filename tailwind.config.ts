import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#f7f1e8",
        porcelain: "#fffaf2",
        charcoal: "#171514",
        ink: "#0b0a09",
        night: "#12100f",
        graphite: "#211d1a",
        smoke: "#6d6258",
        mist: "#b8afa3",
        gold: "#b8924a",
        champagne: "#dfcfad",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "Avenir Next", "Segoe UI", "Arial", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 80px rgba(0, 0, 0, 0.34)",
      },
    },
  },
  plugins: [],
};

export default config;
