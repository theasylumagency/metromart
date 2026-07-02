/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        page: 'rgb(var(--c-page) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        card: 'rgb(var(--c-card) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        onInk: 'rgb(var(--c-on-ink) / <alpha-value>)',
        line: 'var(--c-line)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
        accentSoft: 'rgb(var(--c-accent-soft) / <alpha-value>)',
        blue: 'rgb(var(--c-blue) / <alpha-value>)',
        blueSoft: 'rgb(var(--c-blue-soft) / <alpha-value>)',
        mint: 'rgb(var(--c-mint) / <alpha-value>)',
        mintSoft: 'rgb(var(--c-mint-soft) / <alpha-value>)',

        // Proposal theme colors
        paper: '#F4F6F8',
        deep: '#0E2150',
        'deep-2': '#0A1838',
        'brand-blue': '#2F5BFF',
        'brand-blue-soft': '#E6ECFF',
        'brand-amber': '#E8A13A',
        'brand-amber-ink': '#7A4D08',
        'brand-green': '#16916A',
        'brand-green-soft': '#E2F2EB',
        'muted-text': '#5B6472',
        'border-line': '#DCE1E8',
        'border-line-2': '#EBEEF2',
      },
      fontFamily: {
        sans: ['Inter', 'IBM Plex Sans', 'Noto Sans Georgian', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      maxWidth: { wrap: '74rem' },
      boxShadow: {
        soft: '0 1px 2px rgba(15,18,22,0.04), 0 8px 24px -8px rgba(15,18,22,0.10)',
        lift: '0 2px 4px rgba(15,18,22,0.05), 0 24px 48px -12px rgba(15,18,22,0.18)',
        hero: '0 32px 64px -16px rgba(255,107,0,0.35), 0 8px 24px -8px rgba(15,18,22,0.12)',
        'neon-accent': '0 10px 32px -4px rgba(255, 107, 0, 0.28), 0 4px 12px -2px rgba(255, 107, 0, 0.15)',
        'neon-blue': '0 10px 32px -4px rgba(46, 111, 242, 0.28), 0 4px 12px -2px rgba(46, 111, 242, 0.15)',
        'neon-mint': '0 10px 32px -4px rgba(13, 166, 120, 0.28), 0 4px 12px -2px rgba(13, 166, 120, 0.15)',
        'glow-accent': '0 16px 44px -6px rgba(255, 107, 0, 0.38)',
        'glow-blue': '0 16px 44px -6px rgba(46, 111, 242, 0.38)',
        'glow-mint': '0 16px 44px -6px rgba(13, 166, 120, 0.38)',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(40px,-30px) scale(1.08)' },
          '66%': { transform: 'translate(-30px,25px) scale(0.95)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        blob: 'blob 14s ease-in-out infinite',
        'blob-slow': 'blob 20s ease-in-out infinite reverse',
        floaty: 'floaty 5s ease-in-out infinite',
        'floaty-slow': 'floaty 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
