'use client'
import Link from "next/link";
import { Moon, Sun } from 'lucide-react'

import { Button, buttonVariants } from "./ui/button";
import { Switch } from "./ui/switch";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import WalletModal from "./WalletModal";
import { useWallet } from "@/contexts/walletprovider";
import WalletSideBar from "./WalletSidebar";
import { useTheme } from "next-themes";
import { Settings } from 'lucide-react';
import x from '@/public/svgs/x.svg';
import discord from '@/public/svgs/discord.svg'
import telegram from '@/public/svgs/telegram.svg'
import Image from "next/image";

export default function NavBar(){
    const [active, setActive] = useState<string>("");
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

    return <>
       
            <header>
                <div className="flex h-16 items-center mx-auto justify-between border-b">
                    <nav className="flex h-full w-auto items-center space-x-0 shadow-none">
                        <div className={cn(buttonVariants({variant: active === "Options" ? "active" : 'inactive'}), 'w-1/2 h-full p-2')}>
                            <Link href='/' 
                                className="flex items-center justify-between gap-2"
                                onClick={() => handleClick('Options')}
                            >
                                Options
                                <span className={ cn((active === "Options" ? "border-dark" : 'border-textHover hover:border-secondary-foreground'),'rounded text-[8px] w-11 h-5 border-2 flex justify-center items-center')}>
                                    BETA
                                </span>
                            </Link>
                        </div>
                        <div className={cn(buttonVariants({variant: active === "Earn" ? "active" : 'inactive'}), 'h-full')}>
                            <Link href='/earn'
                                className="flex items-center"
                                onClick={() => handleClick('Earn')}
                            >
                                Earn
                            </Link>
                        </div>
                        <div className={cn(buttonVariants({variant: active === "Portfolio" ? "active" : 'inactive'}), 'h-full')}>
                            <Link href='/portfolio'
                                className="flex items-center"
                                onClick={() => handleClick('Portfolio')}
                            >
                                Portfolio
                            </Link>
                        </div>
                        <div >
                            <DropdownMenu onOpenChange={() => handleClick('More')}>
                                <DropdownMenuTrigger asChild>
                                    <Button variant={active === "More" ? "active" : 'inactive'} className="h-16"
                                    >
                                        More
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="center" className="w-auto text-dark">
                                    {[
                                        "Futures",
                                        "Prediction Markets",
                                        "Move",
                                        "Exotic Options",
                                        "Leaderboard",
                                        "Liquidity",
                                        "Tokenized Stocks",
                                        "Bridge",
                                        "Leveraged Farming"
                                        ].map((item) => (
                                        <DropdownMenuItem key={item} className="focus:bg-secondary focus:text-dark px-4 py-2">
                                            <Link href={`/`} className="w-full">
                                            {item} {(['Liquidity', 'Tokenized Stocks', 'Bridge', 'Leveraged Farming'].includes(item) ? '(Coming Late)' : '(Coming Soon)')}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                    <DropdownMenuSeparator />
                                    {[
                                        "Docs",
                                        "Feedback",
                                        "Info",
                                        ].map((item) => (
                                        <DropdownMenuItem key={item} className="focus:bg-secondary focus:text-dark px-4 py-2">
                                            <Link href={`/`} className="w-full">
                                                {item}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                    <DropdownMenuSeparator />
                                    <div className="flex justify-start px-4 py-2 gap-3">
                                        <Link href='#'>
                                            <Image src={x} alt="x link"/>
                                        </Link>
                                        <Link href='#'>
                                            <Image src={telegram} alt="telegram link"/>
                                        </Link>
                                        <Link href='#'>
                                            <Image src={discord} alt="discord link" />
                                        </Link>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        
                        
                        
                    </nav>
                    <div className="w-auto h-[40px] flex items-center space-x-4">
                        <div className={cn(buttonVariants({variant: theme === 'dark' ? 'selected' : 'unselected'}),"flex items-center")}>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Settings className="h-[24px] w-[24px] text-primary-foreground"/>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="min-w-72 max-w-72">
                                    <DropdownMenuLabel className="text-sm font-semibold">Settings</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="focus:bg-transparent flex justify-between">
                                        <div className="flex w-full items-center justify-between">
                                            <span className="text-sm text-badge font-normal">Color Theme</span>
                                            <div className="flex items-center bg-accent rounded-lg space-x-1 p-2">
                                                <Switch 
                                                    checked={theme === 'dark'}
                                                    onCheckedChange={toggleTheme}
                                                    className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-dark"
                                                />
                                                {theme === 'dark' ? <Moon className="h-[24px] w-[24px] text-light" /> : <Sun className="h-[24px] w-[24px] text-dark" />}
                                            </div>
                                        </div>
                                        
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
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