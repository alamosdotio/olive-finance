'use client'

import React, { useEffect, useRef, useState, memo } from 'react';
import { tradingViewConfig } from '../config/tradingViewConfig';
import { createTradingViewErrorHandler } from '../utils/errorHandling';
import { initializeTradingViewScript } from '../utils/tradingViewInitializer';

function TradingViewWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const originalErrorHandler = window.onerror;
    window.onerror = createTradingViewErrorHandler(originalErrorHandler);

    const config = {
      ...tradingViewConfig,
      container_id: 'tradingview_chart',
      autosize: true,
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_side_toolbar: false,
      save_image: false,
      backgroundColor: "#232030",
      toolbar_bg: "#232030",
      loading_screen: { backgroundColor: "#232030" },
    };

    let cleanup: (() => void) | undefined;

    const loadWidget = async () => {
      try {
        cleanup = await initializeTradingViewScript(containerRef.current, config);
      } catch (err) {
        console.error('Failed to load TradingView widget:', err);
        setError('Failed to load TradingView widget. Please try again later.');
      }
    };

    loadWidget();

    return () => {
      window.onerror = originalErrorHandler;
      if (cleanup) {
        cleanup();
      }
    };
  }, []);

  if (error) {
    return (
      <div className="tradingview-widget-container error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_chart" ref={containerRef} className="tradingview-widget-container__widget" />
      <style jsx>{`
        .tradingview-widget-container {
          height: 550px;
          width: 100%;
          border-radius: 0 0 15px 15px;
          overflow: hidden;
          background-color: #232030;
        }

        .tradingview-widget-container__widget {
          height: 100%;
          width: 100%;
          background-color: #232030;
        }

        :global(#tradingview_chart) {
          background-color: #232030 !important;
        }

        :global(.tv-side-toolbar),
        :global(.tv-floating-toolbar) {
          background-color: #232030 !important;
        }

        :global(.tradingview-widget-copyright) {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default memo(TradingViewWidget);

