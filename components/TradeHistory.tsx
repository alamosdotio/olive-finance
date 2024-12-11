import { cn } from "@/lib/utils"
import { Bitcoin, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { useState } from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"


interface TradeDetails{
    deposited: number,
    filled: number
    expiry: string,
}

export default function TradeHistory(){
    const [expandedPositions, setExpandedPositions] = useState<boolean>(false)
    const [activeTab, setActiveTab] = useState<string>('Overview')

    const tradeDetails: TradeDetails = {
        deposited: 0.02,
        filled: 0.02,
        expiry: "12/12/2024",
    }

    const handleClickTab = (state: string) =>{
        if(activeTab!==state){
            setActiveTab(state)
        }
    }
    return(
        <div 
            className={cn(
                "w-full bg-backgroundSecondary",
                expandedPositions ? "space-y-0 rounded-md" : 'rounded-2xl'
            )}
        >
            <div 
                className="w-full p-6 cursor-pointer flex justify-between"
                onClick={()=>setExpandedPositions(!expandedPositions)}
            >
                <div className="flex justify-between items-center gap-2">
                    <Bitcoin className="w-6 h-6 bg-orange-400 rounded-full p-1"/>
                    <span className="text-base font-medium">BTC</span>
                    <Badge className="bg-primary-foreground border-none text-[8px] text-primary px-1">CALL</Badge>
                </div>
                {expandedPositions ? <ChevronUp /> : <ChevronDown />}
            </div>
            { expandedPositions && (
                <div className="px-6 pb-2 w-full flex justify-between">
                    <div className="">
                    <Button
                        variant={activeTab === 'Overview' ? 'active' : 'inactive'}
                        className={cn(activeTab === 'Overview' ? 'border-primary' : 'border-transparent', "text-base font-medium border-b-2 rounded-none")}
                        onClick={()=>handleClickTab('Overview')}
                    >
                        Overview
                    </Button>
                    <Button
                        variant={activeTab === 'Transaction' ? 'active' : 'inactive'}
                        className={cn(activeTab === 'Transaction' ? 'border-primary' : 'border-transparent', "text-base font-medium border-b-2 rounded-none")}
                        onClick={()=>handleClickTab('Transaction')}
                    >
                        Transactions
                    </Button>
                    </div>
                    <div className="flex gap-2 items-center p-0">
                        <Button 
                            type="button"
                            variant='outline' 
                            size='lg' 
                            className="h-auto w-auto rounded-lg bg-transparent p-2 border-secondary-foreground hover:bg-transparent"
                        >
                            <ExternalLink className="text-secondary-foreground text-xs"/>
                        </Button>
                    </div>
                </div>
                
            )}
            { expandedPositions && (
                activeTab === 'Overview' ? (
                    <div className="p-6 bg-secondary rounded-b-md">
                        <div className="flex flex-col text-foreground space-y-4">
                            <div className="flex justify-between">
                                <span className="text-sm font-medium">Total Deposited: </span>
                                <span className="text-sm font-medium">{tradeDetails.deposited}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium">Total Filled: </span>
                                <span className="text-sm font-medium">{tradeDetails.filled}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium">Expiry: </span>
                                <span className="text-sm font-medium">{tradeDetails.expiry}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-6 bg-secondary rounded-b-md">transactions go here</div>
                )
            )}
            
        </div>
    )
}