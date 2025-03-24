'use client'

import { useState } from "react"
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"

interface Option {
  id: string
  type: 'Call' | 'Put'
  strikePrice: string
  expiration: Date
  size: string
  purchaseDate: Date
  status: 'Active' | 'Expired' | 'Exercised'
}

export default function SellCard() {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  // Simulated options data
  const [options] = useState<Option[]>([
    {
      id: '1',
      type: 'Call',
      strikePrice: '2000',
      expiration: new Date('2024-04-28'),
      size: '0.1',
      purchaseDate: new Date('2024-03-21'),
      status: 'Active'
    },
    {
      id: '2',
      type: 'Put',
      strikePrice: '2200',
      expiration: new Date('2024-05-15'),
      size: '0.2',
      purchaseDate: new Date('2024-03-20'),
      status: 'Active'
    },
    {
      id: '3',
      type: 'Call',
      strikePrice: '1900',
      expiration: new Date('2024-03-20'),
      size: '0.15',
      purchaseDate: new Date('2024-03-01'),
      status: 'Expired'
    }
  ])

  const formatPrice = (price: string) => {
    const num = parseFloat(price)
    return `$${num.toLocaleString()}`
  }

  const getStatusColor = (status: Option['status']) => {
    switch (status) {
      case 'Active':
        return 'text-emerald-500'
      case 'Expired':
        return 'text-red-500'
      case 'Exercised':
        return 'text-blue-500'
      default:
        return ''
    }
  }

  if (selectedOption) {
    return (
      <div className="w-full bg-card rounded-sm rounded-t-none p-6 space-y-6 border border-t-0">
        {/* Token Selection */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-foreground">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedOption(null)}
              className="mr-2 -ml-2 px-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center text-white">W</div>
            <span className="font-semibold">WETH</span>
            <span className="text-sm text-muted-foreground">
              {format(selectedOption.purchaseDate, 'dd MMM yyyy')}
            </span>
          </div>
        </div>

        {/* Trading Direction and Status */}
        <div className="flex items-center space-x-3">
          <div className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md border ${
            selectedOption.type === 'Call'
              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500'
              : 'border-red-500 bg-red-500/10 text-red-500'
          }`}>
            {selectedOption.type === 'Call' ? (
              <>
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Call
              </>
            ) : (
              <>
                <ArrowDownRight className="w-4 h-4 mr-2" />
                Put
              </>
            )}
          </div>
          <div className={`px-4 py-2 rounded-md bg-secondary ${getStatusColor(selectedOption.status)}`}>
            {selectedOption.status}
          </div>
        </div>

        {/* Strike Price */}
        <div className="space-y-2">
          <label className="text-muted-foreground text-sm">Strike price</label>
          <div className="grid grid-cols-1 gap-2">
            <div className="w-full flex items-center px-4 py-2 rounded-sm bg-backgroundSecondary text-primary">
              {formatPrice(selectedOption.strikePrice)}
            </div>
          </div>
        </div>

        {/* Expiration */}
        <div className="space-y-2">
          <label className="text-muted-foreground text-sm">Expiration</label>
          <div className="grid grid-cols-1 gap-2">
            <div className="w-full flex items-center px-4 py-2 rounded-sm bg-backgroundSecondary text-primary">
              {format(selectedOption.expiration, 'dd MMM yyyy')}
            </div>
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
              type="text"
              value={selectedOption.size}
              readOnly
              className="pl-12 py-2 pr-2 border-border text-foreground"
            />
          </div>
        </div>

        {/* Action Buttons */}
        {selectedOption.status === 'Active' && (
          <div className="pt-4">
            <Button className="w-full" size="lg">
              Sell Option
            </Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-full bg-card rounded-sm rounded-t-none p-6 space-y-6 border border-t-0">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your Options</h2>
      </div>

      <ScrollArea className="h-[400px] w-full">
        <div className="space-y-2">
          {options.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              className="w-full h-auto p-4 border-border rounded-sm hover:text-secondary-foreground"
              onClick={() => setSelectedOption(option)}
            >
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {option.type === 'Call' ? (
                    <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                  <span>{option.type}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span>{format(option.expiration, 'MMM dd')}</span>
                  <span className={`font-medium ${getStatusColor(option.status)}`}>
                    {option.status}
                  </span>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>

      {options.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No options found. Start trading to see your options here.
        </div>
      )}
    </div>
  )
}