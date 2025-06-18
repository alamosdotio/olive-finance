import { ExpiryIcon, PositionTypeIcon, PurchasePriceIcon, RedArrowPnl, SizeIcon, StrikePriceIcon, ValueIcon } from "@/public/svgs/icons"
import { Calendar, SquarePen } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Label } from "./ui/label"
import { Calendar as CalendarComponent } from "./ui/calendar"
import { useState } from "react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Input } from "./ui/input"

interface PositionOverviewProps{
    type: string
    expiry: string
    size: number
    pnl: number
    strikePrice: number
}

export default function PositionOverview({type, expiry, size, pnl, strikePrice} : PositionOverviewProps){
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isExpiry, setIsExpiry] = useState(false);
    const [isSize, setIsSize] = useState(false);
    const [isStrike, setIsStrike] = useState(false);
    const [customDate, setCustomDate] = useState<Date>();
    

    return (
        <div className='w-full flex flex-col space-y-1'>
            <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                <div className='flex space-x-2 items-center'>
                    <SizeIcon />
                    <span>Size:</span>
                </div>
                <div className='flex space-x-2 items-center'>
                    <span>{size}</span>
                    <Popover open={isSize} onOpenChange={setIsSize}>
                        <PopoverTrigger asChild>
                            <SquarePen size={13} className="text-foreground hover:text-primary cursor-pointer"/>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="p-3 space-y-4">
                            <div className="space-y-2 flex flex-col">
                                <Label>
                                    New Size
                                </Label>
                                <Input
                                    className="p-2 border-border text-xs rounded-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs">
                                    Pay In
                                </Label>
                                <Input
                                    className="p-2 border-border text-xs rounded-sm"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Button 
                                    variant='outline'
                                    onClick={() => setIsSize(false)}
                                >
                                    Cancel
                                </Button>
                                <Button>Confirm</Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                <div className='flex space-x-2 items-center'>
                    <StrikePriceIcon />
                    <span>Strike Price:</span>
                </div>
                <div className='flex space-x-2 items-center'>
                    <span>{strikePrice}</span>
                    <Popover open={isStrike} onOpenChange={setIsStrike}>
                        <PopoverTrigger asChild>
                            <SquarePen size={13} className="text-foreground hover:text-primary cursor-pointer"/>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="p-3 space-y-4">
                            <div className="space-y-2 flex flex-col">
                                <Label className="text-xs">
                                    New Strike Price
                                </Label>
                                <Input
                                    className="p-2 border-border text-xs rounded-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs">
                                    Pay In
                                </Label>
                                <Input
                                    className="p-2 border-border text-xs rounded-sm"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Button 
                                    variant='outline'
                                    onClick={() => setIsStrike(false)}
                                >
                                    Cancel
                                </Button>
                                <Button>Confirm</Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                <div className='flex space-x-2 items-center'>
                    <ExpiryIcon />
                    <span>Expiry:</span>
                </div>
                <div className='flex space-x-2 items-center'>
                    <span>{expiry}</span>
                    <Popover open={isExpiry} onOpenChange={setIsExpiry}>
                        <PopoverTrigger asChild>
                            <SquarePen size={13} className="text-foreground hover:text-primary cursor-pointer"/>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="p-3 space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs">
                                    New Expiration
                                </Label>
                                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                            "w-full justify-start text-left text-xs font-normal hover:bg-inherit hover:text-secondary-foreground border-border p-2 [&_svg]:size-3",
                                            !customDate && "text-muted-foreground"
                                            )}
                                        >
                                            <Calendar className="h-3 w-3" />
                                            {customDate ? format(customDate, "PPP") : "Pick a date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent
                                        mode="single"
                                        selected={customDate}
                                        onSelect={(date) => {
                                            setCustomDate(date)
                                            setIsCalendarOpen(false)
                                        }}
                                        initialFocus
                                        disabled={(date) => date < new Date()}
                                    />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs">
                                    Pay In
                                </Label>
                                <Input
                                    className="p-2 border-border text-xs rounded-sm"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Button 
                                    variant='outline'
                                    onClick={() => setIsExpiry(false)}
                                >
                                    Cancel
                                </Button>
                                <Button>Confirm</Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                    
                </div>
                
            </div>
            
            
            <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                <div className='flex space-x-2 items-center'>
                    <PurchasePriceIcon />
                    <span>Purchase Price:</span>
                </div>
                <span>value</span>
            </div>

            <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                <div className='flex space-x-2 items-center'>
                    <ValueIcon />
                    <span>Current Price:</span>
                </div>
                <span>value</span>
            </div>


            <div className='w-full flex justify-between text-sm text-[#FF6889] font-normal'>
                <div className='flex space-x-2 items-center'>
                    <RedArrowPnl />
                    <span>P&L:</span>
                </div>
                <span>{pnl}</span>
            </div>
        </div>
    )
}