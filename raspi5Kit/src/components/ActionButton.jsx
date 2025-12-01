import { useRef } from 'react';
import { useTouch } from '../hooks/useTouchOnly';
import '../styles/ActionButton.css';

const ActionButton = ({ icon, label, onClick }) => {
  const buttonRef = useRef(null);

  useTouch(buttonRef, () => {
    if (onClick) onClick();
  });

  return (
    <button 
      ref={buttonRef}
      className="action-button"
      onClick={onClick}
    >
      <span className="action-button__icon">{icon}</span>
      <span className="action-button__label">{label}</span>
      <div className="action-button__scanline"></div>
    </button>
  );
};

export default ActionButton;
