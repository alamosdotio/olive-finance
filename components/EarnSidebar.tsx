"use client";
import { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

import usdc from "@/public/images/usdc.png";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  connection,
  USDC_DECIMALS,
  USDC_MINT,
  WSOL_DECIMALS,
  WSOL_MINT,
} from "@/utils/const";
import { ContractContext } from "@/contexts/contractProvider";
import {
  AnchorProvider,
  getProvider,
  Program,
  Provider,
} from "@coral-xyz/anchor";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { OptionContract } from "@/lib/idl/option_contract";
import * as idl from "../lib/idl/option_contract.json";
import { getPythPrice, usePythPrice } from "@/hooks/usePythPrice";
import { ChartStrategy } from "./ChartStrategy";
import { PublicKey } from "@solana/web3.js";
import CardTokenList from "./CardTokenList";
import PoolDropdown from "./PoolDropDown";



interface EarnSidebarProps {
  name: string;
  symbol: string;
  logo: string;
  apy: number;
  apr: number;
}

export default function EarnSidebar({
  name,
  symbol,
  logo,
  apy,
  apr,
}: EarnSidebarProps) {
  const poolData = (
    pooldata: Map<string, any>,
    ratioData: Map<string, any>,
    price: number
  ) => {
    const solCustodyData = pooldata.get(WSOL_MINT.toBase58());
    const usdcCustodyData = pooldata.get(USDC_MINT.toBase58());
    const solPoolsize =
      solCustodyData.tokenOwned.toNumber() / 10 ** WSOL_DECIMALS;
    const usdcPoolsize =
      usdcCustodyData.tokenOwned.toNumber() / 10 ** USDC_DECIMALS;
    const total = solPoolsize * price + usdcPoolsize;
    return [
      {
        img: logo,
        symbol: symbol,
        name: name,
        poolSize: `${solPoolsize} ${symbol}`,
        current_weightage: `${Math.round(
          ((solPoolsize * price) / total) * 100
        )}%`,
        target_weightage: `${ratioData
          .get(WSOL_MINT.toBase58())
          .target.toNumber()}%`,
        utilization: `${
          Math.round(
            (solCustodyData.tokenLocked.toNumber() /
              solCustodyData.tokenOwned.toNumber()) *
              100
          ) ?? 0
        }%`,
      },
      {
        img: usdc,
        symbol: "USDC",
        name: "USD Coin",
        poolSize: `${usdcPoolsize} USDC`,
        current_weightage: `${
          100 - Math.round(((solPoolsize * price) / total) * 100)
        }%`,
        target_weightage: `${ratioData
          .get(USDC_MINT.toBase58())
          .target.toNumber()}%`,
        utilization: `${
          Math.round(
            usdcCustodyData.tokenLocked.toNumber() /
              usdcCustodyData.tokenOwned.toNumber()
          ) ?? 0
        }%`,
      },
    ];
  };
  const sc = useContext(ContractContext);
  const [activeTab, setActiveTab] = useState<string>("mint");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<number>(0);
  const [isApr, setIsApr] = useState<boolean>(false);
  const [poolDatas, setPoolDatas] = useState<any>();
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const { connected, publicKey } = useWallet();
  const wallet = useAnchorWallet();
  const [program, setProgram] = useState<Program<OptionContract>>();
  const [loading, setLoading] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleClickToken = (value: number) => {
    if (selectedToken !== value) {
      setSelectedToken(value);
    }
    setIsOpen(false);
  };
  useEffect(() => {
    (async () => {
      let provider: Provider;
      if (wallet && connected) {
        try {
          provider = getProvider();
        } catch {
          provider = new AnchorProvider(connection, wallet, {});
        }

        const program = new Program<OptionContract>(
          idl as OptionContract,
          provider
        );
        setProgram(program);
        const price = await getPythPrice("Crypto.SOL/USD", Date.now());
        const [data, ratios] = await sc?.getCustodies(program);
        setPoolDatas(poolData(data, ratios, price));
      }
    })();
  }, [connected]);

  const onSubmit = () => {
    if (connected) {
      if (activeTab == "mint") {
        if (selectedToken == 0) {
          sc.onAddLiquidity(
            tokenAmount * 10 ** WSOL_DECIMALS,
            program,
            WSOL_MINT
          );
        } else {
          sc.onAddLiquidity(
            tokenAmount * 10 ** USDC_DECIMALS,
            program,
            USDC_MINT
          );
        }
      } else if (activeTab == "redeem") {
        if (selectedToken == 0) {
          sc.onRemoveLiquidity(
            tokenAmount * 10 ** WSOL_DECIMALS,
            program,
            WSOL_MINT
          );
        } else {
          sc.onRemoveLiquidity(
            tokenAmount * 10 ** USDC_DECIMALS,
            program,
            USDC_MINT
          );
        }
      }
    }
  };

  const handleTokenAmount = (value: string) => {
    setTokenAmount(parseFloat(value));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  setTimeout(() => {
      setLoading(!loading);
  }, 2000);


  return (
    <SheetContent className="space-y-6 w-full md:w-[720px] rounded-sm bg-accent overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-2xl flex justify-between">
          {name} Liquidity Pool
        </SheetTitle>
      </SheetHeader>
      <div className="space-y-5  flex flex-col w-full">
        <div className="grid grid-cols-1 sm:grid-cols-5 items-center sm:space-x-3 space-y-3 sm:space-y-0">
          <div className="border rounded-sm p-3 sm:col-span-2 h-[167px]">
            <div className="flex flex-col justify-between">
              <div className="flex space-x-1 text-sm font-medium ">
                <div className="flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <path
                      d="M7.99984 15.1665C11.6732 15.1665 14.6665 12.1732 14.6665 8.49984C14.6665 4.8265 11.6732 1.83317 7.99984 1.83317C4.3265 1.83317 1.33317 4.8265 1.33317 8.49984C1.33317 12.1732 4.3265 15.1665 7.99984 15.1665ZM8.49984 11.1665C8.49984 11.4398 8.27317 11.6665 7.99984 11.6665C7.7265 11.6665 7.49984 11.4398 7.49984 11.1665V7.83317C7.49984 7.55984 7.7265 7.33317 7.99984 7.33317C8.27317 7.33317 8.49984 7.55984 8.49984 7.83317V11.1665ZM7.3865 5.57984C7.41984 5.49317 7.4665 5.4265 7.5265 5.35984C7.59317 5.29984 7.6665 5.25317 7.7465 5.21984C7.8265 5.1865 7.91317 5.1665 7.99984 5.1665C8.0865 5.1665 8.17317 5.1865 8.25317 5.21984C8.33317 5.25317 8.4065 5.29984 8.47317 5.35984C8.53317 5.4265 8.57984 5.49317 8.61317 5.57984C8.6465 5.65984 8.6665 5.7465 8.6665 5.83317C8.6665 5.91984 8.6465 6.0065 8.61317 6.0865C8.57984 6.1665 8.53317 6.23984 8.47317 6.3065C8.4065 6.3665 8.33317 6.41317 8.25317 6.4465C8.09317 6.51317 7.9065 6.51317 7.7465 6.4465C7.6665 6.41317 7.59317 6.3665 7.5265 6.3065C7.4665 6.23984 7.41984 6.1665 7.3865 6.0865C7.35317 6.0065 7.33317 5.91984 7.33317 5.83317C7.33317 5.7465 7.35317 5.65984 7.3865 5.57984Z"
                      fill="#808693"
                    />
                  </svg>
                  <span className="text-secondary-foreground">
                    {isApr ? "APR" : "APY"}:
                  </span>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger
                      asChild
                      onClick={() => setIsApr(!isApr)}
                      className="cursor-pointer"
                    >
                      <span className="text-foreground text-right">
                        {isApr ? `${apr}` : `${apy}`}%
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="">
                      <span className="text-background text-right">
                        Click to toggle between APR / APY
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex gap-2 text-xs font-normal text-secondary-foreground items-center">
                <span>Last updated at:</span>
                <span>11.12.2024</span>
              </div>
            </div>
            <div className="w-full h-[1px] border-b my-2" />
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 text-base font-medium">
                <div className="rounded-full bg-inherit w-6 h-6 flex items-center justify-center ring-2 ring-border">
                  <Image
                    src={logo}
                    alt={name}
                    width={24}
                    height={24}
                    className="h-6 w-6 rounded-full"
                  />
                </div>
                <span className="whitespace-nowrap">{name} Pool</span>
              </div>
              <div className="w-full flex">
                <p className="text-xs tracking-tight text-justify">
                  The {name} Liquidity Pool ({symbol}-LP) is a liquidity pool
                  that sells covered calls and cash secured puts.
                </p>
              </div>
            </div>
          </div>
          <div className="sm:col-span-3 w-full h-[167px]">
            <ChartStrategy />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-normal text-secondary-foreground">
            Total Value Locked
          </span>
          <div className="flex flex-col gap-1">
            <span className="text-foreground text-2xl font-medium">
              {/* TVL goes here */}
            </span>
            <div className="flex gap-2 items-center text-xs text-foreground font-normal">
              <span>AUM limit: N/A</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M7.99984 14.6665C11.6732 14.6665 14.6665 11.6732 14.6665 7.99984C14.6665 4.3265 11.6732 1.33317 7.99984 1.33317C4.3265 1.33317 1.33317 4.3265 1.33317 7.99984C1.33317 11.6732 4.3265 14.6665 7.99984 14.6665ZM8.49984 10.6665C8.49984 10.9398 8.27317 11.1665 7.99984 11.1665C7.7265 11.1665 7.49984 10.9398 7.49984 10.6665V7.33317C7.49984 7.05984 7.7265 6.83317 7.99984 6.83317C8.27317 6.83317 8.49984 7.05984 8.49984 7.33317V10.6665ZM7.3865 5.07984C7.41984 4.99317 7.4665 4.9265 7.5265 4.85984C7.59317 4.79984 7.6665 4.75317 7.7465 4.71984C7.8265 4.6865 7.91317 4.6665 7.99984 4.6665C8.0865 4.6665 8.17317 4.6865 8.25317 4.71984C8.33317 4.75317 8.4065 4.79984 8.47317 4.85984C8.53317 4.9265 8.57984 4.99317 8.61317 5.07984C8.6465 5.15984 8.6665 5.2465 8.6665 5.33317C8.6665 5.41984 8.6465 5.5065 8.61317 5.5865C8.57984 5.6665 8.53317 5.73984 8.47317 5.8065C8.4065 5.8665 8.33317 5.91317 8.25317 5.9465C8.09317 6.01317 7.9065 6.01317 7.7465 5.9465C7.6665 5.91317 7.59317 5.8665 7.5265 5.8065C7.4665 5.73984 7.41984 5.6665 7.3865 5.5865C7.35317 5.5065 7.33317 5.41984 7.33317 5.33317C7.33317 5.2465 7.35317 5.15984 7.3865 5.07984Z"
                  fill="#808693"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <span className="text-base font-medium">Liquidity Allocation</span>
          <div className="p-3 pt-0 border rounded-sm w-full space-y-3">
            <Table>
              <TableHeader>
                <TableRow className="w-full">
                  <TableHead className="px-3 py-4 text-secondary-foreground font-medium">
                    Token
                  </TableHead>
                  <TableHead className="px-3 py-4 text-secondary-foreground font-medium whitespace-nowrap">
                    Pool Size
                  </TableHead>
                  <TableHead className="px-3 py-4 text-secondary-foreground font-medium whitespace-nowrap">
                    Current Weightage
                  </TableHead>
                  <TableHead className="px-3 py-4 text-secondary-foreground font-medium whitespace-nowrap">
                    Target Weightage
                  </TableHead>
                  <TableHead className="px-3 py-4 text-secondary-foreground font-medium">
                    Utilization
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {poolDatas &&
                  poolDatas.map((row: any) => (
                    <TableRow key={row.symbol} className="border-none">
                      <TableCell className="flex gap-2 items-center">
                        <div className="rounded-full bg-inherit w-6 h-6 flex items-center justify-center ring-2 ring-border">
                          <Image
                            src={row.img}
                            alt={name}
                            width={24}
                            height={24}
                            className="h-6 w-6 rounded-full"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-foreground font-normal">
                            {row.symbol}
                          </span>
                          <span className="text-xs text-secondary-foreground font-normal whitespace-nowrap">
                            {row.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-foreground text-xs font-normal">
                            {row.poolSize}
                          </span>
                          <span className="text-secondary-foreground text-xs font-normal">
                            Rank
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-foreground text-center">
                        {row.current_weightage}
                      </TableCell>
                      <TableCell className="text-xs text-foreground text-center">
                        {row.target_weightage}
                      </TableCell>
                      <TableCell className="text-xs text-foreground text-center">
                        {row.utilization}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <div className="border-t pt-3">
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <span className="text-xs text-secondary-foreground font-normal">
                    {symbol}LP Price
                  </span>
                  <span className="text-xs text-foreground font-medium">
                    $4,228
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-secondary-foreground font-normal">
                    Total Supply
                  </span>
                  <span className="text-xs text-foreground font-medium">
                    375 157 373,224 {symbol}LP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full space-y-3">
          <Tabs value={activeTab}>
            <TabsList className="w-full h-auto p-2 flex justify-between rounded-sm bg-accent-foreground">
              <TabsTrigger
                value="mint"
                className="rounded-sm px-5 py-[6px] border border-transparent w-full data-[state=active]:border-primary hover:text-primary"
                onClick={() => {
                  setActiveTab("mint")
                  handleTokenAmount('0')
                }}
              >
                Buy
              </TabsTrigger>
              <TabsTrigger
                value="redeem"
                className="rounded-sm border px-5 py-[6px] border-transparent w-full data-[state=active]:border-primary hover:text-primary"
                onClick={() => {
                  setActiveTab("redeem")
                  handleTokenAmount('0')
                }}
              >
                Sell
              </TabsTrigger>
            </TabsList>
          </Tabs>
            <div className="flex justify-between items-start gap-2">
              <div className="w-full flex flex-col space-y-2">
                {activeTab === 'mint' ? (
                  <div className="flex flex-col space-y-1 w-full">
                    <span className="text-sm text-secondary-foreground font-medium">Pay</span>
                    <div className="relative w-full">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                      <PoolDropdown
                          isOpen={isOpen} 
                          handleClickToken={handleClickToken}
                          handleOpenChange={handleOpenChange}
                          poolDatas={poolDatas}
                          selectedToken={selectedToken}
                          logo={logo}
                        />
                      </div>
                      <Input
                        type="number"
                        onChange={(e) => handleTokenAmount(e.target.value)}
                        placeholder={'0.00'}
                        className="pl-12 py-2 rounded-sm h-auto w-full bg-secondary border-none shadow-none"
                        step="0.1"
                        min="0.1"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <div className="flex flex-col space-y-1 w-full">
                      <span className="text-sm text-secondary-foreground font-medium">Pay</span>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                          {symbol}-LP
                        </div>
                        <Input
                          type="number"
                          placeholder="0.00"
                          onChange={(e) => handleTokenAmount(e.target.value)}
                          className="text-right pr-3 py-2 rounded-sm h-auto w-full bg-secondary border-none shadow-none"
                          step="0.1"
                          min="0.1"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1 w-full">
                      <span className="text-sm text-secondary-foreground font-medium">Sell Into</span>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                          <PoolDropdown
                            isOpen={isOpen} 
                            handleClickToken={handleClickToken}
                            handleOpenChange={handleOpenChange}
                            poolDatas={poolDatas}
                            selectedToken={selectedToken}
                            logo={logo}
                          />
                        </div>
                        <Input
                          type="number"
                          placeholder="0.00"
                          className="text-right pr-3 py-2 rounded-sm h-auto w-full bg-secondary border-none shadow-none"
                          step="0.1"
                          min="0.1"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {tokenAmount > 0 && (  
                  <div className="w-full flex flex-col border p-5 rounded-sm">
                    <section className="flex flex-col space-y-1 text-sm text-secondary-foreground font-medium">
                      <div>
                        <span className="text-foreground">
                          {activeTab === 'mint' ? `${tokenAmount > 0 ? tokenAmount:0} ${symbol} ` 
                            : `${tokenAmount > 0 ? tokenAmount:0} ${symbol}-LP `}  
                        </span>
                        <span>
                          will be {activeTab === 'mint' ? 'bought into' : 'sold from'} the pool at <span className="text-foreground">0.1%</span>  fees. <br />
                          You&apos;ll Receive XXX <span className="text-foreground">{activeTab === 'mint' ? `${symbol}-LP` : `${symbol} `} </span>
                        </span>
                          
                      </div>
                      <div className="text-xs flex gap-2">
                        <svg
                            className={`${loading  ? 'animate-spin': ''} h-4 w-4 text-primary`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8z"
                            ></path>
                          </svg>
                        {activeTab === 'mint' ? (
                          <span>{tokenAmount > 0 ? tokenAmount:0} {symbol} = XXX {symbol}-LP</span>
                        ) : (
                          <span>{tokenAmount > 0 ? tokenAmount:0} {symbol}-LP = XXX {symbol}</span>
                        )}
                        
                      </div>  
                    </section>
                  </div>
                )}
              </div>
              <Button
                className="h-fit rounded-sm px-4 py-[10px] mt-6 w-2/6 text-black bg-primary hover:bg-gradient-primary"
                onClick={onSubmit}
              >
                {activeTab === "mint" ? "Buy" : "Sell"}
              </Button>
            </div>
            
        </div>
      </div>
    </SheetContent>
  );
}
