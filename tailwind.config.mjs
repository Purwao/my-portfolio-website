/* eslint-disable import/no-anonymous-default-export */
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
        accent1: "#0b0f1a",       // deepest background
        accent2: "#101827",       // surface
        accent3: "#6cb0f8",       // accent highlight (links, names)
        accent4: "#9ca3af",       // soft/muted text or borders
        accent0: "#E3EEB2"
      },
      fontFamily: {
        consolas: ['"Consola Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
