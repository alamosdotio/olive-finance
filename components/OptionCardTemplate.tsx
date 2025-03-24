'use client'
import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, MoreVertical, ChevronDown } from 'lucide-react';

export default function OptionCardTemplate(){
    const [selectedOption, setSelectedOption] = useState<'Call' | 'Put'>('Call');
    const [strikePrice, setStrikePrice] = useState('2.2');
    const [expiration, setExpiration] = useState('1 week');
    const [optionSize, setOptionSize] = useState('0.1');
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-inherit rounded-sm p-6 space-y-6 border">
            {/* Token Selection */}
            <div className="flex items-center space-x-2 text-white bg-backgroundSecondary w-fit py-3 px-4 rounded-sm">
                <div className="bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center">W</div>
                <span className="font-semibold">WETH</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
    
            {/* Trading Direction */}
            <div className="space-y-2">
                <p className="text-gray-300 text-sm">Price Sentiment of WETH:</p>
                <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={() => setSelectedOption('Call')}
                    className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-lg border ${
                    selectedOption === 'Call'
                        ? 'border-emerald-500 bg-inherit text-emerald-500'
                        : 'border-secondary-foreground text-secondary-foreground hover:bg-accent'
                    }`}
                >
                    <ArrowUpRight className="w-4 h-4" />
                    <span>Call</span>
                </button>
                <button
                    onClick={() => setSelectedOption('Put')}
                    className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-lg border ${
                    selectedOption === 'Put'
                        ? 'border-red-500 bg-inherit text-red-500'
                        : 'border-secondary-foreground text-secondary-foreground hover:bg-accent'
                    }`}
                >
                    <ArrowDownRight className="w-4 h-4" />
                    <span>Put</span>
                </button>
                </div>
            </div>
    
            {/* Strike Price */}
            <div className="space-y-2">
                <label className="text-gray-300 text-sm">Strike price</label>
                <div className="flex space-x-3">
                {['2.0', '2.1', '2.2'].map((price) => (
                    <button
                    key={price}
                    onClick={() => setStrikePrice(price)}
                    className={`flex-1 py-2 px-4 rounded-sm ${
                        strikePrice === price
                        ? 'bg-gradient-primary text-backgroundSecondary'
                        : 'bg-backgroundSecondary text-secondary-foreground hover:bg-secondary'
                    }`}
                    >
                    ${price}K
                    </button>
                ))}
                <button className="px-3 py-2 rounded-sm bg-backgroundSecondary text-secondary-foreground hover:bg-secondary">
                    <MoreVertical className="w-4 h-4" />
                </button>
                </div>
            </div>
    
            {/* Expiration */}
            <div className="space-y-2">
                <label className="text-gray-300 text-sm">Expiry</label>
                <div className="flex space-x-3">
                {['1 week', '2 weeks', '3 weeks'].map((period) => (
                    <button
                    key={period}
                    onClick={() => setExpiration(period)}
                    className={`flex-1 py-2 px-4 rounded-sm ${
                        expiration === period
                        ? 'bg-gradient-primary text-backgroundSecondary'
                        : 'bg-backgroundSecondary text-secondary-foreground hover:bg-secondary'
                    }`}
                    >
                    {period}
                    </button>
                ))}
                <button className="px-3 py-2 rounded-sm bg-backgroundSecondary text-secondary-foreground hover:bg-secondary">
                    <MoreVertical className="w-4 h-4" />
                </button>
                </div>
            </div>
    
            {/* Option Size */}
            <div className="space-y-2">
                <label className="text-gray-300 text-sm">Amount</label>
                <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    <div className="bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-xs text-white">
                    W
                    </div>
                </div>
                <input
                    type="number"
                    value={optionSize}
                    onChange={(e) => setOptionSize(e.target.value)}
                    className="w-full bg-backgroundSecondary text-foreground py-3 pl-12 pr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    step="0.1"
                    min="0.1"
                />
                </div>
            </div>
            </div>
      </div>
    );
  }