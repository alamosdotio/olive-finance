"use client"

import Image from "next/image";
import { ChevronDown, Search } from "lucide-react";
import { Separator } from "./ui/separator";
import { DollarIcon, SortIcon } from "@/public/svgs/icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { formatPrice } from "@/utils/formatter";
import { useState } from "react";
import { cn } from "@/lib/utils";
import TokenList from "./TokenList";

type CryptoData = {
    id: string
    name: string
    symbol: string
    iconPath: string
    pythSymbol: string
    category: {
        crypto: boolean
        memes: boolean
        forex: boolean
        ai: boolean
        metals: boolean
    }
}

type MarketChanges = {
    [key: string]: number | null;
}

interface TradingViewTopNavProps {
    symbol: string | null;
    pythSymbol: string;
    logo: string;
    tokens: CryptoData[];
    marketChanges: MarketChanges;
    onTokenSelect: (token: CryptoData) => void;
    priceData: any;
    marketData: any;
    priceLoading: boolean;
    marketLoading: boolean;
}

export default function TradingViewTopNav({
    symbol, 
    pythSymbol, 
    logo, 
    tokens, 
    marketChanges,
    onTokenSelect,
    priceData,
    marketData,
    priceLoading,
    marketLoading
}: TradingViewTopNavProps) {
    const [active, setActive] = useState<'all' | 'crypto' | 'memes' | 'forex' | 'ai' | 'metals'>('all');

    return (
        <div className="border border-t-0 rounded-b-[14px] p-1 w-full flex h-fit">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="px-2 py-1 flex space-x-2 items-center">
                        <div className="flex space-x-[6px] items-center">
                            <Image src={logo} alt={symbol!} width={18} height={18} className="rounded-full"/>
                            <span className="text-sm text-foreground font-medium">
                                {symbol}/USDC
                            </span>
                        </div>
                        <ChevronDown className="text-secondary-foreground h-3 w-3"/>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[280px] py-2 px-1 bg-accent rounded-[14px] flex flex-col space-y-2" align="start">
                    <div className="w-full px-1 flex flex-col space-y-2">
                        <div className="flex w-full h-fit space-x-2 items-center px-3 py-2 rounded-[10px] text-xs text-secondary-foreground bg-secondary">
                            <Input 
                                type="text"
                                placeholder="Search for a coin"
                                className="h-fit border-none p-0 shadow-none rounded-none text-foreground placeholder:text-secondary-foreground"
                            />
                            <Search size={14} className="w-[14px] h-[14px] text-foreground"/>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <div className="w-full flex justify-between py-[2px] border-b text-xs text-secondary-foreground font-medium">
                                <button className={cn((active === 'all' ? 'text-primary' : ''),"px-1 relative")}
                                    onClick={()=>setActive('all')}
                                >
                                    <span>All</span>
                                    {active === 'all' && (
                                        <div className="absolute -bottom-[3px] left-0 right-0 h-[1px] bg-primary" />
                                    )}
                                </button>
                                <button className={cn((active === 'memes' ? 'text-primary' : ''),"px-1 relative")}
                                    onClick={()=>setActive('memes')}
                                >
                                    <span>Memes</span>
                                    {active === 'memes' && (
                                        <div className="absolute -bottom-[3px] left-0 right-0 h-[1px] bg-primary" />
                                    )}
                                </button>
                                <button className={cn((active === 'forex' ? 'text-primary' : ''),"px-1 relative")}
                                    onClick={()=>setActive('forex')}
                                >
                                    <span>Forex</span>
                                    {active === 'forex' && (
                                        <div className="absolute -bottom-[3px] left-0 right-0 h-[1px] bg-primary" />
                                    )}
                                </button>
                                <button className={cn((active === 'ai' ? 'text-primary' : ''),"px-1 relative")}
                                    onClick={()=>setActive('ai')}
                                >
                                    <span>AI</span>
                                    {active === 'ai' && (
                                        <div className="absolute -bottom-[3px] left-0 right-0 h-[1px] bg-primary" />
                                    )}
                                </button>
                                <button className={cn((active === 'metals' ? 'text-primary' : ''),"px-1 relative")}
                                    onClick={()=>setActive('metals')}
                                >
                                    <span>Metals</span>
                                    {active === 'metals' && (
                                        <div className="absolute -bottom-[3px] left-0 right-0 h-[1px] bg-primary" />
                                    )}
                                </button>
                            </div>
                            <div className="w-full flex gap-4">
                                <div className="w-[120px] flex gap-1 items-center">
                                    <span className="text-xs font-medium">Symbols</span>
                                    <SortIcon />
                                </div>
                                <div className="w-[68px] flex gap-1 items-center">
                                    <span className="text-xs font-medium">Price</span>
                                    <SortIcon />
                                </div>
                                <div className="w-[48px] flex gap-1 items-center">
                                    <span className="text-xs font-medium">24h%</span>
                                    <SortIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col">
                        <TokenList 
                            tokens={tokens} 
                            category={active}
                            marketChanges={marketChanges}
                            onTokenSelect={onTokenSelect}
                        />
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="px-4 py-1">
                <Separator orientation="vertical"/>
            </div>
            <div className="py-1 space-x-[6px] flex items-center">
                <DollarIcon />
                <span className="text-sm font-medium text-foreground">
                    {priceData.price ? formatPrice(priceData.price) : priceLoading}
                </span>
            </div>
            <div className="px-4 py-1">
                <Separator orientation="vertical"/>
            </div>
            <div className="flex flex-col">
                <span className="text-secondary-foreground font-normal text-[10px] h-3">24h high</span>
                <span className="text-foreground text-xs font-medium">${marketData.high24h ? formatPrice(marketData.high24h) : marketLoading}</span>
            </div>
            <div className="px-4 py-1">
                <Separator orientation="vertical"/>
            </div>
            <div className="flex flex-col">
                <span className="text-secondary-foreground font-normal text-[10px] h-3">24h low</span>
                <span className="text-foreground text-xs font-medium">${marketData.low24h ? formatPrice(marketData.low24h) : marketLoading}</span>
            </div>
            <div className="px-4 py-1">
                <Separator orientation="vertical"/>
            </div>
            <div className="flex flex-col">
                <span className="text-secondary-foreground font-normal text-[10px] h-3">24h volume</span>
                <span className="text-foreground text-xs font-medium">$</span>
            </div>
            <div className="px-4 py-1">
                <Separator orientation="vertical"/>
            </div>
            <div className="flex flex-col">
                <span className="text-secondary-foreground font-normal text-[10px] h-3">Open Interest</span>
                <span className="text-foreground text-xs font-medium">$</span>
            </div>
            <div className="px-4 py-1">
                <Separator orientation="vertical"/>
            </div>
            <div className="flex flex-col">
                <span className="text-secondary-foreground font-normal text-[10px] h-3">Available Liquidity</span>
                <span className="text-foreground text-xs font-medium">$</span>
            </div>
        </div>
    )
}