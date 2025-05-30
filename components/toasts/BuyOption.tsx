import { tokenList } from "@/lib/data/tokenlist"
import Image from "next/image";
import { Badge } from "../ui/badge";

interface BuyOptionProps{
    option: 'Call' | 'Put'; 
    active: number;
}

export default function BuyOption({option, active}: BuyOptionProps){
    const tokens = tokenList;
    const selectedToken = tokens[active]
    return(
        <div className="w-full flex flex-col gap-2 justify-between">
            <div className="flex items-start gap-2 text-sm font-semibold">
                <Image 
                    src={selectedToken.iconPath}
                    alt={selectedToken.symbol}
                    width={20}
                    height={20}
                    className="w-5 h-5 rounded-full"
                />
                <span className="text-primary">Open Option</span>
                <Badge className={`${option === 'Call' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'} text-xs font-semibold py-[1px] px-1 w-fit h-fit rounded-[3px] flex items-center justify-center`}>
                    {option}
                </Badge>
            </div>
            <div className="flex flex-col gap-1 text-xs text-foreground font-normal">
                <div className="flex justify-between">
                    <span>Price</span>
                    <span>--</span>
                </div>
                <div className="flex justify-between">
                    <span>Strike Price</span>
                    <span>--</span>
                </div>
                <div className="flex justify-between">
                    <span>Size</span>
                    <span>--</span>
                </div>
                <div className="flex justify-between">
                    <span>Expiry</span>
                    <span>--</span>
                </div>
            </div>
        </div>  
    )
}