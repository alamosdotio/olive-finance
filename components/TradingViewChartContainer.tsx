import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import TradingViewChart from "./TradingViewChart";
import PnlChartContainer from "./PnlChartContainer";
import OptionPrice from "./OptionPrice";

interface TradingViewChartContainerProps{
    symbol: string
    logo: string
    investment: string
    premium: string
    strikePrice: string
    currentPrice: number
    contractType: 'Call' | 'Put'
    positionType: string
    expiry: Date
}

export default function TradingViewChartContainer({symbol, logo, investment, premium, strikePrice, currentPrice, contractType, positionType, expiry} : TradingViewChartContainerProps){
    const [activeTab, setActiveTab] = useState<string>("chart")
    
    const handleClick = (state: string) => {
        if(activeTab!==state){
        setActiveTab(state);
        }
    }
    return (
        <>
            <div className="w-full h-[540px] flex flex-col">
                <div className="bg-inherit border border-b p-0 rounded-t-sm">
                    <Tabs defaultValue={activeTab}>
                        <TabsList className="grid grid-cols-3 rounded-full py-1 px-4 w-full h-10 bg-inherit">
                        <TabsTrigger
                            value="chart"
                            className="border-b  py-2 px-0 text-secondary-foreground rounded-none hover:text-primary data-[state=active]:text-primary data-[state=active]:border-primary"
                            onClick={()=>handleClick('chart')}
                        >
                            Chart
                        </TabsTrigger>
                        <TabsTrigger
                            value="pnl"
                            className="border-b py-2 px-0 text-secondary-foreground rounded-none hover:text-primary data-[state=active]:text-primary data-[state=active]:border-primary"
                            onClick={()=>handleClick('pnl')}
                        >
                            PNL
                        </TabsTrigger>
                        <TabsTrigger
                            value="price"
                            className="border-b py-2 px-0 text-secondary-foreground rounded-none hover:text-primary data-[state=active]:text-primary data-[state=active]:border-primary"
                            onClick={()=>handleClick('price')}
                        >
                            Options Price
                        </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                <div className="w-full flex-grow">
                    {activeTab === 'chart' && (
                        <TradingViewChart 
                            symbol={symbol} 
                            logo={logo}
                        />
                    )}
                    {activeTab === 'pnl' && (
                        <PnlChartContainer 
                            investment={investment}
                            premium={premium}
                            strikePrice={strikePrice}
                            currentPrice={currentPrice}
                            contractType={contractType}
                            positionType={positionType}
                        />
                    )}
                    {activeTab === 'price' && (
                        <OptionPrice 
                            symbol={symbol} 
                            logo={logo}
                            strikePrice={strikePrice}
                            contractType={contractType}
                            expiry={expiry}
                        />
                    )}
                </div>
            </div>
        </>
    )
}