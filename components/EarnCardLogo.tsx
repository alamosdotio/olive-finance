'use client'

import bitcoin from '@/public/images/bitcoin.png'
import usdt from '@/public/images/usdt.png'
import usdc from '@/public/images/usdc.png'
import Image from "next/image"

export default function EarnCardlogo(){
    return(
        <div className="flex -space-x-1.5">
            <div className="rounded-full bg-inherit w-6 h-6 flex items-center justify-center ring-2 ring-border">
                <Image src={bitcoin} alt='bitcoin logo' className="h-6 w-6"/>
            </div>
            <div className="rounded-full bg-inherit w-6 h-6 flex items-center justify-center ring-2 ring-border">
                <Image src={usdc} alt='usdc logo' className="h-6 w-6"/>
            </div>
            <div className="rounded-full bg-inherit w-6 h-6 flex items-center justify-center ring-2 ring-border">
                <Image src={usdt} alt='usdt logo' className="h-6 w-6"/>
            </div>
        </div>
    )
}