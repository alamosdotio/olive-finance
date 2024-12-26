'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { createDatafeed } from '../services/trading-view-datafeed';
import { getChartOverrides } from '../utils/trading-view';
import type { TradingViewChartProps } from '../types/trading-view';

const TradingViewChart: React.FC<TradingViewChartProps> = ({ 
  pairAddress = '4DoNfFBfF7UokCC2FQzriy7yHK6DY6NVdYpuekQ5pRgg'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const chartTheme = resolvedTheme === 'dark' ? 'Dark' : 'Light';
    
    const initChart = () => {
      if (typeof window.TradingView === 'undefined' || !containerRef.current) {
        console.error('TradingView library not loaded or container not found');
        return;
      }

      console.log('Initializing chart with pair address:', pairAddress);

      const widgetOptions = {
        symbol: 'SOL/USD',
        interval: '15',
        container: containerRef.current,
        datafeed: createDatafeed(pairAddress),
        library_path: "/charting_library/",
        locale: "en",
        disabled_features: ["use_localstorage_for_settings"],
        enabled_features: ["hide_left_toolbar_by_default"],
        theme: chartTheme,
        custom_css_url: '/styles/tradingview-theme.css',
        overrides: getChartOverrides(chartTheme),
        fullscreen: false,
        autosize: true,
        debug: true // Enable debug mode
      };

      try {
        const tvWidget = new window.TradingView.widget(widgetOptions);
        chartRef.current = tvWidget;
      } catch (error) {
        console.error('Error creating TradingView widget:', error);
      }
    };

    initChart();

    const handleResize = () => {
      if (chartRef.current?.resize) {
        chartRef.current.resize();
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (chartRef.current?.remove) {
        chartRef.current.remove();
      }
      resizeObserver.disconnect();
    };
  }, [resolvedTheme, pairAddress]);

  return (
    <div className="tradingview-chart-container rounded-b-[26px] overflow-hidden w-full h-[550px] border border-border bg-card">
      <div 
        id="tv_chart_container" 
        ref={containerRef} 
        className={`tradingview-chart ${resolvedTheme === 'dark' ? 'theme-dark' : ''} w-full h-full`}
      />
    </div>
  );
};

export default TradingViewChart;