import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Code, Briefcase, FolderGit2, Award, BarChart2, Mail, FileText, GraduationCap } from 'lucide-react';
import { profile } from '../../data/profile';

const drawerLinks = [
  { label: 'About', href: '#about', icon: User },
  { label: 'Education', href: '#education', icon: GraduationCap },
  { label: 'Skills', href: '#skills', icon: Code },
  { label: 'Experience', href: '#experience', icon: Briefcase },
  { label: 'Projects', href: '#projects', icon: FolderGit2 },
  { label: 'Certificates', href: '#certificates', icon: Award },
  { label: 'Analytics', href: '#analytics', icon: BarChart2 },
  { label: 'Contact', href: '#contact', icon: Mail },
];

export const MobileDrawer = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Bottom Drawer Content */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative z-10 w-full glass-panel rounded-t-3xl p-6 border-t border-white/10 shadow-2xl bg-bg-card/95"
          >
            {/* Drawer Handle */}
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-4" />

            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <span className="font-heading font-bold text-lg text-text-primary">
                Navigation
              </span>
              <button
                onClick={onClose}
                className="p-2 text-text-muted hover:text-text-primary rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {drawerLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 rounded-2xl glass-panel hover:border-primary/40 text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{link.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Resume Button CTA */}
            <a
              href={profile.assets.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-primary via-secondary to-accent text-white font-semibold rounded-2xl shadow-[0_0_30px_rgba(96,165,250,0.18)] text-sm"
            >
              <FileText className="w-4 h-4" />
              Download Resume
            </a>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
