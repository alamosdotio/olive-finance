import { useState } from "react"
import { CardContent, CardHeader } from "./ui/card"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import { cn } from "@/lib/utils"
import { TabsContent } from "@radix-ui/react-tabs"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { RefreshCcw } from "lucide-react"
import { Input } from "./ui/input"
import { Slider } from "./ui/slider"


interface PortfolioFlippedProps{
    onClose: () => void
    coin: string
}

export default function PortfolioFlipped({onClose, coin}:PortfolioFlippedProps){
    const [activeTab, setActiveTab] = useState<"Open" | "Close">("Open")
    const [amount, setAmount] = useState<number>(0)
    const maxAmount = 100000

    const resetToDefault = () => {
        setAmount(0);
    };

    const handleSliderChange = (value: number[]) => {
        setAmount(value[0])
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value.replace(/[^0-9.]/g, ''))
        if (!isNaN(value) && value <= maxAmount) {
        setAmount(value)
        }
    }
    
    return(
            <Tabs defaultValue="Open"
                onValueChange={(value)=>setActiveTab(value as "Open" | "Close")}
                className="bg-backgroundSecondary flex flex-col h-full space-y-4"
            >
                <CardHeader className="flex-shrink-0 pb-3">
                    <TabsList className="w-full grid grid-cols-2 bg-backgroundSecondary text-dark">
                        <TabsTrigger 
                            value="Open"
                            className={cn(
                            "data-[state=active]:bg-secondary data-[state=active]:text-light data-[state=active]:border-2 data-[state=active]:border-primary rounded-full"
                            )}
                        >
                            Open
                        </TabsTrigger>
                        <TabsTrigger 
                            value="Close"
                            className={cn(
                            "data-[state=active]:bg-secondary data-[state=active]:text-light data-[state=active]:border-2 data-[state=active]:border-primary rounded-full"
                            )}
                        >
                            Close
                        </TabsTrigger>
                    </TabsList>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow py-0">
                    <TabsContent value={activeTab} className="flex flex-col h-full">
                    <div className="flex flex-col flex-grow space-y-2">
                        <div className="flex justify-between items-end">
                            <Label htmlFor="amount-input" className="text-sm font-medium">Amount</Label>
                            <Button
                                type="button"
                                variant="ghostPink"
                                size="icon"
                                className="h-6 w-6 rounded-md bg-secondary p-0"
                                onClick={resetToDefault}
                                aria-label="Reset amount"
                            >
                                <RefreshCcw className="text-dark text-sm" />
                            </Button>
                        </div>
                        <Input 
                            id="amount-input"
                            type="text"
                            value={`$${amount.toLocaleString()}`}
                            onChange={handleInputChange}
                            className="text-left"
                            aria-label="Enter open/close amount"
                        />
                        <Slider 
                            value={[amount]}
                            max={maxAmount}
                            step={100}
                            onValueChange={handleSliderChange}
                            className="py-4"
                            aria-label="Adjust open/close amount"/>
                        <div className="flex flex-col space-y-2 py">
                            <div className="flex justify-between items-center text-xs md:text-xs lg:text-xs">
                                <span className="font-normal">{activeTab === 'Open'? 'Open' : 'Closing'} Fee:</span>
                                <span className="font-semibold">0.00 {coin}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs md:text-xs lg:text-xs">
                                <span className="font-normal">Max Sell:</span>
                                <span className="font-semibold">0.00 {coin}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs md:text-xs lg:text-xs">
                                <span className="font-normal">Price Impact:</span>
                                <span className="font-semibold">0.00 {coin}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs md:text-xs lg:text-xs">
                                <span className="font-normal">Available Liquidity:</span>
                                <span className="font-semibold">0.00 {coin}</span>
                            </div>
                        </div>
                    </div>
                    </TabsContent>
                    <div className="flex-shrink-0 pb-4 w-full">
                            {/* to optimize */}
                            {activeTab === 'Open'? (
                                <Button className="w-full border-2 border-primary bg-primary text-black rounded-full" variant='unselected'>
                                    Buy
                                </Button>
                            ) : (
                                <Button className="w-full border-2 border-primary bg-primary text-black rounded-full" variant='unselected'>
                                    Sell
                                </Button>
                            )}
                    </div>
                </CardContent>
            </Tabs>
    )
}