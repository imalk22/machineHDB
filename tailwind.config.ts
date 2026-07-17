/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#123a66",
        secondary: "#1d4ed8",
        accent: "#ff6b6b",
        dark: "#0f0f1e",
        navy: "#0b1f3a",
        orange: "#ff6b00",
        whatsapp: "#22c55e",
        ice: "#f8fafc",
        royal: "#1d4ed8",
        electric: "#3b82f6",
        "red-price": "#ef4444",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.8s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 107, 107, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 107, 107, 0.6)' },
        },
        'slide-up': {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
