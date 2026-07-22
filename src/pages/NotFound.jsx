import React from 'react';
import { motion } from 'framer-motion';
import { Home as HomeIcon, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 relative z-10 bg-bg-dark">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md glass-panel p-8 rounded-3xl space-y-6 border border-white/10"
      >
        <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center mx-auto text-primary animate-bounce">
          <AlertCircle className="w-8 h-8" />
        </div>

        <h1 className="text-6xl font-bold font-heading text-primary">404</h1>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-heading text-text-primary">
            Page Not Found
          </h2>
          <p className="text-sm text-text-muted">
            The page or resource you are looking for has been shifted or does not exist in this universe.
          </p>
        </div>

        <Button href="/" variant="primary" size="md" icon={HomeIcon} className="w-full justify-center">
          Back to Portfolio
        </Button>
      </motion.div>
    </div>
  );
};
