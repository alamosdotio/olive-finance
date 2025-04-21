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

export const positions: Position[] = [
    // {
    //     index:1,
    //     token: 'Bitcoin',
    //     logo: '/images/bitcoin.png',
    //     symbol: 'BTC',
    //     type: 'Call',
    //     expiry: '1/5/2025',
    //     size: 28,
    //     pnl: 120,
    //     greeks: {
    //         delta: 0.9132,
    //         gamma: 0.0723,
    //         theta: -0.3587,
    //         vega: 0.0321
    //     }
    // },
    // {
    //     index:1,
    //     token: 'Solana',
    //     logo: '/images/solana.png',
    //     symbol: 'SOL',
    //     type: 'Call',
    //     expiry: '1/5/2025',
    //     size: 15,
    //     pnl: 305,
    //     greeks: {
    //         delta: 0.6821,
    //         gamma: 0.0415,
    //         theta: -0.2113,
    //         vega: 0.0619
    //     }
    // },
    // {
    //     index:1,
    //     token: 'Dogwifhat',
    //     logo: '/images/wif.png',
    //     symbol: 'WIF',
    //     type: 'Call',
    //     expiry: '1/5/2025',
    //     size: 42,
    //     pnl: 230,
    //     greeks: {
    //         delta: 0.8225,
    //         gamma: 0.0306,
    //         theta: -0.1921,
    //         vega: 0.0217
    //     }
    // },
    // {
    //     index:1,
    //     token: 'Ethereum',
    //     logo: '/images/ethereum.png',
    //     symbol: 'ETH',
    //     type: 'Call',
    //     expiry: '1/5/2025',
    //     size: 19,
    //     pnl: 450,
    //     greeks: {
    //         delta: 0.7548,
    //         gamma: 0.0652,
    //         theta: -0.2815,
    //         vega: 0.0423
    //     }
    // },
    // {
    //     index:1,
    //     token: 'Chainlink',
    //     logo: '/images/chainlink.png',
    //     symbol: 'LINK',
    //     type: 'Call',
    //     expiry: '1/5/2025',
    //     size: 36,
    //     pnl: 55,
    //     greeks: {
    //         delta: 0.6357,
    //         gamma: 0.0783,
    //         theta: -0.2218,
    //         vega: 0.0109
    //     }
    // },
]