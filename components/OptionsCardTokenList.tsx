'use client'

import Image from "next/image";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { tokens, Token } from "@/lib/data/tokens";
import { Badge } from "./ui/badge";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { tradingStrategies, TradingStrategy } from "@/lib/data/trading-strategies";
import { AmericanIcon, BermudanIcon, EuropeanIcon } from "@/public/svgs/icons";




interface OptionsCardTokenListProps{
    chartToken: string
}


export default function OptionsCardTokenList({chartToken} : OptionsCardTokenListProps){
    const [allTokens, setAllTokens] = useState<Token[]>([])
    const generateTokens = (count: number) :  Token[] =>{
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
                type: strategy.type
            }
        })
    }

    const [selectedToken, setSelectedToken] = useState<Token | null>(null)
    const [selectedStrategy, setSelectedStrategy] = useState<TradingStrategy | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = (value: Token) =>{
        if(selectedToken !== value){
            setSelectedToken(value)
            setIsOpen(false)
        }
    }

    useEffect(() => {
        const tokensList = generateTokens(19);
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

    const [active, setActiveTab] = useState<string>('tokens')

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            
            <DialogContent className="max-w-[420px] px-3 py-5 bg-accent gap-0 sm:rounded-[20px]">
                <div className="py-0 px-2 w-full flex flex-col space-y-4">
                    <DialogTitle className="p-0 text-base font-medium text-foreground">You&apos;re Selling</DialogTitle>
                    <Tabs>
                        <TabsList className="p-0 flex gap-3 bg-inherit text-secondary-foreground rounded-[10px]">
                            <TabsTrigger
                                value="tokens"
                                className="w-full py-2 px-5 text-sm rounded-[10px] data-[state=active]:bg-background data-[state=active]:text-foreground"
                                onClick={() => setActiveTab('tokens')}
                            >
                                Tokens
                            </TabsTrigger>
                            <TabsTrigger
                                value="options"
                                className="w-full py-2 px-5 text-sm rounded-[10px] data-[state=active]:bg-background data-[state=active]:text-foreground"
                                onClick={() => setActiveTab('options')}
                            >
                                Options
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                <Separator className="my-[14px]"/>
                {active === 'options' && (
                    <div className="space-y-5">
                        <div className="flex justify-between items-center">
                            <ChevronLeft className="w-7 h-7 text-secondary-foreground"/>
                            <div className="w-full flex justify-center gap-1 px-4">
                                <Button className="w-full px-2 py-1 border-b border-b-primary rounded-none bg-inherit shadow-none text-secondary-foreground">
                                    <AmericanIcon /> 
                                    <span className="text-xs font-medium text-primary">American</span>
                                </Button>
                                <Button className="w-full px-2 py-1 border-b border-b-transparent rounded-none bg-inherit shadow-none text-secondary-foreground">
                                    <EuropeanIcon />
                                    <span className="text-xs font-medium">European</span>
                                </Button>
                                <Button className="w-full px-2 py-1 border-b border-b-transparent rounded-none bg-inherit shadow-none text-secondary-foreground">
                                    <BermudanIcon />
                                    <span className="text-xs font-medium">Bermudan</span>
                                </Button>
                            </div>
                            <ChevronRight className="w-7 h-7 text-secondary-foreground"/>
                        </div>
                        <div className="grid grid-cols-3 gap-x-[6px] gap-y-[14px]">
                            {allStrategies.map((strategy, index) => (
                                <div key={index} className="flex flex-col space-y-[6px] cursor-pointer">
                                    <div className="">
                                        <Image src={strategy.image} width={1280} height={800} alt={strategy.name} className="w-[128px] h-[80px] border border-transparent hover:border-primary rounded-[10px]"/>
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <span className="text-[10px] text-secondary-foreground font-medium">{strategy.name}</span>
                                        <span className="text-[8px] px-1 py-[3px] w-fit rounded-[3px] bg-primary text-background h-3 flex items-center font-semibold">{strategy.type}</span>
                                    </div>
                                    
                                </div>
                            ))}
                        </div>
                        <div className="w-full flex justify-center">
                            <Button
                                className="border bg-inherit text-foreground shadow-none py-2 px-4 rounded-[12px]"
                            >
                                <span className="text-xs">More Strategies</span>
                                <ChevronDown className="w-3 h-3"/>
                            </Button>
                        </div>
                    </div>
                )}
                {active === 'tokens' && (
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
                        <ScrollArea className="w-full h-[242px]">
                            {allTokens.map((token, index) => (
                                <div key={index} className="w-full h-fit rounded-[8px] p-2 flex justify-between space-x-4 hover:bg-secondary">
                                    <div className="flex items-center space-x-[6px]">
                                        <Image src={token.logo} alt={token.name} width={28} height={28} className="w-7 h-7 rounded-full" />
                                        <div className="flex flex-col justify-center space-y-0 h-8">
                                            <div className="flex space-x-1 items-center h-fit">
                                                <span className="text-base text-foreground font-medium">{token.symbol}</span>
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
                
                
                {/* <div className="flex flex-col space-y-6 justify-between">
                    <div className="w-full flex flex-col space-y-6 h-auto">
                        <DialogTitle className="p-0">
                            Tokens
                        </DialogTitle>
                        <div className="flex w-full h-fit space-x-2 items-center px-[10px] py-[6px] border rounded-[10px] text-secondary-foreground">
                            <Search size={20} className="w-5 h-5"/>
                            <Input 
                                type="text"
                                placeholder="Search"
                                className="h-full border-none p-0 shadow-none rounded-none placeholder:text-secondary-foreground"
                            />
                        </div>
                    </div>
                    <ScrollArea className="w-full h-[500px]">
                        <div className="space-y-3 h-full flex flex-col pr-1.5">
                            {allTokens.map((token, index) => (
                                <Button 
                                    key={index}
                                    onClick={()=>handleClick(token)}
                                    className="flex w-full shadow-none justify-start space-x-2 pr-1 pl-1 py-6 bg-inherit text-foreground hover:bg-backgroundSecondary"
                                >
                                    <div className="flex items-center">
                                        <Image src={token.logo} alt={token.name} height={36} width={36} className="rounded-full bg-inherit"/>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <div className="flex flex-col space-y-0 items-start">
                                            <div className="flex space-x-1.5 items-center">
                                                <h3 className="text-sm">{token.symbol}</h3>
                                                {(chartToken === `Crypto.${token.symbol}/USD` || token.symbol === 'USDC') &&(
                                                    <Badge variant="outline" className="p-0 px-1 h-4 text-[8px]">Zero Fees</Badge>
                                                )}
                                            </div>
                                            <span className="text-xs">{token.name}</span>
                                        </div>
                                        <div className="flex flex-col space-y-0">
                                            <h3 className="text-sm text-end">0</h3>
                                            <span className="text-xs">EPjFWd...yTDt1v</span>
                                        </div>
                                    </div>
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>
                </div> */}
            </DialogContent>
        </Dialog>
    )
}