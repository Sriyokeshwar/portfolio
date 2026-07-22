import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/shared/SectionHeading';
import { GlassCard } from '../components/ui/GlassCard';
import { education } from '../data/education';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { fadeUp } from '../animations/variants';

export const Education = () => {
  return (
    <section id="education" className="py-24 px-6 relative z-10">
      <div className="max-w-4xl mx-auto space-y-16">
        <SectionHeading
          badge="Academic Record"
          title="Education History"
          subtitle="Strong academic foundation in Computer Science and Application Engineering at A.V.C. Institutions."
        />

        {/* Compact Vertical Timeline */}
        <div className="relative border-l-2 border-white/10 pl-6 md:pl-10 space-y-8">
          {education.map((edu) => (
            <motion.div
              key={edu.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="relative group"
            >
              {/* Pin */}
              <span className="absolute -left-[31px] md:-left-[47px] top-4 w-5 h-5 rounded-full bg-bg-dark border-2 border-secondary group-hover:scale-125 transition-transform duration-300 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              </span>

              <GlassCard className="p-6 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-secondary font-semibold">
                    <GraduationCap className="w-4 h-4" />
                    <span>{edu.status}</span>
                  </div>
                  <div className="flex items-center gap-1.5 glass-panel px-3 py-1 rounded-full text-xs text-text-muted w-fit">
                    <Calendar className="w-3.5 h-3.5 text-secondary" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold font-heading text-text-primary">
                  {edu.degree}
                </h3>

                <p className="text-sm font-medium text-text-secondary">
                  {edu.institution}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs font-mono font-bold text-primary glass-panel px-3 py-1 rounded-md border border-primary/30">
                    Score: {edu.score}
                  </span>
                </div>

                <p className="text-xs text-text-muted leading-relaxed pt-1">
                  {edu.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
