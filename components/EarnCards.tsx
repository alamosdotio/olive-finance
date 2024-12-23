'use client'

import { useEffect, useState } from "react"
import EarnNav from "./EarnNav"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Progress } from "./ui/progress"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import EarnSidebar from "./EarnSidebar"

interface Strategy {
    tvl: number
    apy: number
    asset: string
}


export default function EarnCards (){
    const [sortBy, setSortBy] = useState<string>("featured")
    const [currentPage, setCurrentPage] = useState(1)
    const cardsPerPage = 15;
    const [allStrategies, setAllStrategies] = useState<Strategy[]>([])

    useEffect(() => {
        const generatedStrategies: Strategy[] = Array(45).fill({
            tvl: 187490.30,
            apy: 3.03,
            asset: 'USDC'
        }).map((strategy, index) => ({
            ...strategy,
            tvl: Math.round((Math.random() * 500000 + 100000) * 100) / 100,
            apy: Math.round((Math.random() * 10 + 1) * 100) / 100,
        }))
        setAllStrategies(generatedStrategies)
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
            if (sortBy === 'tvl') return b.tvl - a.tvl;
            if (sortBy === 'apy') return b.apy - a.apy;
            return 0
    })


    const totalPages = Math.ceil(filteredStrategies.length / cardsPerPage)
    const indexOfLastCard = 15
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
                                <div className="flex justify-start space-x-2">
                                    <span className="rounded-full bg-white w-6 h-6 text-[8px] text-center text-black flex justify-center items-center border-2">img</span>
                                    <span className="text-base font-medium">Strategy Name</span>
                                </div>
                            </CardHeader>
                            <CardContent className="p-5">
                                <div className="w-full flex flex-col space-y-4">
                                    <div className="flex flex-col space-y-2">
                                        <span className="flex items-center gap-2 text-sm text-secondary-foreground font-medium">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M4 6.66683V5.3335C4 3.12683 4.66667 1.3335 8 1.3335C11.3333 1.3335 12 3.12683 12 5.3335V6.66683" stroke="#808693" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M1.33325 11.3332C1.33325 13.9998 1.99992 14.6665 4.66659 14.6665H11.3333C13.9999 14.6665 14.6666 13.9998 14.6666 11.3332V9.99984C14.6666 7.33317 13.9999 6.6665 11.3333 6.6665H4.66659C1.99992 6.6665 1.33325 7.33317 1.33325 9.99984V11.3332ZM9.66659 10.6665C9.66659 11.587 8.92039 12.3332 7.99992 12.3332C7.07944 12.3332 6.33325 11.587 6.33325 10.6665C6.33325 9.74603 7.07944 8.99984 7.99992 8.99984C8.92039 8.99984 9.66659 9.74603 9.66659 10.6665Z" fill="#808693"/>
                                            </svg>
                                            TVL:
                                        </span>
                                        <span className="flex items-center gap-2 text-base">
                                            {formatCurrency(strategy.tvl)}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M7.99984 14.6665C11.6732 14.6665 14.6665 11.6732 14.6665 7.99984C14.6665 4.3265 11.6732 1.33317 7.99984 1.33317C4.3265 1.33317 1.33317 4.3265 1.33317 7.99984C1.33317 11.6732 4.3265 14.6665 7.99984 14.6665ZM8.49984 10.6665C8.49984 10.9398 8.27317 11.1665 7.99984 11.1665C7.7265 11.1665 7.49984 10.9398 7.49984 10.6665V7.33317C7.49984 7.05984 7.7265 6.83317 7.99984 6.83317C8.27317 6.83317 8.49984 7.05984 8.49984 7.33317V10.6665ZM7.3865 5.07984C7.41984 4.99317 7.4665 4.9265 7.5265 4.85984C7.59317 4.79984 7.6665 4.75317 7.7465 4.71984C7.8265 4.6865 7.91317 4.6665 7.99984 4.6665C8.0865 4.6665 8.17317 4.6865 8.25317 4.71984C8.33317 4.75317 8.4065 4.79984 8.47317 4.85984C8.53317 4.9265 8.57984 4.99317 8.61317 5.07984C8.6465 5.15984 8.6665 5.2465 8.6665 5.33317C8.6665 5.41984 8.6465 5.5065 8.61317 5.5865C8.57984 5.6665 8.53317 5.73984 8.47317 5.8065C8.4065 5.8665 8.33317 5.91317 8.25317 5.9465C8.09317 6.01317 7.9065 6.01317 7.7465 5.9465C7.6665 5.91317 7.59317 5.8665 7.5265 5.8065C7.4665 5.73984 7.41984 5.6665 7.3865 5.5865C7.35317 5.5065 7.33317 5.41984 7.33317 5.33317C7.33317 5.2465 7.35317 5.15984 7.3865 5.07984Z" fill="#808693"/>
                                            </svg>
                                        </span>
                                        <Progress value={33} className="h-1"/>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <span className="flex items-center gap-2 text-sm text-secondary-foreground font-medium">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M11.1667 2.3735V1.3335C11.1667 1.06016 10.94 0.833496 10.6667 0.833496C10.3933 0.833496 10.1667 1.06016 10.1667 1.3335V2.3335H5.83332V1.3335C5.83332 1.06016 5.60666 0.833496 5.33332 0.833496C5.05999 0.833496 4.83332 1.06016 4.83332 1.3335V2.3735C3.03332 2.54016 2.15999 3.6135 2.02666 5.20683C2.01332 5.40016 2.17332 5.56016 2.35999 5.56016H13.64C13.8333 5.56016 13.9933 5.3935 13.9733 5.20683C13.84 3.6135 12.9667 2.54016 11.1667 2.3735Z" fill="#808693"/>
                                                <path d="M12.6667 10C11.1933 10 10 11.1933 10 12.6667C10 13.1667 10.14 13.64 10.3867 14.04C10.8467 14.8133 11.6933 15.3333 12.6667 15.3333C13.64 15.3333 14.4867 14.8133 14.9467 14.04C15.1933 13.64 15.3333 13.1667 15.3333 12.6667C15.3333 11.1933 14.14 10 12.6667 10Z" fill="#808693"/>
                                                <path d="M13.3333 6.56006H2.66667C2.3 6.56006 2 6.86006 2 7.22673V11.3334C2 13.3334 3 14.6667 5.33333 14.6667H8.62C9.08 14.6667 9.4 14.2201 9.25333 13.7867C9.12 13.4001 9.00667 12.9734 9.00667 12.6667C9.00667 10.6467 10.6533 9.00006 12.6733 9.00006C12.8667 9.00006 13.06 9.01339 13.2467 9.04673C13.6467 9.10672 14.0067 8.79339 14.0067 8.39339V7.23339C14 6.86006 13.7 6.56006 13.3333 6.56006ZM6.14 12.1401C6.01333 12.2601 5.84 12.3334 5.66667 12.3334C5.49333 12.3334 5.32 12.2601 5.19333 12.1401C5.07333 12.0134 5 11.8401 5 11.6667C5 11.4934 5.07333 11.3201 5.19333 11.1934C5.26 11.1334 5.32667 11.0867 5.41333 11.0534C5.66 10.9467 5.95333 11.0067 6.14 11.1934C6.26 11.3201 6.33333 11.4934 6.33333 11.6667C6.33333 11.8401 6.26 12.0134 6.14 12.1401ZM6.14 9.80673C6.10667 9.83339 6.07333 9.86006 6.04 9.88673C6 9.91339 5.96 9.93339 5.92 9.94673C5.88 9.96673 5.84 9.98006 5.8 9.98672C5.75333 9.99339 5.70667 10.0001 5.66667 10.0001C5.49333 10.0001 5.32 9.92673 5.19333 9.80673C5.07333 9.68006 5 9.50673 5 9.33339C5 9.16006 5.07333 8.98673 5.19333 8.86006C5.34667 8.70673 5.58 8.63339 5.8 8.68006C5.84 8.68673 5.88 8.70006 5.92 8.72006C5.96 8.73339 6 8.75339 6.04 8.78006C6.07333 8.80673 6.10667 8.83339 6.14 8.86006C6.26 8.98673 6.33333 9.16006 6.33333 9.33339C6.33333 9.50673 6.26 9.68006 6.14 9.80673ZM8.47333 9.80673C8.34667 9.92673 8.17333 10.0001 8 10.0001C7.82667 10.0001 7.65333 9.92673 7.52667 9.80673C7.40667 9.68006 7.33333 9.50673 7.33333 9.33339C7.33333 9.16006 7.40667 8.98673 7.52667 8.86006C7.78 8.61339 8.22667 8.61339 8.47333 8.86006C8.59333 8.98673 8.66667 9.16006 8.66667 9.33339C8.66667 9.50673 8.59333 9.68006 8.47333 9.80673Z" fill="#808693"/>
                                            </svg>
                                            APY:
                                        </span>
                                        <span className="flex font-normal text-sm">{strategy.apy}%</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </SheetTrigger>
                    <EarnSidebar apy={strategy.apy}/>
                </Sheet>
            ))}
                
            </div>
        </div>
    )
}