import { AmericanIcon, BermudanIcon, CallIconDark, CopyIcon, EuropeanIcon, PutIconDark, SendIcon } from "@/public/svgs/icons"
import { Transaction, transactions } from "@/lib/data/WalletActivity"
import Image from "next/image"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Separator } from "./ui/separator"

export default function WalletActivity(){
    const [generateTx, setGenerateTx] = useState<Transaction[]>([])

    useEffect(() => {
        setGenerateTx(transactions)
    }, [])

    const allTx = generateTx.slice(0,10)
    return (
        <>
            <div className="hidden md:flex flex-col h-[calc(100vh-280px)]">
                <div className="flex-grow overflow-y-auto">
                    <div className="w-full flex flex-col space-y-[14px]">
                        {allTx.map((tx) => (
                        <div className="w-full flex justify-between items-center" key={tx.transactionID}>
                            <div className="w-full flex space-x-[10px] items-center">
                                <div className="flex flex-col -space-y-0.5 justify-center items-center h-9">
                                    <Image src={tx.token.logo} alt='eth icon' width={20} height={20} className="rounded-full" />
                                    <div className="rounded-full ring ring-accent bg-accent">
                                        {tx.transactionType === 'Put' ? (
                                            <PutIconDark width="20" height="20"/>
                                        ):(
                                            <CallIconDark width="20" height="20"/>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-xs text-foreground font-medium">{tx.transactionID}</span>
                                    <span className="text-xs text-secondary-foreground font-normal flex items-center">
                                        {tx.token.name} • {tx.transactionType} Option • 
                                        <span className="px-1">
                                            
                                        </span>
                                        Vanilla
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="flex justify-end space-x-2">
                                    <CopyIcon />
                                    <SendIcon />
                                </div>
                                <span className="text-xs text-secondary-foreground font-normal flex items-center whitespace-nowrap">{tx.expiry}</span>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-5 justify-center md:justify-end pt-4 mt-auto">
                    <button className="p-2 rounded-[12px] bg-secondary flex items-center h-9 w-9 hover:bg-secondary/80">
                        <ChevronLeft className="w-fit h-fit text-secondary-foreground" />
                    </button>
                    <div className="space-x-2">   
                        <button className="p-[6px] w-9 h-9 rounded-[12px] bg-secondary hover:bg-secondary/80">1</button>
                        <button className="p-[6px] w-9 h-9 rounded-[12px] bg-secondary hover:bg-secondary/80">2</button>
                        <button className="p-[6px] w-9 h-9 rounded-[12px] bg-secondary hover:bg-secondary/80">3</button>
                        <span>...</span>
                        <button className="py-[6px] px-2 rounded-[12px] bg-secondary hover:bg-secondary/80 w-fit h-fit">109</button>
                    </div>
                    <button className="p-2 rounded-[12px] bg-secondary flex items-center h-9 w-9 hover:bg-secondary/80">
                        <ChevronRight className="w-fit h-fit text-secondary-foreground" />
                    </button>
                </div>
            </div>
            <div className="md:hidden flex flex-col h-[calc(100vh-280px)]">
                <div className="flex-grow overflow-y-auto">
                    <div className="w-full flex flex-col">
                        {allTx.map((tx) => (
                        <div className="w-full flex flex-col">
                            <div className="w-full flex flex-col space-y-3 justify-between items-center" key={tx.transactionID}>
                                <div className="w-full flex space-x-[10px] items-center">
                                    <div className="w-fit flex flex-col p-1 -space-y-0.5 justify-center items-center h-11">
                                        <Image src={tx.token.logo} alt='eth icon' width={20} height={20} className="rounded-full ring ring-background" />
                                        <div className="rounded-full ring ring-background bg-accent">
                                            {tx.transactionType === 'Put' ? (
                                                <PutIconDark width="20" height="20"/>
                                            ):(
                                                <CallIconDark width="20" height="20"/>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <span className="text-xs text-foreground font-medium">{tx.transactionID}</span>
                                        <span className="text-xs text-secondary-foreground font-normal flex items-center">
                                            {tx.token.name} • {tx.transactionType} Option • 
                                            <span className="px-1">
                                                
                                            </span>
                                            Vanilla
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full flex justify-between">
                                    <span className="text-xs text-secondary-foreground font-normal flex items-center whitespace-nowrap">{tx.expiry}</span>
                                    <div className="flex justify-end space-x-2">
                                        <CopyIcon />
                                        <SendIcon />
                                    </div>
                                </div>
                            </div>
                            <Separator className="my-[14px]" />
                        </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-5 justify-center md:justify-end pt-4 mt-auto">
                    <button className="p-2 rounded-[12px] bg-secondary flex items-center h-9 w-9 hover:bg-secondary/80">
                        <ChevronLeft className="w-fit h-fit text-secondary-foreground" />
                    </button>
                    <div className="space-x-2">   
                        <button className="p-[6px] w-9 h-9 rounded-[12px] bg-secondary hover:bg-secondary/80">1</button>
                        <button className="p-[6px] w-9 h-9 rounded-[12px] bg-secondary hover:bg-secondary/80">2</button>
                        <button className="p-[6px] w-9 h-9 rounded-[12px] bg-secondary hover:bg-secondary/80">3</button>
                        <span>...</span>
                        <button className="py-[6px] px-2 rounded-[12px] bg-secondary hover:bg-secondary/80 w-fit h-fit">109</button>
                    </div>
                    <button className="p-2 rounded-[12px] bg-secondary flex items-center h-9 w-9 hover:bg-secondary/80">
                        <ChevronRight className="w-fit h-fit text-secondary-foreground" />
                    </button>
                </div>
            </div>
        </>
    )
}