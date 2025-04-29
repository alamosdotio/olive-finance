'use client'
import { useState } from "react";
import { Button } from "./ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import { tokenList } from "@/lib/data/tokenlist";
import type { PythPriceState } from "@/hooks/usePythPrice";
import { formatPrice } from "@/utils/formatter";
import { Select, SelectContent, SelectTrigger } from "./ui/select";
import { ChevronsUpDown } from "lucide-react";

interface OptionChainTableProps{
    tokenIdx: number
    priceData: PythPriceState;
    priceLoading: boolean;
}

export default function OptionChainTable({tokenIdx, priceData, priceLoading} : OptionChainTableProps){
    const [position, setPosition] = useState<'Long' | 'Short'>('Long')
    const [contract, setContract] = useState<'Call' | 'Put'>('Call')
    const tokens = tokenList;
    return (
        <main className="w-full flex flex-col space-y-4"  style={{ height: 'calc(100vh - 145px)' }}>
            <section className="w-full flex flex-col border rounded-sm">
                <div className="flex flex-col space-y-1 border-b p-4">
                    <span className="text-base text-secondary-foreground font-medium">{tokens[tokenIdx].symbol} ${priceData.price ? formatPrice(priceData.price) : priceLoading}</span>
                    <h1 className="text-3xl">{tokens[tokenIdx].symbol} {position} {contract}</h1>
                </div>
                <div className="w-full flex items-center justify-between p-4">
                    <div className="flex gap-4">
                        <div className="flex">
                            <Button
                                className={`w-20 rounded-r-none ${
                                    position === 'Long' 
                                    ? 'bg-green-500 border border-green-500 text-black' 
                                    : 'bg-red-500/10 border border-red-500 text-red-500'
                                }`}
                                onClick={() => setPosition('Long')}
                            >
                                Long
                            </Button>
                            <Button 
                                className={`w-20 rounded-l-none ${
                                    position === 'Short' 
                                    ? 'bg-red-500 border border-red-500 text-black' 
                                    : 'bg-green-500/10 border border-green-500 text-green-500'
                                }`}
                                onClick={() => setPosition('Short')}
                            >
                                Short
                            </Button>
                        </div>
                        <div className="flex">
                            <Button 
                                className={`w-20 rounded-r-none ${
                                    position === 'Long' 
                                    ? `${
                                        contract === 'Call' 
                                            ? 'bg-green-500 border border-green-500 text-black'
                                            : 'bg-green-500/10 border border-green-500 text-green-500'
                                        }`
                                    : `${
                                        contract === 'Call' 
                                            ? 'bg-red-500 border border-red-500 text-black'
                                            : 'bg-red-500/10 border border-red-500 text-red-500'
                                        }`
                                }`}
                                onClick={() => setContract('Call')}
                            >
                                Call
                            </Button>
                            <Button 
                                className={`w-20 rounded-l-none ${
                                    position === 'Long' 
                                    ? `${
                                        contract === 'Put' 
                                            ? 'bg-green-500 border border-green-500 text-black'
                                            : 'bg-green-500/10 border border-green-500 text-green-500'
                                        }`
                                    : `${
                                        contract === 'Put' 
                                            ? 'bg-red-500 border border-red-500 text-black'
                                            : 'bg-red-500/10 border border-red-500 text-red-500'
                                        }`
                                }`}
                                onClick={() => setContract('Put')}
                            >
                                Put
                            </Button>
                            
                        </div>
                    </div>
                    <Select>
                        <SelectTrigger className="w-72">
                            <span>Expiring June 21 (46d)</span>
                            <ChevronsUpDown />
                        </SelectTrigger>
                        <SelectContent>

                        </SelectContent>
                    </Select>
                </div>
            </section>
            <section className="w-full flex flex-grow border rounded-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Strike Price
                            </TableHead>
                            <TableHead>
                                Breakeven
                            </TableHead>
                            <TableHead>
                               Chance of Profit
                            </TableHead>
                            <TableHead>
                               %Change
                            </TableHead>
                            <TableHead>
                               Change
                            </TableHead>
                            <TableHead>
                               Bid Price
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="">
                                
                    </TableBody>
                </Table>
            </section>
        </main>
    )
}