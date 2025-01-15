import Image from "next/image";
import { ChevronDown, Search } from "lucide-react";
import { Separator } from "./ui/separator";
import { DollarIcon, SortIcon } from "@/public/svgs/icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { usePythPrice } from "@/hooks/usePythPrice";
import { formatPrice } from "@/utils/formatter";
import { usePythMarketData } from "@/hooks/usePythMarketData";

interface TradingViewTopNavProps {
    symbol: string | null,
    pythSymbol: string,
    logo: string
}

export default function TradingViewTopNav({symbol, pythSymbol, logo} : TradingViewTopNavProps){
    const {priceData, loading: priceLoading} = usePythPrice(pythSymbol)
    const {marketData, loading} = usePythMarketData(pythSymbol)
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
                <DropdownMenuContent className="w-[242px] py-2 px-1 bg-accent rounded-[14px] flex flex-col space-y-2" align="start">
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
                                <button className="px-1 relative text-primary">
                                    <span>All</span>
                                    <div className="absolute -bottom-[3px] left-0 right-0 h-[1px] bg-primary" />
                                </button>
                                <button className="px-1 relative">
                                    <span>Memes</span>
                                </button>
                                <button className="px-1 relative">
                                    <span>Stables</span>
                                </button>
                                <button className="px-1 relative">
                                    <span>AI</span>
                                </button>
                                <button className="px-1 relative">
                                    <span>Metals</span>
                                </button>
                            </div>
                            <div className="w-full flex gap-4">
                                <div className="w-[96px] flex gap-1 items-center">
                                    <span className="text-xs font-medium">Symbols</span>
                                    <SortIcon />
                                </div>
                                <div className="w-[54px] flex gap-1 items-center">
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
                        <div className="w-full flex gap-4">
                            <div className="w-[96px] flex gap-1 items-center pl-1">
                                <Image src='/images/solana.png' alt="logo" width={24} height={24} className="rounded-full"/>
                                <div className="flex flex-col h-fit justify-center">
                                    <span className="text-sm text-foreground font-medium h-4">SOL</span>
                                    <span className="text-[10px] text-secondary-foreground font-medium h-3">Solana</span>
                                </div>
                            </div>
                            <div className="w-[54px] flex justify-start items-center">
                                <span className="text-xs font-medium text-secondary-foreground">$205.19</span>
                            </div>
                            <div className="w-[48px] flex justify-start gap-0.5 items-center pr-1">
                                <span className="text-background">↑</span>
                                <span className="text-xs font-medium text-green-500">1.20%</span>
                            </div>
                        </div>
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
                <span className="text-foreground text-xs font-medium">${marketData.high24h ? formatPrice(marketData.high24h) : loading}</span>
            </div>
            <div className="px-4 py-1">
                <Separator orientation="vertical"/>
            </div>
            <div className="flex flex-col">
                <span className="text-secondary-foreground font-normal text-[10px] h-3">24h low</span>
                <span className="text-foreground text-xs font-medium">${marketData.low24h ? formatPrice(marketData.low24h) : loading}</span>
            </div>
            <div className="px-4 py-1">
                <Separator orientation="vertical"/>
            </div>
            <div className="flex flex-col">
                <span className="text-secondary-foreground font-normal text-[10px] h-3">24h volume</span>
                <span className="text-foreground text-xs font-medium">$</span>
            </div>
        </div>
    )
}