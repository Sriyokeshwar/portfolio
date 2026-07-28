import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../motion';

export const SectionHeading = ({ title, subtitle, badge }) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="text-center max-w-2xl mx-auto mb-16 space-y-3"
    >
      {badge && (
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary liquid-glass px-3.5 py-1 rounded-full border border-white/15 mb-2">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-bold font-heading text-text-primary tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-muted text-sm md:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="w-12 h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full mx-auto mt-4" />
    </motion.div>
  );
};
