import { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import StatusGrid from './components/StatusGrid';
import ActionPanel from './components/ActionPanel';
import Terminal from './components/Terminal';
import NetworkStatus from './components/NetworkStatus';
import { useSystemStats } from './hooks/useSystemStats';
import { useNetworkStatus } from './hooks/useNetworkStatus';
import './styles/App.css';

// Lazy load heavy components for better performance
const GPIOControl = lazy(() => import('./components/GPIOControl'));
const Settings = lazy(() => import('./components/Settings'));

const App = () => {
  const [showGPIO, setShowGPIO] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [terminalLines, setTerminalLines] = useState([
    { text: 'ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM', type: 'system' },
    { text: 'COPYRIGHT 2075-2102, ROBCO INDUSTRIES', type: 'system' },
    { text: '-Server 1-', type: 'system' },
    { text: '', type: 'output' },
    { text: 'Raspberry Pi 5 Kit Manager Online', type: 'success' },
    { text: 'Type HELP for available commands', type: 'output' }
  ]);

  const systemStats = useSystemStats();
  const isOnline = useNetworkStatus();

  // Listen for settings changes
  useEffect(() => {
    const handleSettingsChange = (e) => {
      const { pollInterval } = e.detail;
      if (pollInterval) {
        addTerminalLine(`Poll interval updated to ${pollInterval / 1000}s`, 'success');
      }
    };
    
    window.addEventListener('settings-changed', handleSettingsChange);
    return () => window.removeEventListener('settings-changed', handleSettingsChange);
  }, []);

  const addTerminalLine = (text, type = 'output') => {
    setTerminalLines(prev => [...prev, { text, type }]);
  };

  const handleCommand = (command) => {
    addTerminalLine(`> ${command}`, 'command');
    
    const cmd = command.toLowerCase().trim();
    
    switch(cmd) {
      case 'help':
        addTerminalLine('AVAILABLE COMMANDS:', 'success');
        addTerminalLine('  HELP     - Display available commands', 'output');
        addTerminalLine('  STATUS   - Show system status', 'output');
        addTerminalLine('  GPIO     - Toggle GPIO panel', 'output');
        addTerminalLine('  SETTINGS - Open settings panel', 'output');
        addTerminalLine('  CLEAR    - Clear terminal', 'output');
        addTerminalLine('  STATS    - Display detailed stats', 'output');
        addTerminalLine('  REBOOT   - Restart system', 'output');
        break;
      
      case 'status':
        addTerminalLine(`SYSTEM STATUS: ${isOnline ? 'ONLINE' : 'OFFLINE'}`, 'success');
        addTerminalLine(`CPU: ${systemStats.cpu}%`, 'output');
        addTerminalLine(`TEMP: ${systemStats.temp}°C`, 'output');
        addTerminalLine(`STORAGE: ${systemStats.storage}% used`, 'output');
        break;
      case 'gpio':
        setShowGPIO(!showGPIO);
        addTerminalLine(`GPIO Control ${!showGPIO ? 'ENABLED' : 'DISABLED'}`, 'success');
        break;
      
      case 'settings':
        setShowSettings(true);
        addTerminalLine('Opening settings panel...', 'success');
        break;
      
      case 'clear':
        setTerminalLines([]);
        break;
      
      case 'stats':
        addTerminalLine('=== DETAILED SYSTEM STATISTICS ===', 'success');
        addTerminalLine(`CPU Usage: ${systemStats.cpu}%`, 'output');
        addTerminalLine(`Temperature: ${systemStats.temp}°C`, 'output');
        addTerminalLine(`Storage Used: ${systemStats.storage}%`, 'output');
        addTerminalLine(`Network: ${isOnline ? 'Connected' : 'Disconnected'}`, 'output');
        addTerminalLine(`Uptime: ${Math.floor(Math.random() * 48)}h ${Math.floor(Math.random() * 60)}m`, 'output');
        break;
      
      case 'reboot':
        addTerminalLine('INITIATING SYSTEM REBOOT...', 'warning');
        setTimeout(() => addTerminalLine('System restart complete', 'success'), 2000);
        break;
      
      default:
        addTerminalLine(`Command not found: ${command}`, 'error');
        addTerminalLine('Type HELP for available commands', 'output');
    }
  };

  return (
    <div className="app">
      <Header onSettingsClick={() => setShowSettings(true)} />
      
      <main className="main-content">
        <StatusGrid 
          stats={systemStats}
          isOnline={isOnline}
        />
        
        <ActionPanel 
          onGPIOToggle={() => {
            setShowGPIO(!showGPIO);
            addTerminalLine(`GPIO Control ${!showGPIO ? 'ENABLED' : 'DISABLED'}`, 'success');
          }}
          onAction={(action) => addTerminalLine(`${action} activated`, 'success')}
        />
        
        <Suspense fallback={<div className="loading fade-in">Loading...</div>}>
          {showGPIO && (
            <GPIOControl 
              onPinToggle={(pin, state) => {
                addTerminalLine(`GPIO ${pin} set to ${state ? 'HIGH' : 'LOW'}`, 'success');
              }}
            />
          )}
          
          {showSettings && (
            <Settings onClose={() => {
              setShowSettings(false);
              addTerminalLine('Settings saved', 'success');
            }} />
          )}
        </Suspense>
        
        <Terminal 
          lines={terminalLines}
          onCommand={handleCommand}
        />
        
        <NetworkStatus isOnline={isOnline} />
      </main>
    </div>
  );
};

export default App;
