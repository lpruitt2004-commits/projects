import { useRef, useEffect, useState } from 'react';
import TerminalKeyboard from './TerminalKeyboard';
import '../styles/Terminal.css';

const Terminal = ({ lines, onCommand }) => {
  const terminalRef = useRef(null);
  const [currentInput, setCurrentInput] = useState('');

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleKeyPress = (key) => {
    if (key === 'ENTER') {
      if (currentInput.trim()) {
        onCommand(currentInput);
        setCurrentInput('');
      }
    } else if (key === 'BACK') {
      setCurrentInput(prev => prev.slice(0, -1));
    } else if (key === 'SPACE') {
      setCurrentInput(prev => prev + ' ');
    } else if (key === 'CLEAR') {
      setCurrentInput('');
    } else {
      setCurrentInput(prev => prev + key);
    }
  };

  return (
    <section className="terminal-section">
      <h2 className="section-title">TERMINAL</h2>
      <div className="terminal" ref={terminalRef}>
        <div className="terminal__scanlines"></div>
        {lines.map((line, index) => (
          <div key={index} className={`terminal__line terminal__line--${line.type}`}>
            {line.text}
          </div>
        ))}
        <div className="terminal__input-line">
          <span className="terminal__prompt">&gt;</span>
          <span className="terminal__input">{currentInput}</span>
          <span className="terminal__cursor">█</span>
        </div>
      </div>
      <TerminalKeyboard onKeyPress={handleKeyPress} />
    </section>
  );
};

export default Terminal;
