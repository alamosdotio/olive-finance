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
                    <Link 
                        href='/'
                        className={cn(buttonVariants({variant: active === 'More' ? 'active' : 'inactive'}), 'p-4 w-auto h-auto flex justify-between ')}
                        onClick={() => handleClick('More')}
                    > 
                         <h1 className="text-sm font-medium">More</h1>
                    </Link>
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
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                        </DropdownMenuItem>
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
                        <span className="text-sm text-foreground font-medium">Connect Wallet</span>
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