/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        pinkOld: "#F875AA",
        pinkYoung: "#FFDFDF",
        basicWhite: "#FFF6F6",
        basicBlue: "#AEDEFC",
        newMain: "#87a8cf",
      },
    },
  },
  plugins: [],
};
