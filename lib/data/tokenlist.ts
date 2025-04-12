export interface Token{
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

export const USDC: Token = {
    id: 'usdc', 
    name: 'USDC', 
    symbol: 'USDC', 
    iconPath: '/images/usdc.png', 
    pythSymbol: 'Crypto.USDC/USD', 
    category: {crypto: true, memes: false, forex: false, ai: false, metals:false}
}

export const tokenList: Token[] = [
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
    {id: 'paxg', name: 'PAX Gold', symbol:'PAXG', iconPath: '/images/paxg.png', pythSymbol: 'Crypto.PAXG/USD', category: {crypto: true, memes: false, forex: false, ai: false, metals:true}},
    {id: 'eurc', name: 'EURC', symbol:'EURC', iconPath: '/images/eurc.png', pythSymbol: 'Crypto.EURC/USD', category: {crypto: true, memes: false, forex: true, ai: false, metals:false}},
];