import { Bar } from '@/types/trading';

const STREAMING_URL = 'https://benchmarks.pyth.network/v1/shims/tradingview/streaming';
const channelToSubscription = new Map();

interface Handler {
  id: string;
  callback: (bar: Bar) => void;
}

interface SubscriptionItem {
  subscriberUID: string;
  resolution: string;
  lastDailyBar: Bar;
  handlers: Handler[];
}

function handleStreamingData(data: any, subscriptionItem: SubscriptionItem) {
  try {
    if (!data || !subscriptionItem?.lastDailyBar) return;
    
    const tradePrice = parseFloat(data.p);
    if (isNaN(tradePrice)) return;
    
    const tradeTime = parseInt(data.t) * 1000;
    if (isNaN(tradeTime)) return;
    
    const lastDailyBar = subscriptionItem.lastDailyBar;
    const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time);

    let bar: Bar = {
      time: tradeTime >= nextDailyBarTime ? nextDailyBarTime : lastDailyBar.time,
      open: tradeTime >= nextDailyBarTime ? tradePrice : lastDailyBar.open,
      high: tradeTime >= nextDailyBarTime ? tradePrice : Math.max(lastDailyBar.high, tradePrice),
      low: tradeTime >= nextDailyBarTime ? tradePrice : Math.min(lastDailyBar.low, tradePrice),
      close: tradePrice,
      volume: 0
    };

    subscriptionItem.lastDailyBar = bar;
    subscriptionItem.handlers.forEach(handler => {
      try {
        handler.callback(bar);
      } catch (e) {
        console.warn('[stream] Handler callback error:', e);
      }
    });
  } catch (e) {
    console.warn('[stream] Error handling streaming data:', e);
  }
}

function getNextDailyBarTime(barTime: number): number {
  try {
    const date = new Date(barTime);
    date.setDate(date.getDate() + 1);
    return date.getTime();
  } catch (e) {
    console.warn('[stream] Error calculating next bar time:', e);
    return Date.now();
  }
}

async function startStreaming(symbolInfo: any, subscriptionItem: SubscriptionItem) {
  try {
    const response = await fetch(STREAMING_URL);
    if (!response.ok) throw new Error('Stream response not ok');
    if (!response.body) throw new Error('No response body');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.trim()) continue;
        
        try {
          const data = JSON.parse(line);
          if (data.id === symbolInfo.ticker) {
            handleStreamingData(data, subscriptionItem);
          }
        } catch (e) {
          console.warn('[stream] Error parsing line:', e);
        }
      }
    }
  } catch (e) {
    console.warn('[stream] Stream error:', e);
    // Attempt to reconnect after a delay
    setTimeout(() => {
      startStreaming(symbolInfo, subscriptionItem);
    }, 5000);
  }
}

export function subscribeOnStream(
  symbolInfo: any,
  resolution: string,
  onRealtimeCallback: (bar: Bar) => void,
  subscriberUID: string,
  onResetCacheNeededCallback: () => void,
  lastDailyBar: Bar
): void {
  if (!symbolInfo?.ticker || !lastDailyBar) {
    console.warn('[stream] Invalid subscription parameters');
    return;
  }

  const channelString = symbolInfo.ticker;
  const handler: Handler = {
    id: subscriberUID,
    callback: onRealtimeCallback,
  };

  let subscriptionItem = channelToSubscription.get(channelString);
  
  if (subscriptionItem) {
    subscriptionItem.handlers.push(handler);
  } else {
    subscriptionItem = {
      subscriberUID,
      resolution,
      lastDailyBar,
      handlers: [handler],
    };
    channelToSubscription.set(channelString, subscriptionItem);
    startStreaming(symbolInfo, subscriptionItem).catch(e => 
      console.warn('[stream] Error starting stream:', e)
    );
  }
}

export function unsubscribeFromStream(subscriberUID: string): void {
  try {
    for (const [channelString, subscriptionItem] of channelToSubscription.entries()) {
      const handlerIndex = subscriptionItem.handlers.findIndex(
          (handler: { id: string; }) => handler.id === subscriberUID
      );

      if (handlerIndex !== -1) {
        subscriptionItem.handlers.splice(handlerIndex, 1);
        
        if (subscriptionItem.handlers.length === 0) {
          channelToSubscription.delete(channelString);
        }
        break;
      }
    }
  } catch (e) {
    console.warn('[stream] Error unsubscribing:', e);
  }
}