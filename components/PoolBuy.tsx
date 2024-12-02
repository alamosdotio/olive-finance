'use client'
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import { Button } from "./ui/button"
import { ChevronDown, RefreshCcw, SlidersHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Input } from "./ui/input"

const cryptocurrencies = [
    { name: 'Bitcoin', symbol: 'BTC', icon: '₿', color: '#F7931A' },
    { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', color: '#627EEA' },
    { name: 'Tether', symbol: 'USDT', icon: '₮', color: '#26A17B' },
    { name: 'Solana', symbol: 'SOL', icon: '◎', color: '#00FFA3' },
]

export default function PoolBuy(){
    const [selectedCrypto, setSelectedCrypto] = useState(cryptocurrencies[0])
    return (
        <div className="p-6 space-y-6">
            <div>
                <div className="text-sm text-muted-foreground mb-1">Your LP</div>
                <div className="text-4xl font-medium mb-1">10,000 OFLP</div>
                <div className="text-lg text-muted-foreground">~ $100</div>
            </div>

            <div className="space-y-6">

                <div className="flex items-center justify-between">
                    <Tabs defaultValue="mint" className="w-52">
                        <TabsList className="grid w-full grid-cols-2 bg-transparent">
                            <TabsTrigger
                                value="mint"
                                className="data-[state=active]:text-dark data-[state=active]:border-b-2 data-[state=active]:border-dark rounded-none"
                            >
                                Mint
                            </TabsTrigger>
                            <TabsTrigger
                                value="redeem"
                                className="data-[state=active]:text-dark data-[state=active]:border-b-2 data-[state=active]:border-dark rounded-none"
                            >
                                Redeem
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="flex gap-2">
                        <Button variant='ghost' size='icon' className="rounded-md bg-secondary w-5 h-5">
                            <RefreshCcw className="h-4 w-4 text-dark"/>
                        </Button>
                        <Button variant='ghost' size='icon' className="rounded-md bg-secondary w-5 h-5">
                            <SlidersHorizontal className="h-4 w-4 text-dark"/>
                        </Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Pay</span>
                        <span className="text-sm text-muted-foreground">0.00000</span>
                    </div>
                    <div className="relative">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant='outline'
                                    className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-5 bg-secondary border-none hover:bg-primary"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6" style={{backgroundColor: selectedCrypto.color}}>
                                            <div className="flex items-center justify-center h-full text-light">
                                                {selectedCrypto.icon}
                                            </div>
                                        </div>
                                        <span className="font-medium text-dark">{selectedCrypto.symbol}</span>
                                        <ChevronDown className="h-4 w-4 text-dark" />
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-52">
                                {cryptocurrencies.map((crypto) => (
                                    <DropdownMenuItem key={crypto.symbol} onSelect={() => setSelectedCrypto(crypto)}>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full" style={{backgroundColor: crypto.color}}>
                                                <div className="flex items-center justify-center h-full text-light rounded-full">
                                                    {crypto.icon}
                                                </div>
                                            </div>
                                            <span>{crypto.name}</span>
                                            <span className="ml-auto text-muted-foreground">{crypto.symbol}</span>
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Input 
                            type="number"
                            placeholder='0.00'
                            className="pl-32 text-right text-xl h-14 bg-transparent border"
                        />
                    </div>
                </div>
                <Button className="w-full h-12 text-base bg-gradient text-light">
                    Buy
                </Button>
            </div>
        </div>
    )
}