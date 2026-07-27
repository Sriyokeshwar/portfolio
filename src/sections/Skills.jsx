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
const premiumSkills = [
  { name: 'React', color: 'rgba(6, 182, 212, 0.4)', glow: 'shadow-[0_0_20px_rgba(6,182,212,0.4)]', top: '15%', left: '10%', z: 80, size: 'text-sm px-4 py-2.5' },
  { name: 'Node.js', color: 'rgba(34, 197, 94, 0.4)', glow: 'shadow-[0_0_20px_rgba(34,197,94,0.4)]', top: '25%', left: '35%', z: -100, size: 'text-xs px-3.5 py-2' },
  { name: 'MongoDB', color: 'rgba(34, 197, 94, 0.4)', glow: 'shadow-[0_0_20px_rgba(34,197,94,0.4)]', top: '10%', left: '60%', z: 50, size: 'text-sm px-4 py-2.5' },
  { name: 'Express.js', color: 'rgba(139, 92, 246, 0.4)', glow: 'shadow-[0_0_20px_rgba(139,92,246,0.4)]', top: '30%', left: '80%', z: -60, size: 'text-xs px-3 py-2' },
  { name: 'Python', color: 'rgba(234, 179, 8, 0.4)', glow: 'shadow-[0_0_20px_rgba(234,179,8,0.4)]', top: '50%', left: '15%', z: -40, size: 'text-sm px-4 py-2.5' },
  { name: 'Java', color: 'rgba(239, 68, 68, 0.4)', glow: 'shadow-[0_0_20px_rgba(239,68,68,0.4)]', top: '65%', left: '42%', z: 90, size: 'text-sm px-4.5 py-3' },
  { name: 'Tailwind', color: 'rgba(6, 182, 212, 0.4)', glow: 'shadow-[0_0_20px_rgba(6,182,212,0.4)]', top: '48%', left: '72%', z: 30, size: 'text-xs px-3.5 py-2' },
  { name: 'GSAP', color: 'rgba(249, 115, 22, 0.4)', glow: 'shadow-[0_0_25px_rgba(249,115,22,0.5)]', top: '78%', left: '18%', z: 120, size: 'text-base px-5 py-3.5 font-bold border-primary/50' },
  { name: 'Framer Motion', color: 'rgba(139, 92, 246, 0.4)', glow: 'shadow-[0_0_25px_rgba(139,92,246,0.5)]', top: '75%', left: '65%', z: 110, size: 'text-base px-5 py-3.5 font-bold border-accent/50' },
  { name: 'Git & GitHub', color: 'rgba(255, 255, 255, 0.2)', glow: 'shadow-[0_0_15px_rgba(255,255,255,0.15)]', top: '80%', left: '44%', z: -120, size: 'text-xs px-3 py-2' },
];

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

  // GSAP Parallax Depth Scroll Trigger
  useEffect(() => {
    if (prefersReducedMotion) return;

    // Drifting animation loop
    chipsRef.current.forEach((chip, index) => {
      if (!chip) return;
      const speedFactor = (index % 3 === 0) ? 0.35 : (index % 2 === 0) ? 0.2 : 0.45;

      gsap.to(chip, {
        yPercent: -100 * speedFactor,
        rotate: (index % 2 === 0 ? 12 : -12),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Ambient idle drift
      gsap.fromTo(chip,
        { y: 0 },
        {
          y: 12,
          duration: 3 + (index * 0.4),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [prefersReducedMotion]);

  // Handle 3D Tilt of the whole Cloud on mouse hover
  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !cloudRef.current) return;
    const rect = cloudRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Tilt the container slightly based on mouse offsets
    gsap.to(cloudRef.current, {
      rotateY: (x / rect.width) * 15,
      rotateX: -(y / rect.height) * 15,
      duration: 0.8,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion || !cloudRef.current) return;
    gsap.to(cloudRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 1,
      ease: 'power2.out',
    });
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
                      ? 'bg-gradient-to-r from-primary to-amber-500 text-white shadow-glow'
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
            {premiumSkills.map((sk, idx) => {
              const matchesSearch = 
                sk.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (activeTab === 'all' || 
                 skills.find(s => s.name === sk.name)?.category === activeTab);

              return (
                <div
                  key={sk.name}
                  ref={(el) => (chipsRef.current[idx] = el)}
                  className={`absolute ${sk.size} rounded-full glass-panel border border-white/10 hover:border-primary/50 flex items-center justify-center select-none cursor-grab active:cursor-grabbing font-mono transition-all duration-700 ${sk.glow}`}
                  style={{
                    top: sk.top,
                    left: sk.left,
                    transform: `translateZ(${sk.z}px)`,
                    transformStyle: 'preserve-3d',
                    backgroundColor: sk.color,
                    opacity: matchesSearch ? 1 : 0.12,
                    filter: matchesSearch ? 'none' : 'blur(4px)',
                    zIndex: sk.z + 200,
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

        {/* Non-Premium Skills List */}
        <div className="pt-12 border-t border-white/10 space-y-6">
          <h3 className="text-center font-heading text-xl font-bold text-text-primary">
            Ecosystem Directory
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {filteredSkills.map((sk) => (
              <div
                key={sk.name}
                className="px-4 py-2 rounded-xl glass-panel border border-white/10 hover:border-primary/40 text-xs font-semibold text-text-primary transition-all duration-300"
              >
                {sk.name}
                {sk.level && (
                  <span className="ml-1.5 text-[10px] font-mono text-primary">
                    {sk.level}%
                  </span>
                )}
              </div>
            ))}
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
                glowColor="rgba(139, 92, 246, 0.15)"
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
