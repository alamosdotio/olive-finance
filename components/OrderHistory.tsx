'use client'

import { Transaction, } from "@/lib/data/WalletActivity"
import { CallIconDark, CopyIcon, PutIconDark, SendIcon } from "@/public/svgs/icons"
import Image from "next/image"
import { Separator } from "./ui/separator"

export default function OrderHistory({doneOptioninfos}:{doneOptioninfos:Transaction[]}){
    return (
        <>
            <div className="w-full hidden md:flex flex-col space-y-[14px]">
                {doneOptioninfos && doneOptioninfos.map((tx) => (
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
                                        Vanilla
                                    </span>
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
            <div className="w-full md:hidden flex flex-col">
                {doneOptioninfos && doneOptioninfos.map((tx, index) => (
                    <>
                    <div className="w-full flex flex-col space-y-3 items-center" key={tx.transactionID}>
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
                                        Vanilla
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="w-full flex justify-between">
                            <span className="text-xs text-secondary-foreground font-normal flex items-center whitespace-nowrap">{tx.expiry}</span>
                            <div className="flex justify-end space-x-2 text-secondary-foreground">
                                <CopyIcon />
                                <SendIcon />
                            </div>
                        </div>
                    </div>
                    {index !== 8 && (
                        <Separator className="my-[14px]"/>
                    )}
                    </>
                ))}
            </div>
        </>
    )
}