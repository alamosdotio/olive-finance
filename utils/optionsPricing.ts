import { differenceInDays } from 'date-fns';

export function calculateVolatility(prices: number[], windowSize: number = 30): number {
    if (prices.length < 2) return 0.5;
    

    const returns = [];
    for (let i = 1; i < prices.length; i++) {
      if (prices[i] > 0 && prices[i - 1] > 0) {
        returns.push(Math.log(prices[i] / prices[i - 1]));
      }
    }
  
    if (returns.length === 0) return 0.5;
  

    const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
    const variance = returns.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (returns.length - 1);
    const stdDev = Math.sqrt(variance);
  

    const annualizedVol = stdDev * Math.sqrt(252);
    return Math.max(annualizedVol, 0.1); 
  }
  
 
  export function calculateOptionPremium(
    type: 'call' | 'put',
    strikePrice: number,
    currentPrice: number,
    expiryDate: Date,
    volatility: number
  ): number {
    if (!strikePrice || !currentPrice || !expiryDate || !volatility) return 0;
  
    const today = new Date();
    const daysToExpiry = Math.max(1, differenceInDays(expiryDate, today));
    const period = daysToExpiry / 365;
  
    const basePrice = currentPrice * volatility * Math.sqrt(period);
    
    if (type === 'call') {
      const moneyness = currentPrice / strikePrice;
      return basePrice * moneyness;
    } else {
      const moneyness = strikePrice / currentPrice;
      return basePrice * moneyness;
    }
  }
  
  export function calculateOptionsQuantity(
    amount: number,
    premium: number
  ): number {
    if (!amount || !premium || premium <= 0) return 0;
    return parseFloat((amount / premium).toFixed(8));
  }
  

  export function calculateTokensNeeded(
    optionsQuantity: number,
    premium: number
  ): number {
    if (!optionsQuantity || !premium) return 0;
    return parseFloat((optionsQuantity * premium).toFixed(8));
  }
  

  export function convertPrice(
    amount: number,
    fromTokenPrice: number,
    toTokenPrice: number
  ): number {
    if (!amount || !fromTokenPrice || !toTokenPrice || toTokenPrice <= 0) return 0;
    return parseFloat(((amount * fromTokenPrice) / toTokenPrice).toFixed(8));
  }
  
