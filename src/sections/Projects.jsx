import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/shared/SectionHeading';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { ImageCompareSlider } from '../components/shared/ImageCompareSlider';
import { projects } from '../data/projects';
import { ExternalLink, Github, Sparkles, CheckCircle2, Layers, Cpu, AlertCircle, Lightbulb } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { fadeUp } from '../animations/variants';

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'architecture' | 'challenges'
  const { setCursor, resetCursor } = useCursor();

  useKeyboardShortcuts({
    onEscape: () => setSelectedProject(null),
    active: Boolean(selectedProject),
  });

  const openProjectModal = (proj) => {
    setSelectedProject(proj);
    setActiveTab('overview');
  };

  return (
    <section id="projects" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto space-y-16">
        <SectionHeading
          badge="Selected Works"
          title="Featured Projects"
          subtitle="Production-ready full stack web applications, financial calculators, and user management systems engineered with modern craft."
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj) => (
            <motion.div
              key={proj.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <GlassCard
                className="p-6 flex flex-col justify-between space-y-6 h-full group cursor-pointer"
                onClick={() => openProjectModal(proj)}
                onMouseEnter={() => setCursor('hover-image', 'Case Study')}
                onMouseLeave={resetCursor}
              >
                {/* Mockup Frame & Image Preview */}
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-bg-dark border border-white/10 group-hover:border-primary/40 transition-colors">
                  {/* Browser top bar simulation */}
                  <div className="h-7 bg-white/5 border-b border-white/10 px-3 flex items-center gap-1.5 z-10 relative">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <img
                    src={proj.images[0]}
                    alt={proj.title}
                    className="w-full h-[calc(100%-1.75rem)] object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-xs font-semibold text-primary flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Open Full Case Study
                    </span>
                  </div>
                </div>

                {/* Project Brief Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-primary font-semibold uppercase tracking-wider">
                      {proj.category} — {proj.year}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-text-primary group-hover:text-primary transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted line-clamp-2 leading-relaxed">
                    {proj.summary}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono glass-panel px-2.5 py-1 rounded-md text-text-muted border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
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
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Apple-Style Product Case Study Detail Modal */}
      <Modal
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || ''}
      >
        {selectedProject && (
          <div className="space-y-6">
            {/* Gallery Slider */}
            <ImageCompareSlider
              images={selectedProject.images}
              alt={selectedProject.title}
            />

            {/* Case Study Tab Navigation */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
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
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      isActive
                        ? 'bg-primary/20 text-primary border border-primary/40'
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
                      <span
                        key={t}
                        className="text-xs font-mono glass-panel px-2.5 py-1 rounded-md text-text-primary border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                    {selectedProject.live && (
                      <Button
                        href={selectedProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="primary"
                        size="sm"
                        icon={ExternalLink}
                      >
                        Launch App
                      </Button>
                    )}
                    {selectedProject.github && (
                      <Button
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline"
                        size="sm"
                        icon={Github}
                      >
                        Source Code
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Architecture & Key Features */}
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
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-text-secondary glass-panel p-3 rounded-xl"
                      >
                        <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 3: Challenges & Lessons */}
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
                    <Lightbulb className="w-4 h-4" /> Key Insights & Takeaways
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
