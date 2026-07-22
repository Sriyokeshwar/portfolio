import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, Github, Linkedin, Code2, Terminal, Instagram, Figma, ChevronDown, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { profile } from '../data/profile';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { AuroraMesh } from '../components/background/AuroraMesh';
import { CursorTrail } from '../components/cursor/CursorTrail';
import { TiltCard } from '../components/shared/TiltCard';
import { AnimatedCounter } from '../components/shared/AnimatedCounter';
import { useCursor } from '../context/CursorContext';
import { fadeUp, scaleIn, wordStagger } from '../animations/variants';

const socialIcons = [
  { name: 'GitHub', href: profile.links.github, icon: Github },
  { name: 'LinkedIn', href: profile.links.linkedin, icon: Linkedin },
  { name: 'LeetCode', href: profile.links.leetcode, icon: Code2 },
  { name: 'HackerRank', href: profile.links.hackerrank, icon: Terminal },
  { name: 'Instagram', href: profile.links.instagram, icon: Instagram },
  { name: 'Figma', href: profile.links.figma, icon: Figma },
];

export const Hero = () => {
  const { setCursor, resetCursor } = useCursor();
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = profile.rolesList[roleIndex];
    let timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setText(currentRole.substring(0, text.length - 1));
      }, 40);
    } else {
      timeout = setTimeout(() => {
        setText(currentRole.substring(0, text.length + 1));
      }, 90);
    }

    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % profile.rolesList.length);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  const words = `Hi, I'm ${profile.name}`.split(' ');

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      <AuroraMesh />
      <CursorTrail />

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        {/* Left Column Text Content */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 space-y-6 text-left"
        >
          {/* Availability Badge */}
          <Badge />

          {/* Name & Word Split Stagger Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-heading tracking-tight text-text-primary flex flex-wrap gap-x-3 gap-y-1">
              {words.map((w, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordStagger}
                  initial="hidden"
                  animate="visible"
                  className={w === profile.name || w === 'Sriyokeshwar' || w === 'S' ? 'gradient-text-orange-cyan' : ''}
                >
                  {w}
                </motion.span>
              ))}
            </h1>

            {/* Role Rotation Bar */}
            <div className="h-10 sm:h-12 flex items-center text-xl sm:text-2xl font-mono text-text-secondary font-medium">
              <span>{text}</span>
              <span className="animate-pulse text-primary ml-1 font-bold">|</span>
            </div>
          </div>

          {/* One-line Tagline */}
          <p className="text-base sm:text-lg text-text-muted leading-relaxed max-w-xl">
            {profile.tagline}. Focused on crafting premium VisionOS-tier UI/UX, full stack MERN systems, data visualizations, and fluid interaction design.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              href={profile.assets.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              icon={FileText}
              cursorLabel="Resume"
            >
              Download Resume
            </Button>
            <Button
              href="#contact"
              variant="outline"
              size="lg"
              icon={ArrowRight}
              cursorLabel="Contact"
            >
              Get in Touch
            </Button>
          </div>

          {/* Social Row & Mini Stat Chips */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="text-xs text-text-muted uppercase font-mono tracking-widest mr-1">
                Connect:
              </span>
              {socialIcons.map((soc) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={soc.name}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setCursor('hover-link', soc.name)}
                    onMouseLeave={resetCursor}
                    className="p-2.5 rounded-full glass-panel text-text-muted hover:text-primary hover:border-primary/40 transition-all duration-300 hover:scale-110"
                    aria-label={soc.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            {/* Quick Stat Badges */}
            <div className="flex items-center gap-3">
              <div className="glass-panel px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-mono text-text-secondary">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <span>2+ Internships</span>
              </div>
              <div className="glass-panel px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-mono text-text-secondary">
                <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                <span>7.94 CGPA</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column Hero Portrait with 3D Mouse Parallax */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 relative flex justify-center"
        >
          <TiltCard maxAngle={12} className="relative w-full max-w-md">
            {/* Portrait Container with Glass Frame */}
            <div className="relative rounded-3xl p-3 glass-panel border border-white/10 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <img
                src={profile.assets.heroPortrait}
                alt={profile.name}
                className="w-full h-[400px] sm:h-[480px] object-cover object-top rounded-2xl transform transition-transform duration-700 group-hover:scale-105"
              />

              {/* Floating Accent Badge 1 */}
              <div className="absolute top-6 left-6 glass-panel px-3.5 py-2 rounded-2xl border border-white/20 shadow-lg flex items-center gap-2 animate-float">
                <Sparkles className="w-4 h-4 text-primary animate-spin-slow" />
                <span className="text-xs font-semibold text-text-primary">
                  AI-Assisted Builder
                </span>
              </div>

              {/* Floating Accent Badge 2 */}
              <div className="absolute bottom-6 right-6 glass-panel px-4 py-2 rounded-2xl border border-white/20 shadow-lg flex items-center gap-2 animate-float" style={{ animationDelay: '3s' }}>
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                <span className="text-xs font-semibold text-text-primary">
                  MERN Stack Developer
                </span>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-text-muted hover:text-primary transition-colors z-10"
      >
        <span className="text-[10px] uppercase font-mono tracking-widest mb-1">
          Scroll Down
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
};
