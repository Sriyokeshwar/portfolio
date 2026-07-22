import React, { useEffect, useState } from 'react';
import { useIntersectionReveal } from '../../hooks/useIntersectionReveal';

export const AnimatedCounter = ({ value, duration = 2000, suffix = '', decimal = false }) => {
  const { ref, isVisible } = useIntersectionReveal();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const target = Number(value);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = progress * target;

      setCount(decimal ? Number(current.toFixed(2)) : Math.floor(current));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);
  }, [isVisible, value, duration, decimal]);

  return (
    <span ref={ref} className="font-heading font-bold text-3xl md:text-4xl text-text-primary">
      {count}
      {suffix}
    </span>
  );
};
