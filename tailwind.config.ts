/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-noto-sinhala)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: "#143552",
        brand: {
          primary: '#0b1f3a',
          secondary: '#1B75D0',
          cta: '#FF6B00',
          text: '#1A1A1A',
        },
        cta: '#FF6B00',
        primary: "#0b1f3a",
        secondary: "#1B75D0",
        accent: "#ff6b6b",
        dark: "#0f0f1e",
        orange: "#ff6b00",
        whatsapp: "#22c55e",
        ice: "#f8fafc",
        royal: "#1d4ed8",
        electric: "#3b82f6",
        "red-price": "#ef4444",
        // "Fire & Steel" redesign tokens
        charcoal: "#0C0C0E",
        flame: "#FF6B1A",
        "flame-amber": "#FFB300",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.8s ease-out',
        'pulse-glow-flame': 'pulse-glow-flame 2.5s ease-in-out infinite',
        'ember-float': 'ember-float 5s ease-in infinite',
        'gradient-shift': 'gradient-shift 6s ease-in-out infinite',
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
        'pulse-glow-flame': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 107, 26, 0.45), 0 0 0 rgba(255, 179, 0, 0)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 107, 26, 0.7), 0 0 16px rgba(255, 179, 0, 0.3)' },
        },
        'ember-float': {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '10%': { opacity: '0.9' },
          '90%': { opacity: '0.5' },
          '100%': { transform: 'translateY(-140px) translateX(var(--ember-drift, 10px))', opacity: '0' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
