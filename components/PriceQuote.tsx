import { ArrowRightLeft, ChevronDown, ChevronUp, Circle } from "lucide-react";
import { DropdownMenuSeparator } from "./ui/dropdown-menu";
import { useState } from "react";
import PriceQuoteChart from "./PriceQuoteChart";

export default function PriceQuote(){
    const [dropDownActive, setDropDownActive] = useState<boolean>(false);


    return (
        <div className="text-accent space-y-6">
            <div className="flex justify-between text-xs font-normal px-1">
                <div className="flex justify-between items-center gap-2">
                    <span>1 BTC-6DEC24 9400 CALL</span>
                    <span>≈</span>
                    <span>0.004878195 BTC</span>
                    <ArrowRightLeft size={15}/>
                </div>
                <div 
                    className="flex justify-between items-center gap-2 cursor-pointer"
                    onClick={() => setDropDownActive(!dropDownActive)}
                >
                    <Circle size={15}/>
                    <span>Show More Info</span>
                    {dropDownActive ? <ChevronUp size={15}/> : <ChevronDown size={15}/>}
                </div>
            </div>
            {dropDownActive && (
                <div className="flex flex-col bg-backgroundSecondary rounded-2xl">
                    <div className="p-6 flex flex-col gap-4">
                        <div className="flex flex-col text-sm gap-2">
                            <div className="flex justify-between">
                                <span>Estimated Quote:</span>
                                <span>XXX</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Estimated Size of Trade:</span>
                                <span>XXX</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Price Impact:</span>
                                <span>XXX</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Available Liquidity:</span>
                                <span>XXX</span>
                            </div>
                        </div>
                        <div className="flex flex-col text-xs gap-2">
                            <div className="flex justify-between">
                                <span>Delta:</span>
                                <span>XXX</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Gamma:</span>
                                <span>XXX</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Theta:</span>
                                <span>XXX</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Vega:</span>
                                <span>XXX</span>
                            </div>
                        </div>
                    </div>
                    {/* <DropdownMenuSeparator className="w-full mx-auto"/>
                    <div className="p-6 flex flex-col space-y-4">
                        <div className="flex flex-col justify-between items-center">
                            <h1>XXX Price Now:</h1>
                            <h1>-$350</h1>
                        </div>
                        <div className="flex justify-between space-x-6">
                            <div className="flex flex-col justify-between items-center text-2xl my-auto">
                                <div className="cursor-pointer">+</div>
                                <span>0</span>
                                <div className="cursor-pointer">-</div>
                            </div>
                            <div className="w-full h-auto">
                                <PriceQuoteChart />
                            </div>
                        </div>
                    </div> */}
                </div>
            )}
            
        </div>
        
    )
}