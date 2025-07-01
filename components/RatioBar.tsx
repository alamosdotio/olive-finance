'use client'

import { cn } from "@/lib/utils"

interface RatioBarProps{
    symbol: string
    leftPercentage: number;
    rightPercentage: number;
    leftColor?: string;
    rightColor?: string;
    classname?: string;
}

export function RatioBar({
    symbol,
    leftPercentage,
    rightPercentage,
    leftColor = "bg-green-500",
    rightColor = "bg-red-500",
    classname,
} : RatioBarProps){
    const total = leftPercentage + rightPercentage;
    const normalizedLeft = (leftPercentage / total) * 100;
    const normalizedRight = (rightPercentage / total) * 100;
    
    return (
        <div className="flex-1 relative h-3 overflow-hidden rounded-[2px]">
            <div 
                className={cn("absolute left-0 top-0 h-full flex items-center border border-green-500 justify-center text-white text-xs font-medium", leftColor)}
                style={{ width: `${normalizedLeft}%` }}
            >
                <span className="text-[8px] text-center">
                    {leftPercentage.toFixed(2)}%
                </span>
            </div>
            <div
                className={cn("absolute right-0 top-0 h-full flex items-center border- border-red-500 justify-center text-white text-xs font-medium", rightColor)}
                style={{ width: `${normalizedRight}%` }}
            >
                <span className="text-[8px] text-center">
                    {rightPercentage.toFixed(2)}%
                </span>
            </div>
        </div>
    )
}