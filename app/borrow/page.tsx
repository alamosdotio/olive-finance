'use client'
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="border rounded-sm col-span-8">
                    <div className="h-[536px]">

                    </div>
                </div>
                <div className="border rounded-sm col-span-4">

                </div>
            </div>
        </main>
    )
}