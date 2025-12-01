import { useState } from 'react';
import GPIOPin from './GPIOPin';
import '../styles/GPIOControl.css';

const GPIOControl = ({ onPinToggle }) => {
  const gpioPins = [2, 3, 4, 17, 27, 22, 10, 9, 11, 5, 6, 13, 19, 26, 14, 15, 18, 23, 24, 25, 8, 7];
  const [pinStates, setPinStates] = useState(
    Object.fromEntries(gpioPins.map(pin => [pin, false]))
  );

  const handlePinToggle = (pin) => {
    const newState = !pinStates[pin];
    setPinStates(prev => ({ ...prev, [pin]: newState }));
    if (onPinToggle) onPinToggle(pin, newState);
  };

  return (
    <section className="gpio-control">
      <h2 className="section-title">GPIO INTERFACE</h2>
      <div className="gpio-grid">
        {gpioPins.map(pin => (
          <GPIOPin 
            key={pin}
            pin={pin}
            active={pinStates[pin]}
            onToggle={() => handlePinToggle(pin)}
          />
        ))}
      </div>
    </section>
  );
};

export default GPIOControl;
