'use client'

import { useEffect, useState } from "react"
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, ChevronDown, Info } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StrikePriceDialog } from "./StrikePriceDialog"
import { ExpirationDialog } from "./ExpirationDialog"
import { addWeeks, format } from "date-fns"
import { WalletIcon } from "@/public/svgs/icons"
import CardTokenList from "./CardTokenList"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import type { PythPriceState } from "@/hooks/usePythPrice";
import type { MarketDataState } from "@/hooks/usePythMarketData";
import { formatPrice } from "@/utils/formatter"

interface OptionCardProps{
  orderType: 'market' | 'limit';
  selectedSymbol: string;
  onSymbolChange: (symbol: string) => void;
  onIdxChange: (idx: number) => void;
  onStrikePriceChange: (amount: string) => void;
  onPayAmountChange: (amount: string) => void;
  active: number;
  priceData: PythPriceState;
  marketData: MarketDataState;
  priceLoading: boolean;
  marketLoading: boolean;
}

export default function OptionCard(
  {orderType, onIdxChange, onSymbolChange, active, onPayAmountChange, selectedSymbol, priceData, priceLoading, marketData, marketLoading, onStrikePriceChange} 
  : 
  OptionCardProps) {
  const [selectedOption, setSelectedOption] = useState<'Call' | 'Put'>('Call')
  const [strikePrice, setStrikePrice] = useState('0')
  const [expiration, setExpiration] = useState<Date>(addWeeks(new Date(), 1))
  const [payAmount, setPayAmount] = useState('')
  const [payCurrency, setPayCurrency] = useState(selectedSymbol)
  const [showStrikePriceModal, setShowStrikePriceModal] = useState(false)
  const [showExpirationModal, setShowExpirationModal] = useState(false)
  const [limitPrice, setLimitPrice] = useState("");
  const [hasSetInitialStrike, setHasSetInitialStrike] = useState(false)

  const isPositive = marketData.change24h !== null && marketData.change24h > 0;

  useEffect(() => {
    if(priceData.price) {
      const defaultPrices = getDefaultStrikePrices(priceData.price)
      setStrikePrice(defaultPrices[0])
      onStrikePriceChange(defaultPrices[0])
    }
  }, [priceData.price])

  const getDefaultStrikePrices = (currentPrice: number): string[] => {
    let increment: number

    if (currentPrice < 100) increment = 1
    else if (currentPrice < 1000) increment = 10
    else if (currentPrice < 10000) increment = 100
    else if (currentPrice < 100000) increment = 1000
    else increment = 10000

    const basePrice = Math.floor(currentPrice / increment) * increment

    return [
      basePrice.toString(),
      (basePrice + increment).toString(),
      (basePrice + (2 * increment)).toString()
    ]
  }

  const defaultStrikePrices = priceData.price ? getDefaultStrikePrices(priceData.price) : ['0', '0', '0']

  const defaultExpirations = [
    { label: '1 week', value: addWeeks(new Date(), 1) },
    { label: '2 weeks', value: addWeeks(new Date(), 2) },
    { label: '3 weeks', value: addWeeks(new Date(), 3) }
  ]

  const isDefaultStrike = defaultStrikePrices.includes(strikePrice)
  const isDefaultExpiration = defaultExpirations.some(exp => 
    format(exp.value, 'yyyy-MM-dd') === format(expiration, 'yyyy-MM-dd')
  )

  const formatStrikePrice = (price: string) => {
    const num = parseFloat(price)
    return `$${num.toLocaleString()}`
  }

  const handleExpirationSelect = (newExpiration: Date) => {
    setExpiration(newExpiration)
  }

  const getExpirationLabel = (date: Date): string => {
    const matchingDefault = defaultExpirations.find(exp => 
      format(exp.value, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    )
    return matchingDefault ? matchingDefault.label : format(date, 'dd MMM yyyy')
  }

  const formatChange = (change: number | null) => {
    if (change === null) return '0.00';
    return Math.abs(change).toFixed(2);
};

  return (
    <div className="w-full flex flex-col flex-grow bg-card rounded-sm rounded-t-none p-6 space-y-4 border border-t-0">
      {/* Token Selection */}
      <div className="flex justify-between gap-3 items-start">
        <CardTokenList onSymbolChange={onSymbolChange} onPaymentTokenChange={setPayCurrency} onIdxChange={onIdxChange} active={active} type="chart"/>
        {orderType === 'market' ? (
          <div className="text-right h-12">
            <div className="text-2xl font-semibold tracking-tight">${priceData.price ? formatPrice(priceData.price) : priceLoading}</div>
            <div className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? '+' : '-'}{marketData.change24h ? formatChange(marketData.change24h) : marketLoading}%
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="w-32 rounded-sm p-2 h-12 flex flex-col border items-start justify-center focus-within:border-primary">
              <span className="text-xs text-secondary-foreground">Limit Price:</span>
              <Input
                type="text"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                className="w-32 text-left h-fit border-none"
                placeholder="0.00"
              />
            </div>
          </div>
        )}
      </div>

      {/* Trading Direction */}
      <div className="space-y-2">
        <p className="text-secondary-foreground text-sm">Price Sentiment:</p>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => setSelectedOption('Call')}
            className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-sm border ${
                selectedOption === 'Call'
                    ? 'bg-green-500/10 text-green-500 border-green-500 hover:bg-green-500/20' 
                    : 'hover:border-green-500 hover:text-green-500 border-border/40 hover:bg-green-500/20'
                }`}
          >
            <ArrowUpRight className="w-4 h-4 mr-2" />
            Call
          </Button>
          <Button
            variant="outline"
            onClick={() => setSelectedOption('Put')}
            className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-sm border ${
                selectedOption === 'Put'
                    ? 'bg-red-500/10 text-red-500 border-red-500 hover:bg-red-500/20' 
                    : 'hover:border-red-500 hover:text-red-500 border-border/40 hover:bg-red-500/20'
                }`}
          >
            <ArrowDownRight className="w-4 h-4 mr-2" />
            Put
          </Button>
        </div>
      </div>

      {/* Strike Price */}
      <div className="space-y-2">
        <label className="text-secondary-foreground text-sm">Strike price</label>
        <div className="grid grid-cols-4 gap-2">
          {isDefaultStrike ? (
            <>
              {defaultStrikePrices.map((price, idx) => (
                <Button
                  key={idx}
                  onClick={() => {
                    setStrikePrice(price)
                    onStrikePriceChange(price)
                  }}
                  className={`flex-1 py-2 px-4 rounded-sm ${
                    strikePrice === price
                    ? 'bg-primary hover:bg-gradient-primary text-backgroundSecondary'
                    : 'bg-backgroundSecondary text-foreground hover:bg-secondary'
                }`}
                >
                  {formatStrikePrice(price)}
                </Button>
              ))}
              <Button
                className="py-2 px-4 rounded-sm bg-backgroundSecondary text-foreground hover:bg-secondary"
                onClick={() => setShowStrikePriceModal(true)}
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="default"
                className="col-span-3 bg-gradient-primary text-backgroundSecondary rounded-sm py-2 px-4"
              >
                {formatStrikePrice(strikePrice)}
              </Button>
              <Button
                className="py-2 px-4 rounded-sm bg-backgroundSecondary text-foreground hover:bg-secondary"
                onClick={() => setShowStrikePriceModal(true)}
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Expiration */}
      <div className="space-y-2">
        <label className="text-secondary-foreground text-sm">Expiration</label>
        <div className="grid grid-cols-4 gap-2">
          {isDefaultExpiration ? (
            <>
              {defaultExpirations.map((exp) => (
                <Button
                  key={exp.label}
                  onClick={() => setExpiration(exp.value)}
                  className={`flex-1 py-2 px-4 rounded-sm ${
                    format(expiration, 'yyyy-MM-dd') === format(exp.value, 'yyyy-MM-dd')
                    ? 'bg-primary hover:bg-gradient-primary text-backgroundSecondary'
                    : 'bg-backgroundSecondary text-foreground hover:bg-secondary'
                }`}
                >
                  {exp.label}
                </Button>
              ))}
              <Button
                className="py-2 px-4 rounded-sm bg-backgroundSecondary text-foreground hover:bg-secondary"
                onClick={() => setShowExpirationModal(true)}
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                className="col-span-3 bg-gradient-primary text-backgroundSecondary rounded-sm py-2 px-4"
              >
                {getExpirationLabel(expiration)}
              </Button>
              <Button
                className="py-2 px-4 rounded-sm bg-backgroundSecondary text-foreground hover:bg-secondary"
                onClick={() => setShowExpirationModal(true)}
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Option Size */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm text-secondary-foreground font-medium">Pay Amount</label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 text-secondary-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter the amount you want to invest</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <span className="text-sm text-secondary-foreground">Balance: 0 SOL</span>
        </div>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            <CardTokenList onSymbolChange={onSymbolChange} onPaymentTokenChange={setPayCurrency} onIdxChange={onIdxChange} active={active} type="paying"/>
          </div>
          <Input
            type="number"
            value={payAmount}
            onChange={(e) => 
              {
                setPayAmount(e.target.value)
                onPayAmountChange(e.target.value)
              }}
            placeholder="0.00"
            className="pl-12 h-11 text-base font-medium border-border rounded-sm placeholder:text-secondary-foreground focus:border-primary"
            step="0.1"
            min="0.1"
          />
        </div>
      </div>

      {/* Submit Button */}
        <Button 
          className="w-full h-10 rounded-sm bg-primary hover:bg-gradient-primary text-black my"
        >
          <WalletIcon />
          <span className="text-base font-medium">Connect Wallet</span>
        </Button>

      {/* Modals */}
      <StrikePriceDialog
        open={showStrikePriceModal}
        onOpenChange={setShowStrikePriceModal}
        onSelectPrice={setStrikePrice}
        onStrikePriceChange={onStrikePriceChange}
        currentPrice={strikePrice}
        marketPrice={priceData.price || 0}
      />
      <ExpirationDialog
        open={showExpirationModal}
        onOpenChange={setShowExpirationModal}
        onSelectExpiration={handleExpirationSelect}
        currentExpiration={expiration}
      />
    </div>
  )
}