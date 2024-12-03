import { History } from "lucide-react"
import { Button } from "./ui/button"

export default function TradingPositions(){
    return (
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
                className="h-8 w-8 rounded-md bg-transparent p-0 border-secondary-foreground"
            >
                <History className="text-secondary-foreground text-sm"/>
                <span className="sr-only">History</span>
            </Button>
        </div>
    )
}