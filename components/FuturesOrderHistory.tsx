'use client'
import { FuturesTransaction} from "@/lib/data/WalletActivity"
import { CopyIcon, SendIcon } from "@/public/svgs/icons"
import Image from "next/image"
import { useEffect, useState } from "react"

interface FuturesOrderHistoryProps{
    dummyFutures: FuturesTransaction[]
}


export default function FuturesOrderHistory({dummyFutures} : FuturesOrderHistoryProps){


    return (
        <div className="w-full hidden md:flex flex-col space-y-[14px]">
            {dummyFutures.map((tx, idx) => (
                <div className="w-full flex justify-between items-center" key={idx}>
                    <div className="w-full flex space-x-[10px] items-center">
                        <Image src={tx.token.iconPath} alt={tx.token.symbol} width={28} height={28} className="rounded-full" />
                        <div className="flex flex-col justify-center">
                            <span className="text-xs text-foreground font-medium">{tx.transactionID}</span>
                            <span className="text-xs text-secondary-foreground font-normal flex items-center">
                                {tx.token.name} • {tx.futureType}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="flex justify-end space-x-2">
                            <CopyIcon />
                            <SendIcon />
                        </div>
                        <span className="text-xs text-secondary-foreground font-normal flex items-center whitespace-nowrap">{tx.purchaseDate}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}