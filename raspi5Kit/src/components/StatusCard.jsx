import '../styles/StatusCard.css';

const StatusCard = ({ icon, label, value, status = 'normal' }) => {
  return (
    <div className={`status-card status-card--${status}`}>
      <div className="status-card__icon">{icon}</div>
      <div className="status-card__label">{label}</div>
      <div className="status-card__value">{value}</div>
      <div className="status-card__scanline"></div>
    </div>
  );
};

export default StatusCard;
