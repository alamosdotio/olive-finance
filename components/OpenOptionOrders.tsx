import Image from "next/image";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { ArrowDown, ArrowUp, ExpiryIcon, PurchaseDateIcon, PurchasePriceIcon, SizeIcon, StrikePriceIcon } from "@/public/svgs/icons";
import { Button } from "./ui/button";
import { Ban, SquarePen } from "lucide-react";

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
    const [isOpen, setIsOpen] = useState<boolean>(false)
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
                        <span>
                            {limitPrice}
                        </span>
                    </div>
                    
                    <div className="w-full flex items-center justify-between text-sm text-secondary-foreground font-normal">
                        <div className="flex space-x-2 items-center">
                            <StrikePriceIcon />
                            <span>Strike Price:</span>
                        </div>
                        <span>
                            {strikePrice}
                        </span>
                    </div>

                     <div className="w-full flex items-center justify-between text-sm text-secondary-foreground font-normal">
                        <div className="flex space-x-2 items-center">
                            <SizeIcon />
                            <span>Size:</span>
                        </div>
                        <span>
                            {size}
                        </span>
                    </div>

                    <div className="w-full flex items-center justify-between text-sm text-secondary-foreground font-normal">
                        <div className="flex space-x-2 items-center">
                            <ExpiryIcon />
                            <span>Expiry:</span>
                        </div>
                        <span>
                            {expiry}
                        </span>
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
                        {transaction === 'buy' && (
                            <Button className="bg-secondary w-fit h-auto py-[6px] px-[10px] rounded-sm">
                                <SquarePen className="text-secondary-foreground p-0" />
                                <span className="text-sm font-normal text-secondary-foreground p-0">
                                    Edit
                                </span>
                            </Button>
                        )}
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