import '../styles/NetworkStatus.css';

const NetworkStatus = ({ isOnline }) => {
  return (
    <div className="network-status">
      <span className={`network-status__indicator ${isOnline ? 'network-status__indicator--online' : 'network-status__indicator--offline'}`}></span>
      <span className="network-status__text">
        {isOnline ? 'SYSTEM ONLINE' : 'SYSTEM OFFLINE'}
      </span>
    </div>
  );
};

export default NetworkStatus;
