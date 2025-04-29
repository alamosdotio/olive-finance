import { ChevronDown, ChevronUp, RotateCw} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import type { PythPriceState } from "@/hooks/usePythPrice";
import { CallIconDark, GrayDot, GreenDot, OrangeDot, PurpleDot, PutIconDark } from "@/public/svgs/icons";
import { tokenList } from "@/lib/data/tokenlist";
import { useOptionsPricing } from "@/hooks/useOptionsPricing";
import { black_scholes } from "@/utils/optionsPricing";
import { differenceInSeconds, differenceInYears } from "date-fns";
import { formatPrice } from "@/utils/formatter";

interface PriceQuoteProps{
    active: number
    value: string
    premium: number
    contractType: string
    priceData: PythPriceState
}

export default function PriceQuote({value, active, priceData, premium, contractType}:PriceQuoteProps){
    const [dropDownActive, setDropDownActive] = useState<boolean>(true);
    const [moreInfo, setMoreInfo] = useState<boolean>(false);
    const tokens = tokenList;
    const s = priceData.price ?? 0;

    const total = (s/premium)
    const minRec = parseFloat(value) * total

    // const seconds = differenceInSeconds(expiry, Date.now());
    // const t = seconds / (365 * 24 * 60 * 60);
    // const prem = black_scholes(s, k, t, true)    
    // console.log(`1 ${tokens[active].symbol} is $${s} and total premium is ${total} formula: ${s}/${prem}`)


    return (
        <div className={(value === '' || parseFloat(value) <= 0) ? 'hidden' : 'w-full border rounded-sm flex flex-col'}>
            <div 
                className="w-full flex justify-between items-center px-6 py-3"
                onClick={() => setDropDownActive(!dropDownActive)}
            >
                <span className="text-sm font-medium text-secondary-foreground h-6 items-center flex">Order Summary</span>
                <div className="flex space-x-3 items-center">
                    <Button
                        className="bg-secondary p-2 w-fit h-auto rounded-sm"
                    >
                        <RotateCw className="text-secondary-foreground"/>
                    </Button>
                    {dropDownActive ? <ChevronUp className="text-secondary-foreground text-sm w-4 h-4"/> : <ChevronDown className="text-secondary-foreground text-sm w-4 h-4"/>}
                </div>
                
            </div>
            {dropDownActive && (
                <div className="border-t-[1px] px-6 py-5 space-y-4">
                    <div className="w-full flex flex-col space-y-3">
                        <div className="w-full flex items-center justify-center space-x-2 bg-accent rounded-sm px-3 py-2 text-base font-normal whitespace-nowrap">
                            <div className="flex items-center space-x-1">
                                <span>1 {tokens[active].symbol}</span>
                                <Image src={tokens[active].iconPath} alt="eth" width={100} height={100} className="rounded-full w-4 h-4"/>
                            </div> 
                            <span>=</span> 
                            <span>{formatPrice(total)}</span> 
                            <div className="flex items-center space-x-1">
                                <span>{contractType}</span>
                                {contractType === 'Put' ? (
                                    <PutIconDark width="16" height="16"/>
                                ): (
                                    <CallIconDark width="16" height="16"/>
                                )}
                            </div>
                        </div>
                        <div className="w-full flex flex-col space-y-1">
                            <div className="w-full flex justify-between">
                                <div className="flex space-x-[6px] items-center">
                                    <span className="text-secondary-foreground text-sm font-normal">Minimum Received</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M7.99984 14.6665C11.6732 14.6665 14.6665 11.6732 14.6665 7.99984C14.6665 4.3265 11.6732 1.33317 7.99984 1.33317C4.3265 1.33317 1.33317 4.3265 1.33317 7.99984C1.33317 11.6732 4.3265 14.6665 7.99984 14.6665ZM8.49984 10.6665C8.49984 10.9398 8.27317 11.1665 7.99984 11.1665C7.7265 11.1665 7.49984 10.9398 7.49984 10.6665V7.33317C7.49984 7.05984 7.7265 6.83317 7.99984 6.83317C8.27317 6.83317 8.49984 7.05984 8.49984 7.33317V10.6665ZM7.3865 5.07984C7.41984 4.99317 7.4665 4.9265 7.5265 4.85984C7.59317 4.79984 7.6665 4.75317 7.7465 4.71984C7.8265 4.6865 7.91317 4.6665 7.99984 4.6665C8.0865 4.6665 8.17317 4.6865 8.25317 4.71984C8.33317 4.75317 8.4065 4.79984 8.47317 4.85984C8.53317 4.9265 8.57984 4.99317 8.61317 5.07984C8.6465 5.15984 8.6665 5.2465 8.6665 5.33317C8.6665 5.41984 8.6465 5.5065 8.61317 5.5865C8.57984 5.6665 8.53317 5.73984 8.47317 5.8065C8.4065 5.8665 8.33317 5.91317 8.25317 5.9465C8.09317 6.01317 7.9065 6.01317 7.7465 5.9465C7.6665 5.91317 7.59317 5.8665 7.5265 5.8065C7.4665 5.73984 7.41984 5.6665 7.3865 5.5865C7.35317 5.5065 7.33317 5.41984 7.33317 5.33317C7.33317 5.2465 7.35317 5.15984 7.3865 5.07984Z" fill="#808693"/>
                                    </svg>
                                </div>
                                <span className="text-secondary-foreground text-sm font-medium">{formatPrice(minRec)} {contractType}</span>
                            </div>
                            <div className="w-full flex justify-between">
                                <div className="flex space-x-[6px] items-center">
                                    <span className="text-secondary-foreground text-sm font-normal">Price Impact</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M7.99984 14.6665C11.6732 14.6665 14.6665 11.6732 14.6665 7.99984C14.6665 4.3265 11.6732 1.33317 7.99984 1.33317C4.3265 1.33317 1.33317 4.3265 1.33317 7.99984C1.33317 11.6732 4.3265 14.6665 7.99984 14.6665ZM8.49984 10.6665C8.49984 10.9398 8.27317 11.1665 7.99984 11.1665C7.7265 11.1665 7.49984 10.9398 7.49984 10.6665V7.33317C7.49984 7.05984 7.7265 6.83317 7.99984 6.83317C8.27317 6.83317 8.49984 7.05984 8.49984 7.33317V10.6665ZM7.3865 5.07984C7.41984 4.99317 7.4665 4.9265 7.5265 4.85984C7.59317 4.79984 7.6665 4.75317 7.7465 4.71984C7.8265 4.6865 7.91317 4.6665 7.99984 4.6665C8.0865 4.6665 8.17317 4.6865 8.25317 4.71984C8.33317 4.75317 8.4065 4.79984 8.47317 4.85984C8.53317 4.9265 8.57984 4.99317 8.61317 5.07984C8.6465 5.15984 8.6665 5.2465 8.6665 5.33317C8.6665 5.41984 8.6465 5.5065 8.61317 5.5865C8.57984 5.6665 8.53317 5.73984 8.47317 5.8065C8.4065 5.8665 8.33317 5.91317 8.25317 5.9465C8.09317 6.01317 7.9065 6.01317 7.7465 5.9465C7.6665 5.91317 7.59317 5.8665 7.5265 5.8065C7.4665 5.73984 7.41984 5.6665 7.3865 5.5865C7.35317 5.5065 7.33317 5.41984 7.33317 5.33317C7.33317 5.2465 7.35317 5.15984 7.3865 5.07984Z" fill="#808693"/>
                                    </svg>
                                </div>
                                <span className="text-secondary-foreground text-sm font-medium">{`<0.01%`}</span>
                            </div>
                        </div>
                    </div>
                    {moreInfo && (
                        <>
                            <div className="w-full flex flex-col space-y-1">
                                <div className="w-full flex justify-between">
                                    <div className="flex space-x-[6px] items-center">
                                        <span className="text-secondary-foreground text-sm font-normal">Liquidity Available</span>
                                    </div>
                                    <span className="text-secondary-foreground text-sm font-medium">5 USDC</span>
                                </div>
                                <div className="w-full flex justify-between">
                                    <div className="flex space-x-[6px] items-center">
                                        <span className="text-secondary-foreground text-sm font-normal">Fees</span>
                                    </div>
                                    <span className="text-sm font-medium text-primary">0.10%</span>
                                </div>
                            </div>
                            {/* <div className="w-full flex space-x-4 justify-between">
                                <div className="w-full flex bg-backgroundSecondary rounded-[10px] justify-center items-center">
                                    chart goes here
                                </div>
                                <div className="w-full border rounded-[10px] p-3 flex flex-col space-y-[6px]">
                                    <div className="w-full flex justify-between">
                                        <div className="flex gap-1 items-center">
                                            <GreenDot />
                                            <span className="text-[10px] text-secondary-foreground font-normal">Max Profit</span>
                                        </div>
                                        <span className="text-[10px] text-secondary-foreground font-medium">Unlimited</span>
                                    </div>
                                    <div className="w-full flex justify-between">
                                        <div className="flex gap-1 items-center">
                                            <PurpleDot />
                                            <span className="text-[10px] text-secondary-foreground font-normal">Max Loss</span>
                                        </div>
                                        <span className="text-[10px] text-secondary-foreground font-medium">-$710.00</span>
                                    </div>
                                    <div className="w-full flex justify-between">
                                        <div className="flex gap-1 items-center">
                                            <GrayDot />
                                            <span className="text-[10px] text-secondary-foreground font-normal">Breakeven</span>
                                        </div>
                                        <span className="text-[10px] text-secondary-foreground font-medium">$177.10</span>
                                    </div>
                                    <div className="w-full flex justify-between">
                                        <div className="flex gap-1 items-center">
                                            <OrangeDot />
                                            <span className="text-[10px] text-secondary-foreground font-normal">TSLA Price Now</span>
                                        </div>
                                        <span className="text-[10px] text-foreground font-medium">$170.99</span>
                                    </div>
                                </div>
                            </div> */}
                        </>
                    )}
                    <div className="w-full flex justify-start">
                        <Button 
                            className="bg-inherit p-0 space-x-2 shadow-none text-primary"
                            onClick={() => setMoreInfo(!moreInfo)}
                        >
                            {moreInfo ? (
                                <>
                                    Less Info
                                    <ChevronUp />
                                </>
                            ) : (
                                <>
                                    More Info
                                    <ChevronDown />
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}