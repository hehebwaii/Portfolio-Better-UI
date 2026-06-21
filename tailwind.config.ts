import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neocream: "#FFF9F0",
        neopink: "#FF6B9E",
        neoyellow: "#FACC15",
        neogreen: "#10B981",
        neoblue: "#818CF8",
        neoblack: "#000000",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)"],
        body: ["var(--font-inter)"],
        mono: ["var(--font-jetbrains-mono)"],
      },
      boxShadow: {
        'neo-black': '8px 8px 0px 0px #000000',
        'neo-pink': '8px 8px 0px 0px #FF6B9E',
        'neo-yellow': '8px 8px 0px 0px #FACC15',
        'neo-blue': '8px 8px 0px 0px #818CF8',
        'neo-green': '8px 8px 0px 0px #10B981',
      },
      borderWidth: {
        '4': '4px',
      },
    },
  },
  plugins: [],
};
export default config;
