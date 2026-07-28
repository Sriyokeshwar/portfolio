export const tokens = {
  colors: {
    primary: '#60a5fa',      // aurora blue
    secondary: '#a855f7',    // premium violet
    accent: '#ec4899',       // neon pink
    success: '#34d399',      // mint
    bgDark: '#030712',
    bgCardDark: 'rgba(255, 255, 255, 0.06)',
    bgElevatedDark: '#0b1220',
    borderDark: 'rgba(255, 255, 255, 0.16)',
    textPrimaryDark: '#ffffff',
    textSecondaryDark: '#cbd5e1',
    textMutedDark: '#94a3b8',
    
    bgLight: '#f8fafc',
    bgCardLight: 'rgba(255, 255, 255, 0.8)',
    bgElevatedLight: '#f1f5f9',
    borderLight: 'rgba(15, 23, 42, 0.12)',
    textPrimaryLight: '#0f172a',
    textSecondaryLight: '#334155',
    textMutedLight: '#64748b',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    full: '9999px',
  },
  transitions: {
    springSlow: { type: 'spring', stiffness: 100, damping: 15 },
    springDefault: { type: 'spring', stiffness: 300, damping: 25 },
    springFast: { type: 'spring', stiffness: 500, damping: 30 },
    springStiff: { type: 'spring', stiffness: 800, damping: 35 },
    easePremium: [0.22, 1, 0.36, 1], // Cubic-bezier from Linear/Apple
    durationDefault: 0.3,
    durationSlow: 0.5,
    durationFast: 0.15,
  },
  shadows: {
    glow: '0 0 30px rgba(96, 165, 250, 0.18)',
    cyanGlow: '0 0 24px rgba(34, 211, 238, 0.16)',
    ambient: '0 20px 60px 0 rgba(2, 6, 23, 0.35)',
    ambientLight: '0 12px 40px 0 rgba(15, 23, 42, 0.08)',
  },
  zIndex: {
    background: 0,
    gradient: 1,
    particles: 2,
    waterFlow: 3,
    cards: 10,
    text: 11,
    buttons: 12,
    cursor: 50,
    modals: 60,
    navigation: 70,
    tooltips: 80,
    notifications: 90,
  }
};
