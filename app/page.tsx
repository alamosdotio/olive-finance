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
            <div className="w-full mx-auto">
              <Tabs className="p-0">
                  <TabsList className="grid grid-cols-3 rounded-b-none bg-inherit p-0">
                    <TabsTrigger value="chart" className="border-2 rounded-none rounded-tl-[15px]">Chart</TabsTrigger>
                    <TabsTrigger value="options" className="border-2 rounded-none">Option Price</TabsTrigger>
                    <TabsTrigger value="trades" className="border-2 rounded-none rounded-tr-[15px]">Recent Trades</TabsTrigger>
                  </TabsList>
              </Tabs>
              <TradingViewWidget />
              { isConnected && (
                <div className="py-6">
                  <TradingPositions />
                </div>
              )}
            </div>
            <div className="max-w-[600px] w-full mx-auto">
              <OptionsCard />
            </div>
          </div>
    </div>
  );
}
