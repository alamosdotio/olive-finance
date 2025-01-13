import { format } from "date-fns"
import { coins, Coin } from "./coins"

export interface Transaction{
    transactionID: string
    token: Coin
    transactionType: string
    optionType: string
    expiry: string
    strikePrice: number
}
const formatDate = (date: Date): string => {
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