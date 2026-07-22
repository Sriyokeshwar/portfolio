import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile } from '../../data/profile';

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
      }, 300);
    };

    // Preload the assets that are actually visible above the fold —
    // real progress, not a fake timer.
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

    // Hard timeout so a slow/failed asset never traps the user on the
    // loading screen indefinitely.
    const timeoutId = setTimeout(finish, 4000);

    Promise.all(loaders).then(() => {
      clearTimeout(timeoutId);
      finish();
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
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-dark text-text-primary"
      >
        {/* Logo reveal */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <img
            src={profile.assets.logoTransparent}
            alt={profile.name}
            className="w-24 h-24 object-contain animate-pulse"
          />
          <div className="absolute inset-0 rounded-full border border-primary/40 animate-ping opacity-40" />
        </motion.div>

        {/* Text */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-xl font-bold tracking-wider mb-4"
        >
          SRIYOKESHWAR<span className="text-primary">.S</span>
        </motion.h2>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-2">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs font-mono text-text-muted">{progress}%</span>
      </motion.div>
    </AnimatePresence>
  );
};
