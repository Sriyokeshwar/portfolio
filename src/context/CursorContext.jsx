import React, { createContext, useContext, useState } from 'react';

const CursorContext = createContext();

export const CursorProvider = ({ children }) => {
  const [cursorState, setCursorState] = useState({
    type: 'default', // 'default' | 'hover-link' | 'hover-image' | 'hover-drag' | 'text'
    label: '',
  });

  const setCursor = (type, label = '') => {
    setCursorState({ type, label });
  };

  const resetCursor = () => {
    setCursorState({ type: 'default', label: '' });
  };

  return (
    <CursorContext.Provider value={{ cursorState, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};
