import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../components/shared/SectionHeading';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { profile } from '../data/profile';
import { BarChart3, ExternalLink, Maximize2, Minimize2, Play, CheckCircle2, Layers } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { fadeUp } from '../motion';

export const Analytics = () => {
  const [isInteractive, setIsInteractive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <section id="analytics" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto space-y-16">
        <SectionHeading
          badge="Business Intelligence & Insights"
          title="Data Analytics & Visualization"
          subtitle="Interactive Tableau analytics dashboard modeling complex datasets, multi-variable demographic trends, and metrics."
        />

        {/* Dashboard Presentation Container */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <GlassCard
            className={`relative p-4 md:p-6 transition-all duration-500 overflow-hidden ${
              isFullscreen
                ? 'fixed inset-4 z-50 max-w-none h-[calc(100vh-2rem)] flex flex-col justify-between bg-bg-dark/95 backdrop-blur-2xl'
                : ''
            }`}
          >
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl glass-panel text-primary">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-text-primary">
                    Analyzed Stories — Learning Metrics
                  </h3>
                  <p className="text-xs text-text-muted">
                    Tableau Public Workspace • Published by {profile.name}
                  </p>
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  onClick={() => setIsInteractive((prev) => !prev)}
                  onMouseEnter={() => setCursor('hover-link')}
                  onMouseLeave={resetCursor}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold glass-panel border border-primary/30 text-primary hover:bg-primary/10 transition-colors flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isInteractive ? 'Show Image Preview' : 'Load Interactive Viz'}</span>
                </button>

                <Button
                  onClick={toggleFullscreen}
                  variant="outline"
                  size="sm"
                  icon={isFullscreen ? Minimize2 : Maximize2}
                  cursorLabel="Size"
                >
                  {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                </Button>

                <Button
                  href={profile.links.tableau}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="sm"
                  icon={ExternalLink}
                  cursorLabel="Tableau"
                >
                  Open in Tableau
                </Button>
              </div>
            </div>

            {/* Display Viewport: High-Res Image or Embedded Live Dashboard */}
            <div className="relative rounded-2xl overflow-hidden glass-panel border border-white/10 bg-bg-dark min-h-[420px] md:min-h-[560px] flex items-center justify-center group">
              {isInteractive ? (
                <iframe
                  src="https://public.tableau.com/views/Analyzedstories/Learning?:showVizHome=no&:embed=true"
                  title="Analyzed Stories Tableau Dashboard"
                  className="w-full h-full min-h-[560px] border-0 rounded-2xl"
                  loading="lazy"
                />
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={profile.assets.tableauDashboard}
                    alt="Tableau Analytics Dashboard — Analyzed Stories"
                    className="w-full h-auto max-h-[640px] object-contain rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                    <button
                      onClick={() => setIsInteractive(true)}
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-primary via-secondary to-accent text-white font-semibold text-xs shadow-[0_0_30px_rgba(96,165,250,0.18)] hover:scale-105 transition-transform flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" /> Click to launch interactive Tableau iframe
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Metrics Breakdown Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-4 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2 text-text-muted">
                <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                <span>Multi-axis Population & Regional Distribution</span>
              </div>
              <div className="flex items-center gap-2 text-text-muted">
                <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                <span>Time-Series Continuous Trend Models</span>
              </div>
              <div className="flex items-center gap-2 text-text-muted">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Dynamic Parameter Filtering & Area Maps</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};
