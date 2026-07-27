import { tokens } from '../theme/tokens';

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (custom) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: custom?.duration || tokens.transitions.durationSlow,
      ease: tokens.transitions.easePremium,
      delay: custom?.delay || 0,
    },
  }),
};

export const scaleOut = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: (custom) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: custom?.duration || tokens.transitions.durationSlow,
      ease: tokens.transitions.easePremium,
      delay: custom?.delay || 0,
    },
  }),
};

export const elasticScale = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (custom) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: tokens.transitions.springDefault.stiffness,
      damping: tokens.transitions.springDefault.damping,
      delay: custom?.delay || 0,
    },
  }),
};
