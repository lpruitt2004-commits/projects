import ActionButton from './ActionButton';
import '../styles/ActionPanel.css';

const ActionPanel = ({ onGPIOToggle, onAction }) => {
  const actions = [
    { icon: '🔧', label: 'GPIO', action: onGPIOToggle },
    { icon: '📷', label: 'CAMERA', action: () => onAction('CAMERA') },
    { icon: '📜', label: 'SCRIPTS', action: () => onAction('SCRIPTS') },
    { icon: '⚙️', label: 'CONFIG', action: () => onAction('CONFIG') }
  ];

  return (
    <section className="action-panel">
      <h2 className="section-title">QUICK ACCESS</h2>
      <div className="action-grid">
        {actions.map((item, index) => (
          <ActionButton 
            key={index}
            icon={item.icon}
            label={item.label}
            onClick={item.action}
          />
        ))}
      </div>
    </section>
  );
};

export default ActionPanel;
