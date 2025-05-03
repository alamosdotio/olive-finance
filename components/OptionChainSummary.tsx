import { OptionChainData } from "@/lib/data/dummyData";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface OptionChainSummaryProps{
    idx: number;
    option: OptionChainData
}

export default function OptionChainSummary({idx, option} : OptionChainSummaryProps){

    if(idx === -1){
        return (
            <main className="w-full flex flex-col space-y-4 border rounded-sm justify-center items-center"  style={{ height: 'calc(100vh - 155px)' }}>
                <div className="flex flex-col space-y-3 items-center">
                    <h1 className="text-2xl font-medium">Trade Options</h1>
                    <span className="text-sm font-normal text-secondary-foreground">Selected option will appear here</span>
                </div>
            </main>
        )
    }else{
        return(
            <main className="w-full flex flex-col space-y-5 border rounded-sm p-4"  style={{ height: 'calc(100vh - 155px)' }}>
                <div className="space-y-2 text-sm text-secondary-foreground">
                    <Label>Contracts</Label>
                    <Input 
                        className="p-2 h-10 text-base font-medium border-border rounded-sm placeholder:text-secondary-foreground focus:border-primary"
                    />
                </div>
                <div className="space-y-2 text-sm text-secondary-foreground">
                    <Label>Limit Price</Label>
                    <Input 
                        className="p-2 h-10 text-base font-medium border-border rounded-sm placeholder:text-secondary-foreground focus:border-primary"
                    />
                </div>
                <div className="flex justify-between text-sm text-secondary-foreground">
                    <span>Strikeprice</span>
                    <span>${option.strikePrice}</span>
                </div>
                <div className="flex justify-between text-sm text-secondary-foreground">
                    <span>Bid Price</span>
                    <span>${option.bidPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-secondary-foreground">
                    <span>Balance</span>
                    <span>$XXXX</span>
                </div>
                <div className="flex justify-between text-sm text-secondary-foreground">
                    <span>Expected Profit/Loss</span>
                    <span>$XXX</span>
                </div>
                <Button className="w-full">
                    Review Order
                </Button>
                <div className="border rounded-sm h-40 flex justify-center items-center">
                    chart goes here
                </div>
            </main>
        )
    }
    
}