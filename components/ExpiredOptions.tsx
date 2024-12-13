import { Bitcoin } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function ExpiredOptions(){
    return (
        <div className="w-full bg-backgroundSecondary p-6 rounded-2xl">
            <div 
                className="flex justify-between"
            >
                <div className="flex justify-between items-center gap-2">
                    <Bitcoin className="w-6 h-6 bg-orange-400 rounded-full p-1"/>
                    <span className="text-base font-medium">BTC</span>
                    <Badge className="bg-primary-foreground border-none text-[8px] text-primary px-1">CALL</Badge>
                </div>
                <Button variant='outline' className="bg-transparent h-auto p-1 border-secondary-foreground text-xs hover:bg-transparent">
                    Collect
                </Button>
            </div>
        </div>
    )
}