"use client";

import { useContext, useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, setDefaultOptions } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import {
  AnchorProvider,
  getProvider,
  Program,
  Provider,
} from "@coral-xyz/anchor";
import { connection, WSOL_MINT } from "@/utils/const";
import { OptionContract } from "@/lib/idl/option_contract";
import * as idl from "../lib/idl/option_contract.json";
import { ContractContext } from "@/contexts/contractProvider";
import { PublicKey } from "@solana/web3.js";

interface Option {
  id: number;
  type: "Call" | "Put";
  strikePrice: number;
  expiration: Date;
  size: number;
  purchaseDate: Date;
  status: "Active" | "Expired" | "Exercised" | string;
}

export default function SellCard() {
  const { connected } = useWallet();
  const wallet = useAnchorWallet();
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const sc = useContext(ContractContext);
  // Simulated options data
  const [options, setOptions] = useState<Option[]>([]);

  const formatPrice = (price: string) => {
    const num = parseFloat(price);
    return `$${num.toLocaleString()}`;
  };

  const getStatusColor = (status: Option["status"]) => {
    switch (status) {
      case "Active":
        return "text-emerald-500";
      case "Expired":
        return "text-red-500";
      case "Exercised":
        return "text-blue-500";
      default:
        return "text-red-400";
    }
  };

  const onSellOptionHandler = async () => {
    console.log(1)
    if (selectedOption) {
    console.log(2, selectedOption)

      await sc.onCloseOption(selectedOption.id);
    }
  }

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
        const [pool] = PublicKey.findProgramAddressSync(
          [Buffer.from("pool"), Buffer.from("SOL-USDC")],
          program.programId
        );
        const [custody] = PublicKey.findProgramAddressSync(
          [Buffer.from("custody"), pool.toBuffer(), WSOL_MINT.toBuffer()],
          program.programId
        );
        const [userPDA] = PublicKey.findProgramAddressSync(
          [Buffer.from("user"), wallet.publicKey.toBuffer()],
          program.programId
        );
        const userData = await program.account.User
          .fetch(userPDA)
          .catch((e) => null);
        if (!userData) return [];
        const optionDatas: Option[] = [];
        for (let i = 1; i <= userData.option_index.toNumber(); i++) {
          const optionDetailAccount = sc.getOptionDetailAccount(
            i,
            pool,
            custody
          );
          const optionData = await program.account.OptionDetail.fetch(
            optionDetailAccount
          );
          const lockedAssetData = await program.account.Custody.fetch(optionData.locked_asset);
          console.log("premium", i, optionData.premium.toNumber())
          optionDatas.push({
            id: optionData.index.toNumber(),
            type: optionData.locked_asset.equals(custody) ? "Call" : "Put",
            strikePrice: optionData.strike_price,
            size: optionData.amount.toNumber() / (10 ** lockedAssetData.decimals),
            status: optionData.valid ? "Active" : "Invalid",
            expiration: new Date(optionData.expired_date.toNumber() * 1000),
            purchaseDate: new Date(
              (optionData.expired_date.toNumber() -
                optionData.period * 3600 * 24) *
                1000
            ),
          });
        }
        setOptions(optionDatas);
      }
    })();
  }, [connected]);

  return selectedOption ? (
    <div className="w-full flex flex-col flex-grow bg-card rounded-sm rounded-t-none p-6 space-y-5 border border-t-0">
      {/* Token Selection */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-foreground">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedOption(null)}
            className="mr-2 -ml-2 px-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center text-white">
            W
          </div>
          <span className="font-semibold">WETH</span>
          <span className="text-sm text-secondary-foreground">
            {format(selectedOption.purchaseDate, "dd MMM yyyy")}
          </span>
        </div>
      </div>

      {/* Trading Direction and Status */}
      <div className="flex items-center space-x-3">
        <div
          className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md border ${
            selectedOption.type === "Call"
              ? "border-emerald-500 bg-emerald-500/10 text-emerald-500"
              : "border-red-500 bg-red-500/10 text-red-500"
          }`}
        >
          {selectedOption.type === "Call" ? (
            <>
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Call
            </>
          ) : (
            <>
              <ArrowDownRight className="w-4 h-4 mr-2" />
              Put
            </>
          )}
        </div>
        <div
          className={`px-4 py-2 rounded-md bg-secondary ${getStatusColor(
            selectedOption.status
          )}`}
        >
          {selectedOption.status}
        </div>
      </div>

      {/* Strike Price */}
      <div className="space-y-2">
        <label className="text-secondary-foreground text-sm">
          Strike price
        </label>
        <div className="grid grid-cols-1 gap-2">
          <div className="w-full flex items-center px-4 py-2 rounded-sm bg-backgroundSecondary text-primary">
            {formatPrice(`${selectedOption.strikePrice}`)}
          </div>
        </div>
      </div>

      {/* Expiration */}
      <div className="space-y-2">
        <label className="text-secondary-foreground text-sm">Expiration</label>
        <div className="grid grid-cols-1 gap-2">
          <div className="w-full flex items-center px-4 py-2 rounded-sm bg-backgroundSecondary text-primary">
            {format(selectedOption.expiration, "dd MMM yyyy")}
          </div>
        </div>
      </div>

      {/* Option Size */}
      <div className="space-y-2">
        <label className="text-secondary-foreground text-sm">Option Size</label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            <div className="bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-xs text-white">
              W
            </div>
          </div>
          <Input
            type="text"
            value={selectedOption.size}
            readOnly
            className="pl-12 py-2 pr-2 border-border text-foreground"
          />
        </div>
      </div>

      {/* Action Buttons */}
      {selectedOption.status === "Active" && (
        <div className="pt-4">
          <Button className="w-full" size="lg" onClick={onSellOptionHandler}>
            Sell Option
          </Button>
        </div>
      )}
    </div>
  ) : (
    <div className="w-full flex flex-col flex-grow bg-card rounded-sm rounded-t-none p-6 space-y-6 border border-t-0">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your Options</h2>
      </div>

      {options.length > 0 ? (
        <ScrollArea className="h-[395px] w-full">
          <div className="space-y-2">
            {options.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                className="w-full h-auto p-4 border-border rounded-sm hover:text-secondary-foreground"
                onClick={() => setSelectedOption(option)}
              >
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {option.type === "Call" ? (
                      <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span>{option.type}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>{format(option.expiration, "MMM dd")}</span>
                    <span
                      className={`font-medium ${getStatusColor(option.status)}`}
                    >
                      {option.status}
                    </span>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="text-center py-8 text-secondary-foreground">
          No options found. Start trading to see your options here.
        </div>
      )}
    </div>
  );
}
