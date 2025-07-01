'use client'

import { ChevronDown } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useState } from "react"

export function PortfolioCard(){
    const [selectedTimeframe, setSelectedTimeframe] = useState('30D');
    const [selectedAssets, setSelectedAssets] = useState('Options + Futures');


    return(
        <Card className="rounded-sm w-full col-span-3 h-full">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                        <Select value={selectedAssets} onValueChange={setSelectedAssets}>
                            <SelectTrigger asChild>
                                <Button variant="outline" className="bg-transparent">
                                    <SelectValue />
                                    <ChevronDown />
                                </Button>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Options + Futures">Options + Futures</SelectItem>
                                <SelectItem value="Perps Only">Options Only</SelectItem>
                                <SelectItem value="Futures Only">Futures Only</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center gap-2">
                        <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                            <SelectTrigger asChild>
                                <Button variant="outline" className="bg-transparent">
                                    <SelectValue />
                                    <ChevronDown />
                                </Button>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="24H">24H</SelectItem>
                                <SelectItem value="7D">7D</SelectItem>
                                <SelectItem value="30D">30D</SelectItem>
                                <SelectItem value="ALL">ALL TIME</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-secondary-foreground">PNL</span>
                        <span>$0.00</span>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-secondary-foreground">Volume</span>
                        <span>$0.00</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
    
}