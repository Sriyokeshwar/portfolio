import { tokens } from '../theme/tokens';

export const springUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: custom?.stiffness || tokens.transitions.springDefault.stiffness,
      damping: custom?.damping || tokens.transitions.springDefault.damping,
      delay: custom?.delay || 0,
    },
  }),
};

export const springDown = {
  hidden: { opacity: 0, y: -50 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: custom?.stiffness || tokens.transitions.springDefault.stiffness,
      damping: custom?.damping || tokens.transitions.springDefault.damping,
      delay: custom?.delay || 0,
    },
  }),
};

export const springDefault = (custom) => ({
  type: 'spring',
  stiffness: custom?.stiffness || tokens.transitions.springDefault.stiffness,
  damping: custom?.damping || tokens.transitions.springDefault.damping,
  mass: custom?.mass || 1,
});

export const springSlow = (custom) => ({
  type: 'spring',
  stiffness: custom?.stiffness || tokens.transitions.springSlow.stiffness,
  damping: custom?.damping || tokens.transitions.springSlow.damping,
  mass: custom?.mass || 1.2,
});

export const springFast = (custom) => ({
  type: 'spring',
  stiffness: custom?.stiffness || tokens.transitions.springFast.stiffness,
  damping: custom?.damping || tokens.transitions.springFast.damping,
  mass: custom?.mass || 0.8,
});
