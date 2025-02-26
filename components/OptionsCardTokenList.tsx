'use client'

import Image from "next/image";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Search, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { tradingStrategies, TradingStrategy } from "@/lib/data/trading-strategies";
import { AmericanIcon, BermudanIcon, CallIconDark, EuropeanIcon, PutIconDark, TrendUp } from "@/public/svgs/icons";
import { Token, tokens } from "@/lib/data/tokens";
import { cn } from "@/lib/utils";

interface OptionsCardTokenListProps {
    chartToken: string
    chartTokenLogo: string
    type: boolean
    transaction: string
    onTokenSelect: (token: Token) => void
}

export default function OptionsCardTokenList({ chartToken, chartTokenLogo, type, onTokenSelect, transaction }: OptionsCardTokenListProps) {
    const [allTokens, setAllTokens] = useState<Token[]>([])
    const [optionStyle, setOptionStyle] = useState("American")
    const generateTokens = (count: number) :  Token[] => {
        return Array(count).fill(null).map((_, index) => {
            const token = tokens[index % tokens.length]
            return {
                token: token,
                symbol: token.symbol,
                name: token.name,
                logo: token.logo,
                address: token.address
            }
        })
    }

    const [allStrategies, setAllStrategies] = useState<TradingStrategy[]>([])
    const generateStrategies = (count: number) : TradingStrategy[] => {
        return Array(count).fill(null).map((_, index) => {
            const strategy = tradingStrategies[index % tradingStrategies.length]
            return {
                image: strategy.image,
                name: strategy.name,
                type: strategy.type,
                transaction: strategy.transaction
            }
        })
    }

    const [selectedToken, setSelectedToken] = useState<Token | null>(null)
    const [selectedStrategy, setSelectedStrategy] = useState<TradingStrategy | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = (value: Token) => {
        if(selectedToken !== value) {
            setSelectedToken(value)
            onTokenSelect(value)
        }
        setIsOpen(false)
    }

    const handleClickOptions = (value: TradingStrategy) => {
        if(selectedStrategy !== value) {
            setSelectedStrategy(value)
        }
        setIsOpen(false)
    }

    

    useEffect(() => {
        const tokensList = generateTokens(20);
        setAllTokens(tokensList);
        if (!selectedToken && tokensList.length > 0) {
            setSelectedToken(tokensList[0]);
        }
    }, []);

    useEffect(() => {
        const strategyList = generateStrategies(6);
        setAllStrategies(strategyList);
        if(!selectedStrategy && strategyList.length > 0) {
            setSelectedStrategy(strategyList[0])
        }
    }, [])

    const [activeTab, setActiveTab] = useState(type ? 'tokens' : 'options')

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open)
        if (open) {
            setActiveTab(type ? 'tokens' : 'options')
        }
    }

    const reorderedTokens = [...allTokens];
    const chartTokenIndex = reorderedTokens.findIndex(token => `Crypto.${token.symbol}/USD` === chartToken);
    if (chartTokenIndex > 1) {
        const [chartTokenItem] = reorderedTokens.splice(chartTokenIndex, 1);
        reorderedTokens.splice(1, 0, chartTokenItem);
    }

    const [isDropped, setIsDropped] = useState(false)
    console.log(`this is the transaction: ${transaction}`)
    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            {type === true && (
                <div className="flex items-center space-x-2 text-[28px] bg-inherit p-0 w-full h-[52px] shadow-none">
                    <DialogTrigger className="py-2">
                        <div className="flex items-center space-x-2 text-[28px] bg-inherit p-0 w-full h-[52px] shadow-none">
                            {selectedToken && selectedToken.logo ? (
                                <Image src={selectedToken.logo} alt="selected token" height={48} width={48} className="rounded-full"/>
                            ) : null}
                            <h1>{selectedToken ? selectedToken.symbol : "Loading..."}</h1>
                            <ChevronDown className="opacity-50" size={28}/>
                        </div>
                    </DialogTrigger>
                </div>
            )}
            {type === false && (
                <div className="flex items-center space-x-2 text-[28px] bg-inherit p-0 w-full h-[52px] shadow-none">
                    <DialogTrigger className="py-2">
                        <div className="flex items-center space-x-2 py-2 px-0 text-[28px] justify-evenly">
                            <div className="relative">
                                {selectedStrategy?.transaction === 'Call' ? (
                                    <CallIconDark width="48" height="48" />
                                ):(
                                    <PutIconDark width="48" height="48" />
                                )}
                                <div className="absolute left-7 top-8 rounded-[6px]">
                                    <div className="flex">
                                        <Image src={chartTokenLogo} alt="selected token" height={48} width={48} className="rounded-[6px] bg-black w-[18px] h-[18px] bg-background ring ring-background"/>
                                    </div>
                                
                                </div>
                            </div>
                            
                            <span>{selectedStrategy?.transaction}</span>
                            <ChevronDown className="opacity-50" size={28}/>
                        </div>
                    </DialogTrigger>
                </div>
            )}
            
            <DialogContent className="w-full h-full md:max-w-[524px] md:h-auto px-3 py-5 bg-accent gap-0 sm:rounded-[20px] flex flex-col shadow-none">
                <div className="py-0 px-2 w-full flex flex-col space-y-4">
                    <DialogTitle className="p-0 text-base font-medium text-foreground flex justify-between items-center">
                        <span>You&apos;re {transaction === 'sell' ? 'Selling' : 'Buying'}</span>
                        <Button 
                            className="md:hidden p-[9px] bg-secondary rounded-[12px] [&_svg]:size-[18px]"
                            onClick={() => setIsOpen(false)}
                        >
                            <XIcon className="text-foreground"/>
                        </Button>
                    </DialogTitle>
                    <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="p-0 flex gap-3 bg-inherit text-secondary-foreground rounded-[10px]">
                            <TabsTrigger
                                value="tokens"
                                className="w-full py-2 px-5 text-sm rounded-[10px] data-[state=active]:bg-background data-[state=active]:text-foreground"
                            >
                                Tokens
                            </TabsTrigger>
                            <TabsTrigger
                                value="options"
                                className="w-full py-2 px-5 text-sm rounded-[10px] data-[state=active]:bg-background data-[state=active]:text-foreground"
                            >
                                Options
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                <Separator className="my-[14px]"/>
                {activeTab === 'options' && transaction === 'buy' && (
                    <div className="space-y-5 overflow-y-scroll overflow-x-hidden md:overflow-hidden h-full">
                        <div className="w-full h-7 flex justify-between items-center space-x-2">
                            <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                                <ChevronLeft className="w-5 h-5 p-1 text-secondary-foreground"/>
                            </div>
                            <div className="w-full flex justify-center">
                                <Button
                                    className={cn(optionStyle === 'American' ? 'border-b-primary text-primary' : 'border-b-transparent text-secondary-foreground',("w-full px-2 py-1 gap-[6px] border-b  rounded-none bg-inherit shadow-none [&_svg]:size-[10px]"))}
                                    onClick={() => setOptionStyle('American')}
                                >
                                    <span className="text-[11px] font-medium">Vanilla</span>
                                </Button>
                                <Button className="w-full px-2 py-1 gap-[6px] border-b border-b-transparent rounded-none bg-inherit shadow-none text-secondary flex items-center [&_svg]:size-[10px]">
                                    <span className="text-[11px] font-medium">Binary</span>
                                    <span className="w-fit p-1 h-3 border border-primary text-[8px] text-primary flex items-center rounded-[3px]">Coming Soon</span>
                                </Button>
                            </div>
                            <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                                <ChevronRight className="w-5 h-5 p-1 text-secondary-foreground"/>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="w-full space-y-2">
                                <div className="flex space-x-[6px] items-center">
                                    <TrendUp />
                                    <span className="text-[11px] font-medium text-secondary-foreground">Bullish Advanced</span>
                                </div>
                                <div className="grid grid-cols-3 gap-x-[6px] gap-y-[14px]">
                                    {allStrategies.map((strategy, index) => (
                                        <div 
                                            key={index}
                                            onClick={()=>handleClickOptions(strategy)}
                                            className="flex flex-col space-y-[6px] cursor-pointer"
                                        >
                                            <div className="bg-secondary rounded-[10px] border border-transparent hover:border-primary w-fit h-fit flex justify-center items-center">
                                                <Image src={strategy.image} width={1620} height={800} alt={strategy.name} className="w-[162px] h-[80px] rounded-[10px]" />                               
                                            </div>
                                            <div className="flex flex-col space-y-1">
                                                <span className="text-[10px] text-secondary-foreground font-medium">{strategy.name}</span>
                                                <span className="text-[8px] px-1 py-[3px] w-fit rounded-[3px] bg-primary text-background h-3 flex items-center font-semibold">{strategy.type}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {isDropped &&(
                                <>
                                    <Separator className="my-4 hidden md:flex"/>
                                    <div className="w-full space-y-2 pt-5 md:pt-0">
                                        <div className="flex space-x-[6px] items-center">
                                            <TrendUp />
                                            <span className="text-[11px] font-medium text-secondary-foreground">Neutral Advanced</span>
                                        </div>
                                    
                                        <div className="grid grid-cols-3 gap-x-[6px] gap-y-[14px]">
                                            {allStrategies.slice(0, 3).map((strategy, index) => (
                                                <div 
                                                    key={index}
                                                    onClick={()=>handleClickOptions(strategy)}
                                                    className="flex flex-col space-y-[6px] cursor-pointer"
                                                >
                                                    <div className="bg-secondary rounded-[10px] border border-transparent hover:border-primary w-fit h-fit flex justify-center items-center">
                                                        <Image src={strategy.image} width={1620} height={800} alt={strategy.name} className="w-[162px] h-[80px] rounded-[10px]" />                              
                                                    </div>
                                                    <div className="flex flex-col space-y-1">
                                                        <span className="text-[10px] text-secondary-foreground font-medium">{strategy.name}</span>
                                                        <span className="text-[8px] px-1 py-[3px] w-fit rounded-[3px] bg-primary text-background h-3 flex items-center font-semibold">{strategy.type}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                                
                            )}
                            

                        </div>
                        <div className="w-full flex justify-center">
                            <Button
                                className="border bg-inherit text-foreground shadow-none py-2 px-4 rounded-[12px]"
                                onClick={() => setIsDropped(!isDropped)}
                            >
                                {isDropped ? (
                                    <>
                                        <span className="text-xs">Less Strategies</span>
                                        <ChevronUp className="w-3 h-3"/>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-xs">More Strategies</span>
                                        <ChevronDown  className="w-3 h-3"/>
                                    </>
                                )}
                                
                            </Button>
                        </div>
                    </div>
                )}
                {activeTab === 'options' && transaction === 'sell' && (
                    <div className="w-full flex flex-col space-y-[10px]">
                        <div className="w-full flex border rounded-[20px] p-4 pt-3 justify-between">
                            <div className="flex space-x-[10px] items-center">
                                <Image src='/images/ethereum.png' alt="usdc" width={32} height={32} className="rounded-full"/>
                                <div className="flex flex-col space-y-0.5">
                                    <span className="text-xs font-medium h-fit">ETH-19JAN25-97000-P</span>
                                    <span className="text-xs text-secondary-foreground font-normal flex items-center">
                                        Ethereum • Put option • 
                                    <span className="px-1">
                                        <AmericanIcon width="13" height="12"/>
                                    </span>
                                        American
                                </span>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="text-secondary-foreground text-xs font-medium">$152.26</span>
                                <span className="text-secondary-foreground text-xs font-normal">0.809232976 SOL</span>
                            </div>
                        </div>
                        <div className="w-full flex border rounded-[20px] p-4 pt-3 justify-between">
                            <div className="flex space-x-[10px] items-center">
                                <Image src='/images/ethereum.png' alt="usdc" width={32} height={32} className="rounded-full"/>
                                <div className="flex flex-col space-y-0.5">
                                    <span className="text-xs font-medium h-fit">ETH-19JAN25-97000-P</span>
                                    <span className="text-xs text-secondary-foreground font-normal flex items-center">
                                        Ethereum • Put option • 
                                    <span className="px-1">
                                        <AmericanIcon width="13" height="12"/>
                                    </span>
                                        American
                                </span>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="text-secondary-foreground text-xs font-medium">$152.26</span>
                                <span className="text-secondary-foreground text-xs font-normal">0.809232976 SOL</span>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'tokens' && (
                    <>
                        <div className="w-full flex flex-col space-y-4 px-2">
                            <div className="w-full flex flex-col space-y-3">
                                <div className="flex w-full h-fit space-x-2 items-center px-4 py-[10px] rounded-[10px] text-sm text-secondary-foreground bg-secondary">
                                    <Input 
                                        type="text"
                                        placeholder="Search Token"
                                        className="h-fit border-none p-0 shadow-none rounded-none text-foreground placeholder:text-secondary-foreground"
                                    />
                                    <Search size={16} className="w-4 h-4 text-foreground"/>
                                </div>
                                <div className="w-full flex space-x-[10px]">
                                    <div className="w-fit flex items-center p-2 space-x-[6px] bg-secondary rounded-[8px]">
                                        <Image src='/images/usdc.png' alt="usdc" width={16} height={16} className="rounded-full"/>
                                        <span className="text-sm">USDC</span>
                                    </div>
                                    <div className="w-fit flex items-center p-2 space-x-[6px] bg-secondary rounded-[8px]">
                                        <Image src='/images/bitcoin.png' alt="usdc" width={16} height={16} className="rounded-full"/>
                                        <span className="text-sm">BTC</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between text-xs font-normal text-secondary-foreground">
                                <span>All Tokens</span>
                                <span>Balance</span>
                            </div>
                        </div>
                        <ScrollArea className="w-full h-full md:h-[242px]">
                            {reorderedTokens.map((token, index) => (
                                <div 
                                    key={index}
                                    onClick={()=>handleClick(token)}
                                    className="w-full h-fit rounded-[8px] p-2 flex justify-between space-x-4 hover:bg-secondary">
                                    <div className="flex items-center space-x-[6px]">
                                        <Image src={token.logo} alt={token.name} width={28} height={28} className="w-7 h-7 rounded-full" />
                                        <div className="flex flex-col justify-center space-y-0 h-8">
                                            <div className="flex space-x-1 items-center h-fit">
                                                <span className="text-base text-foreground font-medium">{token.symbol}</span>
                                                {(token.symbol === 'USDC' || chartToken === `Crypto.${token.symbol}/USD`) &&(
                                                    <>
                                                        <span className="border border-primary text-primary text-[8px] px-1 py-0.5 rounded-[3px]">Zero Fees</span>
                                                    </>
                                                )}
                                            </div>
                                            <span className="text-xs text-secondary-foreground font-medium">{token.name}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center space-y-0 h-8">
                                        <div className="flex space-x-1 text-sm font-medium text-foreground">
                                            <span>0.346371829</span>
                                            <span>•</span>
                                            <span>$87.29</span>
                                        </div>
                                        <span className="text-xs font-medium text-secondary-foreground text-end">{token.address}</span>
                                    </div>
                                </div>
                            ))}
                        </ScrollArea>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}