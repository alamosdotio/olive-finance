'use client'
import { useEffect, useState } from "react";
import CryptoNav from "@/components/CryptoNav";
import OptionChainTable from "@/components/OptionChainTable";
import { usePythMarketData } from "@/hooks/usePythMarketData";
import { usePythPrice } from "@/hooks/usePythPrice";
import OptionChainSummary from "@/components/OptionChainSummary";
import { generateOptionChainData, OptionChainData } from "@/lib/data/dummyData";


export default function OptionChain(){
        const [tokenIdx, setTokenIdx] = useState(0)
        const [optionIdx, setOptionIdx] = useState(-1)
        const [bidPrice, setBidPrice] = useState(0)
        const [position, setPosition] = useState<'Long' | 'Short'>('Long')
        const [contract, setContract] = useState<'Call' | 'Put'>('Call')
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
        
        const price = priceData.price ?? 0;
        const isCall = contract === 'Call'
        const [dummyData, setDummyData] = useState<OptionChainData[]>([])
    
        useEffect(() => {
            if(price > 0){
                setDummyData(generateOptionChainData(30, price, 1, isCall))
            }
        }, [priceData.price])

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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 py-4">
                <div className="lg:col-span-9">
                    <OptionChainTable 
                        tokenIdx={tokenIdx}
                        priceData={priceData}
                        priceLoading={priceLoading}
                        dummyData={dummyData}
                        optionIdx={optionIdx}
                        onOptionIdxChange={setOptionIdx}
                        onBidPriceChange={setBidPrice}
                        position={position}
                        onPositionChange={setPosition}
                        contract={contract}
                        onContractChange={setContract}
                    />
                </div>
                <div className="hidden lg:block lg:col-span-3">
                    <OptionChainSummary 
                        idx={optionIdx}
                        option={dummyData[optionIdx]}
                    />
                </div>

            </div>
        </main>
    )
}