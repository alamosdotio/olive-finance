'use client'

import React, { useEffect, useRef, memo } from 'react';

declare global {
  interface Window {
    TradingView: unknown;
  }
}

function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (typeof window.TradingView !== 'undefined' && container.current) {
        new TradingView.widget({
          autosize: true,
          symbol: "NASDAQ:AAPL",
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#222030",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: container.current.id,
          hide_top_toolbar: false,
          hide_side_toolbar: false,
          save_image: false,
          studies: ["MASimple@tv-basicstudies"],
          overrides: {
            "mainSeriesProperties.candleStyle.upColor": "#9A76FF",
            "mainSeriesProperties.candleStyle.downColor": "#FF4C4F",
            "mainSeriesProperties.candleStyle.wickUpColor": "#9A76FF",
            "mainSeriesProperties.candleStyle.wickDownColor": "#FF4C4F",
            "mainSeriesProperties.candleStyle.borderUpColor": "#9A76FF",
            "mainSeriesProperties.candleStyle.borderDownColor": "#FF4C4F",
            "paneProperties.background": "#222030",
            "paneProperties.vertGridProperties.color": "#2D2B3B",
            "paneProperties.horzGridProperties.color": "#2D2B3B",
            "scalesProperties.textColor": "#9A76FF",
            "scalesProperties.backgroundColor": "#222030",
            "mainSeriesProperties.priceLineColor": "#9A76FF",
            "volumePaneSize": "medium"
          },
          loading_screen: { backgroundColor: "#222030" },
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_widget" ref={container} style={{ height: "100%", width: "100%" }}></div>
      <style jsx global>{`
        .tradingview-widget-container {
          height: 500px;
          width: 100%;
          border-radius: 0 0 15px 15px;
          overflow: hidden;
        }
          
        .tv-lightweight-charts {
          font-family: var(--font-lufga), sans-serif !important;
        }
        .chart-page {
          background-color: #222030 !important;
        }
        .chart-controls-bar {
          background-color: #222030 !important;
        }
        .group-wWM3zP_M- {
          background-color: #2D2B3B !important;
        }
        .button-1iktpaT1- {
          color: #9A76FF !important;
        }
        .button-1iktpaT1-:hover {
          background-color: #2D2B3B !important;
        }
        .feature-no-touch .button-1iktpaT1-:hover {
          color: #ffffff !important;
        }
        .chart-markup-table {
          border-color: #2D2B3B !important;
        }
        .pane-legend-item-value-wrap {
          color: #9A76FF !important;
        }
        .button-1iktpaT1-[aria-pressed="true"] {
          background-color: #9A76FF !important;
          color: #ffffff !important;
        }
      `}</style>
    </div>
  );
}

export default memo(TradingViewWidget);

