export interface Position{
    index: number
    token: string
    logo: string
    symbol: string
    type: string
    strikePrice: number
    expiry: string
    size: number
    pnl: number
    greeks: {
        delta: number
        gamma: number
        theta: number
        vega: number
    }
}

export interface Order{
    index: number
    token: string
    logo: string
    symbol: string
    type: string
    transaction: string
    limitPrice: number
    strikePrice: number
    expiry: string
    orderDate: string
    size: number
}

export const positions: Position[] = [
    {
        index:1,
        token: 'Bitcoin',
        logo: '/images/bitcoin.png',
        symbol: 'BTC',
        type: 'Call',
        strikePrice: 150,
        expiry: '1/5/2025',
        size: 28,
        pnl: 120,
        greeks: {
            delta: 0.9132,
            gamma: 0.0723,
            theta: -0.3587,
            vega: 0.0321
        }
    },
    {
        index:1,
        token: 'Bitcoin',
        logo: '/images/bitcoin.png',
        symbol: 'BTC',
        type: 'Call',
        strikePrice: 150,
        expiry: '1/5/2025',
        size: 28,
        pnl: 120,
        greeks: {
            delta: 0.9132,
            gamma: 0.0723,
            theta: -0.3587,
            vega: 0.0321
        }
    },
    {
        index:1,
        token: 'Bitcoin',
        logo: '/images/bitcoin.png',
        symbol: 'BTC',
        type: 'Call',
        strikePrice: 150,
        expiry: '1/5/2025',
        size: 28,
        pnl: 120,
        greeks: {
            delta: 0.9132,
            gamma: 0.0723,
            theta: -0.3587,
            vega: 0.0321
        }
    },
    {
        index:1,
        token: 'Bitcoin',
        logo: '/images/bitcoin.png',
        symbol: 'BTC',
        type: 'Call',
        strikePrice: 150,
        expiry: '1/5/2025',
        size: 28,
        pnl: 120,
        greeks: {
            delta: 0.9132,
            gamma: 0.0723,
            theta: -0.3587,
            vega: 0.0321
        }
    },
]

export const orders: Order[] = [
    {
        index: 1,
        token: 'Solana',
        logo: '/images/solana.png',
        symbol: 'SOL',
        type: 'Call',
        transaction: 'buy',
        limitPrice: 128,
        strikePrice: 150,
        expiry: '1/5/2025',
        orderDate: '1/4/2025',
        size: 500,
    },
     {
        index: 2,
        token: 'Solana',
        logo: '/images/solana.png',
        symbol: 'SOL',
        type: 'Call',
        transaction: 'buy',
        limitPrice: 140,
        strikePrice: 150,
        expiry: '1/5/2025',
        orderDate: '1/4/2025',
        size: 500,
    },
     {
        index: 3,
        token: 'Solana',
        logo: '/images/solana.png',
        symbol: 'SOL',
        type: 'Call',
        transaction: 'buy',
        limitPrice: 137,
        strikePrice: 150,
        expiry: '1/5/2025',
        orderDate: '1/4/2025',
        size: 500,
    },
    {
        index: 4,
        token: 'Bitcoin',
        logo: '/images/.png',
        symbol: 'BTC',
        type: 'Call',
        transaction: 'buy',
        limitPrice: 105000,
        strikePrice: 150000,
        expiry: '1/5/2025',
        orderDate: '1/4/2025',
        size: 500,
    },
     {
        index: 5,
        token: 'Bitcoin',
        logo: '/images/bitcoin.png',
        symbol: 'BTC',
        type: 'Call',
        transaction: 'buy',
        limitPrice: 95000,
        strikePrice: 150000,
        expiry: '1/5/2025',
        orderDate: '1/4/2025',
        size: 500,
    },
    
]