import { PositionTypeIcon, PriceIcon, PurchaseDateIcon, PurchasePriceIcon } from "@/public/svgs/icons";
import Tpsl from "./Tpsl";

interface PositionDetailsProps{
    type: string;
}

export default function PositionDetails({type} : PositionDetailsProps){
    return (
            <div className='w-full flex flex-col space-y-1'>
                <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                    <div className='flex space-x-2 items-center'>
                        <PositionTypeIcon />
                        <span>Option Type:</span>
                    </div>
                    <span>{type}</span>
                </div>
                
                <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                    <div className='flex space-x-2 items-center'>
                        <PurchaseDateIcon />
                        <span>Purchase Date</span>
                    </div>
                    <span>10/30/2024</span>
                </div>

                <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                    <div className='flex space-x-2 items-center'>
                        <PriceIcon />
                        <span>Paid</span>
                    </div>
                    <span>---</span>
                </div>

                <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                    <div className='flex space-x-2 items-center'>
                        <PurchaseDateIcon />
                        <span>TPSL</span>
                    </div>
                    <div className='flex space-x-2 items-center'>
                        <span>---</span>
                        <Tpsl />
                    </div>
                </div>
            </div>
        )
}