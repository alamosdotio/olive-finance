import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { ChevronDown } from "lucide-react";
import usdc from '@/public/images/usdc-big.png'

export default function OptionsCardTokenList(){
    return (
        <Dialog>
            <DialogTrigger asChild className="cursor-pointer">
                <div className="flex items-center space-x-2 text-[28px] bg-inherit p-0 w-full h-[52px] shadow-none">
                    <Image src={usdc} alt="usdc" height={48} width={48}/>
                    <h1>USDC</h1>
                    <ChevronDown className="opacity-50"/>
                </div>
            </DialogTrigger>
            <DialogContent>
                TokenList Goes Here
            </DialogContent>
        </Dialog>
    )
}