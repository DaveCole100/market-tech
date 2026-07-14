/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#F8FAFC", // Off-White background
        ink: "#0F172A", // dark text
        navy: {
          DEFAULT: "#0B2545", // deep navy — primary
          soft: "#123456",
        },
        teal: {
          DEFAULT: "#17B0A6", // muted turquoise accent
          light: "#7DD3CD", // light turquoise for text on dark
        },
      },
      fontFamily: {
        sans: [
          "Heebo",
          "Assistant",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Arial",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "1180px",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        rise: "rise 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        fade: "fade 0.4s ease both",
      },
    },
  },
  plugins: [],
};
