import FeesChart from "@/components/charts/fees-chart";
import MonthlyActiveTraders from "@/components/charts/monthly-active-traders-chart";
import NewUsersChart from "@/components/charts/new-users";
import OIChart from "@/components/charts/oi-chart";
import PerformanceChart from "@/components/charts/performance-chart";
import PoolPnlChart from "@/components/charts/pool-pnl";
import PoolPriceChart from "@/components/charts/pool-price-chart";
import TokenInterestRate from "@/components/charts/token-interest-rate";
import TradesChart from "@/components/charts/trades";
import TvlChart from "@/components/charts/tvl-chart";
import UtilizationChart from "@/components/charts/utilization-chart";
import VolatilityChart from "@/components/charts/volatility";
import VolumeChart from "@/components/charts/volume-chart";
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
                <main className="grid grid-cols-2 grid-rows-8">
                    <div className="w-full border h-96 p-5">
                        <TokenInterestRate 
                            token="SOL"
                        />
                    </div>
                    <div className="w-full border h-96 p-5">
                        <TokenInterestRate 
                            token="USDC"
                        />
                    </div>
                    <div className="w-full border p-5">
                        <VolatilityChart
                            type="Call"
                        />
                    </div>
                    <div className="w-full border p-5">
                        <VolatilityChart
                            type="Put"
                        />
                    </div>
                    <div className="w-full border p-5">
                        <UtilizationChart
                            token="USDC"
                        />
                    </div>
                    <div className="w-full border p-5">
                         <UtilizationChart
                            token="SOL"
                        />
                    </div>
                    <div className="w-full border p-5">
                        <PoolPriceChart 
                            lp="SLP"
                        />
                    </div>
                    <div className="w-full border p-5">
                        <TvlChart />
                    </div>
                    <div className="w-full border p-5">
                        <VolumeChart />
                    </div>
                    <div className="w-full border p-5">
                        <OIChart />
                    </div>
                    <div className="w-full border p-5">
                        <TradesChart />
                    </div>
                    <div className="w-full border p-5">
                        <FeesChart />
                    </div>
                    <div className="w-full border p-5">
                        <MonthlyActiveTraders />
                    </div>
                    <div className="w-full border p-5">
                        <NewUsersChart />
                    </div>
                    <div className="w-full border p-5">
                        <PoolPnlChart />
                    </div>
                    <div className="w-full border p-5">
                        <PerformanceChart />
                    </div>
                </main>
            </section>
        </div>
    )
}