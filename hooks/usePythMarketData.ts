'use client';

import { useState, useEffect } from 'react';
import { PRICE_FEEDS } from '@/lib/data/price-feed';

const API_ENDPOINT = 'https://benchmarks.pyth.network/v1/shims/tradingview';

export interface MarketDataState {
  high24h: number | null;
  low24h: number | null;
  lastUpdated: number | null;
  change24h: number | null;
}

interface UsePythMarketDataResult {
  marketData: MarketDataState;
  loading: boolean;
  error: string | null;
}

const initialMarketState: MarketDataState = {
  high24h: null,
  low24h: null,
  lastUpdated: null,
  change24h: null,
};

export function usePythMarketData(token: string): UsePythMarketDataResult {
  const [marketData, setMarketData] = useState<MarketDataState>(initialMarketState);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const priceFeed = PRICE_FEEDS.find(feed => feed.token === token);
    if (!priceFeed) {
      setError(`Price feed not found for token: ${token}`);
      setLoading(false);
      return;
    }

    async function fetchDailyData() {
      try {
      
        const now = Math.floor(Date.now() / 1000);
        const oneDayAgo = now - 24 * 60 * 60;

       
        const response = await fetch(
          `${API_ENDPOINT}/history?symbol=${encodeURIComponent(token)}&from=${oneDayAgo}&to=${now}&resolution=D`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch daily data');
        }

        const data = await response.json();

        if (!data.h || !data.l || data.h.length === 0 || data.l.length === 0) {
          throw new Error('No data available');
        }

      
        const high = Math.max(...data.h.map((h: string) => parseFloat(h)));
        const low = Math.min(...data.l.map((l: string) => parseFloat(l)));

  
        const currentPrice = parseFloat(data.c[data.c.length - 1]); 
        const previousPrice = parseFloat(data.o[0]); 
        const change24h = ((currentPrice - previousPrice) / previousPrice) * 100;

        if (mounted) {
          setMarketData({
            high24h: high,
            low24h: low,
            lastUpdated: Date.now(),
            change24h: change24h, 
          });
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch market data');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    
    fetchDailyData();

    
    const intervalId = setInterval(fetchDailyData, 120000);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, [token]);

  return { marketData, loading, error };
}