import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import btc from '../public/images/bitcoin.png'
import { ChevronRight } from "lucide-react";


type CryptoData = {
    id: string
    name: string
    symbol: string
    iconPath: string
    change: number
}

const cryptoData: CryptoData[] = [
    {id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', iconPath: '/images/bitcoin.png', change: -1.30},
    {id: 'ethereum', name: 'Ethereum', symbol: 'ETH', iconPath: '/images/ethereum.png', change: -0.86},
    {id: 'solana', name: 'Solana', symbol: 'SOL', iconPath: '/images/solana.png', change: 2.10}
]

export default function CryptoNav(){
    return (
        <div className="flex justify-between h-14 border-[1px] rounded-none p-2 w-full"> 
            <div className="flex items-center  gap-2 ">
                {cryptoData.map((crypto) => (
                    <div
                        key={crypto.id}
                        className={cn(buttonVariants({variant: 'unselected'}),"flex items-center space-x-[10px] px-4 py-2 w-full h-auto rounded-xl")}
                    >
                        <Image src={crypto.iconPath} alt={crypto.name} width={24} height={24} className={cn(crypto.name === 'ethereum' ? 'bg-white rounded-full w-6 h-6 p-2' : 'rounded-full')}/>
                        <span className="font-medium text-sm">{crypto.symbol}</span>
                        <span className={crypto.change >= 0 ? "text-green-500" : "text-red-500"}>
                            {crypto.change >= 0 ? "↑" : "↓"} {Math.abs(crypto.change).toFixed(2)}%
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex items-center">
                <ChevronRight className="text-secondary-foreground"/>
            </div>
        </div>
    )
}