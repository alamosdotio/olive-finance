export default function PoolMetricStats(){
    const stats = [
        {label: 'Total Users', data: '100000'},
        {label: 'Total TVL', data:'$100000000'},
        {label: 'Total Volume', data:'$100000000'},
        {label: 'Total Fees', data: '$100000000'},
        {label: 'Total Trades', data: '$10000000'}

    ]
    return (
        <div className="w-full flex space-x-4">
            {stats.map((stat, idx) => (
                <div className="w-32 flex flex-col space-y-2 justify-center" key={idx}>
                    <span className="text-secondary-foreground text-sm">{stat.label}</span>
                    <span className="text-foreground">{stat.data}</span>
                </div>
            ))}
        </div>
    )
}