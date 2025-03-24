import TradeDetails from "@/components/TradeDetails";

export default function Analytics(){
    const transaction_ids = [
        "TXN1234567890",
        "TXN9876543210",
        "TXN2468135790",
        "TXN1122334455",
        "TXN9988776655",
        "TXN5566778899"
    ]
    
    return (
        <main className="w-full p-5 space-y-4">
            {transaction_ids.map((id) => (
                <TradeDetails id={id} key={id}/>
            ))}
        </main>
    )
}