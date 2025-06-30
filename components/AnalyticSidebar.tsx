'use client'
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AnalyticSidebar(){
    const [active, setActive] = useState('Trades')
    const router = useRouter()
    const handleClick = (value: {name: string, path: string}) => {
        setActive(value.name)
        router.push(`/analytics/${value.path}`)
    }
    return (
        <div className="w-full h-fit">
            <ul>
                {[
                    {name: 'Future Trades', path: ''},
                    {name: 'Option Trades', path: 'option-trades'},
                    {name: 'Pool Trades', path: 'pool-trades'},
                    {name: 'Pool Metrics', path: 'pool-metrics'},
                    {name: 'Options Metrics', path: 'options-metrics'},
                    {name: 'Futures Metrics', path: 'futures-metrics'},
                    {name: 'Borrowing Metrics', path: 'borrowing-metrics'},
                    {name: 'Trader Metrics', path: 'trader-metrics'},
                ].map((item, idx) => (
                    <li 
                        className={cn((active === item.name ? 'text-primary border-r-2 border-primary bg-primary-foreground' : 'text-secondary-foreground border border-transparent'),"text-sm cursor-pointer p-4 rounded-l-sm")} 
                        key={idx}
                        onClick={()=>handleClick(item)}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}