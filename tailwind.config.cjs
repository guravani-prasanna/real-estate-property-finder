/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Syne"', 'sans-serif'],
      },
      colors: {
        bg:    '#080808',
        panel: '#111111',
        card:  '#161616',
        line:  '#222222',
        subtle:'#2a2a2a',
        muted: '#555555',
        dim:   '#888888',
        body:  '#aaaaaa',
        head:  '#f5f5f5',
        white: '#ffffff',
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
        rose: {
          400: '#fb7185',
          500: '#f43f5e',
        },
      },
      backgroundImage: {
        'glow-tl':     'radial-gradient(ellipse 80% 60% at 10% 10%, rgba(139,92,246,0.12), transparent)',
        'glow-br':     'radial-gradient(ellipse 70% 50% at 90% 90%, rgba(34,211,238,0.10), transparent)',
        'glow-center': 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(139,92,246,0.15), transparent)',
        'card-hover':  'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0))',
        'price-grad':  'linear-gradient(135deg, #22d3ee, #8b5cf6)',
      },
      boxShadow: {
        'card':     '0 1px 3px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
        'card-hov': '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
        'glow-v':   '0 0 40px rgba(139,92,246,0.3)',
        'glow-c':   '0 0 40px rgba(34,211,238,0.25)',
        'btn':      '0 1px 2px rgba(0,0,0,0.5)',
        'inset':    'inset 0 1px 0 rgba(255,255,255,0.08)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'fade-up':   'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':   'fadeIn 0.5s ease forwards',
        'pulse-slow':'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
