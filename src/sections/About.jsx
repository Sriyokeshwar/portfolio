import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from '../components/shared/SectionHeading';
import { GlassCard } from '../components/ui/GlassCard';
import { AnimatedCounter } from '../components/shared/AnimatedCounter';
import { profile } from '../data/profile';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const journeySteps = [
  {
    step: '01',
    title: 'CS Foundations',
    short: 'Foundations',
    desc: 'Mastered core algorithms, databases, and computer science concepts during B.Sc Computer Science at A.V.C. College (CGPA 7.94). Established strong algorithmic problem-solving habits.',
  },
  {
    step: '02',
    title: 'Modern Frontend',
    short: 'Frontend',
    desc: 'Deep-dived into modern JavaScript ES6+, React, component states, and responsive styling. Crafted responsive layouts with clean styling rules.',
  },
  {
    step: '03',
    title: 'Full Stack MERN',
    short: 'MERN Stack',
    desc: 'Engineered production-grade REST APIs, MongoDB database collections, and Express endpoints during internships at NoviTech R&D and Vebbox Software Solutions.',
  },
  {
    step: '04',
    title: 'AI Engineering',
    short: 'AI Systems',
    desc: 'Earned IBM Prompt Engineering certification. Utilized LLMs and advanced prompt design patterns to accelerate feature releases and system optimization.',
  },
  {
    step: '05',
    title: 'VisionOS-Tier UI',
    short: 'Interaction',
    desc: 'Crafting premium interactive interfaces featuring glassmorphism, depth transforms, and optimized micro-interactions targeting 60FPS performance.',
  },
];

export const About = () => {
  const containerRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
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

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    // Pin the about container while milestones scroll
    const pinTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: `+=${journeySteps.length * 80}%`,
      pin: true,
      pinSpacing: true,
      scrub: true,
    });

    // Create animations for step activation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${journeySteps.length * 80}%`,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          // Map progress to active index (0 to 4)
          const index = Math.min(
            Math.floor(progress * journeySteps.length),
            journeySteps.length - 1
          );
          setActiveIndex(index);
        },
      },
    });

    // Animate the vertical progress line filling up
    tl.fromTo(
      '.timeline-progress-indicator',
      { scaleY: 0 },
      { scaleY: 1, ease: 'none', duration: 1 }
    );

    return () => {
      pinTrigger.kill();
      tl.kill();
    };
  }, [prefersReducedMotion, isMobile]);

  // Mobile milestone scroll entrance reveal
  useEffect(() => {
    if (!isMobile || prefersReducedMotion) return;

    const steps = gsap.utils.toArray('.about-mobile-step');
    const scrollTriggers = steps.map((step) => {
      return gsap.fromTo(step,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: step,
            start: 'top bottom-=40px',
            toggleActions: 'play none none reverse',
          }
        }
      ).scrollTrigger;
    });

    return () => {
      scrollTriggers.forEach(t => t && t.kill());
    };
  }, [isMobile, prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-24 px-6 relative z-10 bg-[#050816] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        <SectionHeading
          badge="Story & Evolution"
          title="Driven by Craft, Powered by Code"
          subtitle="A progressive journey from computer science fundamentals to building high-craft full stack web applications."
        />

        {isMobile ? (
          // Mobile View: Simple chronological vertical stack
          <div className="space-y-8 pl-4 border-l border-white/10 relative">
            {journeySteps.map((j) => (
              <div key={j.step} className="relative space-y-2 about-mobile-step">
                <span className="absolute -left-[25px] top-1.5 w-3.5 h-3.5 rounded-full bg-primary border-2 border-bg-dark" />
                <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-wider">
                  Step {j.step} — {j.short}
                </span>
                <h3 className="text-lg font-bold font-heading text-text-primary">
                  {j.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  {j.desc}
                </p>
              </div>
            ))}
          </div>
        ) : (
          // Desktop View: Split Screen storytelling timeline
          <div className="grid grid-cols-12 gap-12 items-center min-h-[50vh]">
            
            {/* Left Column: Interactive milestones timeline list */}
            <div ref={leftColumnRef} className="col-span-5 relative pl-8 border-l border-white/10 h-full flex flex-col justify-between py-6">
              
              {/* GSAP driven background scroll indicator line */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/5 origin-top" />
              <div 
                className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-accent to-secondary origin-top timeline-progress-indicator"
                style={{ transformScaleY: 0 }}
              />

              {journeySteps.map((j, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={j.step}
                    className={`relative cursor-pointer transition-all duration-500 py-3 ${
                      isActive ? 'translate-x-3' : 'opacity-40 hover:opacity-75'
                    }`}
                  >
                    {/* Active Glow Dot */}
                    <span 
                      className={`absolute -left-[41px] top-1/2 -translate-y-1/2 w-4.5 h-4.5 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
                        isActive 
                          ? 'bg-primary border-primary shadow-[0_0_12px_rgba(96,165,250,0.18)]' 
                          : 'bg-bg-dark border-white/20'
                      }`}
                    >
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
                    </span>

                    <span className={`text-[10px] font-mono uppercase tracking-widest ${isActive ? 'text-primary font-bold' : 'text-text-muted'}`}>
                      Step {j.step}
                    </span>
                    <h3 className={`text-xl font-bold font-heading transition-colors duration-500 ${isActive ? 'text-text-primary' : 'text-text-muted'}`}>
                      {j.title}
                    </h3>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Dynamic floating descriptions & Portrait anchor */}
            <div ref={rightColumnRef} className="col-span-7 flex flex-col justify-center items-center relative min-h-[360px] w-full">
              {journeySteps.map((j, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={j.step}
                    className={`absolute inset-x-0 transition-all duration-700 transform ${
                      isActive 
                        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto z-10' 
                        : 'opacity-0 translate-y-8 scale-95 pointer-events-none z-0'
                    }`}
                  >
                    <GlassCard 
                      glowColor={idx % 2 === 0 ? 'rgba(96,165,250,0.2)' : 'rgba(168,85,247,0.2)'}
                      className="p-8 space-y-4 border border-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-primary uppercase font-bold tracking-wider">
                          Journey Milestone
                        </span>
                        <span className="text-3xl font-extrabold font-mono text-white/10">
                          {j.step}
                        </span>
                      </div>
                      <h4 className="text-2xl font-extrabold font-heading text-text-primary">
                        {j.title}
                      </h4>
                      <p className="text-sm text-text-muted leading-relaxed">
                        {j.desc}
                      </p>
                    </GlassCard>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Counter Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-white/10">
          {profile.stats.map((stat) => (
            <GlassCard key={stat.label} className="text-center p-5 border border-white/10">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                decimal={stat.decimal}
              />
              <p className="text-xs md:text-sm font-medium text-text-muted mt-2">
                {stat.label}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
