import TradeDetails from "@/components/TradeDetails";

export default function Analytics(){
    const transaction_ids = [
        "5CSCCx9kpJZXVs5jW38SScSiYN2myogLNoJa6GFXTDKMzgxuUWMWCwAAiWRa1CSXRLdFhXPMSuVvNpcfa3VrZwXG",
        // "3MZoKe9PHLCUkUg3DkkB6H6b6zMnqhP5ViFkSVGULcnmiCrDUDhKTBLjnGLYBaxr2pzVEHzQs6JnY2MwBLbQcv9"
    ]//should be a new sheet for every transaction, i think this has to be an array of multiple transaction instead of only one sheet that changes everytime
    
    return (
        <main className="w-full p-5 space-y-4">
            {transaction_ids.map((id) => (
                <TradeDetails id={id} key={id}/>
            ))}
        </main>
    )
}