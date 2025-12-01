import { useState, useEffect } from 'react';

export const useSystemStats = () => {
  const [stats, setStats] = useState({
    cpu: 0,
    temp: 0,
    storage: 0
  });

  useEffect(() => {
    const updateStats = () => {
      setStats({
        cpu: Math.floor(Math.random() * 100),
        temp: (Math.random() * 20 + 40).toFixed(1),
        storage: Math.floor(Math.random() * 100)
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 5000);

    return () => clearInterval(interval);
  }, []);

  return stats;
};
