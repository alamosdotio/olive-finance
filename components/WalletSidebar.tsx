'use client'

import { useWallet } from "@/contexts/walletprovider";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Copy, ExternalLink } from "lucide-react";
import { LogOut } from 'lucide-react';
import { useState } from "react";
import Image from "next/image";
import solfare from "@/public/images/solfare.png"




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
    const [activeTab, setActiveTab] = useState<string>('Token')
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
                <button className="w-full py-[9px] px-[15px] rounded-[12px] gap-2 text-foreground text-sm bg-secondary border border-transparent hover:bg-primary-foreground hover:border-primary flex justify-between">
                    {iconPath && (
                        <Image src={iconPath} alt="Wallet Icon" width={24} height={20} className="rounded-full" />
                    )}
                    {address ? truncateAddress(address) : 'Connected'}
                </button>
            </SheetTrigger>
            <SheetContent className="space-y-16">
                <SheetTitle className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex relative">
                            {iconPath && (
                                <Image src={iconPath} alt="Wallet Icon" width={24} height={24} className="rounded-full" />
                            )}
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-lg font-medium text-dark">
                                {address ? truncateAddress(address) : 'Connected'}
                            </span>
                            <ExternalLink className="text-primary"/>
                        </div>
                    </div>
                    <div className="flex p-2 gap-2">
                        <Button     
                            variant='unselected'    
                            className="w-8 h-8 rounded-md"  
                            onClick={copyAddress}>
                                <Copy className="w-8 h-8"/>
                        </Button>
                            
                        <Button 
                            variant='unselected' 
                            className="w-8 h-8 rounded-md" 
                            onClick={() => {
                                disconnect()
                            }}>
                                <LogOut />
                        </Button>
                    </div>
                </SheetTitle>
                <div className="w-full flex flex-col space-y-12">
                    <div className="m-auto">
                        <div className="space-x-3">
                            <Button
                                variant={activeTab === 'Token' ? 'selected' : 'unselected'}
                                onClick={() => handleClickTab('Token')}
                            >
                                Token
                            </Button>
                            <Button
                                variant={activeTab === 'Points' ? 'selected' : 'unselected'}
                                onClick={() => handleClickTab('Points')}
                            >
                                Points
                            </Button>
                        </div>
                    </div>
                    {activeTab === 'Token' && (
                        <div className="m-auto space-y-4">
                        <h1 className="flex font-bold text-4xl justify-center">${balance}</h1>
                            <div className="space-y-1 flex flex-col items-center">
                                <div className="flex space-x-2">
                                    <p className="text-base font-normal">Available to deposit</p>
                                </div>
                                <div className="flex space-x-2">
                                    <p className="text-base font-normal">Portfolio Balance <span className="font-bold">${balance}</span> </p>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'Points' && (
                        <div className="m-auto">
                            <div className="space-y-1 flex flex-col items-center">
                                <h3 className="text-base font-semibold">Your Points</h3>
                                <h1 className="font-bold text-4xl">{points}</h1>
                            </div>
                        </div>
                    )}
                    
                </div>
            </SheetContent>
        </Sheet>
    )
}