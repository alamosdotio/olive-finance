import { ChevronDown, History } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import Image from "next/image"
import { Bitcoin } from "lucide-react"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination"

export default function TradingPositions(){
    return (
        <div className="space-y-6">
            <div className="flex justify-between">
                <div className="flex justify-between gap-2">
                    <Button variant='outline' className="rounded-full bg-[#31332B] border-[#CBE475] text-[#CBE475]  hover:bg-[#31332B] hover:text-[#CBE475]">Open Positions</Button>
                    <Button variant='inactive' className="rounded-full">Trade History</Button>
                    <Button variant='inactive' className="rounded-full">Expired Options</Button>
                </div>
                <Button 
                    type="button"
                    variant='outline' 
                    size='lg' 
                    className="h-8 w-8 rounded-full bg-transparent p-0 border-secondary-foreground hover:bg-transparent"
                >
                    <History className="text-secondary-foreground text-sm"/>
                    <span className="sr-only">History</span>
                </Button>
            </div>

            <div className="w-full bg-secondary rounded-2xl p-6 flex justify-between">
                <div className="flex justify-between items-center gap-2">
                    <Bitcoin className="w-6 h-6 bg-orange-400 rounded-full p-1"/>
                    <span className="text-base font-medium">BTC</span>
                    <Badge className="bg-primary-foreground border-none text-[8px] text-primary px-1">CALL</Badge>
                </div>
                <ChevronDown />
            </div>

            <Pagination className="w-full">
                <PaginationContent className="w-full flex justify-between items-center">
                    <PaginationItem>
                        <PaginationPrevious className="text-secondary"/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink className="rounded-full bg-primary-foreground text-primary">
                            1
                        </PaginationLink>
                        <PaginationLink className="rounded-full text-primary-foreground">
                            2
                        </PaginationLink>
                        <PaginationLink className="rounded-full text-primary-foreground">
                            3
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </div>
        
    )
}