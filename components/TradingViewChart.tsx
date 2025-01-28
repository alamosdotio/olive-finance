'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import datafeed, { setSymbolLogo } from '@/lib/datafeed';
import { Button } from './ui/button';
import { Activity, ArrowUpDown, BarChart, BarChart3, CandlestickChart, ChevronDown, LineChart, PlusCircle, Search, TrendingUp } from 'lucide-react';
import { Separator } from './ui/separator';
import { AreaIcon, BarsIcon, CandleStickIcon, IndicatorsIcon } from '@/public/svgs/icons';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

declare global {
  interface Window {
    TradingView: any;
    tvWidget: any;
  }
}

interface TradingViewChartProps {
  symbol?: string;
  logo?: string;
}

const getFormatConfig = (price: number) => {
  if (price < 0.0001) return { precision: 8, minMove: 0.00000001 };
  if (price < 0.01) return { precision: 8, minMove: 0.00000001 };
  if (price < 1) return { precision: 4, minMove: 0.0001 };
  if (price < 10) return { precision: 4, minMove: 0.0001 };
  if (price < 100) return { precision: 3, minMove: 0.001 };
  if (price < 1000) return { precision: 2, minMove: 0.01 };
  return { precision: 2, minMove: 0.01 };
};

const INTERVALS = [
  { label: '1m', value: '1' },
  { label: '30m', value: '30' },
  { label: '1h', value: '60' },
  { label: 'D', value: 'D' },
];

const ALL_INTERVALS = [
  { label: '1m', value: '1' },
  { label: '5m', value: '5' },
  { label: '15m', value: '15' },
  { label: '30m', value: '30' },
  { label: '1h', value: '60' },
  { label: '4h', value: '240' },
  { label: 'D', value: 'D' },
];

const CHART_TYPES = [
  { label: 'Bars', value: 0, icon: BarsIcon },
  { label: 'Candles', value: 1, icon: CandleStickIcon },
  { label: 'Line', value: 2, icon: AreaIcon },
];

const ALL_CHART_TYPES = [
  { label: 'Bars', value: 0, icon: BarChart3 },
  { label: 'Candles', value: 1, icon: CandlestickChart },
  { label: 'Hollow candles', value: 9, icon: CandlestickChart },
  { label: 'Line', value: 2, icon: LineChart },
  { label: 'Line with markers', value: 3, icon: Activity },
  { label: 'Step line', value: 4, icon: TrendingUp },
  { label: 'Area', value: 5, icon: LineChart },
  { label: 'HLC area', value: 6, icon: LineChart },
  { label: 'Baseline', value: 7, icon: TrendingUp },
  { label: 'Columns', value: 8, icon: BarChart },
  { label: 'High-low', value: 10, icon: ArrowUpDown },
  { label: 'Heikin Ashi', value: 11, icon: CandlestickChart },
];

const TradingViewChart: React.FC<TradingViewChartProps> = ({ 
  symbol = 'Crypto.BTC/USD', 
  logo = '/images/bitcoin.png' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const widgetRef = useRef<any>(null);
  const { resolvedTheme } = useTheme();
  const [chartTheme, setChartTheme] = useState<'Light' | 'Dark'>('Dark');
  const [isChartReady, setIsChartReady] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState('D');
  const [chartType, setChartType] = useState(1);
  const [displaySymbol, setDisplaySymbol] = useState(symbol.replace('Crypto.', ''));

  useEffect(() => {
    setSymbolLogo(symbol, logo);
    setDisplaySymbol(symbol.replace('Crypto.', '').replace('/USD', ''));
  }, [symbol, logo]);

  useEffect(() => {
    setChartTheme(resolvedTheme === 'dark-purple' || resolvedTheme === 'dark-green' ? 'Dark' : 'Light');
  }, [resolvedTheme]);

  const handleIntervalChange = (interval: string) => {
    setSelectedInterval(interval);
    if (chartRef.current) {
      chartRef.current.setResolution(interval);
    }
  };

  const handleChartTypeChange = (type: number) => {
    setChartType(type);
    if (chartRef.current) {
      chartRef.current.setChartType(type);
    }
  };

  const handleSymbolSearch = () => {
    if (widgetRef.current) {
      widgetRef.current.chart().executeActionById('symbolSearch');
    }
  };

  const handleCompareSymbol = () => {
    if (widgetRef.current) {
      widgetRef.current.chart().executeActionById('compareOrAdd');
    }
  };

  const handleIndicators = () => {
    if (widgetRef.current) {
      widgetRef.current.chart().executeActionById('insertIndicator');
    }
  };

  useEffect(() => {
    if (typeof window.TradingView === 'undefined' || !containerRef.current || widgetRef.current) return;

    const initChart = async () => {
      try {
        const response = await fetch(`https://benchmarks.pyth.network/v1/shims/tradingview/symbols?symbol=${encodeURIComponent(symbol)}`);
        const data = await response.json();
        const currentPrice = parseFloat(data.last_price) || 0;
        const formatConfig = getFormatConfig(currentPrice);
        const tempEl = document.createElement('div');
        tempEl.className = 'text-primary';
        document.body.appendChild(tempEl);
        const primaryColor = window.getComputedStyle(tempEl).color;
        document.body.removeChild(tempEl);

        const widgetOptions: any = {
          symbol: symbol,
          interval: selectedInterval,
          container: containerRef.current,
          datafeed: datafeed,
          library_path: "/charting_library/",
          locale: "en",
          disabled_features: [
            "use_localstorage_for_settings",
            "timeframes_toolbar",
            "header_settings",
            "header_undo_redo",
            "header_screenshot",
            "header_fullscreen_button",
            "control_bar",
            "timeframes_toolbar",
            "create_volume_indicator_by_default",
            "header_widget",
          ],
          enabled_features: [
            "hide_left_toolbar_by_default",
            "show_symbol_logos",
            "show_symbol_logo_in_legend"
          ],
          theme: chartTheme,
          custom_css_url: '/styles/tradingview-theme.css',
          loading_screen: {
            backgroundColor: chartTheme === 'Dark' ? "#141519" : "#FFFFFF",
          },
          overrides: {
            "paneProperties.background": chartTheme === 'Dark' ? "#141519" : "#FFFFFF",
            "paneProperties.backgroundType": "solid",
            "mainSeriesProperties.candleStyle.upColor": "#53C08D",
            "mainSeriesProperties.candleStyle.downColor": "#FF6889",
            "mainSeriesProperties.candleStyle.wickUpColor": "#53C08D",
            "mainSeriesProperties.candleStyle.wickDownColor": "#FF6889",
            "mainSeriesProperties.candleStyle.borderUpColor": "#53C08D",
            "mainSeriesProperties.candleStyle.borderDownColor": "#FF6889",
            "mainSeriesProperties.highLowAvgPrice.highLowPriceLinesVisible":false,
            "mainSeriesProperties.highLowAvgPrice.highLowPriceLabelsVisible": true,
            "mainSeriesProperties.highLowAvgPrice.highLowPriceLinesColor": primaryColor,
          },
          studies_overrides: {
            "Moving Average.plot.color": primaryColor,
            "Moving Average.plot.linewidth": 2,
          },
          fullscreen: false,
          autosize: true,
          debug: true,
          custom_formatters: {
            priceFormatterFactory: () => {
              return {
                format: (price: number) => {
                  const config = getFormatConfig(price);
                  return price.toFixed(config.precision);
                }
              };
            }
          }
        };

        const widget = new window.TradingView.widget(widgetOptions);
        widgetRef.current = widget;

        widget.onChartReady(() => {
          chartRef.current = widget.chart();
          chartRef.current.setChartType(chartType);
          chartRef.current.createStudy(
            'Moving Average',
            true,
            false,
            {
              length: 9,
              source: "close",
              offset: 0,
            },
            {
              "plot.color": primaryColor,
              "plot.linewidth": 2
            }
          );
          setIsChartReady(true);
        });
      } catch (error) {
        console.error('Error initializing chart:', error);
      }
    };

    initChart();

    return () => {
      if (widgetRef.current && widgetRef.current.remove) {
        widgetRef.current.remove();
        widgetRef.current = null;
        chartRef.current = null;
        setIsChartReady(false);
      }
    };
  }, [chartTheme]);

  useEffect(() => {
    if (isChartReady && chartRef.current) {
      chartRef.current.setSymbol(symbol);
      setDisplaySymbol(symbol.replace('Crypto.', '').replace('/USD', ''));
    }
  }, [symbol, isChartReady]);

  useEffect(() => {
    const handleResize = () => {
      if (widgetRef.current && widgetRef.current.resize) {
        widgetRef.current.resize();
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="tradingview-chart-container rounded-b-[26px] overflow-hidden w-full h-full border border-border flex flex-col">
      <div className='px-2 py-1 w-full flex border-b border-border items-center'>
        <div className='w-[140px] flex justify-between'>
          <Button 
            className='bg-inherit text-secondary-foreground p-2 flex gap-2 shadow-none text-sm font-normal [&_svg]:size-5 hover:text-primary'
            onClick={handleSymbolSearch}
          >
            <Search size={20}/>
            <span>{displaySymbol}</span>
          </Button>
          <Button 
            className='bg-inherit text-secondary-foreground p-2 flex gap-2 shadow-none text-sm font-normal [&_svg]:size-5 hover:text-primary'
            onClick={handleCompareSymbol}
          >
            <PlusCircle size={20}/>
          </Button>
        </div>

        <Separator orientation='vertical' className='mx-2 h-8'/>

        {INTERVALS.map((interval) => (
          <Button 
            key={interval.value}
            className={cn((selectedInterval===interval.value ? 'text-primary' : 'text-secondary-foreground'),'bg-inherit p-2 flex gap-2 shadow-none text-sm font-normal hover:text-primary')}
            onClick={() => handleIntervalChange(interval.value)}
          >
            {interval.label}
          </Button>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='bg-inherit text-secondary-foreground p-2 flex gap-2 shadow-none text-sm font-normal hover:text-primary focus-visible:ring-0'>
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {ALL_INTERVALS.map((interval) => (
              <DropdownMenuItem
                key={interval.value}
                className={cn((selectedInterval === interval.value ? 'text-primary' : 'text-secondary-foreground'), 'focus:bg-inherit focus:text-primary-foreground cursor-pointer')}
                onClick={() => handleIntervalChange(interval.value)}
              >
                {interval.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation='vertical' className='mx-2 h-8'/>

        {CHART_TYPES.map((type) => (
          <Button 
            key={type.value}
            className={cn((chartType === type.value ? 'text-primary' : 'text-secondary-foreground'),'bg-inherit p-2 flex gap-2 shadow-none text-sm font-normal [&_svg]:size-5 hover:text-primary')}
            onClick={() => handleChartTypeChange(type.value)}
          >
            <type.icon />
          </Button>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='bg-inherit text-secondary-foreground p-2 flex gap-2 shadow-none text-sm font-normal hover:text-primary focus-visible:ring-0'>
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {ALL_CHART_TYPES.map((type) => (
              <DropdownMenuItem
                key={type.value}
                className={cn((chartType === type.value ? 'text-primary' : 'text-secondary-foreground'), 'focus:bg-inherit focus:text-primary-foreground cursor-pointer')}
                onClick={() => handleChartTypeChange(type.value)}
              >
                {type.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation='vertical' className='mx-2 h-8'/>

        <Button 
          className='bg-inherit text-secondary-foreground p-2 flex gap-2 shadow-none text-sm font-normal [&_svg]:size-5 hover:text-primary'
          onClick={handleIndicators}
        >
          <IndicatorsIcon />
          <span>Indicators</span>
        </Button>
      </div>
      <div 
        id="tv_chart_container" 
        ref={containerRef} 
        className={`tradingview-chart ${chartTheme === 'Dark' ? 'theme-dark' : ''} w-full h-full py-2`}
        style={{ backgroundColor: chartTheme === 'Dark' ? "#141519" : "#FFFFFF" }}
      />
    </div>
  );
};

export default TradingViewChart;