import { ScrollArea } from "./ui/scroll-area";
import { Table, TableHead, TableHeader, TableRow } from "./ui/table";

export default function PoolTradesTable(){
    return (
        <div className="border-none border-t-0 w-full h-full rounded-b-sm flex flex-col justify-between">
            <ScrollArea className="h-full rounded-b-sm w-full">
                <Table className="w-full whitespace-nowrap overflow-hidden">
                    <TableHeader className="w-full p-0">
                        <TableRow className="p-0">
                            <TableHead className="text-xs text-secondary-foreground font-medium text-justify pl-5 pr-3 py-4 ">Profile</TableHead>
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
                </Table>
            </ScrollArea>
        </div>
        
    )
}