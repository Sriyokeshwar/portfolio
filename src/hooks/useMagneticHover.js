import { useRef, useEffect } from 'react';

export const useMagneticHover = (strength = 0.3) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      el.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
    };

    const handleMouseLeave = () => {
      el.style.transform = 'translate3d(0px, 0px, 0)';
      el.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
    };

    const handleMouseEnter = () => {
      el.style.transition = 'none';
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [strength]);

  return ref;
};
