'use client'
import Image from "next/image";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { ArrowDown, ArrowUp } from "@/public/svgs/icons";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import Collateral from "./Collateral";
import Tpsl from "./Tpsl";
import CloseFutures from "./CloseFutures";

interface OpenFuturesProps{
    logo:string
    token:string
    symbol:string
    type:string
    position:string
    leverage:number
    entry:number
    liquidation:number
    size:number
    collateral:number
    tpsl:number
    purchaseDate: string
}

export default function OpenFutures({
    logo, 
    token, 
    symbol, 
    type, 
    position, 
    leverage,
    entry,
    liquidation,
    size,
    collateral,
    tpsl,
    purchaseDate
} : OpenFuturesProps){
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
                    <span className="text-xs text-secondary-foreground font-medium">{type === 'dated' ? purchaseDate : 'PERPS'}</span>
                </div>
                <div>
                    
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
                            <TableRow className="w-full grid grid-cols-10 gap-10 whitespace-nowrap h-7">
                                <TableHead className="">Entry Price</TableHead>
                                <TableHead className="">Mark Price</TableHead>
                                <TableHead className="">Size</TableHead>
                                <TableHead className="">Value</TableHead>
                                <TableHead className="">Liq. Price</TableHead>
                                <TableHead className="">Levarage</TableHead>
                                <TableHead className="text-center">
                                    <div className="flex items-center gap-1">
                                        Collateral <Collateral />
                                    </div>
                                </TableHead>
                                <TableHead className="">
                                    <div className="flex items-center gap-1">
                                        TP/SL <Tpsl />
                                    </div>
                                    
                                </TableHead>
                                <TableHead className="">PNL</TableHead>
                                <TableHead className=""></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow className="w-full grid grid-cols-10 gap-10">
                                <TableCell className="flex space-x-2 items-center">{entry}</TableCell>
                                <TableCell className="flex space-x-2 items-center">$107.32</TableCell>
                                <TableCell className="flex space-x-2 items-center">{size}</TableCell>
                                <TableCell className="flex space-x-2 items-center">$107.32</TableCell>
                                <TableCell className="flex space-x-2 items-center">${liquidation}</TableCell>
                                <TableCell className="flex space-x-2 items-center">{leverage}x</TableCell>
                                <TableCell className="flex space-x-1 items-center">
                                    <span>
                                        ${collateral} 
                                    </span>
                                    
                                </TableCell>
                                <TableCell className="flex space-x-1 items-center">
                                    <span>
                                        ${tpsl} 
                                    </span>
                                    
                                </TableCell>
                                <TableCell className="flex space-x-2 items-center">$107.32</TableCell>
                                <TableCell className="flex space-x-2 items-center">
                                    <CloseFutures />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    {/* <div className="w-full grid grid-cols-9 py-1.5 text-xs gap-2">
                        <div className="flex flex-col space-y-0 col-span-1">
                            <span className="text-left align-middle font-medium text-secondary-foreground">
                                Entry Price
                            </span>
                            <span className="flex space-x-2 items-center">
                                {entry}
                            </span>
                        </div>
                        <div className="flex flex-col space-y-0 col-span-1">
                            <span className="text-left align-middle font-medium text-secondary-foreground">
                                Mark Price
                            </span>
                            <span className="flex space-x-2 items-center">
                                {entry}
                            </span>
                        </div>
                        <div className="flex flex-col space-y-0 col-span-1">
                            <span className="text-left align-middle font-medium text-secondary-foreground">
                                Size
                            </span>
                            <span className="flex space-x-2 items-center">
                                {size}
                            </span>
                        </div>
                        <div className="flex flex-col space-y-0 col-span-1">
                            <span className="text-left align-middle font-medium text-secondary-foreground">
                                Value
                            </span>
                            <span className="flex space-x-2 items-center">
                                {entry}
                            </span>
                        </div>
                        <div className="flex flex-col space-y-0 col-span-1">
                            <span className="text-left align-middle font-medium text-secondary-foreground">
                                Liq. Price
                            </span>
                            <span className="flex space-x-2 items-center">
                                {liquidation}
                            </span>
                        </div>
                        <div className="flex flex-col space-y-0 col-span-1">
                            <span className="text-left align-middle font-medium text-secondary-foreground">
                                Leverage
                            </span>
                            <span className="flex space-x-2 items-center">
                                {leverage}x
                            </span>
                        </div>
                        <div className="flex flex-col space-y-0 col-span-1">
                            <span className="text-left align-middle font-medium text-secondary-foreground">
                                Collateral
                            </span>
                            <span className="flex space-x-2 items-center">
                                <span>
                                    ${collateral} 
                                </span>
                                <Collateral />
                            </span>
                        </div>
                        <div className="flex flex-col space-y-0 col-span-1">
                            <span className="text-left align-middle font-medium text-secondary-foreground">
                                TP/SL
                            </span>
                            <span className="flex space-x-2 items-center">
                                <span>
                                    ${tpsl} 
                                </span>
                                <Tpsl />
                            </span>
                        </div>
                        <div className="flex flex-col space-y-0 col-span-1">
                            <span className="text-left align-middle font-medium text-secondary-foreground">
                                PNL
                            </span>
                            <span className="flex space-x-2 items-center">
                                $107.32
                            </span>
                        </div>
                        <div className="flex flex-col space-y-0 col-span-1">
                            <span className="text-left align-middle font-medium text-secondary-foreground">
                                Date
                            </span>
                            <span className="flex space-x-2 items-center">
                                {purchaseDate}
                            </span>
                        </div>
                        <div className="flex flex-col space-y-0 col-span-1">
                            <span className="text-left align-middle font-medium text-secondary-foreground">
                                
                            </span>
                            <span className="flex space-x-2 items-center">
                                <CloseFutures />
                            </span>
                        </div>
                    </div> */}
                </div>
            )}
        </div>
    )
}