'use client'

import CryptoNav from "@/components/CryptoNav";
import FutureCard from "@/components/FutureCard";
import FutureCardContainer from "@/components/FutureCardContainer";
import FuturesPositions from "@/components/FuturesPositions";
import FuturesQuote from "@/components/FuturesQuote";
import TradingViewChart from "@/components/TradingViewChart";
import { usePythMarketData } from "@/hooks/usePythMarketData";
import { usePythPrice } from "@/hooks/usePythPrice";
import { useState } from "react";

export default function Futures(){
    const [selectedSymbol, setSelectedSymbol] = useState<string>('Crypto.SOL/USD')
    const [selectedLogo, setSelectedLogo] = useState<string>('/images/solana.png')
    const { priceData, loading: priceLoading } = usePythPrice(selectedSymbol);
    const { marketData, loading: marketLoading } = usePythMarketData(selectedSymbol);
    const handleSymbolChange = (newSymbol: string) => {
        setSelectedSymbol(newSymbol);
      };
    
      const handleIconChange = (newIcon: string) => {
        setSelectedLogo(newIcon);
      };
    return (
        <main className="space-y-4 flex flex-col pb-4">
            <div className="w-full">
                <CryptoNav
                    onSymbolChange={handleSymbolChange} 
                    onIconChange={handleIconChange}
                    selectedSymbol={selectedSymbol}
                    priceData={priceData}
                    marketData={marketData}
                    priceLoading={priceLoading}
                    marketLoading={marketLoading}
                    type="futures"
                />
            </div>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8 h-[550px] flex flex-col">
                    <div className="flex-grow border-t rounded-sm">
                        <TradingViewChart />
                    </div>
                </div>
                <div className="col-span-4 h-[550px]">
                    <FutureCardContainer />
                </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8">
                    <FuturesPositions />
                </div>
                <div className="col-span-4">
                    <FuturesQuote />
                </div>
            </div>
        </main>
        
    )
}