/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Chemistry/Breaking Bad Color Palette
        'chem': {
          green: '#00ff9d',
          'green-glow': '#00ff9d',
          'green-dark': '#00cc7d',
          amber: '#ffb700',
          yellow: '#e6ff00',
          red: '#ff2d2d',
          cyan: '#00d4ff',
          purple: '#a855f7',
          pink: '#ff0080',
          orange: '#ff6b00',
        },
        // Industrial backgrounds
        'industrial': {
          950: '#0d0d0d',
          900: '#1a1a1a',
          800: '#1c1c1c',
          700: '#252525',
          600: '#2d2d2d',
          500: '#3d3d3d',
          400: '#4d4d4d',
          300: '#6d6d6d',
          200: '#9d9d9d',
          100: '#cdcdcd',
          50: '#f0f0f0',
        },
        // Category colors
        'category': {
          peptide: '#00ff9d',
          supplement: '#ffb700',
          nootropic: '#00d4ff',
          sarm: '#e6ff00',
          adaptogen: '#a855f7',
          glp: '#ff0080',
          racetam: '#ff6b00',
          'amino-acid': '#22c55e',
          medicine: '#ff2d2d',
          herb: '#22c55e',
          gh: '#67e8f9',
        }
      },
      fontFamily: {
        'heading': ['Titillium Web', 'sans-serif'],
        'substance': ['Chakra Petch', 'sans-serif'],
        'body': ['Source Sans 3', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'accent': ['Archivo Black', 'sans-serif'],
        'handwritten': ['Caveat', 'cursive'],
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(0, 255, 157, 0.4), 0 0 40px rgba(0, 255, 157, 0.2)',
        'glow-green-sm': '0 0 10px rgba(0, 255, 157, 0.3)',
        'glow-amber': '0 0 20px rgba(255, 183, 0, 0.4)',
        'glow-red': '0 0 20px rgba(255, 45, 45, 0.4)',
        'industrial': '4px 4px 0px rgba(0, 0, 0, 0.8), inset 1px 1px 0px rgba(255, 255, 255, 0.1)',
      },
      backgroundImage: {
        'grid-paper': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233d3d3d' fill-opacity='0.3'%3E%3Cpath d='M0 0h1v40H0V0zm39 0h1v40h-1V0zM0 0v1h40V0H0zm0 39v1h40v-1H0z'/%3E%3C/g%3E%3C/svg%3E\")",
        'hex-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2300ff9d' fill-opacity='0.05'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'flicker': 'flicker 0.15s infinite',
        'crystallize': 'crystallize 0.5s ease-out forwards',
        'dissolve-in': 'dissolve-in 0.6s ease-out forwards',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.2)' },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'crystallize': {
          '0%': { opacity: '0', transform: 'scale(0.8) rotate(-5deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
        },
        'dissolve-in': {
          '0%': { opacity: '0', filter: 'blur(10px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
      },
    },
  },
  plugins: [],
}
