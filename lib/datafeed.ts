import { Bar } from '@/types/trading';
import { subscribeOnStream, unsubscribeFromStream } from './streaming';

const API_ENDPOINT = 'https://benchmarks.pyth.network/v1/shims/tradingview';
const lastBarsCache = new Map<string, Bar>();
const logoCache = new Map<string, string>();


export const setSymbolLogo = (symbol: string, logoPath: string) => {
  logoCache.set(symbol, logoPath);
};

const datafeed = {
  onReady: (callback: (config: any) => void) => {
    fetch(`${API_ENDPOINT}/config`)
      .then(response => response.json())
      .then(configurationData => {
        callback({
          ...configurationData,
          supported_resolutions: ["1", "5", "15", "30", "60", "240", "D"]
        });
      })
      .catch(e => console.warn('[datafeed] Config error:', e));
  },

  searchSymbols: (
    userInput: string,
    exchange: string,
    symbolType: string,
    onResultReadyCallback: (result: any) => void
  ) => {
    fetch(`${API_ENDPOINT}/search?query=${encodeURIComponent(userInput)}`)
      .then(response => response.json())
      .then(data => onResultReadyCallback(data))
      .catch(e => console.warn('[datafeed] Search error:', e));
  },

  resolveSymbol: (
    symbolName: string,
    onSymbolResolvedCallback: (symbolInfo: any) => void,
    onResolveErrorCallback: (error: string) => void
  ) => {
    fetch(`${API_ENDPOINT}/symbols?symbol=${encodeURIComponent(symbolName)}`)
      .then(response => response.json())
      .then(symbolInfo => {
        if (!symbolInfo) throw new Error('Symbol not found');
        
        // Use cached logo if available
        const logoPath = logoCache.get(symbolName);
        if (logoPath) {
          symbolInfo.logo_urls = [logoPath];
        }
        
        onSymbolResolvedCallback(symbolInfo);
      })
      .catch(error => {
        console.warn('[datafeed] Symbol resolve error:', error);
        onResolveErrorCallback('Cannot resolve symbol');
      });
  },

  getBars: (
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
    const url = `${API_ENDPOINT}/history?symbol=${encodeURIComponent(symbolInfo.ticker)}&from=${from}&to=${to}&resolution=${resolution}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
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

        if (firstDataRequest && bars.length > 0) {
          lastBarsCache.set(symbolInfo.ticker, { ...bars[bars.length - 1] });
        }

        onHistoryCallback(bars, { noData: bars.length === 0 });
      })
      .catch(error => {
        console.warn('[datafeed] History error:', error);
        onErrorCallback(error.toString());
      });
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