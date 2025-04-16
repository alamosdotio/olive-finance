import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function FuturesQuote(){
    const [dropDownActive, setDropDownActive] = useState<boolean>(true);
    return (
        <div className="border rounded-sm">
            <button
                className="classname px-6 py-3 w-full flex justify-between items-center cursor-pointer"
                onClick={() => setDropDownActive(!dropDownActive)}
            >
                <span className="text-sm text-secondary-foreground font-medium">
                    Order Summary
                </span>
                {dropDownActive ? <ChevronUp className="text-secondary-foreground text-sm w-4 h-4"/> : <ChevronDown className="text-secondary-foreground text-sm w-4 h-4"/>}
            </button>
            {dropDownActive && (
                <section className="border-t px-6 py-3 flex flex-col gap-1">
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
            )}
        </div>
    )
}