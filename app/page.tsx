'use client'
import CryptoNav from "@/components/CryptoNav";
import OptionsCard from "@/components/OptionsCard";
import PriceQuote from "@/components/PriceQuote";
import ProtectedRoute from "@/components/ProtectedRoute";
import TradingPositions from "@/components/TradingPositions";
import TradingPositionsFallback from "@/components/TradingPositionsFallback";
import TradingViewChart from "@/components/TradingViewChart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWallet } from "@/contexts/walletprovider";
import { useState } from "react";



export default function Home() {
  const { isConnected } = useWallet();
  const [activeTab, setActiveTab] = useState<string>("chart")

  const handleClick = (state: string) => {
      if(activeTab!==state){
        setActiveTab(state);
      }
  }



  return (
    <div className="flex flex-col">
          <div>
          <CryptoNav />
          </div>
          <div className="flex flex-col-reverse lg:flex-row py-4 gap-4 max-w-screen-2xl">
            <div className="w-4/6 h-[500px] mx-auto space-y-0">
              {/* <Tabs defaultValue="chart">
                  <TabsList className="grid grid-cols-3 rounded-b-none bg-input p-0 rounded-t-[15px]">
                    <TabsTrigger value="chart" className="border-2  p-2 bg-input rounded-none rounded-tl-[15px] data-[state=active]:text-primary data-[state=active]:bg-primary-foreground data-[state=active]:border-primary">Chart</TabsTrigger>
                    <TabsTrigger value="options" className="border-2  p-2 bg-input rounded-none data-[state=active]:text-primary data-[state=active]:bg-primary-foreground data-[state=active]:border-primary">Option Price</TabsTrigger>
                    <TabsTrigger value="trades" className="border-2  p-2 bg-input rounded-none rounded-tr-[15px] data-[state=active]:text-primary data-[state=active]:bg-primary-foreground data-[state=active]:border-primary">Recent Trades</TabsTrigger>
                  </TabsList>
              </Tabs> */}
              <div className="w-full bg-inherit border-[1px] rounded-t-[15px] py-[11px] px-4">
                <Tabs defaultValue="chart">
                  <TabsList className="grid grid-cols-3 rounded-full p-0 w-full h-full bg-inherit">
                    <TabsTrigger
                      value="chart"
                      className="border-[1px] border-transparent text-secondary-foreground rounded-full data-[state=active]:text-primary data-[state=active]:border-primary"
                    >
                        Chart
                    </TabsTrigger>
                    <TabsTrigger
                      value="options"
                      className="border-[1px] border-transparent text-secondary-foreground rounded-full data-[state=active]:text-primary data-[state=active]:border-primary"
                    >
                        Options Price
                    </TabsTrigger>
                    <TabsTrigger
                      value="trades"
                      className="border-[1px] border-transparent text-secondary-foreground rounded-full data-[state=active]:text-primary data-[state=active]:border-primary"
                    >
                        Recent Trades
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <TradingViewChart/>
              <div className="py-3">
                <ProtectedRoute fallback={<TradingPositionsFallback/>}>
                    <TradingPositions />
                </ProtectedRoute>
              </div>
            </div>
            <div className="flex flex-col space-y-4 mx-auto">
              <OptionsCard />
              <PriceQuote />
            </div>
          </div>
    </div>
  );
}
