"use client";

import { useState } from "react";
import { MoreHorizontal, TrendingUp, TrendingDown, Info } from "lucide-react";
import { Button } from "./ui/button";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Image from "next/image";
import { Input } from "./ui/input";
import { ExpirationDialog } from "./ExpirationDialog";
import { addWeeks, format } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { WalletIcon } from "@/public/svgs/icons";
import CardTokenList from "./CardTokenList";

interface FutureCardProps {
  type: 'perps' | 'dated';
  orderType: 'market' | 'limit';
  onSymbolChange: (symbol: string) => void;
  onIdxChange: (idx: number) => void;
  active: number;
}

export default function FutureCard({ type, orderType, onSymbolChange, onIdxChange, active}: FutureCardProps) {
  const [selectedTx, setSelectedTx] = useState('long');
  const [leverage, setLeverage] = useState(1);
  const [amount, setAmount] = useState("");
  const [limitPrice, setLimitPrice] = useState("");
  const [showExpirationModal, setShowExpirationModal] = useState(false);
  const [expiration, setExpiration] = useState<Date>(addWeeks(new Date(), 1));

  const leverageMarks = {
    1: '1x',
    20: '20x',
    40: '40x',
    60: '60x',
    80: '80x',
    100: '100x'
  };

  const entryPrice = 107.29;
  const priceChange = 2.5;
  const isPositive = true;

  const defaultExpirations = [
    { label: '1 week', value: addWeeks(new Date(), 1) },
    { label: '2 weeks', value: addWeeks(new Date(), 2) },
    { label: '3 weeks', value: addWeeks(new Date(), 3) }
  ];

  const isDefaultExpiration = defaultExpirations.some(exp => 
    format(exp.value, 'yyyy-MM-dd') === format(expiration, 'yyyy-MM-dd')
  );

  const getExpirationLabel = (date: Date): string => {
    const matchingDefault = defaultExpirations.find(exp => 
      format(exp.value, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    return matchingDefault ? matchingDefault.label : format(date, 'dd MMM yyyy');
  };
  
  return (
    <div className="border rounded-sm rounded-t-none flex flex-col h-fit py-0.5">
      <div className={`flex-1 p-6 space-y-4`}>
        {/* Asset Selection & Price */}
        <div className="flex justify-between gap-3 items-start">
          <CardTokenList onSymbolChange={onSymbolChange} onIdxChange={onIdxChange} active={active} type="chart"/>
          {orderType === 'market' ? (
            <div className="text-right h-12">
              <div className="text-2xl font-bold tracking-tight">${entryPrice.toFixed(2)}</div>
              <div className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? '+' : '-'}{priceChange}%
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="w-32 rounded-sm p-2 h-12 flex flex-col border items-start justify-center">
                <span className="text-xs text-secondary-foreground">Limit Price:</span>
                <Input
                  type="text"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(e.target.value)}
                  className="w-32 text-left h-fit border-none"
                  placeholder="0.00"
                />
              </div>
            </div>
          )}
        </div>

        {/* Position Type Selection */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className={`h-12 rounded-lg transition-all group ${
              selectedTx === 'long' 
                ? 'bg-green-500/10 text-green-500 border-green-500 hover:bg-green-500/20' 
                : 'hover:border-green-500 hover:text-green-500 border-border/40'
            }`}
            onClick={() => setSelectedTx('long')}
          >
            <TrendingUp className={`w-4 h-4 mr-2 ${
              selectedTx === 'long' ? 'text-green-500' : 'text-muted-foreground group-hover:text-green-500'
            }`} />
            <span className="text-base font-medium">Long</span>
          </Button>
          <Button
            variant="outline"
            className={`h-12 rounded-lg transition-all group ${
              selectedTx === 'short' 
                ? 'bg-red-500/10 text-red-500 border-red-500 hover:bg-red-500/20' 
                : 'hover:border-red-500 hover:text-red-500 border-border/40'
            }`}
            onClick={() => setSelectedTx('short')}
          >
            <TrendingDown className={`w-4 h-4 mr-2 ${
              selectedTx === 'short' ? 'text-red-500' : 'text-muted-foreground group-hover:text-red-500'
            }`} />
            <span className="text-base font-medium">Short</span>
          </Button>
        </div>

        {/* Expiration Selection */}
        {type === 'dated' && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-secondary-foreground">Expiration Date</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-secondary-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Select when your futures contract will expire</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          <div className="grid grid-cols-4 gap-2">
            {isDefaultExpiration ? (
              <>
                {defaultExpirations.map((exp) => (
                  <Button
                    key={exp.label}
                    onClick={() => setExpiration(exp.value)}
                    className={`flex-1 py-2 px-4 rounded-sm ${
                      format(expiration, 'yyyy-MM-dd') === format(exp.value, 'yyyy-MM-dd')
                      ? 'bg-gradient-primary text-backgroundSecondary'
                      : 'bg-backgroundSecondary text-foreground hover:bg-secondary'
                  }`}
                  >
                    {exp.label}
                  </Button>
                ))}
                <Button
                  className="py-2 px-4 rounded-sm bg-backgroundSecondary text-foreground hover:bg-secondary"
                  onClick={() => setShowExpirationModal(true)}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="col-span-3 bg-gradient-primary text-backgroundSecondary rounded-sm py-2 px-4"
                >
                  {getExpirationLabel(expiration)}
                </Button>
                <Button
                  className="py-2 px-4 rounded-sm bg-backgroundSecondary text-foreground hover:bg-secondary"
                  onClick={() => setShowExpirationModal(true)}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
        )}
        

        {/* Amount Input */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-secondary-foreground font-medium">Pay Amount</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-secondary-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter the amount you want to invest</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="text-sm text-secondary-foreground">Balance: 0 SOL</span>
          </div>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <CardTokenList onSymbolChange={onSymbolChange} onIdxChange={onIdxChange} active={active} type="paying"/>
            </div>
            <Input
              type="number"
              value={amount}
              placeholder="0.00"
              onChange={(e) => setAmount(e.target.value)}
              className="pl-12 h-11 text-base font-medium border-border rounded-sm placeholder:text-secondary-foreground"
              step="0.1"
              min="0.1"
            />
          </div>
        </div>

        {/* Leverage Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight">{leverage}×</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-secondary-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Adjust your position leverage</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="text-sm text-secondary-foreground">
              Max position: {(parseFloat(amount) * leverage).toFixed(2)} SOL
            </div>
          </div>
          <div className="h-12 w-full px-4 pt-2 border rounded-sm">
            <Slider 
              min={1}
              max={100}
              step={0.1}
              value={leverage}
              onChange={(value) => setLeverage(Array.isArray(value) ? value[0]: value)}
              marks={leverageMarks}
              className="!transition-none"
              styles={{
                rail: {
                  height: 4,
                  backgroundColor: 'var(--secondary-foreground)',
                  borderRadius: 0
                },
                track: {
                  height: 4,
                  backgroundImage: 'linear-gradient(to right, var(--gradient-start), var(--gradient-middle), var(--gradient-end))',
                  borderRadius: 0
                },
                handle: {
                  height: 15,
                  width: 15,
                  backgroundColor: 'var(--primary-foreground)',
                  borderWidth: 2,
                  borderColor: 'var(--primary)',
                  marginTop: -5,
                  transition: 'none',
                  opacity:'1',
                },}}
              dotStyle={{
                width: 4,
                height: 14,
                top: -4,
                backgroundColor: 'var(--secondary-foreground)',
                borderRadius: 20,
                border: 0,
                marginLeft: -1,
                transition: 'none'
              }}
              activeDotStyle={{
                backgroundColor: 'var(--primary)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Connect Wallet Button */}
      <div className="p-6 pt-0">
        <Button 
          className="w-full h-10 rounded-sm bg-gradient-primary hover:bg-primary/90 text-black"
        >
          <WalletIcon />
          <span className="text-base font-medium">Connect Wallet</span>
        </Button>
      </div>

      <ExpirationDialog
        open={showExpirationModal}
        onOpenChange={setShowExpirationModal}
        onSelectExpiration={setExpiration}
        currentExpiration={expiration}
      />
    </div>
  );
}