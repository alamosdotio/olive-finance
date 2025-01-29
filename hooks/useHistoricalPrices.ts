'use client';

import { useState, useEffect } from 'react';

const API_ENDPOINT = 'https://benchmarks.pyth.network/v1/shims/tradingview';

export function useHistoricalPrices(symbol: string) {
  const [prices, setPrices] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchHistoricalPrices() {
      try {
        const now = Math.floor(Date.now() / 1000);
        const thirtyDaysAgo = now - 30 * 24 * 60 * 60;
        
        const response = await fetch(
          `${API_ENDPOINT}/history?symbol=${encodeURIComponent(symbol)}&from=${thirtyDaysAgo}&to=${now}&resolution=D`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch historical prices');
        }

        const data = await response.json();
        
        if (!data.c || data.c.length === 0) {
          throw new Error('No historical price data available');
        }

        const historicalPrices = data.c.map((price: string) => parseFloat(price));

        if (mounted) {
          setPrices(historicalPrices);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch historical prices');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchHistoricalPrices();

    return () => {
      mounted = false;
    };
  }, [symbol]);

  return { prices, loading, error };
}