'use client'

import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import TradingViewTopNav from "./TradingViewTopNav";
import { usePythMarketData } from "@/hooks/usePythMarketData";

type CryptoData = {
    id: string
    name: string
    symbol: string
    iconPath: string
    pythSymbol: string
    category: {
        crypto: boolean
        memes: boolean
        forex: boolean
        ai: boolean
        metals: boolean
    }
}

const cryptoData: CryptoData[] = [
    {id: 'solana', name: 'Solana', symbol: 'SOL', iconPath: '/images/solana.png', pythSymbol: 'Crypto.SOL/USD', category: {crypto: true, memes: false, forex: false, ai: false, metals:false}},
    {id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', iconPath: '/images/bitcoin.png', pythSymbol: 'Crypto.BTC/USD', category: {crypto: true, memes: false, forex: false, ai: false, metals:false}},
    {id: 'ethereum', name: 'Ethereum', symbol: 'ETH', iconPath: '/images/ethereum.png', pythSymbol: 'Crypto.ETH/USD', category: {crypto: true, memes: false, forex: false, ai: false, metals:false}},
    {id: 'chainlink', name: 'Chainlink', symbol: 'LINK', iconPath: '/images/chainlink.png', pythSymbol: 'Crypto.LINK/USD', category: {crypto: true, memes: false, forex: false, ai: false, metals:false}},
    {id: 'render', name: 'Render', symbol: 'RENDER', iconPath: '/images/render.png', pythSymbol: 'Crypto.RENDER/USD', category: {crypto: true, memes: false, forex: false, ai: true, metals:false}},
    {id: 'dogwifhat', name: 'DogWifHat', symbol: 'WIF', iconPath: '/images/wif.png', pythSymbol: 'Crypto.WIF/USD', category: {crypto: true, memes: true, forex: false, ai: false, metals:false}},
    {id: 'bonk', name: 'Bonk', symbol: 'BONK', iconPath: '/images/bonk.png', pythSymbol: 'Crypto.BONK/USD', category: {crypto: true, memes: true, forex: false, ai: false, metals:false}},
    {id: 'thegraph', name: 'The Graph', symbol: 'GRT', iconPath: '/images/grt.png', pythSymbol: 'Crypto.GRT/USD', category: {crypto: true, memes: false, forex: false, ai: false, metals:false}},
    {id: 'pyth', name: 'Pyth Network', symbol: 'PYTH', iconPath: '/images/pyth.png', pythSymbol: 'Crypto.PYTH/USD', category: {crypto: true, memes: false, forex: false, ai: false, metals:false}},
    {id: 'ray', name: 'Raydium', symbol: 'RAY', iconPath: '/images/ray.png', pythSymbol: 'Crypto.RAY/USD', category: {crypto: true, memes: false, forex: false, ai: false, metals:false}},
    {id: 'pengu', name: 'Pudgy Penguins', symbol:'PENGU', iconPath: '/images/pengu.jpeg', pythSymbol: 'Crypto.PENGU/USD', category: {crypto: true, memes: true, forex: false, ai: false, metals:false}},
    {id: 'hnt', name: 'Helium', symbol:'HNT', iconPath: '/images/hnt.png', pythSymbol: 'Crypto.HNT/USD', category: {crypto: true, memes: false, forex: false, ai: false, metals:false}},
    {id: 'jup', name: 'Jupiter', symbol:'JUP', iconPath: '/images/jup.jpg', pythSymbol: 'Crypto.JUP/USD', category: {crypto: true, memes: false, forex: false, ai: false, metals:false}},
    {id: 'ar', name: 'Arweave', symbol:'AR', iconPath: '/images/ar.png', pythSymbol: 'Crypto.AR/USD', category: {crypto: true, memes: false, forex: false, ai: false, metals:false}},
    {id: 'fartcoin', name: 'Fartcoin', symbol:'FARTCOIN', iconPath: '/images/fartcoin.png', pythSymbol: 'Crypto.FARTCOIN/USD', category: {crypto: true, memes: true, forex: false, ai: false, metals:false}},
    {id: 'jto', name: 'Jito', symbol:'JITO', iconPath: '/images/jito.png', pythSymbol: 'Crypto.JTO/USD', category: {crypto: true, memes: false, forex: false, ai: false, metals:false}},
    {id: 'w', name: 'Wormhole', symbol:'WORMHOLE', iconPath: '/images/wormhole.png', pythSymbol: 'Crypto.W/USD', category: {crypto: true, memes: false, forex: false, ai: false, metals:false}},
    {id: 'popcat', name: 'Popcat (SOL)', symbol:'POPCAT', iconPath: '/images/popcat.png', pythSymbol: 'Crypto.POPCAT/USD', category: {crypto: true, memes: true, forex: false, ai: false, metals:false}},
    {id: 'pnut', name: 'Peanut the Squirrel', symbol:'PNUT', iconPath: '/images/pnut.png', pythSymbol: 'Crypto.PNUT/USD', category: {crypto: true, memes: true, forex: false, ai: false, metals:false}},
]

interface CryptoNavProps {
    onSymbolChange: (symbol: string) => void;
    onIconChange: (symbol: string) => void;
}

type MarketChanges = {
    [key: string]: number | null;
}

const CryptoNavItem = React.memo(({ crypto, isActive, onClick, onMarketChange }: { 
    crypto: CryptoData; 
    isActive: boolean; 
    onClick: () => void;
    onMarketChange: (symbol: string, change: number | null) => void;
}) => {
    const { marketData } = usePythMarketData(crypto.pythSymbol);

    useEffect(() => {
        onMarketChange(crypto.pythSymbol, marketData.change24h);
    }, [crypto.pythSymbol, marketData.change24h, onMarketChange]);

    const formatChange = (change: number | null) => {
        if (change === null) return '0.00';
        return Math.abs(change).toFixed(2);
    };

    return (
        <div className="flex items-center flex-nowrap">
            <div
                className={cn(
                    buttonVariants({variant: 'ghost'}),
                    (isActive && 'bg-secondary hover:bg-secondary'),
                    "flex items-center space-x-5 px-[6px] py-0 w-full h-fit rounded-full text-sm cursor-pointer"
                )}
                onClick={onClick}
            >
                <div className="flex space-x-1 items-center">
                    <Image 
                        src={crypto.iconPath} 
                        alt={crypto.name} 
                        width={12} 
                        height={12} 
                        className={cn(
                            crypto.name === 'Helium' || crypto.name === 'Arweave' ? 'bg-white rounded-full' : 'rounded-full',
                            'w-4 h-4'
                        )}
                    />
                    <span className="font-medium text-sm">{crypto.symbol}</span>
                </div>
                <span className={
                    marketData.change24h && marketData.change24h >= 0 
                        ? "text-green-500" 
                        : "text-red-500"
                }>
                    {marketData.change24h !== null && (
                        <>
                            {marketData.change24h >= 0 ? "↑" : "↓"} {formatChange(marketData.change24h)}%
                        </>
                    )}
                </span>
            </div>
        </div>
    );
});

CryptoNavItem.displayName = 'CryptoNavItem';

export default function CryptoNav({ onSymbolChange, onIconChange } : CryptoNavProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<Map<string, HTMLDivElement>>(new Map());
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [active, setActive] = useState<number>(0);
    const [marketChanges, setMarketChanges] = useState<MarketChanges>({});

    const handleMarketChange = React.useCallback((symbol: string, change: number | null) => {
        setMarketChanges(prev => ({
            ...prev,
            [symbol]: change
        }));
    }, []);

    const scrollToToken = (index: number) => {
        const container = scrollContainerRef.current;
        const token = cryptoData[index];
        const element = itemsRef.current.get(token.id);
        
        if (container && element) {
            const containerRect = container.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();
            
          
            const elementRelativeLeft = elementRect.left - containerRect.left;
            const elementRelativeRight = elementRelativeLeft + elementRect.width;
            
            
            if (elementRelativeLeft < 0 || elementRelativeRight > containerRect.width) {
               
                const scrollLeft = container.scrollLeft + elementRelativeLeft - (containerRect.width - elementRect.width) / 2;
                
                container.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth'
                });
            }
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        const container = scrollContainerRef.current;
        if(container) {
            const scrollAmount = container.clientWidth / 2;
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    }

    const checkScroll = () => {
        const container = scrollContainerRef.current;
        if(container) {
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth);
        }
    }

    useEffect(() => {
        const container = scrollContainerRef.current;
        if(container) {
            container.addEventListener('scroll', checkScroll);
            checkScroll();
        }
        return () => container?.removeEventListener('scroll', checkScroll);
    }, []);

    const handleClick = (index: number) => {
        setActive(index);
        onSymbolChange(cryptoData[index].pythSymbol);
        onIconChange(cryptoData[index].iconPath);
    }

    const handleTokenSelect = (token: CryptoData) => {
        const index = cryptoData.findIndex(t => t.id === token.id);
        if (index !== -1) {
            handleClick(index);
            scrollToToken(index);
        }
    };

    return (
        <>
            <div className="flex justify-between h-[30px] border rounded-[14px] rounded-b-none px-1 py-1 w-full"> 
                <div 
                    ref={scrollContainerRef}
                    className="flex items-center gap-2 overflow-x-auto scrollbar-hide min-w-0"
                >
                    <div className="flex items-center flex-nowrap">
                        {cryptoData.map((crypto, index) => (
                            <React.Fragment key={crypto.id}>
                                <div 
                                    ref={el => {
                                        if (el) {
                                            itemsRef.current.set(crypto.id, el);
                                        }
                                    }}
                                >
                                    <CryptoNavItem
                                        crypto={crypto}
                                        isActive={active === index}
                                        onClick={() => handleClick(index)}
                                        onMarketChange={handleMarketChange}
                                    />
                                </div>
                                {index < cryptoData.length - 1 && (
                                    <div className="min-w-[1px] h-[18px] bg-border mx-1 flex-shrink-0" aria-hidden="true" />
                                )}
                            </React.Fragment>
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
            <TradingViewTopNav 
                symbol={cryptoData[active].symbol} 
                pythSymbol={cryptoData[active].pythSymbol} 
                logo={cryptoData[active].iconPath}
                tokens={cryptoData}
                marketChanges={marketChanges}
                onTokenSelect={handleTokenSelect}
            />
        </>
    );
}