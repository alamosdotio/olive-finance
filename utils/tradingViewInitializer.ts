export function initializeTradingViewScript(container: HTMLDivElement | null, config: any): Promise<() => void> {
  return new Promise((resolve, reject) => {
    if (!container) {
      reject(new Error('Container element not found'));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.type = 'text/javascript';
    script.async = true;

    const onScriptLoad = () => {
      if (window.TradingView) {
        try {
          new window.TradingView.widget(config);
          resolve(() => {
            if (script.parentNode) {
              script.parentNode.removeChild(script);
            }
          });
        } catch (err) {
          reject(err);
        }
      } else {
        reject(new Error('TradingView object not found'));
      }
    };

    script.onload = onScriptLoad;
    script.onerror = () => reject(new Error('Failed to load TradingView script'));

    document.head.appendChild(script);
  });
}

