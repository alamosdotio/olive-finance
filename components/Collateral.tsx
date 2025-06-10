'use client'

import { ChevronDown, SquarePen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import Image from "next/image";
import { tokenList } from "@/lib/data/tokenlist";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Collateral(){
    const tokens = tokenList;
    const [selectedToken, setSelectedToken] = useState("SOL");
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger>
                <SquarePen size={13} className={`hover:text-primary ${isOpen ? 'text-primary' : 'text-foreground'}`}/>
            </PopoverTrigger>
            <PopoverContent align="end">
                <Tabs defaultValue="deposit">
                    <TabsList className="bg-inherit gap-2">
                        <TabsTrigger
                            value="deposit"
                            className="p-0"
                        >
                            Deposit
                        </TabsTrigger>
                        <TabsTrigger
                            value="withdraw"
                            className="p-0"
                        >
                            Withdraw
                        </TabsTrigger>
                    </TabsList>
                    {['deposit','withdraw'].map((tab) => (
                        <TabsContent
                            key={tab}
                            value={tab}
                            className="w-full flex flex-col space-y-2 mt-0"
                        >
                            <div className="relative w-full">
                                <Select defaultValue="SOL" onValueChange={(value) => setSelectedToken(value)}>
                                    <SelectTrigger className="w-fit p-1 bg-backgroundSecondary absolute left-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                                            {tokens.map((token,idx) => 
                                                token.symbol === selectedToken && (
                                                    <div
                                                        key={idx}  
                                                        className="flex space-x-1"
                                                    >
                                                        <Image
                                                            src={token.iconPath}
                                                            alt={token.name}
                                                            width={20}
                                                            height={20}
                                                            className="rounded-full w-5 h-5"
                                                        />
                                                        <span className="text-secondary-foreground text-sm">{token.symbol}</span>
                                                    </div>
                                                    
                                            ))}
                                            <ChevronDown size={14} className="text-secondary-foreground"/>
                                    </SelectTrigger>
                                    <SelectContent className="min-w-fit">
                                        {tokens.map((token, idx) => (
                                            <SelectItem key={idx} value={token.symbol}>
                                                <div className="flex space-x-2">
                                                    <Image 
                                                        src={token.iconPath}
                                                        alt={token.name}
                                                        width={20}
                                                        height={20}
                                                        className="rounded-full w-6 h-6"
                                                    />
                                                    <p>{token.symbol}</p>
                                                </div>
                                                
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Input
                                    type="number"
                                    placeholder={'0.00'}
                                    className="px-2 text-right py-2 rounded-sm h-auto w-full bg-transparent border-border shadow-none"
                                    step="0.1"
                                    min="0.1"
                                />
                            </div>
                            <div className="w-full flex justify-between text-sm">
                                <span>
                                    Leverage
                                </span>
                                <span>
                                    xx
                                </span>
                            </div>
                            <div className="w-full flex justify-between text-sm">
                                <span>
                                    Liq. Price
                                </span>
                                <span>
                                    xx
                                </span>
                            </div>
                            <div className="w-full flex justify-between text-sm">
                                <span>
                                    Collateral
                                </span>
                                <span>
                                    xx
                                </span>
                            </div>
                            <div className="w-full flex justify-between text-sm">
                                <span>
                                    Borrow Fees Due
                                </span>
                                <span>
                                    xx
                                </span>
                            </div>
                            <div className="w-full flex justify-between text-sm">
                                <span>
                                    Transaction Fee
                                </span>
                                <span>
                                    xx
                                </span>
                            </div>
                            <div className="w-full flex justify-between text-sm gap-2">
                                <Button
                                    variant={'outline'}
                                    className="w-full"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Dismiss
                                </Button>
                                <Button 
                                    className="w-full bg-primary/70 hover:bg-primary text-black disabled:cursor-not-allowed"
                                    onClick={() => setIsOpen(false)}
                                    disabled
                                    
                                >
                                    Confirm
                                </Button>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </PopoverContent>
        </Popover>
    )
}