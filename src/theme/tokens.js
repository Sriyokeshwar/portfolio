export const tokens = {
  colors: {
    primary: '#f97316',      // vibrant orange
    secondary: '#06b6d4',    // cyan
    accent: '#8b5cf6',       // violet
    success: '#10b981',      // emerald
    bgDark: '#050816',
    bgCardDark: 'rgba(11, 17, 32, 0.65)',
    bgElevatedDark: '#111827',
    borderDark: 'rgba(255, 255, 255, 0.08)',
    textPrimaryDark: '#ffffff',
    textSecondaryDark: '#e2e8f0',
    textMutedDark: '#94a3b8',
    
    bgLight: '#f8fafc',
    bgCardLight: 'rgba(255, 255, 255, 0.85)',
    bgElevatedLight: '#f1f5f9',
    borderLight: 'rgba(15, 23, 42, 0.08)',
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
    glow: '0 0 20px rgba(249, 115, 22, 0.15)',
    cyanGlow: '0 0 20px rgba(6, 182, 212, 0.15)',
    ambient: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
    ambientLight: '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
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
