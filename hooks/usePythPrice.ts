"use client";

import { useState, useEffect, useRef } from "react";
import { PRICE_FEEDS } from "../lib/data/price-feed";
import { HermesClient } from "@pythnetwork/hermes-client";
const PYTH_ENDPOINT = "https://hermes.pyth.network";
const POLLING_INTERVAL = 15000;
const HISTORICAL_INTERVAL = 45000;

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

interface PriceChangeState {
  currentPrice: number | null;
  pastPrice: number | null;
  change: number | null;
  percentChange: number | null;
  loading: boolean;
  error: string | null;
}

export function usePythPrice(token: string): UsePythPriceResult {
  const [priceData, setPriceData] = useState<PythPriceState>({
    price: null,
    confidence: null,
    timestamp: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const feed = PRICE_FEEDS.find((f) => f.token === token);
    if (!feed) {
      setError("Invalid token");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/pyth-price?id=${feed.id}`);
        const data = await res.json();
        const price = parseFloat(data.parsed[0].price.price) * Math.pow(10, data.parsed[0].price.expo);
        const confidence = parseFloat(data.parsed[0].price.conf) * Math.pow(10, data.parsed[0].price.expo);
        const timestamp = data.parsed[0].price.publish_time * 1000;

        if (mounted) {
          setPriceData({ price, confidence, timestamp });
          setError(null);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || "Fetch failed");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    const interval = setInterval(fetchData, POLLING_INTERVAL);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [token]);
  return { priceData, loading, error };
}

export function usePyth24hChange(token : string) : PriceChangeState{
  const [state, setState] = useState<PriceChangeState>({
    currentPrice: null,
    pastPrice: null,
    change: null,
    percentChange: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    let mounted = true;
    const feed = PRICE_FEEDS.find((f) => f.token === token);
    if (!feed) {
      setState((s) => ({ ...s, error: 'Invalid token', loading: false }));
      return;
    }

    const fetchPrices = async () => {
      try {
        const [nowRes, pastRes] = await Promise.all([
          fetch(`/api/pyth-price?id=${feed.id}`),
          fetch(`/api/pyth-price-history?id=${feed.id}&ago=24h`)
        ])

        const nowData = await nowRes.json();
        const pastData = await pastRes.json();

        console.log('now',nowData);
        console.log('past',pastData);
        const currentPrice = parseFloat(nowData.parsed[0].price.price);
        const pastPrice = parseFloat(pastData.parsed[0].price.price);
        const change = currentPrice - pastPrice;
        const percentChange = (change / pastPrice) * 100;

        if (mounted) {
          setState({
            currentPrice,
            pastPrice,
            change,
            percentChange,
            loading: false,
            error: null,
          });
        }
        
      } catch (err: any) {
        if (mounted) {
          setState((s) => ({
            ...s,
            loading: false,
            error: err.message || 'Failed to fetch prices',
          }));
        }
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, HISTORICAL_INTERVAL);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [token]);

  return state;
}


export const getPythPrice = async (token: string, timestamp: number) => {
  const priceFeed = PRICE_FEEDS.find((feed) => feed.token === token);
  const globalConnection = new HermesClient(PYTH_ENDPOINT);
  if (!priceFeed) return 0;
  const priceData = await globalConnection.getPriceUpdatesAtTimestamp(
    Math.round(timestamp / 1000),
    [priceFeed.id],
    { parsed: true, ignoreInvalidPriceIds: true }
  );
  if (priceData) {
    //TODO: to update on Mainnet
    // const price = priceData.getEmaPriceNoOlderThan(300); // Historical price data
    const price = priceData.parsed?.find((feed) =>
      priceFeed.id.includes(feed.id)
    );

    if (!price) return 0;
    // Adjust price and confidence with exponent
    return parseFloat(price.price.price) * Math.pow(10, price.price.expo);
  } else {
    console.log("No price data available for that time.");
    return 0;
  }
};
