'use client'

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter} from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

import swap from '@/public/svgs/swap.svg'
import { ChevronDown, Wallet} from 'lucide-react';

import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import WalletModal from "./WalletModal";
import { useWallet } from "@/contexts/walletprovider";
import { CountdownTimer } from "./Timer";
import { getExpiryOptions } from "@/utils/dateUtils";
import { usePythPrice } from "@/hooks/usePythPrice";
import OptionsCardTokenList from "./OptionsCardTokenList";
import { formatPrice } from "@/utils/formatter";

interface OptionsCardProps{
    chartToken: string
    onValueChange: (newValue: string) => void;
}

interface ExpiryOption {
    value: string;
    date: Date;
    label: string;
}

export default function OptionsCard({onValueChange, chartToken} : OptionsCardProps){
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
    const [position, setPosition] = useState<string>("American");
    const { priceData, loading: priceLoading, error: priceError } = usePythPrice(chartToken);
    const [formValues, setFormValues] = useState<{
        selling: { currency: string; amount: string };
        buying: { type: string; amount: string };
        strikePrice: string;
        expiry: string;
    }>({
        selling: { currency: 'usdc', amount: '' },
        buying: { type: 'call', amount: '' },
        strikePrice: '',
        expiry: '14'
    })

    const [isSwapped , setIsSwapped] = useState(false)

    const handleSwap = () => {
        setIsSwapped(!isSwapped)
        const tempAmount = formValues.selling.amount
        setFormValues(prev => ({
            ...prev,
            selling:{ ...prev.selling, amount:prev.buying.amount},
            buying: {...prev.buying, amount:tempAmount}
        }))
    }

    const handleSellingAmountChange = (newAmount: string) => {
        setFormValues(prev => ({
          ...prev,
          selling: { ...prev.selling, amount: newAmount }
        }));
        onValueChange(newAmount)
    };
    

    const { isConnected } = useWallet();
    const expiryOptions = getExpiryOptions() as ExpiryOption[];

    useEffect(() => {
        if (priceData.price !== null) {
            setFormValues(prev => ({
                ...prev,
                strikePrice: formatPrice(priceData.price!)
            }));
        }
    }, [priceData.price]);

    const renderSection = (type: 'buy' | 'sell') => {
        const isSelling = (type === 'sell' && !isSwapped) || (type === 'buy' && isSwapped)
        const values = isSelling ? formValues.selling : formValues.buying

        return(
            <div className="flex justify-between mt-5">
                <div className="flex flex-col p-0 space-y-[13px] justify-center w-full">
                    <div className="w-full flex p-0">
                        {isSelling ? (
                            <OptionsCardTokenList chartToken={chartToken}/>
                        ) : (
                            <Select value={formValues.buying.type} onValueChange={(value) => setFormValues(prev => ({ ...prev, buying: { ...prev.buying, type: value } }))}>
                                <SelectTrigger className="bg-inherit py-2 px-0 w-full h-[52px] shadow-none">
                                    <div className="flex items-center space-x-2 py-2 px-0 text-[28px] justify-evenly">
                                    <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_184_5232)">
                                        <path d="M24 48.333C37.2548 48.333 48 37.5878 48 24.333C48 11.0782 37.2548 0.333008 24 0.333008C10.7452 0.333008 0 11.0782 0 24.333C0 37.5878 10.7452 48.333 24 48.333Z" fill="#53C08D"/>
                                        <path d="M33.5445 26.4809L28.9573 19.7606L26.1563 15.6362C24.9702 13.8986 23.041 13.8986 21.8549 15.6362L14.4525 26.4809C13.4808 27.9045 14.181 30.333 15.5386 30.333H23.5555H32.4584C33.8303 30.333 34.5162 27.9045 33.5445 26.4809Z" fill="#141519"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_184_5232">
                                        <rect width="48" height="48" fill="white" transform="translate(0 0.333008)"/>
                                        </clipPath>
                                        </defs>
                                    </svg>

                                        <SelectValue placeholder="Select"/>
                                        <ChevronDown className="opacity-50" size={28}/>
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="w-full">
                                    <SelectItem value="call">Call</SelectItem>
                                    <SelectItem value="put">Put</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                    <span className="text-sm font-normal text-secondary-foreground p-0">
                        {isSelling ? 'USDC' : 'Call Option'}
                    </span>
                </div>
                <div className="w-full items-end flex flex-col p-0 space-y-3">
                    <Input
                        type="number"
                        placeholder="0.00"
                        value={values.amount}
                        onChange={(e) => {
                            if(isSelling){
                                handleSellingAmountChange(e.target.value)
                            } else {
                                setFormValues(prev => ({
                                    ...prev,
                                    buying: {...prev.buying, amount: e.target.value}
                                }))
                            }
                        }}
                        className="border-none text-right shadow-none p-0 text-[52px] font-normal text-foreground h-[52px] w-full"
                    />
                    <span className="text-sm font-normal text-secondary-foreground">$10.75</span>
                </div>
            </div>
        )
    }

    return (
        <Card className="rounded-[26px] w-2/6 h-fit">
            <CardContent className="p-0">
                <div className="px-6 pt-7 flex flex-col justify-between space-y-14">
                    <div className="w-full flex justify-between items-center">
                        <div className="w-full">
                            <Label className="text-sm font-medium text-foreground whitespace-nowrap overflow-hidden text-ellipsis">You Sell</Label>
                        </div>
                        <div className="flex justify-between gap-2 w-full items-center">
                        <div className="w-full flex gap-1">
                            <Wallet className="w-4 h-4 text-secondary-foreground"/>
                            <div className="text-sm font-normal text-secondary-foreground w-full flex gap-1">
                                <span>0.004185199</span>
                                <span>BTC</span>
                            </div>
                        </div>
                            <div className="w-full flex gap-1">
                                <Button
                                    className="px-[6px] py-[5px] text-[10px] font-semibold w-full h-auto text-secondary-foreground bg-inherit shadow-none"
                                >
                                    Max
                                </Button>
                                <Button
                                    className="px-[6px] py-[5px] text-[10px] font-semibold w-full h-auto text-secondary-foreground bg-inherit shadow-none"
                                >
                                    Half
                                </Button>
                            </div>
                        </div>
                    </div>
                    {renderSection('sell')}
                </div>
                <div className="relative flex justify-center">
                    <div className="absolute top-1/2 w-full border-t bg-border"/>
                    <Button
                        className="bg-background border rounded-full p-3 w-14 h-14 z-50 hover:border-primary"
                        onClick={handleSwap}
                    >
                        <Image src={swap} alt="swap button" className="w-8 h-8"/>
                    </Button>
                </div>
                <div className="px-6 pb-7 flex flex-col justify-between space-y-14">
                    <div className="w-full flex justify-between items-center">
                        <div className="w-full">
                            <Label className="text-sm font-medium text-foreground">You Buy</Label>
                        </div>
                        <div className="flex justify-between gap-2 items-center">
                            <div className="w-full flex gap-1">
                                <Wallet className="w-4 h-4 text-secondary-foreground"/>
                                <div className="text-sm font-normal text-secondary-foreground w-full flex gap-1">
                                    <span>0.004185199</span>
                                    <span>BTC</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {renderSection('buy')}
                </div>
            </CardContent>
            <CardFooter className="px-6 py-7 flex flex-col space-y-10 border-t">
                <div className="w-full flex gap-4">
                    <div className="flex flex-col gap-[6px] w-full">
                        <Label className="text-foreground text-sm font-medium gap-1 flex justify-between items-center">
                            Strike Price
                        </Label>
                        <Input 
                            type="number"
                            placeholder={priceLoading ? "Loading..." : "0.00"}
                            className="border-none bg-backgroundSecondary px-3 py-2 text-foreground rounded-[12px] w-full"
                            value={priceData.price ? formatPrice(priceData.price) : formValues.strikePrice}
                            onChange={(e) => setFormValues(prev => ({ ...prev, strikePrice: e.target.value }))}
                        />
                        {/* {priceError && (
                            <span className="text-sm text-red-500">Failed to load SOL price</span>
                        )} */}
                    </div>
                    <div className="flex flex-col gap-[6px] w-full">
                        <Label className="text-foreground text-sm font-medium gap-1 flex justify-between items-center">
                            Expiry
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M7.99984 14.6665C11.6732 14.6665 14.6665 11.6732 14.6665 7.99984C14.6665 4.3265 11.6732 1.33317 7.99984 1.33317C4.3265 1.33317 1.33317 4.3265 1.33317 7.99984C1.33317 11.6732 4.3265 14.6665 7.99984 14.6665ZM8.49984 10.6665C8.49984 10.9398 8.27317 11.1665 7.99984 11.1665C7.7265 11.1665 7.49984 10.9398 7.49984 10.6665V7.33317C7.49984 7.05984 7.7265 6.83317 7.99984 6.83317C8.27317 6.83317 8.49984 7.05984 8.49984 7.33317V10.6665ZM7.3865 5.07984C7.41984 4.99317 7.4665 4.9265 7.5265 4.85984C7.59317 4.79984 7.6665 4.75317 7.7465 4.71984C7.8265 4.6865 7.91317 4.6665 7.99984 4.6665C8.0865 4.6665 8.17317 4.6865 8.25317 4.71984C8.33317 4.75317 8.4065 4.79984 8.47317 4.85984C8.53317 4.9265 8.57984 4.99317 8.61317 5.07984C8.6465 5.15984 8.6665 5.2465 8.6665 5.33317C8.6665 5.41984 8.6465 5.5065 8.61317 5.5865C8.57984 5.6665 8.53317 5.73984 8.47317 5.8065C8.4065 5.8665 8.33317 5.91317 8.25317 5.9465C8.09317 6.01317 7.9065 6.01317 7.7465 5.9465C7.6665 5.91317 7.59317 5.8665 7.5265 5.8065C7.4665 5.73984 7.41984 5.6665 7.3865 5.5865C7.35317 5.5065 7.33317 5.41984 7.33317 5.33317C7.33317 5.2465 7.35317 5.15984 7.3865 5.07984Z" fill="#808693"/>
                            </svg>
                        </Label>
                        <Select
                            value={formValues.expiry}
                            onValueChange={(value) => setFormValues(prev => ({ ...prev, expiry: value }))}
                        >
                            <SelectTrigger className="bg-backgroundSecondary w-full h-full rounded-[12px] text-sm">
                                <SelectValue />
                                <ChevronDown className="opacity-50" size={14}/>
                            </SelectTrigger>
                            <SelectContent>
                                {expiryOptions.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                        className="flex justify-between items-center"
                                    >
                                        <span>{option.label} </span>
                                        {option.date && (
                                            <CountdownTimer targetDate={option.date} />
                                        )}
                                    </SelectItem>
                                ))}
                                <SelectItem
                                    value="custom"
                                >
                                    Pick a Date
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                {!isConnected && (
                    <Button 
                        className="w-full h-auto rounded-xl text-background flex"
                        onClick={() => setIsWalletModalOpen(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M6.88152 17.7048C7.42067 17.1657 7.7304 16.4774 7.8107 15.7662C7.91967 14.8199 7.60421 13.8391 6.88152 13.1165C6.45135 12.6863 5.92367 12.3995 5.36731 12.2676C4.30622 11.998 3.13041 12.2791 2.293 13.1165C1.7137 13.6957 1.39824 14.4356 1.35809 15.1984C1.32941 15.5254 1.35809 15.8637 1.44413 16.1907C1.57605 16.747 1.86283 17.2747 2.293 17.7048C3.56058 18.9724 5.61394 18.9724 6.88152 17.7048ZM5.80322 14.8142C6.13589 14.8142 6.4112 15.0895 6.4112 15.4221C6.40546 15.7605 6.13589 16.0301 5.79748 16.0358L5.19524 16.0301L5.20098 16.6094C5.19524 16.9478 4.92567 17.2173 4.58726 17.2231C4.24886 17.2173 3.97928 16.9478 3.97355 16.6094L3.97928 16.0301L3.37704 16.0358C3.03864 16.0301 2.76906 15.7605 2.76333 15.4221C2.76906 15.2558 2.83789 15.1067 2.94687 14.9977C3.05584 14.8887 3.20497 14.8199 3.3713 14.8142L3.97928 14.8142L3.97928 14.1833C3.97928 14.0112 4.04811 13.8621 4.15709 13.7531C4.26607 13.6441 4.41519 13.5753 4.58726 13.5753C4.91993 13.5753 5.19524 13.8506 5.19524 14.1833L5.19524 14.8142L5.80322 14.8142Z" fill="currentColor"/>
                            <path d="M12.5782 3.20568V6.28793H11.3615V3.20568C11.3615 2.98668 11.1668 2.88123 11.037 2.88123C10.9964 2.88123 10.9559 2.88934 10.9153 2.90556L4.48296 5.33081C4.05305 5.49303 3.77726 5.89859 3.77726 6.36093V6.90438C3.03912 7.45594 2.56055 8.34006 2.56055 9.33774V6.36093C2.56055 5.3957 3.15268 4.53591 4.05305 4.19524L10.4935 1.76189C10.672 1.697 10.8585 1.66455 11.037 1.66455C11.8481 1.66455 12.5782 2.32156 12.5782 3.20568Z" fill="currentColor"/>
                            <path d="M17.9733 11.7635V12.5746C17.9733 12.7936 17.8029 12.972 17.5758 12.9801H16.3915C15.9616 12.9801 15.5723 12.6638 15.5398 12.242C15.5155 11.9906 15.6128 11.7554 15.7751 11.5931C15.9211 11.439 16.1239 11.3579 16.3429 11.3579H17.5677C17.8029 11.366 17.9733 11.5445 17.9733 11.7635Z" fill="currentColor"/>
                            <path d="M16.3338 10.5049H17.1611C17.6073 10.5049 17.9723 10.1399 17.9723 9.69381V9.33692C17.9723 7.6579 16.6014 6.28711 14.9224 6.28711H5.61045C4.92097 6.28711 4.28828 6.51422 3.77726 6.90356C3.03912 7.45512 2.56055 8.33924 2.56055 9.33692V10.7807C2.56055 11.0889 2.885 11.2836 3.17702 11.1863C3.63126 11.0322 4.10983 10.951 4.5884 10.951C7.04617 10.951 9.04969 12.9545 9.04969 15.4122C9.04969 15.9962 8.89558 16.637 8.65223 17.2048C8.52245 17.4968 8.72523 17.8456 9.04158 17.8456H14.9224C16.6014 17.8456 17.9723 16.4748 17.9723 14.7958V14.6416C17.9723 14.1955 17.6073 13.8305 17.1611 13.8305H16.4554C15.6767 13.8305 14.9305 13.352 14.7277 12.5976C14.5655 11.9812 14.7601 11.3809 15.1657 10.9916C15.4658 10.6834 15.8795 10.5049 16.3338 10.5049ZM11.8887 10.3427H7.83298C7.50041 10.3427 7.22462 10.0669 7.22462 9.73437C7.22462 9.40181 7.50041 9.12603 7.83298 9.12603H11.8887C12.2213 9.12603 12.4971 9.40181 12.4971 9.73437C12.4971 10.0669 12.2213 10.3427 11.8887 10.3427Z" fill="currentColor"/>
                        </svg>
                        <span className="text-sm font-semibold">
                            Connect Wallet to Trade
                        </span>
                    </Button>
                )}
                {isConnected && (
                    <Button 
                        disabled={formValues.buying.amount==="" && formValues.selling.amount === ""}
                        className={formValues.buying.amount==="" && formValues.selling.amount === "" ? "w-full h-auto rounded-xl text-background flex disabled:pointer-events-auto disabled:cursor-not-allowed" : 'w-full h-auto rounded-xl text-black flex'}
                        onClick={() => console.log('Initiate Trade')}
                    >
                        <span className="text-sm font-semibold">
                            {formValues.buying.amount === '' && formValues.selling.amount === '' ? 'Enter Amount' : 'Trade'}
                        </span>
                    </Button>
                )}
                <WalletModal 
                    isOpen={isWalletModalOpen} 
                    onClose={() => setIsWalletModalOpen(false)}
                />
            </CardFooter>
        </Card>
    )
}