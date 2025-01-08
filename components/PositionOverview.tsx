import { ExpiryIcon, PositionTypeIcon, RedArrowPnl, SizeIcon, StrikePriceIcon, ValueIcon } from "@/public/svgs/icons"

interface PositionOverviewProps{
    type: string
    expiry: string
    size: number
    pnl: number
}

export default function PositionOverview({type, expiry, size, pnl} : PositionOverviewProps){
    return (
        <div className='w-full flex flex-col space-y-1'>
            <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                <div className='flex space-x-2 items-center'>
                    <PositionTypeIcon />
                    <span>Position Type:</span>
                </div>
                <span>{type}</span>
            </div>
            <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                <div className='flex space-x-2 items-center'>
                    <ExpiryIcon />
                    <span>Expiry:</span>
                </div>
                <span>{expiry}</span>
            </div>
            <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                <div className='flex space-x-2 items-center'>
                    <SizeIcon />
                    <span>Size:</span>
                </div>
                <span>{size}</span>
            </div>
            <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                <div className='flex space-x-2 items-center'>
                    <StrikePriceIcon />
                    <span>Strike Price:</span>
                </div>
                <span>strike price</span>
            </div>
            <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                <div className='flex space-x-2 items-center'>
                    <ValueIcon />
                    <span>Value:</span>
                </div>
                <span>value</span>
            </div>
            <div className='w-full flex justify-between text-sm text-[#FF6889] font-normal'>
                <div className='flex space-x-2 items-center'>
                    <RedArrowPnl />
                    <span>P&L:</span>
                </div>
                <span>{pnl}</span>
            </div>
        </div>
    )
}