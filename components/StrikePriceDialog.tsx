'use client'

import { Search, ArrowLeft, Plus } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { ScrollArea } from './ui/scroll-area'

interface StrikePriceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectPrice: (price: string) => void
  currentPrice: string
}

interface StrikePrice {
  price: string
  liquidity: string
}

export function StrikePriceDialog({ open, onOpenChange, onSelectPrice, currentPrice }: StrikePriceDialogProps) {
  const [searchStrike, setSearchStrike] = useState('')
  const [customStrike, setCustomStrike] = useState('')
  const [showCustomStrike, setShowCustomStrike] = useState(false)

  const allStrikePrices: StrikePrice[] = [
    { price: '2000', liquidity: '384.2K' },
    { price: '2100', liquidity: '384.2K' },
    { price: '2200', liquidity: '384.2K' },
    { price: '2300', liquidity: '384.2K' },
    { price: '2400', liquidity: '384.2K' },
  ]

  const filteredStrikePrices = allStrikePrices.filter(strike => 
    strike.price.includes(searchStrike.replace(/[^0-9]/g, ''))
  )

  const formatPrice = (price: string) => {
    const num = parseFloat(price)
    return `$${num.toLocaleString()}`
  }

  const handleCustomStrikeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (customStrike && !isNaN(Number(customStrike))) {
      onSelectPrice(customStrike)
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
                  <span>{formatPrice(strike.price)}</span>
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