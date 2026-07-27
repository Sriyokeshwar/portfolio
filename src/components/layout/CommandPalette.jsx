import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  User,
  Code,
  Briefcase,
  FolderGit2,
  Award,
  BarChart2,
  Mail,
  FileText,
  GraduationCap,
  Github,
  Linkedin,
  Instagram,
  PieChart,
} from 'lucide-react';
import { profile } from '../../data/profile';
import { modalTransition } from '../../motion';

const commands = [
  { id: 'about', label: 'Go to About', section: '#about', icon: User },
  { id: 'education', label: 'Go to Education', section: '#education', icon: GraduationCap },
  { id: 'skills', label: 'Go to Skills', section: '#skills', icon: Code },
  { id: 'experience', label: 'Go to Experience', section: '#experience', icon: Briefcase },
  { id: 'projects', label: 'Go to Projects', section: '#projects', icon: FolderGit2 },
  { id: 'certificates', label: 'Go to Certificates', section: '#certificates', icon: Award },
  { id: 'analytics', label: 'Go to Data Analytics', section: '#analytics', icon: BarChart2 },
  { id: 'contact', label: 'Go to Contact', section: '#contact', icon: Mail },
  { id: 'tableau', label: 'Open Tableau Public Workspace', link: profile.links.tableau, icon: PieChart },
  { id: 'resume', label: 'Download Resume (PDF)', link: profile.assets.resumePdf, icon: FileText },
  { id: 'github', label: 'View GitHub Profile', link: profile.links.github, icon: Github },
  { id: 'linkedin', label: 'View LinkedIn Profile', link: profile.links.linkedin, icon: Linkedin },
  { id: 'instagram', label: 'View Instagram Profile', link: profile.links.instagram, icon: Instagram },
];

export const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else window.dispatchEvent(new CustomEvent('toggle-command-palette'));
      }
      if (e.key === 'Escape' && isOpen) onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (cmd) => {
    onClose();
    if (cmd.section) {
      window.location.hash = cmd.section;
    } else if (cmd.link) {
      window.open(cmd.link, '_blank');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            variants={modalTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative z-10 w-full max-w-xl glass-panel rounded-3xl p-4 shadow-2xl border border-white/10 bg-bg-card/95"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-3 py-2 border-b border-white/10 mb-2">
              <Search className="w-5 h-5 text-primary" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search section..."
                className="w-full bg-transparent text-text-primary placeholder-text-muted text-sm focus:outline-none"
                autoFocus
              />
              <span className="text-[10px] text-text-muted font-mono px-2 py-1 glass-panel rounded">
                ESC
              </span>
            </div>

            {/* Command List */}
            <div className="max-h-80 overflow-y-auto space-y-1">
              {filteredCommands.length === 0 ? (
                <div className="p-4 text-center text-xs text-text-muted">
                  No commands found matching "{query}"
                </div>
              ) : (
                filteredCommands.map((cmd) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => handleSelect(cmd)}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-white/10 text-text-secondary hover:text-text-primary text-sm transition-colors text-left group"
                    >
                      <Icon className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors" />
                      <span>{cmd.label}</span>
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
