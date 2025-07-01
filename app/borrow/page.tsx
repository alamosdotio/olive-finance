'use client'
import { BorrowCardContainer } from "@/components/BorrowCardContainer";
import { BorrowChartContainer } from "@/components/BorrowChartContainer";
import { BorrowPositions } from "@/components/BorrowPositions";
import CryptoNav from "@/components/CryptoNav";
import { usePythMarketData } from "@/hooks/usePythMarketData";
import { usePythPrice } from "@/hooks/usePythPrice";
import { useState } from "react";

export default function BorrowPage(){
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
    return(
        <main className="space-y-4 pb-4 flex flex-col">
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="col-span-8 flex flex-col gap-4">
                    <div className="h-[536px] border rounded-sm">
                        <BorrowChartContainer />
                    </div>
                    <BorrowPositions />
                </div>
                <div className="col-span-4 h-[536px]">
                    <BorrowCardContainer />
                </div>
            </div>
        </main>
    )
}