'use client'

import { ChevronDown, CirclePlus, SquarePen } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import Image from "next/image";
import { tokenList } from "@/lib/data/tokenlist";
import { Input } from "./ui/input";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";


export default function Tpsl (){
    const [isPartial, setIsPartial] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [active, setActive] = useState('tp')
    const [selectedToken, setSelectedToken] = useState("SOL");
    const tokens = tokenList;
    return (
       <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger>
                <SquarePen size={13} className={`hover:text-primary ${isOpen ? 'text-primary' : 'text-foreground'}`}/>
            </PopoverTrigger>
            <PopoverContent align="end" className="flex flex-col space-y-3">
                <div className="w-full flex justify-between gap-5">
                    <div className="w-full flex flex-col justify-center">
                        <h1 className="text-sm">{isPartial ? 'Partial' : 'Full'} TPSL</h1>
                       
                    </div>
                    <div className="w-fit flex gap-2 items-center">
                        <span className={`text-sm ${isPartial ? 'text-secondary-foreground' : 'text-primary'}`}>Full</span>
                        <Switch 
                            checked={isPartial}
                            onCheckedChange={setIsPartial}
                        />
                        <span className={`text-sm ${isPartial ? 'text-primary' : 'text-secondary-foreground'}`}>Partial</span>
                    </div>
                </div>
                {isPartial ? (
                    <div className="flex flex-col space-y-2">
                        <Tabs 
                            value={active}
                            onValueChange={setActive}
                        >
                            <TabsList className="bg-inherit gap-2">
                                <TabsTrigger
                                    value="tp"
                                    asChild
                                >
                                    <Button
                                        variant='outline'
                                        className={`${active === 'tp' ? 'border-primary' : 'border-border'}`}
                                    >
                                        TP
                                    </Button>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="sl"
                                    asChild
                                >
                                    <Button
                                        variant='outline'
                                        className={`${active === 'sl' ? 'border-primary' : 'border-border'}`}
                                    >
                                        SL
                                    </Button>
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <div className="flex-col space-y-2">
                            <Label className="font-normal">
                                Receive in
                            </Label>
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
                            <div className="flex-col space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label className="font-normal">
                                        Size
                                    </Label>
                                    <div className="grid grid-cols-4 gap-1">
                                        <Button
                                            variant={'outline'}
                                            className="text-[8px] w-fit h-fit p-1"
                                        >
                                            25%
                                        </Button>
                                        <Button
                                            variant={'outline'}
                                            className="text-[8px] w-fit h-fit p-1"
                                        >
                                            50%
                                        </Button>
                                        <Button
                                            variant={'outline'}
                                            className="text-[8px] w-fit h-fit p-1"
                                        >
                                            75%
                                        </Button>
                                        <Button
                                            variant={'outline'}
                                            className="text-[8px] w-fit h-fit p-1"
                                        >
                                            100%
                                        </Button>
                                    </div>
                                </div>
                                <Input
                                    type="number"
                                    placeholder={'0.00'}
                                    className="px-2 text-right py-2 rounded-sm h-auto w-full bg-transparent border-border shadow-none"
                                    step="0.1"
                                    min="0.1"
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-col space-y-2">
                        <div className="flex-col space-y-2">
                            <Label className="font-normal">Take Profit Price</Label>
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
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label className="font-normal">Stop Loss Price</Label>
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
                        </div>
                    </div>
                )}
                
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
            </PopoverContent>

       </Popover>
    )
}