import { tokens } from '../theme/tokens';

export const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom?.duration || tokens.transitions.durationSlow,
      ease: tokens.transitions.easePremium,
      delay: custom?.delay || 0,
    },
  }),
};

export const fadeDown = {
  hidden: { opacity: 0, y: -35 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom?.duration || tokens.transitions.durationSlow,
      ease: tokens.transitions.easePremium,
      delay: custom?.delay || 0,
    },
  }),
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (custom) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom?.duration || tokens.transitions.durationSlow,
      ease: tokens.transitions.easePremium,
      delay: custom?.delay || 0,
    },
  }),
};

export const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: (custom) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom?.duration || tokens.transitions.durationSlow,
      ease: tokens.transitions.easePremium,
      delay: custom?.delay || 0,
    },
  }),
};

export const fadeOnly = {
  hidden: { opacity: 0 },
  visible: (custom) => ({
    opacity: 1,
    transition: {
      duration: custom?.duration || tokens.transitions.durationDefault,
      ease: tokens.transitions.easePremium,
      delay: custom?.delay || 0,
    },
  }),
};
