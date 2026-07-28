import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from '../components/shared/SectionHeading';
import { skillCategories, skills, processSteps } from '../data/skills';
import { GlassCard } from '../components/ui/GlassCard';
import { useCursor } from '../context/CursorContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Search } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Core skills that float with premium physics
// Categories color mapping and styling properties
const keySkills = ['React.js', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'Framer Motion', 'Git', 'ChatGPT'];

const getCategoryStyle = (skillName, category) => {
  const isKey = keySkills.includes(skillName);
  const size = isKey 
    ? 'text-xs md:text-sm px-3.5 py-2 font-bold border-white/20' 
    : 'text-[10px] md:text-[11px] px-2.5 py-1.5';
    
  switch (category) {
    case 'frontend':
      return {
        color: isKey ? 'rgba(56, 189, 248, 0.35)' : 'rgba(56, 189, 248, 0.15)',
        glow: isKey ? 'shadow-[0_0_24px_rgba(56,189,248,0.25)]' : 'shadow-[0_0_16px_rgba(56,189,248,0.10)]',
        rgb: '56, 189, 248', // Sky blue
        size
      };
    case 'backend':
      return {
        color: isKey ? 'rgba(52, 211, 153, 0.35)' : 'rgba(52, 211, 153, 0.15)',
        glow: isKey ? 'shadow-[0_0_24px_rgba(52,211,153,0.25)]' : 'shadow-[0_0_16px_rgba(52,211,153,0.10)]',
        rgb: '52, 211, 153', // Emerald green
        size
      };
    case 'database':
      return {
        color: isKey ? 'rgba(192, 132, 252, 0.35)' : 'rgba(192, 132, 252, 0.15)',
        glow: isKey ? 'shadow-[0_0_24px_rgba(192,132,252,0.25)]' : 'shadow-[0_0_16px_rgba(192,132,252,0.10)]',
        rgb: '192, 132, 252', // Purple/Amethyst
        size
      };
    case 'languages':
      return {
        color: isKey ? 'rgba(251, 146, 60, 0.35)' : 'rgba(251, 146, 60, 0.15)',
        glow: isKey ? 'shadow-[0_0_24px_rgba(251,146,60,0.25)]' : 'shadow-[0_0_16px_rgba(251,146,60,0.10)]',
        rgb: '251, 146, 60', // Orange/Amber
        size
      };
    case 'tools':
      return {
        color: isKey ? 'rgba(255, 255, 255, 0.20)' : 'rgba(255, 255, 255, 0.10)',
        glow: isKey ? 'shadow-[0_0_20px_rgba(255,255,255,0.15)]' : 'shadow-[0_0_12px_rgba(255,255,255,0.08)]',
        rgb: '255, 255, 255', // White/Slate
        size
      };
    case 'ai':
      return {
        color: isKey ? 'rgba(244, 63, 94, 0.35)' : 'rgba(244, 63, 94, 0.15)',
        glow: isKey ? 'shadow-[0_0_24px_rgba(244, 63, 94, 0.25)]' : 'shadow-[0_0_16px_rgba(244,63,94,0.10)]',
        rgb: '244, 63, 94', // Rose/Pink
        size
      };
    default:
      return {
        color: 'rgba(255, 255, 255, 0.10)',
        glow: '',
        rgb: '255, 255, 255',
        size
      };
  }
};

export const Skills = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { setCursor, resetCursor } = useCursor();
  const prefersReducedMotion = useReducedMotion();

  const containerRef = useRef(null);
  const cloudRef = useRef(null);
  const chipsRef = useRef([]);

  // Filter skills list
  const filteredSkills = skills.filter((sk) => {
    const matchesCategory = activeTab === 'all' || sk.category === activeTab;
    const matchesSearch = sk.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const [radius, setRadius] = useState(230);
  const baseCoords = useRef([]);
  const rotationSpeed = useRef({ x: 0.001, y: 0.003 });
  const mousePos = useRef({ x: 0, y: 0, isInside: false });
  const offsets = useRef(skills.map(() => ({ x: 0, y: 0 })));
  const requestRef = useRef();

  // Responsive radius adjustment
  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setRadius(135);
      } else if (window.innerWidth < 768) {
        setRadius(175);
      } else {
        setRadius(230);
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Compute uniform 3D sphere coordinates using Fibonacci distribution
  useEffect(() => {
    const N = skills.length;
    const coords = [];
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(-1 + (2 * i + 1) / N);
      const theta = Math.sqrt(N * Math.PI) * phi;
      coords.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
      });
    }
    baseCoords.current = coords;
  }, []);

  // Update rotation angles and compute final render styles at 60fps
  useEffect(() => {
    if (prefersReducedMotion) {
      baseCoords.current.forEach((coord, i) => {
        const chip = chipsRef.current[i];
        if (!chip) return;
        const rx = coord.x * radius;
        const ry = coord.y * radius;
        const rz = coord.z * radius;
        const depthScale = ((rz + radius) / (2 * radius)) * 0.4 + 0.8;

        chip.style.transform = `translate3d(${rx}px, ${ry}px, ${rz}px) translate(-50%, -50%) scale(${depthScale})`;
        chip.style.opacity = ((rz + radius) / (2 * radius)) * 0.6 + 0.4;
        chip.style.zIndex = Math.round(rz + radius + 200);
      });
      return;
    }

    let angleX = 0;
    let angleY = 0;

    const animate = () => {
      angleX += rotationSpeed.current.x;
      angleY += rotationSpeed.current.y;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      baseCoords.current.forEach((coord, i) => {
        const chip = chipsRef.current[i];
        if (!chip) return;

        // 3D rotation projection
        const x1 = coord.x * cosY - coord.z * sinY;
        const z1 = coord.x * sinY + coord.z * cosY;
        const y2 = coord.y * cosX - z1 * sinX;
        const z2 = coord.y * sinX + z1 * cosX;

        const rx = x1 * radius;
        const ry = y2 * radius;
        const rz = z2 * radius;

        let pullX = 0;
        let pullY = 0;
        let hoverScale = 1.0;
        let intensity = 0;

        // Magnetic Attraction logic when cursor is inside the rotator frame
        if (mousePos.current.isInside) {
          const dx = mousePos.current.x - rx;
          const dy = mousePos.current.y - ry;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const activeDistance = 120;

          if (distance < activeDistance) {
            const factor = 1 - distance / activeDistance;
            pullX = dx * factor * 0.7;
            pullY = dy * factor * 0.7;
            hoverScale = 1.0 + factor * 0.35;
            intensity = factor;
          }
        }

        // Interpolate offset for elastic motion
        const offset = offsets.current[i];
        if (offset) {
          offset.x += (pullX - offset.x) * 0.15;
          offset.y += (pullY - offset.y) * 0.15;
        }

        const renderX = rx + (offset ? offset.x : 0);
        const renderY = ry + (offset ? offset.y : 0);

        // Scale factor mapping Z-depth
        const depthScale = ((rz + radius) / (2 * radius)) * 0.4 + 0.8;
        const finalScale = depthScale * hoverScale;

        // Check if item matches current filtering & search
        const sk = skills[i];
        if (!sk) return;
        const matchesSearch = 
          sk.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (activeTab === 'all' || sk.category === activeTab);

        let finalOpacity;
        let finalBlur;

        if (matchesSearch) {
          finalOpacity = ((rz + radius) / (2 * radius)) * 0.65 + 0.35;
          finalBlur = Math.max(0, (-rz / radius) * 3.0);
        } else {
          finalOpacity = 0.08;
          finalBlur = 5.0;
        }

        // Apply style directives directly to the DOM to bypass React re-render overhead
        chip.style.transform = `translate3d(${renderX}px, ${renderY}px, ${rz}px) translate(-50%, -50%) scale(${finalScale})`;
        chip.style.opacity = finalOpacity;
        chip.style.filter = finalBlur > 0.1 ? `blur(${finalBlur.toFixed(1)}px)` : 'none';
        chip.style.zIndex = Math.round(rz + radius + 200);

        const styleProps = getCategoryStyle(sk.name, sk.category);
        if (mousePos.current.isInside && intensity > 0.05) {
          chip.style.borderColor = `rgba(${styleProps.rgb}, ${0.1 + intensity * 0.5})`;
          chip.style.boxShadow = `0 0 ${12 + intensity * 18}px rgba(${styleProps.rgb}, ${intensity * 0.35})`;
        } else {
          chip.style.borderColor = '';
          chip.style.boxShadow = '';
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [radius, prefersReducedMotion, searchQuery, activeTab]);

  const handleMouseMove = (e) => {
    if (!cloudRef.current) return;
    const rect = cloudRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left - rect.width / 2;
    const my = e.clientY - rect.top - rect.height / 2;
    mousePos.current = { x: mx, y: my, isInside: true };

    if (!prefersReducedMotion) {
      rotationSpeed.current = {
        x: (my / (rect.height / 2)) * 0.015,
        y: (mx / (rect.width / 2)) * 0.015,
      };

      gsap.to(cloudRef.current, {
        rotateY: (mx / rect.width) * 15,
        rotateX: -(my / rect.height) * 15,
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    mousePos.current.isInside = false;

    if (!prefersReducedMotion) {
      gsap.to(rotationSpeed.current, {
        x: 0.001,
        y: 0.003,
        duration: 1.5,
        ease: 'power2.out',
      });

      gsap.to(cloudRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 1,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section
      ref={containerRef}
      id="skills"
      className="py-24 px-6 relative z-10 overflow-hidden bg-[#050816]"
    >
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        <SectionHeading
          badge="Capabilities & Tools"
          title="Technical Ecosystem"
          subtitle="A holographic visual representation of my core technical stack, engineering languages, and tools."
        />

        {/* Controls Panel */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter skill or tool..."
              className="w-full pl-10 pr-4 py-2 rounded-full glass-panel text-text-primary placeholder-text-muted text-xs focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          {/* Categories Tab selector */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {skillCategories.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  onMouseEnter={() => setCursor('hover-link')}
                  onMouseLeave={resetCursor}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-[0_0_30px_rgba(96,165,250,0.18)]'
                      : 'text-text-muted hover:text-text-primary glass-panel border border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Interactive Floating Cloud Frame */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-[520px] md:h-[550px] rounded-3xl glass-panel border border-white/10 overflow-hidden bg-white/[0.01] flex items-center justify-center"
          style={{ perspective: '800px' }}
        >
          {/* Subtle Cyber Background Lines */}
          <div className="absolute inset-0 pointer-events-none bg-grid-pattern opacity-10" />

          {/* 3D Rotator Node */}
          <div
            ref={cloudRef}
            className="relative w-full h-full transform-style-preserve-3d"
          >
            {skills.map((sk, idx) => {
              const styleProps = getCategoryStyle(sk.name, sk.category);
              return (
                <div
                  key={`${sk.name}-${sk.category}`}
                  ref={(el) => (chipsRef.current[idx] = el)}
                  className={`absolute ${styleProps.size} rounded-full glass-panel border border-white/10 hover:border-primary/50 flex items-center justify-center select-none cursor-grab active:cursor-grabbing font-mono transition-colors duration-300 ${styleProps.glow}`}
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate3d(0px, 0px, 0px) translate(-50%, -50%) scale(1)',
                    transformStyle: 'preserve-3d',
                    backgroundColor: styleProps.color,
                  }}
                  onMouseEnter={() => setCursor('hover-link')}
                  onMouseLeave={resetCursor}
                >
                  <span className="text-text-primary drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-bold">
                    {sk.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>


        {/* Engineering Methodology */}
        <div className="pt-12 border-t border-white/10 space-y-8">
          <h3 className="text-center font-heading text-xl font-bold text-text-primary">
            Engineering Methodology
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {processSteps.map((proc) => (
              <GlassCard
                key={proc.step}
                glowColor="rgba(168, 85, 247, 0.15)"
                className="p-6 space-y-2 border border-white/10 hover:border-accent/40"
              >
                <span className="text-2xl font-bold font-mono text-primary/40 block">
                  {proc.step}
                </span>
                <h4 className="text-base font-bold font-heading text-text-primary">
                  {proc.title}
                </h4>
                <p className="text-xs text-text-muted leading-relaxed">
                  {proc.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
