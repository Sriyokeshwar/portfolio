import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/shared/SectionHeading';
import { AnimatedCounter } from '../components/shared/AnimatedCounter';
import { GlassCard } from '../components/ui/GlassCard';
import { profile } from '../data/profile';
import { fadeUp, fadeLeft, fadeRight } from '../animations/variants';

const journeySteps = [
  {
    step: '01',
    title: 'Fundamentals & CS Foundations',
    desc: 'Mastered core algorithms, data structures, and computer science concepts during B.Sc Computer Science at A.V.C. College (CGPA 7.94).',
  },
  {
    step: '02',
    title: 'Modern Frontend & React',
    desc: 'Deep-dived into JavaScript ES6+, React, component architectures, and responsive utility-first styling with Tailwind CSS.',
  },
  {
    step: '03',
    title: 'Full Stack MERN Engineering',
    desc: 'Engineered production-grade REST APIs, MongoDB schemas, and Node/Express backends during 3-month NoviTech R&D and Vebbox internships.',
  },
  {
    step: '04',
    title: 'AI-Assisted Development',
    desc: 'Earned IBM Prompt Engineering certification and integrated advanced LLM workflows to accelerate code quality, testing, and system design.',
  },
  {
    step: '05',
    title: 'VisionOS-Tier UI/UX Craft',
    desc: 'Focused on shipping futuristic, fluid web applications with micro-interactions, liquid glassmorphism, and performance optimization.',
  },
];

export const About = () => {
  return (
    <section id="about" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto space-y-16">
        <SectionHeading
          badge="Story & Evolution"
          title="Driven by Craft, Powered by Code"
          subtitle="A progressive journey from computer science fundamentals to building high-craft, AI-assisted full stack web applications."
        />

        {/* Main Grid: Anchor Portrait + Journey Progression */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Anchor Portrait & Candid Strip */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-5 space-y-6"
          >
            <GlassCard className="relative overflow-hidden group p-4">
              <img
                src={profile.assets.profileTransparent}
                alt={profile.name}
                className="w-full h-[420px] object-cover object-top rounded-2xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-sm font-semibold text-text-primary">
                  {profile.name}
                </p>
                <p className="text-xs text-primary">{profile.location}</p>
              </div>
            </GlassCard>

            {/* Candid Beyond the Code Strip */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                Beyond the Code:
              </span>
              <div className="grid grid-cols-2 gap-3">
                <img
                  src={profile.assets.candid1}
                  alt="Candid moment 1"
                  className="rounded-xl h-28 w-full object-cover glass-panel hover:scale-105 transition-transform duration-300"
                />
                <img
                  src={profile.assets.candid2}
                  alt="Candid moment 2"
                  className="rounded-xl h-28 w-full object-cover glass-panel hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Story Progression Timeline */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="relative border-l border-white/10 pl-6 space-y-8">
              {journeySteps.map((j) => (
                <div key={j.step} className="relative group">
                  {/* Timeline Dot */}
                  <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-bg-dark border-2 border-primary group-hover:bg-primary transition-colors" />

                  <span className="text-xs font-mono text-primary uppercase font-bold tracking-wider">
                    Step {j.step}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold font-heading text-text-primary">
                    {j.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mt-1">
                    {j.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Real Stat Counters Strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
        >
          {profile.stats.map((stat) => (
            <GlassCard key={stat.label} className="text-center p-6">
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
        </motion.div>
      </div>
    </section>
  );
};
