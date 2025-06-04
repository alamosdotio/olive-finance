"use client";

import { useContext, useEffect, useState } from "react";
import {
  MoreHorizontal,
  Info,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StrikePriceDialog } from "./StrikePriceDialog";
import { ExpirationDialog } from "./ExpirationDialog";
import { addWeeks, format } from "date-fns";
import { WalletIcon } from "@/public/svgs/icons";
import CardTokenList from "./CardTokenList";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import type { PythPriceState } from "@/hooks/usePythPrice";
import type { MarketDataState } from "@/hooks/usePythMarketData";
import { formatPrice } from "@/utils/formatter";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import WalletModal from "./WalletModal";
import { ContractContext } from "@/contexts/contractProvider";
import { WSOL_DECIMALS } from "@/utils/const";
import { toast } from "react-toastify";
import BuyOption from "./toasts/BuyOption";

interface OptionCardProps {
  orderType: "market" | "limit";
  selectedSymbol: string;
  onSymbolChange: (symbol: string) => void;
  onIdxChange: (idx: number) => void;
  onExpiryChange: (date: Date) => void;
  onStrikePriceChange: (amount: string) => void;
  onPayAmountChange: (amount: string) => void;
  onCurrencyChange: (currency: string) => void;
  onContractTypeChange: (type: 'Call' | 'Put') => void;
  active: number;
  priceData: PythPriceState;
  marketData: MarketDataState;
  priceLoading: boolean;
  marketLoading: boolean;
}


export default function OptionCard(
  {orderType, onIdxChange, onSymbolChange, active, onPayAmountChange, selectedSymbol, priceData, priceLoading, marketData, marketLoading, onStrikePriceChange, onExpiryChange, onContractTypeChange, onCurrencyChange} 
  : 
  OptionCardProps) {
    const { connected } = useWallet();
  const wallet = useAnchorWallet();

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [optionSize, setOptionSize] = useState("0.1");
  const [selectedOption, setSelectedOption] = useState<"Call" | "Put">("Call");
  const [strikePrice, setStrikePrice] = useState("0");
  const [expiration, setExpiration] = useState<Date>(addWeeks(new Date(), 1));
  const [payAmount, setPayAmount] = useState("");
  const [payCurrency, setPayCurrency] = useState(selectedSymbol);
  const [showStrikePriceModal, setShowStrikePriceModal] = useState(false);
  const [showExpirationModal, setShowExpirationModal] = useState(false);
  const [limitPrice, setLimitPrice] = useState("");
  const [hasSetInitialStrike, setHasSetInitialStrike] = useState(false);
  const [defaultStrikePrices, setDefaultStrikePrices] = useState([
    "0",
    "0",
    "0",
  ]);

  const isPositive = marketData.change24h !== null && marketData.change24h > 0;

  console.log(defaultStrikePrices)

  useEffect(() => {
    onCurrencyChange(payCurrency)
  }, [payCurrency]);

  useEffect(() => {
    setHasSetInitialStrike(false);
    setStrikePrice("0");
    setDefaultStrikePrices(["0", "0", "0"]);
  }, [selectedSymbol]);

  useEffect(() => {
    if (!selectedSymbol) return;

    let firstStrike = defaultStrikePrices[0];
    const isValidStrike = firstStrike && parseFloat(firstStrike) > 0;

    if (priceData.price && !hasSetInitialStrike && isValidStrike) {
      setStrikePrice(firstStrike);
      onStrikePriceChange(firstStrike);
      setHasSetInitialStrike(true);
    }
  }, [selectedSymbol, priceData.price, defaultStrikePrices]);

  const defaultExpirations = [
    { label: "1 week", value: addWeeks(new Date(), 1) },
    { label: "2 weeks", value: addWeeks(new Date(), 2) },
    { label: "3 weeks", value: addWeeks(new Date(), 3) },
  ];

  const isDefaultStrike = defaultStrikePrices.includes(strikePrice);

  const isDefaultExpiration = defaultExpirations.some(
    (exp) =>
      format(exp.value, "yyyy-MM-dd") === format(expiration, "yyyy-MM-dd")
  );

  const formatStrikePrice = (price: string) => {
    const num = parseFloat(price);
    return `$${num.toLocaleString()}`;
  };

  const handleExpirationSelect = (newExpiration: Date) => {
    setExpiration(newExpiration);
    onExpiryChange(newExpiration);
  };

  const getExpirationLabel = (date: Date): string => {
    const matchingDefault = defaultExpirations.find(
      (exp) => format(exp.value, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
    return matchingDefault
      ? matchingDefault.label
      : format(date, "dd MMM yyyy");
  };
  const sc = useContext(ContractContext);

  const buyOptionHandler = async () => {
    const currentTime = Math.floor(Date.now() / 1000);
    const expTime = Math.floor(expiration.getTime() / 1000);
    const period = Math.floor((expTime - currentTime) / (3600 * 24)) + 1;
    await sc.onOpenOption(
      parseFloat(optionSize) * 10 ** WSOL_DECIMALS,
      parseFloat(strikePrice),
      period,
      expTime,
      selectedOption == "Call" ? true : false,
      true
    );
  };

  const formatChange = (change: number | null) => {
    if (change === null) return "0.00";
    return Math.abs(change).toFixed(2);
  };

  return (
    <div className="w-full flex flex-col flex-grow bg-card rounded-sm rounded-t-none p-6 space-y-4 border border-t-0">
      {/* Token Selection */}
      <div className="flex justify-between gap-3 items-start">
        <CardTokenList
          onSymbolChange={onSymbolChange}
          onPaymentTokenChange={setPayCurrency}
          onIdxChange={onIdxChange}
          active={active}
          type="chart"
        />
        {orderType === "market" ? (
          <div className="text-right h-12">
            <div className="text-2xl font-semibold tracking-tight">
              ${priceData.price ? formatPrice(priceData.price) : priceLoading}
            </div>
            <div
              className={`text-sm font-medium ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositive ? "+" : "-"}
              {marketData.change24h
                ? formatChange(marketData.change24h)
                : marketLoading}
              %
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="w-32 rounded-sm p-2 h-12 flex flex-col border items-start justify-center focus-within:border-primary">
              <span className="text-xs text-secondary-foreground">
                Limit Price:
              </span>
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

      {/* Trading Direction */}
      <div className="space-y-2">
        <p className="text-secondary-foreground text-sm">Price Sentiment:</p>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setSelectedOption("Call");
              onContractTypeChange("Call");
            }}
            className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-sm transition-all group border ${
              selectedOption === "Call"
                ? "bg-green-500/10 text-green-500 border-green-500 hover:bg-green-500/20"
                : "hover:border-green-500 hover:text-green-500 border-border/40 hover:bg-green-500/20"
            }`}
          >
            <TrendingUp
              className={`w-4 h-4 mr-2 ${
                selectedOption === "Call"
                  ? "text-green-500"
                  : "text-muted-foreground group-hover:text-green-500"
              }`}
            />
            Call
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedOption("Put");
              onContractTypeChange("Put");
            }}
            className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-sm transition-all group border ${
              selectedOption === "Put"
                ? "bg-red-500/10 text-red-500 border-red-500 hover:bg-red-500/20"
                : "hover:border-red-500 hover:text-red-500 border-border/40 hover:bg-red-500/20"
            }`}
          >
            <TrendingDown
              className={`w-4 h-4 mr-2 ${
                selectedOption === "Put"
                  ? "text-red-500"
                  : "text-muted-foreground group-hover:text-red-500"
              }`}
            />
            Put
          </Button>
        </div>
      </div>

      {/* Strike Price */}
      <div className="space-y-2">
        <label className="text-secondary-foreground text-sm">
          Strike price
        </label>
        <div className="grid grid-cols-4 gap-2">
          {isDefaultStrike ? (
            <>
              {defaultStrikePrices.map((price, idx) => (
                <Button
                  key={idx}
                  onClick={() => {
                    setStrikePrice(price);
                    onStrikePriceChange(price);
                  }}
                  className={`flex-1 py-2 px-4 rounded-sm ${
                    strikePrice === price
                      ? "bg-primary hover:bg-gradient-primary text-backgroundSecondary"
                      : "bg-backgroundSecondary text-foreground hover:bg-secondary"
                  }`}
                >
                  {selectedSymbol === "Crypto.BONK/USD"
                    ? "$" + formatPrice(parseFloat(price))
                    : formatStrikePrice(price)}
                </Button>
              ))}
              <Button
                className="py-2 px-4 rounded-sm bg-backgroundSecondary text-foreground hover:bg-secondary"
                onClick={() => setShowStrikePriceModal(true)}
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="default"
                className="col-span-3 bg-gradient-primary text-backgroundSecondary rounded-sm py-2 px-4"
              >
                {formatStrikePrice(strikePrice)}
              </Button>
              <Button
                className="py-2 px-4 rounded-sm bg-backgroundSecondary text-foreground hover:bg-secondary"
                onClick={() => setShowStrikePriceModal(true)}
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Expiration */}
      <div className="space-y-2">
        <label className="text-secondary-foreground text-sm">Expiration</label>
        <div className="grid grid-cols-4 gap-2">
          {isDefaultExpiration ? (
            <>
              {defaultExpirations.map((exp) => (
                <Button
                  key={exp.label}
                  onClick={() => {
                    setExpiration(exp.value);
                    onExpiryChange(exp.value);
                  }}
                  className={`flex-1 py-2 px-4 rounded-sm ${
                    format(expiration, "yyyy-MM-dd") ===
                    format(exp.value, "yyyy-MM-dd")
                      ? "bg-primary hover:bg-gradient-primary text-backgroundSecondary"
                      : "bg-backgroundSecondary text-foreground hover:bg-secondary"
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
              <Button className="col-span-3 bg-gradient-primary text-backgroundSecondary rounded-sm py-2 px-4">
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

      {/* Option Size */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm text-secondary-foreground font-medium">
              Pay Amount
            </label>
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
          <span className="text-sm text-secondary-foreground">
            Balance: 0 SOL
          </span>
        </div>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            <CardTokenList
              onSymbolChange={onSymbolChange}
              onPaymentTokenChange={setPayCurrency}
              onIdxChange={onIdxChange}
              active={active}
              type="paying"
            />
          </div>
          <Input
            type="number"
            value={payAmount}
            onChange={(e) => {
              setPayAmount(e.target.value);
              onPayAmountChange(e.target.value);
              setOptionSize(e.target.value);
            }}
            placeholder="0.00"
            className="pr-2 text-right h-11 text-base font-medium border-border rounded-sm placeholder:text-secondary-foreground focus:border-primary"
            step="0.1"
            min="0.1"
          />
        </div>
      </div>

      {/* Submit Button */}
      {connected ? (
        <Button
          onClick={() => buyOptionHandler()}
          className="w-full rounded-sm bg-gradient-primary text-black"
          size="lg"
        >
          Buy Option
        </Button>
      ) : (
        <Button
          onClick={() => setIsWalletModalOpen(true)}
          className="w-full rounded-sm bg-gradient-primary text-black"
          size="lg"
        >
          <WalletIcon />
          <span className="text-base font-medium">Connect Wallet</span>
        </Button>
      )}

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />

      {/* Modals */}
      <StrikePriceDialog
        open={showStrikePriceModal}
        onOpenChange={setShowStrikePriceModal}
        onSelectPrice={setStrikePrice}
        onDefaultStrikePrices={setDefaultStrikePrices}
        onStrikePriceChange={onStrikePriceChange}
        currentPrice={strikePrice}
        marketPrice={priceData.price || 0}
      />
      <ExpirationDialog
        open={showExpirationModal}
        onOpenChange={setShowExpirationModal}
        onSelectExpiration={handleExpirationSelect}
        currentExpiration={expiration}
      />
    </div>
  );
}
