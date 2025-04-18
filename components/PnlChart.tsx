"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ScriptableLineSegmentContext,
} from "chart.js";
import annotationPlugin from 'chartjs-plugin-annotation';
import { Line } from "react-chartjs-2";
import { useId } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin
);

interface PnLChartProps {
  strikePrice: number;
  premium: number;
  contractType: string;
  positionType: string;
  currentPrice?: number;
  multiplier?: number;
}

const calculatePnL = (
  price: number,
  strikePrice: number,
  premium: number,
  contractType: string,
  positionType: string,
  multiplier: number = 1
) => {
  let pnl = 0;
  const premiumPerContract = premium / multiplier;

  if (contractType === 'call') {
    if (positionType === 'long') {
      // Long Call: PnL = (max(Price - Strike, 0) - Premium) × Multiplier
      pnl = (Math.max(price - strikePrice, 0) - premiumPerContract) * multiplier;
    } else {
      // Short Call: PnL = (Premium - max(Price - Strike, 0)) × Multiplier
      pnl = (premiumPerContract - Math.max(price - strikePrice, 0)) * multiplier;
    }
  } else {
    if (positionType === 'long') {
      // Long Put: PnL = (max(Strike - Price, 0) - Premium) × Multiplier
      pnl = (Math.max(strikePrice - price, 0) - premiumPerContract) * multiplier;
    } else {
      // Short Put: PnL = (Premium - max(Strike - Price, 0)) × Multiplier
      pnl = (premiumPerContract - Math.max(strikePrice - price, 0)) * multiplier;
    }
  }
  return pnl;
};

const generatePnLData = ({
  strikePrice,
  premium,
  contractType,
  positionType,
  currentPrice = strikePrice,
  multiplier = 1,
}: PnLChartProps) => {
  // Generate price range ±20% of strike price
  const range = strikePrice * 0.2;
  const minPrice = strikePrice - range;
  const maxPrice = strikePrice + range;
  const numPoints = 400;
  const priceStep = (maxPrice - minPrice) / (numPoints - 1);
  
  const priceRange = Array.from(
    { length: numPoints },
    (_, i) => minPrice + i * priceStep
  );

  const pnlData = priceRange.map(price =>
    calculatePnL(price, strikePrice, premium, contractType, positionType, multiplier)
  );

  const maxPnL = Math.max(...pnlData);
  const minPnL = Math.min(...pnlData);
  const pnlRange = Math.max(Math.abs(maxPnL), Math.abs(minPnL));

  return {
    labels: priceRange,
    priceRange,
    datasets: [
      {
        label: "Option P&L",
        data: pnlData,
        segment: {
          borderColor: (ctx: ScriptableLineSegmentContext) => {
            const value = ctx.p1.parsed.y;
            return value < 0 
              ? "rgba(177, 163, 251, 1)" // Red for negative
              : "rgba(83, 192, 141, 1)"; // Green for positive
          },
          backgroundColor: (ctx: ScriptableLineSegmentContext) => {
            const value = ctx.p1.parsed.y;
            return value < 0 
              ? "rgba(177, 163, 251, 0.2)" // Transparent red for negative
              : "rgba(83, 192, 141, 0.2)"; // Transparent green for positive
          },
        },
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: 'white',
        pointBorderColor: 'white',
        pointHoverBackgroundColor: 'white',
        pointHoverBorderColor: 'white',
      }
    ],
    pnlRange,
  };
};

export function PnLChart({
  strikePrice,
  premium,
  contractType,
  positionType,
  currentPrice,
  multiplier = 1,
}: PnLChartProps) {
  const chartId = useId();
  const { datasets, labels, priceRange, pnlRange } = generatePnLData({
    strikePrice,
    premium,
    contractType,
    positionType,
    currentPrice,
    multiplier,
  });

  const premiumPerContract = premium / multiplier;
  const breakEvenPrice = contractType === 'call' 
    ? strikePrice + premiumPerContract
    : strikePrice - premiumPerContract;

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
    animation: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          maxTicksLimit: 10,
          callback: (value) => {
            const price = labels[value as number];
            return price ? `$${Math.round(price).toLocaleString()}` : 0;
          },
        },
        title: {
          display: false,
          text: "SOL Price",
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
      y: {
        grid: {
          color: "rgba(29, 30, 34, 1)",
        },
        ticks: {
          color: "rgba(128, 134, 147, 1)",
          callback: (value) => `$${value.toLocaleString()}`,
        },
        title: {
          display: true,
          text: "Profit/Loss ($)",
          color: "rgba(77, 79, 88, 0.7)",
        },
        min: -pnlRange,
        max: pnlRange,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (context) => {
            const price = labels[context[0].dataIndex];
            return `SOL Price: $${Math.round(price).toLocaleString()}`;
          },
          label: (context) => {
            return `P&L: $${context.parsed.y.toLocaleString()}`;
          },
        },
      },
      annotation: {
        annotations: {
          strikePrice: {
            type: 'line',
            xMin: priceRange.findIndex(p => p >= strikePrice),
            xMax: priceRange.findIndex(p => p >= strikePrice),
            borderColor: 'rgba(255, 255, 255, 0.5)',
            borderWidth: 2,
            borderDash: [5, 5],
            label: {
              display: true,
              content: `Strike: $${strikePrice.toLocaleString()}`,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: 4,
              position: 'start',
              yAdjust: -10,
            }
          },
          currentPrice: currentPrice ? {
            type: 'line',
            xMin: priceRange.findIndex(p => p >= (currentPrice || 0)),
            xMax: priceRange.findIndex(p => p >= (currentPrice || 0)),
            borderColor: 'white',
            borderWidth: 2,
            label: {
              display: true,
              content: `Current: $${currentPrice.toLocaleString()}`,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: 4,
              position: 'end',
              yAdjust: 10,
            }
          } : undefined,
          // breakEven: {
          //   type: 'line',
          //   xMin: priceRange.findIndex(p => p >= breakEvenPrice),
          //   xMax: priceRange.findIndex(p => p >= breakEvenPrice),
          //   borderColor: 'rgba(255, 255, 255, 0.5)',
          //   borderWidth: 1,
          //   borderDash: [2, 2],
          //   label: {
          //     display: true,
          //     content: `Break-even: $${breakEvenPrice.toLocaleString()}`,
          //     backgroundColor: 'rgba(0, 0, 0, 0.8)',
          //     color: 'white',
          //     padding: 4,
          //     position: 'start',
          //     yAdjust: 20,
          //   }
          // }
        }
      }
    },
  };

  return (
    <div className="w-full h-full bg-background rounded-lg px-1">
      <div className="h-full">
        <Line id={chartId} options={options} data={{ labels, datasets }} />
      </div>
    </div>
  );
}