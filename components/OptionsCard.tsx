'use client'

import { useEffect, useState, useRef, useContext } from "react"
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
import { SwapDarkGreen, SwapDarkPurple, SwapLightGreen, SwapLightPurple, TooltipIcon, WalletIcon } from "@/public/svgs/icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { format } from "date-fns";
import * as Portal from "@radix-ui/react-portal";
import { useOptionsPricing } from "@/hooks/useOptionsPricing";
import { calculateOptionsQuantity, calculateTokensNeeded } from "@/utils/optionsPricing";
import { Token } from "@/lib/data/tokens";
import { usePythPrice, type PythPriceState } from '@/hooks/usePythPrice';
import { type MarketDataState } from '@/hooks/usePythMarketData';
import { useWallet } from "@solana/wallet-adapter-react";
import { USDC_DECIMALS, WSOL_DECIMALS } from "@/utils/const";
import { ContractContext } from "@/contexts/contractProvider";

import TransactionToast from "./TransactionToast";

interface OptionsCardProps {
    chartToken: string;
    chartTokenLogo: string;
    onBuyingChange: (newValue: string) => void;
    onValueChange: (newValue: string) => void;
    onStrikePriceChange: (newValue: string) => void;
    onPositionTypeChange: (newValue: string) => void;
    onContractTypeChange: (newValue: string) => void;
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
    onBuyingChange,
    onValueChange,
    onStrikePriceChange,
    onContractTypeChange,
    onPositionTypeChange,
    priceData,
    marketData,
    priceLoading
}: OptionsCardProps) => {
    const { onOpenOption, onCloseOption } = useContext(ContractContext);
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
    const [isExpiry, setIsExpiry] = useState(false)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const [isToast, setIsToast] = useState(false)
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
            onStrikePriceChange(formatPrice(priceData.price))
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
        onValueChange(numAmount.toString());
        onBuyingChange(optionsQuantity.toString())
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
        onBuyingChange(numAmount.toString());
        onValueChange(tokensNeeded.toString())
    };

    const handleStrikePriceChange = (value: string) => {
        setUserEditedStrikePrice(true);
        setFormValues(prev => ({ ...prev, strikePrice: value }));
        onStrikePriceChange(value)
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
                                transaction={type}
                                chartToken={chartToken}
                                chartTokenLogo={chartTokenLogo}
                                onContractTypeChange={onContractTypeChange}
                                onPositionTypeChange={onPositionTypeChange}
                                onTokenSelect={handleSellingTokenSelect}
                            />
                        ) : (
                            <OptionsCardTokenList 
                                type={isSelling}
                                transaction={type}
                                chartToken={chartToken}
                                onContractTypeChange={onContractTypeChange}
                                onPositionTypeChange={onPositionTypeChange}
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

    const onTrade = async () => {
        console.log(
            "formvalue", formValues, isSwapped
        )
        if(isSwapped) {
            console.log("sell option from users")
            // onSellOption(parseFloat(formValues.selling.amount))
        } else {
            console.log("buy option from pool")
            if (formValues.buying.type === "call" ) {
            console.log("sell option from users")

                // const result = await onBuyOption(parseFloat(formValues.selling.amount) * 10 ** WSOL_DECIMALS, parseFloat(formValues.strikePrice), 
                // parseFloat(formValues.expiry),Math.ceil(date.getTime()/1000), true, false)
                // //formValues.selling.currency === "usdc" check to premium payent unit
                // setIsToast(!isToast)
            } else {
            //    const result = await onBuyOption(parseFloat(formValues.selling.amount) * 10 ** USDC_DECIMALS, parseFloat(formValues.strikePrice), 
            //     parseFloat(formValues.expiry),Math.ceil(date.getTime()/1000), false, false)
            //     // TODO: result == true ? contgratulation toast : faild/retry toast
            //     setIsToast(!isToast)
            }
            
        }
    }

    const selectedOption = getSelectedExpiryOption();

    return (
        <Card className="w-full rounded-sm h-fit">
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
                                    className="px-[6px] py-[5px] text-[10px] rounded-[2px] font-semibold w-full h-4 text-background bg-gradient-primary shadow-none"
                                >
                                    Max
                                </Button>
                                <Button
                                    className="px-[6px] py-[5px] text-[10px] rounded-[2px] font-semibold w-full h-4 text-background bg-gradient-primary shadow-none"
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
                                className="border border-transparent bg-backgroundSecondary pl-6 pr-3 py-2 text-sm text-foreground rounded-sm w-full focus-visible:border-primary h-10"
                                value={formValues.strikePrice}
                                onChange={(e) => handleStrikePriceChange(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[6px] w-full h-[74px]">
                        <Label className="text-foreground text-sm font-medium gap-1 flex justify-between items-center">
                            Expiry
                            <TooltipIcon />
                        </Label>
                        <div className="relative">
                            <DropdownMenu
                                open={isExpiry}
                                onOpenChange={setIsExpiry}
                            >
                                <DropdownMenuTrigger asChild>
                                    <Button 
                                        ref={triggerRef}
                                        className={cn((isExpiry === true || isCalendarOpen ? 'border-primary' : 'border-transparent'),"bg-backgroundSecondary w-full h-10 rounded-sm text-sm border px-3 py-2 focus-visible:ring-0 shadow-none")}
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
                        className="w-full h-auto rounded-sm text-background flex"
                        onClick={() => setIsWalletModalOpen(true)}
                    >
                        <WalletIcon />
                        <span className="text-sm font-semibold">
                            Connect Wallet to Trade
                        </span>
                    </Button>
                )}
                {connected && (
                    <Button 
                        disabled={formValues.buying.amount==="" && formValues.selling.amount === ""}
                        className={formValues.buying.amount==="" && formValues.selling.amount === "" ? "w-full h-auto rounded-sm text-background flex disabled:pointer-events-auto disabled:cursor-not-allowed" : 'w-full h-auto rounded-sm text-black flex'}
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
                <TransactionToast transaction="Trade" isOpen={isToast} setIsOpen={setIsToast}/>
            </CardFooter>
        </Card>
    );
}

export default OptionsCard;