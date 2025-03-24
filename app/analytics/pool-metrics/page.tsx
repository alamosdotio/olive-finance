import PoolMetricFilters from "@/components/PoolMetricFilters";
import PoolMetricStats from "@/components/PoolMetricStats";

export default function PoolMetrics(){
    return (
        <div className="w-full h-full flex flex-col">
            <section className="w-full px-2 py-9 flex flex-col space-y-5">
                <h1 className="text-2xl w-full px-4">Analytics</h1>
                <div className="w-full px-4">
                    <PoolMetricStats />
                </div>
            </section>
            <section className="w-full py-4 border-t border-b">
                <PoolMetricFilters />
            </section>
            <section className="w-full">
                <main className="grid grid-cols-2">
                    <div className="w-full border h-96">
                        Interest Rate chart
                    </div>
                    <div className="w-full border h-96">
                        Volatility Chart
                    </div>
                    <div className="w-full border h-96">
                        USDC Utilization Chart
                    </div>
                    <div className="w-full border h-96">
                        SOL Utilization Chart
                    </div>
                    <div className="w-full border h-96">
                        SLP Price Chart
                    </div>
                    <div className="w-full border h-96">
                        TVL Chart
                    </div>
                    <div className="w-full border h-96">
                        Volume Chart
                    </div>
                    <div className="w-full border h-96">
                        OI Chart
                    </div>
                    <div className="w-full border h-96">
                        Trades Chart
                    </div>
                    <div className="w-full border h-96">
                        Fees Chart
                    </div>
                    <div className="w-full border h-96">
                        Monthly Active Traders Chart
                    </div>
                    <div className="w-full border h-96">
                        New Users + Cumulative Users Chart
                    </div>
                    <div className="w-full border h-96">
                        Pool PNL Chart
                    </div>
                    <div className="w-full border h-96">
                        Performance Chart
                    </div>
                    <div className="w-full border h-96">
                         Chart
                    </div>
                </main>
            </section>
        </div>
    )
}