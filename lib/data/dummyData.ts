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

export const dummyPoolTrades = Array.from({ length: 50 }, (_, i) => ({
  profile: `${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`,
  type: i % 2 === 0 ? "Withdrawal" : "Deposit",
  quantity: `${(Math.random() * 100).toFixed(2)} SOL-LP`,
  paidReceived: `${(Math.random() * 2000).toFixed(2)} USDC`,
  fees: `${(Math.random() * 2).toFixed(2)} USDC`,
  pool: `SOL/USDC`,
  dateTime: new Date(Date.now() - i * 3600 * 1000).toISOString().replace("T", " ").substring(0, 16),
  usdcWeight: `${(50 + Math.random() * 30).toFixed(0)}%`,
  solWeight: `${(20 + Math.random() * 30).toFixed(0)}%`,
}));


export const dummyOptionTrades = Array.from({length:50} , (_,i) => ({
    profile: `${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`,
    tx: ["Bought", "Sold", "Exercised"][i % 3],
    quantity: `${(Math.random() * 100).toFixed(0)}`,
    paidReceived: `${(Math.random() * 2000).toFixed(2)}`,
    pool: `SOL/USDC`,
    fees: `${(Math.random() * 2).toFixed(2)} USDC`,
    type: i % 2 === 0 ? "Call" : "Put",
    strikePrice: `${(Math.random() * 100).toFixed(2)}`,
    expiry: new Date(Date.now() - i * 3600 * 1000).toISOString().replace("T", " ").substring(0, 16),
    size: `${(Math.random() * 100).toFixed(2)}`,
    purchaseDate: new Date(Date.now() - i * 3600 * 1000).toISOString().replace("T", " ").substring(0, 16),
}))