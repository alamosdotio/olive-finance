'use client';

import { useState, useEffect } from 'react';
import { calculateVolatility, calculateOptionPremium } from '@/utils/optionsPricing';

interface UseOptionsPricingProps {
  type: 'call' | 'put';
  strikePrice: number;
  currentPrice: number;
  expiryDate: Date;
  historicalPrices: number[];
}

export function useOptionsPricing({
  type,
  strikePrice,
  currentPrice,
  expiryDate,
  historicalPrices
}: UseOptionsPricingProps) {
  const [premium, setPremium] = useState<number>(0);
  const [volatility, setVolatility] = useState<number>(0);

  useEffect(() => {
    if (!strikePrice || !currentPrice || !expiryDate || historicalPrices.length === 0) {
      setPremium(0);
      return;
    }

    const calculatedVolatility = calculateVolatility(historicalPrices);
    setVolatility(calculatedVolatility);

    const calculatedPremium = calculateOptionPremium(
      type,
      strikePrice,
      currentPrice,
      expiryDate,
      calculatedVolatility
    );

    setPremium(Math.max(0, calculatedPremium));
  }, [type, strikePrice, currentPrice, expiryDate, historicalPrices]);

  return { premium, volatility };
}