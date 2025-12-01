import { useState } from 'react';
import '../styles/Header.css';

const Header = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useState(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`Install prompt: ${outcome}`);
      setDeferredPrompt(null);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">🥧</span>
          <h1>RPi5 KIT</h1>
        </div>
        {deferredPrompt && (
          <button className="install-btn" onClick={handleInstall}>
            INSTALL
          </button>
        )}
      </div>
      <div className="header-line"></div>
    </header>
  );
};

export default Header;
