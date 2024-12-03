'use client'

import { useState } from "react"
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

import btc from '../public/images/bitcoin.png'
import { RefreshCcw, History} from 'lucide-react';

import Image from "next/image";
import swapIcon from "@/public/svgs/swapdark.svg"
import swapLight from "@/public/svgs/swap.svg"
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { CalendarDays } from 'lucide-react';
import { Calendar } from "./ui/calendar";
import WalletModal from "./WalletModal";
import { useWallet } from "@/contexts/walletprovider";
import { useTheme } from "next-themes";


export default function OptionsCard(){
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
    const { theme } = useTheme()
    const [position, setPosition] = useState<string>("long");
    const [date, setDate] = useState<Date>();
    const [formValues, setFormValues] = useState<{
        selling: { currency: string; amount: string };
        buying: { type: string; amount: string };
        expiryDate: Date | undefined;
        strikePrice: string;
    }>({
        selling: { currency: 'btc', amount: '' },
        buying: { type: 'call', amount: '' },
        expiryDate: undefined,
        strikePrice: ''
      })

    const { isConnected, walletName } = useWallet();
 
    return (
        <>
            <Card className="w-full max-w-[600px] mx-auto flex flex-col py-10 px-0 border-none shadow-none">
                <CardContent className="space-y-6 flex-grow overflow-auto">
                    <Tabs 
                        defaultValue="American"
                        className="w-full"
                        onValueChange={(value)=>setPosition(value)}
                    >
                        <TabsList className="grid w-full h-[56px] grid-cols-4 bg-backgroundSecondary text-dark p-2 rounded-full">
                            <TabsTrigger value="American" 
                                className={cn("data-[state=active]:bg-secondary data-[state=active]:text-primary h-[40px] rounded-full")}>
                                American
                            </TabsTrigger>
                            <TabsTrigger value="European" 
                                className={cn("data-[state=active]:bg-secondary data-[state=active]:text-primary h-[40px] rounded-full")}>
                                European
                            </TabsTrigger>
                            <TabsTrigger value="Asian" disabled
                                className={cn("data-[state=active]:bg-secondary data-[state=active]:text-primary h-[40px] rounded-full")}>
                                Asian
                            </TabsTrigger>
                            <TabsTrigger value="Rainbow" disabled
                                className={cn("data-[state=active]:bg-secondary data-[state=active]:text-primary h-[40px] rounded-full")}>
                                Rainbow
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="space-y-2">
                        <div className="flex justify-end mb-1 gap-1">
                            <Button 
                                type="button" 
                                size='icon' 
                                className="h-8 w-8 rounded-md bg-backgroundSecondary p-0"
                            >
                                <History className="text-iconBright text-sm"/>
                                <span className="sr-only">History</span>
                            </Button>
                            <Button 
                                type="button" 
                                size='icon' 
                                className="h-8 w-8 rounded-md bg-backgroundSecondary p-0 "
                                onClick={() => {
                                    setFormValues({
                                        selling: {currency: 'btc', amount:''},
                                        buying: { type: 'call', amount: ''},
                                        expiryDate: undefined,
                                        strikePrice: ''
                                    })
                                }}
                            >
                                <RefreshCcw className="text-iconBright text-sm"/>
                                <span className="sr-only">Reset</span>
                            </Button>
                        </div>
                        <div className="space-y-0">
                            <div className="flex relative">
                                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 p-2">
                                    <Label className="font-medium">You&apos;re Selling</Label>
                                    <Select value={formValues.selling.currency} onValueChange={(value) => setFormValues(prev => ({ ...prev, selling: { ...prev.selling, currency: value } }))}>
                                        <SelectTrigger className="w-[150px] h-[40px]">
                                        <div className="flex items-center space-x-2">
                                            <Image src={btc} alt="bitcoin" height={24} width={24}/>
                                            <SelectValue placeholder="Select"/>
                                        </div>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="btc" >BTC</SelectItem>
                                            <SelectItem value="eth">ETH</SelectItem>
                                            <SelectItem value="sol">SOL</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={formValues.selling.amount}
                                    onChange={(e) => setFormValues(prev => ({ ...prev, selling: { ...prev.selling, amount: e.target.value } }))}
                                    className="flex-1 w-full h-[90px] text-right text-lg md:text-xl border-none shadow-none bg-backgroundSecondary"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-center relative">
                            <div className="border-t border-backgroundSecondary w-full absolute"></div>
                            <Button variant="ghostPink" className="h-12 w-12 rounded-md bg-backgroundSecondary z-10 p-2">
                                {theme === 'dark' && (
                                    <Image src={swapIcon} alt="swap" width={32} height={32}/>
                                )}
                                {theme === 'light' && (
                                    <Image src={swapLight} alt="swap" width={32} height={32}/>
                                )}
                                
                            </Button>
                        </div>
                        <div className="space-y-0">
                            <div className="flex relative">
                                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 p-2">
                                    <Label className="font-medium">You&apos;re Buying</Label>
                                    <Select value={formValues.buying.type} onValueChange={(value) => setFormValues(prev => ({ ...prev, buying: { ...prev.buying, type: value } }))}>
                                        <SelectTrigger className="w-[150px] h-[40px]">
                                        <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        <SelectItem value="call">Call</SelectItem>
                                        <SelectItem value="put">Put</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    className="flex-1 w-full h-[90px] text-right text-lg md:text-xl border-none bg-backgroundSecondary"
                                    value={formValues.buying.amount}
                                    onChange={(e) => setFormValues(prev => ({ ...prev, buying: { ...prev.buying, amount: e.target.value } }))}
                                />
                            </div>
                        </div>
                        <div className="border-none border-input rounded-md p-2 space-y-0 h-[80px] flex flex-col justify-center bg-backgroundSecondary">
                            <Label className="font-medium pl-2">Expiry Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button 
                                        variant={'calendar'}
                                        className={cn("w-full justify-between text-left font-normal p-2",
                                            !formValues.expiryDate && "text-muted-foreground bg-backgroundSecondary"
                                        )}
                                    >
                                        {formValues.expiryDate ? format(formValues.expiryDate, "MM/dd/yyyy") : <span className="font-normal">Enter Expiry Date</span>}
                                        <CalendarDays className="ml-2 h-4 w-4 text-iconBright" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="end">
                                    <Calendar 
                                        mode="single"
                                        selected={formValues.expiryDate}
                                        onSelect={(date) => {
                                            setFormValues(prev => ({ ...prev, expiryDate: date }))
                                            setDate(date)
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="border-none border-input rounded-md p-2 space-y-0 h-[80px] flex flex-col justify-center bg-backgroundSecondary">
                            <Label className="font-medium p-2">Strike Price</Label>
                            <Input
                                type="number"
                                placeholder="Enter Strike Price"
                                value={formValues.strikePrice}
                                onChange={(e) => setFormValues(prev => ({ ...prev, strikePrice: e.target.value }))}
                                className="h-[56px] text-base border-none shadow-none p-2"
                            />
                        </div>
                    </div>
                </CardContent>
                <div className="w-full flex justify-center items-center h-[56px] px-[24px]">
                    <Button variant={'selected'} className="w-full flex " onClick={() => isConnected ? console.log('Initiate Trade') : setIsWalletModalOpen(true)}>
                        {isConnected && walletName ? `Trade With ${walletName}` : 'Connect Wallet to Trade'}
                    </Button>
                    <WalletModal 
                        isOpen={isWalletModalOpen} 
                        onClose={() => setIsWalletModalOpen(false)}
                    />
                </div>
            </Card>
        </>
    )
}