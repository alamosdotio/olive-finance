import { PriceIcon, PurchaseDateIcon, PurchasePriceIcon } from "@/public/svgs/icons";

export default function(){
    return (
            <div className='w-full flex flex-col space-y-1'>
                <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                    <div className='flex space-x-2 items-center'>
                        <PurchasePriceIcon />
                        <span>Purchase Price</span>
                    </div>
                    <span>0.7914</span>
                </div>
                <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                    <div className='flex space-x-2 items-center'>
                        <PriceIcon />
                        <span>Price</span>
                    </div>
                    <span>0.0723</span>
                </div>
                <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                    <div className='flex space-x-2 items-center'>
                        <PurchaseDateIcon />
                        <span>Purchase Date</span>
                    </div>
                    <span>10/30/2024</span>
                </div>
            </div>
        )
}