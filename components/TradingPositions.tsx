import { Ban, ChevronDown, History, RotateCw } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Bitcoin } from "lucide-react"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination"
import { useState } from "react"
import OpenPositions from "./OpenPositions"
import TradeHistory from "./TradeHistory"
import ExpiredOptions from "./ExpiredOptions"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"

export default function TradingPositions(){
    const [activeTab, setActiveTab] = useState<string>("Positions")

    const handleClickTab = (state:string) =>{
        if(activeTab!==state){
            setActiveTab(state);
        }
    }
    return (
        <div className="w-full h-[300px] border-[1px] rounded-[26px] flex flex-col">
            <div className="w-full flex justify-between px-6 py-3 border-b-[1px]">
                <Tabs defaultValue="Positions" className="p-0"> 
                    <TabsList className="w-full bg-inherit text-secondary-foreground p-0 gap-6">
                        <TabsTrigger 
                            value="Positions"
                            className="px-2 py-[2px] border-b-[1px] rounded-none border-transparent data-[state=active]:border-primary"
                        >
                            Open Positions
                        </TabsTrigger>
                        <TabsTrigger 
                            value="History"
                            className="px-2 py-[2px] border-b-[1px] rounded-none border-transparent data-[state=active]:border-primary"
                        >
                            Order History
                        </TabsTrigger>
                        <TabsTrigger 
                            value="Expired"
                            className="px-2 py-[2px] border-b-[1px] rounded-none border-transparent data-[state=active]:border-primary"
                        >
                            Expired
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className="flex gap-3 items-center">
                    <Button
                        className="bg-secondary p-2 w-full h-auto"
                    >
                        <RotateCw className="text-secondary-foreground"/>
                    </Button>
                    <Button
                        className="bg-secondary w-full h-auto py-[6px] px-[10px]"
                    >
                        <Ban className="text-secondary-foreground p-0"/>
                        <span className="text-sm font-normal text-secondary-foreground p-0">Cancel all</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}