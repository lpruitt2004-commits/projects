import { useRef } from 'react';
import { useTouch } from '../hooks/useTouchOnly';
import '../styles/TerminalKeyboard.css';

const TerminalKeyboard = ({ onKeyPress }) => {
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ['SPACE', 'BACK', 'CLEAR', 'ENTER']
  ];

  return (
    <div className="terminal-keyboard">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="terminal-keyboard__row">
          {row.map((key) => (
            <KeyButton 
              key={key}
              keyLabel={key}
              onPress={() => onKeyPress(key)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const KeyButton = ({ keyLabel, onPress }) => {
  const keyRef = useRef(null);

  useTouch(keyRef, () => {
    if (onPress) onPress();
  });

  return (
    <button
      ref={keyRef}
      className={`terminal-keyboard__key ${keyLabel.length > 1 ? 'terminal-keyboard__key--wide' : ''}`}
      onClick={onPress}
    >
      {keyLabel}
    </button>
  );
};

export default TerminalKeyboard;
