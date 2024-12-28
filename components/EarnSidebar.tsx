'use client'
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SheetContent, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import EarnCardlogo from "./EarnCardLogo";
import bitcoin from '@/public/images/bitcoin.png'
import usdt from '@/public/images/usdt.png'
import usdc from '@/public/images/usdc.png'
import Image from "next/image";

interface EarnSidebarProps {
    name: string;
    symbol: string;
    logo: string;
    apy: number;
}



export default function EarnSidebar({name, symbol, logo, apy} : EarnSidebarProps){
    const poolData = [
        {
            img: logo,
            symbol: symbol,
            name: name,
            poolSize: '$802,350,386.79',
            weightage: '46.27% / 47%',
            utilization: '78.19%'
        },
        {
            img: usdc,
            symbol: 'USDC',
            name: 'USD Coin',
            poolSize: '$16,321,098,765',
            weightage: '9.9% / 10%',
            utilization: '52.18%'
        },
        {
            img: usdt,
            symbol: 'USDT',
            name: 'USDT',
            poolSize: '$15,210,987,654',
            weightage: '11.47% / 11%',
            utilization: '44.31%'
        }
    ]
    const [activeTab, setActiveTab] = useState<string>('mint');
    
    return (
        <SheetContent className="space-y-6 w-auto rounded-l-[26px]">
            <SheetHeader>
                <SheetTitle className="text-2xl">
                    {name} Option Maker
                </SheetTitle>
            </SheetHeader>
            <div className="space-y-5 flex flex-col">
                <div className="border rounded-[26px] p-3">
                    <div className="flex justify-between">
                        <div className="flex gap-1 text-sm font-medium">
                            <div className="flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                    <path d="M7.99984 15.1665C11.6732 15.1665 14.6665 12.1732 14.6665 8.49984C14.6665 4.8265 11.6732 1.83317 7.99984 1.83317C4.3265 1.83317 1.33317 4.8265 1.33317 8.49984C1.33317 12.1732 4.3265 15.1665 7.99984 15.1665ZM8.49984 11.1665C8.49984 11.4398 8.27317 11.6665 7.99984 11.6665C7.7265 11.6665 7.49984 11.4398 7.49984 11.1665V7.83317C7.49984 7.55984 7.7265 7.33317 7.99984 7.33317C8.27317 7.33317 8.49984 7.55984 8.49984 7.83317V11.1665ZM7.3865 5.57984C7.41984 5.49317 7.4665 5.4265 7.5265 5.35984C7.59317 5.29984 7.6665 5.25317 7.7465 5.21984C7.8265 5.1865 7.91317 5.1665 7.99984 5.1665C8.0865 5.1665 8.17317 5.1865 8.25317 5.21984C8.33317 5.25317 8.4065 5.29984 8.47317 5.35984C8.53317 5.4265 8.57984 5.49317 8.61317 5.57984C8.6465 5.65984 8.6665 5.7465 8.6665 5.83317C8.6665 5.91984 8.6465 6.0065 8.61317 6.0865C8.57984 6.1665 8.53317 6.23984 8.47317 6.3065C8.4065 6.3665 8.33317 6.41317 8.25317 6.4465C8.09317 6.51317 7.9065 6.51317 7.7465 6.4465C7.6665 6.41317 7.59317 6.3665 7.5265 6.3065C7.4665 6.23984 7.41984 6.1665 7.3865 6.0865C7.35317 6.0065 7.33317 5.91984 7.33317 5.83317C7.33317 5.7465 7.35317 5.65984 7.3865 5.57984Z" fill="#808693"/>
                                </svg>
                                <span className="text-secondary-foreground">APY:</span>
                            </div>
                            <span className="text-foreground text-right">{apy}%</span>
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
                            <span>{name} Pool</span>
                        </div>
                        <div className="w-full flex">
                            <p className="text-xs tracking-tight text-justify">
                                Lorem ipsum dolor sit amet consectetur. 
                                Volutpat elit convallis tristique aliquam porta orci. 
                                Mauris leo dignissim non placerat. Enim sagittis ut velit ullamcorper elementum quis cursus. <span className="text-primary underline">More</span>
                            </p>
                        </div>
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
                                    <TableHead className="px-3 py-4 text-secondary-foreground font-medium">Current/<br/>Target Weightage</TableHead>
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
                                                <span className="text-xs text-secondary-foreground font-normal">{row.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="text-foreground text-xs font-normal">{row.poolSize}</span>
                                                <span className="text-secondary-foreground text-xs font-normal">Rank</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-xs text-foreground">
                                            {row.weightage}
                                        </TableCell>
                                        <TableCell className="text-xs text-foreground">
                                            {row.utilization}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="border-t pt-3">
                            <div className="flex flex-col">
                                <div className="flex justify-between">
                                    <span className="text-xs text-secondary-foreground font-normal">{symbol}OM Price</span>
                                    <span className="text-xs text-foreground font-medium">$4,228</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs text-secondary-foreground font-normal">Total Supply</span>
                                    <span className="text-xs text-foreground font-medium">375 157 373,224 {symbol}OM</span>
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
                            <Input
                                type="number"
                                className="px-3 py-2 rounded-[12px] h-auto w-full"
                                placeholder="$0"
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