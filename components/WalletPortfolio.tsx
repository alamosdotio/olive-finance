import { ArrowDown, ArrowUp } from "@/public/svgs/icons";
import Image from "next/image";
import { Separator } from "./ui/separator";

export default function WalletPortfolio(){
    return (
        <div className="w-full flex flex-col space-y-2">
            <div className="w-full flex flex-col p-4 pt-3 border rounded-sm">
                <div className="w-full flex justify-between">
                    <div className="flex items-center space-x-[6px]">
                        <span className="text-sm text-foreground font-medium h-4 flex items-center">Holdings</span>
                        <span className="border border-primary py-[5px] px-[6px] text-[10px] text-primary h-4 rounded-[4px] flex items-center">4 Tokens</span>
                    </div>
                    <div className="flex items-center text-secondary-foreground space-x-4">
                        <span className="text-sm text-foreground font-medium h-4 flex items-center">$229.38</span>
                        <ArrowUp />
                    </div>
                </div>
                <div className="py-4">
                    <Separator />
                </div>  
                <div className="w-full flex flex-col space-y-4">
                    <div className="w-full flex justify-between items-center">
                        <div className="flex space-x-[10px] items-center h-fit">
                            <Image src='/images/solana.png' alt="solana" height={32} width={32} className="rounded-full"/>
                            <div className="flex flex-col space-y-0.5">
                                <span className="text-xs text-foreground font-medium h-4">Solana</span>
                                <span className="text-xs text-secondary-foreground font-medium h-4">0.809232976 SOL</span>
                            </div>
                        </div>
                        <span className="text-xs text-secondary-foreground font-medium h-6 flex items-center">
                            $152.26
                        </span>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <div className="flex space-x-[10px] items-center h-fit">
                            <Image src='/images/bitcoin.png' alt="solana" height={32} width={32} className="rounded-full"/>
                            <div className="flex flex-col space-y-0.5">
                                <span className="text-xs text-foreground font-medium h-4">Bitcoin</span>
                                <span className="text-xs text-secondary-foreground font-medium h-4">2.5756152651 BTC</span>
                            </div>
                        </div>
                        <span className="text-xs text-secondary-foreground font-medium h-6 flex items-center">
                            $63.54
                        </span>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <div className="flex space-x-[10px] items-center h-fit">
                            <Image src='/images/render.png' alt="solana" height={32} width={32} className="rounded-full"/>
                            <div className="flex flex-col space-y-0.5">
                                <span className="text-xs text-foreground font-medium h-4">Render</span>
                                <span className="text-xs text-secondary-foreground font-medium h-4">0.809232976 Render</span>
                            </div>
                        </div>
                        <span className="text-xs text-secondary-foreground font-medium h-6 flex items-center">
                            $10.26
                        </span>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <div className="flex space-x-[10px] items-center h-fit">
                            <Image src='/images/ethereum.png' alt="solana" height={32} width={32} className="rounded-full"/>
                            <div className="flex flex-col space-y-0.5">
                                <span className="text-xs text-foreground font-medium h-4">Ethereum</span>
                                <span className="text-xs text-secondary-foreground font-medium h-4">5.482435434 ETH</span>
                            </div>
                        </div>
                        <span className="text-xs text-secondary-foreground font-medium h-6 flex items-center">
                            $3.68
                        </span>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-between items-center py-3 px-4 border rounded-sm h-10">
                <span className="text-sm text-foreground font-medium flex items-center h-4">Options</span>
                <div className="flex space-x-4 items-center">
                    <span className="text-sm text-foreground font-medium flex items-center h-4">$694.56</span>
                    <span className="flex items-center h-4 text-secondary-foreground"><ArrowDown /></span>
                </div>
            </div>
            <div className="w-full flex justify-between items-center py-3 px-4 border rounded-sm h-10">
                <span className="text-sm text-foreground font-medium flex items-center h-4">Futures</span>
                <div className="flex space-x-4 items-center">
                    <span className="text-sm text-foreground font-medium flex items-center h-4">$369.67</span>
                    <span className="flex items-center h-4 text-secondary-foreground"><ArrowDown /></span>
                </div>
            </div>
            {/* <div className="w-full flex justify-between items-center py-3 px-4 bg-accent-foreground rounded-full h-fit">
                <div className="flex space-x-[6px] items-center">
                    <span className="text-sm text-foreground font-medium flex items-center h-4">Limits</span>
                    <span className="text-[10px] text-primary font-semibold border border-primary py-[5px] px-[6px] flex items-center h-4 rounded-[4px]">0 OPEN ORDERS</span>
                </div>
                <span className="text-sm text-foreground font-medium flex items-center h-4">
                    $0
                </span>
            </div>
            <div className="w-full flex justify-between items-center py-3 px-4 bg-accent-foreground rounded-full h-fit">
                <div className="flex space-x-[6px] items-center">
                    <span className="text-sm text-foreground font-medium flex items-center h-4">DCA</span>
                    <span className="text-[10px] text-primary font-semibold border border-primary py-[5px] px-[6px] flex items-center h-4 rounded-[4px]">0 OPEN ORDERS</span>
                </div>
                <span className="text-sm text-foreground font-medium flex items-center h-4">
                    $0
                </span>
            </div>
            <div className="w-full flex justify-between items-center py-3 px-4 bg-accent-foreground rounded-full h-fit">
                <div className="flex space-x-[6px] items-center">
                    <span className="text-sm text-foreground font-medium flex items-center h-4">VA</span>
                    <span className="text-[10px] text-primary font-semibold border border-primary py-[5px] px-[6px] flex items-center h-4 rounded-[4px]">0 OPEN ORDERS</span>
                </div>
                <span className="text-sm text-foreground font-medium flex items-center h-4">
                    $0
                </span>
            </div>
            <div className="w-full flex justify-between items-center py-3 px-4 bg-accent-foreground rounded-full h-fit">
                <div className="flex space-x-[6px] items-center">
                    <span className="text-sm text-foreground font-medium flex items-center h-4">Perps</span>
                    <span className="text-[10px] text-primary font-semibold border border-primary py-[5px] px-[6px] flex items-center h-4 rounded-[4px]">0 OPEN ORDERS</span>
                </div>
                <span className="text-sm text-foreground font-medium flex items-center h-4">
                    $0
                </span>
            </div> */}
        </div>
    )
}