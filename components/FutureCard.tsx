"use client";

import { useState } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { ChevronDown, Eye, Info, Calendar, MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Input } from "./ui/input";
import { ExpirationDialog } from "./ExpirationDialog";
import { addWeeks, format } from "date-fns";
import { WalletIcon } from "@/public/svgs/icons";

interface FutureCardProps {
  type: 'perps' | 'dated';
  orderType: 'market' | 'limit';
}

export default function FutureCard({ type, orderType }: FutureCardProps) {
  const [selectedTx, setSelectedTx] = useState('long');
  const [leverage, setLeverage] = useState(1);
  const [amount, setAmount] = useState("0.00");
  const [limitPrice, setLimitPrice] = useState("0.00");
  const [showExpirationModal, setShowExpirationModal] = useState(false);
  const [expiration, setExpiration] = useState<Date>(addWeeks(new Date(), 1));

  const leverageMarks = [1, 20, 40, 60, 80, 100];
  const entryPrice = 107.29;

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
    <div className="border rounded-sm rounded-t-none w-full flex-grow flex flex-col p-6 bg-background">
      <div className="flex-grow flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <Dialog>
            <DialogTrigger className="w-auto bg-inherit text-foreground flex space-x-2 items-center">
              <Image src="/images/solana.png" alt="logo" className="rounded-full" width={24} height={24}/>
              <span className="font-semibold">SOL</span>
              <ChevronDown size={16} className="text-secondary-foreground"/>
            </DialogTrigger>
          </Dialog>
          {orderType === 'market' ? (
            <div className="flex flex-col items-end">
              <span className="text-lg font-medium">${entryPrice}</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-secondary-foreground">Limit:</span>
              <Input
                type="text"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                className="bg-transparent border border-border text-right w-full px-2 py-1 h-fit font-medium focus:outline-none"
                placeholder="0.00"
              />
            </div>
          )}
        </div>

        <section className="w-full flex space-x-2">
          <Button
            variant="outline"
            className={`w-full rounded-sm ${selectedTx === 'long' ? 'text-green-500 border-green-500' : 'text-secondary-foreground border-secondary-foreground'}`}
            onClick={() => setSelectedTx('long')}
          >
            Long
          </Button>
          <Button
            variant="outline"
            className={`w-full rounded-sm ${selectedTx === 'short' ? 'text-red-500 border-red-500' : 'text-secondary-foreground border-secondary-foreground'}`}
            onClick={() => setSelectedTx('short')}
          >
            Short
          </Button>
        </section>

        {type === 'dated' && (
          <div className="space-y-2">
            <label className="text-secondary-foreground text-sm">Expiration</label>
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

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-secondary-foreground">Pay</span>
            <span className="text-sm text-secondary-foreground">Balance: 0 SOL</span>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                <div className="bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-xs text-white cursor-pointer">
                  W
                </div>
              </div>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-12 py-2 pr-2 border-border"
                step="0.1"
                min="0.1"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">{leverage}x</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-secondary-foreground">
              <span>Max position: {(parseFloat(amount) * leverage).toFixed(2)} SOL</span>
            </div>
          </div>
          <div className="relative">
            <Slider
              value={[leverage]}
              onValueChange={([value]) => setLeverage(value)}
              min={1}
              max={100}
              step={0.1}
              className="w-full"
            />
            <div className="absolute w-full flex justify-between mt-2">
              {leverageMarks.map((mark) => (
                <span key={mark} className="text-xs text-secondary-foreground">
                  {mark === 1 ? '1x' : `${mark}x`}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button className="w-full bg-gradient-primary text-black font-medium">
            <WalletIcon />
            <span className="text-sm font-semibold">Connect Wallet</span>
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