import { ArrowDown, ArrowUp } from "@/public/svgs/icons";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { useState } from "react";

export default function WalletPortfolio(){
    const [holdingsOpen, setHoldingsOpen] = useState(false);
    const [optionsOpen, setOptionsOpen] = useState(false);
    const [futuresOpen, setFuturesOpen] = useState(false);
    return (
        <div className="w-full flex flex-col space-y-2">
            <div className="w-full flex flex-col p-4 pt-3 border rounded-sm">
                <div 
                    className="w-full flex justify-between cursor-pointer"
                    onClick={() => setHoldingsOpen(!holdingsOpen)}
                >
                    <div className="flex items-center space-x-[6px]">
                        <span className="text-sm text-foreground font-medium h-4 flex items-center">Holdings</span>
                        <span className="border border-primary py-[5px] px-[6px] text-[10px] text-primary h-4 rounded-[4px] flex items-center">4 Tokens</span>
                    </div>
                    <div className="flex items-center text-secondary-foreground space-x-4">
                        <span className="text-sm text-foreground font-medium h-4 flex items-center">$229.38</span>
                        {holdingsOpen ? (
                            <ArrowUp />
                        ) : (
                            <ArrowDown />
                        )}
                    </div>
                </div>
                {holdingsOpen && (
                    <>
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
                   </>
                )}
            </div>
            <div className="w-full flex flex-col p-4 pt-3 border rounded-sm">
                <div 
                    className="w-full flex justify-between cursor-pointer"
                    onClick={() => setOptionsOpen(!optionsOpen)}
                >
                    <div className="flex items-center space-x-[6px]">
                        <span className="text-sm text-foreground font-medium h-4 flex items-center">Options</span>
                        <span className="border border-primary py-[5px] px-[6px] text-[10px] text-primary h-4 rounded-[4px] flex items-center">4 Positions</span>
                    </div>
                    <div className="flex items-center text-secondary-foreground space-x-4">
                        <span className="text-sm text-foreground font-medium h-4 flex items-center">$529.38</span>
                        {optionsOpen ? (
                            <ArrowUp />
                        ) : (
                            <ArrowDown />
                        )}
                    </div>
                </div>
                {optionsOpen && (
                    <>
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
                   </>
                )}
            </div>
            <div className="w-full flex flex-col p-4 pt-3 border rounded-sm">
                <div 
                    className="w-full flex justify-between cursor-pointer"
                    onClick={() => setFuturesOpen(!futuresOpen)}
                >
                    <div className="flex items-center space-x-[6px]">
                        <span className="text-sm text-foreground font-medium h-4 flex items-center">Futures</span>
                        <span className="border border-primary py-[5px] px-[6px] text-[10px] text-primary h-4 rounded-[4px] flex items-center">4 Positions</span>
                    </div>
                    <div className="flex items-center text-secondary-foreground space-x-4">
                        <span className="text-sm text-foreground font-medium h-4 flex items-center">$129.38</span>
                        {futuresOpen ? (
                            <ArrowUp />
                        ) : (
                            <ArrowDown />
                        )}
                    </div>
                </div>
                {futuresOpen && (
                    <>
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
                   </>
                )}
            </div>
            
        </div>
    )
}