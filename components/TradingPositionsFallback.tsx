import { Ban, EllipsisVertical, RotateCw } from "lucide-react"
import { Button } from "./ui/button"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import { useState } from "react"
import WalletModal from "./WalletModal"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { WalletIcon } from "@/public/svgs/icons"


export default function TradingPositionsFallback() {
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
    

    return (
        <div className="w-full h-[230px] border rounded-sm flex flex-col">
            <div className="w-full flex justify-between px-3 py-1 md:px-6 md:py-3 border-b">
                <Tabs defaultValue="Positions" className="p-0 whitespace-nowrap overflow-hidden"> 
                    <TabsList className="w-full grid grid-cols-3 bg-inherit text-secondary-foreground p-0 gap-2 md:gap-6">
                        <TabsTrigger 
                            value='Positions'
                            className="text-[11px] md:text-sm px-2 py-[2px] border-b-[1px] rounded-none border-transparent data-[state=active]:border-primary"
                        >
                            Open Positions
                        </TabsTrigger>
                        <TabsTrigger 
                            value="Orders"
                            className="text-[11px] md:text-sm px-2 py-[2px] border-b-[1px] rounded-none border-transparent data-[state=active]:border-primary"
                        >
                            Expired Options
                        </TabsTrigger>
                        <TabsTrigger 
                            value="History"
                            className="text-[11px] md:text-sm px-2 py-[2px] border-b-[1px] rounded-none border-transparent data-[state=active]:border-primary"
                        >
                            Order History
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className="hidden md:flex gap-3 items-center">
                    <Button
                        className="bg-secondary p-2 w-full h-auto rounded-sm"
                    >
                        <RotateCw className="text-secondary-foreground"/>
                    </Button>
                    <Button
                        className="bg-secondary w-full h-auto py-[6px] px-[10px] rounded-sm"
                    >
                        <Ban className="text-secondary-foreground p-0"/>
                        <span className="text-sm font-normal text-secondary-foreground p-0">Cancel all</span>
                    </Button>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            className="bg-inherit p-[6px] w-fit h-auto rounded-[10px] md:hidden shadow-none"
                        >
                            <EllipsisVertical className="text-secondary-foreground"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="p-1 min-w-fit rounded-[12px]">
                        <DropdownMenuItem className="space-x-[6px] gap-0 w-fit">
                            <RotateCw className="w-fit text-secondary-foreground"/>
                            <span>Reload</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="w-fit space-x-[6px] gap-0">
                            <Ban className="text-secondary-foreground"/>
                            <span>Cancel All</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="w-full m-auto p-6 flex justify-center">
                <div className="flex flex-col gap-3 items-center">
                    <span>To view your orders</span>
                    <Button
                        onClick={() => setIsWalletModalOpen(true)}
                        className="text-background rounded-sm"
                    >
                        <WalletIcon />
                        <span className="text-sm font-semibold">Connect Wallet</span>
                    </Button>
                    <WalletModal 
                        isOpen={isWalletModalOpen} 
                        onClose={() => setIsWalletModalOpen(false)}
                    />
                </div>
            </div>
        </div>
    )
}