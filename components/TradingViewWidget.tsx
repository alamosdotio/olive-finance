'use client'

import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    TradingView: unknown;
  }
}

export default function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "BITSTAMP:BTCUSD",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
      }`;

    if (container.current && !container.current.querySelector('script')) {
      container.current.appendChild(script);
    }

    return () => {
      if (container.current) {
        const scriptElement = container.current.querySelector('script');
        if (scriptElement) {
          container.current.removeChild(scriptElement);
        }
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container rounded-[15px] overflow-hidden" ref={container} style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget " style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
    </div>
  );
}

