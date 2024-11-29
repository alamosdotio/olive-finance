'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import { cn } from "@/lib/utils"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { RefreshCcw } from "lucide-react"
import { Slider } from "./ui/slider"
import { TabsContent } from "@radix-ui/react-tabs"

interface StrategyFlippedProps {
    onClose: () => void
    strategy?:{
        name: string
        apy: number
    }
}

export default function StrategyFlipped({onClose, strategy}:StrategyFlippedProps){
    const [amount, setAmount] = useState<number>(0)
    const [isPreview, setIsPreview] = useState(false)
    const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit")
    const maxAmount = 100000
  
    const resetToDefault = () => {
        setAmount(0);
        setIsPreview(false);
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

    const handlePreviewClick = () => {
        setIsPreview(true)
    }


    return (
        <Card className="w-full h-full min-h-[384px] space-x-2">
            <Tabs
                defaultValue="deposit"
                onValueChange={(value) => setActiveTab(value as "deposit" | "withdraw")}
                className="flex flex-col h-full"
            >
                <CardHeader className="flex-shrink-0 pb-3">
                    <TabsList className="w-full grid grid-cols-2 bg-secondary text-dark">
                    <TabsTrigger
                        value="deposit"
                        className={cn(
                        "data-[state=active]:bg-gradient data-[state=active]:text-light"
                        )}
                    >
                        Deposit
                    </TabsTrigger>
                    <TabsTrigger
                        value="withdraw"
                        className={cn(
                        "data-[state=active]:bg-gradient data-[state=active]:text-light"
                        )}
                    >
                        Withdraw
                    </TabsTrigger>
                    </TabsList>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow py-0">
                    <TabsContent value={activeTab} className="flex flex-col h-full">
                    <div className="flex flex-col flex-grow space-y-2">
                        <div className="flex justify-between items-center">
                        <Label htmlFor="amount-input">Amount</Label>
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
                        <div className="flex flex-col space-y-2 flex-grow">
                            <Input
                                id="amount-input"
                                type="text"
                                value={`$${amount.toLocaleString()}`}
                                onChange={handleInputChange}
                                className="text-left"
                                aria-label="Enter deposit/withdraw amount"
                            />
                            <Slider
                                value={[amount]}
                                max={maxAmount}
                                step={100}
                                onValueChange={handleSliderChange}
                                className="py-4"
                                aria-label="Adjust deposit/withdraw amount"
                            />
                            <div className="flex flex-col">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-normal">Balance:</span>
                                    <span className="font-bold">0.00</span>
                                </div>
                                {isPreview && (
                                    <div className="flex flex-col pt-2 space-y-1 text-sm">
                                        <span className="font-bold">Summary</span>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-normal">Product Name:</span>
                                            <span className="font-bold">Strategy</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-normal">Deposit Amount:</span>
                                            <span className="font-bold">{amount} USDT</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-normal">APY:</span>
                                            <span className="font-bold">{strategy?.apy}%</span>
                                        </div>
                                    </div>
                                )}
                                
                            </div>
                            
                        </div>
                    </div>
                    {isPreview && (
                        <div className="flex-shrink-0 pb-4 w-full">
                            <Button
                                variant='outline'
                                className="w-full text-dark border-dark hover:text-primary-foreground"
                                onClick={handlePreviewClick}
                            >
                                {activeTab === "deposit" ? "Deposit" : "Withdraw"} Now
                                
                            </Button>
                        </div>
                    )}
                    {!isPreview &&(
                        <div className="flex-shrink-0 pb-4 w-full">
                            <Button
                                variant='outline'
                                className="w-full text-dark border-dark hover:text-primary-foreground"
                                onClick={handlePreviewClick}
                            >
                                Preview {activeTab === "deposit" ? "Deposit" : "Withdrawal"}
                            </Button>
                        </div>
                    )}
                    </TabsContent>
                </CardContent>
            </Tabs>
        </Card>
    )
}