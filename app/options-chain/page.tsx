'use client'
import { useState } from "react";
import CryptoNav from "@/components/CryptoNav";
import OptionChainTable from "@/components/OptionChainTable";
import { usePythMarketData } from "@/hooks/usePythMarketData";
import { usePythPrice } from "@/hooks/usePythPrice";
import OptionChainSummary from "@/components/OptionChainSummary";


export default function OptionChain(){
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
        <main className="w-full h-full">
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
                type="optionchain"
            />
            <div className="grid grid-cols-12 gap-4 py-4">
                <div className="col-span-9">
                    <OptionChainTable 
                        tokenIdx={tokenIdx}
                        priceData={priceData}
                        priceLoading={priceLoading}
                    />
                </div>
                <div className="col-span-3">
                    <OptionChainSummary />
                </div>

            </div>
        </main>
    )
}