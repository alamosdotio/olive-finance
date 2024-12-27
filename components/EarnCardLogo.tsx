'use client'

import bitcoin from '@/public/images/bitcoin.png'
import usdt from '@/public/images/usdt.png'
import usdc from '@/public/images/usdc.png'
import eth from '@/public/images/ethereum.png'
import Image from "next/image"

interface EarnCardLogoProps{
    index: number
}

export default function EarnCardlogo({index} : EarnCardLogoProps){
    return(
        <div className="flex -space-x-1.5">
            <div className="rounded-full bg-inherit w-6 h-6 flex items-center justify-center ring-2 ring-border">
                {index === 0 && (
                    <Image src={bitcoin} alt='bitcoin logo' className="h-6 w-6"/>
                )}
                {index === 1 && (
                    <Image src={eth} alt='eth logo' className="h-6 w-6"/>
                )}
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