'use client'

import { ChevronDown, Search } from "lucide-react";
import CreateStrategyCard from "./CreateStrategyCard";
import { Input } from "./ui/input";
import { Select, SelectItem, SelectTrigger,SelectContent, SelectValue } from "./ui/select";


interface EarnNavProps{
    sortBy: string
    setSortBy: (value:string) => void
}

export default function EarnNav({sortBy, setSortBy} : EarnNavProps){
    return (
        <div className="w-full h-8 flex justify-between">
            <div className="flex gap-2 justify-start items-center">
                <div className="flex h-full w-[200px] space-x-2 items-center px-[10px] py-[6px] border rounded-[10px] text-secondary-foreground">
                    <Search size={20} className="w-5 h-5"/>
                    <Input 
                        type="text"
                        placeholder="Search"
                        className="h-full border-none p-0 shadow-none rounded-none placeholder:text-secondary-foreground"
                    />
                </div>
                <CreateStrategyCard />
            </div>
            <div className="flex gap-3 justify-between items-center">
                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[200px] h-full rounded-[10px] px-[10px] py-[6px] items-center text-foreground">
                        <SelectValue placeholder='Featured Strategies'/>
                        <ChevronDown size={16}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="featured">Featured Strategies</SelectItem>
                        <SelectItem value="tvl" >Popularity (TVL)</SelectItem>
                        <SelectItem value="apy" >APY</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-[200px] h-full rounded-[10px] px-[10px] py-[6px] items-center text-foreground">
                        <SelectValue placeholder='All Assets'/>
                        <ChevronDown size={16}/>
                    </SelectTrigger>
                </Select>
            </div>
        </div>
    )
}