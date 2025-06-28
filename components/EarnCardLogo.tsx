'use client'

import usdt from '@/public/images/usdt.png'
import usdc from '@/public/images/usdc.png'
import Image from "next/image"
import { Strategy } from '@/lib/data/strategies'

interface EarnCardLogoProps{
    strategy: Strategy
}

export default function EarnCardlogo({strategy} : EarnCardLogoProps){
    return(
        <div className="flex -space-x-1.5">
            <div className="rounded-full bg-inherit w-6 h-6 flex items-center justify-center ring-2 ring-border">
                <Image src={strategy.asset.logo} alt={strategy.asset.name} width={24} height={24} className="h-6 w-6 rounded-full bg-white"/>
            </div>
            <div className={`rounded-full bg-inherit w-6 h-6 ${strategy.symbol === 'USDC' ? 'hidden' : 'flex'} items-center justify-center ring-2 ring-border`}>
                <Image src={usdc} alt='usdc logo' className="h-6 w-6"/>
            </div>
        </div>
    )
}