import { ChevronLeft, ChevronRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { AvatarIcon, CallIconDark, PutIconDark } from "@/public/svgs/icons";

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

];


export default function RecentTrades(){
    return (
        <div className="border h-full rounded-b-[26px] flex flex-col justify-between">
            <Table className="h-full">
                <TableHeader>
                    <TableRow className="w-full p-0">
                        <TableHead className="text-xs text-secondary-foreground font-medium text-justify pl-5 pr-3 py-4">Profile</TableHead>
                        <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4">Bought/Sold</TableHead>
                        <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4">Quantity</TableHead>
                        <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4">Option</TableHead>
                        <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4">Call/Put</TableHead>
                        <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 whitespace-nowrap overflow-hidden">Strike Price</TableHead>
                        <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 whitespace-nowrap overflow-hidden">Expiry Date</TableHead>
                        <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 whitespace-nowrap overflow-hidden">Trade Size</TableHead>
                        <TableHead className="text-xs text-secondary-foreground font-medium text-justify pr-5 pl-3 py-4 whitespace-nowrap overflow-hidden">Purchase Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {RecentTradesData.map((row) => (
                        <TableRow key={row.id} className="border-none w-full">
                            <TableCell className="text-sm text-foreground font-normal text-justify pl-5 pr-3 py-3 whitespace-nowrap overflow-hidden text-ellipsis">
                                <div className="flex gap-[10px] items-center">
                                    <AvatarIcon />
                                    {row.profile}
                                </div>
                                
                            </TableCell>
                            <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] whitespace-nowrap overflow-hidden text-ellipsis">
                                <span className="px-2 py-[6px] bg-[#23293E] text-[#A3BFFB] rounded-[8px]">
                                    {row.tx}
                                </span>
                            </TableCell>
                            <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] whitespace-nowrap overflow-hidden text-ellipsis">{row.quantity}</TableCell>
                            <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] whitespace-nowrap overflow-hidden text-ellipsis">{row.option}</TableCell>
                            <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] whitespace-nowrap overflow-hidden text-ellipsis">
                                <div className="flex gap-2 items-center">
                                    {row.optionType === 'Call' ? (
                                        <CallIconDark />
                                    ) : (
                                        <PutIconDark />
                                    )}
                                    {row.optionType}
                                </div>
                            </TableCell>
                            <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] whitespace-nowrap overflow-hidden text-ellipsis">{row.strikePrice}</TableCell>
                            <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] whitespace-nowrap overflow-hidden text-ellipsis">{row.expiry}</TableCell>
                            <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] whitespace-nowrap overflow-hidden text-ellipsis">${row.size}</TableCell>
                            <TableCell className="text-sm text-foreground font-normal text-justify pl-3 pr-5 py-[14px] whitespace-nowrap overflow-hidden text-ellipsis">{row.purchaseDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="px-6 pb-4 flex justify-end">
                <div className="flex items-center gap-5">
                    <button className="p-2 rounded-[12px] bg-secondary flex items-center h-9 w-9">
                        <ChevronLeft className="w-fit h-fit text-secondary-foreground" />
                    </button>
                    <div className="space-x-2">   
                        <button className="p-[6px] w-9 h-9 rounded-[12px] bg-backgroundSecondary">1</button>
                        <button className="p-[6px] w-9 h-9 rounded-[12px] bg-backgroundSecondary">2</button>
                        <button className="p-[6px] w-9 h-9 rounded-[12px] bg-backgroundSecondary">3</button>
                        <span>...</span>
                        <button className="py-[6px] px-2 rounded-[12px] bg-backgroundSecondary w-fit h-fit">109</button>
                    </div>
                    
                    <button className="p-2 rounded-[12px] bg-secondary flex items-center h-9 w-9">
                        <ChevronRight className="w-fit h-fit text-secondary-foreground" />
                    </button>
                </div>
            </div>
        </div>
    )
}