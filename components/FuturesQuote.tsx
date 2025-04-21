import { ChevronDown } from "lucide-react";

export default function FuturesQuote(){
    return (
        <div className="border rounded-sm">
            <section className="classname px-6 py-3 border-b flex justify-between items-center">
                <span className="text-sm text-secondary-foreground font-medium">
                    Order Summary
                </span>
                <ChevronDown className="w-4 h-4 text-secondary-foreground"/>
            </section>
            <section className="px-6 py-3 flex flex-col gap-1">
                <div className="flex justify-between text-sm text-secondary-foreground font-normal">
                    <span>Entry Price</span>
                    <span>X</span>
                </div>
                <div className="flex justify-between text-sm text-secondary-foreground font-normal">
                    <span>Liquidation Price</span>
                    <span>X</span>
                </div>
                <div className="flex justify-between text-sm text-secondary-foreground font-normal">
                    <span>Open Fee</span>
                    <span>X</span>
                </div>
                <div className="flex justify-between text-sm text-secondary-foreground font-normal">
                    <span>Price Impact</span>
                    <span>X</span>
                </div>
                <div className="flex justify-between text-sm text-secondary-foreground font-normal">
                    <span>Borrow Fees Due</span>
                    <span>X</span>
                </div>
                <div className="flex justify-between text-sm text-secondary-foreground font-normal">
                    <span>Transaction Fee</span>
                    <span>X</span>
                </div>
                <div className="flex justify-between text-sm text-secondary-foreground font-normal">
                    <span>Account Rent</span>
                    <span>X</span>
                </div>
            </section>
        </div>
    )
}