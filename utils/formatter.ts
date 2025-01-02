import { format } from 'date-fns';

export function formatExpiryLabel(date: Date): string {
  return format(date, 'ddMMMyy').toUpperCase();
}

export function formatCountdown(timeLeft: number): string {
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return `${days}d:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function formatPrice(price: number): string {
  if (price < 10) {
    const priceString = price.toString();
    const [, decimalPart] = priceString.split('.');
    const firstNonZeroIndex = decimalPart.search(/[1-9]/);
    
    if (firstNonZeroIndex === -1) {
      return price.toFixed(4);
    } else {
      const digitsToShow = firstNonZeroIndex + 4;
      return price.toFixed(Math.min(digitsToShow, 8));
    }
  } else {
    return price.toFixed(2);
  }
}