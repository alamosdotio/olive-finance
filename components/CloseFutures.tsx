import { useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import Image from "next/image";
import { tokenList } from "@/lib/data/tokenlist";
import { ChevronDown } from "lucide-react";

export default function CloseFutures(){
    const tokens = tokenList;
    const [selectedToken, setSelectedToken] = useState("SOL");
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button 
                    variant={'outline'}
                    className={`bg-transparent h-fit p-1 text-xs hover:text-primary hover:border-primary ${isOpen ? 'text-primary border-primary' : 'text-secondary-foreground border-border'}`}
                >
                    Close
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="flex flex-col space-y-2">
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between gap-10">
                        <Label className="font-normal">
                            Size
                        </Label>
                        <div className="grid grid-cols-4 gap-2">
                            <Button 
                                variant={'outline'}
                                className="p-1 text-xs h-fit text-secondary-foreground hover:text-foreground"
                            >
                                25%
                            </Button>
                            <Button 
                                variant={'outline'}
                                className="p-1 text-xs h-fit text-secondary-foreground hover:text-foreground"
                            >
                                50%
                            </Button>
                            <Button 
                                variant={'outline'}
                                className="p-1 text-xs h-fit text-secondary-foreground hover:text-foreground"
                            >
                                75%
                            </Button>
                            <Button 
                                variant={'outline'}
                                className="p-1 text-xs h-fit text-secondary-foreground hover:text-foreground"
                            >
                                100%
                            </Button>
                        </div>
                    </div>
                    <Input
                        type="number"
                        placeholder={'0.00'}
                        className="px-2 text-right py-2 rounded-sm h-auto w-full bg-transparent border-border shadow-none"
                        step="0.1"
                        min="0.1"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <Label className="font-normal">
                        Receive In
                    </Label>
                    <div className="relative w-full">
                        <Select defaultValue="SOL" onValueChange={(value) => setSelectedToken(value)}>
                            <SelectTrigger className="w-fit p-1 bg-backgroundSecondary absolute left-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                                    {tokens.map((token,idx) => 
                                        token.symbol === selectedToken && (
                                            <div
                                                key={idx}  
                                                className="flex space-x-1"
                                            >
                                                <Image
                                                    src={token.iconPath}
                                                    alt={token.name}
                                                    width={20}
                                                    height={20}
                                                    className="rounded-full w-5 h-5"
                                                />
                                                <span className="text-secondary-foreground text-sm">{token.symbol}</span>
                                            </div>
                                            
                                    ))}
                                    <ChevronDown size={14} className="text-secondary-foreground"/>
                            </SelectTrigger>
                            <SelectContent className="min-w-fit">
                                {tokens.map((token, idx) => (
                                    <SelectItem key={idx} value={token.symbol}>
                                        <div className="flex space-x-2">
                                            <Image 
                                                src={token.iconPath}
                                                alt={token.name}
                                                width={20}
                                                height={20}
                                                className="rounded-full w-6 h-6"
                                            />
                                            <p>{token.symbol}</p>
                                        </div>
                                        
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Input
                            type="number"
                            placeholder={'0.00'}
                            className="px-2 text-right py-2 rounded-sm h-auto w-full bg-transparent border-border shadow-none"
                            step="0.1"
                            min="0.1"
                        />
                    </div>     
                </div>
                <div className="w-full flex justify-between text-sm">
                    <span>
                        Size
                    </span>
                    <span>
                        xx
                    </span>
                </div>
                <div className="w-full flex justify-between text-sm">
                    <span>
                        Collateral
                    </span>
                    <span>
                        xx
                    </span>
                </div>
                <div className="w-full flex justify-between text-sm">
                    <span>
                        Close Fee
                    </span>
                    <span>
                        xx
                    </span>
                </div>
                <div className="w-full flex justify-between text-sm">
                    <span>
                        Borrow Fee
                    </span>
                    <span>
                        xx
                    </span>
                </div>
                <div className="w-full flex justify-between text-sm">
                    <span>
                        Price Impact
                    </span>
                    <span>
                        xx
                    </span>
                </div>
                <div className="w-full flex justify-between text-sm">
                    <span>
                        Transaction Fee
                    </span>
                    <span>
                        xx
                    </span>
                </div>
                <div className="w-full flex justify-between text-sm gap-2">
                    <Button
                        variant={'outline'}
                        className="w-full"
                        onClick={() => setIsOpen(false)}
                    >
                        Dismiss
                    </Button>
                    <Button 
                        className="w-full bg-primary/70 hover:bg-primary text-black disabled:cursor-not-allowed"
                        onClick={() => setIsOpen(false)}
                        disabled
                        
                    >
                        Confirm
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}