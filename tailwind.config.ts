import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#040914",
          900: "#070F1E",
          850: "#0B172D",
          800: "#0F2042",
          700: "#142A57",
          600: "#1E3A8A",
          500: "#2563EB",
          400: "#3B82F6",
        },
        solar: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          orange: "#f97316",
        },
        matte: {
          900: "#0A0F1D",
          800: "#111827",
          700: "#1F2937",
          600: "#374151",
          500: "#4B5563",
          border: "#1E293B",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 1px 3px 0 rgb(0 0 0 / 0.2)",
        card: "0 4px 12px -2px rgb(0 0 0 / 0.3)",
        elevation: "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)",
        glow: "0 0 35px -5px rgba(245, 158, 11, 0.35)",
        blueGlow: "0 0 40px -5px rgba(37, 99, 235, 0.35)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
