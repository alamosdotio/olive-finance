'use client'
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

import usdc from '@/public/images/usdc.png'
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ChevronDown, Search } from "lucide-react";
import { ChartStrategy } from "@/public/svgs/icons";


interface EarnSidebarProps {
    name: string;
    symbol: string;
    logo: string;
    apy: number;
    apr: number;
}


export default function EarnSidebar({name, symbol, logo, apy, apr} : EarnSidebarProps){
    const poolData = [
        {
            img: logo,
            symbol: symbol,
            name: name,
            poolSize: '$802,350,386.79',
            current_weightage: '46.27%',
            target_weightage: '47%',
            utilization: '78.19%'
        },
        {
            img: usdc,
            symbol: 'USDC',
            name: 'USD Coin',
            poolSize: '$16,321,098,765',
            current_weightage: '9.9%',
            target_weightage: '10%',
            utilization: '52.18%'
        },
    ]
    const [activeTab, setActiveTab] = useState<string>('mint');
    const [isOpen, setIsOpen] = useState(false)
    const [selectedToken, setSelectedToken] = useState<number>(0);
    const [isApr, setIsApr] = useState<boolean>(false)

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open)
    }

    const handleClickToken = (value: number) =>{
        if(selectedToken!==value){
            setSelectedToken(value)
        }
        setIsOpen(false)
    }
    
    return (
        <SheetContent className="space-y-6 sm:w-[720px] rounded-l-[26px] bg-accent">
            <SheetHeader>
                <SheetTitle className="text-2xl flex justify-between">
                    {name} Liquidity Pool
                </SheetTitle>
            </SheetHeader>
            <div className="space-y-5 flex flex-col w-full">
                <div className="w-full flex items-center space-x-3">
                    <div className="border rounded-[26px] p-3 w-fit h-[167px]">
                        <div className="flex flex-col justify-between">
                            <div className="flex space-x-1 text-sm font-medium ">
                                <div className="flex gap-2 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                        <path d="M7.99984 15.1665C11.6732 15.1665 14.6665 12.1732 14.6665 8.49984C14.6665 4.8265 11.6732 1.83317 7.99984 1.83317C4.3265 1.83317 1.33317 4.8265 1.33317 8.49984C1.33317 12.1732 4.3265 15.1665 7.99984 15.1665ZM8.49984 11.1665C8.49984 11.4398 8.27317 11.6665 7.99984 11.6665C7.7265 11.6665 7.49984 11.4398 7.49984 11.1665V7.83317C7.49984 7.55984 7.7265 7.33317 7.99984 7.33317C8.27317 7.33317 8.49984 7.55984 8.49984 7.83317V11.1665ZM7.3865 5.57984C7.41984 5.49317 7.4665 5.4265 7.5265 5.35984C7.59317 5.29984 7.6665 5.25317 7.7465 5.21984C7.8265 5.1865 7.91317 5.1665 7.99984 5.1665C8.0865 5.1665 8.17317 5.1865 8.25317 5.21984C8.33317 5.25317 8.4065 5.29984 8.47317 5.35984C8.53317 5.4265 8.57984 5.49317 8.61317 5.57984C8.6465 5.65984 8.6665 5.7465 8.6665 5.83317C8.6665 5.91984 8.6465 6.0065 8.61317 6.0865C8.57984 6.1665 8.53317 6.23984 8.47317 6.3065C8.4065 6.3665 8.33317 6.41317 8.25317 6.4465C8.09317 6.51317 7.9065 6.51317 7.7465 6.4465C7.6665 6.41317 7.59317 6.3665 7.5265 6.3065C7.4665 6.23984 7.41984 6.1665 7.3865 6.0865C7.35317 6.0065 7.33317 5.91984 7.33317 5.83317C7.33317 5.7465 7.35317 5.65984 7.3865 5.57984Z" fill="#808693"/>
                                    </svg>
                                    <span className="text-secondary-foreground">{isApr ? 'APR':'APY'}:</span>
                                </div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild onClick={() => setIsApr(!isApr)} className="cursor-pointer">
                                            <span className="text-foreground text-right">{isApr ? `${apr}` : `${apy}`}%</span>
                                        </TooltipTrigger>
                                        <TooltipContent className="">
                                            <span className="text-background text-right">Click to toggle between APR / APY</span>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <div className="flex gap-2 text-xs font-normal text-secondary-foreground items-center">
                                <span>Last updated at:</span>
                                <span>11.12.2024</span>
                            </div>
                        </div>
                        <div className="w-full h-[1px] border-b my-2"/>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 text-base font-medium">
                                <div className="rounded-full bg-inherit w-6 h-6 flex items-center justify-center ring-2 ring-border">
                                    <Image src={logo} alt={name} width={24} height={24} className="h-6 w-6 rounded-full"/>
                                </div>
                                <span className="whitespace-nowrap">{name} Pool</span>
                            </div>
                            <div className="w-full flex">
                                <p className="text-xs tracking-tight text-justify">
                                The {name} Liquidity Pool ({symbol}-LP) is a liquidity pool that sells covered calls and cash secured puts.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <ChartStrategy />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-normal text-secondary-foreground">Total Value Locked</span>
                    <div className="flex flex-col gap-1">
                        <span className="text-foreground text-2xl font-medium">$1 586 172 686.31</span>
                        <div className="flex gap-2 items-center text-xs text-foreground font-normal">
                            <span>AUM limit: $1 750 000 000</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M7.99984 14.6665C11.6732 14.6665 14.6665 11.6732 14.6665 7.99984C14.6665 4.3265 11.6732 1.33317 7.99984 1.33317C4.3265 1.33317 1.33317 4.3265 1.33317 7.99984C1.33317 11.6732 4.3265 14.6665 7.99984 14.6665ZM8.49984 10.6665C8.49984 10.9398 8.27317 11.1665 7.99984 11.1665C7.7265 11.1665 7.49984 10.9398 7.49984 10.6665V7.33317C7.49984 7.05984 7.7265 6.83317 7.99984 6.83317C8.27317 6.83317 8.49984 7.05984 8.49984 7.33317V10.6665ZM7.3865 5.07984C7.41984 4.99317 7.4665 4.9265 7.5265 4.85984C7.59317 4.79984 7.6665 4.75317 7.7465 4.71984C7.8265 4.6865 7.91317 4.6665 7.99984 4.6665C8.0865 4.6665 8.17317 4.6865 8.25317 4.71984C8.33317 4.75317 8.4065 4.79984 8.47317 4.85984C8.53317 4.9265 8.57984 4.99317 8.61317 5.07984C8.6465 5.15984 8.6665 5.2465 8.6665 5.33317C8.6665 5.41984 8.6465 5.5065 8.61317 5.5865C8.57984 5.6665 8.53317 5.73984 8.47317 5.8065C8.4065 5.8665 8.33317 5.91317 8.25317 5.9465C8.09317 6.01317 7.9065 6.01317 7.7465 5.9465C7.6665 5.91317 7.59317 5.8665 7.5265 5.8065C7.4665 5.73984 7.41984 5.6665 7.3865 5.5865C7.35317 5.5065 7.33317 5.41984 7.33317 5.33317C7.33317 5.2465 7.35317 5.15984 7.3865 5.07984Z" fill="#808693"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-3">
                    <span className="text-base font-medium">Liquidity Allocation</span>
                    <div className="p-3 pt-0 border rounded-[26px] w-full space-y-3">
                        <Table>
                            <TableHeader>
                                <TableRow className="w-full">
                                    <TableHead className="px-3 py-4 text-secondary-foreground font-medium">Token</TableHead>
                                    <TableHead className="px-3 py-4 text-secondary-foreground font-medium">Pool Size</TableHead>
                                    <TableHead className="px-3 py-4 text-secondary-foreground font-medium whitespace-nowrap">Current Weightage</TableHead>
                                    <TableHead className="px-3 py-4 text-secondary-foreground font-medium whitespace-nowrap">Target Weightage</TableHead>
                                    <TableHead className="px-3 py-4 text-secondary-foreground font-medium">Utilization</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {poolData.map((row) => (
                                    <TableRow key={row.symbol} className="border-none">
                                        <TableCell className="flex gap-2 items-center">
                                            <div className="rounded-full bg-inherit w-6 h-6 flex items-center justify-center ring-2 ring-border">
                                                    <Image src={row.img} alt={name} width={24} height={24} className="h-6 w-6 rounded-full"/>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs text-foreground font-normal">{row.symbol}</span>
                                                <span className="text-xs text-secondary-foreground font-normal whitespace-nowrap">{row.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="text-foreground text-xs font-normal">{row.poolSize}</span>
                                                <span className="text-secondary-foreground text-xs font-normal">Rank</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-xs text-foreground text-center">
                                            {row.current_weightage}
                                        </TableCell>
                                        <TableCell className="text-xs text-foreground text-center">
                                            {row.target_weightage}
                                        </TableCell>
                                        <TableCell className="text-xs text-foreground text-center">
                                            {row.utilization}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="border-t pt-3">
                            <div className="flex flex-col">
                                <div className="flex justify-between">
                                    <span className="text-xs text-secondary-foreground font-normal">{symbol}LP Price</span>
                                    <span className="text-xs text-foreground font-medium">$4,228</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs text-secondary-foreground font-normal">Total Supply</span>
                                    <span className="text-xs text-foreground font-medium">375 157 373,224 {symbol}LP</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full space-y-[14px]">
                    <Tabs value={activeTab}>
                        <TabsList className="w-full h-auto p-2 flex justify-between rounded-full bg-accent-foreground">
                            <TabsTrigger 
                                value="mint" 
                                className="rounded-full px-5 py-[6px] border border-transparent w-full data-[state=active]:border-primary"
                                onClick={()=>setActiveTab('mint')}
                            >
                                Mint
                            </TabsTrigger>
                            <TabsTrigger 
                                value="redeem" 
                                className="rounded-full border px-5 py-[6px] border-transparent w-full data-[state=active]:border-primary"
                                onClick={()=>setActiveTab('redeem')}
                            >
                                Redeem
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="space-y-[6px]">
                        <span className="text-sm font-medium">Amount</span>
                        <div className="flex justify-between gap-2">
                            <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
                                <DropdownMenuTrigger asChild>
                                    <div className="w-full flex justify-between px-3 py-2 rounded-[12px] h-auto items-center bg-secondary cursor-pointer">
                                        <div className="flex items-center gap-2">
                                            <Image src={poolData[selectedToken].img} alt={poolData[selectedToken].name} width={20} height={20} className="rounded-full" />
                                            <span className="text-sm text-foreground font-normal">{poolData[selectedToken].name}</span>
                                        </div>
                                        <ChevronDown size={10} className="text-secondary-foreground"/>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-[420px] py-5 px-3 bg-accent rounded-[20px] shadow-md shadow-primary">
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
                                                {poolData.map((token, index) => (
                                                    <div 
                                                        key={index} 
                                                        className="w-fit flex items-center p-2 space-x-[6px] bg-secondary rounded-[8px] cursor-pointer"
                                                        onClick={()=>handleClickToken(index)}
                                                    >
                                                        <Image src={token.img} alt={token.name} width={16} height={16} className="rounded-full"/>
                                                        <span className="text-sm">{token.symbol}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                        </div>
                                        <div className="flex justify-between text-xs font-normal text-secondary-foreground">
                                            <span>All Tokens</span>
                                            <span>Balance</span>
                                        </div>
                                    </div>
                                    {poolData.map((token, index) => (
                                        <div 
                                            key={index}
                                            onClick={() => handleClickToken(index)}
                                            className="w-full h-fit rounded-[8px] p-2 flex justify-between space-x-4 hover:bg-secondary cursor-pointer">
                                            <div className="flex items-center space-x-[6px]">
                                                <Image src={token.img} alt={token.name} width={28} height={28} className="w-7 h-7 rounded-full" />
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
                                                <span className="text-xs font-medium text-secondary-foreground text-end">EPjFWd...yTDt1v</span>
                                            </div>
                                        </div>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Input
                                type="number"
                                className="px-3 py-2 rounded-[12px] h-auto w-full bg-secondary border-none shadow-none"
                                placeholder="0"
                            />
                            <Button className="h-auto rounded-[12px] px-4 py-[10px] w-2/6">
                                {activeTab === 'mint' ? 'Buy' : 'Sell'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </SheetContent>
    )
}