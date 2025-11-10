/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ECF5E6",
        surface: "#FFFFFF",
        "surface-muted": "#F5FAEF",
        brand: {
          DEFAULT: "#2E7D32",
          dark: "#1B5E20",
          light: "#81C784",
          softer: "#A5D6A7",
          contrast: "#FFFFFF",
        },
        accent: "#C5E1A5",
        ink: {
          DEFAULT: "#1F2A1C",
          lighter: "#4A6740",
          muted: "#6B8F61",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
  heading: ["var(--font-heading)", "Playfair Display", "serif"],
      },
      boxShadow: {
        card: "0 20px 45px -25px rgba(46, 125, 50, 0.35)",
      },
      borderRadius: {
        xl: "1.25rem",
      },
    },
  },
  plugins: [],
};

