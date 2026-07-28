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
          DEFAULT: '#60A5FA',
          hover: '#3B82F6',
          glow: 'rgba(96, 165, 250, 0.35)',
        },
        secondary: {
          DEFAULT: '#A855F7',
          hover: '#9333EA',
          glow: 'rgba(168, 85, 247, 0.35)',
        },
        accent: {
          DEFAULT: '#EC4899',
          hover: '#DB2777',
          glow: 'rgba(236, 72, 153, 0.35)',
        },
        success: '#22C55E',
        surface: {
          dark: 'rgba(11, 17, 32, 0.7)',
          border: 'var(--border-color)',
          borderHover: 'rgba(96, 165, 250, 0.35)',
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
        glow: '0 0 25px -5px rgba(96, 165, 250, 0.35)',
        cyanGlow: '0 0 25px -5px rgba(168, 85, 247, 0.35)',
        violetGlow: '0 0 25px -5px rgba(236, 72, 153, 0.35)',
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
