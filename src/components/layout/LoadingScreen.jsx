import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile } from '../../data/profile';
import { tokens } from '../../theme/tokens';

export const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    // Check session cache
    const hasLoaded = sessionStorage.getItem('portfolio_loaded');
    if (hasLoaded) {
      setShouldShow(false);
      onComplete();
      return;
    }

    let cancelled = false;
    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      sessionStorage.setItem('portfolio_loaded', 'true');
      setProgress(100);
      setTimeout(() => {
        setShouldShow(false);
        onComplete();
      }, 500); // Allow exit animations to align
    };

    // Preload critical assets
    const criticalAssets = [profile.assets.logoTransparent, profile.assets.heroPortrait];
    let loadedCount = 0;

    const updateProgress = () => {
      loadedCount += 1;
      setProgress(Math.round((loadedCount / criticalAssets.length) * 100));
    };

    const loaders = criticalAssets.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            updateProgress();
            resolve();
          };
          img.onerror = () => {
            updateProgress();
            resolve();
          };
          img.src = src;
        })
    );

    const timeoutId = setTimeout(finish, 3500);

    Promise.all(loaders).then(() => {
      clearTimeout(timeoutId);
      // Give a tiny delay for clean aesthetics
      setTimeout(finish, 400);
    });

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [onComplete]);

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      <motion.div
        exit={{ 
          opacity: 0, 
          filter: 'blur(30px)', 
          scale: 1.05 
        }}
        transition={{ 
          duration: 0.8, 
          ease: tokens.transitions.easePremium 
        }}
        style={{ zIndex: tokens.zIndex.modals }} // Render on modal stack layer
        className="fixed inset-0 flex flex-col items-center justify-center bg-bg-dark text-text-primary"
      >
        {/* Subtle mesh background under loading */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5 opacity-40 pointer-events-none" />

        {/* Logo reveal with smooth scaling and ambient glow */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, filter: 'blur(10px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: tokens.transitions.easePremium }}
          className="relative mb-8"
        >
          <img
            src={profile.assets.logoTransparent}
            alt={profile.name}
            className="w-24 h-24 object-contain animate-pulse-slow"
          />
          <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping opacity-25" style={{ animationDuration: '3s' }} />
        </motion.div>

        {/* Brand Text Stagger */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: tokens.transitions.easePremium }}
          className="font-heading text-2xl font-bold tracking-widest mb-4 uppercase"
        >
          SRIYOKESHWAR<span className="text-primary">.S</span>
        </motion.h2>

        {/* Elegant modern slide-bar container */}
        <div className="relative w-56 h-1 bg-white/5 rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-orange-500 to-secondary"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
        
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-mono text-text-muted"
        >
          {progress}% Ready
        </motion.span>
      </motion.div>
    </AnimatePresence>
  );
};
