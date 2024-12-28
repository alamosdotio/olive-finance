import { useEffect, useState } from 'react';
import { formatCountdown } from '@/utils/formatter';

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      if (targetDate > now) {
        const difference = targetDate.getTime() - now.getTime();
        setTimeLeft(formatCountdown(difference));
      } else {
        setTimeLeft('Expired');
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return <span className="text-xs text-secondary-foreground">{timeLeft}</span>;
}