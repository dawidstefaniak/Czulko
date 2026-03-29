import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,ts}',
    './composables/**/*.ts',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        correct: '#22c55e',
        'correct-dark': '#16a34a',
        wrong: '#ef4444',
        'wrong-dark': '#dc2626',
        primary: '#6366f1',
        'primary-dark': '#4f46e5',
        surface: '#1e1b4b',
        'surface-light': '#312e81',
      },
    },
  },
} satisfies Config
