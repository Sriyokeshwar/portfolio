import React, { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { CursorProvider } from './context/CursorContext';
import { LenisProvider } from './context/LenisContext';
import { SEO } from './components/shared/SEO';
import { CustomCursor } from './components/cursor/CustomCursor';
import { CursorSpotlight } from './components/cursor/CursorSpotlight';
import { NoiseOverlay } from './components/background/NoiseOverlay';
import { AnimatedGrid } from './components/background/AnimatedGrid';
import { FloatingBoxes } from './components/background/FloatingBoxes';
import { ProgressBar } from './components/ui/ProgressBar';
import { Navbar } from './components/layout/Navbar';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { CommandPalette } from './components/layout/CommandPalette';
import { LoadingScreen } from './components/layout/LoadingScreen';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { useMousePosition } from './hooks/useMousePosition';

export default function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  // Initialize mouse position tracking CSS variables
  useMousePosition();

  useEffect(() => {
    const handleToggleCommand = () => setIsCommandPaletteOpen((prev) => !prev);
    window.addEventListener('toggle-command-palette', handleToggleCommand);
    return () => window.removeEventListener('toggle-command-palette', handleToggleCommand);
  }, []);

  // Prevent the page from scrolling behind an open overlay
  useEffect(() => {
    document.body.style.overflow =
      isMobileDrawerOpen || isCommandPaletteOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileDrawerOpen, isCommandPaletteOpen]);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <CursorProvider>
          <LenisProvider>
            <SEO />
            <CustomCursor />
            <CursorSpotlight />
            <NoiseOverlay />
            <ProgressBar />

            <LoadingScreen onComplete={() => setIsLoadingComplete(true)} />

            {isLoadingComplete && (
              <div className="relative min-h-screen bg-bg-dark text-text-primary selection:bg-primary/30 selection:text-primary transition-colors duration-300">
                <AnimatedGrid />
                <FloatingBoxes />
                <Navbar
                  onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
                  onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)}
                />

                <MobileDrawer
                  isOpen={isMobileDrawerOpen}
                  onClose={() => setIsMobileDrawerOpen(false)}
                />

                <CommandPalette
                  isOpen={isCommandPaletteOpen}
                  onClose={() => setIsCommandPaletteOpen(false)}
                />

                <Home />

                <Footer />
              </div>
            )}
          </LenisProvider>
        </CursorProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
