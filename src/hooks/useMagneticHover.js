import { useRef, useEffect } from 'react';

export const useMagneticHover = (strength = 0.35) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    let rafId;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let currentStretch = 1;
    let targetStretch = 1;
    let currentAngle = 0;
    let targetAngle = 0;

    // Cache center position in absolute page-coordinates to prevent translation feedback loops
    let baseCenterX = 0;
    let baseCenterY = 0;

    const updatePosition = () => {
      const ease = 0.15; // Smooth interpolation

      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      currentStretch += (targetStretch - currentStretch) * ease;
      currentAngle += (targetAngle - currentAngle) * ease;

      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) rotate(${currentAngle.toFixed(3)}rad) scale3d(${currentStretch.toFixed(3)}, ${(2 - currentStretch).toFixed(3)}, 1)`;
      
      rafId = requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (e) => {
      // Calculate cursor position in document-space coordinates
      const cursorX = e.clientX + window.scrollX;
      const cursorY = e.clientY + window.scrollY;

      const deltaX = (cursorX - baseCenterX) * strength;
      const deltaY = (cursorY - baseCenterY) * strength;

      targetX = deltaX;
      targetY = deltaY;

      // Calculate distance for stretch magnitude
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      targetAngle = Math.atan2(deltaY, deltaX) * 0.08; // Rotate slightly towards cursor direction
      targetStretch = 1 + Math.min(0.04, distance / 500); // up to 4% stretch (caps distortion)
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      targetStretch = 1;
      targetAngle = 0;

      // Allow loop to settle down to 0, then reset style transition
      setTimeout(() => {
        if (targetX === 0 && targetY === 0 && el) {
          el.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
          el.style.transform = 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)';
        }
      }, 400);
    };

    const handleMouseEnter = () => {
      el.style.transition = 'none';
      const rect = el.getBoundingClientRect();
      
      // Cache base layout center coordinates including current page scroll position
      baseCenterX = rect.left + rect.width / 2 + window.scrollX;
      baseCenterY = rect.top + rect.height / 2 + window.scrollY;
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseenter', handleMouseEnter);

    rafId = requestAnimationFrame(updatePosition);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [strength]);

  return ref;
};
