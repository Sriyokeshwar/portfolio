import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const FloatingBoxes = () => {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Select all the boxes
    const boxes = containerRef.current.querySelectorAll('.floating-box-item');

    boxes.forEach((box, index) => {
      const speed = parseFloat(box.getAttribute('data-speed')) || 1;
      const rotateSpeed = parseFloat(box.getAttribute('data-rotate')) || 0.5;

      // Translate dynamically based on scroll progress
      gsap.fromTo(
        box,
        {
          yPercent: 0,
          rotate: index * 45,
        },
        {
          yPercent: -150 * speed,
          rotate: (index * 45) + (360 * rotateSpeed),
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === document.body) {
          trigger.kill();
        }
      });
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  // 10 Floating Boxes defined with distinct sizes, z-indices, positions, scroll speeds, glows, and blur depths.
  const boxesData = [
    { size: 'w-24 h-24 md:w-32 md:h-32', top: '10%', left: '8%', speed: 0.8, rotate: 0.3, zIndex: 'z-0', glow: 'shadow-[0_0_20px_rgba(249,115,22,0.15)]', border: 'from-primary/30 to-transparent', blur: 'backdrop-blur-sm' },
    { size: 'w-36 h-36 md:w-48 md:h-48', top: '25%', left: '75%', speed: 1.2, rotate: -0.4, zIndex: 'z-30', glow: 'shadow-[0_0_25px_rgba(6,182,212,0.15)]', border: 'from-secondary/30 to-transparent', blur: 'backdrop-blur-md' },
    { size: 'w-20 h-20 md:w-28 md:h-28', top: '45%', left: '12%', speed: 0.6, rotate: 0.6, zIndex: 'z-0', glow: 'shadow-[0_0_15px_rgba(139,92,246,0.15)]', border: 'from-accent/30 to-transparent', blur: 'backdrop-blur-[2px]' },
    { size: 'w-40 h-40 md:w-56 md:h-56', top: '60%', left: '68%', speed: 1.5, rotate: -0.2, zIndex: 'z-30', glow: 'shadow-[0_0_30px_rgba(249,115,22,0.2)]', border: 'from-primary/45 to-transparent', blur: 'backdrop-blur-lg' },
    { size: 'w-16 h-16 md:w-24 md:h-24', top: '78%', left: '4%', speed: 0.9, rotate: 0.8, zIndex: 'z-0', glow: 'shadow-[0_0_15px_rgba(6,182,212,0.1)]', border: 'from-secondary/20 to-transparent', blur: 'backdrop-blur-sm' },
    { size: 'w-32 h-32 md:w-40 md:h-40', top: '90%', left: '80%', speed: 1.1, rotate: -0.5, zIndex: 'z-30', glow: 'shadow-[0_0_25px_rgba(139,92,246,0.2)]', border: 'from-accent/40 to-transparent', blur: 'backdrop-blur-md' },
    { size: 'w-28 h-28 md:w-36 md:h-36', top: '115%', left: '15%', speed: 0.75, rotate: 0.35, zIndex: 'z-0', glow: 'shadow-[0_0_20px_rgba(6,182,212,0.15)]', border: 'from-secondary/30 to-transparent', blur: 'backdrop-blur-sm' },
    { size: 'w-44 h-44 md:w-60 md:h-60', top: '135%', left: '72%', speed: 1.4, rotate: -0.3, zIndex: 'z-30', glow: 'shadow-[0_0_35px_rgba(249,115,22,0.25)]', border: 'from-primary/30 to-transparent', blur: 'backdrop-blur-xl' },
    { size: 'w-24 h-24 md:w-32 md:h-32', top: '160%', left: '5%', speed: 0.95, rotate: 0.5, zIndex: 'z-0', glow: 'shadow-[0_0_20px_rgba(139,92,246,0.15)]', border: 'from-accent/30 to-transparent', blur: 'backdrop-blur-[3px]' },
    { size: 'w-36 h-36 md:w-44 md:h-44', top: '185%', left: '82%', speed: 1.05, rotate: -0.45, zIndex: 'z-30', glow: 'shadow-[0_0_25px_rgba(6,182,212,0.2)]', border: 'from-secondary/40 to-transparent', blur: 'backdrop-blur-md' },
  ];

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {boxesData.map((box, index) => (
        <div
          key={index}
          className={`absolute floating-box-item ${box.size} ${box.zIndex} ${box.blur} ${box.glow} rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center p-[1px]`}
          style={{
            top: box.top,
            left: box.left,
            willChange: 'transform',
          }}
          data-speed={box.speed}
          data-rotate={box.rotate}
        >
          {/* Inner gradient border clip simulation */}
          <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${box.border} p-1 opacity-20`} />
        </div>
      ))}
    </div>
  );
};
