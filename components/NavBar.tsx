'use client'
import Link from "next/link";

import { Button, buttonVariants } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import WalletModal from "./WalletModal";
import WalletSideBar from "./WalletSidebar";
import { useTheme } from "next-themes";
import x from '@/public/svgs/x.svg';
import discord from '@/public/svgs/discord.svg'
import telegram from '@/public/svgs/telegram.svg'
import Image from "next/image";

import { Badge } from "./ui/badge";
import Settings from "./Settings";
import { ArrowDown, EarnIcon, MoreIcon, OptionsIcon, WalletIcon} from "@/public/svgs/icons";
import NavBarMobile from "./NavBarMobile";
import Notifications from "./Notifications";
import PointsDropDown from "./PointsDropDown";
import { useWallet } from "@solana/wallet-adapter-react";


export default function NavBar(){
    const [active, setActive] = useState<string>("Options");
    const { theme } = useTheme()
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
    const { connected } = useWallet();

    const handleClick = (state:string) =>{
        if(active!==state){
            setActive(state)
        }
    }

    return (
        <header className="flex justify-between max-w-full">
            <div className="flex justify-between py-2 gap-6">
                <div className="flex items-center justify-center gap-2 px-1">
                    {(theme === 'light-purple' || theme === 'light-green') ? (
                        <Image src="/images/logo-color.png" alt="logo pic" width={760} height={933} className="w-6 h-7 mb-1" />
                    ) : (
                        <Image src="/images/logo-color.png" alt="logo pic" width={760} height={933} className="w-6 h-7 mb-1" />
                    )}
                    {/* <h1 className="text-sm font-normal">Olive Finance</h1> */}
                </div>
                <nav className="hidden md:flex justify-evenly items-center gap-8">
                    <Link 
                        href='/'
                        className={cn(buttonVariants({variant: active === 'Options' ? 'active' : 'inactive'}), 'p-0 w-auto h-auto flex justify-between gap-1 hover:text-primary group')}
                        onClick={() => handleClick('Options')}
                    > 
                         <OptionsIcon />
                         <h1 className="text-sm font-medium group-hover:text-primary">Options</h1>
                         <Badge className={cn((active === 'Options' ? 'border-primary text-gradient-primary' : 'border-secondary-foreground text-secondary-foreground'),"border text-[8px] px-1 py-[3px] rounded-[3px] h-4 bg-transparent text-center flex group-hover:border-primary group-hover:text-primary")}>BETA</Badge>
                    </Link>
                    <Link 
                        href='/earn'
                        className={cn(buttonVariants({variant: active === 'Earn' ? 'active' : 'inactive'}), 'p-0 w-auto h-auto flex justify-between gap-1 hover:text-primary')}
                        onClick={() => handleClick('Earn')}
                    > 
                         <EarnIcon />
                         <h1 className="text-sm font-medium">Earn</h1>
                         <Badge className="rounded-[4px] bg-gradient-primary px-1 py-[3px] text-background h-4 text-[8px] border-none">48% APY</Badge>
                    </Link>
                    
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger
                        className='text-secondary-foreground p-0 w-auto h-auto flex items-center gap-1 justify-between focus:bg-transparent focus:outline-none hover:text-primary'
                        >
                                <MoreIcon />
                                <h1 className="text-sm font-medium">More</h1>
                                <ArrowDown />
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
                                    <DropdownMenuItem className="focus:text-primary px-4 py-2 cursor-pointer">
                                        {item} {(['Liquidity', 'Tokenized Stocks', 'Bridge', 'Leveraged Farming'].includes(item) ? '(Coming Late)' : '(Coming Soon)')}
                                    </DropdownMenuItem>
                                </Link>
                            ))}
                            <DropdownMenuSeparator />
                            {[
                                "Docs",
                                "Analytics",
                                "Feedback",
                            ].map((item) => (
                                <Link href={`/${item.toLowerCase()}`} key={item} className="w-full">
                                    <DropdownMenuItem className="focus:text-primary px-4 py-2 cursor-pointer">
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
            <div className="flex justify-between py-2 gap-3 items-center">
                <PointsDropDown setActive={setActive} />
                <Settings />
                <Notifications />
                
                {connected ? (
                    <WalletSideBar />
                ) : (
                    <Button onClick={() => setIsWalletModalOpen(true)} className="w-full h-fit border border-transparent py-[7px] px-4 rounded-[12px] gap-2 text-background">
                        <WalletIcon />
                        <span className="text-sm font-semibold flex gap-2">Connect <span className="hidden md:flex">Wallet</span></span>
                    </Button>
                )}
                <NavBarMobile />
                <WalletModal 
                    isOpen={isWalletModalOpen} 
                    onClose={() => setIsWalletModalOpen(false)}
                />
            </div>
        </header>
    )
}