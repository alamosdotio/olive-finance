import Image from "next/image";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { ArrowDown, ArrowUp, ExpiryIcon, PurchaseDateIcon, PurchasePriceIcon, SizeIcon, StrikePriceIcon } from "@/public/svgs/icons";
import { Button } from "./ui/button";
import { Ban, Calendar, SquarePen } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface OpenOptionOrdersProps{
    token: string
    logo: string
    symbol: string
    type: string
    transaction: string
    limitPrice: number
    strikePrice: number
    expiry: string
    orderDate: string
    size: number
}

export default function OpenOptionOrders({logo, token, symbol, type, transaction, limitPrice, strikePrice, expiry, orderDate, size} : OpenOptionOrdersProps){
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLimit, setIsLimit] = useState<boolean>(false);
    const [isStrike, setIsStrike] = useState<boolean>(false);
    const [isSize, setIsSize] = useState<boolean>(false);

    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isExpiry, setIsExpiry] = useState(false);
    const [customDate, setCustomDate] = useState<Date>();

    return (
        <div className="w-full flex-col bg-accent rounded-sm">
            <div
                className="w-full px-4 py-3 flex justify-between items-center cursor-pointer"
                onClick={()=>setIsOpen(!isOpen)}
            >
                <div className="flex space-x-[6px] items-center ">
                    <Image src={logo} alt={token} width={16} height={16} className="w-4 h-4 rounded-full"/>
                    <span className="text-sm text-foreground font-medium">{symbol}</span>
                    <Badge className="text-[8px] bg-gradient-primary border-none text-black font-semibold py-[1px] px-1 w-fit h-fit rounded-[3px] flex items-center justify-center">{type}</Badge>
                    <Badge className={`${transaction === 'buy' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'} text-[8px] font-semibold py-[1px] px-1 w-fit h-fit rounded-[3px] flex items-center justify-center`}>
                        {transaction.charAt(0).toUpperCase() + transaction.slice(1).toLowerCase()}
                    </Badge>
                </div>
                {isOpen ? (
                    <span className='text-secondary-foreground'>
                        <ArrowUp />
                    </span>
                    
                ) : (
                    <span className='text-secondary-foreground'>
                        <ArrowDown />
                    </span>
                    
                )}
            </div>
            {isOpen && (
                <div className="px-4 py-4 space-y-2 w-full border-t">
                    <div className="w-full flex items-center justify-between text-sm text-secondary-foreground font-normal">
                        <div className="flex space-x-2 items-center">
                            <PurchasePriceIcon />
                            <span>Limit Price</span>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <span>
                                {limitPrice}
                            </span>
                            {transaction === 'buy' &&(
                                <Popover open={isLimit} onOpenChange={setIsLimit}>
                                    <PopoverTrigger asChild>
                                        <SquarePen size={13} className="text-foreground hover:text-primary cursor-pointer"/>
                                    </PopoverTrigger>
                                    <PopoverContent align="end" className="p-3 space-y-4">
                                        <div className="space-y-2 flex flex-col">
                                            <Label>
                                                New Limit Price
                                            </Label>
                                            <Input
                                                className="p-2 border-border text-xs rounded-sm"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Button 
                                                variant='outline'
                                                onClick={() => setIsLimit(false)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button>Confirm</Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )}
                        </div>
                    </div>
                    
                    <div className="w-full flex items-center justify-between text-sm text-secondary-foreground font-normal">
                        <div className="flex space-x-2 items-center">
                            <StrikePriceIcon />
                            <span>Strike Price:</span>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <span>
                                {strikePrice}
                            </span>
                            {transaction === 'buy' &&(
                                <Popover open={isStrike} onOpenChange={setIsStrike}>
                                    <PopoverTrigger asChild>
                                        <SquarePen size={13} className="text-foreground hover:text-primary cursor-pointer"/>
                                    </PopoverTrigger>
                                    <PopoverContent align="end" className="p-3 space-y-4">
                                        <div className="space-y-2 flex flex-col">
                                            <Label>
                                                New Strike Price
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
                            )}
                        </div>
                        
                    </div>

                     <div className="w-full flex items-center justify-between text-sm text-secondary-foreground font-normal">
                        <div className="flex space-x-2 items-center">
                            <SizeIcon />
                            <span>Size:</span>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <span>
                                {size}
                            </span>
                            {transaction === 'buy' &&(
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
                            )}
                        </div>
                        
                    </div>

                    <div className="w-full flex items-center justify-between text-sm text-secondary-foreground font-normal">
                        <div className="flex space-x-2 items-center">
                            <ExpiryIcon />
                            <span>Expiry:</span>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <span>
                                {expiry}
                            </span>
                            {transaction === 'buy' &&(
                                <Popover open={isExpiry} onOpenChange={setIsExpiry}>
                                    <PopoverTrigger asChild>
                                        <SquarePen size={13} className="text-foreground hover:text-primary cursor-pointer"/>
                                    </PopoverTrigger>
                                    <PopoverContent align="end" className="p-3 space-y-4">
                                        <div className="space-y-2">
                                            <Label className="text-xs">
                                                New Expiry
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
                            )}
                            
                        </div>
                        
                    </div>

                    <div className="w-full flex items-center justify-between text-sm text-secondary-foreground font-normal">
                        <div className="flex space-x-2 items-center">
                            <PurchaseDateIcon />
                            <span>Date Order Placed:</span>
                        </div>
                        <span>
                            {orderDate}
                        </span>
                    </div>

                    <div className="w-full flex justify-end gap-2">
                        
                        <Button className="bg-secondary w-fit h-auto py-[6px] px-[10px] rounded-sm">
                            <Ban className="text-secondary-foreground p-0" />
                            <span className="text-sm font-normal text-secondary-foreground p-0">
                                Cancel
                            </span>
                        </Button>
                    </div>

                    
                </div>
            )}
        </div>
    )
}