import { ArrowRightLeft, ChevronDown, ChevronUp, Circle } from "lucide-react";
import { DropdownMenuSeparator } from "./ui/dropdown-menu";
import { useState } from "react";
import PriceQuoteChart from "./PriceQuoteChart";

export default function PriceQuote(){
    const [dropDownActive, setDropDownActive] = useState<boolean>(false);


    return (
        <div className="w-full border-[1px] rounded-[15px]">
            <div 
                className="px-6 py-4 flex justify-between w-full"
                onClick={() => setDropDownActive(!dropDownActive)}
            >
                <span className="text-sm font-medium text-secondary-foreground">Limit Order Summary</span>
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
        // <div className="text-accent space-y-6">
        //     <div className="flex justify-between text-xs font-normal px-1">
        //         <div className="flex justify-between items-center gap-2">
        //             <span>1 BTC-6DEC24 9400 CALL</span>
        //             <span>≈</span>
        //             <span>0.004878195 BTC</span>
        //             <ArrowRightLeft size={15}/>
        //         </div>
        //         <div 
        //             className="flex justify-between items-center gap-2 cursor-pointer"
        //             onClick={() => setDropDownActive(!dropDownActive)}
        //         >
        //             <Circle size={15}/>
        //             <span>Show More Info</span>
        //             {dropDownActive ? <ChevronUp size={15}/> : <ChevronDown size={15}/>}
        //         </div>
        //     </div>
        //     {dropDownActive && (
        //         <div className="flex flex-col bg-backgroundSecondary rounded-2xl">
        //             <div className="p-6 flex flex-col gap-4">
        //                 <div className="flex flex-col text-sm gap-2">
        //                     <div className="flex justify-between">
        //                         <span>Estimated Quote:</span>
        //                         <span>XXX</span>
        //                     </div>
        //                     <div className="flex justify-between">
        //                         <span>Estimated Size of Trade:</span>
        //                         <span>XXX</span>
        //                     </div>
        //                     <div className="flex justify-between">
        //                         <span>Price Impact:</span>
        //                         <span>XXX</span>
        //                     </div>
        //                     <div className="flex justify-between">
        //                         <span>Available Liquidity:</span>
        //                         <span>XXX</span>
        //                     </div>
        //                 </div>
        //                 <div className="flex flex-col text-xs gap-2">
        //                     <div className="flex justify-between">
        //                         <span>Delta:</span>
        //                         <span>XXX</span>
        //                     </div>
        //                     <div className="flex justify-between">
        //                         <span>Gamma:</span>
        //                         <span>XXX</span>
        //                     </div>
        //                     <div className="flex justify-between">
        //                         <span>Theta:</span>
        //                         <span>XXX</span>
        //                     </div>
        //                     <div className="flex justify-between">
        //                         <span>Vega:</span>
        //                         <span>XXX</span>
        //                     </div>
        //                 </div>
        //             </div>
        //             <DropdownMenuSeparator className="w-full mx-auto"/>
        //             <div className="p-6 flex flex-col space-y-4">
        //                 <div className="flex flex-col justify-between items-center">
        //                     <h1>XXX Price Now:</h1>
        //                     <h1>-$350</h1>
        //                 </div>
        //                 <div className="flex justify-between space-x-6">
        //                     <div className="flex flex-col justify-between items-center text-2xl my-auto">
        //                         <div className="cursor-pointer">+</div>
        //                         <span>0</span>
        //                         <div className="cursor-pointer">-</div>
        //                     </div>
        //                     <div className="w-full h-auto">
        //                         <PriceQuoteChart />
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     )}
            
        // </div>
        
    )
}