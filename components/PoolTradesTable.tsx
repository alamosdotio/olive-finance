"use client";

import { dummyPoolTrades } from "@/lib/data/dummyData";
import { ScrollArea } from "./ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { AvatarIcon } from "@/public/svgs/icons";
import { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import {
  HELIUS_API_KEY,
  Option_Program_Address,
  HELIUS_ENDPOINT,
  clusterUrl,
} from "@/utils/const";
import { createSolanaRpc, type Signature } from "@solana/kit";
import { BorshInstructionCoder } from "@coral-xyz/anchor";
import { OptionContract } from "@/lib/idl/option_contract";
import * as idl from "../lib/idl/option_contract.json";
import { ToastContainer, toast } from "react-toastify";
import { PublicKey } from "@solana/web3.js";

interface PoolTrade {
  profile: string;
  type: string;
  quantity: string;
  paidReceived: string;
  fees: string;
  pool: string;
  dateTime: string;
  token0: string;
  amount0: string;
  token1: string;
  amount1: string;
}

interface Transaction {
  feePayer: string;
  instructions: Array<{
    programId: string;
    data: string;
  }>;
  tokenTransfers: Array<{
    mint: string;
    tokenAmount: string;
  }>;
  signature: string;
  timestamp: string;
}

export default function PoolTradesTable() {
  const [poolTrades, setPoolTrades] = useState<PoolTrade[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const rpc = useMemo(() => createSolanaRpc(clusterUrl), []);

  const fetchLogMessages = useCallback(
    async (signature: string) => {
      try {
        const transaction = await rpc
          .getTransaction(signature as Signature)
          .send();
        return transaction?.meta?.logMessages;
      } catch (error) {
        console.error("Error fetching log messages:", error);
        return null;
      }
    },
    [rpc]
  );

  const processTransaction = useCallback(
    async (tx: Transaction, coder: BorshInstructionCoder) => {
      const _poolTrades: PoolTrade[] = [];

      for (const instruction of tx.instructions) {
        if (
          instruction.programId !==
          new PublicKey(Option_Program_Address).toString()
        )
          continue;

        const ix = coder.decode(instruction.data, "base58");
        if (!ix) continue;

        const _poolTrade: PoolTrade = {
          profile: tx.feePayer,
          type: "",
          quantity: "",
          paidReceived: "",
          fees: "",
          pool: "",
          dateTime: new Date(parseInt(tx.timestamp) * 1000).toLocaleString(),
          token0: "",
          amount0: "",
          token1: "",
          amount1: "",
        };

        if (ix.name === "remove_liquidity" || ix.name === "add_liquidity") {
          const amount =
            ix.name === "remove_liquidity"
              ? (ix.data as any).params.remove_amount
              : (ix.data as any).params.amount_in;
          const pool = (ix.data as any).params.pool_name;

          _poolTrade.type =
            ix.name === "remove_liquidity" ? "Withdrawal" : "Deposit";
          _poolTrade.quantity = amount.toString();
          _poolTrade.pool = pool;

          // Process token transfers
          tx.tokenTransfers.forEach((transfer: any, index: number) => {
            if (index === 0) {
              _poolTrade.token0 = transfer.mint;
              _poolTrade.amount0 = transfer.tokenAmount;
            } else {
              _poolTrade.token1 = transfer.mint;
              _poolTrade.amount1 = transfer.tokenAmount;
            }
          });

          const txData = await fetchLogMessages(tx.signature);
          if (txData) {
            const feeMessage = txData.find((message: string) =>
              message.includes("Program log: fee: ")
            );
            if (feeMessage) {
              _poolTrade.fees = feeMessage.split("Program log: fee: ")[1];
            }
          }

          _poolTrades.push(_poolTrade);
        }
      }

      return _poolTrades;
    },
    [fetchLogMessages]
  );

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        setIsLoading(true);
        toast.info("Fetching trades...", {
          position: "bottom-right",
        });

        const response = await axios.get(
          `/api/get_option_transactions?programId=${Option_Program_Address}`
        );
        const coder = new BorshInstructionCoder(idl as OptionContract);

        // Process transactions in parallel with a concurrency limit
        const BATCH_SIZE = 5;
        const allTrades: PoolTrade[] = [];

        for (let i = 0; i < response.data.length; i += BATCH_SIZE) {
          const batch = response.data.slice(i, i + BATCH_SIZE) as Transaction[];
          const batchResults = await Promise.all(
            batch.map((tx) => processTransaction(tx, coder))
          );
          allTrades.push(...batchResults.flat());
        }

        setPoolTrades(allTrades);
      } catch (error) {
        console.error("Error fetching trades:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrades();
  }, [processTransaction]);

  const memoizedTableContent = useMemo(
    () => (
      <TableBody>
        {poolTrades.map((tx, idx) => (
          <TableRow key={idx} className="border-none w-full">
            <TableCell className="text-sm text-foreground font-normal text-justify pl-5 py-3 w-fit">
              <div className="flex gap-[10px] items-center">
                <AvatarIcon />
                {tx.profile}
              </div>
            </TableCell>
            <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">
              {tx.type === "Deposit" ? (
                <span className="px-2 py-[6px] bg-[#A3BFFB]/20 text-[#A3BFFB] rounded-[8px]">
                  {tx.type}
                </span>
              ) : (
                <span className="px-2 py-[6px] bg-[#FFD08E]/20 text-[#FFD08E] rounded-[8px]">
                  {tx.type}
                </span>
              )}
            </TableCell>
            <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">
              {tx.amount0} SOL-LP
            </TableCell>
            <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">
              {tx.amount1} USDC
            </TableCell>
            <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">
              {tx.fees} USDC
            </TableCell>
            <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">
              {tx.pool}
            </TableCell>
            <TableCell className="text-sm text-foreground font-normal text-justify px-3 py-[14px] ">
              {tx.dateTime}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    ),
    [poolTrades]
  );

  return (
    <div className="border-none border-t-0 w-full h-full rounded-b-sm flex flex-col justify-between">
      <ScrollArea className="h-full rounded-b-sm w-full">
        <Table className="w-full whitespace-nowrap overflow-hidden">
          <TableHeader className="w-full p-0">
            <TableRow className="p-0">
              <TableHead className="text-xs text-secondary-foreground font-medium text-justify pl-5 pr-3 py-4">
                Profile
              </TableHead>
              <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">
                Deposit/Withdrawal
              </TableHead>
              <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">
                Quantity
              </TableHead>
              <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">
                Paid/Received
              </TableHead>
              <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">
                Fees
              </TableHead>
              <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">
                Pool
              </TableHead>
              <TableHead className="text-xs text-secondary-foreground font-medium text-justify px-3 py-4 ">
                Date & Time
              </TableHead>
            </TableRow>
          </TableHeader>
          {memoizedTableContent}
        </Table>
      </ScrollArea>
      <ToastContainer
          theme="dark"
      />
    </div>
  );
}
