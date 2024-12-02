export default function LiquidityTable(){
    //array 
    const liquidityData = [
        {
            token: 'SOL',
            symbol: 'SOL',
            poolSize: '$625,780,175.79',
            amount: '2,428,250.27 SOL',
            weightage: '44.74% / 47%',
            utilization: '99.6%'
        },
        {
            token: 'ETH',
            symbol: 'ETH',
            poolSize: '$144,672,561.61',
            amount: '41,902.49 ETH',
            weightage: '10.36% / 10%',
            utilization: '46.74%'
        },
        {
            token: 'WBTC',
            symbol: 'WBTC',
            poolSize: '$163,212,146.71',
            amount: '1,610.11 WBTC',
            weightage: '11.7% / 11%',
            utilization: '90.15%'
        },
        {
            token: 'USDC',
            symbol: 'USDC',
            poolSize: '$350,578,160.76',
            amount: '350,578,160.21 USDC',
            weightage: '25.15% / 26%',
            utilization: '5.7%'
        },
    ]


    return (
        <div>
            <h2 className="mb-4 text-lg font-semibold">Liquidity Allocation</h2>
            <div className="relative overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b text-sm text-muted-foreground">
                            <th className="pb-3 font-medium">Token</th>
                            <th className="pb-3 font-medium">Pool Size</th>
                            <th className="pb-3 font-medium">Current / Target Weightage</th>
                            <th className="pb-3 font-medium">Utilization</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {liquidityData.map((item) => (
                            <tr key={item.token} className="border-b last:border-0">
                                <td className="py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-6 w-6 rounded-full bg-primary" />
                                            <div>
                                                <div>{item.token}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {item.symbol === item.token ? "Wrapped Sol" : `Wrapped ${item.symbol}`}
                                                </div>
                                            </div>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <div>{item.poolSize}</div>
                                    <div className="text-xs text-muted-foreground">{item.amount}</div>
                                </td>
                                <td className="py-4">{item.weightage}</td>
                                <td className="py-4">{item.utilization}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="border-t text-sm">
                            <td className="pt-4">
                                <div className="text-xs text-muted-foreground">OFLP Price</div>
                                <div>$4.055</div>
                            </td>
                            <td className="pt-4" colSpan={3}>
                                <div>Total Supply</div>
                                <div className="text-xs text-muted-foreground">298,896,614.06 OFLP</div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}