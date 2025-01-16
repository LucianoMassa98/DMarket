/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFA726", // Naranja
        secondary: "#FFF3E0", // Blanco con tonos cálidos
        accent: "#FF6F00", // Naranja más oscuro
      },
    },
  },
  plugins: [],
}

