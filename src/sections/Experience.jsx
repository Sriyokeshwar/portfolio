import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../components/shared/SectionHeading';
import { GlassCard } from '../components/ui/GlassCard';
import { experience } from '../data/experience';
import { Briefcase, Calendar, MapPin, ChevronDown, CheckCircle2 } from 'lucide-react';
import { fadeUp } from '../animations/variants';

export const Experience = () => {
  const [expandedId, setExpandedId] = useState(experience[0]?.id || null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="experience" className="py-24 px-6 relative z-10">
      <div className="max-w-4xl mx-auto space-y-16">
        <SectionHeading
          badge="Career History"
          title="Industry Experience"
          subtitle="Real-world internship exposure building MERN stack features, responsive UIs, and backend services end to end."
        />

        {/* Vertical Interactive Timeline */}
        <div className="relative border-l-2 border-white/10 pl-6 md:pl-10 space-y-10">
          {experience.map((exp) => {
            const isExpanded = expandedId === exp.id;
            return (
              <motion.div
                key={exp.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="relative group"
              >
                {/* Timeline Pin */}
                <span className="absolute -left-[31px] md:-left-[47px] top-4 w-5 h-5 rounded-full bg-bg-dark border-2 border-primary group-hover:scale-125 transition-transform duration-300 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                </span>

                <GlassCard className="p-6 space-y-4">
                  {/* Card Header */}
                  <div
                    onClick={() => toggleExpand(exp.id)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold mb-1">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>{exp.type}</span>
                      </div>
                      <h3 className="text-xl font-bold font-heading text-text-primary">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-medium text-secondary">
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <div className="flex items-center gap-1.5 glass-panel px-3 py-1.5 rounded-full">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>{exp.duration}</span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180 text-primary' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Accordion Expandable Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pt-4 border-t border-white/10 space-y-4 overflow-hidden"
                      >
                        <p className="text-sm text-text-muted leading-relaxed">
                          {exp.summary}
                        </p>

                        <div className="space-y-2">
                          <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                            Key Impact & Deliverables:
                          </span>
                          <ul className="space-y-1.5">
                            {exp.highlights.map((h, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-xs text-text-secondary"
                              >
                                <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech Stack Chips */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {exp.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="text-[11px] font-mono glass-panel px-3 py-1 rounded-full text-text-muted border border-white/10"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
