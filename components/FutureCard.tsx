"use client";

import { useState } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { ChevronDown, MoreHorizontal, Wallet, TrendingUp, TrendingDown, Info } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import Image from "next/image";
import { Input } from "./ui/input";
import { ExpirationDialog } from "./ExpirationDialog";
import { addWeeks, format } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { WalletIcon } from "@/public/svgs/icons";

interface FutureCardProps {
  type: 'perps' | 'dated';
  orderType: 'market' | 'limit';
}

export default function FutureCard({ type, orderType }: FutureCardProps) {
  const [selectedTx, setSelectedTx] = useState('long');
  const [leverage, setLeverage] = useState(1);
  const [amount, setAmount] = useState("");
  const [limitPrice, setLimitPrice] = useState("");
  const [showExpirationModal, setShowExpirationModal] = useState(false);
  const [expiration, setExpiration] = useState<Date>(addWeeks(new Date(), 1));

  const leverageMarks = [1, 20, 40, 60, 80, 100];
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
    <div className="border rounded-sm rounded-t-none flex flex-col h-fit">
      <div className={`flex-1 p-6 ${type === 'dated' ? 'space-y-5' : 'space-y-5'}`}>
        {/* Asset Selection & Price */}
        <div className="flex justify-between items-start">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-12 pl-3 pr-4 border-border">
                <Image 
                  src="/images/solana.png" 
                  alt="SOL" 
                  className="rounded-full mr-3" 
                  width={28} 
                  height={28}
                />
                <div className="flex flex-col items-start mr-2">
                  <span className="text-base font-semibold">SOL-USD</span>
                  <span className="text-xs text-secondary-foreground">Solana</span>
                </div>
                <ChevronDown size={18} className="text-muted-foreground"/>
              </Button>
            </DialogTrigger>
          </Dialog>
          
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
              <Image 
                  src="/images/solana.png" 
                  alt="SOL" 
                  className="rounded-full mr-3" 
                  width={28} 
                  height={28}
                />
            </div>
            <Input
              type="number"
              value={amount}
              placeholder="0.00"
              onChange={(e) => setAmount(e.target.value)}
              className="pl-12 h-11 text-base font-medium border-border placeholder:text-secondary-foreground"
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
          <div className="w-full">
            <Slider
              value={[leverage]}
              onValueChange={([value]) => setLeverage(value)}
              min={1}
              max={100}
              step={0.1}
              className="w-full bg"
            />
            <div className="w-full flex justify-between mt-2">
              {leverageMarks.map((mark) => (
                <span key={mark} className="text-xs text-secondary-foreground">
                  {mark}×
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Connect Wallet Button */}
      <div className="p-6 pt-0">
        <Button 
          className="w-full h-10 bg-gradient-primary hover:bg-primary/90 text-black"
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