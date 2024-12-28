'use client'
import { useState } from "react";
import CryptoNav from "@/components/CryptoNav";
import OptionsCard from "@/components/OptionsCard";
import TradingViewChartContainer from "@/components/TradingViewChartContainer";
import ProtectedRoute from "@/components/ProtectedRoute";
import TradingPositionsFallback from "@/components/TradingPositionsFallback";
import TradingPositions from "@/components/TradingPositions";
import PriceQuote from "@/components/PriceQuote";

export default function Homepage(){
    const [selectedSymbol, setSelectedSymbol] = useState<string>('Crypto.SOL/USD')
    
    return (
        <>
            <CryptoNav onSymbolChange={setSelectedSymbol}/>
            <div className="flex flex-col w-full justify-evenly h-full space-y-6">
                <div className="flex w-full h-[664px] pt-4 pb-6 space-x-4">
                    <TradingViewChartContainer symbol={selectedSymbol}/>
                    <OptionsCard />
                </div>
                <div className="flex w-full pt-4 pb-6 space-x-4 h-auto">
                  <div className="w-4/6">
                    <ProtectedRoute fallback={<TradingPositionsFallback/>}>
                        <TradingPositions />
                    </ProtectedRoute>
                  </div>
                  <div className="w-2/6">
                    <PriceQuote />
                  </div>
                </div>
            </div>
            
        </>
    )
}