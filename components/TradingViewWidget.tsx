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
        setTimeout(() => {
          const copyrightElement = document.querySelector('.tradingview-widget-copyright');
          if (copyrightElement) {
            (copyrightElement as HTMLElement).style.display = 'block';
          }
        }, 1000);
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
    <>
      <div className="tradingview-widget-container">
        <div id="tradingview_chart" ref={containerRef} className="tradingview-widget-container__widget" />
        <div className="tradingview-widget-copyright tradingview-widget-copyright-fallback">
          <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
            <span className="text-primary">Track all markets on TradingView</span>
          </a>
        </div>
      </div>
      <style jsx>{`
        .tradingview-widget-container {
          height: 550px;
          width: 100%;
          border-radius: 0 0 15px 15px;
          overflow: hidden;
          background-color: #232030;
        }

        .tradingview-widget-container__widget {
          height: calc(100% - 32px);
          width: 100%;
          background-color: #232030;
        }
      `}</style>
    </>
  );
}

export default memo(TradingViewWidget);

