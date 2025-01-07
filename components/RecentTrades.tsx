import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

const RecentTradesData = [
    {
        id: 1,
        profile: 'HDG5...7XcY',
        tx: 'Bought',
        quantity: 50,
        option: 'American',
        optionType: 'Call',
        strikePrice: 60000,
        expiry: 'Mar 30, 2025',
        size: 800,
        purchaseDate: 'Jan 29, 2024'
    },
    {
        id: 2,
        profile: 'HDG5...7XcY',
        tx: 'Bought',
        quantity: 68,
        option: 'American',
        optionType: 'Call',
        strikePrice: 80000,
        expiry: 'Mar 19, 2025',
        size: 800,
        purchaseDate: 'Jan 18, 2024'
    },
    {
        id: 3,
        profile: 'HDG5...7XcY',
        tx: 'Bought',
        quantity: 42,
        option: 'European',
        optionType: 'Call',
        strikePrice: 12000,
        expiry: 'Mar 11, 2025',
        size: 650,
        purchaseDate: 'Dec 10, 2024'
    },
    {
        id: 4,
        profile: 'HDG5...7XcY',
        tx: 'Sold',
        quantity: 100,
        option: 'American',
        optionType: 'Put',
        strikePrice: 50000,
        expiry: 'Apr 25, 2025',
        size: 1000,
        purchaseDate: 'Dec 30, 2024'
    },
    {
        id: 5,
        profile: 'HDG5...7XcY',
        tx: 'Bought',
        quantity: 120,
        option: 'European',
        optionType: 'Put',
        strikePrice: 55000,
        expiry: 'May 15, 2025',
        size: 1000,
        purchaseDate: 'Jan 2, 2025'
    },
    {
        id: 6,
        profile: 'HDG5...7XcY',
        tx: 'Bought',
        quantity: 85,
        option: 'American',
        optionType: 'Call',
        strikePrice: 95000,
        expiry: 'Jun 5, 2025',
        size: 1000,
        purchaseDate: 'Dec 15, 2024'
    },
    {
        id: 7,
        profile: 'HDG5...7XcY',
        tx: 'Sold',
        quantity: 55,
        option: 'American',
        optionType: 'Call',
        strikePrice: 70000,
        expiry: 'Apr 7, 2025',
        size: 850,
        purchaseDate: 'Jan 5, 2025'
    },
    {
        id: 8,
        profile: 'HDG5...7XcY',
        tx: 'Bought',
        quantity: 75,
        option: 'European',
        optionType: 'Call',
        strikePrice: 110000,
        expiry: 'Mar 25, 2025',
        size: 900,
        purchaseDate: 'Dec 28, 2024'
    },
    {
        id: 9,
        profile: 'HDG5...7XcY',
        tx: 'Sold',
        quantity: 60,
        option: 'American',
        optionType: 'Put',
        strikePrice: 40000,
        expiry: 'Feb 15, 2025',
        size: 750,
        purchaseDate: 'Dec 18, 2024'
    },
    {
        id: 10,
        profile: 'HDG5...7XcY',
        tx: 'Bought',
        quantity: 50,
        option: 'European',
        optionType: 'Put',
        strikePrice: 20000,
        expiry: 'Jul 10, 2025',
        size: 1200,
        purchaseDate: 'Jan 3, 2025'
    },
];


export default function RecentTrades(){
    return (
        <div className="border h-full rounded-b-[26px]">
            <Table className="h-full">
                <TableHeader>
                    <TableRow className="w-full p-0">
                        <TableHead className="text-xs text-secondary-foreground font-medium text-justify pl-5 pr-3 py-4">Profile</TableHead>
                        <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4">Bought/Sold</TableHead>
                        <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4">Quantity</TableHead>
                        <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4">Option</TableHead>
                        <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4">Call/Put</TableHead>
                        <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4">Strike Price</TableHead>
                        <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4">Expiry Date</TableHead>
                        <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4">Trade Size</TableHead>
                        <TableHead className="text-xs text-secondary-foreground font-medium text-justify pr-5 pl-3 py-4">Purchase Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {RecentTradesData.map((row) => (
                        <TableRow key={row.id} className="border-none w-full">
                            <TableCell className="text-sm text-foreground font-medium text-justify pl-5 pr-3 py-[14px] whitespace-nowrap overflow-hidden text-ellipsis">{row.profile}</TableCell>
                            <TableCell className="text-sm text-foreground font-medium text-justify px-3 py-[14px] whitespace-nowrap overflow-hidden text-ellipsis">{row.tx}</TableCell>
                            <TableCell className="text-sm text-foreground font-medium text-justify px-3 py-[14px] whitespace-nowrap overflow-hidden text-ellipsis">{row.quantity}</TableCell>
                            <TableCell className="text-sm text-foreground font-medium text-justify px-3 py-[14px] whitespace-nowrap overflow-hidden text-ellipsis">{row.option}</TableCell>
                            <TableCell className="text-sm text-foreground font-medium text-justify px-3 py-[14px] whitespace-nowrap overflow-hidden text-ellipsis">{row.optionType}</TableCell>
                            <TableCell className="text-sm text-foreground font-medium text-justify px-3 py-[14px] whitespace-nowrap overflow-hidden text-ellipsis">{row.strikePrice}</TableCell>
                            <TableCell className="text-sm text-foreground font-medium text-justify px-3 py-[14px] whitespace-nowrap overflow-hidden text-ellipsis">{row.expiry}</TableCell>
                            <TableCell className="text-sm text-foreground font-medium text-justify px-3 py-[14px] whitespace-nowrap overflow-hidden text-ellipsis">{row.size}</TableCell>
                            <TableCell className="text-sm text-foreground font-medium text-justify pl-3 pr-5 py-[14px] whitespace-nowrap overflow-hidden text-ellipsis">{row.purchaseDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}