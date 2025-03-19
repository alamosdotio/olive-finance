import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { AvatarIcon, CallIconDark, PutIconDark } from "@/public/svgs/icons";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

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
        id: 11,
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
        id: 12,
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
        id: 13,
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
        id: 14,
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
        id: 15,
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
    

];


export default function RecentTrades(){
    return (
        <div className="border border-t-0 w-full h-full rounded-b-sm flex flex-col justify-between">
            <ScrollArea className="h-[658px] rounded-b-sm w-full">
                <Table className="whitespace-nowrap overflow-hidden">
                    <TableHeader className="w-full">
                        <TableRow className="p-0">
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify pl-5 pr-3 py-4 ">Profile</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">Bought/Sold</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">Quantity</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">Option</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">Call/Put</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">Strike Price</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">Expiry Date</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">Trade Size</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify pr-5 pl-3 py-4 ">Purchase Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="w-full">
                        {RecentTradesData.map((row) => (
                            <TableRow key={row.id} className="border-none w-full">
                                <TableCell className="text-sm text-foreground font-normal text-justify pl-5 pr-3 py-3 ">
                                    <div className="flex gap-[10px] items-center">
                                        <AvatarIcon />
                                        {row.profile}
                                    </div>
                                    
                                </TableCell>
                                <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">
                                    {row.tx === 'Bought' ? (
                                        <span className="px-2 py-[6px] bg-[#23293E] text-[#A3BFFB] rounded-[8px]">
                                            {row.tx}
                                        </span>
                                    ) : (
                                        <span className="px-2 py-[6px] bg-[#2B2825] text-[#FFD08E] rounded-[8px]">
                                            {row.tx}
                                        </span>
                                    )}
                                    
                                </TableCell>
                                <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">{row.quantity}</TableCell>
                                <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">{row.option}</TableCell>
                                <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">
                                    <div className="flex gap-2 items-center">
                                        {row.optionType === 'Call' ? (
                                            <CallIconDark width="14" height="14"/>
                                        ) : (
                                            <PutIconDark width="14" height="14"/>
                                        )}
                                        {row.optionType}
                                    </div>
                                </TableCell>
                                <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">{row.strikePrice}</TableCell>
                                <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">{row.expiry}</TableCell>
                                <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">${row.size}</TableCell>
                                <TableCell className="text-sm text-foreground font-normal text-justify pl-3 pr-5 py-[14px] ">{row.purchaseDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}