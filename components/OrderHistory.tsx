'use client'

import { Transaction, transactions } from "@/lib/data/WalletActivity"
import { AmericanIcon, BermudanIcon, CallIconDark, CopyIcon, EuropeanIcon, PutIconDark, SendIcon } from "@/public/svgs/icons"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function OrderHistory(){
    const [generateTx, setGenerateTx] = useState<Transaction[]>([])
    
    useEffect(() => {
        setGenerateTx(transactions)
    }, [])

    const allTx = generateTx.slice(0, 9)
    return (
        <div className="w-full flex flex-col space-y-[14px]">
            {allTx.map((tx) => (
                <div className="w-full flex justify-between items-center" key={tx.transactionID}>
                    <div className="w-full flex space-x-[10px] items-center">
                        <div className="flex flex-col -space-y-0.5 justify-center items-center h-9">
                            <Image src={tx.token.logo} alt='eth icon' width={20} height={20} className="rounded-full" />
                            <div className="rounded-full ring ring-background">
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
                                    {tx.optionType === 'American' &&(
                                        <AmericanIcon width="13" height="12"/>
                                    )}
                                    {tx.optionType === 'European' &&(
                                        <EuropeanIcon width="13" height="12"/>
                                    )}
                                    {tx.optionType === 'Bermudan' &&(
                                        <BermudanIcon />
                                    )}
                                </span>
                                {tx.optionType}
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
    )
}