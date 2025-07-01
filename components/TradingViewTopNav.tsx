"use client"

import Image from "next/image";
import { ChevronDown, Diff, Search, TableColumnsSplit } from "lucide-react";
import { Separator } from "./ui/separator";
import { PythIcon, SortIcon } from "@/public/svgs/icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { formatPrice } from "@/utils/formatter";
import { useState } from "react";
import { cn } from "@/lib/utils";
import TokenList from "./TokenList";
import MarketDetails from "./MarketDetails";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { HoverCard, HoverCardContent } from "./ui/hover-card";
import { HoverCardTrigger } from "@radix-ui/react-hover-card";
import { Progress } from "./ui/progress";
import CircularProgressBar from "./ui/circular-progress-bar";
import { RatioBar } from "./RatioBar";


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
        commodities: boolean;
        equities: boolean;
        fixed: boolean;
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
    type: string
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
    marketLoading,
    type,
}: TradingViewTopNavProps) {
    const [active, setActive] = useState<'all' | 'crypto' | 'memes' | 'forex' | 'ai' | 'metals' | 'commodities' | 'equities' | 'fixed'>('all');
    const router = useRouter();
    const [query, setQuery] = useState("")

    return (
        <div className="border border-t-0 rounded-b-sm py-1 w-full flex h-fit">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="px-2 py-1 flex space-x-6 lg:space-x-2 items-center cursor-pointer group">
                        <div className="flex space-x-[6px] items-center">
                            <Image src={logo} alt={symbol!} width={18} height={18} className="rounded-full"/>
                            <span className="text-sm text-foreground font-medium hover:text-primary group-hover:text-primary">
                                {symbol}/USDC
                            </span>
                        </div>
                        <ChevronDown className="text-secondary-foreground h-3 w-3"/>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-fit py-2 px-1 bg-accent rounded-sm flex flex-col space-y-2" align="start">
                    <div className="w-full px-1 flex flex-col space-y-2">
                        <div className="flex w-full h-fit space-x-2 items-center px-3 py-2 rounded-sm text-xs text-secondary-foreground bg-secondary">
                            <Input 
                                type="text"
                                name="query"
                                placeholder="Search for a coin"
                                className="h-fit border-none p-0 shadow-none rounded-none text-foreground placeholder:text-secondary-foreground"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
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
                                <button className={cn((active === 'commodities' ? 'text-primary' : ''),"px-1 relative")}
                                    onClick={()=>setActive('commodities')}
                                >
                                    <span>Commodities</span>
                                    {active === 'commodities' && (
                                        <div className="absolute -bottom-[3px] left-0 right-0 h-[1px] bg-primary" />
                                    )}
                                </button>
                                <button className={cn((active === 'equities' ? 'text-primary' : ''),"px-1 relative")}
                                    onClick={()=>setActive('equities')}
                                >
                                    <span>Equities</span>
                                    {active === 'equities' && (
                                        <div className="absolute -bottom-[3px] left-0 right-0 h-[1px] bg-primary" />
                                    )}
                                </button>
                                <button className={cn((active === 'fixed' ? 'text-primary' : ''),"px-1 relative")}
                                    onClick={()=>setActive('fixed')}
                                >
                                    <span>Fixed Income</span>
                                    {active === 'fixed' && (
                                        <div className="absolute -bottom-[3px] left-0 right-0 h-[1px] bg-primary" />
                                    )}
                                </button>
                            </div>
                            <div className="w-full grid grid-cols-3 gap-4">
                                <div className="flex gap-1 items-center">
                                    <span className="text-xs font-medium">Symbols</span>
                                    <SortIcon />
                                </div>
                                <div className="flex gap-1 items-center">
                                    <span className="text-xs font-medium">Price</span>
                                    <SortIcon />
                                </div>
                                <div className="flex gap-1 items-center">
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
                            query={query}
                        />
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
                <div className={`${type==='futures' ? 'hidden' : 'hidden'}`}>
                    <div className="px-4 py-1">
                        <Separator orientation="vertical"/>
                    </div>
                    <div className="py-1 flex items-center">
                        <Button className={`bg-inherit p-0 w-fit h-fit gap-[6px] flex items-center ${type === 'options' ? 'text-foreground hover:text-primary' : 'text-primary hover:text-foreground'}`}
                            onClick={() => router.push(`${type === 'options' ? '/options-chain' : '/'}`)}
                        >
                            <TableColumnsSplit />
                            <span className="text-sm font-medium hidden md:flex">Options Chain</span>
                        </Button>
                    </div>
                </div>
            <div className="hidden lg:flex">
                <div className="hidden md:flex px-4 py-1">
                    <Separator orientation="vertical"/>
                </div>
                <HoverCard>
                    <HoverCardTrigger asChild>
                         <div className="hidden md:flex flex-col cursor-pointer">
                            <span className="text-secondary-foreground font-normal text-[10px] h-3">Oracle Price</span>
                            <div className="flex space-x-0.5">
                                <span>
                                    <PythIcon />
                                </span>
                                <span className="text-foreground text-xs font-medium">{priceData.price ? formatPrice(priceData.price) : priceLoading}</span>
                            </div>
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent align="start" className="w-fit flex flex-col bg-accent rounded-sm justify-center p-2 space-y-4">
                        <div className="text-xs flex flex-col text-foreground gap-2">
                            <div className="flex flex-col">
                                <span>
                                    The current Oracle Price of the selected asset
                                </span>
                                <span>
                                    ({symbol}).
                                </span>
                            </div>
                            
                            <span className="flex items-center gap-1">
                                {priceData.price ? formatPrice(priceData.price) : priceLoading}
                                <Diff size={12}/>

                            </span>
                        </div>
                        <div className="text-xs flex flex-col text-foreground">
                            <span>
                                Oracle Provide by <a className="text-primary" href="">Pyth</a>.
                            </span>
                            <span>
                                Last Pull: 6 slots ago
                            </span>
                        </div>
                    </HoverCardContent>
                </HoverCard>
               
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
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <div className="flex flex-col flex-grow space-y-1.5 justify-start cursor-pointer"> 
                            <span className="text-secondary-foreground font-normal text-[10px] h-3">SOL Utilization</span>
                            <Progress value={66} className="h-1"/>
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent align="center" className="flex flex-col justify-center bg-accent p-2 rounded-sm gap-2">
                        <div className="flex justify-center ">
                            <CircularProgressBar />
                        </div>
                        <div>
                            <div className="flex justify-between text-secondary-foreground font-normal text-xs">
                                <span>Call Open Interests</span>
                                <span className="text-foreground">XXX</span>
                            </div>
                            <div className="flex justify-between text-secondary-foreground font-normal text-xs">
                                <span>Call Available Liquidity</span>
                                <span className="text-foreground">XXX</span>
                            </div>
                            <div className="flex justify-between text-secondary-foreground font-normal text-xs">
                                <span>Call Intereset Rate</span>
                                <span className="text-foreground">XXX</span>
                            </div>
                            <div className="flex justify-between text-secondary-foreground font-normal text-xs">
                                <span>Call Volatility</span>
                                <span className="text-foreground">XXX</span>
                            </div>                    
                        </div>
                    </HoverCardContent>
                </HoverCard>
                <div className="px-4 py-1">
                    <Separator orientation="vertical"/>
                </div>
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <div className="flex flex-col flex-grow space-y-1.5 justify-start cursor-pointer"> 
                            <span className="text-secondary-foreground font-normal text-[10px] h-3">USDC Utilization</span>
                            <Progress value={66} className="h-1"/>
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent align="center" className="flex flex-col bg-accent justify-center p-2 rounded-sm gap-2">
                        <div className="flex justify-center">
                            <CircularProgressBar />
                        </div>
                        <div>
                            <div className="flex justify-between text-secondary-foreground font-normal text-xs">
                                <span>Put Open Interests</span>
                                <span className="text-foreground">XXX</span>
                            </div>
                            <div className="flex justify-between text-secondary-foreground font-normal text-xs">
                                <span>Put Available Liquidity</span>
                                <span className="text-foreground">XXX</span>
                            </div>
                            <div className="flex justify-between text-secondary-foreground font-normal text-xs">
                                <span>Put Intereset Rate</span>
                                <span className="text-foreground">XXX</span>
                            </div>
                            <div className="flex justify-between text-secondary-foreground font-normal text-xs">
                                <span>Put Volatility</span>
                                <span className="text-foreground">XXX</span>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
                <div className="px-4 py-1">
                    <Separator orientation="vertical"/>
                </div>
                {/* <div className="flex lg:w-56 xl:w-80 space-x-3 items-center">
                    <span className="text-xs">
                        Call
                    </span>
                    <RatioBar 
                        symbol={symbol!}
                        leftPercentage={60}
                        rightPercentage={40}
                    />
                    <span className="text-xs">
                        Put
                    </span>
                </div>
                <div className="px-4 py-1">
                    <Separator orientation="vertical"/>
                </div> */}
                <div className="flex gap-1">
                    <div className="flex flex-col items-center bg-green-500/10 px-2 rounded-sm">
                        <span className="text-green-500 font-normal text-[10px] h-3">Call</span>
                        <span className="text-green-500 text-xs font-medium">6</span>
                    </div>
                    <div className="flex flex-col bg-red-500/10 px-2 rounded-sm items-center">
                        <span className="text-red-500 font-normal text-[10px] h-3">Put</span>
                        <span className="text-red-500 text-xs font-medium">4</span>
                    </div>
                </div>
                <div className="px-4 py-1">
                    <Separator orientation="vertical"/>
                </div>
            </div>
            <div className="flex justify-end w-full px-2 lg:hidden">
                <MarketDetails logo={logo} symbol={symbol!} tokenPrice={priceData.price} high={marketData.high24h} low={marketData.low24h}/>
            </div>
        </div>
    )
}