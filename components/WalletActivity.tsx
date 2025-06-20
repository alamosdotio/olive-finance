import { AmericanIcon, BermudanIcon, CallIconDark, CopyIcon, EuropeanIcon, PutIconDark, SendIcon } from "@/public/svgs/icons"
import { Transaction, transactions } from "@/lib/data/WalletActivity"
import Image from "next/image"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Separator } from "./ui/separator"
import { ScrollArea } from "./ui/scroll-area"
import { Button } from "./ui/button"

export default function WalletActivity(){
    const [generateTx, setGenerateTx] = useState<Transaction[]>([])
    const [activeTab, setActiveTab] = useState('buy')

    useEffect(() => {
        setGenerateTx(transactions)
    }, [])

    const allTx = generateTx.slice(0,10)
    return (
        <div className="flex flex-col h-[calc(100vh-280px)] space-y-3">
            <div className="grid grid-cols-12 gap-0 border-b border-primary">
            <Button
                variant="ghost"
                className={`col-span-3 px-0 rounded-none border-x border-t border-primary text-sm shadow-none ${
                activeTab === 'buy'
                    ? 'border-b-transparent text-black bg-primary rounded-t-sm hover:bg-primary hover:text-black'
                    : 'border-b border-primary border-x-0 border-t-0 text-foreground bg-inherit'
                }`}
                onClick={() => setActiveTab('buy')}
            >
                Buy
            </Button>

            <Button
                variant="ghost"
                className={`col-span-3 px-0 rounded-none border-x border-t border-primary text-sm shadow-none ${
                activeTab === 'sell'
                    ? 'border-b-transparent text-black bg-primary rounded-t-sm hover:bg-primary hover:text-black'
                    : 'border-b border-primary border-x-0 border-t-0 text-foreground bg-inherit'
                }`}
                onClick={() => setActiveTab('sell')}
            >
                Sell
            </Button>
            <div className="col-span-6 border-b border-primary" />
            </div>

            <ScrollArea className="flex-grow pr-3">
                <div className="w-full flex flex-col md:space-y-[14px]">
                    {allTx.map((tx) => (
                        <div className="w-full flex flex-col md:flex-row" key={tx.transactionID}>
                            <div className="w-full flex flex-col space-y-3 md:space-y-0 md:flex-row md:justify-between items-center">
                                <div className="w-full flex space-x-[10px] items-center">
                                    <div className="flex flex-col -space-y-0.5 justify-center items-center md:h-10 md:p-0 p-1 h-11">
                                        <Image src={tx.token.logo} alt='eth icon' width={20} height={20} className="rounded-full ring ring-background md:ring-0" />
                                        <div className="rounded-full ring ring-background md:ring-accent bg-accent">
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
                                <div className="w-full flex flex-row-reverse justify-between md:w-auto md:flex-col md:justify-center">
                                    <div className="flex justify-end space-x-2">
                                        <CopyIcon />
                                        <SendIcon />
                                    </div>
                                    <span className="text-xs text-secondary-foreground font-normal flex items-center whitespace-nowrap">{tx.expiry}</span>
                                </div>
                            </div>
                            <Separator className="my-[14px] md:hidden" />
                        </div>
                    ))}
                </div>
            </ScrollArea>
            {/* <div className="flex items-center gap-5 justify-center md:justify-end pt-4 mt-auto">
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
            </div> */}
        </div>
    )
}