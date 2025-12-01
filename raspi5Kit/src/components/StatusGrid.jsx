import StatusCard from './StatusCard';
import '../styles/StatusGrid.css';

const StatusGrid = ({ stats, isOnline }) => {
  const statusData = [
    {
      icon: '🔌',
      label: 'CONNECTION',
      value: isOnline ? 'ONLINE' : 'OFFLINE',
      status: isOnline ? 'success' : 'error'
    },
    {
      icon: '⚡',
      label: 'CPU USAGE',
      value: `${stats.cpu}%`,
      status: stats.cpu > 80 ? 'error' : stats.cpu > 60 ? 'warning' : 'success'
    },
    {
      icon: '🌡️',
      label: 'TEMPERATURE',
      value: `${stats.temp}°C`,
      status: stats.temp > 70 ? 'error' : stats.temp > 60 ? 'warning' : 'success'
    },
    {
      icon: '💾',
      label: 'STORAGE',
      value: `${stats.storage}%`,
      status: stats.storage > 80 ? 'warning' : 'success'
    }
  ];

  return (
    <section className="status-grid">
      {statusData.map((item, index) => (
        <StatusCard key={index} {...item} />
      ))}
    </section>
  );
};

export default StatusGrid;
