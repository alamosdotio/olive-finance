'use client'

import Image from "next/image";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { tokens, Token } from "@/lib/data/tokens";


interface token {
    token: Token
    symbol: string
    name: string
    logo: string
    address: string
}


export default function OptionsCardTokenList(){
    const [allTokens, setAllTokens] = useState<token[]>([])
    const generateTokens = (count: number) :  token[] =>{
        return Array(count).fill(null).map((_, index) => {
            const token = tokens[index % tokens.length]
            return {
                token: token,
                symbol: token.symbol,
                name: token.name,
                logo: token.logo,
                address: token.address
            }
        })
    }

    const [selectedToken, setSelectedToken] = useState<token | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = (value: token) =>{
        if(selectedToken !== value){
            setSelectedToken(value)
            setIsOpen(false)
        }
    }

    useEffect(() => {
        const tokensList = generateTokens(19);
        setAllTokens(tokensList);
        if (!selectedToken && tokensList.length > 0) {
            setSelectedToken(tokensList[0]);
        }
    }, []);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <div className="flex items-center space-x-2 text-[28px] bg-inherit p-0 w-full h-[52px] shadow-none">
                <DialogTrigger>
                    <div className="flex items-center space-x-2 text-[28px] bg-inherit p-0 w-full h-[52px] shadow-none">
                        {selectedToken && selectedToken.logo ? (
                            <Image src={selectedToken.logo} alt="selected token" height={48} width={48} className="rounded-full"/>
                        ) : null}
                        <h1>{selectedToken ? selectedToken.symbol : "Loading..."}</h1>
                        <ChevronDown className="opacity-50" size={28}/>
                    </div>
                </DialogTrigger>
            </div>
            
            <DialogContent className="max-h-[700px] max-w-md">
             <div className="flex flex-col space-y-6 justify-between">
                    <div className="w-full flex flex-col space-y-6 h-auto">
                        <DialogTitle className="p-0">
                            Tokens
                        </DialogTitle>
                        <div className="flex w-full h-fit space-x-2 items-center px-[10px] py-[6px] border rounded-[10px] text-secondary-foreground">
                            <Search size={20} className="w-5 h-5"/>
                            <Input 
                                type="text"
                                placeholder="Search"
                                className="h-full border-none p-0 shadow-none rounded-none placeholder:text-secondary-foreground"
                            />
                        </div>
                    </div>
                    <ScrollArea className="w-full h-[500px]">
                        <div className="space-y-3 h-full flex flex-col pr-1.5">
                            {allTokens.map((token, index) => (
                                <Button 
                                    key={index}
                                    onClick={()=>handleClick(token)}
                                    className="flex w-full shadow-none justify-start space-x-2 pr-1 pl-1 py-6 bg-inherit text-foreground hover:bg-backgroundSecondary"
                                >
                                    <div className="flex items-center">
                                        <Image src={token.logo} alt={token.name} height={36} width={36} className="rounded-full bg-inherit"/>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <div className="flex flex-col space-y-0 items-start">
                                            <div className="flex space-x-1">
                                                <h3 className="text-sm">{token.symbol}</h3>
                                            </div>
                                            <span className="text-xs">{token.name}</span>
                                        </div>
                                        <div className="flex flex-col space-y-0">
                                            <h3 className="text-sm text-end">0</h3>
                                            <span className="text-xs">EPjFWd...yTDt1v</span>
                                        </div>
                                    </div>
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    )
}