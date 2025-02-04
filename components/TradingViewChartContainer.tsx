import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import TradingViewChart from "./TradingViewChart";
import OptionsPriceChart from "@/components/OptionsPriceChart";
import RecentTrades from "./RecentTrades";
import TradingViewTopNav from "./TradingViewTopNav";
import PnlChart from "./PnlChart";
import OptionsChain from "./OptionsChain";

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
                <div className="bg-inherit border border-b-0 py-1 px-4 rounded-t-[26px]">
                    <Tabs defaultValue={activeTab}>
                        <TabsList className="grid grid-cols-4 rounded-full p-0 w-full h-8 bg-inherit">
                        <TabsTrigger
                            value="chart"
                            className="border border-transparent text-secondary-foreground rounded-full hover:text-primary data-[state=active]:text-primary data-[state=active]:border-primary"
                            onClick={()=>handleClick('chart')}
                        >
                            Chart
                        </TabsTrigger>
                        <TabsTrigger
                            value="pnl"
                            className="border border-transparent text-secondary-foreground rounded-full hover:text-primary data-[state=active]:text-primary data-[state=active]:border-primary"
                            onClick={()=>handleClick('pnl')}
                        >
                            PNL
                        </TabsTrigger>
                        <TabsTrigger
                            value="trades"
                            className="border border-transparent text-secondary-foreground rounded-full hover:text-primary data-[state=active]:text-primary data-[state=active]:border-primary"
                            onClick={()=>handleClick('trades')}
                        >
                            Recent Trades
                        </TabsTrigger>
                        <TabsTrigger
                            value="chain"
                            className="border border-transparent text-secondary-foreground rounded-full hover:text-primary data-[state=active]:text-primary data-[state=active]:border-primary"
                            onClick={()=>handleClick('chain')}
                        >
                            Options Chain
                        </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                <div className="h-full w-full">
                    {activeTab === 'chart' && (
                        <TradingViewChart symbol={symbol} logo={logo}/>
                    )}
                    {activeTab === 'pnl' && (
                        <PnlChart />
                    )}
                    {/* {activeTab === 'options' && (
                        <OptionsPriceChart symbol={symbol} logo={logo}/>
                    )} */}
                    {activeTab === 'trades' && (
                        <RecentTrades /> 
                    )}
                    {activeTab === 'chain' && (
                        <OptionsChain />
                    )}
                </div>
            </div>
        </>
    )
}