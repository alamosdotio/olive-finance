'use client';

import { Bar } from '@/types/trading';
import { subscribeOnStream, unsubscribeFromStream } from './streaming';

const API_ENDPOINT = 'https://benchmarks.pyth.network/v1/shims/tradingview';
const lastBarsCache = new Map<string, Bar>();
const logoCache = new Map<string, string>();
const historyCache = new Map<string, { bars: Bar[]; timestamp: number }>();


const REQUEST_LIMIT = 25; 
const TIME_WINDOW = 10000;
const CACHE_DURATION = 5 * 60 * 1000; 

let requestCount = 0;
let lastRequestTime = 0;

const canMakeRequest = () => {
  const now = Date.now();
  if (now - lastRequestTime >= TIME_WINDOW) {
    requestCount = 0;
    lastRequestTime = now;
    return true;
  }
  return requestCount < REQUEST_LIMIT;
};

const getCacheKey = (symbol: string, from: number, to: number, resolution: string) => {
  return `${symbol}-${from}-${to}-${resolution}`;
};

const isCacheValid = (timestamp: number) => {
  return Date.now() - timestamp < CACHE_DURATION;
};

export const setSymbolLogo = (symbol: string, logoPath: string) => {
  logoCache.set(symbol, logoPath);
};

const retryWithBackoff = async <T>(fn: () => Promise<T>, maxRetries = 3, baseDelay = 2000): Promise<T> => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      const delay = baseDelay * Math.pow(2, i);
      await new Promise(resolve => setTimeout(resolve, delay + Math.random() * 1000));
    }
  }
  throw new Error('Retry failed');
};

const datafeed = {
  onReady: (callback: (config: any) => void) => {
    setTimeout(() => callback({
      supported_resolutions: ["1", "5", "15", "30", "60", "240", "D"],
      supports_marks: false,
      supports_timescale_marks: false,
      supports_time: true,
      exchanges: [
        {
          value: 'PYTH',
          name: 'PYTH',
          desc: 'Pyth Network'
        }
      ],
      symbols_types: [
        {
          name: 'crypto',
          value: 'crypto'
        }
      ]
    }), 0);
  },

  searchSymbols: async (
    userInput: string,
    exchange: string,
    symbolType: string,
    onResultReadyCallback: (result: any) => void
  ) => {
    if (!canMakeRequest()) {
      onResultReadyCallback([]);
      return;
    }

    try {
      requestCount++;
      const response = await fetch(`${API_ENDPOINT}/search?query=${encodeURIComponent(userInput)}`, {
        mode: 'cors',
        headers: {
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      onResultReadyCallback(data);
    } catch (error) {
      console.warn('[datafeed] Search error:', error instanceof Error ? error.message : 'Unknown error');
      onResultReadyCallback([]);
    }
  },

  resolveSymbol: async (
    symbolName: string,
    onSymbolResolvedCallback: (symbolInfo: any) => void,
    onResolveErrorCallback: (error: string) => void
  ) => {
    try {
      if (!canMakeRequest()) {
        throw new Error('Rate limit exceeded');
      }

      requestCount++;
      const response = await retryWithBackoff(async () => {
        const res = await fetch(`${API_ENDPOINT}/symbols?symbol=${encodeURIComponent(symbolName)}`, {
          mode: 'cors',
          headers: {
            'Accept': 'application/json'
          }
        });
        if (!res.ok) throw new Error('Symbol not found');
        return res;
      });

      const symbolInfo = await response.json();
      
      const logoPath = logoCache.get(symbolName);
      if (logoPath) {
        symbolInfo.logo_urls = [logoPath];
      }
      
      onSymbolResolvedCallback(symbolInfo);
    } catch (error) {
      console.warn('[datafeed] Symbol resolve error:', error instanceof Error ? error.message : 'Unknown error');
      onResolveErrorCallback('Cannot resolve symbol');
    }
  },

  getBars: async (
    symbolInfo: any,
    resolution: string,
    periodParams: {
      from: number;
      to: number;
      firstDataRequest: boolean;
    },
    onHistoryCallback: (bars: Bar[], meta: { noData: boolean }) => void,
    onErrorCallback: (error: string) => void
  ) => {
    const { from, to, firstDataRequest } = periodParams;
    const cacheKey = getCacheKey(symbolInfo.ticker, from, to, resolution);
    
    const cachedData = historyCache.get(cacheKey);
    if (cachedData && isCacheValid(cachedData.timestamp)) {
      onHistoryCallback(cachedData.bars, { noData: false });
      return;
    }

    if (!canMakeRequest()) {
      
      if (cachedData) {
        onHistoryCallback(cachedData.bars, { noData: false });
        return;
      }
      onErrorCallback('Rate limit exceeded');
      return;
    }

    try {
      requestCount++;
      const response = await retryWithBackoff(async () => {
        const res = await fetch(
          `${API_ENDPOINT}/history?symbol=${encodeURIComponent(symbolInfo.ticker)}&from=${from}&to=${to}&resolution=${resolution}`,
          {
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Cache-Control': 'no-cache'
            }
          }
        );
        if (!res.ok) throw new Error('Failed to fetch history');
        return res;
      });

      const data = await response.json();

      if (!data.t || !Array.isArray(data.t)) {
        onHistoryCallback([], { noData: true });
        return;
      }

      const bars: Bar[] = data.t.map((time: number, index: number) => ({
        time: time * 1000,
        open: parseFloat(data.o[index]),
        high: parseFloat(data.h[index]),
        low: parseFloat(data.l[index]),
        close: parseFloat(data.c[index]),
        volume: data.v ? parseFloat(data.v[index]) : 0
      }));

      historyCache.set(cacheKey, { 
        bars,
        timestamp: Date.now()
      });

      if (firstDataRequest && bars.length > 0) {
        lastBarsCache.set(symbolInfo.ticker, { ...bars[bars.length - 1] });
      }

      onHistoryCallback(bars, { noData: bars.length === 0 });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.warn('[datafeed] History error:', errorMessage);
      
      
      const cachedData = historyCache.get(cacheKey);
      if (cachedData) {
        onHistoryCallback(cachedData.bars, { noData: false });
        return;
      }
      
      onErrorCallback(errorMessage);
    }
  },

  subscribeBars: (
    symbolInfo: any,
    resolution: string,
    onRealtimeCallback: (bar: Bar) => void,
    subscriberUID: string,
    onResetCacheNeededCallback: () => void
  ) => {
    const lastBar = lastBarsCache.get(symbolInfo.ticker);
    if (!lastBar) {
      console.warn('[datafeed] No last bar available for subscription');
      return;
    }

    subscribeOnStream(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscriberUID,
      onResetCacheNeededCallback,
      lastBar
    );
  },

  unsubscribeBars: (subscriberUID: string) => {
    unsubscribeFromStream(subscriberUID);
  },
};

export default datafeed;