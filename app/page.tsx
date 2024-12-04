'use client'
import CryptoNav from "@/components/CryptoNav";
import OptionsCard from "@/components/OptionsCard";
import TradingPositions from "@/components/TradingPositions";
import TradingViewWidget from "@/components/TradingViewWidget";
import { useWallet } from "@/contexts/walletprovider";



export default function Home() {
  const { isConnected } = useWallet();
  return (
    <div className="flex flex-col">
          <div>
          <CryptoNav />
          </div>
          <div className="flex flex-col lg:flex-row p-10 gap-10">
            <div className="w-screen lg:w-2/3 space-y-6">
              <TradingViewWidget />
              { isConnected && (
                <TradingPositions />
              )}
            </div>
            <div className="w-screen lg:w-1/3">
              <OptionsCard />
            </div>
          </div>
    </div>
  );
}
