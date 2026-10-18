import type { Config } from 'tailwindcss';

/** Potentia brand kit: Deep Royal Purple, Tech Magenta, Lavender Highlight, Stark White. */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' }, screens: { '2xl': '1280px' } },
    extend: {
      colors: {
        royal: '#5D2E8E',
        magenta: '#9D4496',
        lavender: { DEFAULT: '#C792C8', light: '#EBD8EB' },
        ink: { DEFAULT: '#150826', 2: '#22103A', line: '#3A2251', muted: '#C9B5CF' },
        fg: '#16091F',
        muted: '#5C4C66',
        line: '#E8DAEA',
        tint: '#F8F3F9',
        chip: { DEFAULT: '#F4E7F4', fg: '#5D2E8E' },
        ok: '#1F7A4D',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'Segoe UI', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      backgroundImage: {
        brand: 'linear-gradient(90deg,#5D2E8E,#9D4496)',
      },
      keyframes: {
        enter: { from: { opacity: '0', transform: 'translateY(6px)' }, to: { opacity: '1', transform: 'none' } },
        ping2: { '70%': { boxShadow: '0 0 0 8px rgba(74,222,128,0)' }, '100%': { boxShadow: '0 0 0 0 rgba(74,222,128,0)' } },
        ccprog: { to: { width: '100%' } },
        drift: { from: { transform: 'scale(1.02)' }, to: { transform: 'scale(1.14) translate(-2.5%,1.5%)' } },
      },
      animation: {
        enter: 'enter .45s ease both',
        ping2: 'ping2 1.6s infinite',
        drift: 'drift 26s ease-in-out infinite alternate',
        ccprog: 'ccprog 5.5s linear forwards',
      },
    },
  },
  plugins: [],
};

export default config;
