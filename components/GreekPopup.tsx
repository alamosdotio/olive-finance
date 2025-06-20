import { DeltaIcon, GammaIcon, RhoIcon, ThetaIcon, VegaIcon } from "@/public/svgs/icons";
import { formatGreek } from "@/utils/formatter";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface GreekPopupProps{
    value: string
    delta: number
    gamma: number
    theta: number
    vega: number
    rho: number
}

export default function GreekPopup({value, delta, gamma, theta, vega, rho} : GreekPopupProps){
    const [dropDownActive, setDropDownActive] = useState<boolean>(true);
    return (
        <div className={value === '' || parseFloat(value) <= 0 ? 'hidden' : 'w-full border rounded-sm flex flex-col'}>
            <div 
                className="w-full flex justify-between items-center px-6 py-4"
                onClick={() => setDropDownActive(!dropDownActive)}
            >
                <span className="text-sm font-medium text-secondary-foreground h-fit">Greeks</span>
                {dropDownActive ? <ChevronUp className="text-secondary-foreground text-sm w-4 h-4"/> : <ChevronDown className="text-secondary-foreground text-sm w-4 h-4"/>}
            </div>
            {dropDownActive && (
                <div className="border-t px-6 py-5 space-y-4">
                    <div className="flex flex-col gap-1 text-secondary-foreground text-sm">
                        <div className="flex justify-between">
                            <div className="flex space-x-2 items-center">
                                <DeltaIcon />
                                <span>Delta</span>
                            </div>
                            <span>{formatGreek(delta)}</span>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex space-x-2 items-center">
                                <GammaIcon />
                                <span>Gamma</span>
                            </div>
                            <span>{formatGreek(gamma)}</span>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex space-x-2 items-center">
                                <ThetaIcon />
                                <span>Theta</span>
                            </div>
                            <span>{formatGreek(theta)}</span>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex space-x-2 items-center">
                                <VegaIcon />
                                <span>Vega</span>
                            </div>
                            <span>{formatGreek(vega)}</span>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex space-x-2 items-center">
                                <RhoIcon />
                                <span>Rho</span>
                            </div>
                            <span>{formatGreek(rho)}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}