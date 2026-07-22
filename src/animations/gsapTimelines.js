import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initScrollParallax = (element, target, speed = 0.2) => {
  if (!element || !target) return;

  return gsap.to(target, {
    yPercent: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

export const initBackgroundMeshShift = (container) => {
  if (!container) return;

  return gsap.to(container, {
    backgroundPosition: '100% 100%',
    duration: 15,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
  });
};
