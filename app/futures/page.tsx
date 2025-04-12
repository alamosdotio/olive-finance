'use client'

import CryptoNav from "@/components/CryptoNav";
import FutureCardContainer from "@/components/FutureCardContainer";
import FuturesPositions from "@/components/FuturesPositions";
import FuturesQuote from "@/components/FuturesQuote";
import TradingViewChart from "@/components/TradingViewChart";
import { usePythMarketData } from "@/hooks/usePythMarketData";
import { usePythPrice } from "@/hooks/usePythPrice";
import { useState } from "react";

export default function Futures(){
    const [tokenIdx, setTokenIdx] = useState(0)
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
      const handleIndexChange = (newIdx: number) => {
        setTokenIdx(newIdx)
      }
    return (
        <main className="space-y-4 flex flex-col">
            <div className="w-full">
                <CryptoNav
                    onSymbolChange={handleSymbolChange} 
                    onIconChange={handleIconChange}
                    onIdxChange={handleIndexChange}
                    active={tokenIdx}
                    selectedSymbol={selectedSymbol}
                    priceData={priceData}
                    marketData={marketData}
                    priceLoading={priceLoading}
                    marketLoading={marketLoading}
                    type="futures"
                />
            </div>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8 flex flex-col gap-4">
                    <div className="h-[550px] border-t rounded-sm">
                        <TradingViewChart symbol={selectedSymbol} logo={selectedLogo}/>
                    </div>
                    <FuturesPositions />
                </div>
                <div className="col-span-4 h-fit flex flex-col gap-4">
                    <FutureCardContainer
                        active={tokenIdx}
                        onSymbolChange={handleSymbolChange}
                        onIdxChange={handleIndexChange}
                    />
                    <FuturesQuote />
                </div>
            </div>
        </main>
        
    )
}