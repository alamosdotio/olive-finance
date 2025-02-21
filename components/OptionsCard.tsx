'use client'

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardFooter} from "./ui/card";
import { Label } from "./ui/label";
import { ChevronDown, Wallet} from 'lucide-react';
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import WalletModal from "./WalletModal";
import { CountdownTimer } from "./Timer";
import { getExpiryOptions } from "@/utils/dateUtils";
import OptionsCardTokenList from "./OptionsCardTokenList";
import { formatPrice } from "@/utils/formatter";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { useTheme } from "next-themes";
import { SwapDarkGreen, SwapDarkPurple, SwapLightGreen, SwapLightPurple } from "@/public/svgs/icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { format } from "date-fns";
import * as Portal from "@radix-ui/react-portal";
import { useOptionsPricing } from "@/hooks/useOptionsPricing";
import { calculateOptionsQuantity, calculateTokensNeeded } from "@/utils/optionsPricing";
import { Token } from "@/lib/data/tokens";
import { usePythPrice, type PythPriceState } from '@/hooks/usePythPrice';
import { type MarketDataState } from '@/hooks/usePythMarketData';
import { useWallet } from "@solana/wallet-adapter-react";
import { useSmartContract } from "@/hooks/useSmartContract";

interface OptionsCardProps {
    chartToken: string;
    chartTokenLogo: string;
    onValueChange: (newValue: string) => void;
    priceData: PythPriceState;
    marketData: MarketDataState;
    priceLoading: boolean;
}

interface ExpiryOption {
    value: string;
    date: Date;
    label: string;
}

const OptionsCard = ({
    chartToken,
    chartTokenLogo,
    onValueChange,
    priceData,
    marketData,
    priceLoading
}: OptionsCardProps) => {
    const {onBuyOption, onSellOption} = useSmartContract()
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
    const [isExpiry, setIsExpiry] = useState(false)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const { theme } = useTheme()
    const triggerRef = useRef<HTMLButtonElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);
    const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });

    const [selectedSellingToken, setSelectedSellingToken] = useState<Token | null>(null);
    const [selectedBuyingToken, setSelectedBuyingToken] = useState<Token | null>(null);

    const expiryOptions = getExpiryOptions().filter((opt): opt is ExpiryOption => opt !== null);
    const defaultExpiryOption = expiryOptions.find(opt => opt.value === '14') ?? expiryOptions[0];
    
    const [date, setDate] = useState<Date>(defaultExpiryOption.date);
    const [formValues, setFormValues] = useState<{
        selling: { currency: string; amount: string };
        buying: { type: string; amount: string };
        strikePrice: string;
        expiry: string;
    }>({
        selling: { currency: 'usdc', amount: '' },
        buying: { type: 'call', amount: '' },
        strikePrice: priceData.price ? formatPrice(priceData.price) : '',
        expiry: defaultExpiryOption.value
    });

    const [userEditedStrikePrice, setUserEditedStrikePrice] = useState(false);

    useEffect(() => {
        if (priceData.price && !userEditedStrikePrice) {
            setFormValues(prev => ({
                ...prev,
                strikePrice: priceData.price ? formatPrice(priceData.price) : ''
            }));
        }
    }, [priceData.price, userEditedStrikePrice]);

    const [isSwapped, setIsSwapped] = useState(false);

    const { priceData: sellingTokenPrice } = usePythPrice(
        selectedSellingToken ? `Crypto.${selectedSellingToken.symbol}/USD` : 'Crypto.USDC/USD'
    );
    const { priceData: buyingTokenPrice } = usePythPrice(
        selectedBuyingToken ? `Crypto.${selectedBuyingToken.symbol}/USD` : chartToken
    );

    const { premium } = useOptionsPricing({
        type: formValues.buying.type as 'call' | 'put',
        strikePrice: parseFloat(formValues.strikePrice) || 0,
        currentPrice: priceData.price || 0,
        expiryDate: date,
        historicalPrices: marketData.historicalPrices
    });

    useEffect(() => {
        if (isCalendarOpen && triggerRef.current) {
            const updatePosition = () => {
                if (triggerRef.current) {
                    const rect = triggerRef.current.getBoundingClientRect();
                    setCalendarPosition({
                        top: rect.top - 6,
                        left: rect.right - 250,
                    });
                }
            };

            updatePosition();
            window.addEventListener('scroll', updatePosition, { passive: true });
            window.addEventListener('resize', updatePosition, { passive: true });

            const handleClickOutside = (event: MouseEvent) => {
                if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                    setIsCalendarOpen(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);

            return () => {
                window.removeEventListener('scroll', updatePosition);
                window.removeEventListener('resize', updatePosition);
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [isCalendarOpen]);

    const handleSwap = () => {
        setIsSwapped(!isSwapped);
        const tempAmount = formValues.selling.amount;
        setFormValues(prev => ({
            ...prev,
            selling: { ...prev.selling, amount: prev.buying.amount },
            buying: { ...prev.buying, amount: tempAmount }
        }));
    };

    const handleExpiryChange = (value: string) => {
        const option = expiryOptions.find(opt => opt.value === value);
        if (option) {
            setFormValues(prev => ({ 
                ...prev, 
                expiry: value,
            }));
            setDate(option.date);
            setIsExpiry(false);
        }
    };

    const handleSellingAmountChange = (newAmount: string) => {
        const numAmount = parseFloat(newAmount) || 0;
        const amountInUSD = sellingTokenPrice.price 
            ? numAmount * sellingTokenPrice.price 
            : numAmount;
        const optionsQuantity = calculateOptionsQuantity(amountInUSD, premium);
        
        setFormValues(prev => ({
            ...prev,
            selling: { ...prev.selling, amount: newAmount },
            buying: { ...prev.buying, amount: formatPrice(optionsQuantity) }
        }));
        onValueChange(newAmount);
    };

    const handleBuyingAmountChange = (newAmount: string) => {
        const numAmount = parseFloat(newAmount) || 0;
        const tokensNeededUSD = calculateTokensNeeded(numAmount, premium);
        const tokensNeeded = sellingTokenPrice.price 
            ? tokensNeededUSD / sellingTokenPrice.price 
            : tokensNeededUSD;
        
        setFormValues(prev => ({
            ...prev,
            buying: { ...prev.buying, amount: newAmount },
            selling: { ...prev.selling, amount: formatPrice(tokensNeeded) }
        }));
    };

    const handleStrikePriceChange = (value: string) => {
        setUserEditedStrikePrice(true);
        setFormValues(prev => ({ ...prev, strikePrice: value }));
    };
    
    const { connected, } = useWallet();
    
    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            setDate(selectedDate);
            setFormValues(prev => ({
                ...prev,
                expiry: 'custom',
            }));
            setIsCalendarOpen(false);
        }
    };

    const handlePickDate = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsExpiry(false);
        setTimeout(() => {
            setIsCalendarOpen(true);
        }, 100);
    };

    const getSelectedExpiryOption = (): ExpiryOption => {
        if (formValues.expiry === 'custom' && date) {
            return {
                label: format(date, 'ddMMMyy').toUpperCase(),
                date: date,
                value: 'custom'
            };
        }
        const option = expiryOptions.find(opt => opt.value === formValues.expiry);
        return option ?? defaultExpiryOption;
    };

    const handleSellingTokenSelect = (token: Token) => {
        setSelectedSellingToken(token);
        if (formValues.selling.amount) {
            handleSellingAmountChange(formValues.selling.amount);
        }
    };

    const handleBuyingTokenSelect = (token: Token) => {
        setSelectedBuyingToken(token);
        if (formValues.buying.amount) {
            handleBuyingAmountChange(formValues.buying.amount);
        }
    };

    const renderSection = (type: 'buy' | 'sell') => {
        const isSelling = (type === 'sell' && !isSwapped) || (type === 'buy' && isSwapped)
        const values = isSelling ? formValues.selling : formValues.buying

        return(
            <div className="flex justify-between mt-5">
                <div className="flex flex-col p-0 space-y-[13px] justify-center w-full">
                    <div className="w-full flex p-0">
                        {isSelling ? (
                            <OptionsCardTokenList 
                                type={isSelling} 
                                chartToken={chartToken}
                                chartTokenLogo={chartTokenLogo}
                                onTokenSelect={handleSellingTokenSelect}
                            />
                        ) : (
                            <OptionsCardTokenList 
                                type={isSelling} 
                                chartToken={chartToken}
                                chartTokenLogo={chartTokenLogo}
                                onTokenSelect={handleBuyingTokenSelect}
                            />
                        )}
                    </div>
                    <span className="text-sm font-normal text-secondary-foreground p-0">
                        {isSelling ? selectedSellingToken?.symbol || 'USDC' : 'Call Option'}
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
                                handleBuyingAmountChange(e.target.value)
                            }
                        }}
                        className="border-none text-right shadow-none p-0 text-[52px] font-normal text-foreground h-[52px] w-full"
                    />
                    <span className="text-sm font-normal text-secondary-foreground">
                        ${premium ? formatPrice(premium) : '0.00'}
                    </span>
                </div>
            </div>
        )
    }

    const onTrade = () => {
        console.log(
            "formvalue", formValues, isSwapped
        )
        if(isSwapped) {
            onSellOption(parseFloat(formValues.selling.amount)) // TODO: Corrent answer for sell and buy options.
        } else {
            onBuyOption(parseFloat(formValues.selling.amount), parseFloat(formValues.strikePrice), 
                parseFloat(formValues.expiry), formValues.buying.type === "call" ? true : false, formValues.selling.currency === "usdc" ? false : true)

        }
    }

    const selectedOption = getSelectedExpiryOption();

    return (
        <Card className="w-full rounded-[26px] h-fit">
            <CardContent className="p-0">
                <div className="px-6 pt-7 flex flex-col justify-between space-y-[84px]">
                    <div className="w-full flex justify-between items-center">
                        <div className="w-full">
                            <Label className="text-sm font-medium text-foreground whitespace-nowrap overflow-hidden text-ellipsis">You Sell</Label>
                        </div>
                        <div className="flex justify-between gap-2 w-full items-center">
                            <div className="w-full flex gap-1">
                                <Wallet className="w-4 h-4 text-secondary-foreground"/>
                                <div className="text-sm font-normal text-secondary-foreground w-full flex gap-1">
                                    <span>0.004185199</span>
                                    <span>{selectedSellingToken?.symbol || 'USDC'}</span>
                                </div>
                            </div>
                            <div className="w-full flex gap-1">
                                <Button
                                    className="px-[6px] py-[5px] text-[10px] font-semibold w-full h-4 text-background bg-gradient-primary shadow-none"
                                >
                                    Max
                                </Button>
                                <Button
                                    className="px-[6px] py-[5px] text-[10px] font-semibold w-full h-4 text-background bg-gradient-primary shadow-none"
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
                        className="bg-background border rounded-full p-3 w-14 h-14 z-50 hover:border-primary [&_svg]:size-8 flex items-center"
                        onClick={handleSwap}
                    >
                        {theme === 'dark-purple' && (<SwapDarkPurple />)}
                        {theme === 'light-purple' && <SwapLightPurple />}
                        {theme === 'dark-green' && <SwapDarkGreen />}
                        {theme === 'light-green' && <SwapLightGreen />}
                    </Button>
                </div>
                <div className="px-6 pb-7 flex flex-col justify-between space-y-[84px]">
                    <div className="w-full flex justify-between items-center">
                        <div className="w-full">
                            <Label className="text-sm font-medium text-foreground">You Buy</Label>
                        </div>
                        <div className="flex justify-between gap-2 items-center">
                            <div className="w-full flex gap-1">
                                <Wallet className="w-4 h-4 text-secondary-foreground"/>
                                <div className="text-sm font-normal text-secondary-foreground w-full flex gap-1">
                                    <span>0.004185199</span>
                                    <span>{selectedBuyingToken?.symbol || 'BTC'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {renderSection('buy')}
                </div>
            </CardContent>
            <CardFooter className="px-6 py-7 flex flex-col space-y-8 border-t">
                <div className="w-full flex gap-4">
                    <div className="flex flex-col gap-[6px] w-full">
                        <Label className="text-foreground text-sm font-medium gap-1 flex justify-between items-center whitespace-nowrap">
                            Strike Price
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground">$</span>
                            <Input 
                                type="number"
                                placeholder={priceLoading ? "Loading..." : "0.00"}
                                className="border border-transparent bg-backgroundSecondary pl-6 pr-3 py-2 text-sm text-foreground rounded-[12px] w-full focus-visible:border-primary h-10"
                                value={formValues.strikePrice}
                                onChange={(e) => handleStrikePriceChange(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[6px] w-full h-[74px]">
                        <Label className="text-foreground text-sm font-medium gap-1 flex justify-between items-center">
                            Expiry
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M7.99984 14.6665C11.6732 14.6665 14.6665 11.6732 14.6665 7.99984C14.6665 4.3265 11.6732 1.33317 7.99984 1.33317C4.3265 1.33317 1.33317 4.3265 1.33317 7.99984C1.33317 11.6732 4.3265 14.6665 7.99984 14.6665ZM8.49984 10.6665C8.49984 10.9398 8.27317 11.1665 7.99984 11.1665C7.7265 11.1665 7.49984 10.9398 7.49984 10.6665V7.33317C7.49984 7.05984 7.7265 6.83317 7.99984 6.83317C8.27317 6.83317 8.49984 7.05984 8.49984 7.33317V10.6665ZM7.3865 5.07984C7.41984 4.99317 7.4665 4.9265 7.5265 4.85984C7.59317 4.79984 7.6665 4.75317 7.7465 4.71984C7.8265 4.6865 7.91317 4.6665 7.99984 4.6665C8.0865 4.6665 8.17317 4.6865 8.25317 4.71984C8.33317 4.75317 8.4065 4.79984 8.47317 4.85984C8.53317 4.9265 8.57984 4.99317 8.61317 5.07984C8.6465 5.15984 8.6665 5.2465 8.6665 5.33317C8.6665 5.41984 8.6465 5.5065 8.61317 5.5865C8.57984 5.6665 8.53317 5.73984 8.47317 5.8065C8.4065 5.8665 8.33317 5.91317 8.25317 5.9465C8.09317 6.01317 7.9065 6.01317 7.7465 5.9465C7.6665 5.91317 7.59317 5.8665 7.5265 5.8065C7.4665 5.73984 7.41984 5.6665 7.3865 5.5865C7.35317 5.5065 7.33317 5.41984 7.33317 5.33317C7.33317 5.2465 7.35317 5.15984 7.3865 5.07984Z" fill="#808693"/>
                            </svg>
                        </Label>
                        <div className="relative">
                            <DropdownMenu
                                open={isExpiry}
                                onOpenChange={setIsExpiry}
                            >
                                <DropdownMenuTrigger asChild>
                                    <Button 
                                        ref={triggerRef}
                                        className={cn((isExpiry === true || isCalendarOpen ? 'border-primary' : 'border-transparent'),"bg-backgroundSecondary w-full h-10 rounded-[12px] text-sm border px-3 py-2 focus-visible:ring-0 shadow-none")}
                                    >
                                        <div className="flex justify-between items-center w-full">
                                            <div className="flex items-center gap-1">
                                                <span className="text-foreground text-xs font-normal">
                                                    {selectedOption.label}
                                                </span>
                                                {selectedOption.date && (
                                                    <>
                                                        <span className="text-secondary-foreground text-xs font-normal">•</span>
                                                        <CountdownTimer targetDate={selectedOption.date} />
                                                    </>
                                                )}
                                            </div>
                                            <ChevronDown className="text-secondary-foreground" size={12}/>
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-52" align="start">
                                    {expiryOptions.map((option) => (
                                        <DropdownMenuItem
                                            key={option.value}
                                            className="flex justify-start items-center w-full cursor-pointer"
                                            onClick={() => handleExpiryChange(option.value)}
                                        >
                                            <span className="text-foreground">{option.label}</span>
                                            <span className="text-secondary-foreground">•</span>
                                            <CountdownTimer targetDate={option.date} />
                                        </DropdownMenuItem>
                                    ))}
                                    <DropdownMenuItem
                                        onSelect={(e) => {
                                            e.preventDefault();
                                        }}
                                        onClick={handlePickDate}
                                        className="cursor-pointer"
                                    >
                                        <span className="text-foreground">Pick a date</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {isCalendarOpen && (
                                <Portal.Root>
                                    <div
                                        ref={calendarRef}
                                        className="fixed z-50"
                                        style={{
                                            transform: 'translateY(-100%)',
                                            top: `${calendarPosition.top}px`,
                                            left: `${calendarPosition.left}px`,
                                        }}
                                    >
                                        <div className="bg-popover rounded-md border shadow-md">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={handleDateSelect}
                                                initialFocus
                                            />
                                        </div>
                                    </div>
                                </Portal.Root>
                            )}
                        </div>
                    </div>
                </div>
                {!connected && (
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
                {connected && (
                    <Button 
                        disabled={formValues.buying.amount==="" && formValues.selling.amount === ""}
                        className={formValues.buying.amount==="" && formValues.selling.amount === "" ? "w-full h-auto rounded-xl text-background flex disabled:pointer-events-auto disabled:cursor-not-allowed" : 'w-full h-auto rounded-xl text-black flex'}
                        onClick={onTrade}
                    >
                        <span className="text-sm font-semibold">
                            {formValues .buying.amount === '' && formValues.selling.amount === '' ? 'Enter Amount' : 'Trade'}
                        </span>
                    </Button>
                )}
                <WalletModal 
                    isOpen={isWalletModalOpen} 
                    onClose={() => setIsWalletModalOpen(false)}
                />
            </CardFooter>
        </Card>
    );
}

export default OptionsCard;