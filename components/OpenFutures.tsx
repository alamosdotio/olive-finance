'use client'
import Image from "next/image";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { ArrowDown, ArrowUp } from "@/public/svgs/icons";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface OpenFuturesProps{
    logo:string
    token:string
    symbol:string
    type:string
    position:string
    leverage:number
}

export default function OpenFutures({logo, token, symbol, type, position, leverage} : OpenFuturesProps){
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div className="w-full flex flex-col bg-accent rounded-sm">
            <div 
                className="w-full px-4 py-3 flex justify-between items-center cursor-pointer"
                onClick={()=>setIsOpen(!isOpen)}
            >
                <div className="flex space-x-[6px] items-center">
                    <Image src={logo} alt={token} width={16} height={16} className="w-4 h-4 rounded-full"/>
                    <span className="text-sm text-foreground font-medium">{symbol}</span>
                    <Badge className={`${position === 'long' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'} text-xs font-semibold py-[1px] px-1 w-fit h-fit rounded-[3px] flex items-center justify-center`}>
                        {leverage}x {position.charAt(0).toUpperCase() + position.slice(1).toLowerCase()}
                    </Badge>
                </div>
                {isOpen ? (
                    <span className='text-secondary-foreground'>
                        <ArrowUp />
                    </span>
                    
                ) : (
                    <span className='text-secondary-foreground'>
                        <ArrowDown />
                    </span>
                )}
            </div>
            {isOpen && (
                <div className="w-full px-4 pt-2 pb-4 space-y-4 border-t-2 border-backgroundSecondary">
                    <Table>
                        <TableHeader>
                            <TableRow className="w-full grid grid-cols-8 whitespace-nowrap h-7">
                                <TableHead className="">Entry Price</TableHead>
                                <TableHead className="">Mark Price</TableHead>
                                <TableHead className="">Size</TableHead>
                                <TableHead className="">Value</TableHead>
                                <TableHead className="">Liq. Price</TableHead>
                                <TableHead className="">Levarage</TableHead>
                                <TableHead className="">Collateral</TableHead>
                                <TableHead className="">PNL</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow className="w-full grid grid-cols-8">
                                <TableCell>$107.32</TableCell>
                                <TableCell>$107.32</TableCell>
                                <TableCell>$107.32</TableCell>
                                <TableCell>$107.32</TableCell>
                                <TableCell>$107.32</TableCell>
                                <TableCell>10x</TableCell>
                                <TableCell>$107.32</TableCell>
                                <TableCell>$107.32</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    )
}