import { dummyPoolTrades } from "@/lib/data/dummyData";
import { ScrollArea } from "./ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { AvatarIcon } from "@/public/svgs/icons";

export default function PoolTradesTable(){
    const trades = dummyPoolTrades;

    return (
        <div className="border-none border-t-0 w-full h-full rounded-b-sm flex flex-col justify-between">
            <ScrollArea className="h-full rounded-b-sm w-full">
                <Table className="w-full whitespace-nowrap overflow-hidden">
                    <TableHeader className="w-full p-0">
                        <TableRow className="p-0">
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify pl-5 pr-3 py-4">Profile</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">Deposit/Withdrawal</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">Quantity</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">Paid/Received</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">Fees</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">Pool</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">Date & Time</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">USDC Weight</TableHead>
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify pr-5 pl-3 py-4 ">SOL Weight</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {trades.map((tx, idx) => (
                            <TableRow key={idx} className="border-none w-full">
                                <TableCell className="text-sm text-foreground font-normal text-justify pl-5 py-3 w-fit">
                                    <div className="flex gap-[10px] items-center">
                                        <AvatarIcon />
                                        {tx.profile}
                                    </div>
                                </TableCell>
                                <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">
                                    {tx.type === 'Deposit' ? (
                                        <span className="px-2 py-[6px] bg-[#A3BFFB]/20 text-[#A3BFFB] rounded-[8px]">
                                            {tx.type}
                                        </span>
                                    ) : (
                                        <span className="px-2 py-[6px] bg-[#FFD08E]/20 text-[#FFD08E] rounded-[8px]">
                                            {tx.type}
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">
                                    {tx.quantity}
                                </TableCell>
                                <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">
                                    {tx.paidReceived}
                                </TableCell>
                                <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">
                                    {tx.fees}
                                </TableCell>
                                <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">
                                    {tx.pool}
                                </TableCell>
                                <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">
                                    {tx.dateTime}
                                </TableCell>
                                <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">
                                    {tx.usdcWeight}
                                </TableCell>
                                <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">
                                    {tx.solWeight}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
        
    )
}