import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import TradingViewChart from "./TradingViewChart";
import OptionsPriceChart from "@/components/OptionsPriceChart";

interface TradingViewChartContainerProps{
    symbol: string
}

export default function TradingViewChartContainer({symbol} : TradingViewChartContainerProps){
    const [activeTab, setActiveTab] = useState<string>("chart")
    
    const handleClick = (state: string) => {
        if(activeTab!==state){
        setActiveTab(state);
        }
    }
    return (
        <>
            <div className="w-4/6 h-[568px] flex flex-col">
                <div className="bg-inherit border border-b-0 rounded-t-[26px] py-1 px-4">
                    <Tabs defaultValue={activeTab}>
                        <TabsList className="grid grid-cols-3 rounded-full p-0 w-full h-8 bg-inherit">
                        <TabsTrigger
                            value="chart"
                            className="border border-transparent text-secondary-foreground rounded-full data-[state=active]:text-primary data-[state=active]:border-primary"
                            onClick={()=>handleClick('chart')}
                        >
                            Chart
                        </TabsTrigger>
                        <TabsTrigger
                            value="options"
                            className="border border-transparent text-secondary-foreground rounded-full data-[state=active]:text-primary data-[state=active]:border-primary"
                            onClick={()=>handleClick('options')}
                        >
                            Options Price
                        </TabsTrigger>
                        <TabsTrigger
                            value="trades"
                            className="border border-transparent text-secondary-foreground rounded-full data-[state=active]:text-primary data-[state=active]:border-primary"
                        >
                            Recent Trades
                        </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                <div className="h-full">
                    {activeTab === 'chart' && (
                    <TradingViewChart symbol={symbol}/>
                    )}
                    {activeTab === 'options' && (
                    <OptionsPriceChart symbol={symbol}/>
                    )}
                </div>
            </div>
        </>
    )
}