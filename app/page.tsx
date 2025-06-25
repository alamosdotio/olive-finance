'use client'
import { useEffect, useState } from "react";
import CryptoNav from "@/components/CryptoNav";
import TradingViewChartContainer from "@/components/TradingViewChartContainer";
import ProtectedRoute from "@/components/ProtectedRoute";
import TradingPositionsFallback from "@/components/TradingPositionsFallback";
import TradingPositions from "@/components/TradingPositions";
import PriceQuote from "@/components/PriceQuote";
import GreekPopup from "@/components/GreekPopup";
import { usePythPrice, type PythPriceState } from '@/hooks/usePythPrice';
import { usePythMarketData, type MarketDataState } from '@/hooks/usePythMarketData';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import OptionCardContainer from "@/components/OptionCardContainer";
import { addWeeks } from "date-fns";
import { useOptionsPricing } from "@/hooks/useOptionsPricing";
import { setOptionParameters } from "@/lib/optionsDatafeed";
import { ToastContainer } from "react-toastify";
import { useGreeks } from "@/hooks/useGreeks";

export default function Homepage(){
    const [active ,setActive] = useState('chart')
    const [tokenIdx, setTokenIdx] = useState(0)
    const [selectedSymbol, setSelectedSymbol] = useState<string>('Crypto.SOL/USD')
    const [positionType, setPositionType] = useState<string>('long')
    const [contractType, setContractType] = useState<'Call' | 'Put'>('Call')
    const [currency, setCurrency] = useState(selectedSymbol)
    const [selectedLogo, setSelectedLogo] = useState<string>('/images/solana.png')
    const { priceData, loading: priceLoading } = usePythPrice(selectedSymbol);
    const { marketData, loading: marketLoading } = usePythMarketData(selectedSymbol);
    const [payAmount, setPayAmount] = useState('')
    const [strikePrice, setStrikePrice] = useState('')
    const [expiry , setExpiry] = useState<Date>(addWeeks(new Date(), 1))
    const [transaction, setTransaction] = useState('buy');

    const handleSymbolChange = (newSymbol: string) => {
      setSelectedSymbol(newSymbol);
    };
  
    const handleIconChange = (newIcon: string) => {
      setSelectedLogo(newIcon);
    };

    const handleIndexChange = (newIdx: number) => {
      setTokenIdx(newIdx)
    }

    const s = priceData.price ?? 0;
    const k = parseFloat(strikePrice);
    
    const premium = useOptionsPricing({
        type: contractType,
        currentPrice: s,
        strikePrice: k,
        expiryDate: expiry
    })

    const greeks = useGreeks({
        type: contractType,
        currentPrice: s,
        strikePrice: k,
        expiryDate: expiry
    })

    return (
        <>
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
              type="options"
            />
            <div className={cn((active === 'trade' ? 'space-y-0' : 'space-y-4'),"flex flex-col w-full justify-evenly h-full pb-4")}>
                <div className="w-full pt-4 justify-between grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className={cn((active === 'chart' ? 'w-full' : 'hidden'),"lg:col-span-8 desktop:col-span-9 lg:flex flex-col space-y-4")}>
                      <TradingViewChartContainer 
                        symbol={selectedSymbol} 
                        logo={selectedLogo}
                        premium={premium.premium.toString()}
                        investment={payAmount}
                        strikePrice={strikePrice}
                        currentPrice={priceData.price!}
                        positionType={positionType}
                        contractType={contractType}
                        expiry={expiry}
                      />
                      <div className="w-full">
                      <ProtectedRoute fallback={<TradingPositionsFallback/>}>
                          <TradingPositions />
                      </ProtectedRoute>
                    </div>
                  </div>
                  <div className={cn((active === 'trade' ? 'w-full' : 'hidden'),"lg:flex lg:col-span-4 desktop:col-span-3 flex-col space-y-4")}>
                    <OptionCardContainer 
                      selectedSymbol={selectedSymbol}
                      onSymbolChange={handleSymbolChange} 
                      onIdxChange={handleIndexChange}
                      index={tokenIdx}
                      onStrikePriceChange={setStrikePrice}
                      onExpiryChange={setExpiry}
                      onPayAmountChange={setPayAmount}
                      onContractTypeChange={setContractType}
                      onCurrencyChange={setCurrency}
                      priceData={priceData}
                      marketData={marketData}
                      priceLoading={priceLoading}
                      marketLoading={marketLoading}
                      onTransactionChange={setTransaction}
                    />
                    <div className={`${transaction === 'sell' ? 'hidden' : 'flex'} flex-col space-y-4 w-full`}>
                      <PriceQuote
                        active={tokenIdx}
                        currency={currency}
                        value={payAmount}
                        priceData={priceData}
                        premium={premium.premium}
                        contractType={contractType}
                      />
                      <GreekPopup 
                        value={payAmount}
                        delta={greeks.delta}
                        gamma={greeks.gamma}
                        theta={greeks.theta}
                        vega={greeks.vega}
                        rho={greeks.rho}
                      />
                      {active === 'trade' && (
                        <ProtectedRoute fallback={<TradingPositionsFallback/>}>
                          <TradingPositions />
                        </ProtectedRoute>
                      )}
                    </div>
                  </div>
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
            <ToastContainer
              theme="dark"
            />
        </>
    )
}