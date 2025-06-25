import Image from "next/image";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from './ui/button';
import PositionOverview from './PositionOverview';
import PositionGreeks from './PositionGreeks';
import { ArrowDown, ArrowUp, SendIcon } from '@/public/svgs/icons';
import PositionDetails from './PositionDetails';
import { Separator } from './ui/separator';

interface OpenPositionProps{
    index: number
    token: string
    logo: string
    symbol: string
    strikePrice: number
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
    onExercise: ()=>void
}

export default function OpenPositions({token, logo, symbol, type, expiry, size, pnl, greeks, strikePrice, index, onExercise} : OpenPositionProps){
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [activeTab, setActiveTab] = useState<string>('Overview')
    return (
        <div className="w-full flex flex-col bg-accent rounded-sm">
            <div
                className="w-full px-4 py-3 flex justify-between items-center cursor-pointer"
                onClick={()=>setIsOpen(!isOpen)}
            >
                <div className="flex space-x-[6px] items-center ">
                    <h1>{index+1}</h1>
                    <Image src={logo} alt={token} width={16} height={16} className="w-4 h-4 rounded-full"/>
                    <span className="text-sm text-foreground font-medium">{symbol}</span>
                    <Badge className="text-[8px] bg-gradient-primary border-none text-black font-semibold py-[3px] px-1 w-7 h-3 rounded-[3px] flex items-center justify-center">{type}</Badge>
                </div>
                {isOpen ? (
                    <span className='text-secondary-foreground'>
                        <ArrowUp />
                    </span>
                    
                ) : (
                    <span className='text-secondary-foreground'>
                        <ArrowDown />
                    </span>
                    
                )}
                
            </div>
            {isOpen && (
                <div className="px-4 pb-4 space-y-4 w-full">
                    <div className="w-full flex justify-center md:justify-between">
                        <Tabs defaultValue={activeTab}>
                            <TabsList className="flex md:space-x-3 bg-inherit p-0 text-secondary-foreground text-sm font-medium">
                                <TabsTrigger 
                                    value="Overview"
                                    className="w-full py-2 px-5 rounded-sm data-[state=active]:bg-background data-[state=active]:text-foreground"
                                    onClick={() => setActiveTab('Overview')}
                                >
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="Greeks"
                                    className="w-full py-2 px-5 rounded-sm data-[state=active]:bg-background data-[state=active]:text-foreground"
                                    onClick={() => setActiveTab('Greeks')}
                                >
                                    Greeks
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="Details"
                                    className="w-full py-2 px-5 rounded-sm data-[state=active]:bg-background data-[state=active]:text-foreground"
                                    onClick={() => setActiveTab('Details')}
                                >
                                    Details
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <div className='hidden md:flex space-x-3'>
                            <Button className='bg-secondary p-2 w-fit h-fit rounded-sm'>
                                <SendIcon />
                            </Button>
                            <Button className='bg-secondary px-[10px] py-[6px] w-fit h-fit rounded-sm text-secondary-foreground text-sm font-normal'
                                onClick={onExercise}>
                                Exercise
                            </Button>
                        </div>
                    </div>
                    {activeTab === 'Overview' && (
                        <PositionOverview type={type} expiry={expiry} size={size} pnl={pnl} strikePrice={strikePrice}/>
                    )}
                    {activeTab === 'Greeks' &&(
                        <PositionGreeks delta={greeks.delta} gamma={greeks.gamma} theta={greeks.theta} vega={greeks.vega}/>
                    )}
                    {activeTab === 'Details' &&(
                        <PositionDetails type={type} />
                    )}
                    <Separator className='my-4 md:hidden'/>
                    <div className='md:hidden flex space-x-3'>
                        <Button className='bg-secondary p-2 w-fit h-fit rounded-sm'>
                            <SendIcon />
                        </Button>
                        <Button className='bg-secondary px-[10px] py-[6px] w-fit h-fit rounded-sm text-secondary-foreground text-sm font-normal'>
                            Exercise
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}