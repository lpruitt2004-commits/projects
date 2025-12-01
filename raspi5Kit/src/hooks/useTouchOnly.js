import { useState, useEffect } from 'react';

export const useTouchOnly = () => {
  useEffect(() => {
    // Disable all input fields from showing keyboard
    const disableKeyboard = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        e.target.setAttribute('readonly', 'readonly');
        e.target.setAttribute('inputmode', 'none');
      }
    };

    document.addEventListener('focusin', disableKeyboard);
    
    // Prevent virtual keyboard on mobile
    const style = document.createElement('style');
    style.textContent = `
      input, textarea {
        caret-color: transparent;
        user-select: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('focusin', disableKeyboard);
      document.head.removeChild(style);
    };
  }, []);
};

export const useTouch = (ref, onTouch) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleTouch = (e) => {
      e.preventDefault();
      const touch = e.touches[0] || e.changedTouches[0];
      if (touch && onTouch) {
        onTouch({
          x: touch.clientX,
          y: touch.clientY,
          target: e.target
        });
      }
    };

    element.addEventListener('touchstart', handleTouch, { passive: false });
    element.addEventListener('touchend', handleTouch, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouch);
      element.removeEventListener('touchend', handleTouch);
    };
  }, [ref, onTouch]);
};
