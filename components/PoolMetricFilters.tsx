'use client'
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

export default function PoolMetricFilters(){
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="w-full flex px-4 space-x-2">
            <Select>
                <SelectTrigger className="w-fit bg-inherit border ">
                    <SelectValue placeholder='Select Markets'/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Markets</SelectLabel>
                        <SelectItem value="all">All Markets</SelectItem>
                        <SelectItem value="sol">SOL</SelectItem>
                        <SelectItem value="eth">ETH</SelectItem>
                        <SelectItem value='btc'>BTC</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-fit bg-inherit border ">
                    <SelectValue placeholder='Select Instruments'/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Markets</SelectLabel>
                        <SelectItem value="all">All Markets</SelectItem>
                        <SelectItem value="sol">SOL</SelectItem>
                        <SelectItem value="eth">ETH</SelectItem>
                        <SelectItem value='btc'>BTC</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-fit bg-inherit border ">
                    <SelectValue placeholder='Select Time'/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Markets</SelectLabel>
                        <SelectItem value="all">All Markets</SelectItem>
                        <SelectItem value="sol">SOL</SelectItem>
                        <SelectItem value="eth">ETH</SelectItem>
                        <SelectItem value='btc'>BTC</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-fit bg-inherit border ">
                    <SelectValue placeholder='Select Interval'/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Markets</SelectLabel>
                        <SelectItem value="all">All Markets</SelectItem>
                        <SelectItem value="sol">SOL</SelectItem>
                        <SelectItem value="eth">ETH</SelectItem>
                        <SelectItem value='btc'>BTC</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}