/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          dark: 'var(--bg-primary)',
          card: 'var(--bg-card)',
          elevated: 'var(--bg-elevated)',
          light: '#F8FAFC',
          lightCard: '#FFFFFF',
        },
        primary: {
          DEFAULT: '#F97316',
          hover: '#EA580C',
          glow: 'rgba(249, 115, 22, 0.35)',
        },
        secondary: {
          DEFAULT: '#06B6D4',
          hover: '#0891B2',
          glow: 'rgba(6, 182, 212, 0.35)',
        },
        accent: {
          DEFAULT: '#8B5CF6',
          hover: '#7C3AED',
          glow: 'rgba(139, 92, 246, 0.35)',
        },
        success: '#22C55E',
        surface: {
          dark: 'rgba(11, 17, 32, 0.7)',
          border: 'var(--border-color)',
          borderHover: 'rgba(249, 115, 22, 0.4)',
        },
        text: {
          primary: 'var(--text-main)',
          secondary: 'var(--text-sub)',
          muted: 'var(--text-muted)',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      backdropBlur: {
        xs: '2px',
        glass: '16px',
        vision: '24px',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        glow: '0 0 25px -5px rgba(249, 115, 22, 0.4)',
        cyanGlow: '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        violetGlow: '0 0 25px -5px rgba(139, 92, 246, 0.4)',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
