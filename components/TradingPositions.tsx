import { Ban, ChevronLeft, ChevronRight, RotateCw } from "lucide-react"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import OpenPositions from "./OpenPositions"
import OrderHistory from "./OrderHistory"
import { Position, positions } from '@/lib/data/Positions';
import ExpiredOptions from "./ExpiredOptions"

export default function TradingPositions(){
    const [activeTab, setActiveTab] = useState<string>("Positions")

    const [allPositions, setAllPositions] = useState<Position[]>([])

    const generatePositions = (count: number) : Position[] => {
        return Array(count).fill(null).map((_, index) =>{
            const position = positions[index % positions.length]
            return {
                token: position.token,
                logo: position.logo,
                symbol: position.symbol,
                type: position.type,
                expiry: position.expiry,
                size: position.size,
                pnl: position.pnl,
                greeks: {
                    delta: position.greeks.delta,
                    gamma: position.greeks.gamma,
                    theta: position.greeks.theta,
                    vega: position.greeks.vega,
                }
            }
        })
    }

    useEffect(() =>{
        const positionList = generatePositions(5)
        setAllPositions(positionList)
    },[])

    const handleClickTab = (state:string) =>{
        if(activeTab!==state){
            setActiveTab(state);
        }
    }
    return (
        <div className="w-full h-fit border rounded-[26px] flex flex-col">
            <div className="w-full flex justify-between px-6 py-3 border-b-[1px]">
                <Tabs defaultValue={activeTab} className="p-0"> 
                    <TabsList className="w-full bg-inherit text-secondary-foreground p-0 gap-6">
                        <TabsTrigger 
                            value='Positions'
                            className="px-2 py-[2px] border-b-[1px] rounded-none border-transparent data-[state=active]:border-primary"
                            onClick={()=>handleClickTab('Positions')}
                        >
                            Open Positions
                        </TabsTrigger>
                        <TabsTrigger 
                            value="Expired"
                            className="px-2 py-[2px] border-b-[1px] rounded-none border-transparent data-[state=active]:border-primary"
                            onClick={()=>handleClickTab('Expired')}
                        >
                            Expired Positions
                        </TabsTrigger>
                        <TabsTrigger 
                            value="History"
                            className="px-2 py-[2px] border-b-[1px] rounded-none border-transparent data-[state=active]:border-primary"
                            onClick={()=>handleClickTab('History')}
                        >
                            Order History
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className="flex gap-3 items-center">
                    <Button
                        className="bg-secondary p-2 w-full h-auto rounded-[10px]"
                    >
                        <RotateCw className="text-secondary-foreground"/>
                    </Button>
                    <Button
                        className="bg-secondary w-full h-auto py-[6px] px-[10px] rounded-[10px]"
                    >
                        <Ban className="text-secondary-foreground p-0"/>
                        <span className="text-sm font-normal text-secondary-foreground p-0">Cancel all</span>
                    </Button>
                </div>
            </div>
            {activeTab === 'Positions' && (
                <div className="px-6 py-4 pb-[10px] space-y-[10px]">
                    {allPositions.map((position, index) => (
                        <OpenPositions 
                            key={index} 
                            token={position.token} 
                            logo={position.logo} 
                            symbol={position.symbol} 
                            type={position.type} 
                            expiry={position.expiry} 
                            size={position.size} 
                            pnl={position.pnl} 
                            greeks={position.greeks}
                        />
                    ))}
                    
                </div>
            )}
            {activeTab === 'Expired' && (
                <div className="pb-[44px]">
                    <ExpiredOptions />
                </div>
            )}
            {activeTab === 'History' && (
                <div className="px-6 py-4 pb-[10px]">
                    <OrderHistory />
                </div>
            )}
            <div className="px-6 pb-4 flex justify-end">
                <div className="flex items-center gap-5">
                    <button className="p-2 rounded-[12px] bg-secondary flex items-center h-9 w-9">
                        <ChevronLeft className="w-fit h-fit  text-secondary-foreground" />
                    </button>
                    <div className="space-x-2">   
                        <button className="p-[6px] w-9 h-9 rounded-[12px] bg-backgroundSecondary">1</button>
                        <button className="p-[6px] w-9 h-9 rounded-[12px] bg-backgroundSecondary">2</button>
                        <button className="p-[6px] w-9 h-9 rounded-[12px] bg-backgroundSecondary">3</button>
                        <span>...</span>
                        <button className="py-[6px] px-2 rounded-[12px] bg-backgroundSecondary w-fit h-fit">109</button>
                    </div>
                    
                    <button className="p-2 rounded-[12px] bg-secondary flex items-center h-9 w-9">
                        <ChevronRight className="w-fit h-fit  text-secondary-foreground" />
                    </button>
                </div>
            </div>
        </div>
    )
}