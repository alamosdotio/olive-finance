'use client'

import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type CryptoData = {
    id: string
    name: string
    symbol: string
    iconPath: string
    change: number
}

const cryptoData: CryptoData[] = [
    {id: 'solana', name: 'Solana', symbol: 'SOL', iconPath: '/images/solana.png', change: 2.10},
    {id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', iconPath: '/images/bitcoin.png', change: -1.30},
    {id: 'ethereum', name: 'Ethereum', symbol: 'ETH', iconPath: '/images/ethereum.png', change: -0.86},
    {id: 'chainlink', name: 'Chainlink', symbol: 'LINK', iconPath: '/images/chainlink.png', change: -1.72},
    {id: 'render', name: 'Render', symbol: 'RENDER', iconPath: '/images/render.png', change: 2.48},
    {id: 'dogwifhat', name: 'DogWifHat', symbol: 'WIF', iconPath: '/images/wif.png', change: 0.52},
    {id: 'bonk', name: 'Bonk', symbol: 'BONK', iconPath: '/images/bonk.png', change: 2.86},
    {id: 'thegraph', name: 'The Graph', symbol: 'GRT', iconPath: '/images/grt.png', change: 3.76},
    {id: 'pyth', name: 'Pyth Network', symbol: 'PYTH', iconPath: '/images/pyth.png', change: 11.91},
    {id: 'ray', name: 'Raydium', symbol: 'RAY', iconPath: '/images/ray.png', change: 0.30},
    
]

export default function CryptoNav(){
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [active, setActive] = useState<number | null>(0)

    const scroll = (direction: 'left' | 'right') => {
        const container = scrollContainerRef.current;
        if(container) {
            const scrollAmount = container.clientWidth / 2;
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            })
        }
    }

    const checkScroll = () => {
        const container = scrollContainerRef.current
        if(container){
            setCanScrollLeft(container.scrollLeft > 0)
            setCanScrollRight (container.scrollLeft < container.scrollWidth-container.clientWidth)
        }
    }

    useEffect(() => {
        const container = scrollContainerRef.current;
        if(container) {
            container.addEventListener('scroll', checkScroll);
            checkScroll()
        }
        return () => container?.removeEventListener('scroll', checkScroll)
    }, [])

    return (
        <div className="flex justify-between h-auto border-[1px] rounded-full p-[6px] w-full"> 
                    <div 
            ref={scrollContainerRef}
            className="flex items-center gap-2 overflow-x-auto scrollbar-hide min-w-0"
            >
            <div className="flex items-center flex-nowrap">
                {cryptoData.map((crypto, index) => (
                <div key={crypto.id} className="flex items-center flex-nowrap">
                    <div
                        className={cn(
                            buttonVariants({variant: 'ghost'}), (active === index && 'bg-secondary hover:bg-secondary'),
                            "flex items-center space-x-6 px-2 py-1 w-full h-auto rounded-full text-sm cursor-pointer"
                        )}
                        onClick={() => setActive(index)}
                    >
                        <div className="flex space-x-1 items-center">
                            <Image 
                            src={crypto.iconPath} 
                            alt={crypto.name} 
                            width={18} 
                            height={18} 
                            className={cn(
                                crypto.name === 'ethereum' ? 'bg-white rounded-full w-6 h-6 p-2' : 'rounded-full'
                            )}
                            />
                            <span className="font-medium text-sm">{crypto.symbol}</span>
                        </div>
                        <span className={crypto.change >= 0 ? "text-green-500" : "text-red-500"}>
                            {crypto.change >= 0 ? "↑" : "↓"} {Math.abs(crypto.change).toFixed(2)}%
                        </span>
                    </div>
                    {index < cryptoData.length - 1 && (
                        <div className="min-w-[1px] h-5 bg-border mx-2 flex-shrink-0" aria-hidden="true" />
                    )}
                </div>
                ))}
            </div>
            </div>
            <div className="flex gap-2">
                <button 
                    onClick={() => scroll('left')}
                    disabled={!canScrollLeft}
                    className="disabled:opacity-50 focus:outline-none"
                    aria-label="Scroll Left"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M14.0002 25.6668C20.4435 25.6668 25.6668 20.4435 25.6668 14.0002C25.6668 7.55684 20.4435 2.3335 14.0002 2.3335C7.55684 2.3335 2.3335 7.55684 2.3335 14.0002C2.3335 20.4435 7.55684 25.6668 14.0002 25.6668Z" className="fill-current text-backgroundSecondary"/>
                        <path d="M15.4699 18.1185L11.3633 14.0002L15.4699 9.88184" className='stroke-current text-secondary-foreground' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <button
                    onClick={() => scroll('right')}
                    disabled={!canScrollRight}
                    className="disabled:opacity-50 focus:outline-none"
                    aria-label="Scroll Right"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M14.0002 25.6668C20.4435 25.6668 25.6668 20.4435 25.6668 14.0002C25.6668 7.55684 20.4435 2.3335 14.0002 2.3335C7.55684 2.3335 2.3335 7.55684 2.3335 14.0002C2.3335 20.4435 7.55684 25.6668 14.0002 25.6668Z" className="fill-current text-backgroundSecondary"/>
                        <path d="M12.5298 18.1185L16.6365 14.0002L12.5298 9.88184" className='stroke-current text-secondary-foreground' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}