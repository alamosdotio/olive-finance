'use client'
import CryptoNav from "@/components/CryptoNav";
import OptionsCard from "@/components/OptionsCard";
import TradingPositions from "@/components/TradingPositions";
import TradingViewWidget from "@/components/TradingViewWidget";
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
          <div className="flex flex-col-reverse lg:flex-row p-10 gap-10 max-w-screen-2xl">
            <div className="w-4/6 h-[500px] mx-auto space-y-1">
              <Tabs defaultValue="chart">
                  <TabsList className="grid grid-cols-3 rounded-b-none bg-input p-0 rounded-t-[15px]">
                    <TabsTrigger value="chart" className="border-2  p-2 bg-input rounded-none rounded-tl-[15px] data-[state=active]:text-primary data-[state=active]:bg-primary-foreground data-[state=active]:border-primary">Chart</TabsTrigger>
                    <TabsTrigger value="options" className="border-2  p-2 bg-input rounded-none data-[state=active]:text-primary data-[state=active]:bg-primary-foreground data-[state=active]:border-primary">Option Price</TabsTrigger>
                    <TabsTrigger value="trades" className="border-2  p-2 bg-input rounded-none rounded-tr-[15px] data-[state=active]:text-primary data-[state=active]:bg-primary-foreground data-[state=active]:border-primary">Recent Trades</TabsTrigger>
                  </TabsList>
              </Tabs>
              <TradingViewWidget />
              { isConnected && (
                <div className="py-3">
                  <TradingPositions />
                </div>
              )}
            </div>
            <div className="  mx-auto">
              <OptionsCard />
            </div>
          </div>
    </div>
  );
}
