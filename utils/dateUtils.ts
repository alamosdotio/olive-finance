import { addWeeks, nextFriday, endOfDay, isSameDay, lastDayOfMonth, subDays, addMonths } from 'date-fns';
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

export function getLastFridayOfMonth(monthsToAdd: number = 0): Date {
  const today = new Date();
  const lastDayNextMonth = lastDayOfMonth(addMonths(today, monthsToAdd));
  let lastFriday = lastDayNextMonth;
  
  while (lastFriday.getDay() !== 5) {
    lastFriday = subDays(lastFriday, 1);
  }
  
  return lastFriday;
}

export function addHours(date: Date, hours: number): Date {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

export function getExpiryOptions() {
  const today = new Date();
  const hourlyDates = [
    { hours: 0, value: '1' },
    { hours: 24, value: '2' },
    { hours: 48, value: '3' },
    { hours: 72, value: '4' }
  ].map(({ hours, value }) => ({
    value,
    date: getLondonMidnight(addHours(today, hours)),
    label: formatExpiryLabel(addHours(today, hours))
  }));

  const fridayDates = [
    { weeks: 0, value: '7' },
    { weeks: 1, value: '14' },
    { weeks: 2, value: '21' }
  ].map(({ weeks, value }) => {
    const date = getLondonMidnight(getNextFridayDate(weeks));
    const isDuplicate = hourlyDates.some(hourlyDate => 
      isSameDay(hourlyDate.date, date)
    );
    return isDuplicate ? null : {
      value,
      date,
      label: formatExpiryLabel(getNextFridayDate(weeks))
    };
  }).filter(Boolean);

  const lastFridayDates = [
    { months: 1, value: '28' },
    { months: 2, value: '35' },
    { months: 3, value: '42' },
    { months: 6, value: '49' },
    { months: 9, value: '56' },
    
  ].map(({ months, value }) => {
    const date = getLondonMidnight(getLastFridayOfMonth(months));
    const isDuplicate = [...hourlyDates, ...fridayDates].some(existingDate => 
      existingDate && isSameDay(existingDate.date, date)
    );
    return isDuplicate ? null : {
      value,
      date,
      label: formatExpiryLabel(getLastFridayOfMonth(months))
    };
  }).filter(Boolean);

  return [...hourlyDates, ...fridayDates, ...lastFridayDates];
}