'use client'

import { useWallet } from "@/contexts/walletprovider";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Copy } from "lucide-react";
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
    const { address, disconnect } = useWallet()
    const [activeTab, setActiveTab] = useState<string>('Token')
    const [isOpen, setIsOpen] = useState(false)
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
                <Button variant="selected" className="w-full h-full">
                    {address ? truncateAddress(address) : 'Connected'}
                </Button>
            </SheetTrigger>
            <SheetContent className="space-y-16">
                <SheetTitle className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex relative">
                            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                                <circle cx="21" cy="21" r="20" fill="#2F3520" stroke="#607C2F"/>
                            </svg>
                            <Image src={solfare} alt="icon logo" width={20} height={20} className="rounded-full absolute left-2.5 top-1/2 transform -translate-y-1/2"/>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-lg font-medium text-dark">
                                {address ? truncateAddress(address) : 'Connected'}
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M12.5 2.5H17.5V7.5" stroke="#607C2F" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8.33594 11.6667L17.5026 2.5" stroke="#607C2F" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M15 10.8333V15.8333C15 16.2754 14.8244 16.6993 14.5118 17.0118C14.1993 17.3244 13.7754 17.5 13.3333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V6.66667C2.5 6.22464 2.67559 5.80072 2.98816 5.48816C3.30072 5.17559 3.72464 5 4.16667 5H9.16667" stroke="#607C2F" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
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