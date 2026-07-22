import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/shared/SectionHeading';
import { GlassCard } from '../components/ui/GlassCard';
import { Modal } from '../components/ui/Modal';
import { certificates } from '../data/certificates';
import { Award, ExternalLink, FileText, Eye } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { fadeUp } from '../animations/variants';

export const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const { setCursor, resetCursor } = useCursor();

  return (
    <section id="certificates" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto space-y-16">
        <SectionHeading
          badge="Verified Credentials"
          title="Certifications & Honors"
          subtitle="Official accreditations from IBM, NPTEL IIT Kharagpur, Spoken Tutorial IIT Bombay, and industry R&D firms."
        />

        {/* Certificate Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <GlassCard
                className="p-6 flex flex-col justify-between space-y-4 h-full cursor-pointer group"
                onClick={() => setSelectedCert(cert)}
                onMouseEnter={() => setCursor('hover-image', 'Preview')}
                onMouseLeave={resetCursor}
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

                  <h3 className="text-lg font-bold font-heading text-text-primary group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>

                  <p className="text-xs font-medium text-secondary">
                    {cert.issuer} {cert.score && `• ${cert.score}`}
                  </p>

                  <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-text-muted border-t border-white/10 group-hover:text-text-primary transition-colors">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-primary" /> Click to inspect
                  </span>
                  <Eye className="w-4 h-4 group-hover:text-primary transition-colors" />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Preview Modal */}
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

            {/* Display Image or PDF Embed */}
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
