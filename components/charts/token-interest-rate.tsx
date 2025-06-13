"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface TokenInterestRateProps{
    token: string
}

const TokenInterestRate = ({token} : TokenInterestRateProps) => {
    const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgb(255, 255, 255)',
        titleColor: 'rgb(0, 0, 0)',
        bodyColor: 'rgb(0, 0, 0)',
        borderColor: 'rgb(128, 128, 128)',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `${context.parsed.y.toFixed(2)}%`;
          }
        }
      }
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#808693',
          font: {
            size: 12,
          },
        }
      },
      y: {
        position: 'left' as const,
        grid: {
          color: '#333339',
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#808693',
          font: {
            size: 12,
          },
          callback: function(value: any) {
            return `${value}%`;
          }
        }
      },
    },
  };

  const data = {
    labels: ['Apr 13', 'Apr 20', 'Apr 27', 'May 4', 'May 11', 'May 18', 'May 25', 'Jun 1', 'Jun 8'],
    datasets: [
      {
        fill: true,
        data: [100, 80, 140, 75, 130, 120, 100, 95, 103],
        borderColor: '#B1A3FB',
        backgroundColor: 'rgba(177, 163, 251, 0.4)',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="w-full h-full flex flex-col bg-inherit">
        <div className="flex-none">
            <h2 className="text-xl font-semibold text-white mb-2">{token} Interest Rate</h2>
        </div>
       <div className="relative flex-grow">
            <Line options={options} data={data} />
        </div>
    </div>
    
  );
}

export default TokenInterestRate;