'use client'
import { useState } from "react";
import CryptoNav from "@/components/CryptoNav";
import OptionsCard from "@/components/OptionsCard";
import TradingViewChartContainer from "@/components/TradingViewChartContainer";
import ProtectedRoute from "@/components/ProtectedRoute";
import TradingPositionsFallback from "@/components/TradingPositionsFallback";
import TradingPositions from "@/components/TradingPositions";
import PriceQuote from "@/components/PriceQuote";
import GreekPopup from "@/components/GreekPopup";
import { usePythPrice, type PythPriceState } from '@/hooks/usePythPrice';
import { usePythMarketData, type MarketDataState } from '@/hooks/usePythMarketData';

export default function Homepage(){
    const [selectedSymbol, setSelectedSymbol] = useState<string>('Crypto.SOL/USD')
    const [selectedLogo, setSelectedLogo] = useState<string>('/images/solana.png')
    const [formValues, setFormValues] = useState<{
        selling: { currency: string; amount: string };
    }>({
        selling: { currency: 'usdc', amount: '' },
    })

    const handleSellingAmountChange = (newValue: string) => {
      setFormValues(prev => ({
        ...prev,
        selling: { ...prev.selling, amount: newValue }
      }));
    };

    const { priceData, loading: priceLoading } = usePythPrice(selectedSymbol);
    const { marketData, loading: marketLoading } = usePythMarketData(selectedSymbol);
    
    const handleSymbolChange = (newSymbol: string) => {
      setSelectedSymbol(newSymbol);
    };
  
    const handleIconChange = (newIcon: string) => {
      setSelectedLogo(newIcon);
    };
  
    
    return (
        <>
            <CryptoNav 
              onSymbolChange={handleSymbolChange} 
              onIconChange={handleIconChange}
              selectedSymbol={selectedSymbol}
              priceData={priceData}
              marketData={marketData}
              priceLoading={priceLoading}
              marketLoading={marketLoading}
            />
            <div className="flex flex-col w-full justify-evenly h-full space-y-4">
                <div className="flex w-full h-[700px] pt-4 pb-6 space-x-4 justify-between">
                  <div className="w-4/6">
                    <TradingViewChartContainer symbol={selectedSymbol} logo={selectedLogo}/>
                  </div>
                  <div className="w-2/6">
                    <OptionsCard 
                      chartToken={selectedSymbol}
                      chartTokenLogo={selectedLogo}
                      onValueChange={(value) => handleSellingAmountChange(value)}
                      priceData={priceData}
                      marketData={marketData}
                      priceLoading={priceLoading}
                    />
                  </div>
                    
                </div>
                <div className="flex w-full pt-4 pb-6 space-x-4 h-auto">
                  <div className="w-4/6">
                    <ProtectedRoute fallback={<TradingPositionsFallback/>}>
                        <TradingPositions />
                    </ProtectedRoute>
                  </div>
  
                  <div className="w-2/6 flex flex-col space-y-4">
                    <PriceQuote value={formValues.selling.amount}/>
                    <GreekPopup value={formValues.selling.amount}/>
                  </div>
                </div>
            </div>
            
        </>
    )
}