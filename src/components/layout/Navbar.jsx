import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, Moon, Sun, Menu } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useCursor } from '../../context/CursorContext';
import { profile } from '../../data/profile';
import { tokens } from '../../theme/tokens';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar = ({ onOpenCommandPalette, onOpenMobileDrawer }) => {
  const { theme, toggleTheme } = useTheme();
  const { setCursor, resetCursor } = useCursor();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Section spy
      const sections = navItems.map((item) =>
        document.querySelector(item.href)
      );
      const scrollPos = currentScrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].href);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: tokens.transitions.easePremium }}
          style={{ zIndex: tokens.zIndex.navigation }}
          className="fixed top-5 left-0 right-0 flex justify-center px-4"
        >
          <nav className="glass-panel rounded-full px-5 py-3 flex items-center justify-between gap-4 md:gap-8 shadow-2xl border border-white/10 max-w-4xl w-full backdrop-blur-vision hover:border-primary/30 transition-colors duration-500">
            {/* Brand Logo */}
            <a
              href="#hero"
              onClick={handleLogoClick}
              onMouseEnter={() => setCursor('hover-link', 'Home')}
              onMouseLeave={resetCursor}
              className="flex items-center gap-2.5 group shrink-0"
            >
              <img
                src={profile.assets.logoTransparent}
                alt={profile.name}
                className="w-8 h-8 rounded-full object-contain group-hover:rotate-12 transition-transform duration-300"
              />
              <span className="font-heading font-bold text-sm md:text-base text-text-primary tracking-tight">
                Sriyokeshwar<span className="text-primary">.S</span>
              </span>
            </a>

            {/* Desktop Nav Items */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => setCursor('hover-link')}
                    onMouseLeave={resetCursor}
                    className={`relative px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                      isActive
                        ? 'text-text-primary'
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavDock"
                        className="absolute inset-0 bg-primary/20 rounded-full border border-primary/40 -z-10 shadow-[0_0_12px_rgba(96,165,250,0.18)]"
                        transition={{ type: 'spring', stiffness: 350, damping: 22, mass: 0.7 }} // Liquid spring morph
                      />
                    )}
                    {item.label}
                  </a>
                );
              })}
            </div>

            {/* Actions: Command Palette & Theme Toggle & Mobile Menu */}
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenCommandPalette}
                onMouseEnter={() => setCursor('hover-link', 'Search')}
                onMouseLeave={resetCursor}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-muted hover:text-text-primary glass-panel rounded-full hover:border-primary/40 transition-colors"
                title="Command Palette (Ctrl+K)"
              >
                <Command className="w-3.5 h-3.5 text-primary" />
                <span className="hidden sm:inline font-mono text-[10px]">Ctrl K</span>
              </button>

              <button
                onClick={toggleTheme}
                onMouseEnter={() => setCursor('hover-link', 'Theme')}
                onMouseLeave={resetCursor}
                className="p-2 rounded-full text-text-muted hover:text-text-primary hover:bg-white/10 transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-primary" />
                ) : (
                  <Moon className="w-4 h-4 text-secondary" />
                )}
              </button>

              <button
                onClick={onOpenMobileDrawer}
                className="md:hidden p-2 rounded-full text-text-primary hover:bg-white/10"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
};
