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
        </div>
    )
}