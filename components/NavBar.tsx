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

import logo from '@/public/images/logo.png'
import { Badge } from "./ui/badge";
import Settings from "./Settings";
import { ArrowDown, BoostIcon, EarnIcon, GrayPointsIcon, InfoIcon, MoreIcon, NotificationIcon, OptionsIcon, PointsIcon, RankingIcon, RedCircle } from "@/public/svgs/icons";
import { Separator } from "./ui/separator";
import { useRouter } from "next/navigation";


export default function NavBar(){
    const [active, setActive] = useState<string>("Options");
    const { theme, setTheme } = useTheme()
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
    const { isConnected } = useWallet();
    const router = useRouter()

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleClick = (state:string) =>{
        if(active!==state){
            setActive(state)
        }
    }

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open)
    }

    const handleClickPoints = () => {
        router.push('/leaderboards')
        setIsOpen(false)
        setActive('leaderboards')
    }

    return (
        <header className="flex justify-between max-w-full">
            <div className="flex justify-between py-2 gap-6">
                <div className="flex items-center justify-center gap-2">
                    <Image src={logo} alt="logo pic" className="w-full h-7 mb-1" />
                    {/* <h1 className="text-sm font-normal">Olive Finance</h1> */}
                </div>
                <nav className="flex justify-evenly items-center gap-8">
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
                                "Info",
                                "Feedback",
                            ].map((item) => (
                                <Link href={`${item.toLowerCase()}`} key={item} className="w-full">
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
                {/* <Image src={vase} alt="vase"/> */}
                {/* <Link 
                    href='/leaderboards'
                    onClick={() => setActive('leaderboards')}
                >
                    
                </Link> */}
                <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
                    <DropdownMenuTrigger asChild>
                        <div className={cn((isOpen ? 'border-[#FEEDCB] bg-[rgb(254,237,203,0.2)]' : 'border bg-inherit'),"border rounded-[12px] p-2 cursor-pointer flex justify-center items-center hover:border-[#FEEDCB] hover:bg-[rgb(254,237,203,0.2)]")}>
                            <PointsIcon />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[280px] p-5 bg-accent rounded-[20px] space-y-4 flex flex-col">
                        <div className="w-full flex flex-col p-3 border rounded-[12px]">
                            <div className="w-full flex flex-col justify-center items-center space-y-[6px]">
                                <span className="text-secondary-foreground text-xs font-medium">Season 1 Points</span>
                                <span className="text-primary text-2xl font-medium">1,953,676</span>
                                <div className="w-full flex justify-center items-center gap-1">
                                    <BoostIcon />
                                    <span className="text-xs text-foreground font-medium">6.9x Boost</span>
                                </div>
                            </div>
                            <div className="w-full py-3">
                                <Separator />
                            </div>
                            <div className="w-full flex flex-col space-y-3">
                                <div className="w-full flex justify-between items-center">
                                    <div className="flex items-center gap-1">
                                        <RankingIcon />
                                        <span className="text-xs text-secondary-foreground font-medium">Ranking</span>
                                    </div>
                                    <span className="text-xs text-foreground font-medium">#16189</span>
                                </div>
                                <div className="w-full flex justify-between items-center">
                                    <div className="flex items-center gap-1">
                                        <GrayPointsIcon />
                                        <span className="text-xs text-secondary-foreground font-medium">Points Per Day</span>
                                    </div>
                                    <span className="text-xs text-foreground font-medium">0</span>
                                </div>
                            </div>
                        </div>
                        <Button
                            className="bg-inherit border rounded-[12px] text-primary py-2 px-4 w-full text-xs font-medium shadow-none hover:border-primary"
                            onClick={()=>handleClickPoints()}
                        >
                            Go to leaderboard
                        </Button>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Settings />
                

                <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                        <div className="bg-secondary rounded-[12px] p-[9px] text-foreground hover:text-primary">
                            <NotificationIcon />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[392px] bg-accent rounded-[16px] flex flex-col p-0">
                        <div className="w-full px-5 py-3 shadow-lg">
                            <span className="text-foreground text-xs font-semibold">Notifications (2) </span>
                        </div>
                        <div className="w-full p-5">
                            <div className="w-full flex space-x-3">
                                <div className="p-[9px] bg-secondary rounded-[8px] h-fit">
                                    <InfoIcon />
                                </div>
                                <span className="text-xs font-normal text-foreground">Lorem ipsum dolor sit amet conse. Urna dui enim turpis gravida. Elementum fermentum tin posuere.</span>
                                <div className="flex flex-col justify-between">
                                    <div className="flex justify-end">
                                        <RedCircle />
                                    </div>
                                    <span className="flex text-xs text-secondary-foreground whitespace-nowrap">6 min ago</span>
                                </div>
                            </div>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
                
                {isConnected ? (
                    <WalletSideBar></WalletSideBar>
                ) : (
                    <Button onClick={() => setIsWalletModalOpen(true)} className="w-full h-fit border border-transparent py-[7px] px-4 rounded-[12px] gap-2 text-background">
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