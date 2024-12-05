import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import btc from '../public/images/bitcoin.png'
import { ChevronRight } from "lucide-react";

export default function CryptoNav(){
    return (
        <div className="flex justify-between h-14 border-[1px] rounded-none p-2"> 
            <div className="flex items-center  gap-2">
                <div className={cn(buttonVariants({variant: 'unselected'}),"flex items-center space-x-4 px-4 w-auto h-auto rounded-xl")}>
                    <div className="flex w-auto items-center space-x-2">
                        <Image src={btc} alt="bitcoin" height={24} width={24}/>
                        <span className="font-medium">BTC</span>
                        <span className="text-red-500">↓ 1.30%</span>
                    </div>
                </div>
                <div className={cn(buttonVariants({variant: 'unselected'}),"flex items-center space-x-4 px-4 w-auto h-auto rounded-xl")}>
                    <div className="flex w-auto items-center space-x-2">
                        <Image src={btc} alt="bitcoin" height={24} width={24}/>
                        <span className="font-medium">BTC</span>
                        <span className="text-red-500">↓ 1.30%</span>
                    </div>
                </div>
                <div className={cn(buttonVariants({variant: 'unselected'}),"flex items-center space-x-4 px-4 w-auto h-auto rounded-xl")}>
                    <div className="flex w-auto items-center space-x-2">
                        <Image src={btc} alt="bitcoin" height={24} width={24}/>
                        <span className="font-medium">BTC</span>
                        <span className="text-red-500">↓ 1.30%</span>
                    </div>
                </div>
                {/* <div className={cn(buttonVariants({variant: 'unselected'}),"flex items-center space-x-4 px-4 w-auto h-auto rounded-xl")}>
                    <div className="flex w-auto items-center space-x-2">
                        <Image src={btc} alt="bitcoin" height={24} width={24}/>
                        <span className="font-medium">BTC</span>
                        <span className="text-red-500">↓ 1.30%</span>
                    </div>
                </div>
                <div className={cn(buttonVariants({variant: 'unselected'}),"flex items-center space-x-4 px-4 w-auto h-auto rounded-xl")}>
                    <div className="flex w-auto items-center space-x-2">
                        <Image src={btc} alt="bitcoin" height={24} width={24}/>
                        <span className="font-medium">BTC</span>
                        <span className="text-red-500">↓ 1.30%</span>
                    </div>
                </div>
                <div className={cn(buttonVariants({variant: 'unselected'}),"flex items-center space-x-4 px-4 w-auto h-auto rounded-xl")}>
                    <div className="flex w-auto items-center space-x-2">
                        <Image src={btc} alt="bitcoin" height={24} width={24}/>
                        <span className="font-medium">BTC</span>
                        <span className="text-red-500">↓ 1.30%</span>
                    </div>
                </div>   */}
            </div>
            <div className="flex items-center">
                <ChevronRight className="text-secondary"/>
            </div>
        </div>
    )
}