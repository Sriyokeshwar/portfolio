import { tokens } from '../theme/tokens';

export const pageReveal = {
  hidden: { opacity: 0, filter: 'blur(15px)', scale: 0.96 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 1.2,
      ease: tokens.transitions.easePremium,
    },
  },
  exit: {
    opacity: 0,
    filter: 'blur(10px)',
    scale: 0.98,
    transition: {
      duration: 0.5,
      ease: tokens.transitions.easePremium,
    },
  },
};

export const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: tokens.transitions.easePremium,
    },
  },
};

export const modalTransition = {
  initial: { opacity: 0, scale: 0.92, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: tokens.transitions.easePremium },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};
