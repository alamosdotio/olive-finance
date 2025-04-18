import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import TradingViewChart from "./TradingViewChart";
import RecentTrades from "./RecentTrades";
import PnlChartContainer from "./PnlChartContainer";

interface TradingViewChartContainerProps{
    symbol: string
    logo: string
    investment: string
    numContracts: string
    strikePrice: string
    currentPrice: number
    contractType: string
    positionType: string
}

export default function TradingViewChartContainer({symbol, logo, investment, numContracts, strikePrice, currentPrice, contractType, positionType} : TradingViewChartContainerProps){
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
                        <TradingViewChart symbol={symbol} logo={logo}/>
                    )}
                    {activeTab === 'pnl' && (
                        <PnlChartContainer 
                            investment={investment}
                            numContracts={numContracts}
                            strikePrice={strikePrice}
                            currentPrice={currentPrice}
                            contractType={contractType}
                            positionType={positionType}
                        />
                    )}
                    {activeTab === 'price' && (
                        <div className="h-full w-full border border-t-0">
                            options price goes here
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}