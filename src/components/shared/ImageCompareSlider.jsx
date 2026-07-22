import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

export const ImageCompareSlider = ({ images = [], alt = 'Project Screenshot' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setCursor, resetCursor } = useCursor();

  if (!images.length) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden glass-panel border border-white/10 group aspect-video bg-bg-dark"
      onMouseEnter={() => setCursor('hover-drag', 'Drag')}
      onMouseLeave={resetCursor}
    >
      {/* Active Image */}
      <img
        src={images[currentIndex]}
        alt={`${alt} ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        loading="lazy"
      />

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass-panel text-text-primary hover:bg-white/20 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass-panel text-text-primary hover:bg-white/20 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 px-3 py-1 glass-panel rounded-full">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-6 bg-primary'
                    : 'bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
