import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface GreekPopupProps{
    value: string
}

export default function GreekPopup({value} : GreekPopupProps){
    const [dropDownActive, setDropDownActive] = useState<boolean>(true);
    return (
        <div className={value === '' ? 'hidden' : 'w-full border rounded-[26px] flex flex-col'}>
            <div 
                className="w-full flex justify-between items-center px-6 py-[18px]"
                onClick={() => setDropDownActive(!dropDownActive)}
            >
                <span className="text-sm font-medium text-secondary-foreground h-fit">Greeks</span>
                {dropDownActive ? <ChevronUp className="text-secondary-foreground text-sm"/> : <ChevronDown className="text-secondary-foreground text-sm"/>}
            </div>
            {dropDownActive && (
                <div className="border-t px-6 py-5 space-y-4">
                    <div className="flex flex-col gap-1 text-secondary-foreground text-sm">
                        <div className="flex justify-between">
                            <div className="flex space-x-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M2.33325 11.6663H11.6666L6.99992 2.33301L2.33325 11.6663Z" stroke="#808693" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>Delta</span>
                            </div>
                            <span>0.7914</span>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex space-x-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M9.91675 2.33301H5.66675C5.11446 2.33301 4.66675 2.78072 4.66675 3.33301V11.6663" stroke="#808693" strokeLinecap="round"/>
                                </svg>
                                <span>Gamma</span>
                            </div>
                            <span>0.0723</span>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex space-x-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M10.5834 6.99967C10.5834 9.36566 8.91847 11.1663 7.00008 11.1663C5.08169 11.1663 3.41675 9.36566 3.41675 6.99967C3.41675 4.63369 5.08169 2.83301 7.00008 2.83301C8.91847 2.83301 10.5834 4.63369 10.5834 6.99967Z" stroke="#808693"/>
                                    <path d="M5.25 7H8.75" stroke="#808693" strokeLinecap="round"/>
                                </svg>
                                <span>Theta</span>
                            </div>
                            <span>-1.1042</span>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex space-x-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M2.91675 2.33301L5.89623 9.56889C6.22723 10.3727 7.35556 10.4005 7.72572 9.61393L11.152 2.33301" stroke="#808693" strokeLinecap="round"/>
                                </svg>
                                <span>Vega</span>
                            </div>
                            <span>0.2471</span>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex space-x-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M4.08325 11.6663V7.84124M4.08325 7.84124V3.28173C4.08325 2.76798 4.47245 2.33371 4.9862 2.33302C6.89608 2.33046 9.54772 2.87119 9.54772 5.10898C9.54772 7.73192 5.90474 8.02338 4.08325 7.84124Z" stroke="#808693" strokeLinecap="round"/>
                                </svg>
                                <span>Rho</span>
                            </div>
                            <span>0.9812</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}