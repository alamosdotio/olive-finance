'use client';

import { useState, useEffect } from 'react';
import { PriceServiceConnection } from '@pythnetwork/price-service-client';
import { PRICE_FEEDS, priceFeed } from '../lib/data/price-feed';

const PYTH_ENDPOINT = 'https://hermes.pyth.network';
const POLLING_INTERVAL = 15000;

interface PythPriceState {
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

export function usePythPrice(token: string): UsePythPriceResult {
  const [priceData, setPriceData] = useState<PythPriceState>(initialPriceState);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    let connection: PriceServiceConnection | null = null;
    let intervalId: NodeJS.Timeout;

    const priceFeed = PRICE_FEEDS.find(feed => feed.token === token);
    if (!priceFeed) {
      setError(`Price feed not found for token: ${token}`);
      setLoading(false);
      return;
    }
    const feedId = priceFeed.id;

    async function fetchPrice() {
      if (!mounted || !connection) return;

      try {
        const priceFeeds = await connection.getLatestPriceFeeds([feedId]);
        const feed = priceFeeds?.[0];
        
        if (!feed) {
          throw new Error('No price feed data available');
        }

        const priceInfo = feed.getPriceNoOlderThan(60);
        console.log(priceInfo)
        if (!priceInfo) {
          setError('Price data is stale');
          return;
        }

        const price = parseFloat(priceInfo.price) * Math.pow(10, priceInfo.expo);
        const confidence = parseFloat(priceInfo.conf) * Math.pow(10, priceInfo.expo);

        setPriceData({
          price,
          confidence,
          timestamp: priceInfo.publishTime,
        });
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch price data');
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    async function initialize() {
      try {
        connection = new PriceServiceConnection(PYTH_ENDPOINT);
        await fetchPrice();
        intervalId = setInterval(fetchPrice, POLLING_INTERVAL);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to connect to Pyth network');
        setLoading(false);
      }
    }

    initialize();

    return () => {
      mounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
      if (connection) {
        connection.closeWebSocket();
      }
    };
  }, [token]);

  return { priceData, loading, error };
}