import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { tokens } from '../../theme/tokens';

export const SpaceBoxesField = ({ count = 40 }) => {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    lastScrollY.current = window.scrollY;

    // Create boxes
    // properties: x, y, size, angle, rotationSpeed, opacity, parallaxFactor, driftX, driftY
    const boxes = Array.from({ length: count }, () => {
      const depth = Math.random() * 3 + 1; // 1 = foreground (large, fast), 3 = background (small, slow)
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: (Math.random() * 8 + 4) / depth,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        opacity: (Math.random() * 0.25 + 0.1) / depth,
        parallaxFactor: (0.6 - (depth - 1) * 0.15), // foreground moves faster relative to scroll
        driftX: (Math.random() - 0.5) * 0.15,
        driftY: -Math.random() * 0.1 - 0.05, // slowly float upwards
      };
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isLight = document.documentElement.classList.contains('light');
      const rgbColor = isLight ? '15, 23, 42' : '255, 255, 255'; // opposite of background color

      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      boxes.forEach((b) => {
        // 1. Slow drift
        b.x += b.driftX;
        b.y += b.driftY;
        b.angle += b.rotationSpeed;

        // 2. Scroll Parallax: scroll down moves boxes up, scroll up moves boxes down
        b.y -= scrollDelta * b.parallaxFactor;

        // 3. Infinite wrap-around bounds check
        if (b.y < -50) {
          b.y = canvas.height + 20;
          b.x = Math.random() * canvas.width;
        } else if (b.y > canvas.height + 50) {
          b.y = -20;
          b.x = Math.random() * canvas.width;
        }

        if (b.x < -50) {
          b.x = canvas.width + 20;
        } else if (b.x > canvas.width + 50) {
          b.x = -20;
        }

        // Draw rotated square
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.angle);
        ctx.fillStyle = `rgba(${rgbColor}, ${b.opacity})`;
        ctx.fillRect(-b.size / 2, -b.size / 2, b.size, b.size);
        
        ctx.strokeStyle = `rgba(${rgbColor}, ${b.opacity * 0.6})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(-b.size / 2, -b.size / 2, b.size, b.size);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{ zIndex: tokens.zIndex.particles }}
      className="fixed inset-0 pointer-events-none opacity-50"
    />
  );
};
