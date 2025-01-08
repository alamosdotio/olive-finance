'use client'
import Link from "next/link";

import { Button, buttonVariants } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import WalletModal from "./WalletModal";
import { useWallet } from "@/contexts/walletprovider";
import WalletSideBar from "./WalletSidebar";
import { useTheme } from "next-themes";
import x from '@/public/svgs/x.svg';
import discord from '@/public/svgs/discord.svg'
import telegram from '@/public/svgs/telegram.svg'
import Image from "next/image";

import logo from '@/public/svgs/logo.svg'
import { Badge } from "./ui/badge";
import Settings from "./Settings";
import { NotificationIcon } from "@/public/svgs/icons";


export default function NavBar(){
    const [active, setActive] = useState<string>("Options");
    const { theme, setTheme } = useTheme()
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
    const { isConnected } = useWallet();

    const handleClick = (state:string) =>{
        if(active!==state){
            setActive(state)
        }
    }

    return (
        <header className="flex justify-between h-auto max-w-full">
            <div className="flex justify-between py-3 gap-12">
                <div className="flex items-center justify-center gap-2">
                    <Image src={logo} alt="logo pic" />
                    <h1 className="text-sm font-normal">Olive Finance</h1>
                </div>
                <nav className="flex justify-evenly items-center gap-8">
                    <Link 
                        href='/'
                        className={cn(buttonVariants({variant: active === 'Options' ? 'active' : 'inactive'}), 'p-0 w-auto h-auto flex justify-between gap-[10px] hover:text-primary')}
                        onClick={() => handleClick('Options')}
                    > 
                         <h1 className="text-sm font-medium">Options</h1>
                         <Badge className={cn((active === 'Options' ? 'border-primary text-primary' : 'border-secondary-foreground text-secondary-foreground'),"border-[1px] text-[10px] py-0 px-[6px] bg-transparent")}>BETA</Badge>
                    </Link>
                    <Link 
                        href='/earn'
                        className={cn(buttonVariants({variant: active === 'Earn' ? 'active' : 'inactive'}), 'p-0 w-auto h-auto flex justify-between gap-[10px] hover:text-primary')}
                        onClick={() => handleClick('Earn')}
                    > 
                         <h1 className="text-sm font-medium">Earn</h1>
                         <Badge className="rounded-[4px] bg-gradient-to-l from-[#A899F4] via-[#A899F4] to-[#DAD1FF] px-[6px] text-background">48% APY</Badge>
                    </Link>
                    
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger
                        className='text-secondary-foreground p-0 w-auto h-auto flex justify-between focus:bg-transparent focus:outline-none hover:text-primary'
                        >
                                <h1 className="text-sm font-medium">More</h1>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center" className="w-auto text-secondary-foreground">
                            {[
                                "Futures",
                                "Exotic Options",
                                "NFT Options",
                                "Liquidity",
                                "Synthetics",
                                "Yield",
                                "Prediction Markets",
                                
                            ].map((item) => (
                                <Link href={`${item.toLowerCase()}`} key={item} className="w-full">
                                    <DropdownMenuItem className="focus:bg-primary focus:text-white px-4 py-2 cursor-pointer">
                                        {item} {(['Liquidity', 'Tokenized Stocks', 'Bridge', 'Leveraged Farming'].includes(item) ? '(Coming Late)' : '(Coming Soon)')}
                                    </DropdownMenuItem>
                                </Link>
                            ))}
                            <DropdownMenuSeparator />
                            {[
                                "Docs",
                                "Info",
                                "Feedback",
                            ].map((item) => (
                                <Link href={`${item.toLowerCase()}`} key={item} className="w-full">
                                    <DropdownMenuItem className="focus:bg-primary focus:text-white px-4 py-2 cursor-pointer">
                                        {item}
                                    </DropdownMenuItem>
                                </Link>
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
            <div className="flex justify-between py-3 gap-3 items-center">
                {/* <Image src={vase} alt="vase"/> */}
                <Link 
                    href='/leaderboards'
                    onClick={() => setActive('leaderboards')}
                >
                    <div className="border bg-inherit rounded-[12px] p-[9px] cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M3.49854 13.6778C3.49854 9.49382 7.07854 5.35882 9.59254 2.97182C10.2382 2.34812 11.1008 1.99951 11.9985 1.99951C12.8962 1.99951 13.7589 2.34812 14.4045 2.97182C16.9175 5.35982 20.4985 9.49382 20.4985 13.6778C20.4985 17.7798 17.2795 21.9998 11.9985 21.9998C6.71754 21.9998 3.49854 17.7798 3.49854 13.6778Z" stroke="url(#paint0_linear_139_9650)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M15.9985 14C15.9985 15.0609 15.5771 16.0783 14.827 16.8284C14.0768 17.5786 13.0594 18 11.9985 18" stroke="url(#paint1_linear_139_9650)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <defs>
                                <linearGradient id="paint0_linear_139_9650" x1="19.2485" y1="3.24953" x2="1.42237" y2="6.87513" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#806AF1"/>
                                <stop offset="1" stopColor="#A697F4"/>
                                </linearGradient>
                                <linearGradient id="paint1_linear_139_9650" x1="15.7044" y1="14.25" x2="11.5731" y2="15.2386" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#806AF1"/>
                                <stop offset="1" stopColor="#A697F4"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </Link>

                <Settings />
                
                {/* <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                        <div className="bg-secondary rounded-[12px] p-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M16.7484 7.68336C15.24 7.68336 14.6234 6.6167 15.3734 5.30836C15.8067 4.55003 15.5484 3.58336 14.79 3.15003L13.3484 2.32503C12.69 1.93336 11.84 2.1667 11.4484 2.82503L11.3567 2.98336C10.6067 4.2917 9.37337 4.2917 8.61504 2.98336L8.52337 2.82503C8.14837 2.1667 7.29837 1.93336 6.64004 2.32503L5.19837 3.15003C4.44004 3.58336 4.18171 4.55836 4.61504 5.3167C5.37337 6.6167 4.75671 7.68336 3.24837 7.68336C2.38171 7.68336 1.66504 8.3917 1.66504 9.2667V10.7334C1.66504 11.6 2.37337 12.3167 3.24837 12.3167C4.75671 12.3167 5.37337 13.3834 4.61504 14.6917C4.18171 15.45 4.44004 16.4167 5.19837 16.85L6.64004 17.675C7.29837 18.0667 8.14837 17.8334 8.54004 17.175L8.63171 17.0167C9.38171 15.7084 10.615 15.7084 11.3734 17.0167L11.465 17.175C11.8567 17.8334 12.7067 18.0667 13.365 17.675L14.8067 16.85C15.565 16.4167 15.8234 15.4417 15.39 14.6917C14.6317 13.3834 15.2484 12.3167 16.7567 12.3167C17.6234 12.3167 18.34 11.6084 18.34 10.7334V9.2667C18.3317 8.40003 17.6234 7.68336 16.7484 7.68336ZM9.99837 12.7084C8.50671 12.7084 7.29004 11.4917 7.29004 10C7.29004 8.50836 8.50671 7.2917 9.99837 7.2917C11.49 7.2917 12.7067 8.50836 12.7067 10C12.7067 11.4917 11.49 12.7084 9.99837 12.7084Z" fill="#C0BFC7"/>
                            </svg>
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
                </DropdownMenu> */}

                <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                        <div className="bg-secondary rounded-[12px] p-3">
                            <NotificationIcon />
                        </div>
                    </DropdownMenuTrigger>
                </DropdownMenu>
                
                {isConnected ? (
                    <WalletSideBar></WalletSideBar>
                ) : (
                    <Button onClick={() => setIsWalletModalOpen(true)} className="w-full h-[43] border border-transparent py-[9px] px-[15px] rounded-[12px] gap-2 text-background">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M6.88152 17.7048C7.42067 17.1657 7.7304 16.4774 7.8107 15.7662C7.91967 14.8199 7.60421 13.8391 6.88152 13.1165C6.45135 12.6863 5.92367 12.3995 5.36731 12.2676C4.30622 11.998 3.13041 12.2791 2.293 13.1165C1.7137 13.6957 1.39824 14.4356 1.35809 15.1984C1.32941 15.5254 1.35809 15.8637 1.44413 16.1907C1.57605 16.747 1.86283 17.2747 2.293 17.7048C3.56058 18.9724 5.61394 18.9724 6.88152 17.7048ZM5.80322 14.8142C6.13589 14.8142 6.4112 15.0895 6.4112 15.4221C6.40546 15.7605 6.13589 16.0301 5.79748 16.0358L5.19524 16.0301L5.20098 16.6094C5.19524 16.9478 4.92567 17.2173 4.58726 17.2231C4.24886 17.2173 3.97928 16.9478 3.97355 16.6094L3.97928 16.0301L3.37704 16.0358C3.03864 16.0301 2.76906 15.7605 2.76333 15.4221C2.76906 15.2558 2.83789 15.1067 2.94687 14.9977C3.05584 14.8887 3.20497 14.8199 3.3713 14.8142L3.97928 14.8142L3.97928 14.1833C3.97928 14.0112 4.04811 13.8621 4.15709 13.7531C4.26607 13.6441 4.41519 13.5753 4.58726 13.5753C4.91993 13.5753 5.19524 13.8506 5.19524 14.1833L5.19524 14.8142L5.80322 14.8142Z" fill="currentColor"/>
                            <path d="M12.5782 3.20568V6.28793H11.3615V3.20568C11.3615 2.98668 11.1668 2.88123 11.037 2.88123C10.9964 2.88123 10.9559 2.88934 10.9153 2.90556L4.48296 5.33081C4.05305 5.49303 3.77726 5.89859 3.77726 6.36093V6.90438C3.03912 7.45594 2.56055 8.34006 2.56055 9.33774V6.36093C2.56055 5.3957 3.15268 4.53591 4.05305 4.19524L10.4935 1.76189C10.672 1.697 10.8585 1.66455 11.037 1.66455C11.8481 1.66455 12.5782 2.32156 12.5782 3.20568Z" fill="currentColor"/>
                            <path d="M17.9733 11.7635V12.5746C17.9733 12.7936 17.8029 12.972 17.5758 12.9801H16.3915C15.9616 12.9801 15.5723 12.6638 15.5398 12.242C15.5155 11.9906 15.6128 11.7554 15.7751 11.5931C15.9211 11.439 16.1239 11.3579 16.3429 11.3579H17.5677C17.8029 11.366 17.9733 11.5445 17.9733 11.7635Z" fill="currentColor"/>
                            <path d="M16.3338 10.5049H17.1611C17.6073 10.5049 17.9723 10.1399 17.9723 9.69381V9.33692C17.9723 7.6579 16.6014 6.28711 14.9224 6.28711H5.61045C4.92097 6.28711 4.28828 6.51422 3.77726 6.90356C3.03912 7.45512 2.56055 8.33924 2.56055 9.33692V10.7807C2.56055 11.0889 2.885 11.2836 3.17702 11.1863C3.63126 11.0322 4.10983 10.951 4.5884 10.951C7.04617 10.951 9.04969 12.9545 9.04969 15.4122C9.04969 15.9962 8.89558 16.637 8.65223 17.2048C8.52245 17.4968 8.72523 17.8456 9.04158 17.8456H14.9224C16.6014 17.8456 17.9723 16.4748 17.9723 14.7958V14.6416C17.9723 14.1955 17.6073 13.8305 17.1611 13.8305H16.4554C15.6767 13.8305 14.9305 13.352 14.7277 12.5976C14.5655 11.9812 14.7601 11.3809 15.1657 10.9916C15.4658 10.6834 15.8795 10.5049 16.3338 10.5049ZM11.8887 10.3427H7.83298C7.50041 10.3427 7.22462 10.0669 7.22462 9.73437C7.22462 9.40181 7.50041 9.12603 7.83298 9.12603H11.8887C12.2213 9.12603 12.4971 9.40181 12.4971 9.73437C12.4971 10.0669 12.2213 10.3427 11.8887 10.3427Z" fill="currentColor"/>
                        </svg>
                        <span className="text-sm font-semibold">Connect Wallet</span>
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