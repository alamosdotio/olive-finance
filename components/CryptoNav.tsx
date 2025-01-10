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
    pythSymbol: string
}

const cryptoData: CryptoData[] = [
    {id: 'solana', name: 'Solana', symbol: 'SOL', iconPath: '/images/solana.png', change: 2.10, pythSymbol: 'Crypto.SOL/USD'},
    {id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', iconPath: '/images/bitcoin.png', change: -1.30, pythSymbol: 'Crypto.BTC/USD'},
    {id: 'ethereum', name: 'Ethereum', symbol: 'ETH', iconPath: '/images/ethereum.png', change: -0.86, pythSymbol: 'Crypto.ETH/USD'},
    {id: 'chainlink', name: 'Chainlink', symbol: 'LINK', iconPath: '/images/chainlink.png', change: -1.72, pythSymbol: 'Crypto.LINK/USD'},
    {id: 'render', name: 'Render', symbol: 'RENDER', iconPath: '/images/render.png', change: 2.48, pythSymbol: 'Crypto.RENDER/USD'},
    {id: 'dogwifhat', name: 'DogWifHat', symbol: 'WIF', iconPath: '/images/wif.png', change: 0.52, pythSymbol: 'Crypto.WIF/USD'},
    {id: 'bonk', name: 'Bonk', symbol: 'BONK', iconPath: '/images/bonk.png', change: 2.86, pythSymbol: 'Crypto.BONK/USD'},
    {id: 'thegraph', name: 'The Graph', symbol: 'GRT', iconPath: '/images/grt.png', change: 3.76, pythSymbol: 'Crypto.GRT/USD'},
    {id: 'pyth', name: 'Pyth Network', symbol: 'PYTH', iconPath: '/images/pyth.png', change: 11.91, pythSymbol: 'Crypto.PYTH/USD'},
    {id: 'ray', name: 'Raydium', symbol: 'RAY', iconPath: '/images/ray.png', change: 0.30, pythSymbol: 'Crypto.RAY/USD'},
    {id: 'pengu', name: 'Pudgy Penguins', symbol:'PENGU', iconPath: '/images/pengu.jpeg', change: 0.87, pythSymbol: 'Crypto.PENGU/USD'},
    {id: 'hnt', name: 'Helium', symbol:'HNT', iconPath: '/images/hnt.png', change: -2.23, pythSymbol: 'Crypto.HNT/USD'},
    {id: 'jup', name: 'Jupiter', symbol:'JUP', iconPath: '/images/jup.jpg', change: -1.72, pythSymbol: 'Crypto.JUP/USD'},
    {id: 'ar', name: 'Arweave', symbol:'AR', iconPath: '/images/ar.png', change: 4.96, pythSymbol: 'Crypto.AR/USD'},
    {id: 'fartcoin', name: 'Fartcoin', symbol:'FARTCOIN', iconPath: '/images/fartcoin.png', change: 10.72, pythSymbol: 'Crypto.FARTCOIN/USD'},
    {id: 'jto', name: 'Jito', symbol:'JITO', iconPath: '/images/jito.png', change: 0.62, pythSymbol: 'Crypto.JTO/USD'},
    {id: 'w', name: 'Wormhole', symbol:'WORMHOLE', iconPath: '/images/wormhole.png', change: 2.17, pythSymbol: 'Crypto.W/USD'},
    {id: 'popcat', name: 'Popcat (SOL)', symbol:'POPCAT', iconPath: '/images/popcat.png', change: -0.70, pythSymbol: 'Crypto.POPCAT/USD'},
    {id: 'pnut', name: 'Peanut the Squirrel', symbol:'PNUT', iconPath: '/images/pnut.png', change: -1.72, pythSymbol: 'Crypto.PNUT/USD'},
]

interface CryptoNavProps {
    onSymbolChange: (symbol: string) => void;
}

export default function CryptoNav({ onSymbolChange } : CryptoNavProps ){

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

    const handleClick = (index: number) => {
        setActive(index);
        onSymbolChange(cryptoData[index].pythSymbol)
    }

    return (
        <div className="flex justify-between h-[30px] border-[1px] rounded-full px-1 py-1 w-full"> 
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
                            "flex items-center space-x-5 px-[6px] py-0 w-full h-fit rounded-full text-sm cursor-pointer"
                        )}
                        onClick={() => handleClick(index)}
                    >
                        <div className="flex space-x-1 items-center">
                            <Image 
                            src={crypto.iconPath} 
                            alt={crypto.name} 
                            width={12} 
                            height={12} 
                            className={cn(
                                crypto.name === 'Helium' || crypto.name === 'Arweave' ? 'bg-white rounded-full' : 'rounded-full', 'w-4 h-4'
                            )}
                            />
                            <span className="font-medium text-sm">{crypto.symbol}</span>
                        </div>
                        <span className={crypto.change >= 0 ? "text-green-500" : "text-red-500"}>
                            {crypto.change >= 0 ? "↑" : "↓"} {Math.abs(crypto.change).toFixed(2)}%
                        </span>
                    </div>
                    {index < cryptoData.length - 1 && (
                        <div className="min-w-[1px] h-[18px] bg-border mx-1 flex-shrink-0" aria-hidden="true" />
                    )}
                </div>
                ))}
            </div>
            </div>
            <div className="flex gap-[2px]">
                <button 
                    onClick={() => scroll('left')}
                    disabled={!canScrollLeft}
                    className="disabled:opacity-50 focus:outline-none"
                    aria-label="Scroll Left"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 28 28" fill="none">
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 28 28" fill="none">
                        <path d="M14.0002 25.6668C20.4435 25.6668 25.6668 20.4435 25.6668 14.0002C25.6668 7.55684 20.4435 2.3335 14.0002 2.3335C7.55684 2.3335 2.3335 7.55684 2.3335 14.0002C2.3335 20.4435 7.55684 25.6668 14.0002 25.6668Z" className="fill-current text-backgroundSecondary"/>
                        <path d="M12.5298 18.1185L16.6365 14.0002L12.5298 9.88184" className='stroke-current text-secondary-foreground' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}