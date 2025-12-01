import { useState, useEffect } from 'react';
import '../styles/Settings.css';

const Settings = ({ onClose }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('rpi-theme') || 'green';
  });
  
  const [pollInterval, setPollInterval] = useState(() => {
    return parseInt(localStorage.getItem('rpi-poll-interval')) || 5000;
  });
  
  const [gpioLayout, setGpioLayout] = useState(() => {
    return localStorage.getItem('rpi-gpio-layout') || 'grid';
  });

  const [animations, setAnimations] = useState(() => {
    return localStorage.getItem('rpi-animations') !== 'false';
  });

  useEffect(() => {
    // Apply theme to document
    if (theme === 'green') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('rpi-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('rpi-poll-interval', pollInterval.toString());
    // Dispatch event for App to listen to
    window.dispatchEvent(new CustomEvent('settings-changed', {
      detail: { pollInterval }
    }));
  }, [pollInterval]);

  useEffect(() => {
    localStorage.setItem('rpi-gpio-layout', gpioLayout);
    window.dispatchEvent(new CustomEvent('settings-changed', {
      detail: { gpioLayout }
    }));
  }, [gpioLayout]);

  useEffect(() => {
    localStorage.setItem('rpi-animations', animations.toString());
    document.body.classList.toggle('no-animations', !animations);
  }, [animations]);

  const handleReset = () => {
    if (confirm('Reset all settings to defaults?')) {
      setTheme('green');
      setPollInterval(5000);
      setGpioLayout('grid');
      setAnimations(true);
      localStorage.removeItem('rpi-theme');
      localStorage.removeItem('rpi-poll-interval');
      localStorage.removeItem('rpi-gpio-layout');
      localStorage.removeItem('rpi-animations');
    }
  };

  return (
    <div className="settings-overlay fade-in">
      <div className="settings-panel slide-in">
        <div className="settings-header">
          <h2 className="text-glow">SETTINGS</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="settings-content">
          {/* Theme Selection */}
          <div className="setting-group">
            <label className="setting-label">TERMINAL THEME</label>
            <div className="theme-options">
              <button
                className={`theme-btn ${theme === 'green' ? 'active' : ''}`}
                onClick={() => setTheme('green')}
                style={{ color: '#00ff41' }}
              >
                GREEN
              </button>
              <button
                className={`theme-btn ${theme === 'amber' ? 'active' : ''}`}
                onClick={() => setTheme('amber')}
                style={{ color: '#ffb000' }}
              >
                AMBER
              </button>
              <button
                className={`theme-btn ${theme === 'blue' ? 'active' : ''}`}
                onClick={() => setTheme('blue')}
                style={{ color: '#00d4ff' }}
              >
                BLUE
              </button>
              <button
                className={`theme-btn ${theme === 'red' ? 'active' : ''}`}
                onClick={() => setTheme('red')}
                style={{ color: '#ff2a2a' }}
              >
                RED
              </button>
            </div>
          </div>

          {/* Poll Interval */}
          <div className="setting-group">
            <label className="setting-label">
              STATS UPDATE INTERVAL: {pollInterval / 1000}s
            </label>
            <input
              type="range"
              min="1000"
              max="30000"
              step="1000"
              value={pollInterval}
              onChange={(e) => setPollInterval(parseInt(e.target.value))}
              className="range-slider"
            />
            <div className="range-labels">
              <span>1s</span>
              <span>15s</span>
              <span>30s</span>
            </div>
          </div>

          {/* GPIO Layout */}
          <div className="setting-group">
            <label className="setting-label">GPIO LAYOUT</label>
            <div className="radio-group">
              <label className={`radio-option ${gpioLayout === 'grid' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="gpio-layout"
                  value="grid"
                  checked={gpioLayout === 'grid'}
                  onChange={(e) => setGpioLayout(e.target.value)}
                />
                GRID VIEW
              </label>
              <label className={`radio-option ${gpioLayout === 'list' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="gpio-layout"
                  value="list"
                  checked={gpioLayout === 'list'}
                  onChange={(e) => setGpioLayout(e.target.value)}
                />
                LIST VIEW
              </label>
            </div>
          </div>

          {/* Animations Toggle */}
          <div className="setting-group">
            <label className="setting-label">ANIMATIONS</label>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={animations}
                onChange={(e) => setAnimations(e.target.checked)}
              />
              <span className="toggle-slider"></span>
              <span className="toggle-label">{animations ? 'ENABLED' : 'DISABLED'}</span>
            </label>
          </div>

          {/* Actions */}
          <div className="settings-actions">
            <button className="action-btn reset-btn" onClick={handleReset}>
              RESET DEFAULTS
            </button>
            <button className="action-btn save-btn" onClick={onClose}>
              SAVE & CLOSE
            </button>
          </div>
        </div>

        <div className="settings-footer">
          <p>raspi5Kit v1.0 • CLxL2 Generated</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
