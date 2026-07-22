import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../components/shared/SectionHeading';
import { ParticleField } from '../components/background/ParticleField';
import { skillCategories, skills, processSteps } from '../data/skills';
import { GlassCard } from '../components/ui/GlassCard';
import { useCursor } from '../context/CursorContext';
import {
  Search,
  Atom,
  Code2,
  Palette,
  LayoutGrid,
  FileCode,
  Figma,
  Server,
  Cpu,
  Network,
  Database,
  Table,
  Coffee,
  Globe,
  Terminal,
  GitBranch,
  Laptop,
  Send,
  Image as ImageIcon,
  Sparkles,
  Bot,
  Wand2,
  Brain,
} from 'lucide-react';

const iconMap = {
  Atom,
  Code2,
  Palette,
  LayoutGrid,
  FileCode,
  Figma,
  Server,
  Cpu,
  Network,
  Database,
  Table,
  Coffee,
  Globe,
  Terminal,
  GitBranch,
  Laptop,
  Send,
  Image: ImageIcon,
  Sparkles,
  Bot,
  Wand2,
  Brain,
};

export const Skills = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { setCursor, resetCursor } = useCursor();

  const filteredSkills = skills.filter((sk) => {
    const matchesCategory = activeTab === 'all' || sk.category === activeTab;
    const matchesSearch =
      sk.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sk.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-24 px-6 relative z-10 overflow-hidden">
      <ParticleField count={30} />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        <SectionHeading
          badge="Capabilities & Tools"
          title="Technical Ecosystem"
          subtitle="A comprehensive toolkit spanning modern full-stack development, database architecture, UI/UX design, and AI productivity."
        />

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          {/* Real-time Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill or tool..."
              className="w-full pl-10 pr-4 py-2 rounded-full glass-panel text-text-primary placeholder-text-muted text-xs focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {skillCategories.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  onMouseEnter={() => setCursor('hover-link')}
                  onMouseLeave={resetCursor}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'text-text-primary'
                      : 'text-text-muted hover:text-text-primary glass-panel'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeSkillTab"
                      className="absolute inset-0 bg-gradient-to-r from-primary to-amber-500 rounded-full shadow-glow -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filterable Skill Cards Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <AnimatePresence>
            {filteredSkills.length === 0 ? (
              <div className="col-span-full py-12 text-center text-xs text-text-muted">
                No skills found matching "{searchQuery}"
              </div>
            ) : (
              filteredSkills.map((sk) => {
                const IconComponent = iconMap[sk.icon] || Code2;
                return (
                  <motion.div
                    key={sk.name}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GlassCard
                      className="flex flex-col items-center justify-center text-center p-5 space-y-2 hover:border-primary/50 group"
                      hoverGlow
                    >
                      <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-primary/20 text-primary transition-colors duration-300">
                        <IconComponent className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <span className="text-xs font-medium text-text-primary font-heading">
                        {sk.name}
                      </span>
                      {sk.level && (
                        <span className="text-[10px] font-mono text-text-muted group-hover:text-primary transition-colors">
                          {sk.level}% Proficiency
                        </span>
                      )}
                    </GlassCard>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </motion.div>

        {/* Development Methodology / Process Steps */}
        <div className="pt-12 border-t border-white/10 space-y-8">
          <h3 className="text-center font-heading text-xl font-bold text-text-primary">
            Engineering Methodology
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processSteps.map((proc) => (
              <GlassCard key={proc.step} className="p-6 space-y-2 relative">
                <span className="text-2xl font-bold font-mono text-primary/40">
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
