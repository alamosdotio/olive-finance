"use client"

import Image from "next/image"
import { ScrollArea } from "./ui/scroll-area"
import { usePythPrice } from "@/hooks/usePythPrice"
import { formatPrice } from "@/utils/formatter";
import { useMemo } from "react";

type Category = 'all' | 'crypto' | 'memes' | 'forex' | 'ai' | 'metals'  | 'commodities' | 'equities' | 'fixed';

type CryptoData = {
    id: string
    name: string
    symbol: string
    iconPath: string
    pythSymbol: string
    category: {
        crypto: boolean;
        memes: boolean;
        forex: boolean;
        ai: boolean;
        metals: boolean;
        commodities: boolean;
        equities: boolean;
        fixed: boolean;
    };
}

type MarketChanges = {
    [key: string]: number | null;
}

interface TokenListProps {
    tokens: CryptoData[]
    category: Category;
    marketChanges: MarketChanges;
    onTokenSelect: (token: CryptoData) => void;
}

function TokenListItem({ token, marketChange, onSelect }: { 
    token: CryptoData; 
    marketChange: number | null;
    onSelect: () => void;
}) {
    const { priceData, loading } = usePythPrice(token.pythSymbol);

    const formatChange = (change: number | null) => {
        if (change === null) return '0.00';
        return Math.abs(change).toFixed(2);
    };

    return (
        <div className="w-full grid grid-cols-3 gap-4 p-1 hover:bg-secondary rounded-md cursor-pointer" onClick={onSelect}>
            <div className="flex gap-1 items-center pl-1">
                <Image 
                    src={token.iconPath} 
                    alt={token.name} 
                    width={24} 
                    height={24} 
                    className="rounded-full"
                />
                <div className="flex flex-col h-fit justify-center">
                    <span className="text-sm text-foreground font-medium h-4">
                        {token.symbol}
                    </span>
                    <span className="text-[10px] text-secondary-foreground font-medium h-3 whitespace-nowrap overflow-hidden">
                        {token.name}
                    </span>
                </div>
            </div>
            <div className="flex justify-start items-center">
                <span className="text-xs font-medium text-secondary-foreground">
                    ${priceData.price 
                        ? formatPrice(priceData.price) 
                        : loading}
                </span>
            </div>
            <div className="flex justify-start gap-0.5 items-center pr-1">
                {marketChange !== null && (
                    <>
                        <span className={`text-xs font-medium ${marketChange >= 0 ? "text-green-500" : "text-red-500"}`}>{marketChange >= 0 ? "↑" : "↓"}</span>
                        <span className={`text-xs font-medium ${marketChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                            {formatChange(marketChange)}%
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}

export default function TokenList({ tokens, category, marketChanges, onTokenSelect }: TokenListProps) {
    const filteredTokens = useMemo(() => tokens.filter((token) => {
        if (category === 'all') {
            return true;
        }
        return token.category[category];
    }), [tokens, category]);

    return (
        <ScrollArea className="w-full h-64">
            {filteredTokens.map((token) => (
                <TokenListItem 
                    key={token.id} 
                    token={token} 
                    marketChange={marketChanges[token.pythSymbol]}
                    onSelect={() => onTokenSelect(token)}
                />
            ))}
        </ScrollArea>
    );
}