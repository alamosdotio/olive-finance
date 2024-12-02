import LiquidityTable from "@/components/LiquidityTable";
import PoolBuy from "@/components/PoolBuy";
import PoolChart from "@/components/PoolChart";
import PoolInfo from "@/components/PoolInfo";

export default function Pool(){
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto p-4">
                <div className="grid gap-6 md:grid-cols-[1fr_300px]">
                    <div className="space-y-6">
                        <div className="rounded-lg border bg-card p-6">
                            <h1 className="mb-4 text-xl font-semibold">OFLP Pool</h1>
                            <PoolChart />
                        </div>
                        <div className="rounded-lg border bg-card p-6">
                            <div className="mb-6">
                                <h2 className="text-sm text-muted-foreground">Total Value Locked</h2>
                                <div className="flex items-baseline gap-1">
                                    <span>$1,209,251,188.15</span>
                                </div>
                                <div>
                                    AUM Limit: $1,500,000,000
                                </div>
                            </div>
                            <LiquidityTable />
                        </div>
                        <div className="rounded-lg border bg-card p-6">
                            <PoolInfo />
                        </div>
                    </div>
                    <div className="h-fit rounded-lg border bg-card">
                        <PoolBuy />
                    </div>
                </div>
            </div>

        </div>
    )
}