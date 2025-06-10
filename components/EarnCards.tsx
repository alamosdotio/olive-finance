'use client'

import { useEffect, useState } from "react"
import EarnNav from "./EarnNav"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Progress } from "./ui/progress"
import { Sheet, SheetTrigger } from "./ui/sheet"
import EarnSidebar from "./EarnSidebar"
import EarnCardlogo from "./EarnCardLogo"
import { generateStrategies, Strategy } from "@/lib/data/strategies"
import EarnPaginate from "./EarnPaginate"
import { ApyIcon, TooltipIcon, TvlIcon } from "@/public/svgs/icons"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

export default function EarnCards (){
    const [sortBy, setSortBy] = useState<string>("featured")
    const [currentPage, setCurrentPage] = useState(1)
    const cardsPerPage = 20;
    const [allStrategies, setAllStrategies] = useState<Strategy[]>([])

    useEffect(() => {
        setAllStrategies(generateStrategies(19))
    }, [])

    const formatCurrency = (value:number) => {
        return new Intl.NumberFormat('en-US',{
            style: 'currency',
            currency: 'USD'
        }).format(value)
    }

    const filteredStrategies = sortBy === 'featured' 
        ? [...allStrategies] 
        : [...allStrategies].sort((a, b) =>{
            if (sortBy === 'tvl') return b.stats.tvl - a.stats.tvl;
            if (sortBy === 'apy') return b.stats.apy - a.stats.apy;
            return 0
    })


    const totalPages = Math.ceil(filteredStrategies.length / cardsPerPage)
    const indexOfLastCard = 19
    const indexOfFirstCard = 0
    const currentCards = filteredStrategies.slice(indexOfFirstCard, indexOfLastCard)

    return (
        <div className="space-y-5 flex flex-col">
            <EarnNav sortBy={sortBy} setSortBy={setSortBy}/>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
            {currentCards.map((strategy, index) => (
                <Sheet key={index}>
                    <SheetTrigger asChild>
                        <div className="relative group cursor-pointer">
                            <div
                                className="absolute inset-2 blur opacity-25 group-hover:bg-gradient-primary group-hover:opacity-100 transition duration-1000 group-hover:duration-200">
                            </div>
                            <Card className="w-full hover:border-primary/45 rounded-sm relative">
                                <CardHeader className="p-5 border-b">
                                    <div className="flex justify-start space-x-2 items-center">
                                        <EarnCardlogo strategy={strategy}/>
                                        <span className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">{strategy.symbol} Liquidity Pool</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-5">
                                    <div className="w-full flex flex-col space-y-4">
                                        <div className="flex flex-col space-y-2">
                                            <span className="flex items-center gap-2 text-sm text-secondary-foreground font-medium">
                                                <TvlIcon />
                                                TVL:
                                            </span>
                                            <span className="flex items-center gap-2 text-base">
                                                {formatCurrency(strategy.stats.tvl)}
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <TooltipIcon />
                                                        </TooltipTrigger>
                                                        <TooltipContent>

                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </span>
                                            <Progress value={33} className="h-1"/>
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <span className="flex items-center gap-2 text-sm text-secondary-foreground font-medium">
                                                <ApyIcon />
                                                APY:
                                            </span>
                                            <span className="flex items-center gap-2 font-normal text-sm">
                                                {strategy.stats.apy}% 
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <TooltipIcon />
                                                        </TooltipTrigger>
                                                        <TooltipContent>

                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </SheetTrigger>
                    <EarnSidebar name={strategy.name} symbol={strategy.symbol} logo={strategy.asset.logo} apy={strategy.stats.apy} apr={strategy.stats.apr}/>
                </Sheet>
            ))}
            </div>
            {/* <div className="flex justify-end">
                <EarnPaginate />
            </div> */}
        </div>
    )
}