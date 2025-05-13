import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { AvatarIcon, CallIconDark, PutIconDark } from "@/public/svgs/icons";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { dummyOptionTrades } from "@/lib/data/dummyData";


export default function RecentTrades(){
    const RecentTradesData = dummyOptionTrades;
    return (
        <div className="border-none border-t-0 w-full h-full rounded-b-sm flex flex-col justify-between">
            <ScrollArea className="h-full rounded-b-sm w-full">
                <Table className="whitespace-nowrap overflow-hidden">
                    <TableHeader className="w-full">
                        <TableRow className="p-0">
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify pl-5 pr-3 py-4 ">Profile</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">Bought/Sold/Exercised</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">Quantity</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">Paid/Received</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">Fees</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">Pool</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">Call/Put</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">Strike Price</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">Expiry Date</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">Trade Size</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify pr-5 pl-3 py-4 ">Purchase Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="w-full">
                        {RecentTradesData.map((row, idx) => (
                            <TableRow key={idx} className="border-none w-full">
                                <TableCell className="text-sm text-foreground font-normal text-justify pl-5 pr-3 py-3 ">
                                    <div className="flex gap-[10px] items-center">
                                        <AvatarIcon />
                                        {row.profile}
                                    </div>
                                    
                                </TableCell>
                                <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">
                                    {row.tx === 'Bought' ? (
                                        <span className="px-2 py-[6px] bg-[#A3BFFB]/20 text-[#A3BFFB] rounded-[8px]">
                                            {row.tx}
                                        </span>
                                    ) : row.tx === 'Sold' ? (
                                        <span className="px-2 py-[6px] bg-[#FFD08E]/20 text-[#FFD08E] rounded-[8px]">
                                            {row.tx}
                                        </span>
                                    ) : (
                                        <span className="px-2 py-[6px] bg-[#A5F3C0]/20 text-[#A5F3C0] rounded-[8px]">
                                            {row.tx}
                                        </span>
                                    )}         
                                </TableCell>
                                <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">{row.quantity}</TableCell>
                                <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">{row.paidReceived}</TableCell>
                                <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">{row.fees}</TableCell>
                                <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">{row.pool}</TableCell>
                                <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">
                                    <div className="flex gap-2 items-center">
                                        {row.type === 'Call' ? (
                                            <CallIconDark width="14" height="14"/>
                                        ) : (
                                            <PutIconDark width="14" height="14"/>
                                        )}
                                        {row.type}
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