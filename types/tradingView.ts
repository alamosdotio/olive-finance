export interface TradingViewConfig {
  symbol: string;
  interval: string;
  timezone: string;
  theme: string;
  style: string;
  locale: string;
  toolbar_bg: string;
  backgroundColor?: string;
  studies?: string[];
  overrides?: Record<string, string | number>;
  loading_screen?: {
    backgroundColor: string;
  };
  custom_css_url?: string;
}

export interface TradingViewWidgetConfig extends TradingViewConfig {
  container_id: string;
  autosize: boolean;
  enable_publishing: boolean;
  hide_top_toolbar: boolean;
  hide_side_toolbar: boolean;
  save_image: boolean;
}

declare global {
  interface Window {
    TradingView: {
      widget: new (config: TradingViewWidgetConfig) => unknown;
    };
  }
}

