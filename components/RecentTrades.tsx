"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";

import { clusterUrl, Option_Program_Address } from "@/utils/const";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { AvatarIcon, CallIconDark, PutIconDark } from "@/public/svgs/icons";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

import { OptionContract } from "@/lib/idl/option_contract";
import * as idl from "../lib/idl/option_contract.json";
import { AnchorProvider, getProvider, Program } from "@coral-xyz/anchor";
import { connection } from "@/utils/const";
import { Keypair, PublicKey } from "@solana/web3.js";
import { Wallet } from "@coral-xyz/anchor/dist/cjs/provider";

import { pools } from "@/lib/data/pools";
import { formatAmount } from "@/utils/formatter";
import { toast, ToastContainer } from "react-toastify";

interface OptionDetail {
  amount: string;
  boughtBack: string;
  claimed: string;
  custody: string;
  exercised: string;
  expiredDate: string;
  index: string;
  lockedAsset: string;
  period: string;
  pool: string;
  premium: string;
  premiumAsset: string;
  profit: string;
  strikePrice: string;
  valid: string;
  tx: string;
  type: string;
  purchaseDate: string;
}

interface ProgramAccount {
  pubkey: PublicKey;
  account: {
    data: string;
  };
}

export default function RecentTrades() {
  const [optionDetails, setOptionDetails] = useState<OptionDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [program, setProgram] = useState<Program<OptionContract>>();

  const initializeProvider = useCallback(() => {
    const dummyKeypair = Keypair.generate();
    const dummyWallet: Wallet = {
      publicKey: dummyKeypair.publicKey,
      signTransaction: async (tx: any) => tx,
      signAllTransactions: async (txs: any) => txs,
    };

    try {
      return getProvider();
    } catch {
      return new AnchorProvider(connection, dummyWallet, {});
    }
  }, []);

  const processOptionAccount = useCallback(
    async (account: ProgramAccount, program: Program<OptionContract>) => {
      try {
        const optionDetailAccount = await program.account.optionDetail.fetch(
          account.pubkey
        );
        const poolInfo = pools.find(
          (pool) => pool.programId === optionDetailAccount.pool.toString()
        );

        return {
          amount: formatAmount(
            optionDetailAccount.amount,
            poolInfo?.decimals || 0
          ),
          boughtBack: formatAmount(
            optionDetailAccount.boughtBack,
            poolInfo?.decimals || 0
          ),
          claimed: formatAmount(
            optionDetailAccount.claimed,
            poolInfo?.decimals || 0
          ),
          custody: optionDetailAccount.custody.toString(),
          exercised: optionDetailAccount.exercised.toString(),
          expiredDate: new Date(
            parseInt(optionDetailAccount.expiredDate) * 1000
          ).toLocaleString(),
          index: optionDetailAccount.index.toString(),
          lockedAsset: optionDetailAccount.lockedAsset.toString(),
          period: optionDetailAccount.period.toString(),
          pool: poolInfo?.name || "",
          premium: formatAmount(
            optionDetailAccount.premium,
            poolInfo?.decimals || 0
          ),
          premiumAsset: optionDetailAccount.premiumAsset.toString(),
          profit: formatAmount(
            optionDetailAccount.profit,
            poolInfo?.decimals || 0
          ),
          strikePrice: optionDetailAccount.strikePrice.toString(),
          valid: optionDetailAccount.valid.toString(),
          tx:
            optionDetailAccount.exercised.toString() !== "0"
              ? "Exercised"
              : optionDetailAccount.boughtBack.toString() !== "0"
              ? "Bought"
              : "Sold",
          type:
            optionDetailAccount.lockedAsset.toString() ===
            optionDetailAccount.premiumAsset.toString()
              ? "Call"
              : "Put",
          purchaseDate: new Date(
            parseInt(optionDetailAccount.expiredDate) * 1000 -
              parseInt(optionDetailAccount.period) * 86400 * 1000
          ).toLocaleString(),
        };
      } catch (error) {
        console.error("Error processing option account:", error);
        return null;
      }
    },
    []
  );

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        setIsLoading(true);
        toast.info("Fetching trades...", {
          position: "bottom-right",
        });

        const { data } = await axios.post(clusterUrl, {
          jsonrpc: "2.0",
          id: 1,
          method: "getProgramAccounts",
          params: [
            Option_Program_Address,
            {
              encoding: "base64",
              filters: [{ dataSize: 218 }],
            },
          ],
        });

        const provider = initializeProvider();
        const program = new Program<OptionContract>(
          idl as OptionContract,
          provider
        );
        setProgram(program);

        // Process accounts in batches to avoid overwhelming the system
        const BATCH_SIZE = 5;
        const optionAccounts = data.result;
        const _optionDetails: OptionDetail[] = [];

        for (let i = 0; i < optionAccounts.length; i += BATCH_SIZE) {
          const batch = optionAccounts.slice(i, i + BATCH_SIZE);
          const batchResults = await Promise.all(
            batch.map((account: ProgramAccount) =>
              processOptionAccount(account, program)
            )
          );
          _optionDetails.push(
            ...batchResults.filter(
              (detail): detail is OptionDetail => detail !== null
            )
          );
        }

        setOptionDetails(_optionDetails);
      } catch (error) {
        console.error("Error fetching trades:", error);
        toast.error("Failed to fetch trades. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrades();
  }, [initializeProvider, processOptionAccount]);

  const sortedOptionDetails = useMemo(() => {
    return [...optionDetails].sort((a, b) => {
      const dateA = new Date(a.purchaseDate);
      const dateB = new Date(b.purchaseDate);
      return dateB.getTime() - dateA.getTime(); // Sort in ascending order (oldest first)
    });
  }, [optionDetails]);

  const memoizedTableContent = useMemo(
    () => (
      <TableBody className="w-full">
        {sortedOptionDetails.map((row, idx) => (
          <TableRow key={idx} className="border-none w-full">
            <TableCell className="text-sm text-foreground font-normal text-justify pl-5 pr-3 py-3">
              <div className="flex gap-[10px] items-center">
                <AvatarIcon />
                ---
              </div>
            </TableCell>
            <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px]">
              {row.tx === "Bought" ? (
                <span className="px-2 py-[6px] bg-[#A3BFFB]/20 text-[#A3BFFB] rounded-[8px]">
                  {row.tx}
                </span>
              ) : row.tx === "Sold" ? (
                <span className="px-2 py-[6px] bg-[#FFD08E]/20 text-[#FFD08E] rounded-[8px]">
                  {row.tx}
                </span>
              ) : (
                <span className="px-2 py-[6px] bg-[#A5F3C0]/20 text-[#A5F3C0] rounded-[8px]">
                  {row.tx}
                </span>
              )}
            </TableCell>
            <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px]">
              {row.amount}
            </TableCell>
            <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px]">
              {row.claimed !== "0" ? row.claimed : row.profit}
            </TableCell>
            <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px]">
              {row.premium} USDC
            </TableCell>
            <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px]">
              {row.pool}
            </TableCell>
            <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px]">
              <div className="flex gap-2 items-center">
                {row.type === "Call" ? (
                  <CallIconDark width="14" height="14" />
                ) : (
                  <PutIconDark width="14" height="14" />
                )}
                {row.type}
              </div>
            </TableCell>
            <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px]">
              {row.strikePrice}
            </TableCell>
            <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px]">
              {row.expiredDate}
            </TableCell>
            <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px]">
              $ {row.amount}
            </TableCell>
            <TableCell className="text-sm text-foreground font-normal text-justify pl-3 pr-5 py-[14px]">
              {row.purchaseDate}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    ),
    [sortedOptionDetails]
  );

  return (
    <div className="border-none border-t-0 w-full h-full rounded-b-sm flex flex-col justify-between">
      <ScrollArea className="h-full rounded-b-sm w-full">
        <Table className="whitespace-nowrap overflow-hidden">
          <TableHeader className="w-full">
            <TableRow className="p-0">
              <TableHead className="text-xs text-secondary-foreground font-medium text-justify pl-5 pr-3 py-4">
                Profile
              </TableHead>
              <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4">
                Bought/Sold/Exercised
              </TableHead>
              <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4">
                Quantity
              </TableHead>
              <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4">
                Paid/Received
              </TableHead>
              <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4">
                Fees
              </TableHead>
              <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4">
                Pool
              </TableHead>
              <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4">
                Call/Put
              </TableHead>
              <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4">
                Strike Price
              </TableHead>
              <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4">
                Expiry Date
              </TableHead>
              <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4">
                Trade Size
              </TableHead>
              <TableHead className="text-xs text-secondary-foreground font-medium text-justify pr-5 pl-3 py-4">
                Purchase Date
              </TableHead>
            </TableRow>
          </TableHeader>
          {memoizedTableContent}
        </Table>
        <ToastContainer
          theme="dark"
        />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
