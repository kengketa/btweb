/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#BE1E2D', dark: '#A41826', deep: '#8F1420' },
        cream: '#FBF6EF',
        paper: '#F3EADF',
        ink: '#221C19',
        muted: '#6B5F57',
        body: '#4A403A',
        line: '#EADFD2',
        line2: '#E2D5C5',
        sun: '#F4B63F',
        blush: '#F9E3E0'
      },
      fontFamily: {
        sans: ['Kanit', 'system-ui', 'sans-serif'],
        // headings: Kanit covers Thai and Latin, so mixed lines stay in one typeface
        display: ['Kanit', 'system-ui', 'sans-serif'],
        // Latin/number-only text (labels, figures, course names) in the logo's condensed style
        condensed: ['"Roboto Condensed"', 'Kanit', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
