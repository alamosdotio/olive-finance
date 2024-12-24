'use client';

import { useState, useEffect } from 'react';
import { PriceServiceConnection, PriceFeed, Price } from '@pythnetwork/price-service-client';

const PYTH_ENDPOINT = 'https://hermes.pyth.network';
const SOL_PRICE_FEED_ID = '0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d';
const LAMPORTS_PER_SOL = 1e8;

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

export function usePythPrice(): UsePythPriceResult {
  const [priceData, setPriceData] = useState<PythPriceState>(initialPriceState);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let connection: PriceServiceConnection | null = null;
    let mounted = true;

    async function updatePrice(priceFeed: PriceFeed) {
      if (!mounted) return;
      
      try {
        const priceInfo = priceFeed.getPriceNoOlderThan(60);
        if (!priceInfo) {
          setError('Price data is stale');
          return;
        }

        const priceInSol = parseFloat(priceInfo.price.toString()) / LAMPORTS_PER_SOL;
        const confidenceInSol = parseFloat(priceInfo.conf.toString()) / LAMPORTS_PER_SOL;

        setPriceData({
          price: priceInSol,
          confidence: confidenceInSol,
          timestamp: priceInfo.publishTime,
        });
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to parse price data');
      }
    }

    async function initializePriceConnection() {
      if (!mounted) return;

      try {
        setLoading(true);
        connection = new PriceServiceConnection(PYTH_ENDPOINT);
        
        const priceFeeds = await connection.getLatestPriceFeeds([SOL_PRICE_FEED_ID]);
        if (!priceFeeds?.[0]) {
          throw new Error('No price feed data available');
        }

        await updatePrice(priceFeeds[0]);
        connection.subscribePriceFeedUpdates([SOL_PRICE_FEED_ID], updatePrice);
        
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to connect to Pyth network');
        setLoading(false);
      }
    }

    initializePriceConnection();

    return () => {
      mounted = false;
      if (connection) {
        connection.closeWebSocket();
      }
    };
  }, []);

  return { priceData, loading, error };
}