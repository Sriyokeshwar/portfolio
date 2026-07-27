import { tokens } from '../theme/tokens';

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: (custom) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom?.staggerChildren || 0.1,
      delayChildren: custom?.delayChildren || 0,
    },
  }),
};

export const childFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: tokens.transitions.springDefault.stiffness,
      damping: tokens.transitions.springDefault.damping,
    },
  }),
};

export const wordStagger = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: tokens.transitions.durationSlow,
      ease: tokens.transitions.easePremium,
    },
  }),
};
