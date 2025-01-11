'use client'

import { useWallet } from "@/contexts/walletprovider";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Copy, ExternalLink } from "lucide-react";
import { LogOut } from 'lucide-react';
import { useState } from "react";
import Image from "next/image";
import solfare from "@/public/images/solfare.png"
import { ArrowDown, ArrowUp, CopyIcon, LogOutIcon, SendIcon } from "@/public/svgs/icons";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";




interface CryptoData {
    symbol: string;
    name: string;
    price: string;
    change: number;
}
  
const cryptoData: CryptoData[] = [
{ symbol: 'SOL', name: 'Solana', price: '$100', change: -1.00 },
{ symbol: 'ETH', name: 'Ethereum', price: '$1,892', change: -0.982 },
{ symbol: 'BTC', name: 'Bitcoin', price: '$871', change: 1.00 },
{ symbol: 'USDC', name: 'USD Coin', price: '$6,212', change: 1.871 },
{ symbol: 'RBTC', name: 'RabbitCoin', price: '$988', change: -1.213 },
{ symbol: 'HBAR', name: 'Hedera', price: '$471', change: -0.872 },
{ symbol: 'WLD', name: 'WorldCoin', price: '$884', change: 2.142 },
]

export default function WalletSideBar() {
    const { address, disconnect, iconPath } = useWallet()
    const [activeTab, setActiveTab] = useState<string>('portfolio')
    const balance = 10565
    const points = 10900

    const truncateAddress = (address: string) => {
        return `${address.slice(0,4)}...${address.slice(-4)}`
    }

    const copyAddress = () => {
        if(address) {
            navigator.clipboard.writeText(address)
        }
    }

    const handleClickTab = (state: string) => {
        if(activeTab!==state){
            setActiveTab(state)
        }
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="w-full py-[5px] px-[15px] h-fit rounded-[12px] gap-2 text-foreground text-sm bg-secondary border border-transparent hover:bg-primary-foreground hover:border-primary flex justify-between">
                    {iconPath && (
                        <Image src={iconPath} alt="Wallet Icon" width={24} height={20} className="rounded-full" />
                    )}
                    {address ? truncateAddress(address) : 'Connected'}
                </button>
            </SheetTrigger>
            <SheetContent className="bg-accent rounded-l-[26px] p-6 space-y-4">
                <SheetTitle className="flex justify-between">
                    <div className="flex space-x-2 items-center">
                        {iconPath && (
                            <Image src={iconPath} alt="Wallet Icon" width={20} height={20} />
                        )}
                        <span className="text-base text-foreground font-medium items-center pt-1">{address ? truncateAddress(address) : 'Connected'}</span>
                        <SendIcon />
                    </div>
                    <div className="flex space-x-3">
                        <Button 
                            className="bg-secondary p-2 h-fit shadow-none rounded-[10px]"
                            onClick={copyAddress}
                        >
                            <CopyIcon />
                        </Button>
                        <Button 
                            className="bg-secondary p-2 h-fit shadow-none rounded-[10px]"
                            onClick={()=>disconnect()}
                        >
                            <LogOutIcon />
                        </Button>
                    </div>
                </SheetTitle>
                <div className="w-full flex space-x-4 justify-between">
                    <div className="w-full flex flex-col p-4 bg-background rounded-[20px] space-y-2">
                        <span className="text-sm text-secondary-foreground font-medium">Tokens</span>
                        <span className="text-[28px] text-foreground font-medium">$10 567</span>
                    </div>
                    <div className="w-full flex flex-col p-4 bg-background rounded-[20px] space-y-2">
                        <span className="text-sm text-secondary-foreground font-medium">Points</span>
                        <span className="text-[28px] text-foreground font-medium">10 900</span>
                    </div>
                </div>
                <div className="w-full flex flex-col space-y-3">
                    <Tabs defaultValue={activeTab}>
                        <TabsList className="w-full grid grid-cols-2 h-fit bg-accent-foreground rounded-full p-2">
                            <TabsTrigger
                                value="portfolio"
                                className="border rounded-full px-5 py-[6px] text-sm data-[state=active]:border-primary"
                                onClick={() => handleClickTab('portfolio')}
                            >
                                Portfolio
                            </TabsTrigger>
                            <TabsTrigger
                                value="activity"
                                className="border rounded-full px-5 py-[6px] text-sm data-[state=active]:border-primary"
                                onClick={() => handleClickTab('activity')}
                            >
                                Activity
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="w-full flex flex-col space-y-2">
                        <div className="w-full flex flex-col p-4 pt-3 border rounded-[20px]">
                            <div className="w-full flex justify-between">
                                <div className="flex items-center space-x-[6px]">
                                    <span className="text-sm text-foreground font-medium h-4 flex items-center">Holdings</span>
                                    <span className="border border-primary py-[5px] px-[6px] text-[10px] text-primary h-4 rounded-[4px] flex items-center">4 Tokens</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-foreground font-medium h-4 flex items-center">$229.38</span>
                                    <ArrowUp />
                                </div>
                            </div>
                            <div className="py-4">
                                <Separator />
                            </div>  
                            <div className="w-full flex flex-col space-y-4">
                                <div className="w-full flex justify-between items-center">
                                    <div className="flex space-x-[10px] items-center h-fit">
                                        <Image src='/images/solana.png' alt="solana" height={32} width={32} className="rounded-full"/>
                                        <div className="flex flex-col space-y-0.5">
                                            <span className="text-xs text-foreground font-medium h-4">Solana</span>
                                            <span className="text-xs text-secondary-foreground font-medium h-4">0.809232976 SOL</span>
                                        </div>
                                    </div>
                                    <span className="text-xs text-secondary-foreground font-medium h-6 flex items-center">
                                        $152.26
                                    </span>
                                </div>
                                <div className="w-full flex justify-between items-center">
                                    <div className="flex space-x-[10px] items-center h-fit">
                                        <Image src='/images/bitcoin.png' alt="solana" height={32} width={32} className="rounded-full"/>
                                        <div className="flex flex-col space-y-0.5">
                                            <span className="text-xs text-foreground font-medium h-4">Bitcoin</span>
                                            <span className="text-xs text-secondary-foreground font-medium h-4">2.5756152651 BTC</span>
                                        </div>
                                    </div>
                                    <span className="text-xs text-secondary-foreground font-medium h-6 flex items-center">
                                        $63.54
                                    </span>
                                </div>
                                <div className="w-full flex justify-between items-center">
                                    <div className="flex space-x-[10px] items-center h-fit">
                                        <Image src='/images/render.png' alt="solana" height={32} width={32} className="rounded-full"/>
                                        <div className="flex flex-col space-y-0.5">
                                            <span className="text-xs text-foreground font-medium h-4">Render</span>
                                            <span className="text-xs text-secondary-foreground font-medium h-4">0.809232976 Render</span>
                                        </div>
                                    </div>
                                    <span className="text-xs text-secondary-foreground font-medium h-6 flex items-center">
                                        $10.26
                                    </span>
                                </div>
                                <div className="w-full flex justify-between items-center">
                                    <div className="flex space-x-[10px] items-center h-fit">
                                        <Image src='/images/ethereum.png' alt="solana" height={32} width={32} className="rounded-full"/>
                                        <div className="flex flex-col space-y-0.5">
                                            <span className="text-xs text-foreground font-medium h-4">Ethereum</span>
                                            <span className="text-xs text-secondary-foreground font-medium h-4">5.482435434 ETH</span>
                                        </div>
                                    </div>
                                    <span className="text-xs text-secondary-foreground font-medium h-6 flex items-center">
                                        $3.68
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-between items-center py-3 px-4 border rounded-full h-10">
                            <span className="text-sm text-foreground font-medium flex items-center h-4">Options</span>
                            <div className="flex space-x-4 items-center">
                                <span className="text-sm text-foreground font-medium flex items-center h-4">$694.56</span>
                                <span className="flex items-center h-4"><ArrowDown /></span>
                            </div>
                        </div>
                        <div className="w-full flex justify-between items-center py-3 px-4 border rounded-full h-10">
                            <span className="text-sm text-foreground font-medium flex items-center h-4">Futures</span>
                            <div className="flex space-x-4 items-center">
                                <span className="text-sm text-foreground font-medium flex items-center h-4">$369.67</span>
                                <span className="flex items-center h-4"><ArrowDown /></span>
                            </div>
                        </div>
                        <div className="w-full flex justify-between items-center py-3 px-4 bg-accent-foreground rounded-full h-fit">
                            <div className="flex space-x-[6px] items-center">
                                <span className="text-sm text-foreground font-medium flex items-center h-4">Limits</span>
                                <span className="text-[10px] text-primary font-semibold border border-primary py-[5px] px-[6px] flex items-center h-4 rounded-[4px]">0 OPEN ORDERS</span>
                            </div>
                            <span className="text-sm text-foreground font-medium flex items-center h-4">
                                $0
                            </span>
                        </div>
                        <div className="w-full flex justify-between items-center py-3 px-4 bg-accent-foreground rounded-full h-fit">
                            <div className="flex space-x-[6px] items-center">
                                <span className="text-sm text-foreground font-medium flex items-center h-4">DCA</span>
                                <span className="text-[10px] text-primary font-semibold border border-primary py-[5px] px-[6px] flex items-center h-4 rounded-[4px]">0 OPEN ORDERS</span>
                            </div>
                            <span className="text-sm text-foreground font-medium flex items-center h-4">
                                $0
                            </span>
                        </div>
                        <div className="w-full flex justify-between items-center py-3 px-4 bg-accent-foreground rounded-full h-fit">
                            <div className="flex space-x-[6px] items-center">
                                <span className="text-sm text-foreground font-medium flex items-center h-4">VA</span>
                                <span className="text-[10px] text-primary font-semibold border border-primary py-[5px] px-[6px] flex items-center h-4 rounded-[4px]">0 OPEN ORDERS</span>
                            </div>
                            <span className="text-sm text-foreground font-medium flex items-center h-4">
                                $0
                            </span>
                        </div>
                        <div className="w-full flex justify-between items-center py-3 px-4 bg-accent-foreground rounded-full h-fit">
                            <div className="flex space-x-[6px] items-center">
                                <span className="text-sm text-foreground font-medium flex items-center h-4">Perps</span>
                                <span className="text-[10px] text-primary font-semibold border border-primary py-[5px] px-[6px] flex items-center h-4 rounded-[4px]">0 OPEN ORDERS</span>
                            </div>
                            <span className="text-sm text-foreground font-medium flex items-center h-4">
                                $0
                            </span>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}