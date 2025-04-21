'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ChevronDown, Search, XIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { tokenList, Token, USDC } from "@/lib/data/tokenlist";

interface CardTokenListProps{
    onSymbolChange: (symbol: string) => void;
    onIdxChange: (idx: number) => void;
    active: number
    type: 'chart' | 'paying'
}

export default function CardTokenList({onSymbolChange, onIdxChange, active, type} : CardTokenListProps){
    const tokens = tokenList;
    const [paymentTokens, setPaymentTokens] = useState<Token[]>([tokens[active]]);

    const [isOpen, setIsOpen] = useState(false)
    const [selectedToken, setSelectedToken] = useState<Token>(tokens[active])
    const [payment, setPayment] = useState<Token>(paymentTokens[0])

    useEffect(() => {
        setSelectedToken(tokens[active]);
        setPaymentTokens([
            tokens[active],
            USDC,
        ])
        setPayment(paymentTokens[0]);
    }, [active, selectedToken, tokens])

    const handleTokenSelect = (value: Token, idx: number) => {
        if(type === 'chart'){
            setSelectedToken(value)
            setIsOpen(false)
            onSymbolChange(value.pythSymbol)
            onIdxChange(idx)
        }else{
            setIsOpen(false)
            setPayment(value)
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {type === 'chart' ? (
                    <Button variant="outline" className="h-12 pl-3 pr-4 border-border rounded-sm">
                        <Image 
                            src={selectedToken.iconPath} 
                            alt={selectedToken.symbol}
                            className="rounded-full mr-3" 
                            width={28} 
                            height={28}
                        />
                        <div className="flex flex-col items-start mr-2">
                            <span className="text-base font-semibold">{selectedToken.symbol.toUpperCase()}-USD</span>
                            <span className="text-xs text-secondary-foreground">{selectedToken.name}</span>
                        </div>
                        <ChevronDown size={18} className="text-muted-foreground"/>
                    </Button>
                ) : (
                    <Button className="w-fit h-fit rounded-full bg-transparent flex p-0">
                        <Image 
                            src={payment.iconPath} 
                            alt={payment.symbol}
                            className="rounded-full" 
                            width={28} 
                            height={28}
                        />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="w-full h-full md:max-w-md md:h-auto p-5 bg-accent gap-0 sm:rounded-sm flex flex-col shadow-none">
                <DialogHeader className="space-y-4">
                    <DialogTitle className="p-0 text-base font-medium text-foreground flex justify-between items-center">
                        <span>Tokens</span>
                        <Button 
                            className="p-[9px] bg-transparent shadow-none border rounded-sm [&_svg]:size-[18px]"
                            onClick={()=>setIsOpen(false)}
                            
                        >
                            <XIcon className="text-foreground"/>
                        </Button>
                    </DialogTitle>
                    <Separator/>
                    <div className="flex w-full h-fit space-x-2 items-center px-4 py-[10px] rounded-sm text-sm text-secondary-foreground bg-secondary">
                        <Input 
                            type="text"
                            placeholder="Search Token"
                            className="h-fit border-none p-0 shadow-none rounded-none text-foreground placeholder:text-secondary-foreground"
                        />
                        <Search size={16} className="w-4 h-4 text-foreground"/>
                    </div>
                </DialogHeader>
                
                    {type === 'chart' ? (
                        <ScrollArea className="h-72 pr-3 mt-4">
                            <div className="grid grid-cols-3 gap-4">
                                {tokens.map((token, idx) => (
                                    <Button
                                        className="h-fit grid grid-cols-[auto_1fr] bg-inherit p-2 border items-center gap-4 rounded-sm"
                                        key={idx}
                                        onClick={()=>handleTokenSelect(token, idx)}
                                    >
                                        <Image
                                            src={token.iconPath}
                                            alt={token.symbol}
                                            className="rounded-full"
                                            width={28}
                                            height={28}
                                        />
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-sm text-left text-foreground font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                                                {token.symbol.toUpperCase()}
                                            </span>
                                            <span className="text-xs text-left text-secondary-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                                                {token.name}
                                            </span>
                                        </div>
                                    </Button>
                
                                ))}
                            </div>        
                        </ScrollArea>
                    ) : (
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            {paymentTokens.map((token, idx) => (
                                <Button
                                    className="h-fit grid grid-cols-[auto_1fr] bg-inherit p-2 border items-center gap-4 rounded-sm"
                                    key={idx}
                                    onClick={()=>handleTokenSelect(token, idx)}
                                >
                                    <Image
                                        src={token.iconPath}
                                        alt={token.symbol}
                                        className="rounded-full"
                                        width={28}
                                        height={28}
                                    />
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-sm text-left text-foreground font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                                            {token.symbol.toUpperCase()}
                                        </span>
                                        <span className="text-xs text-left text-secondary-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                                            {token.name}
                                        </span>
                                    </div>
                                </Button>
            
                            ))}
                        </div>
                    )}
            </DialogContent>
        </Dialog>
    )
}