'use client';

import { useState, useEffect, useRef } from 'react';
import { PriceServiceConnection } from '@pythnetwork/price-service-client';
import { PRICE_FEEDS } from '../lib/data/price-feed';

const PYTH_ENDPOINT = 'https://hermes.pyth.network';
const POLLING_INTERVAL = 15000; // 15 seconds polling interval
const CACHE_DURATION = 10000; // 10 seconds cache duration

interface CachedPrice {
  data: PythPriceState;
  timestamp: number;
}

const priceCache = new Map<string, CachedPrice>();

export interface PythPriceState {
  price: number | null;
  confidence: number | null;
  timestamp: number | null;
}

interface UsePythPriceResult {
  priceData: PythPriceState;
  loading: boolean;
  error: string | null;
}

const initialPriceState: PythPriceState = {
  price: null,
  confidence: null,
  timestamp: null,
};

let globalConnection: PriceServiceConnection | null = null;

export function usePythPrice(token: string): UsePythPriceResult {
  const [priceData, setPriceData] = useState<PythPriceState>(initialPriceState);
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

    const feedId = priceFeed.id;

    async function fetchPrice() {
      if (!mounted) return;

      const now = Date.now();
      const cachedResult = priceCache.get(token);
      
      // Check cache first
      if (cachedResult && (now - cachedResult.timestamp) < CACHE_DURATION) {
        setPriceData(cachedResult.data);
        setLoading(false);
        return;
      }

      // Rate limiting check
      if (now - lastRequestTimeRef.current < 10000) { // 10 second window
        if (requestCountRef.current >= 25) { // Keep below 30 req/10s limit
          return;
        }
      } else {
        requestCountRef.current = 0;
        lastRequestTimeRef.current = now;
      }

      try {
        if (!globalConnection) {
          globalConnection = new PriceServiceConnection(PYTH_ENDPOINT);
        }

        const priceFeeds = await globalConnection.getLatestPriceFeeds([feedId]);
        requestCountRef.current++;
        
        const feed = priceFeeds?.[0];
        if (!feed) {
          throw new Error('No price feed data available');
        }

        const priceInfo = feed.getPriceNoOlderThan(60);
        if (!priceInfo) {
          setError('Price data is stale');
          return;
        }

        const price = parseFloat(priceInfo.price) * Math.pow(10, priceInfo.expo);
        const confidence = parseFloat(priceInfo.conf) * Math.pow(10, priceInfo.expo);
        
        const newPriceData = {
          price,
          confidence,
          timestamp: priceInfo.publishTime,
        };

        // Update cache
        priceCache.set(token, {
          data: newPriceData,
          timestamp: now,
        });

        if (mounted) {
          setPriceData(newPriceData);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch price data');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchPrice();
    intervalId = setInterval(fetchPrice, POLLING_INTERVAL);

    return () => {
      mounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [token]);

  return { priceData, loading, error };
}