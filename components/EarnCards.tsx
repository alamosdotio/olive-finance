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
import { ApyIcon, TvlIcon } from "@/public/svgs/icons"




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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
            {currentCards.map((strategy, index) => (
                <Sheet key={index}>
                    <SheetTrigger>
                        <Card className="w-full hover:border-primary">
                            <CardHeader className="p-5 border-b">
                                <div className="flex justify-start space-x-2 items-center">
                                    <EarnCardlogo strategy={strategy}/>
                                    <span className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">{strategy.symbol} Option Maker</span>
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
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M7.99984 14.6665C11.6732 14.6665 14.6665 11.6732 14.6665 7.99984C14.6665 4.3265 11.6732 1.33317 7.99984 1.33317C4.3265 1.33317 1.33317 4.3265 1.33317 7.99984C1.33317 11.6732 4.3265 14.6665 7.99984 14.6665ZM8.49984 10.6665C8.49984 10.9398 8.27317 11.1665 7.99984 11.1665C7.7265 11.1665 7.49984 10.9398 7.49984 10.6665V7.33317C7.49984 7.05984 7.7265 6.83317 7.99984 6.83317C8.27317 6.83317 8.49984 7.05984 8.49984 7.33317V10.6665ZM7.3865 5.07984C7.41984 4.99317 7.4665 4.9265 7.5265 4.85984C7.59317 4.79984 7.6665 4.75317 7.7465 4.71984C7.8265 4.6865 7.91317 4.6665 7.99984 4.6665C8.0865 4.6665 8.17317 4.6865 8.25317 4.71984C8.33317 4.75317 8.4065 4.79984 8.47317 4.85984C8.53317 4.9265 8.57984 4.99317 8.61317 5.07984C8.6465 5.15984 8.6665 5.2465 8.6665 5.33317C8.6665 5.41984 8.6465 5.5065 8.61317 5.5865C8.57984 5.6665 8.53317 5.73984 8.47317 5.8065C8.4065 5.8665 8.33317 5.91317 8.25317 5.9465C8.09317 6.01317 7.9065 6.01317 7.7465 5.9465C7.6665 5.91317 7.59317 5.8665 7.5265 5.8065C7.4665 5.73984 7.41984 5.6665 7.3865 5.5865C7.35317 5.5065 7.33317 5.41984 7.33317 5.33317C7.33317 5.2465 7.35317 5.15984 7.3865 5.07984Z" fill="#808693"/>
                                            </svg>
                                        </span>
                                        <Progress value={33} className="h-1"/>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <span className="flex items-center gap-2 text-sm text-secondary-foreground font-medium">
                                            <ApyIcon />
                                            APY:
                                        </span>
                                        <span className="flex font-normal text-sm">{strategy.stats.apy}%</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
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