'use client'

import { useState } from "react"
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StrikePriceDialog } from "./StrikePriceDialog"
import { ExpirationDialog } from "./ExpirationDialog"
import { addWeeks, format } from "date-fns"

export default function OptionCard() {
  const [selectedOption, setSelectedOption] = useState<'Call' | 'Put'>('Call')
  const [strikePrice, setStrikePrice] = useState('2000')
  const [expiration, setExpiration] = useState<Date>(addWeeks(new Date(), 1))
  const [optionSize, setOptionSize] = useState('0.1')
  const [showStrikePriceModal, setShowStrikePriceModal] = useState(false)
  const [showExpirationModal, setShowExpirationModal] = useState(false)

  const defaultStrikePrices = ['2000', '2100', '2200']
  const defaultExpirations = [
    { label: '1 week', value: addWeeks(new Date(), 1) },
    { label: '2 weeks', value: addWeeks(new Date(), 2) },
    { label: '3 weeks', value: addWeeks(new Date(), 3) }
  ]

  const isDefaultStrike = defaultStrikePrices.includes(strikePrice)
  const isDefaultExpiration = defaultExpirations.some(exp => 
    format(exp.value, 'yyyy-MM-dd') === format(expiration, 'yyyy-MM-dd')
  )

  const formatPrice = (price: string) => {
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

  return (
    <div className="w-full bg-card rounded-sm rounded-t-none p-6 space-y-6 border border-t-0">
      {/* Token Selection */}
      <div className="flex items-center space-x-2 text-foreground">
        <div className="bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center text-white">W</div>
        <span className="font-semibold">WETH</span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Trading Direction */}
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">Price Sentiment:</p>
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => setSelectedOption('Call')}
            className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-sm border ${
                selectedOption === 'Call'
                    ? 'border-emerald-500 bg-inherit text-emerald-500'
                    : 'border-secondary-foreground text-secondary-foreground bg-inherit hover:bg-accent'
                }`}
          >
            <ArrowUpRight className="w-4 h-4 mr-2" />
            Call
          </Button>
          <Button
            onClick={() => setSelectedOption('Put')}
            className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-sm border ${
                selectedOption === 'Put'
                    ? 'border-red-500 bg-inherit text-red-500'
                    : 'border-secondary-foreground text-secondary-foreground bg-inherit hover:bg-accent'
                }`}
          >
            <ArrowDownRight className="w-4 h-4 mr-2" />
            Put
          </Button>
        </div>
      </div>

      {/* Strike Price */}
      <div className="space-y-2">
        <label className="text-muted-foreground text-sm">Strike price</label>
        <div className="grid grid-cols-4 gap-2">
          {isDefaultStrike ? (
            <>
              {defaultStrikePrices.map((price) => (
                <Button
                  key={price}
                  onClick={() => setStrikePrice(price)}
                  className={`flex-1 py-2 px-4 rounded-sm ${
                    strikePrice === price
                    ? 'bg-gradient-primary text-backgroundSecondary'
                    : 'bg-backgroundSecondary text-secondary-foreground hover:bg-secondary'
                }`}
                >
                  {formatPrice(price)}
                </Button>
              ))}
              <Button
                className="py-2 px-4 rounded-sm bg-backgroundSecondary text-secondary-foreground hover:bg-secondary"
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
                {formatPrice(strikePrice)}
              </Button>
              <Button
                className="py-2 px-4 rounded-sm bg-backgroundSecondary text-secondary-foreground hover:bg-secondary"
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
        <label className="text-muted-foreground text-sm">Expiration</label>
        <div className="grid grid-cols-4 gap-2">
          {isDefaultExpiration ? (
            <>
              {defaultExpirations.map((exp) => (
                <Button
                  key={exp.label}
                  onClick={() => setExpiration(exp.value)}
                  className={`flex-1 py-2 px-4 rounded-sm ${
                    format(expiration, 'yyyy-MM-dd') === format(exp.value, 'yyyy-MM-dd')
                    ? 'bg-gradient-primary text-backgroundSecondary'
                    : 'bg-backgroundSecondary text-secondary-foreground hover:bg-secondary'
                }`}
                >
                  {exp.label}
                </Button>
              ))}
              <Button
                className="py-2 px-4 rounded-sm bg-backgroundSecondary text-secondary-foreground hover:bg-secondary"
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
                className="py-2 px-4 rounded-sm bg-backgroundSecondary text-secondary-foreground hover:bg-secondary"
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
        <label className="text-muted-foreground text-sm">Option Size</label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            <div className="bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-xs text-white">
              W
            </div>
          </div>
          <Input
            type="number"
            value={optionSize}
            onChange={(e) => setOptionSize(e.target.value)}
            className="pl-12 py-2 pr-2 border-border"
            step="0.1"
            min="0.1"
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button className="w-full rounded-sm bg-gradient-primary text-black" size="lg">
        Connect Wallet
      </Button>

      {/* Modals */}
      <StrikePriceDialog
        open={showStrikePriceModal}
        onOpenChange={setShowStrikePriceModal}
        onSelectPrice={setStrikePrice}
        currentPrice={strikePrice}
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