import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface TradeDetailsProps{
    id:string
}

export default function TradeDetails({id} : TradeDetailsProps){
    const details = [
        {
            label: 'Total SOL',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'Locked SOL',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'Unlocked SOL',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'Total USDC',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'Locked USDC',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'Unlocked USDC',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'On-Chain Price',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'Total Pool Volume',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'L SOL Pool Volume',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'L USDC Pool Volume',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'Total Premium',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'Total Selling Fees',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'On-chain Price Sold',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'Utilization Rate SOL',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'Utilization Rate USDC',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'Total SLP Supply',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'SLP Price',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'Weightage SOL',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'Weightage USDC',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'Interest Rate',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'Volatility',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'USDC Withdrawal Fee',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'USDC Deposit Fee',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'SOL Withdrawal Fee',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'SOL Deposit Fee',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'Open Interest',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'Open Interest Call',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
        {
            label: 'Open Interest Put',
            before: '',
            after: '',
            change: '',
            difference: '',
        },
    ]
    return (
        <div className="w-full border rounded-sm">
            <div className="w-full p-3 flex flex-col border-b">
                <span>Transaction ID: {id}</span>
                <span>Type: Put</span>
                <span>Amount: 5 Contracts</span>
            </div>
            <Table className="w-full">
                <TableHeader>
                    <TableRow className="">
                        <TableHead></TableHead>
                        <TableHead>Before</TableHead>
                        <TableHead>After</TableHead>
                        <TableHead>% Change</TableHead>
                        <TableHead>Difference</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {details.map((trade) => (
                        <TableRow key={trade.label}>
                            <TableCell className="border-r w-52">{trade.label}</TableCell>
                            <TableCell className="border-r">{trade.before}</TableCell>
                            <TableCell className="border-r">{trade.after}</TableCell>
                            <TableCell className="border-r">{trade.change}</TableCell>
                            <TableCell className="border-r">{trade.difference}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}