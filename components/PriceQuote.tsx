import { ChevronDown, ChevronUp} from "lucide-react";
import { useState } from "react";

interface PriceQuoteProps{
    value: string
}

export default function PriceQuote({value}:PriceQuoteProps){
    const [dropDownActive, setDropDownActive] = useState<boolean>(true);


    return (
        <div className={value === '' ? 'hidden' : 'w-full border rounded-[26px] flex flex-col'}>
            <div 
                className="w-full flex justify-between items-center px-6 py-[18px]"
                onClick={() => setDropDownActive(!dropDownActive)}
            >
                <span className="text-sm font-medium text-secondary-foreground h-6 items-center flex">Order Summary</span>
                {dropDownActive ? <ChevronUp className="text-secondary-foreground text-sm"/> : <ChevronDown className="text-secondary-foreground text-sm"/>}
            </div>
            {dropDownActive && (
                <div className="border-t-[1px] px-6 py-5 space-y-4">
                    <div className="flex flex-col gap-1 text-secondary-foreground text-sm">
                        <div className="flex justify-between">
                            <span>Sell Order</span>
                            <span>X USDC</span>
                        </div>
                        <div className="flex justify-between">
                            <span>To buy</span>
                            <span>0.XXXXX SOL</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Buy SOL at Rate</span>
                            <span>XXXX USDC</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Expiry</span>
                            <span>Never</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Platform fee</span>
                            <span>0.10%</span>
                        </div>
                    </div>
                    <div className="bg-backgroundSecondary px-4 py-3 rounded-[15px]">
                        <p className="text-sm w-fit mx-auto">
                            You will receive exactly what you have specified,<br />
                            minus platform fees. Learn more.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}