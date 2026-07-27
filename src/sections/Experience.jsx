import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from '../components/shared/SectionHeading';
import { GlassCard } from '../components/ui/GlassCard';
import { experience } from '../data/experience';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const Experience = () => {
  const containerRef = useRef(null);
  const cardsWrapperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP Sliding & Stacking Timeline
  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    const cards = gsap.utils.toArray('.experience-stack-card');
    
    // Pin section
    const pinTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: `+=${(cards.length - 1) * 100}%`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${(cards.length - 1) * 100}%`,
        scrub: 1,
        onUpdate: (self) => {
          const index = Math.min(
            Math.floor(self.progress * cards.length),
            cards.length - 1
          );
          setActiveIndex(index);
        },
      }
    });

    cards.forEach((card, idx) => {
      if (idx === 0) return;

      // Push preceding card back into background depth
      tl.to(`.exp-card-${idx - 1}`, {
        scale: 0.92,
        opacity: 0.45,
        filter: 'blur(6px)',
        yPercent: -10,
        duration: 1,
      }, idx - 1);

      // Slide current card forward
      tl.fromTo(`.exp-card-${idx}`,
        {
          yPercent: 120,
          scale: 0.95,
          opacity: 0,
        },
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
        },
        idx - 1
      );
    });

    return () => {
      pinTrigger.kill();
      tl.kill();
    };
  }, [prefersReducedMotion, isMobile]);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="py-24 px-6 relative z-10 bg-[#050816] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        <SectionHeading
          badge="Career History"
          title="Industry Experience"
          subtitle="Real-world internship exposure building MERN stack features and backend solutions end-to-end."
        />

        {isMobile ? (
          // Mobile View: Chronological responsive list
          <div className="space-y-8 pl-4 border-l border-white/10 relative">
            {experience.map((exp, idx) => (
              <div key={exp.id} className="relative space-y-3">
                <span className="absolute -left-[24px] top-1.5 w-3.5 h-3.5 rounded-full bg-secondary border-2 border-bg-dark" />
                <div>
                  <span className="text-[10px] font-mono text-secondary uppercase font-bold tracking-wider">
                    {exp.duration} — {exp.type}
                  </span>
                  <h3 className="text-lg font-bold font-heading text-text-primary">
                    {exp.role}
                  </h3>
                  <h4 className="text-xs font-semibold text-primary">
                    {exp.company}
                  </h4>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  {exp.summary}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.techStack.map((tech) => (
                    <span key={tech} className="text-[9px] font-mono glass-panel px-2 py-0.5 rounded text-text-muted border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Desktop View: Pinned card overlapping sliding deck
          <div className="grid grid-cols-12 gap-8 items-center h-[50vh]">
            
            {/* Left Timeline Guide (Visual Connection) */}
            <div className="col-span-4 relative pl-6 border-l border-white/10 h-full flex flex-col justify-around py-4">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/5" />
              <div 
                className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-primary to-secondary transition-all duration-700" 
                style={{
                  height: `${((activeIndex + 1) / experience.length) * 100}%`,
                }}
              />

              {experience.map((exp, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={exp.id}
                    className={`relative transition-all duration-500 cursor-pointer ${
                      isActive ? 'translate-x-3' : 'opacity-30'
                    }`}
                  >
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${isActive ? 'text-primary font-bold' : 'text-text-muted'}`}>
                      {exp.duration}
                    </span>
                    <h4 className={`text-base font-bold font-heading transition-colors ${isActive ? 'text-text-primary' : 'text-text-muted'}`}>
                      {exp.company}
                    </h4>
                  </div>
                );
              })}
            </div>

            {/* Right Card Overlay Panel */}
            <div ref={cardsWrapperRef} className="col-span-8 relative w-full h-full flex items-center justify-center">
              {experience.map((exp, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={exp.id}
                    className={`experience-stack-card exp-card-${idx} absolute inset-0 w-full h-full flex items-center justify-center`}
                    style={{
                      zIndex: 10 + idx,
                      willChange: 'transform, opacity, filter',
                    }}
                  >
                    <GlassCard
                      glowColor={idx === 0 ? 'rgba(6, 182, 212, 0.2)' : 'rgba(249, 115, 22, 0.2)'}
                      className="p-8 space-y-5 w-full h-full flex flex-col justify-between border border-white/10 shadow-2xl relative"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-1.5 text-xs font-mono text-primary font-semibold uppercase">
                              <Briefcase className="w-3.5 h-3.5" />
                              <span>{exp.type}</span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-text-primary mt-1">
                              {exp.role}
                            </h3>
                            <h4 className="text-sm font-semibold text-secondary">
                              {exp.company}
                            </h4>
                          </div>
                          
                          <div className="flex items-center gap-1.5 glass-panel px-3 py-1.5 rounded-full text-xs text-text-muted font-mono">
                            <Calendar className="w-3.5 h-3.5 text-primary" />
                            <span>{exp.duration}</span>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                          {exp.summary}
                        </p>

                        <div className="space-y-2">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
                            Highlights
                          </span>
                          <ul className="space-y-1.5">
                            {exp.highlights.map((h, hIdx) => (
                              <li key={hIdx} className="flex items-start gap-2 text-xs text-text-secondary">
                                <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                        {exp.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono glass-panel px-2.5 py-1 rounded-md text-text-muted border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </GlassCard>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
