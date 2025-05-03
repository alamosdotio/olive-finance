import { black_scholes } from "@/utils/optionsPricing";

export interface OptionChainData{
    strikePrice: number;
    breakeven: number;
    chanceofProfit: string;
    percentChange: string;
    change: string;
    bidPrice: number;
}

const getIncrement = (currentPrice: number) => {
    if (typeof currentPrice !== 'number' || isNaN(currentPrice) || currentPrice <= 0) {
        return 0;
    }

    const exponent = Math.floor(Math.log10(currentPrice));
    return Math.pow(10, exponent - 1);
}

export const generateOptionChainData = (count: number, price: number, t:number, isCall:boolean) : OptionChainData[] => {
    return Array(count).fill(null).map((_,index) => {
        const increment = getIncrement(price)
        const baseStrike = Math.round((price/2) + index * increment);
        const isPositive = index % 2 === 0;
        const bp = black_scholes(price, baseStrike, t, isCall)

        return {
            strikePrice: baseStrike,
            breakeven: baseStrike + 55,
            chanceofProfit: `${Math.max(30, 70 - Math.abs(index - 15))}%`,
            percentChange: `${isPositive ? '+' : '-'}${(Math.random() * 10).toFixed(2)}%`,
            change: `${isPositive ? '+' : '-'}${(Math.random() * 1).toFixed(2)}`,
            bidPrice: bp
        }
    })
}

