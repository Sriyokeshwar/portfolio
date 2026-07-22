import { useEffect, useRef } from 'react';

export const useMousePosition = () => {
  const positionRef = useRef({ x: 0, y: 0, clientX: 0, clientY: 0 });

  useEffect(() => {
    let animationFrameId;

    const updateMousePosition = (ev) => {
      positionRef.current = {
        x: ev.clientX,
        y: ev.clientY,
        clientX: ev.clientX,
        clientY: ev.clientY,
      };

      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(() => {
          document.documentElement.style.setProperty(
            '--mouse-x',
            `${ev.clientX}px`
          );
          document.documentElement.style.setProperty(
            '--mouse-y',
            `${ev.clientY}px`
          );
          animationFrameId = null;
        });
      }
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return positionRef;
};
