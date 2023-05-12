/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainGreen: "#22C893",
        mainPurple: "#9054F5",
      },
      fontFamily: {
        sourceCodePro: ["var(--font-source-code-pro)"],
      },
    },
  },
  safelist: ["flex-col", "flex-1", "min-h-screen"],
  plugins: [],
};
