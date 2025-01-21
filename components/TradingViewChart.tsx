'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import datafeed, { setSymbolLogo } from '@/lib/datafeed';

declare global {
  interface Window {
    TradingView: any;
    tvWidget: any;
  }
}

interface TradingViewChartProps {
  symbol?: string;
  logo?: string;
}

const getFormatConfig = (price: number) => {
  if (price < 0.0001) return { precision: 8, minMove: 0.00000001 };
  if (price < 0.01) return { precision: 8, minMove: 0.00000001 };
  if (price < 1) return { precision: 4, minMove: 0.0001 };
  if (price < 10) return { precision: 4, minMove: 0.0001 };
  if (price < 100) return { precision: 3, minMove: 0.001 };
  if (price < 1000) return { precision: 2, minMove: 0.01 };
  return { precision: 2, minMove: 0.01 };
};

const TradingViewChart: React.FC<TradingViewChartProps> = ({ 
  symbol = 'Crypto.BTC/USD', 
  logo = '/images/bitcoin.png' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const widgetRef = useRef<any>(null);
  const { resolvedTheme } = useTheme();
  const [chartTheme, setChartTheme] = useState<'Light' | 'Dark'>('Dark');
  const [isChartReady, setIsChartReady] = useState(false);

  useEffect(() => {
    setSymbolLogo(symbol, logo);
  }, [symbol, logo]);

  useEffect(() => {
    setChartTheme(resolvedTheme === 'dark-purple' || resolvedTheme === 'dark-green' ? 'Dark' : 'Light');
  }, [resolvedTheme]);

  useEffect(() => {
    if (typeof window.TradingView === 'undefined' || !containerRef.current || widgetRef.current) return;

    const initChart = async () => {
      try {
        const response = await fetch(`https://benchmarks.pyth.network/v1/shims/tradingview/symbols?symbol=${encodeURIComponent(symbol)}`);
        const data = await response.json();
        const currentPrice = parseFloat(data.last_price) || 0;
        const formatConfig = getFormatConfig(currentPrice);

        const widgetOptions: any = {
          symbol: symbol,
          interval: '15',
          container: containerRef.current,
          datafeed: datafeed,
          library_path: "/charting_library/",
          locale: "en",
          disabled_features: [
            "use_localstorage_for_settings",
            "timeframes_toolbar",
            "header_settings",
            "header_undo_redo",
            "header_screenshot",
            "header_fullscreen_button",
            "control_bar",
            "timeframes_toolbar",
            "create_volume_indicator_by_default",
          ],
          enabled_features: [
            "hide_left_toolbar_by_default",
            "show_symbol_logos",
            "show_symbol_logo_in_legend"
          ],
          theme: chartTheme,
          custom_css_url: '/styles/tradingview-theme.css',
          loading_screen: {
            backgroundColor: chartTheme === 'Dark' ? "#141519" : "#FFFFFF",
          },
          overrides: {
            "paneProperties.background": chartTheme === 'Dark' ? "#141519" : "#FFFFFF",
            "paneProperties.backgroundType": "solid",
            "mainSeriesProperties.candleStyle.upColor": "#53C08D",
            "mainSeriesProperties.candleStyle.downColor": "#FF6889",
            "mainSeriesProperties.candleStyle.wickUpColor": "#53C08D",
            "mainSeriesProperties.candleStyle.wickDownColor": "#FF6889",
            "mainSeriesProperties.candleStyle.borderUpColor": "#53C08D",
            "mainSeriesProperties.candleStyle.borderDownColor": "#FF6889",
          },
          fullscreen: false,
          autosize: true,
          debug: false,
          custom_formatters: {
            priceFormatterFactory: () => {
              return {
                format: (price: number) => {
                  const config = getFormatConfig(price);
                  return price.toFixed(config.precision);
                }
              };
            }
          }
        };

        const widget = new window.TradingView.widget(widgetOptions);
        widgetRef.current = widget;

        widget.onChartReady(() => {
          chartRef.current = widget.chart();
          chartRef.current.setChartType(1);
          setIsChartReady(true);
        });
      } catch (error) {
        console.error('Error initializing chart:', error);
      }
    };

    initChart();

    return () => {
      if (widgetRef.current && widgetRef.current.remove) {
        widgetRef.current.remove();
        widgetRef.current = null;
        chartRef.current = null;
        setIsChartReady(false);
      }
    };
  }, [chartTheme]);

  useEffect(() => {
    if (isChartReady && chartRef.current) {
      chartRef.current.setSymbol(symbol);
    }
  }, [symbol, isChartReady]);

  useEffect(() => {
    const handleResize = () => {
      if (widgetRef.current && widgetRef.current.resize) {
        widgetRef.current.resize();
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="tradingview-chart-container rounded-b-[26px] overflow-hidden w-full h-full border border-border">
      <div 
        id="tv_chart_container" 
        ref={containerRef} 
        className={`tradingview-chart ${chartTheme === 'Dark' ? 'theme-dark' : ''} w-full h-full`}
        style={{ backgroundColor: chartTheme === 'Dark' ? "#141519" : "#FFFFFF" }}
      />
    </div>
  );
};

export default TradingViewChart;