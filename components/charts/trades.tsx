'use client';

import React, { useEffect, useRef, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
} from 'chart.js';
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const chartData = (barBg:string) => ({
    labels: ['Apr 13', 'Apr 20', 'Apr 27', 'May 4', 'May 11', 'May 18', 'May 25', 'Jun 1', 'Jun 8'],
    datasets: [
        {
            label: 'Options',
            data: [2, 3, 5, 1, 3, 7, 2.1, 8.7, 5.8],
            backgroundColor: barBg,
            borderRadius: 0,
            barPercentage: 0.8,
            categoryPercentage: 0.9,
        },
        {
            label: 'Futures',
            data: [2, 3, 5, 1, 3, 7, 2.1, 8.7, 5.8],
            backgroundColor: '#d4c5a0',
            borderRadius: 0,
            barPercentage: 0.8,
            categoryPercentage: 0.9,
        }
    ],
});

const formatValue = (value: number): string => {
    if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`;
    }
    return `${value.toFixed(2)}`;
};

const formatTooltipValue = (value: number): string => {
    return `${value.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })}`;
};

const traders = (tooltipbg:string) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        tooltip: {
            backgroundColor: tooltipbg,
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#374151',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            padding: 12,
            titleFont: {
                size: 14,
                weight: 600,
            },
            bodyFont: {
                size: 13,
                weight: 400,
            },
            callbacks: {
                title: (context: TooltipItem<'bar'>[]) => {
                    return context[0].label;
                },
                label: (context: TooltipItem<'bar'>) => {
                    const label = context.dataset.label || '';
                    const value = context.parsed.y * 10;
                    return `${label}: ${formatTooltipValue(value)}`;
                },
            },
        },
    },
    scales: {
        x: {
            stacked: true,
            grid: {
                display: false,
            },
            ticks: {
                color: '#9ca3af',
                font: {
                    size: 11,
                    weight: 400,
                },
            },
            border: {
                display: false,
            },
        },
        y: {
            stacked: true,
            grid: {
                color: 'rgba(156, 163, 175, 0.1)',
                drawBorder: false,
            },
            ticks: {
                color: '#9ca3af',
                font: {
                    size: 11,
                    weight: 400,
                },
                callback: (value: any) => {
                    return formatValue(value * 10);
                },
                stepSize: 2.5,
            },
            border: {
                display: false,
            },
            beginAtZero: true,
            max: 10,
        },
    },
    interaction: {
        intersect: false,
        mode: 'index' as const,
    },
    animation: {
        duration: 1000,
        easing: 'easeOutQuart' as const,
    },
});

const getCssVariable = (name: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(name)?.trim() || '#000000';
};


const TradesChart = () => {
    const chartRef = useRef<ChartJS<'bar'>>(null);
    const [barBg, setBarBg] = useState('#000')
    const [tooltipBg, setTooltipBg] = useState('#000');

    useEffect(() => {
        const chart = chartRef.current;
        const primary = getCssVariable('--primary')
        setBarBg(`rgb(${primary})`);
        setTooltipBg(getCssVariable('--accent'));

        if(chart){
            const originalUpdate = chart.update;
            chart.update = function(mode?: any) {
                originalUpdate.call(this, mode);
            };
        }
    }, [])

    return (
        <div className="w-full h-full flex flex-col bg-inherit">
            <div className="flex-none">
                <h2 className="text-xl font-semibold text-white mb-2">Trades</h2>
            </div>
            <div className="relative flex-grow">
                <Bar
                    ref={chartRef}
                    data={chartData(barBg)}
                    options={traders(tooltipBg)}
                />
            </div>
        </div>
    )
}

export default TradesChart;