import CryptoNav from "@/components/CryptoNav";
import OptionsCard from "@/components/OptionsCard";
import TradingViewWidget from "@/components/TradingViewWidget";


export default function Home() {
  return (
    <div className="space-y-6 flex flex-col">
          <CryptoNav />
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-2/3 h-[600px] py-10 px-4">
              <TradingViewWidget />
            </div>
            <div className="w-full lg:w-1/2">
              <OptionsCard />
            </div>
          </div>
    </div>
  );
}
