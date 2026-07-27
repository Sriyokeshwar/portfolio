import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from '../components/shared/SectionHeading';
import { GlassCard } from '../components/ui/GlassCard';
import { Modal } from '../components/ui/Modal';
import { certificates } from '../data/certificates';
import { Award, ExternalLink, FileText, Eye } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const { setCursor, resetCursor } = useCursor();
  const prefersReducedMotion = useReducedMotion();

  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP Horizontal Translate of Track on Vertical Scroll
  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    // Calculate translation amount
    const getScrollAmount = () => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      return -(trackWidth - viewportWidth + 120); // offset margin
    };

    const pinTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: () => `+=${track.scrollWidth - window.innerWidth + 120}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      invalidateOnRefresh: true,
    });

    const translateAnimation = gsap.to(track, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${track.scrollWidth - window.innerWidth + 120}`,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    // Make cards slightly rotate as they slide across screen
    const cards = gsap.utils.toArray('.cert-card-item');
    cards.forEach((card, idx) => {
      gsap.fromTo(card,
        { rotate: idx % 2 === 0 ? 2 : -2 },
        {
          rotate: idx % 2 === 0 ? -2 : 2,
          scrollTrigger: {
            trigger: card,
            containerAnimation: translateAnimation,
            start: 'left right',
            end: 'right left',
            scrub: 1,
          }
        }
      );
    });

    return () => {
      pinTrigger.kill();
      translateAnimation.kill();
    };
  }, [prefersReducedMotion, isMobile]);

  return (
    <section
      ref={containerRef}
      id="certificates"
      className="py-24 px-6 relative z-10 bg-[#050816] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        <SectionHeading
          badge="Verified Credentials"
          title="Certifications & Honors"
          subtitle="Official technical credentials earned from IBM, NPTEL IIT Kharagpur, IIT Bombay, and industry R&D firms."
        />

        {isMobile ? (
          // Mobile View: Touch swipe scroll track
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 no-scrollbar scroll-smooth">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="w-[280px] shrink-0 snap-center"
                onClick={() => setSelectedCert(cert)}
              >
                <GlassCard
                  glowColor="rgba(139, 92, 246, 0.2)"
                  className="p-6 h-[260px] flex flex-col justify-between border border-white/10"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-primary font-semibold uppercase tracking-wider flex items-center gap-1">
                      <Award className="w-3 h-3" /> {cert.category}
                    </span>
                    <h3 className="text-base font-bold font-heading text-text-primary">
                      {cert.title}
                    </h3>
                    <p className="text-[11px] font-semibold text-secondary">
                      {cert.issuer}
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] text-text-muted flex items-center justify-between border-t border-white/10">
                    <span>Click to preview</span>
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        ) : (
          // Desktop View: GSAP pinned horizontal stream with rotative cards
          <div className="relative w-full flex items-center overflow-visible select-none min-h-[350px]">
            <div
              ref={trackRef}
              className="flex gap-8 flex-nowrap items-center py-6 px-12"
              style={{ willChange: 'transform' }}
            >
              {certificates.map((cert, idx) => (
                <div
                  key={cert.id}
                  className="cert-card-item w-[340px] shrink-0 transform-gpu transition-all duration-300 hover:-translate-y-4 hover:scale-[1.02] hover:rotate-0 hover:z-20"
                  onClick={() => setSelectedCert(cert)}
                  onMouseEnter={() => setCursor('hover-image', 'Inspect')}
                  onMouseLeave={resetCursor}
                >
                  <GlassCard
                    glowColor="rgba(139, 92, 246, 0.25)"
                    className="p-6 h-[260px] flex flex-col justify-between border border-white/10 shadow-xl cursor-pointer"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-primary font-semibold uppercase tracking-wider flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5" /> {cert.category}
                        </span>
                        <span className="text-xs font-mono text-text-muted">
                          {cert.year}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold font-heading text-text-primary hover:text-primary transition-colors line-clamp-2">
                        {cert.title}
                      </h3>

                      <p className="text-xs font-medium text-secondary">
                        {cert.issuer} {cert.score && `• ${cert.score}`}
                      </p>

                      <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                        {cert.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-primary" /> Click to preview
                      </span>
                      <Eye className="w-4 h-4 hover:text-primary transition-colors" />
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Certificate Viewer Modal */}
      <Modal
        isOpen={Boolean(selectedCert)}
        onClose={() => setSelectedCert(null)}
        title={selectedCert?.title || ''}
      >
        {selectedCert && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-text-muted border-b border-white/10 pb-3">
              <span>Issuer: <strong className="text-text-primary">{selectedCert.issuer}</strong></span>
              <span>Year: <strong className="text-text-primary">{selectedCert.year}</strong></span>
            </div>

            <div className="rounded-2xl overflow-hidden glass-panel border border-white/10 p-2 bg-bg-dark flex justify-center items-center min-h-[400px]">
              {selectedCert.type === 'image' ? (
                <img
                  src={selectedCert.file}
                  alt={selectedCert.title}
                  className="max-h-[600px] w-auto object-contain rounded-xl"
                />
              ) : (
                <iframe
                  src={`${selectedCert.file}#toolbar=0`}
                  title={selectedCert.title}
                  className="w-full h-[600px] rounded-xl border-0"
                />
              )}
            </div>

            <div className="flex justify-end">
              <a
                href={selectedCert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-amber-500 text-white rounded-full font-semibold text-xs shadow-glow hover:brightness-110 transition-all"
              >
                <ExternalLink className="w-4 h-4" /> Open Full Document
              </a>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
