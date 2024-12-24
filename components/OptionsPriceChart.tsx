'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

declare global {
  interface Window {
    TradingView: any;
    tvWidget: any;
  }
}

interface OptionsPriceChartProps {
  symbol?: string;
}

const PYTH_BASE_URL = 'https://benchmarks.pyth.network/v1/shims/tradingview';

const pythDatafeed = {
  onReady: (callback: (configuration: any) => void) => {
    fetch(`${PYTH_BASE_URL}/config`)
      .then(response => response.json())
      .then(data => {
        callback({
          ...data,
          supported_resolutions: ['1', '5', '15', '30', '60', '240', '1D', '1W', '1M']
        });
      });
  },
  
  searchSymbols: (
    userInput: string,
    exchange: string,
    symbolType: string,
    onResult: (result: any) => void
  ) => {
    fetch(`${PYTH_BASE_URL}/search?query=${encodeURIComponent(userInput)}`)
      .then(response => response.json())
      .then(data => {
        onResult(data);
      });
  },
  
  resolveSymbol: (
    symbolName: string,
    onSymbolResolvedCallback: (symbolInfo: any) => void,
    onResolveErrorCallback: (error: any) => void
  ) => {
    fetch(`${PYTH_BASE_URL}/symbols?symbol=${encodeURIComponent(symbolName.toLowerCase())}`)
      .then(response => response.json())
      .then(symbolInfo => {
        symbolInfo.pricescale = 1; 
        symbolInfo.minmov = 1;
        onSymbolResolvedCallback(symbolInfo);
      })
      .catch(error => {
        onResolveErrorCallback(error);
      });
  },
  
  getBars: (
    symbolInfo: any,
    resolution: string,
    periodParams: any,
    onHistoryCallback: (bars: any[], meta: { noData: boolean }) => void,
    onErrorCallback: (error: any) => void
  ) => {
    const { from, to, firstDataRequest } = periodParams;
    
    fetch(
      `${PYTH_BASE_URL}/history?symbol=${encodeURIComponent(symbolInfo.name)}&resolution=${resolution}&from=${from}&to=${to}`
    )
      .then(response => response.json())
      .then(data => {
        if (data.s !== 'ok' && data.s !== 'no_data') {
          onErrorCallback(data.errmsg);
          return;
        }
        
        const bars = data.t.map((time: number, index: number) => ({
            time: time * 1000,
            open: Math.round(parseFloat(data.o[index]) / 2),
            high: Math.round(parseFloat(data.h[index]) / 2),
            low: Math.round(parseFloat(data.l[index]) / 2),
            close: Math.round(parseFloat(data.c[index]) / 2),
            volume: data.v[index]
        }));
        
        onHistoryCallback(bars, {
          noData: data.s === 'no_data',
        });
      })
      .catch(error => {
        onErrorCallback(error);
      });
  },
  
  subscribeBars: (
    symbolInfo: any,
    resolution: string,
    onRealtimeCallback: (bar: any) => void,
    subscriberUID: string,
    onResetCacheNeededCallback: () => void
  ) => {
    const ws = new WebSocket('wss://benchmarks.pyth.network/v1/shims/tradingview/streaming');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.symbol === symbolInfo.name) {
        onRealtimeCallback({
          time: data.time * 1000,
          open: Math.round(parseFloat(data.open) / 2),
          high: Math.round(parseFloat(data.high) / 2),
          low: Math.round(parseFloat(data.low) / 2),
          close: Math.round(parseFloat(data.close) / 2),          
          volume: data.volume
        });
      }
    };
    
    return () => {
      ws.close();
    };
  },
  
  unsubscribeBars: (subscriberUID: string) => {

  }
};

const OptionsPriceChart: React.FC<OptionsPriceChartProps> = ({ symbol = 'Crypto.SOL/USD' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const { resolvedTheme } = useTheme();
  const [chartTheme, setChartTheme] = useState<'Light' | 'Dark'>('Light');

  useEffect(() => {
    setChartTheme(resolvedTheme === 'dark' ? 'Dark' : 'Light');
  }, [resolvedTheme]);

  useEffect(() => {
    let tvWidget: any = null;

    const initChart = () => {
      if (typeof window.TradingView === 'undefined' || !containerRef.current) return;

      const widgetOptions: any = {
        symbol: symbol,
        interval: '1D',
        container: containerRef.current,
        datafeed: pythDatafeed,
        library_path: "/charting_library/",
        locale: "en",
        disabled_features: [
          "use_localstorage_for_settings",
        ],
        enabled_features: [
          "hide_left_toolbar_by_default"
        ],
        theme: chartTheme,
        custom_css_url: '/styles/tradingview-theme.css',
        overrides: {
          "paneProperties.background": chartTheme === 'Dark' ? "#141519" : "#FFFFFF",
          "paneProperties.backgroundType": "solid",
          "mainSeriesProperties.candleStyle.upColor": "#53C08D",
          "mainSeriesProperties.candleStyle.downColor": "#FF6889",
          "mainSeriesProperties.candleStyle.wickUpColor": "#53C08D",
          "mainSeriesProperties.candleStyle.wickDownColor": "#FF6889",
          "mainSeriesProperties.candleStyle.borderUpColor": "#53C08D",
          "mainSeriesProperties.candleStyle.borderDownColor": "#FF6889",
          "mainSeriesProperties.priceFormat.type": "price",
          "mainSeriesProperties.priceFormat.precision": 0,
          "mainSeriesProperties.priceFormat.minMove": 1,
          "scalesProperties.precision": 0
        },
        fullscreen: false,
        autosize: true,
      };

      tvWidget = new window.TradingView.widget(widgetOptions);
      chartRef.current = tvWidget;
    };

    initChart();

    const handleResize = () => {
      if (chartRef.current && chartRef.current.resize) {
        chartRef.current.resize();
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (tvWidget && tvWidget.remove) {
        tvWidget.remove();
      }
      resizeObserver.disconnect();
    };
  }, [chartTheme, symbol]);

  return (
    <div className="tradingview-chart-container rounded-b-[26px] overflow-hidden w-full h-[550px] border border-border bg-card">
      <div 
        id="tv_chart_container" 
        ref={containerRef} 
        className={`tradingview-chart ${chartTheme === 'Dark' ? 'theme-dark' : ''} w-full h-full`}
      />
    </div>
  );
};

export default OptionsPriceChart;