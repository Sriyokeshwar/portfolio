import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, Github, Linkedin, Code2, Terminal, Instagram, Figma, ChevronDown, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { profile } from '../data/profile';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { AuroraMesh } from '../components/background/AuroraMesh';
import { useCursor } from '../context/CursorContext';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const socialIcons = [
  { name: 'GitHub', href: profile.links.github, icon: Github },
  { name: 'LinkedIn', href: profile.links.linkedin, icon: Linkedin },
  { name: 'LeetCode', href: profile.links.leetcode, icon: Code2 },
  { name: 'HackerRank', href: profile.links.hackerrank, icon: Terminal },
  { name: 'Instagram', href: profile.links.instagram, icon: Instagram },
  { name: 'Figma', href: profile.links.figma, icon: Figma },
];

export const Hero = () => {
  const containerRef = useRef(null);
  const textGroupRef = useRef(null);
  const portraitContainerRef = useRef(null);
  const bottomGroupRef = useRef(null);
  const badgesRef = useRef([]);
  const bgRotationRef = useRef(null);

  const { setCursor, resetCursor } = useCursor();
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Typewriter effect for roles
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
      }, 80);
    }

    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % profile.rolesList.length);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  // GSAP Scroll Animations
  useEffect(() => {
    if (prefersReducedMotion) return;

    // Pin the entire Hero section and compress it
    const pinTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=100%',
      pin: true,
      pinSpacing: true,
      scrub: 1,
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100%',
        scrub: 1,
      }
    });

    // 1. Slowly rotate background aurora mesh
    timeline.to(bgRotationRef.current, {
      rotate: 45,
      scale: 1.15,
      ease: 'none',
    }, 0);

    // 2. Fade text upward and disappear
    timeline.to(textGroupRef.current, {
      y: -80,
      opacity: 0,
      blur: 10,
      ease: 'power2.out',
    }, 0);

    // 3. Move floating badges behind the portrait and shrink
    badgesRef.current.forEach((badge, idx) => {
      if (!badge) return;
      // Calculate directional collapse vectors
      const dirX = idx % 2 === 0 ? 60 : -60;
      const dirY = idx < 2 ? 60 : -60;
      timeline.to(badge, {
        x: dirX,
        y: dirY,
        scale: 0.5,
        opacity: 0,
        blur: 8,
        ease: 'power2.inOut',
      }, 0);
    });

    // 4. Slightly scale the profile portrait down and compress
    timeline.to(portraitContainerRef.current, {
      scale: 0.82,
      opacity: 0.3,
      filter: 'blur(8px)',
      ease: 'power2.inOut',
    }, 0);

    // 5. Fade out bottom actions
    timeline.to(bottomGroupRef.current, {
      y: 50,
      opacity: 0,
      ease: 'power2.out',
    }, 0);

    return () => {
      pinTrigger.kill();
      timeline.kill();
    };
  }, [prefersReducedMotion]);

  // 3D Parallax Mouse movement handler
  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const { clientX, clientY } = e;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const moveX = (clientX - width / 2) / (width / 2);
    const moveY = (clientY - height / 2) / (height / 2);

    // Dynamic rotation and translate values on the main portrait card
    gsap.to(portraitContainerRef.current, {
      rotateY: moveX * 8,
      rotateX: -moveY * 8,
      x: moveX * 10,
      y: moveY * 10,
      duration: 0.6,
      ease: 'power2.out',
    });

    // Opposite movement on the floating cards for depth parallax
    badgesRef.current.forEach((badge, idx) => {
      if (!badge) return;
      const factor = (idx + 1) * 12;
      gsap.to(badge, {
        x: moveX * -factor,
        y: moveY * -factor,
        duration: 0.8,
        ease: 'power2.out',
      });
    });
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
    gsap.to(portraitContainerRef.current, {
      rotateY: 0,
      rotateX: 0,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
    badgesRef.current.forEach((badge) => {
      if (!badge) return;
      gsap.to(badge, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen flex flex-col justify-between items-center py-20 px-6 overflow-hidden bg-[#050816]"
      style={{ perspective: '1000px' }}
    >
      {/* Background Layer with Slow Rotation */}
      <div ref={bgRotationRef} className="absolute inset-0 pointer-events-none transform-gpu origin-center">
        <AuroraMesh />
      </div>

      {/* Top Section: Welcome Header & Availability Badge */}
      <div
        ref={textGroupRef}
        className="w-full max-w-4xl mx-auto text-center flex flex-col items-center gap-4 z-10 pt-8"
      >
        <Badge />

        <div className="space-y-1">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-heading tracking-tight text-text-primary leading-none">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-primary via-orange-500 to-secondary bg-clip-text text-transparent">
              {profile.name}
            </span>
          </h1>

          <div className="h-10 sm:h-12 flex items-center justify-center text-lg sm:text-2xl font-mono text-text-secondary font-medium">
            <span>{text}</span>
            <span className="animate-pulse text-primary ml-1 font-bold">|</span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-text-muted max-w-xl leading-relaxed">
          {profile.tagline}. Handcrafting high-craft, AI-assisted full stack MERN systems, VisionOS glass architectures, and liquid motion.
        </p>
      </div>

      {/* Middle Section: Centered Profile with Floating Badges */}
      <div className="relative flex items-center justify-center w-full max-w-md h-[400px] z-10 my-4 transform-style-preserve-3d">
        
        {/* Centered Profile Image Frame */}
        <div
          ref={portraitContainerRef}
          className="relative rounded-3xl p-3 glass-panel border border-white/10 shadow-2xl overflow-hidden group w-72 h-80 sm:w-80 sm:h-96 transform-style-preserve-3d transform-gpu"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/15 opacity-80 pointer-events-none" />
          <img
            src={profile.assets.profileTransparent}
            alt={profile.name}
            className="w-full h-full object-cover object-top rounded-2xl pointer-events-none scale-105 group-hover:scale-108 transition-transform duration-700"
          />
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[40px] opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700 pointer-events-none -z-10" />
        </div>

        {/* Floating Badge 1: Top-Left */}
        <div
          ref={(el) => (badgesRef.current[0] = el)}
          className="absolute -top-4 -left-12 sm:-left-20 glass-panel px-3.5 py-2 rounded-2xl border border-white/20 shadow-lg flex items-center gap-2 animate-float transform-gpu"
        >
          <Sparkles className="w-4 h-4 text-primary animate-spin-slow" />
          <span className="text-[11px] font-bold text-text-primary">
            AI-Assisted Builder
          </span>
        </div>

        {/* Floating Badge 2: Top-Right */}
        <div
          ref={(el) => (badgesRef.current[1] = el)}
          className="absolute top-12 -right-12 sm:-right-24 glass-panel px-3.5 py-2 rounded-2xl border border-white/20 shadow-lg flex items-center gap-2 animate-float transform-gpu"
          style={{ animationDelay: '1.5s' }}
        >
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-[11px] font-bold text-text-primary">
            2+ Internships
          </span>
        </div>

        {/* Floating Badge 3: Bottom-Left */}
        <div
          ref={(el) => (badgesRef.current[2] = el)}
          className="absolute bottom-16 -left-16 sm:-left-24 glass-panel px-3.5 py-2 rounded-2xl border border-white/20 shadow-lg flex items-center gap-2 animate-float transform-gpu"
          style={{ animationDelay: '3s' }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
          <span className="text-[11px] font-bold text-text-primary">
            MERN Stack
          </span>
        </div>

        {/* Floating Badge 4: Bottom-Right */}
        <div
          ref={(el) => (badgesRef.current[3] = el)}
          className="absolute -bottom-2 -right-8 sm:-right-16 glass-panel px-3.5 py-2 rounded-2xl border border-white/20 shadow-lg flex items-center gap-2 animate-float transform-gpu"
          style={{ animationDelay: '4.5s' }}
        >
          <ShieldCheck className="w-4 h-4 text-secondary" />
          <span className="text-[11px] font-bold text-text-primary">
            CGPA 7.94
          </span>
        </div>
      </div>

      {/* Bottom Section: CTA Actions & Social Connectivity */}
      <div
        ref={bottomGroupRef}
        className="w-full max-w-4xl mx-auto flex flex-col items-center gap-6 z-10"
      >
        {/* Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            href={profile.assets.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            download
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

        {/* Social Icons Bar */}
        <div className="flex items-center justify-center gap-3 py-3 px-6 rounded-full glass-panel border border-white/10">
          <span className="text-[10px] text-text-muted uppercase font-mono tracking-widest mr-2">
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
                className="p-2 rounded-full hover:bg-white/5 text-text-muted hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label={soc.name}
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center text-text-muted text-[10px] font-mono tracking-widest uppercase gap-1 mt-2">
          <span>Scroll down</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce text-primary" />
        </div>
      </div>
    </section>
  );
};
