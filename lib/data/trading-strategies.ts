export interface TradingStrategy{
    image: string
    name: string
    type: string
}

export const tradingStrategies: TradingStrategy[] = [
    {
        image: '/strategy-images/longcall.png',
        name: 'Short Call Butterfly',
        type: 'Neutral'
    },
    {
        image: '/strategy-images/LongCallButterfly.png',
        name: 'Long Call Butterfly',
        type: 'Dangerous'
    },
    {
        image: '/strategy-images/ShortIronButterfly.png',
        name: 'Short Iron Butterfly',
        type: 'Neutral'
    },
    {
        image: '/strategy-images/frame1.png',
        name: 'Long Call',
        type: 'Neutral'
    },
    {
        image: '/strategy-images/ShortIronButterfly.png',
        name: 'Short Iron Butterfly',
        type: 'Neutral'
    },
    {
        image: '/strategy-images/LongCallButterfly.png',
        name: 'Long Call Butterfly',
        type: 'Dangerous'
    },
]