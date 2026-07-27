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
      setIsMobile(window.innerWidth < 768);
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

  const openProjectModal = (proj) => {
    setSelectedProject(proj);
    setActiveTab('overview');
  };

  return (
    <section ref={sectionRef} id="projects" className="py-24 px-6 relative z-10 bg-[#050816] overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
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
                glowColor={idx % 2 === 0 ? 'rgba(249, 115, 22, 0.2)' : 'rgba(6, 182, 212, 0.2)'}
                className="p-5 flex flex-col gap-5 cursor-pointer border border-white/10"
                onClick={() => openProjectModal(proj)}
              >
                <div className="rounded-xl overflow-hidden aspect-video bg-bg-dark border border-white/10 relative">
                  <img src={proj.images[0]} alt={proj.title} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2">
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
                <div className="flex items-center gap-3">
                  {proj.live && (
                    <Button
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      size="sm"
                      icon={ExternalLink}
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
                      size="sm"
                      icon={Github}
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
          <div ref={cardsContainerRef} className="relative w-full h-[65vh] flex items-center justify-center">
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
                  glowColor={idx % 2 === 0 ? 'rgba(249, 115, 22, 0.25)' : 'rgba(6, 182, 212, 0.25)'}
                  className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center w-full max-w-4xl h-full shadow-2xl relative border border-white/10 group cursor-pointer"
                  onClick={() => openProjectModal(proj)}
                  onMouseEnter={() => setCursor('hover-image', 'Case Study')}
                  onMouseLeave={resetCursor}
                >
                  {/* Left Column: Image Preview Frame */}
                  <div className="w-full md:w-[48%] h-48 md:h-full rounded-2xl overflow-hidden bg-bg-dark border border-white/10 group-hover:border-primary/40 transition-colors relative flex flex-col">
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

                  {/* Right Column: Project Info */}
                  <div className="w-full md:w-[52%] flex flex-col justify-between h-full py-2">
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-mono text-primary font-semibold uppercase tracking-wider">
                          {proj.category} — {proj.year}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-text-primary group-hover:text-primary transition-colors mt-1">
                          {proj.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-3">
                        {proj.summary}
                      </p>

                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block">
                          Core Stack
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] font-mono glass-panel px-2.5 py-1 rounded-md text-text-muted border border-white/10 group-hover:border-primary/20 group-hover:text-text-secondary transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-white/10 mt-4">
                      {proj.live && (
                        <Button
                          href={proj.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="primary"
                          size="sm"
                          icon={ExternalLink}
                          onClick={(e) => e.stopPropagation()}
                          cursorLabel="Live"
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
                          size="sm"
                          icon={Github}
                          onClick={(e) => e.stopPropagation()}
                          cursorLabel="Code"
                        >
                          GitHub
                        </Button>
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
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
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
