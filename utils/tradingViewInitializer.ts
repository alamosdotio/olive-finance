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
          
          // Apply custom styles after widget is loaded
          const style = document.createElement('style');
          style.textContent = `
            .tradingview-chart .toolbar-2OthPe,
            .tradingview-chart .group-wrapper,
            .tv-chart-container,
            .chart-page,
            .chart-container-border,
            .group-wWM3zP_M-,
            .wrap-18oKCBRc {
              background-color: #232030 !important;
            }
          `;
          document.head.appendChild(style);

          resolve(() => {
            if (script.parentNode) {
              script.parentNode.removeChild(script);
            }
            if (style.parentNode) {
              style.parentNode.removeChild(style);
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

