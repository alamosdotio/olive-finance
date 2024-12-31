import { Coin, coins } from "./coins"

export interface Strategy{
    symbol: string
    name: string
    asset: Coin
    stats: {
        tvl: number
        apy: number
        apr: number
    }
}

export const generateStrategies = (count: number) : Strategy[] =>{
    return Array(count).fill(null).map((_, index) => {
        const coin = coins[index % coins.length]
        return {
            symbol: coin.symbol,
            name: coin.name,
            asset: coin,
            stats: {
                tvl: Math.round((Math.random() * 500000 + 100000) * 100) / 100,
                apy: Math.round((Math.random() * 10 + 1) * 100) / 100,
                apr: Math.round((Math.random() * 15 + 1.5) * 100) / 100,
            }
        }   
    })
}