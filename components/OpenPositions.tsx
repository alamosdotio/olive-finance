import btc from '@/public/images/bitcoin.png'
import Image from "next/image";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { Tabs, TabsList } from "./ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { Button } from './ui/button';
import PositionOverview from './PositionOverview';
import PositionGreeks from './PositionGreeks';

interface OpenPositionProps{
    token: string
    logo: string
    symbol: string
    type: string
    expiry: string
    size: number
    pnl: number
    greeks: {
        delta: number
        gamma: number
        theta: number
        vega: number
    }
}

export default function OpenPositions({token, logo, symbol, type, expiry, size, pnl, greeks} : OpenPositionProps){
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [activeTab, setActiveTab] = useState<string>('Overview')
    

    return (
        <div className="w-full flex flex-col bg-accent rounded-[10px]">
            <div
                className="w-full px-4 py-3 flex justify-between items-center cursor-pointer"
                onClick={()=>setIsOpen(!isOpen)}
            >
                <div className="flex space-x-[6px] items-center">
                    <Image src={logo} alt={token} width={16} height={16} className="w-4 h-4 rounded-full"/>
                    <span className="text-sm text-foreground font-medium">{symbol}</span>
                    <Badge className="text-[8px] text-black font-semibold py-[3px] px-1 w-7 h-3 rounded-[3px] flex items-center justify-center">{type}</Badge>
                </div>
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M9.95998 7.52531L6.69998 4.26531C6.31498 3.88031 5.68498 3.88031 5.29998 4.26531L2.03998 7.52531" stroke="#808693" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M9.96004 4.47461L6.70004 7.73461C6.31504 8.11961 5.68504 8.11961 5.30004 7.73461L2.04004 4.47461" stroke="#808693" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                )}
                
            </div>
            {isOpen && (
                <div className="px-4 pb-4 space-y-4 w-full">
                    <div className="w-full flex justify-between">
                        <Tabs defaultValue={activeTab}>
                            <TabsList className="flex space-x-3 bg-inherit p-0 text-secondary-foreground text-sm font-medium">
                                <TabsTrigger 
                                    value="Overview"
                                    className="py-2 px-5 rounded-[10px] data-[state=active]:bg-background data-[state=active]:text-foreground"
                                    onClick={() => setActiveTab('Overview')}
                                >
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="Greeks"
                                    className="py-2 px-5 rounded-[10px] data-[state=active]:bg-background data-[state=active]:text-foreground"
                                    onClick={() => setActiveTab('Greeks')}
                                >
                                    Greeks
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <div className='flex space-x-3'>
                            <Button className='bg-secondary p-2 w-fit h-fit rounded-[10px]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M9 1H13V5" stroke="#808693" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5.66666 8.33333L13 1" stroke="#808693" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M11 7.66667V11.6667C11 12.0203 10.8595 12.3594 10.6095 12.6095C10.3594 12.8595 10.0203 13 9.66667 13H2.33333C1.97971 13 1.64057 12.8595 1.39052 12.6095C1.14048 12.3594 1 12.0203 1 11.6667V4.33333C1 3.97971 1.14048 3.64057 1.39052 3.39052C1.64057 3.14048 1.97971 3 2.33333 3H6.33333" stroke="#808693" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Button>
                            <Button className='bg-secondary px-[10px] py-[6px] w-fit h-fit rounded-[10px] text-secondary-foreground text-sm font-normal'>
                                Exercise
                            </Button>
                        </div>
                    </div>
                    {activeTab === 'Overview' && (
                        <PositionOverview type={type} expiry={expiry} size={size} pnl={pnl}/>
                    )}
                    {activeTab === 'Greeks' &&(
                        <PositionGreeks delta={greeks.delta} gamma={greeks.gamma} theta={greeks.theta} vega={greeks.vega}/>
                    )}
                </div>
            )}
        </div>
    )
}