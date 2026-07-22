import { useEffect } from 'react';

export const useKeyboardShortcuts = ({ onEscape, onArrowLeft, onArrowRight, active = true }) => {
  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onEscape) {
        onEscape();
      } else if (e.key === 'ArrowLeft' && onArrowLeft) {
        onArrowLeft();
      } else if (e.key === 'ArrowRight' && onArrowRight) {
        onArrowRight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEscape, onArrowLeft, onArrowRight, active]);
};
