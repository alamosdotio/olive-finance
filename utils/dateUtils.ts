import { addDays, addWeeks, endOfDay, nextFriday } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { formatExpiryLabel } from './formatter';

export function getLondonMidnight(date: Date): Date {
  const londonTime = toZonedTime(date, 'Europe/London');
  const midnight = endOfDay(londonTime);
  const offset = londonTime.getTimezoneOffset() * 60000;
  return new Date(midnight.getTime() - offset);
}

export function getNextFridayDate(weeksToAdd: number = 0): Date {
  const today = new Date();
  const nextFridayDate = nextFriday(today);
  return addWeeks(nextFridayDate, weeksToAdd);
}

export function getExpiryOptions() {
  const today = new Date();
  
  return [
    {
      value: '1',
      label: formatExpiryLabel(today),
      date: getLondonMidnight(today)
    },
    {
      value: '2',
      label: formatExpiryLabel(addDays(today, 2)),
      date: getLondonMidnight(addDays(today, 2))
    },
    {
      value: '3',
      label: formatExpiryLabel(addDays(today, 3)),
      date: getLondonMidnight(addDays(today, 3))
    },
    {
      value: '7',
      label: formatExpiryLabel(getNextFridayDate()),
      date: getLondonMidnight(getNextFridayDate())
    },
    {
      value: '14',
      label: formatExpiryLabel(getNextFridayDate(1)),
      date: getLondonMidnight(getNextFridayDate(1))
    },
    {
      value: '21',
      label: formatExpiryLabel(getNextFridayDate(2)),
      date: getLondonMidnight(getNextFridayDate(2))
    }
  ];
}