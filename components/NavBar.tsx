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
import { Settings, Star, Bell } from 'lucide-react';
import x from '@/public/svgs/x.svg';
import discord from '@/public/svgs/discord.svg'
import telegram from '@/public/svgs/telegram.svg'
import Image from "next/image";

import logo from '@/public/svgs/logo.svg'
import { Badge } from "./ui/badge";


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

    return (
        <header className="flex justify-between h-[72px]">
            <div className="flex justify-between py-4 gap-4">
                <div className="flex items-center justify-center">
                    <Image src={logo} alt="logo pic" />
                </div>
                <nav className="flex justify-evenly items-center gap-0">
                    <Link 
                        href='/'
                        className={cn(buttonVariants({variant: active === 'Options' ? 'active' : 'inactive'}), 'p-4 w-auto h-auto flex justify-between gap-[10px]')}
                        onClick={() => handleClick('Options')}
                    > 
                         <h1 className="text-sm font-medium">Options</h1>
                         <Badge variant='outline' className={cn((active === 'Options' ? 'border-primary text-primary' : 'border-secondary-foreground text-secondary-foreground'),"border-2 text-[8px] w-11 h-5")}>BETA</Badge>
                    </Link>
                    <Link 
                        href='/earn'
                        className={cn(buttonVariants({variant: active === 'Earn' ? 'active' : 'inactive'}), 'p-4 w-auto h-auto flex justify-between gap-[10px]')}
                        onClick={() => handleClick('Earn')}
                    > 
                         <h1 className="text-sm font-medium">Earn</h1>
                         <Badge className="bg-primary-foreground border-none text-[8px] w-11 h-5 text-primary px-1">48% APY</Badge>
                    </Link>
                    <Link 
                        href='/portfolio'
                        className={cn(buttonVariants({variant: active === 'Portfolio' ? 'active' : 'inactive'}), 'p-4 w-auto h-auto flex justify-between')}
                        onClick={() => handleClick('Portfolio')}
                    > 
                         <h1 className="text-sm font-medium">Portfolio</h1>
                    </Link>
                    
                    <DropdownMenu onOpenChange={() => handleClick('More')}>
                        <DropdownMenuTrigger
                        className={cn(buttonVariants({variant: active === 'More' ? 'active' : 'inactive'}), 'p-4 w-auto h-auto flex justify-between ')}
                        onClick={() => handleClick('More')}
                        >
                                <h1 className="text-sm font-medium">More</h1>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center" className="w-auto text-secondary-foreground">
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
                                <DropdownMenuItem key={item} className="focus:bg-primary focus:text-white px-4 py-2">
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
                                <DropdownMenuItem key={item} className="focus:bg-primary focus:text-white px-4 py-2">
                                    <Link href={`/`} className="w-full">
                                        {item}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <div className="flex justify-start px-4 py-2 gap-3">
                                <a href='https://x.com/_olivefinance' target="_blank">
                                    <Image src={x} alt="x link"/>
                                </a>
                                <a href='https://t.me/olive_financee' target="_blank">
                                    <Image src={telegram} alt="telegram link"/>
                                </a>
                                <a href='https://discord.gg/u6pq5yNj' target="_blank">
                                    <Image src={discord} alt="discord link" />
                                </a>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </nav>
            </div>
            <div className="flex justify-between py-4 gap-3 items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                        <div className="bg-secondary rounded-full p-2">
                            <Settings className="h-[24px] w-[24px] text-foregroundt"/>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-72 max-w-72">
                        <DropdownMenuLabel className="text-sm font-semibold">Settings</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {[
                            "dark",
                            "light",
                            "system"
                        ].map((item) => (
                            <DropdownMenuItem key={item} onClick={() => setTheme(item)} className="focus:bg-primary focus:text-white px-4 py-2">
                                {item}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                        <div className="bg-secondary rounded-full p-2">
                            <Bell className="h-[24px] w-[24px] text-foreground"/>
                        </div>
                    </DropdownMenuTrigger>
                </DropdownMenu>
                
                {isConnected ? (
                    <WalletSideBar></WalletSideBar>
                ) : (
                    <Button variant='selected' onClick={() => setIsWalletModalOpen(true)} className="w-full h-full">
                        <span className="text-sm text-white font-medium">Connect Wallet</span>
                    </Button>
                )}
                
                <WalletModal 
                    isOpen={isWalletModalOpen} 
                    onClose={() => setIsWalletModalOpen(false)}
                />
            </div>
        </header>
    )
}