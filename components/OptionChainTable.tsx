'use client'
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { tokenList } from "@/lib/data/tokenlist";
import type { PythPriceState } from "@/hooks/usePythPrice";
import { formatPrice } from "@/utils/formatter";
import { Select, SelectContent, SelectTrigger } from "./ui/select";
import { ChevronsUpDown } from "lucide-react";
import { generateOptionChainData, OptionChainData } from "@/lib/data/dummyData";
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";

interface OptionChainTableProps{
    tokenIdx: number
    priceData: PythPriceState;
    priceLoading: boolean;
    dummyData: OptionChainData[];
    optionIdx: number;
    onOptionIdxChange: (idx:number) => void;
    onBidPriceChange: (amount: number) => void;
    position: 'Long' | 'Short';
    contract: 'Call' | 'Put';
    onPositionChange: (position: 'Long' | 'Short') => void;
    onContractChange: (contract: 'Call' | 'Put') => void;
}

export default function OptionChainTable({
    tokenIdx, 
    priceData, 
    priceLoading, 
    dummyData, 
    contract, 
    position, 
    optionIdx,
    onContractChange, 
    onPositionChange,
    onOptionIdxChange,
    onBidPriceChange
} : OptionChainTableProps){

    const tokens = tokenList;
    const [activeTab, setActiveTab] = useState<'Buy' | 'Sell'>('Buy')
    const handleClick = (idx: number) => {
        if(idx === optionIdx){
            onOptionIdxChange(-1)
        }else{
            onOptionIdxChange(idx)
        }
    }

    return (
        <main className="w-full flex flex-col space-y-4"  style={{ height: 'calc(100vh - 155px)' }}>
            <section className="w-full flex flex-col border rounded-sm">
                {/* <div className="flex lg:flex-col space-y-1 border-b p-4">
                    <span className="text-xs lg:text-base text-secondary-foreground font-medium">{tokens[tokenIdx].symbol} ${priceData.price ? formatPrice(priceData.price) : priceLoading}</span>
                    <h1 className="text-xl lg:text-3xl">{tokens[tokenIdx].symbol} {contract}</h1>
                </div> */}
                <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4">
                    <div className="flex gap-4 w-full">
                        <div className="flex w-full lg:w-auto">
                            <Button
                                className={`w-full lg:w-20 rounded-r-none ${
                                    activeTab === 'Buy' 
                                    ? 'bg-primary border border-primary text-black' 
                                    : 'bg-primary/10 border border-primary text-primary'
                                }`}
                                onClick={() => setActiveTab('Buy')}
                            >
                                Buy
                            </Button>
                            <Button 
                                className={`w-full lg:w-20 rounded-l-none ${
                                    activeTab === 'Sell' 
                                    ? 'bg-primary border border-primary text-black' 
                                    : 'bg-primary/10 border border-primary text-primary'
                                }`}
                                onClick={() => setActiveTab('Sell')}
                            >
                                Sell
                            </Button>
                        </div>
                        <div className="flex w-full lg:w-auto">
                            <Button 
                                className={`w-full lg:w-20 rounded-r-none ${
                                    contract === 'Call' 
                                        ? 'bg-green-500 border border-green-500 text-black'
                                        : 'bg-red-500/10 border border-red-500 text-red-500'
                                    }`}
                                onClick={() => onContractChange('Call')}
                            >
                                Call
                            </Button>
                            <Button 
                                className={`w-full lg:w-20 rounded-l-none ${
                                    contract === 'Put' 
                                        ? 'bg-red-500 border border-red-500 text-black'
                                        : 'bg-green-500/10 border border-green-500 text-green-500'
                                    }`}
                                onClick={() => onContractChange('Put')}
                            >
                                Put
                            </Button>
                            
                        </div>
                    </div>
                    <Select>
                        <SelectTrigger className="w-full lg:w-72">
                            <span>Expiring June 21 (46d)</span>
                            <ChevronsUpDown />
                        </SelectTrigger>
                        <SelectContent>

                        </SelectContent>
                    </Select>
                </div>
            </section>
            <section className="w-full hidden lg:flex flex-grow border rounded-sm overflow-y-hidden">
                {activeTab === 'Buy' ? (
                    <ScrollArea className="w-full overflow-y-auto">
                    <Table>
                        <TableHeader className="top-0 left-0 sticky bg-background">
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
                            {dummyData.map((option, idx) => (
                                <TableRow key={idx} className="">
                                    <TableCell>${option.strikePrice}</TableCell>
                                    <TableCell>${option.breakeven}</TableCell>
                                    <TableCell>{option.chanceofProfit}</TableCell>
                                    <TableCell>{option.percentChange}</TableCell>
                                    <TableCell>{option.change}</TableCell>
                                    <TableCell className="flex items-center">
                                        <div 
                                            className={`
                                                    border border-primary border-r-0 p-1 h-fit 
                                                    rounded-sm rounded-r-none flex justify-center w-20
                                                    ${optionIdx===idx ? 'bg-primary text-black hover:bg-primary/80' : 'bg-transparent text-primary'}
                                                `}
                                            >
                                            ${(option.bidPrice).toFixed(2)}
                                        </div>
                                        <Button 
                                            variant={'outline'}
                                            className={`p-1 h-fit border-primary font-bold rounded-l-none w-8 
                                                    ${optionIdx===idx ? 'bg-primary text-black hover:bg-primary/80 border-l-black' : 'bg-transparent text-primary'}
                                                `}    
                                            onClick={() => {
                                                handleClick(idx)
                                            }}
                                        >
                                            {optionIdx === idx ? (
                                                '✓'
                                            ) : (
                                                '+'
                                            )}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </ScrollArea>
                ) : (
                    <div className="w-full flex justify-center items-center h-full">
                        No Positions Open
                    </div>
                )}
            </section>
            <section className="lg:hidden flex flex-grow border">
                <ScrollArea>
                    
                </ScrollArea>
            </section>

        </main>
    )
}