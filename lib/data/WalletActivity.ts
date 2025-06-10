import { format } from "date-fns"
import { coins, Coin } from "./coins"
import { Token, tokenList } from "./tokenlist"

export interface Transaction{
    transactionID: string
    token: Coin
    transactionType: string
    optionType: string
    expiry: string
    strikePrice: number
}

export interface FuturesTransaction{
    transactionID: string
    token: Token
    transactionType: string
    futureType: string
    expiry: string | 'N/A'
    leverage: number
    purchaseDate: string
}

export interface FuturePos{
    token: Token;
    symbol: string;
    futureType: 'perps' | 'dated';
    position: 'long' | 'short';
    entryPrice: number;
    LiqPrice: number;
    size: number;
    collateral: number;
    TPSL: number;
    logo: string;
    leverage: number;
    purchaseDate: string;
}

export const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const year = date.getFullYear().toString().slice(-2);

    return `${day}${month}${year}`;
};

const randomDate = (start: Date, end: Date) => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date;
};

const randomOptionType = (): string => {
    const types = ['American', 'European', 'Bermudan'];
    return types[Math.floor(Math.random() * types.length)];
};

const randomStrikePrice = (): number => {
    return Math.floor(Math.random() * (90000 - 10000) + 10000)
};

export const transactions: Transaction[] = coins.map((coin) => {
    const purchaseDate = randomDate(new Date(2023, 0, 1), new Date())
    const expiryDate = randomDate(new Date(), new Date(2025, 11, 31))
    const formattedExpiry = format(new Date(expiryDate), 'dd MMM, yyyy HH:mm:ss')
    const optionType = randomOptionType()
    const strikePrice = randomStrikePrice()
    const transactionType = Math.random() > 0.5 ? 'Put' : 'Call'

    return {
        transactionID: `${coin.symbol}-${formatDate(purchaseDate)}-${strikePrice}-${transactionType[0]}`,
        token: coin,
        transactionType: transactionType,
        optionType: optionType,
        strikePrice: strikePrice,
        expiry: formattedExpiry
    }
})

const randomLeverage = () : number => {
    return Math.floor(Math.random() * 100) + 1;
}

export const futuresTx : FuturesTransaction[] = tokenList.map((token) => {
    const purchaseDate = randomDate(new Date(2023, 0, 1), new Date())
    const expiryDate = randomDate(new Date(), new Date(2025, 11, 31))
    const formattedExpiry = format(new Date(expiryDate), 'dd MMM, yyyy HH:mm:ss')
    const formattedPurchase = format(new Date(purchaseDate), 'dd MMM, yyyy HH:mm:ss')
    const leverage = randomLeverage()
    const futureType = Math.random() > 0.5 ? 'Perps' : 'Dated'
    const transactionType = Math.random() > 0.5 ? 'Long' : 'Short'

    return {
        transactionID: `${token.symbol}-${futureType === 'Dated' ? formatDate(expiryDate) + '-' : ''}${transactionType.toUpperCase()}-${leverage + 'X'}`,
        token: token,
        transactionType: transactionType,
        futureType: futureType,
        expiry: futureType === 'Dated' ? formattedExpiry : 'N/A',
        leverage: leverage,
        purchaseDate: formattedPurchase
    }
})

export const futurePos : FuturePos[] = tokenList.map((token) => {
    const futureType = Math.random() < 0.5 ? 'perps' : 'dated';
    const position = Math.random() < 0.5 ? 'long' : 'short';
    const entryPrice = parseFloat((Math.random() * 10000 + 1).toFixed(2));
    const priceDelta = entryPrice * (Math.random() * 0.1 + 0.02);
    const LiqPrice = position === 'long' 
        ? parseFloat((entryPrice - priceDelta).toFixed(2))
        : parseFloat((entryPrice + priceDelta).toFixed(2));
    const size = parseFloat((Math.random() * 1000 + 1).toFixed(2));
    const collateral = parseFloat((entryPrice * size / (Math.random() * 10 + 1)).toFixed(2));
    const TPSL = position === 'long'
        ? parseFloat((entryPrice + priceDelta * 2).toFixed(2))
        : parseFloat((entryPrice - priceDelta * 2).toFixed(2));
    const leverage = parseFloat((Math.random() * 50 + 1).toFixed(1));

    const daysAgo = Math.floor(Math.random() * 30);
    const purchaseDate = new Date();
    purchaseDate.setDate(purchaseDate.getDate() - daysAgo);
    const formattedPurchase = format(new Date(purchaseDate), 'dd MMM, yyyy')

    return {
        token: token,
        symbol: token.symbol,
        futureType,
        position,
        entryPrice,
        LiqPrice,
        size,
        collateral,
        TPSL,
        logo: token.iconPath,
        leverage,
        purchaseDate: formattedPurchase
    };
});
