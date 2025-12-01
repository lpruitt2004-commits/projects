import { useRef } from 'react';
import { useTouch } from '../hooks/useTouchOnly';
import '../styles/GPIOPin.css';

const GPIOPin = ({ pin, active, onToggle }) => {
  const pinRef = useRef(null);

  useTouch(pinRef, () => {
    if (onToggle) onToggle();
  });

  return (
    <div 
      ref={pinRef}
      className={`gpio-pin ${active ? 'gpio-pin--active' : ''}`}
      onClick={onToggle}
    >
      <div className="gpio-pin__number">GPIO {pin}</div>
      <div className="gpio-pin__status">{active ? 'HIGH' : 'LOW'}</div>
      <div className="gpio-pin__indicator"></div>
    </div>
  );
};

export default GPIOPin;
