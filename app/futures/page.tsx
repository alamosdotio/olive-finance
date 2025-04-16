'use client'

import CryptoNav from "@/components/CryptoNav";
import FutureCardContainer from "@/components/FutureCardContainer";
import FuturesPositions from "@/components/FuturesPositions";
import FuturesQuote from "@/components/FuturesQuote";
import TradingViewChart from "@/components/TradingViewChart";
import { Button } from "@/components/ui/button";
import { usePythMarketData } from "@/hooks/usePythMarketData";
import { usePythPrice } from "@/hooks/usePythPrice";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Futures(){
    const [active ,setActive] = useState('chart')
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className={`${active === 'chart' ? 'lg:col-span-8 flex' : 'hidden lg:col-span-8 lg:flex'} flex-col gap-4`}>
                    <div className="h-[538px] border-t rounded-sm">
                        <TradingViewChart symbol={selectedSymbol} logo={selectedLogo}/>
                    </div>
                    <FuturesPositions />
                </div>
                <div className={`${active === 'trade' ? 'lg:col-span-4 flex' : 'hidden lg:col-span-4 lg:flex'}  h-fit flex-col gap-4`}>
                    <FutureCardContainer
                        active={tokenIdx}
                        onSymbolChange={handleSymbolChange}
                        onIdxChange={handleIndexChange}
                    />
                    <FuturesQuote />
                </div>
            </div>
            <div className="w-full p-3 pb-10 bottom-0 sticky border-t bg-background z-10 lg:hidden">
              <div className="grid grid-cols-2 space-x-2">
                <Button 
                  className={cn((active === 'chart' ? 'border-primary text-primary' : 'text-secondary-foreground'),"border rounded-sm px-5 py-[6px] bg-inherit w-full")}
                  onClick={() => setActive('chart')}
                >
                  Chart
                </Button>
                <Button 
                  className={cn((active === 'trade' ? 'border-primary text-primary' : 'text-secondary-foreground'),"border rounded-sm px-5 py-[6px] bg-inherit w-full")}
                  onClick={() => setActive('trade')}
                >
                  Trade
                </Button>
              </div>
            </div>
        </main>
        
    )
}