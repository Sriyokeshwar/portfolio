import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from '../components/shared/SectionHeading';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { ImageCompareSlider } from '../components/shared/ImageCompareSlider';
import { projects } from '../data/projects';
import { ExternalLink, Github, Sparkles, CheckCircle2, Layers, Cpu, AlertCircle, Lightbulb } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const { setCursor, resetCursor } = useCursor();
  const prefersReducedMotion = useReducedMotion();

  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive state detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP Pinned Card Stacking Animation
  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    const cards = gsap.utils.toArray('.project-stack-card');
    
    // Pin the entire projects block
    const pinTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${(cards.length - 1) * 100}%`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${(cards.length - 1) * 100}%`,
        scrub: 1,
      }
    });

    cards.forEach((card, idx) => {
      if (idx === 0) return;

      // Previous card transitions (fade out, scale down, blur)
      tl.to(`.project-card-${idx - 1}`, {
        scale: 0.9,
        opacity: 0.35,
        filter: 'blur(10px)',
        yPercent: -12,
        duration: 1,
      }, idx - 1);

      // Current card transitions (slide up, scale to 1)
      tl.fromTo(`.project-card-${idx}`,
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

  // Mobile / Tablet: Scroll-entrance reveal animation
  useEffect(() => {
    if (!isMobile || prefersReducedMotion) return;

    const cards = gsap.utils.toArray('.project-stack-card-mobile');
    
    const scrollTriggers = cards.map((card) => {
      return gsap.fromTo(card,
        { 
          y: 40, 
          opacity: 0,
          scale: 0.96
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=60px',
            toggleActions: 'play none none reverse',
          }
        }
      ).scrollTrigger;
    });

    return () => {
      scrollTriggers.forEach(t => t && t.kill());
    };
  }, [isMobile, prefersReducedMotion]);

  const openProjectModal = (proj) => {
    setSelectedProject(proj);
    setActiveTab('overview');
  };

  return (
    <section ref={sectionRef} id="projects" className="py-24 2xl:py-32 px-6 md:px-12 2xl:px-24 relative z-10 bg-[#050816] overflow-hidden">
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto space-y-12 md:space-y-16 2xl:space-y-24">
        <SectionHeading
          badge="Selected Works"
          title="Featured Projects"
          subtitle="Production-grade full stack MERN applications and frontend systems engineered with modern craft."
        />

        {/* Stacked Cards Container */}
        {isMobile ? (
          // Mobile Fallback: Standard scrolling flex column to keep 60FPS
          <div className="flex flex-col gap-8">
            {projects.map((proj, idx) => (
              <GlassCard
                key={proj.id}
                hoverGlow={false}
                glowColor={idx % 2 === 0 ? 'rgba(96, 165, 250, 0.2)' : 'rgba(168, 85, 247, 0.2)'}
                className="p-5 cursor-pointer border border-white/10 project-stack-card-mobile"
                contentClassName="flex flex-col gap-5"
                onClick={() => openProjectModal(proj)}
              >
                <div className="rounded-xl overflow-hidden aspect-video bg-bg-dark border border-white/10 relative">
                  <img src={proj.images[0]} alt={proj.title} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2 text-left">
                  <span className="text-[10px] font-mono text-primary font-semibold uppercase tracking-wider">
                    {proj.category} — {proj.year}
                  </span>
                  <h3 className="text-xl font-bold font-heading text-text-primary">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {proj.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.techStack.map((tech) => (
                      <span key={tech} className="text-[9px] font-mono glass-panel px-2 py-0.5 rounded text-text-muted border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  {proj.live && (
                    <Button
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      size="md"
                      icon={ExternalLink}
                      className="w-full sm:w-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Live Demo
                    </Button>
                  )}
                  {proj.github && (
                    <Button
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      size="md"
                      icon={Github}
                      className="w-full sm:w-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      GitHub
                    </Button>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          // Desktop Stacked Parallax scene
          <div ref={cardsContainerRef} className="relative w-full h-[530px] 2xl:h-[600px] flex items-center justify-center">
            {projects.map((proj, idx) => (
              <div
                key={proj.id}
                className={`project-stack-card project-card-${idx} absolute inset-0 w-full h-full flex items-center justify-center`}
                style={{
                  zIndex: 10 + idx,
                  willChange: 'transform, opacity, filter',
                }}
              >
                <GlassCard
                  glowColor={idx % 2 === 0 ? 'rgba(96, 165, 250, 0.25)' : 'rgba(168, 85, 247, 0.25)'}
                  className="p-6 md:p-8 2xl:p-10 w-full max-w-5xl 2xl:max-w-6xl h-[460px] 2xl:h-[520px] shadow-2xl relative border border-white/10 group cursor-pointer"
                  contentClassName="flex flex-col md:flex-row gap-6 md:gap-8 2xl:gap-10 items-stretch h-full w-full"
                  onClick={() => openProjectModal(proj)}
                  onMouseEnter={() => setCursor('hover-image', 'Case Study')}
                  onMouseLeave={resetCursor}
                >
                  {/* Left Column: Image Preview Frame */}
                  <div className="w-full md:w-[50%] h-48 md:h-full rounded-2xl overflow-hidden bg-bg-dark border border-white/10 group-hover:border-primary/40 transition-colors relative flex flex-col shrink-0">
                    {/* Browser top-bar */}
                    <div className="h-6 bg-white/5 border-b border-white/10 px-3 flex items-center gap-1.5 shrink-0 z-10">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500/70" />
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/70" />
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500/70" />
                    </div>

                    <div className="w-full h-full relative overflow-hidden flex-grow">
                      <img
                        src={proj.images[0]}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 z-20">
                        <span className="text-xs font-semibold text-primary flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" /> View Full Case Study
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Project Info (Innovative Console Dashboard Layout) */}
                  <div className="w-full md:w-[50%] flex flex-col justify-between h-full py-1 text-left">
                    <div className="space-y-4">
                      {/* Header row */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] 2xl:text-xs font-mono font-bold tracking-widest text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                          {proj.category}
                        </span>
                        <span className="text-[10px] 2xl:text-xs font-mono tracking-wider text-text-muted">
                          {proj.year}
                        </span>
                      </div>

                      {/* Project Title and Summary */}
                      <div>
                        <h3 className="text-2xl sm:text-3xl 2xl:text-4xl font-extrabold font-heading text-text-primary group-hover:text-primary transition-colors duration-300 mt-1 2xl:mt-2">
                          {proj.title}
                        </h3>
                        <p className="text-xs sm:text-sm 2xl:text-base text-text-muted 2xl:text-text-secondary leading-relaxed line-clamp-3 font-body mt-2 2xl:mt-3">
                          {proj.summary}
                        </p>
                      </div>

                      {/* Dynamic Spec Telemetry Grid */}
                      <div className="grid grid-cols-3 gap-2.5 2xl:gap-3.5 my-2 2xl:my-3">
                        {proj.metrics?.map((m) => (
                          <div key={m.label} className="glass-panel p-2.5 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col justify-center">
                            <span className="text-[8px] 2xl:text-[10px] font-mono uppercase tracking-widest text-text-muted block mb-0.5">
                              {m.label}
                            </span>
                            <span className="text-[10px] 2xl:text-xs font-mono font-bold text-text-secondary truncate">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Core Stack */}
                      <div className="space-y-1.5">
                        <span className="text-[9px] 2xl:text-[11px] font-mono uppercase tracking-widest text-text-muted block">
                          SYSTEM STACK
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="text-[9px] 2xl:text-[11px] font-mono bg-white/[0.04] px-2 py-0.5 2xl:px-3 2xl:py-1 rounded border border-white/10 text-text-muted group-hover:border-primary/20 group-hover:text-text-secondary transition-all duration-300 hover:scale-105 hover:bg-white/[0.08]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Cards Grid */}
                    <div className="grid grid-cols-2 gap-3 2xl:gap-4 pt-3 border-t border-white/10 mt-3 shrink-0">
                      {/* Live Link Card */}
                      {proj.live ? (
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="glass-panel p-3 2xl:p-4 rounded-xl border border-white/10 hover:border-primary/45 hover:bg-primary/5 transition-all duration-300 flex items-center justify-between group/link cursor-pointer relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover/link:opacity-100 transition-opacity pointer-events-none" />
                          <div className="flex flex-col">
                            <span className="text-[8px] 2xl:text-[10px] font-mono text-primary font-bold uppercase tracking-wider mb-0.5">
                              LAUNCH APP
                            </span>
                            <span className="text-xs 2xl:text-sm font-bold text-text-primary group-hover/link:text-primary transition-colors flex items-center gap-1.5">
                              Live Site <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-success/10 border border-success/20 px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-full shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                            <span className="text-[8px] 2xl:text-[10px] font-mono text-success font-semibold">ONLINE</span>
                          </div>
                        </a>
                      ) : (
                        <div className="glass-panel p-3 2xl:p-4 rounded-xl border border-white/5 opacity-50 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[8px] 2xl:text-[10px] font-mono text-text-muted uppercase tracking-wider mb-0.5">
                              LAUNCH APP
                            </span>
                            <span className="text-xs 2xl:text-sm font-bold text-text-muted">
                              Staging Offline
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-full shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span className="text-[8px] 2xl:text-[10px] font-mono text-amber-500 font-semibold">LOCAL RUN</span>
                          </div>
                        </div>
                      )}

                      {/* GitHub Link Card */}
                      {proj.github ? (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="glass-panel p-3 2xl:p-4 rounded-xl border border-white/10 hover:border-secondary/45 hover:bg-secondary/5 transition-all duration-300 flex items-center justify-between group/link cursor-pointer relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent opacity-0 group-hover/link:opacity-100 transition-opacity pointer-events-none" />
                          <div className="flex flex-col">
                            <span className="text-[8px] 2xl:text-[10px] font-mono text-secondary font-bold uppercase tracking-wider mb-0.5">
                              SOURCE CODE
                            </span>
                            <span className="text-xs 2xl:text-sm font-bold text-text-primary group-hover/link:text-secondary transition-colors flex items-center gap-1.5">
                              Repository <Github className="w-3 h-3 group-hover/link:scale-110 transition-transform" />
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-secondary/10 border border-secondary/20 px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-full shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                            <span className="text-[8px] 2xl:text-[10px] font-mono text-secondary font-semibold">STABLE</span>
                          </div>
                        </a>
                      ) : (
                        <div className="glass-panel p-3 2xl:p-4 rounded-xl border border-white/5 opacity-50 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[8px] 2xl:text-[10px] font-mono text-text-muted uppercase tracking-wider mb-0.5">
                              SOURCE CODE
                            </span>
                            <span className="text-xs 2xl:text-sm font-bold text-text-muted">
                              Restricted Access
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-full shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            <span className="text-[8px] 2xl:text-[10px] font-mono text-red-500 font-semibold">PRIVATE</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reusable Project Case Study Modal */}
      <Modal
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || ''}
      >
        {selectedProject && (
          <div className="space-y-6">
            <ImageCompareSlider images={selectedProject.images} alt={selectedProject.title} />

            {/* Modal Tabs */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto no-scrollbar">
              {[
                { id: 'overview', label: 'Overview & Specs', icon: Layers },
                { id: 'architecture', label: 'Architecture & Features', icon: Cpu },
                { id: 'challenges', label: 'Challenges & Lessons', icon: Lightbulb },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 ${
                      isActive
                        ? 'bg-primary/20 text-primary border border-primary/45'
                        : 'text-text-muted hover:text-text-primary glass-panel'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-8 space-y-4">
                  <div>
                    <h4 className="text-xs font-mono text-primary uppercase font-semibold tracking-wider mb-1">
                      Problem Statement
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {selectedProject.problem}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-mono text-secondary uppercase font-semibold tracking-wider mb-1">
                      Implemented Solution
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>
                <div className="md:col-span-4 space-y-4 glass-panel p-4 rounded-2xl border border-white/10">
                  <h5 className="text-xs font-mono text-text-muted uppercase tracking-wider">
                    Technologies
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.techStack.map((t) => (
                      <span key={t} className="text-xs font-mono glass-panel px-2.5 py-1 rounded-md text-text-primary border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                    {selectedProject.live && (
                      <Button href={selectedProject.live} target="_blank" rel="noopener noreferrer" variant="primary" size="sm" icon={ExternalLink}>
                        Launch App
                      </Button>
                    )}
                    {selectedProject.github && (
                      <Button href={selectedProject.github} target="_blank" rel="noopener noreferrer" variant="outline" size="sm" icon={Github}>
                        Source Code
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Architecture */}
            {activeTab === 'architecture' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono text-accent uppercase font-semibold tracking-wider mb-1">
                    System Architecture
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed glass-panel p-4 rounded-xl border border-white/10">
                    {selectedProject.architecture}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-mono text-primary uppercase font-semibold tracking-wider mb-2">
                    Core Functional Features
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProject.keyFeatures.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-text-secondary glass-panel p-3 rounded-xl">
                        <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 3: Challenges */}
            {activeTab === 'challenges' && (
              <div className="space-y-6">
                <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold">
                    <AlertCircle className="w-4 h-4" /> Engineering Challenge
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {selectedProject.challenges}
                  </p>
                </div>
                <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-secondary font-semibold">
                    <Lightbulb className="w-4 h-4" /> Key Insights
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {selectedProject.lessonsLearned}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
};
