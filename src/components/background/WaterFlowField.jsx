import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { tokens } from '../../theme/tokens';

export const WaterFlowField = ({ count = 25 }) => {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse position relative to canvas
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Define flow grid lines/paths
    // We'll generate vertical grid channels where droplets flow.
    const spacing = 120;
    const getGridPaths = () => {
      const paths = [];
      const cols = Math.ceil(canvas.width / spacing) + 1;
      for (let i = 0; i < cols; i++) {
        paths.push(i * spacing);
      }
      return paths;
    };

    let cols = getGridPaths();

    // Re-calculate paths on resize
    const handleResizePaths = () => {
      cols = getGridPaths();
    };
    window.addEventListener('resize', handleResizePaths);

    // Initialize droplets
    // Droplet properties: x, y, targetX, speed, size, depth (1 to 3), opacity, color, flowState
    const droplets = [];
    const createDroplet = (yPos = null) => {
      const depth = Math.floor(Math.random() * 3) + 1; // 1 = foreground, 3 = background (blurry)
      const colIndex = Math.floor(Math.random() * cols.length);
      const x = cols[colIndex] || Math.random() * canvas.width;
      
      return {
        id: Math.random(),
        x,
        y: yPos !== null ? yPos : Math.random() * canvas.height,
        colIndex,
        depth,
        size: depth === 1 ? 3 : depth === 2 ? 2 : 1.2,
        speed: (Math.random() * 1.5 + 0.8) / depth, // deeper is slower
        opacity: depth === 1 ? 0.7 : depth === 2 ? 0.5 : 0.3,
        glowColor: depth === 1 ? '#60a5fa' : depth === 2 ? '#a855f7' : '#ec4899', // aurora blue, violet, pink
        trail: [],
        maxTrail: depth === 1 ? 12 : 8,
        splitCooldown: 0,
      };
    };

    for (let i = 0; i < count; i++) {
      droplets.push(createDroplet());
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw faint vertical network grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      cols.forEach((colX) => {
        ctx.beginPath();
        ctx.moveTo(colX, 0);
        ctx.lineTo(colX, canvas.height);
        ctx.stroke();
      });

      const mouse = mouseRef.current;

      // Update and draw droplets
      for (let i = droplets.length - 1; i >= 0; i--) {
        const d = droplets[i];

        // Store trail history
        d.trail.push({ x: d.x, y: d.y });
        if (d.trail.length > d.maxTrail) {
          d.trail.shift();
        }

        // Standard downward flow
        d.y += d.speed;

        // Interaction with mouse (repel or attract depending on primary/secondary hover)
        if (mouse.active) {
          const dx = mouse.x - d.x;
          const dy = mouse.y - d.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            // Nixflows repulsion / attraction based on distance
            const force = (150 - dist) / 150;
            
            // Attract slightly or repel
            // Let's repel foreground droplets (depth=1) and attract background ones
            if (d.depth === 1) {
              // Repel
              d.x -= (dx / dist) * force * 2.5;
            } else {
              // Attract
              d.x += (dx / dist) * force * 1.5;
            }
          }
        }

        // Smoothly snap back to grid paths if not pushed away
        const targetX = cols[d.colIndex] || d.x;
        const diffX = targetX - d.x;
        d.x += diffX * 0.05; // ease back to grid line

        // Handle path split (spawn another droplet at intersection)
        d.splitCooldown--;
        if (d.splitCooldown <= 0 && Math.random() < 0.002 && droplets.length < count * 1.5) {
          d.splitCooldown = 300; // avoid spamming
          const newD = createDroplet(d.y);
          newD.x = d.x;
          newD.colIndex = (d.colIndex + (Math.random() > 0.5 ? 1 : -1) + cols.length) % cols.length;
          droplets.push(newD);
        }

        // Draw trail
        if (d.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(d.trail[0].x, d.trail[0].y);
          for (let j = 1; j < d.trail.length; j++) {
            ctx.lineTo(d.trail[j].x, d.trail[j].y);
          }
          ctx.strokeStyle = d.glowColor;
          ctx.globalAlpha = d.opacity * 0.3;
          ctx.lineWidth = d.size;
          ctx.stroke();
        }

        // Draw droplet node
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = d.glowColor;
        ctx.globalAlpha = d.opacity;
        
        // Add glowing bloom on canvas (only for foreground depth to save performance)
        if (d.depth === 1) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = d.glowColor;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();

        // Recycle droplets that go off screen
        if (d.y > canvas.height + 20) {
          droplets[i] = createDroplet(-10);
        }
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', handleResizePaths);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{ zIndex: tokens.zIndex.waterFlow }}
      className="fixed inset-0 pointer-events-none opacity-60"
    />
  );
};
