'use client';

import { useState, useEffect, useRef } from 'react';
import { PRICE_FEEDS } from '@/lib/data/price-feed';

const API_ENDPOINT = 'https://benchmarks.pyth.network/v1/shims/tradingview';
const POLLING_INTERVAL = 180000; 
const CACHE_DURATION = 30000; 

interface MarketDataState {
  high24h: number | null;
  low24h: number | null;
  lastUpdated: number | null;
  change24h: number | null;
  historicalPrices: number[];
}

interface CachedMarketData {
  data: MarketDataState;
  timestamp: number;
}

const marketDataCache = new Map<string, CachedMarketData>();

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
  historicalPrices: [],
};

export function usePythMarketData(token: string): UsePythMarketDataResult {
  const [marketData, setMarketData] = useState<MarketDataState>(initialMarketState);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const requestCountRef = useRef<number>(0);
  const lastRequestTimeRef = useRef<number>(0);

  useEffect(() => {
    let mounted = true;
    let intervalId: NodeJS.Timeout;

    const priceFeed = PRICE_FEEDS.find(feed => feed.token === token);
    if (!priceFeed) {
      setError(`Price feed not found for token: ${token}`);
      setLoading(false);
      return;
    }

    async function fetchMarketData() {
      if (!mounted) return;

      const now = Date.now();
      const cachedResult = marketDataCache.get(token);
      
      if (cachedResult && (now - cachedResult.timestamp) < CACHE_DURATION) {
        setMarketData(cachedResult.data);
        setLoading(false);
        return;
      }

      if (now - lastRequestTimeRef.current < 10000) { 
        if (requestCountRef.current >= 85) { 
          return;
        }
      } else {
        requestCountRef.current = 0;
        lastRequestTimeRef.current = now;
      }

      try {
        // Fetch 30 days of historical data for volatility calculation
        const thirtyDaysAgo = Math.floor(now / 1000) - 30 * 24 * 60 * 60;
        
        const response = await fetch(
          `${API_ENDPOINT}/history?symbol=${encodeURIComponent(token)}&from=${thirtyDaysAgo}&to=${Math.floor(now / 1000)}&resolution=D`
        );
        requestCountRef.current++;

        if (!response.ok) {
          throw new Error('Failed to fetch market data');
        }

        const data = await response.json();

        if (!data.h || !data.l || !data.c || data.h.length === 0 || data.l.length === 0) {
          throw new Error('No data available');
        }

        const high = Math.max(...data.h.slice(-1).map((h: string) => parseFloat(h)));
        const low = Math.min(...data.l.slice(-1).map((l: string) => parseFloat(l)));
        const currentPrice = parseFloat(data.c[data.c.length - 1]); 
        const previousPrice = parseFloat(data.o[data.o.length - 1]); 
        const change24h = ((currentPrice - previousPrice) / previousPrice) * 100;

        const historicalPrices = data.c.map((price: string) => parseFloat(price));

        const newMarketData = {
          high24h: high,
          low24h: low,
          lastUpdated: now,
          change24h: change24h,
          historicalPrices,
        };

        marketDataCache.set(token, {
          data: newMarketData,
          timestamp: now,
        });

        if (mounted) {
          setMarketData(newMarketData);
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

    fetchMarketData();
    intervalId = setInterval(fetchMarketData, POLLING_INTERVAL);

    return () => {
      mounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [token]);

  return { marketData, loading, error };
}

export type { MarketDataState };