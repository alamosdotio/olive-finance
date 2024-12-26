import { DEFAULT_SYMBOL_INFO, SUPPORTED_RESOLUTIONS } from '../config/trading-view';
import { fetchHistoricalPrices } from './birdeye-api';


// Types
interface Bar {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface OHLCVData {
  unixTime: number;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
}

interface HistoryCallback {
  (bars: Bar[], meta: { noData: boolean }): void;
}

interface ErrorCallback {
  (error: Error): void;
}

// Validation functions
function validateOHLCData(item: any): item is OHLCVData {
  if (!item || typeof item !== 'object') {
    console.debug('Invalid item structure:', item);
    return false;
  }

  const values = {
    time: Number(item.unixTime),
    open: parseFloat(item.o),
    high: parseFloat(item.h),
    low: parseFloat(item.l),
    close: parseFloat(item.c),
    volume: parseFloat(item.v || '0')
  };

  if (Object.values(values).some(val => !Number.isFinite(val))) {
    console.debug('Invalid numeric values:', values);
    return false;
  }

  if (values.high < values.low || 
      values.high < values.open || 
      values.high < values.close || 
      values.low > values.open || 
      values.low > values.close) {
    console.debug('Invalid price relationships:', values);
    return false;
  }

  return true;
}

function convertToBar(data: OHLCVData): Bar {
  return {
    time: data.unixTime * 1000,
    open: parseFloat(data.o.toString()),
    high: parseFloat(data.h.toString()),
    low: parseFloat(data.l.toString()),
    close: parseFloat(data.c.toString()),
    volume: parseFloat((data.v || 0).toString())
  };
}

// Convert TradingView resolution to Birdeye format
function formatResolution(resolution: string): number {
  if (resolution.includes('D')) return 1440 * parseInt(resolution);
  if (resolution.includes('W')) return 10080 * parseInt(resolution);
  if (resolution.includes('M')) return 43200 * parseInt(resolution);
  return parseInt(resolution);
}

// Data processing
async function processHistoricalData(
  pairAddress: string,
  resolution: string,
  periodParams: { from: number; to: number },
  onHistoryCallback: HistoryCallback,
  onErrorCallback: ErrorCallback
): Promise<void> {
  try {
    const minutes = formatResolution(resolution);
    console.debug('Using resolution in minutes:', minutes);
    
    const data = await fetchHistoricalPrices(pairAddress, minutes);

    if (!data.success || !data.data?.items?.length) {
      console.debug('No data received from API');
      onHistoryCallback([], { noData: true });
      return;
    }

    const validBars: Bar[] = [];
    
    for (const item of data.data.items) {
      if (validateOHLCData(item)) {
        validBars.push(convertToBar(item));
      }
    }

    console.debug('Processed valid bars:', validBars.length);
    onHistoryCallback(validBars, { noData: validBars.length === 0 });
  } catch (error) {
    console.error('Error processing historical data:', error);
    onErrorCallback(error instanceof Error ? error : new Error('Unknown error in data processing'));
  }
}

// Main datafeed export
export const createDatafeed = (pairAddress: string) => ({
  onReady: (callback: (configuration: any) => void) => {
    console.log('DataFeed onReady');
    setTimeout(() => callback({
      supported_resolutions: SUPPORTED_RESOLUTIONS,
      supports_time: true,
      supports_marks: false,
      supports_timescale_marks: false,
      supports_search: true,
      supports_group_request: false,
    }));
  },

  searchSymbols: (
    userInput: string,
    exchange: string,
    symbolType: string,
    onResult: (result: any[]) => void
  ) => {
    console.log('DataFeed searchSymbols:', userInput);
    onResult([{
      symbol: 'SOL/USD',
      full_name: 'SOL/USD',
      description: 'Solana/USD',
      exchange: 'Birdeye',
      type: 'crypto'
    }]);
  },

  resolveSymbol: (
    symbolName: string,
    onSymbolResolvedCallback: (symbolInfo: any) => void,
    onResolveErrorCallback: (error: any) => void
  ) => {
    console.log('DataFeed resolveSymbol:', symbolName);
    setTimeout(() => onSymbolResolvedCallback({
      ...DEFAULT_SYMBOL_INFO,
      name: symbolName,
    }));
  },

  getBars: (
    symbolInfo: any,
    resolution: string,
    periodParams: any,
    onHistoryCallback: (bars: Bar[], meta: { noData: boolean }) => void,
    onErrorCallback: (error: any) => void
  ) => {
    console.log('DataFeed getBars:', {
      symbol: symbolInfo.name,
      resolution,
      from: new Date(periodParams.from * 1000).toISOString(),
      to: new Date(periodParams.to * 1000).toISOString()
    });

    processHistoricalData(
      pairAddress,
      resolution,
      periodParams,
      onHistoryCallback,
      onErrorCallback
    );
  },

  subscribeBars: (
    symbolInfo: any,
    resolution: string,
    onRealtimeCallback: any,
    subscriberUID: string,
    onResetCacheNeededCallback: any
  ) => {
    console.log('DataFeed subscribeBars:', symbolInfo.name);
  },

  unsubscribeBars: (subscriberUID: string) => {
    console.log('DataFeed unsubscribeBars:', subscriberUID);
  }
});