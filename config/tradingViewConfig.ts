import { TradingViewConfig } from '../types/tradingView';

export const tradingViewConfig: TradingViewConfig = {
  symbol: "COINBASE:SOLUSD",
  interval: "D",
  timezone: "Etc/UTC",
  theme: "dark",
  style: "1",
  locale: "en",
  toolbar_bg: "#232030",
  backgroundColor: "#232030",
  studies: ["MASimple@tv-basicstudies"],
  overrides: {
    "mainSeriesProperties.candleStyle.upColor": "#9A76FF",
    "mainSeriesProperties.candleStyle.downColor": "#FF4C4F",
    "mainSeriesProperties.candleStyle.wickUpColor": "#9A76FF",
    "mainSeriesProperties.candleStyle.wickDownColor": "#FF4C4F",
    "mainSeriesProperties.candleStyle.borderUpColor": "#9A76FF",
    "mainSeriesProperties.candleStyle.borderDownColor": "#FF4C4F",
    "paneProperties.background": "#232030",
    "paneProperties.backgroundType": "solid",
    "paneProperties.vertGridProperties.color": "#673AB7",
    "paneProperties.horzGridProperties.color": "#673AB7",
    "scalesProperties.textColor": "#E1BEE7",
    "scalesProperties.backgroundColor": "#232030",
  },
  loading_screen: {
    backgroundColor: "#232030"
  }
};

