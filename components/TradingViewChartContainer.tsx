import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import TradingViewChart from "./TradingViewChart";
import RecentTrades from "./RecentTrades";
import PnlChartContainer from "./PnlChartContainer";

interface TradingViewChartContainerProps{
    symbol: string
    logo: string
}

export default function TradingViewChartContainer({symbol, logo} : TradingViewChartContainerProps){
    const [activeTab, setActiveTab] = useState<string>("chart")
    
    const handleClick = (state: string) => {
        if(activeTab!==state){
        setActiveTab(state);
        }
    }
    return (
        <>
            <div className="w-full h-[700px] flex flex-col">
                <div className="bg-inherit border border-b-1 p-0 rounded-t-[26px]">
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
                            value="trades"
                            className="border-b py-2 px-0 text-secondary-foreground rounded-none hover:text-primary data-[state=active]:text-primary data-[state=active]:border-primary"
                            onClick={()=>handleClick('trades')}
                        >
                            Recent Trades
                        </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                <div className="h-full w-full">
                    {activeTab === 'chart' && (
                        <TradingViewChart symbol={symbol} logo={logo}/>
                    )}
                    {activeTab === 'pnl' && (
                        <PnlChartContainer />
                    )}
                    {activeTab === 'trades' && (
                        <RecentTrades /> 
                    )}
                </div>
            </div>
        </>
    )
}