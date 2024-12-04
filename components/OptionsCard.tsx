'use client'

import { useState } from "react"
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

import btc from '../public/images/bitcoin.png'
import { RefreshCcw, History, Wallet} from 'lucide-react';

import Image from "next/image";
import swapIcon from "@/public/svgs/swapdark.svg"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import WalletModal from "./WalletModal";
import { useWallet } from "@/contexts/walletprovider";
import { useTheme } from "next-themes";



export default function OptionsCard(){
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
    const { theme } = useTheme()
    const [position, setPosition] = useState<string>("American");
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
        <Card className="border-none p-0 w-full shadow-none">
            <CardContent className="space-y-6 flex flex-col p-0 items-center w-full">
                <Tabs className="w-full"
                    defaultValue="American"
                    onValueChange={(value)=>setPosition(value)}>
                    <TabsList className="grid grid-cols-4 rounded-full gap-2 h-12 p-0 bg-backgroundSecondary text-secondary-foreground">
                        <TabsTrigger 
                            value="American"
                            className="rounded-full h-full  py-3 px-4 data-[state=active]:bg-foreground data-[state=active]:text-black">
                                American
                        </TabsTrigger>
                        <TabsTrigger 
                            value="European"
                            className="rounded-full h-full  py-3 px-4 data-[state=active]:bg-foreground data-[state=active]:text-black">
                                European
                        </TabsTrigger>
                        <TabsTrigger 
                            value="Asian"
                            className="rounded-full h-full  py-3 px-4 data-[state=active]:bg-foreground data-[state=active]:text-black"
                            disabled>
                                Asian
                        </TabsTrigger>
                        <TabsTrigger 
                            value="Rainbow"
                            className="rounded-full  h-full py-3 px-4 data-[state=active]:bg-foreground data-[state=active]:text-black"
                            disabled>
                                Rainbow
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className="space-y-3 p-0 w-full">
                    <div className="flex justify-end w-full gap-2">
                        <Button
                            size='xs'
                            className="rounded-full bg-backgroundSecondary p-4"
                        >
                            <History className="text-foreground text-sm"/>
                            <span className="sr-only">History</span>
                        </Button>
                        <Button
                            size='xs'
                            className="rounded-full bg-backgroundSecondary p-4"
                            onClick={() => {
                                setFormValues({
                                    selling: {currency: 'btc', amount:''},
                                    buying: { type: 'call', amount: ''},
                                    expiryDate: undefined,
                                    strikePrice: ''
                                })
                            }}
                        >
                            <RefreshCcw className="text-foreground text-sm"/>
                            <span className="sr-only">Reset</span>
                        </Button>
                    </div>


                    
                    <div className="space-y-3 p-0 w-full">
                        <div className="rounded-2xl bg-backgroundSecondary p-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <Label className="text-sm font-medium">You&apos;re Selling</Label>
                                <div className="flex justify-between gap-2">
                                    <div className="flex justify-between items-center gap-1">
                                        <Wallet className="w-3 h-3 text-accent"/>
                                        <span className="text-xs font-normal text-accent">0.004185199 BTC</span>
                                    </div>
                                    <div className="flex justify-between items-center gap-1 ">
                                        <Button
                                            className="p-1 text-xs font-normal w-fit h-auto bg-[#323232] text-foreground"
                                        >
                                            Max
                                        </Button>
                                        <Button
                                            className="px-2 py-1 text-xs font-normal w-fit h-auto bg-[#323232] text-foreground"
                                        >
                                            Half
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full p-0">
                                <Select value={formValues.selling.currency} onValueChange={(value) => setFormValues(prev => ({ ...prev, selling: { ...prev.selling, currency: value } }))}>
                                    <SelectTrigger className="w-2/3 rounded-full h-auto px-4">
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
                                <div className="w-full items-end flex flex-col p-0">
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        value={formValues.selling.amount}
                                        onChange={(e) => setFormValues(prev => ({ ...prev, selling: { ...prev.selling, amount: e.target.value } }))}
                                        className="border-none text-right shadow-none p-0 text-2xl font-normal"
                                    />
                                    <span className="text-xs font-normal text-accent">$10.75</span>
                                </div>
                            </div>
                        </div>


                        <div className="flex justify-between items-center">
                            <div className="h-px bg-backgroundSecondary flex-1 mr-2"></div>
                            <div className="bg-backgroundSecondary rounded-full p-2">
                                <Image src={swapIcon} alt="swap"/>
                            </div>
                            <div className="h-px bg-backgroundSecondary flex-1 ml-2"></div>
                        </div>


                        <div className="rounded-2xl bg-backgroundSecondary p-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <Label className="text-sm font-medium">You&apos;re Buying</Label>
                                <div className="flex justify-between items-center gap-1">
                                    <Wallet className="w-3 h-3 text-accent"/>
                                    <span className="text-xs font-normal text-accent">0.004185199 BTC</span>
                                </div>
                            </div>
                            <div className="flex w-full px-0">
                                <Select value={formValues.buying.type} onValueChange={(value) => setFormValues(prev => ({ ...prev, buying: { ...prev.buying, type: value } }))}>
                                    <SelectTrigger className="w-2/3 rounded-full h-auto px-4">
                                        <div className="flex items-center space-x-2">
                                            <SelectValue placeholder="Select"/>
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="call">Call</SelectItem>
                                        <SelectItem value="put">Put</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="w-full items-end flex flex-col p-0">
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        value={formValues.buying.amount}
                                        onChange={(e) => setFormValues(prev => ({ ...prev, buying: { ...prev.buying, amount: e.target.value } }))}
                                        className="border-none text-right shadow-none p-0 text-2xl font-normal"
                                    />
                                    <span className="text-xs font-normal text-accent">$10.75</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between gap-3">
                        <div className="bg-backgroundSecondary p-6 flex flex-col rounded-2xl space-y-3 w-full">
                            <Label className="text-sm font-medium">Strike Price</Label>
                            <Input 
                                type="number"
                                placeholder="0.00"
                                value={formValues.strikePrice}
                                onChange={(e) => setFormValues(prev => ({ ...prev, strikePrice: e.target.value }))}
                                className="border-none shadow-none p-0 text-sm font-normal"
                            />
                        </div>
                        <div className="bg-backgroundSecondary p-6 flex flex-col rounded-2xl space-y-3 w-full">
                            <Label className="text-sm font-medium">Expiry</Label>
                            <Select>
                                <SelectTrigger className="p-0 bg-inherit shadow-none h-auto">
                                    <SelectValue placeholder="Never" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="never">Never</SelectItem>
                                    <SelectItem value="1">1 day</SelectItem>
                                    <SelectItem value="2">2 days</SelectItem>
                                </SelectContent>
                           </Select>
                        </div>
                    </div>
                </div>
                <Button className="w-full rounded-full h-auto text-black" onClick={() => isConnected ? console.log('Initiate Trade') : setIsWalletModalOpen(true)}>
                    {isConnected && walletName ? `Trade` : 'Connect Wallet to Trade'}
                </Button>
                <WalletModal 
                    isOpen={isWalletModalOpen} 
                    onClose={() => setIsWalletModalOpen(false)}
                />
            </CardContent>
        </Card>
    )
}