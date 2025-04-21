'use client'

import { Search, Plus, Calendar } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, addWeeks, addMonths, isSameDay } from "date-fns"
import { cn } from "@/lib/utils"
import { useState } from 'react'
import { ScrollArea } from './ui/scroll-area'

interface ExpirationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectExpiration: (date: Date) => void
  currentExpiration: Date
}

interface Expiration {
  period: string
  date: Date
  liquidity: string
}

export function ExpirationDialog({ open, onOpenChange, onSelectExpiration, currentExpiration }: ExpirationDialogProps) {
  const [searchExpiration, setSearchExpiration] = useState('')
  const [showCustomExpiration, setShowCustomExpiration] = useState(false)
  const [customDate, setCustomDate] = useState<Date>()

  const today = new Date()
  const allExpirations: Expiration[] = [
    { period: '1 week', date: addWeeks(today, 1), liquidity: '384.2K' },
    { period: '2 weeks', date: addWeeks(today, 2), liquidity: '384.2K' },
    { period: '3 weeks', date: addWeeks(today, 3), liquidity: '384.2K' },
    { period: '1 month', date: addMonths(today, 1), liquidity: '384.2K' },
    { period: '2 months', date: addMonths(today, 2), liquidity: '384.2K' },
    { period: '3 months', date: addMonths(today, 3), liquidity: '384.2K' },
  ]

  const filteredExpirations = allExpirations.filter(exp => 
    exp.period.toLowerCase().includes(searchExpiration.toLowerCase()) ||
    format(exp.date, 'dd MMM').toLowerCase().includes(searchExpiration.toLowerCase())
  )

  const handleCustomExpirationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (customDate) {
      onSelectExpiration(customDate)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select expiration</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={searchExpiration}
              onChange={(e) => setSearchExpiration(e.target.value)}
              placeholder="Search for expiration"
              className="pl-10 py-2 pr-2 rounded-sm border-border placeholder:text-muted focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground px-2">
              <span>Expiration</span>
              <span>Liquidity</span>
            </div>
            <ScrollArea className="h-[250px]">
              <div className='space-y-2'>
              {filteredExpirations.map((exp) => (
                <Button
                  key={exp.period}
                  onClick={() => {
                    onSelectExpiration(exp.date)
                    onOpenChange(false)
                  }}
                  className={`w-full justify-between h-auto py-3 ${
                    isSameDay(currentExpiration, exp.date)
                    ? 'bg-primary hover:bg-gradient-primary text-backgroundSecondary'
                    : 'bg-backgroundSecondary text-secondary-foreground hover:bg-secondary'
                  }`}
                >
                  <div className="flex flex-col items-start">
                    <span>{exp.period}</span>
                    <span className="text-sm opacity-80">{format(exp.date, 'dd MMM')}</span>
                  </div>
                  <span className="text-sm opacity-80">${exp.liquidity}</span>
                </Button>
              ))}
              </div>
            </ScrollArea>
          </div>

          <div className="pt-4 border-t">
            {!showCustomExpiration ? (
              <Button
                onClick={() => setShowCustomExpiration(true)}
                className="w-full bg-inherit border py-5 px-4 text-primary hover:border-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Set custom expiration
              </Button>
            ) : (
              <form onSubmit={handleCustomExpirationSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm">Select custom expiration date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal hover:bg-inherit hover:text-secondary-foreground border-border",
                          !customDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {customDate ? format(customDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={customDate}
                        onSelect={setCustomDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Button type="submit" className="w-full bg-inherit border py-5 px-4 text-primary hover:border-primary" disabled={!customDate}>
                  Set Custom Expiration
                </Button>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}