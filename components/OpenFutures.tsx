import Image from "next/image";
import { Badge } from "./ui/badge";

interface OpenFuturesProps{
    logo:string
    token:string
    symbol:string
    type:string
    position:string
}

export default function OpenFutures({logo, token, symbol, type, position} : OpenFuturesProps){
    return (
        <div className="w-full flex flex-col bg-accent rounded-sm">
            <div className="w-full px-4 py-3 flex justify-between items-center cursor-pointer">
                <div className="flex space-x-[6px] items-center">
                    <Image src={logo} alt={token} width={16} height={16} className="w-4 h-4 rounded-full"/>
                    <span className="text-sm text-foreground font-medium">{symbol}</span>
                    <Badge className="text-[8px] bg-gradient-primary border-none text-black font-semibold py-[3px] px-1 w-7 h-3 rounded-[3px] flex items-center justify-center">{type}</Badge>
                    <Badge className={`${position === 'long' ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'} text-[8px] bg-inherit border font-semibold py-[3px] px-1 w-7 h-3 rounded-[3px] flex items-center justify-center`}>{position}</Badge>
                </div>
            </div>
        </div>
    )
}