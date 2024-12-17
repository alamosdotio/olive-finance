'use client'

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

declare global {
  interface Window {
    TradingView: any;
    tvWidget: any;
    Datafeeds: {
      UDFCompatibleDatafeed: new (datafeedUrl: string, updateFrequency?: number, options?: any) => any;
    };
  }
}

function getParameterByName(name: string): string {
  if (typeof window !== 'undefined') {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(window.location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  return "";
}

const TradingViewChart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const { resolvedTheme } = useTheme();
  const [chartTheme, setChartTheme] = useState<'Light' | 'Dark'>('Light');

  useEffect(() => {
    setChartTheme(resolvedTheme === 'dark' ? 'Dark' : 'Light');
  }, [resolvedTheme]);

  useEffect(() => {
    const initChart = () => {
      if (typeof window.TradingView === 'undefined' || !containerRef.current) return;

      let datafeedUrl = "https://demo-feed-data.tradingview.com";
      const customDataUrl = getParameterByName('dataUrl');
      if (customDataUrl !== "") {
        datafeedUrl = customDataUrl.startsWith('https://') ? customDataUrl : `https://${customDataUrl}`;
      }

      const widgetOptions: any = {
        symbol: 'AAPL',
        interval: '1D',
        container: containerRef.current,
        datafeed: new window.Datafeeds.UDFCompatibleDatafeed(datafeedUrl, undefined, {
          maxResponseLength: 1000,
          expectedOrder: 'latestFirst',
        }),
        library_path: "/charting_library/",
        locale: getParameterByName('lang') || "en",
        disabled_features: ["use_localstorage_for_settings"],
        enabled_features: ["study_templates"],
        charts_storage_url: 'https://saveload.tradingview.com',
        charts_storage_api_version: "1.1",
        client_id: 'tradingview.com',
        user_id: 'public_user_id',
        theme: chartTheme,
        custom_css_url: '/styles/tradingview-theme.css',
        overrides: {
          "paneProperties.background": chartTheme === 'Dark' ? "#151419" : "#F0EAFF",
          "paneProperties.backgroundType": "solid",
          "mainSeriesProperties.candleStyle.upColor": "#9A76FF",
          "mainSeriesProperties.candleStyle.downColor": "#FF4C4F",
          "mainSeriesProperties.candleStyle.wickUpColor": "#9A76FF",
          "mainSeriesProperties.candleStyle.wickDownColor": "#FF4C4F",
          "mainSeriesProperties.candleStyle.borderUpColor": "#9A76FF",
          "mainSeriesProperties.candleStyle.borderDownColor": "#FF4C4F",
        },
        fullscreen: false,
        autosize: true,
      };

      const tvWidget = new window.TradingView.widget(widgetOptions);
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
      if (chartRef.current && chartRef.current.remove) {
        chartRef.current.remove();
      }
      resizeObserver.disconnect();
    };
  }, [chartTheme]);

  return (
    <div className="tradingview-chart-container rounded-b-[15px] overflow-hidden w-full h-full min-h-[550px] border-[1px]">
      <div 
        id="tv_chart_container" 
        ref={containerRef} 
        className={`tradingview-chart ${chartTheme === 'Dark' ? 'theme-dark' : ''} w-full h-full`}
      />
    </div>
  );
};

export default TradingViewChart;

