'use client'
import Link from "next/link";
import { Moon, Sun } from 'lucide-react'

import { Button, buttonVariants } from "./ui/button";
import { Switch } from "./ui/switch";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import WalletModal from "./WalletModal";
import { useWallet } from "@/contexts/walletprovider";
import WalletSideBar from "./WalletSidebar";
import { useTheme } from "next-themes";
import { Settings } from 'lucide-react';

export default function NavBar(){
    const [active, setActive] = useState<string>("Options");
    const { theme, setTheme } = useTheme()
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
    const { isConnected } = useWallet();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    const handleClick = (state:string) =>{
        if(active!==state){
            setActive(state)
        }
    }
    
    const truncateAddress = (address: string) => {
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    };


    return <>
       
            <header className=" border-gray-200">
                <div className="flex h-[40px] items-center mx-auto justify-between">
                    <nav className="flex h-[40px] w-auto items-center space-x-4">
                        <Link href='/' 
                            className={cn(buttonVariants({variant: active === "Options" ? "selected" : 'unselected'}))}
                            onClick={() => handleClick('Options')}
                        >
                            Options
                            <span className={ active === "Options" ? 'ml-2 rounded px-1.5 py-0.5 text-xs border-2 border-light' : 'ml-2 rounded px-1.5 py-0.5 text-xs border-2 border-primary'}>
                                BETA
                            </span>
                        </Link>
                        <Link href='/earn'
                            className={cn(buttonVariants({variant: active === "Earn" ? "selected" : 'unselected'}))}
                            onClick={() => handleClick('Earn')}
                        >
                            Earn
                        </Link>
                        <Link href='/portfolio'
                            className={cn(buttonVariants({variant: active === "Portfolio" ? "selected" : 'unselected'}))}
                            onClick={() => handleClick('Portfolio')}
                        >
                            Portfolio
                        </Link>
                        <DropdownMenu onOpenChange={() => handleClick('More')}>
                            <DropdownMenuTrigger asChild>
                                <Button variant={active === "More" ? "selected":'unselected'}
                                >
                                    More
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center" className="w-48 text-dark">
                                {[
                                    "Move",
                                    "Leverage Tokens",
                                    "Liquidity",
                                    "Swaption",
                                    "Stocks",
                                    "Bridge",
                                    "Net Worth",
                                    "Prediction Markets",
                                    "Data",
                                    "Copy Trader",
                                    "Docs"
                                    ].map((item) => (
                                    <DropdownMenuItem key={item} className="focus:bg-[#F3EDF7] focus:text-[#9B7EBD]">
                                        <Link href={`/`} className="w-full">
                                        {item} (soon)
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </nav>
                    <div className="w-auto h-[40px] flex items-center space-x-4">
                        <div className={cn(buttonVariants({variant: 'unselected'}),"flex items-center w-auto")}>
                            {/* <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Settings />
                                </DropdownMenuTrigger>

                            </DropdownMenu> */}
                            <Switch 
                                checked={theme === 'dark'}
                                onCheckedChange={toggleTheme}
                                className="data-[state=checked]:bg-[#3B1E54] data-[state=unchecked]:bg-[3B1E5480]"
                            />
                            {theme === 'dark' ? <Moon className="h-[24px] w-[24px]" /> : <Sun className="h-[24px] w-[24px]" />}
                        </div>
                        {isConnected ? (
                            <WalletSideBar></WalletSideBar>
                        ) : (
                            <Button variant='selected' onClick={() => setIsWalletModalOpen(true)}>
                                Connect Wallet
                            </Button>
                        )}
                        
                        <WalletModal 
                        isOpen={isWalletModalOpen} 
                        onClose={() => setIsWalletModalOpen(false)}
                    />
                    </div>
                </div>
            </header>

    </>
}