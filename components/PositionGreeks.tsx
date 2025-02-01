import { DeltaIcon, GammaIcon, RhoIcon, ThetaIcon, VegaIcon } from "@/public/svgs/icons"
import { Button } from "./ui/button"
import PositionAdvancedGreeks from "./PositionAdvancedGreeks"

interface PositionGreeksProps{
    delta: number
    gamma: number
    theta: number
    vega: number
}

export default function PositionGreeks({delta, gamma, theta, vega} : PositionGreeksProps){
    return (
        <div className='w-full flex flex-col space-y-4'>
            <div className='w-full flex flex-col space-y-1'>
                <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                    <div className='flex space-x-2 items-center'>
                        <DeltaIcon />
                        <span>Delta: </span>
                    </div>
                    <span>{delta}</span>
                </div>
                <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                    <div className='flex space-x-2 items-center'>
                        <GammaIcon />
                        <span>Gamma: </span>
                    </div>
                    <span>{gamma}</span>
                </div>
                <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                    <div className='flex space-x-2 items-center'>
                        <ThetaIcon />
                        <span>Theta: </span>
                    </div>
                    <span>{theta}</span>
                </div>
                <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                    <div className='flex space-x-2 items-center'>
                        <VegaIcon />
                        <span>Vega: </span>
                    </div>
                    <span>{vega}</span>
                </div>
                <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                    <div className='flex space-x-2 items-center'>
                        <RhoIcon />
                        <span>Rho: </span>
                    </div>
                    <span>0.9812</span>
                </div>
            </div>
            <PositionAdvancedGreeks />
        </div>
    )
}