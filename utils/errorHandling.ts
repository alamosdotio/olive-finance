export const createTradingViewErrorHandler = (originalHandler: OnErrorEventHandler | null): OnErrorEventHandler => {
  return (event: Event | string, source?: string, lineno?: number, colno?: number, error?: Error): boolean => {
    const messageStr = event instanceof Event ? event.type : event;
    const sourceStr = source || '';

    if (sourceStr.includes('tradingview.com') && messageStr.includes('telemetry')) {
      return true;
    }

    return originalHandler?.(event, source, lineno, colno, error) ?? false;
  };
};

