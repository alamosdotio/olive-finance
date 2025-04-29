'use client'

import { Search, ArrowLeft, Plus } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react'
import { ScrollArea } from './ui/scroll-area'
import { formatPrice } from '@/utils/formatter'

interface StrikePriceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectPrice: (price: string) => void
  onStrikePriceChange: (amount: string) => void;
  onDefaultStrikePrices: (prices: string[]) => void;
  currentPrice: string
  marketPrice?: number
}

interface StrikePrice {
  price: string
  liquidity: string
}

export function StrikePriceDialog({ open, onOpenChange, onSelectPrice,onStrikePriceChange, onDefaultStrikePrices, currentPrice, marketPrice = 0 }: StrikePriceDialogProps) {
  const [searchStrike, setSearchStrike] = useState('')
  const [customStrike, setCustomStrike] = useState('')
  const [showCustomStrike, setShowCustomStrike] = useState(false)
  const [strikePrices, setStrikePrices] = useState<StrikePrice[]>([])

  const getIncrement = (currentPrice: number) => {
    if (typeof currentPrice !== 'number' || isNaN(currentPrice) || currentPrice <= 0) {
        return 0;
    }

    const exponent = Math.floor(Math.log10(currentPrice));
    return Math.pow(10, exponent - 1);
  }

  useEffect(() => {
    const prices: StrikePrice[] = [];
    const lowerBound = marketPrice * 0.8;
    const upperBound = marketPrice * 1.3;

    let currentPrice = lowerBound
    while(currentPrice <= upperBound) {
      let increment: number

      increment = getIncrement(currentPrice)

      if (currentPrice === lowerBound) {
        currentPrice = Math.ceil(currentPrice / increment) * increment
      }

      if (currentPrice <= upperBound) {
        prices.push({
          price: currentPrice.toString(),
          liquidity: '384.2K'
        })
      }

      currentPrice += increment
    }

    const priceNumbers = prices.map(p => parseFloat(p.price))
    const closestIndex = priceNumbers.findIndex(p => p >= marketPrice);

    let defaultStrikes: string[] = [];
    if(closestIndex!== -1){
      defaultStrikes = priceNumbers
      .slice(closestIndex, closestIndex + 3)
      .map(p => p.toString());
    }
    onDefaultStrikePrices(defaultStrikes);
    setStrikePrices(prices)
  }, [marketPrice])
  

  const filteredStrikePrices = strikePrices.filter(strike => 
    strike.price.includes(searchStrike.replace(/[^0-9]/g, ''))
  )

  const formatStrikePrice = (price: string) => {
    const num = parseFloat(price)
    return `$${num.toLocaleString()}`
  }

  const handleCustomStrikeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (customStrike && !isNaN(Number(customStrike))) {
      onSelectPrice(customStrike)
      onStrikePriceChange(customStrike)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select strike price</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={searchStrike}
              onChange={(e) => setSearchStrike(e.target.value)}
              placeholder="Search for strike price"
              className="pl-10 py-2 pr-2 border-border focus:border-primary rounded-sm placeholder:text-muted"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground px-2">
              <span>Strike prices</span>
              <span>Liquidity</span>
            </div>
            <ScrollArea className="h-[250px]">
              <div className='space-y-2'>
              {filteredStrikePrices.map((strike) => (
                <Button
                  key={strike.price}
                  onClick={() => {
                    onSelectPrice(strike.price)
                    onStrikePriceChange(strike.price)
                    onOpenChange(false)
                    setShowCustomStrike(false)
                    setCustomStrike('')
                  }}
                  className={`w-full justify-between h-auto py-3 ${
                    currentPrice === strike.price 
                    ? 'bg-primary hover:bg-gradient-primary text-backgroundSecondary'
                    : 'bg-backgroundSecondary text-secondary-foreground hover:bg-secondary'
                  }`}
                >
                  <span>{parseFloat(strike.price) < 1 ? '$'+formatPrice(parseFloat(strike.price)) : formatStrikePrice(strike.price) }</span>
                  <span className="text-sm opacity-80">${strike.liquidity}</span>
                </Button>
              ))}
              </div>
            </ScrollArea>
          </div>

          <div className="pt-4 border-t">
            {!showCustomStrike ? (
              <Button
                onClick={() => setShowCustomStrike(true)}
                className="w-full bg-inherit border py-5 px-4 text-primary hover:border-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Set custom strike price
              </Button>
            ) : (
              <form onSubmit={handleCustomStrikeSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm">Enter custom strike price</label>
                  <Input
                    type="number"
                    value={customStrike}
                    onChange={(e) => setCustomStrike(e.target.value)}
                    placeholder="Enter price"
                    min="0"
                    step="any"
                    className='border-border rounded-sm focus:border-primary py-2 px-2 placeholder:text-muted'
                  />
                </div>
                <Button type="submit" className="w-full bg-inherit border py-5 px-4 text-primary hover:border-primary">
                  Set Custom Price
                </Button>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}