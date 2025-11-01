/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  // content not required in v4, but harmless if left
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}","./components/**/*.{js,ts,jsx,tsx,mdx}","./pages/**/*.{js,ts,jsx,tsx,mdx}"],
  // no theme.extend.colors — tokens come from @theme
  plugins: [],
};
