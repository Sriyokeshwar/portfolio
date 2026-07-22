import React from 'react';
import { ArrowUp, Github, Linkedin, Code2, Terminal, Instagram, Figma } from 'lucide-react';
import { profile } from '../../data/profile';

const socialIcons = [
  { name: 'GitHub', href: profile.links.github, icon: Github },
  { name: 'LinkedIn', href: profile.links.linkedin, icon: Linkedin },
  { name: 'LeetCode', href: profile.links.leetcode, icon: Code2 },
  { name: 'HackerRank', href: profile.links.hackerrank, icon: Terminal },
  { name: 'Instagram', href: profile.links.instagram, icon: Instagram },
  { name: 'Figma', href: profile.links.figma, icon: Figma },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-bg-card/60 backdrop-blur-md py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <img
            src={profile.assets.logoTransparent}
            alt={profile.name}
            className="w-10 h-10 rounded-full object-contain"
          />
          <div>
            <h4 className="font-heading font-bold text-text-primary text-base">
              {profile.name}
            </h4>
            <p className="text-xs text-text-muted">
              Designed & Built with React, Tailwind & VisionOS aesthetic
            </p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3 flex-wrap">
          {socialIcons.map((soc) => {
            const Icon = soc.icon;
            return (
              <a
                key={soc.name}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full glass-panel text-text-muted hover:text-primary hover:border-primary/40 transition-all duration-300 hover:scale-110"
                aria-label={soc.name}
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>

        {/* Copyright & Back to Top */}
        <div className="flex items-center gap-4 text-xs text-text-muted">
          <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full glass-panel hover:text-primary hover:border-primary/40 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
