export interface Bar {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }
  
  export interface BirdeyeResponse {
    success: boolean;
    message?: string;
    data?: {
      items: Array<{
        unixTime: number;
        open: number;
        high: number;
        low: number;
        close: number;
        volume: number;
      }>;
    };
  }
  
  export interface TradingViewChartProps {
    pairAddress?: string;
  }