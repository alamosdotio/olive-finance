import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface StrategyFiltersProps {
    sortBy: string
    setSortBy: (value:string) => void
    strategyType: string
    setStrategyType: (value:string) => void
    depositAsset: string
    setDepositAsset: (value:string) => void
}

export default function StrategyFilters({sortBy, setSortBy, strategyType, setStrategyType, depositAsset, setDepositAsset} : StrategyFiltersProps){
    return (
        <section>
            <div className="flex justify-between">
                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="max-w-max h-[40px] focus:outline-none">
                    <div className="flex items-center space-x-2">
                        <SelectValue placeholder="Featured Strategies"/>
                    </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="featured" >Featured Strategies</SelectItem>
                        <SelectItem value="tvl" >Popularity (TVL)</SelectItem>
                        <SelectItem value="apy" >APY</SelectItem>
                    </SelectContent>
                </Select>
                <div className="flex gap-2">
                    <Select value={strategyType} onValueChange={setStrategyType}>
                        <SelectTrigger className="max-w-max h-[40px] focus:outline-none justify-between hidden">
                        <div className="flex items-center space-x-2">
                            <SelectValue placeholder="All Strategies"/>
                        </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all" >All Strategies</SelectItem>
                            <SelectItem value="O" >Options</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={depositAsset} onValueChange={setDepositAsset}>
                        <SelectTrigger className="max-w-max h-[40px] focus:outline-none">
                        <div className="flex items-center space-x-2">
                            <SelectValue placeholder="Deposit Asset"/>
                        </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all" >All Deposit Assets</SelectItem>
                            <SelectItem value="BTC" >BTC</SelectItem>
                            <SelectItem value="ETH" >ETH</SelectItem>
                            <SelectItem value="USDT" >USDT</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </section>
    )
}