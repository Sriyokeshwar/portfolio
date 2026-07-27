import { useRef, useEffect } from 'react';

export const useTiltEffect = (maxAngle = 8) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    // Mouse coordinates inside card (percentages from 0 to 100)
    let currentMouseX = 50;
    let currentMouseY = 50;
    let targetMouseX = 50;
    let targetMouseY = 50;

    let lastScrollY = window.scrollY;
    let scrollSpeed = 0;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollSpeed = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Update CSS variables and style transforms using smooth easing
    const updateTransforms = () => {
      const ease = 0.08; // Smooth inertia

      // Decay scroll speed effect smoothly so it springs back to 0
      scrollSpeed *= 0.92;

      // Scroll-tilt effect: scrolling down (positive speed) tilts the card back (negative X rotation)
      const scrollTilt = Math.max(-12, Math.min(12, scrollSpeed * 0.12));

      currentX += (targetX - scrollTilt - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      currentMouseX += (targetMouseX - currentMouseX) * ease;
      currentMouseY += (targetMouseY - currentMouseY) * ease;

      // Apply 3D perspective rotation
      el.style.transform = `perspective(1000px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      
      // Update mouse percentages on element for dynamic lighting/reflections
      el.style.setProperty('--mx', `${currentMouseX.toFixed(2)}%`);
      el.style.setProperty('--my', `${currentMouseY.toFixed(2)}%`);

      rafId = requestAnimationFrame(updateTransforms);
    };

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Set target rotation angles based on cursor offset
      targetX = ((y - centerY) / centerY) * -maxAngle;
      targetY = ((x - centerX) / centerX) * maxAngle;

      // Set mouse position percentages inside card (0 to 100)
      targetMouseX = (x / rect.width) * 100;
      targetMouseY = (y / rect.height) * 100;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      targetMouseX = 50;
      targetMouseY = 50;
      
      setTimeout(() => {
        if (targetX === 0 && targetY === 0 && el) {
          el.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
          el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }
      }, 500);
    };

    const handleMouseEnter = () => {
      el.style.transition = 'none';
    };

    // Mobile Gyroscope support
    const handleOrientation = (e) => {
      const { beta, gamma } = e;
      if (beta === null || gamma === null) return;

      const maxTilt = 20;
      let tiltX = (beta - 45) / 1.5;
      let tiltY = gamma / 1.5;

      tiltX = Math.max(-maxTilt, Math.min(maxTilt, tiltX));
      tiltY = Math.max(-maxTilt, Math.min(maxTilt, tiltY));

      targetX = -tiltX * (maxAngle / maxTilt);
      targetY = tiltY * (maxAngle / maxTilt);

      targetMouseX = 50 + (tiltY / maxTilt) * 50;
      targetMouseY = 50 + (tiltX / maxTilt) * 50;
    };

    // Mobile Touch Parallax support
    const handleTouchMove = (e) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = el.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      targetX = ((y - centerY) / centerY) * -(maxAngle * 0.5);
      targetY = ((x - centerX) / centerX) * (maxAngle * 0.5);

      targetMouseX = (x / rect.width) * 100;
      targetMouseY = (y / rect.height) * 100;
    };

    if (!isTouchDevice) {
      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);
      el.addEventListener('mouseenter', handleMouseEnter);
    } else {
      el.addEventListener('touchmove', handleTouchMove, { passive: true });
      el.addEventListener('touchend', handleMouseLeave, { passive: true });
      
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function'
      ) {
        DeviceOrientationEvent.requestPermission()
          .then((response) => {
            if (response === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    }

    rafId = requestAnimationFrame(updateTransforms);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      if (!isTouchDevice) {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.removeEventListener('mouseenter', handleMouseEnter);
      } else {
        el.removeEventListener('touchmove', handleTouchMove);
        el.removeEventListener('touchend', handleMouseLeave);
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, [maxAngle]);

  return ref;
};
