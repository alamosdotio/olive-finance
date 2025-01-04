import { Ban, RotateCw } from "lucide-react"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import OpenPositions from "./OpenPositions"
import OpenOrders from "./OpenOrders"
import OrderHistory from "./OrderHistory"
import { Position, positions } from '@/lib/data/Positions';

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
                            value="Orders"
                            className="px-2 py-[2px] border-b-[1px] rounded-none border-transparent data-[state=active]:border-primary"
                            onClick={()=>handleClickTab('Orders')}
                        >
                            Open Orders
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
                        className="bg-secondary p-2 w-full h-auto"
                    >
                        <RotateCw className="text-secondary-foreground"/>
                    </Button>
                    <Button
                        className="bg-secondary w-full h-auto py-[6px] px-[10px]"
                    >
                        <Ban className="text-secondary-foreground p-0"/>
                        <span className="text-sm font-normal text-secondary-foreground p-0">Cancel all</span>
                    </Button>
                </div>
            </div>
            <div className="px-6 py-4">
                {activeTab === 'Positions' && (
                    <div className="space-y-[10px]">
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
                {activeTab === 'Orders' && (
                    <OpenOrders />
                )}
                {activeTab === 'History' && (
                    <OrderHistory />
                )}
            </div>
            <div className="px-6 pb-4 flex justify-end">
                pagination
            </div>
        </div>
    )
}