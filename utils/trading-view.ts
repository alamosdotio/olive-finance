export const resolutionToMinutes = (resolution: string): number => {
    if (resolution.includes('D')) return 1440 * parseInt(resolution);
    if (resolution.includes('W')) return 10080 * parseInt(resolution);
    if (resolution.includes('M')) return 43200 * parseInt(resolution);
    return parseInt(resolution);
  };
  
  export const getChartOverrides = (chartTheme: string) => ({
    "paneProperties.background": chartTheme === 'Dark' ? "#141519" : "#FFFFFF",
    "paneProperties.backgroundType": "solid",
    "mainSeriesProperties.candleStyle.upColor": "#53C08D",
    "mainSeriesProperties.candleStyle.downColor": "#FF6889",
    "mainSeriesProperties.candleStyle.wickUpColor": "#53C08D",
    "mainSeriesProperties.candleStyle.wickDownColor": "#FF6889",
    "mainSeriesProperties.candleStyle.borderUpColor": "#53C08D",
    "mainSeriesProperties.candleStyle.borderDownColor": "#FF6889",
  });