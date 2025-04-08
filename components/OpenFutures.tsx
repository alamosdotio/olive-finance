import Image from "next/image";
import { Badge } from "./ui/badge";

interface OpenFuturesProps{
    logo:string
    token:string
    symbol:string
    type:string
    position:string
    leverage:number
}

export default function OpenFutures({logo, token, symbol, type, position, leverage} : OpenFuturesProps){
    return (
        <div className="w-full flex flex-col bg-accent rounded-sm">
            <div className="w-full px-4 py-3 flex justify-between items-center cursor-pointer">
                <div className="flex space-x-[6px] items-center">
                    <Image src={logo} alt={token} width={16} height={16} className="w-4 h-4 rounded-full"/>
                    <span className="text-sm text-foreground font-medium">{symbol}</span>
                    <Badge className={`${position === 'long' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'} text-xs font-semibold py-[1px] px-1 w-fit h-fit rounded-[3px] flex items-center justify-center`}>
                        {leverage}x {position.charAt(0).toUpperCase() + position.slice(1).toLowerCase()}
                    </Badge>
                </div>
            </div>
        </div>
    )
}