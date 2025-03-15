import { DeltaIcon, GammaIcon, GreenDot, InfoIcon, OrangeDot, PurpleDot, ThetaIcon, VegaIcon } from "@/public/svgs/icons";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { PnLChart } from "./PnlChart";


export default function PnlChartContainer(){
    const currentPrice = 132.72;
    const investment = 100;
    const premiumPerContract = 2.1893; // Premium per contract
    const numContracts = investment / premiumPerContract;
    return (
        <div className="flex flex-col h-full border border-t-0 rounded-b-[26px]">
            {/* <div className="w-full flex px-5 py-1 border-b">
                <div className="w-full flex space-x-2 justify-between items-center">
                    <span className="h-6 text-base text-secondary-foreground font-medium">PNL Graph</span>
                    <div className="flex space-x-2 items-center">
                        <div className="flex space-x-1 items-center">
                            <PurpleDot />
                            <GreenDot />
                        </div>
                        <span className="text-sm text-secondary-foreground">Expiry</span>
                    </div>
                </div>
                <Separator orientation='vertical' className='mx-2 h-8 bg-backgroundSecondary'/>
                <div className="flex space-x-2 items-center">
                    <div className="flex space-x-1 items-center">
                        <OrangeDot />
                    </div>
                    <span className="text-sm text-secondary-foreground whitespace-nowrap">Theoretical Payoff</span>
                </div>
            </div> */}
            <div className="w-full h-full">
            <PnLChart 
                strikePrice={currentPrice}
                premium={investment}
                contractType="call"
                positionType="long"
                currentPrice={currentPrice}
                multiplier={numContracts}
                />
            </div>
            <div className="w-full flex px-5 py-2 border-t justify-between">
                <div className="w-full flex space-x-6 items-center">
                    <div className="flex space-x-2 items-center text-secondary-foreground">
                        <DeltaIcon />
                        <span className="text-sm text-secondary-foreground font-medium">54.68</span>
                        <InfoIcon />
                    </div>
                    <div className="flex space-x-2 items-center text-secondary-foreground">
                        <GammaIcon />
                        <span className="text-sm text-secondary-foreground font-medium">-3514.27</span>
                        <InfoIcon />
                    </div>
                    <div className="flex space-x-2 items-center text-secondary-foreground">
                        <ThetaIcon />
                        <span className="text-sm text-secondary-foreground font-medium">0.19</span>
                        <InfoIcon />
                    </div>
                    <div className="flex space-x-2 items-center text-secondary-foreground">
                        <VegaIcon />
                        <span className="text-sm text-secondary-foreground font-medium">501.98</span>
                        <InfoIcon />
                    </div>
                </div>
                <div className="w-full flex justify-end space-x-2 items-center">
                    <span className="text-sm text-secondary-foreground font-medium">Standard Deviation</span>
                    <Button className="bg-backgroundSecondary px-2 py-1 space-x-4 shadow-none text-secondary-foreground rounded-[10px]">
                        <Minus />
                        <span>01</span>
                        <Plus />
                    </Button>
                </div>
            </div>
        </div>
    )
}