"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  AnchorProvider,
  getProvider,
  Idl,
  Program,
  Provider,
  BN,
} from "@coral-xyz/anchor";
import { getPythPrice } from "@/hooks/usePythPrice";
import {
  flattenTransactionResponse,
  SolanaParser,
} from "@debridge-finance/solana-transaction-parser";

import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { OptionContract } from "@/lib/idl/option_contract";
import * as idl from "../lib/idl/option_contract.json";
import {
  ParsedMessage,
  PublicKey,
  VersionedTransaction,
} from "@solana/web3.js";
import { connection } from "@/contexts/contractProvider";
import { USDC_MINT, WSOL_MINT } from "@/utils/const";
interface TradeDetailsProps {
  id: string;
}

interface TransactionDetailType {
  label: string;
  before: any;
  after: any;
  change: any;
  difference: any;
}

export default function TradeDetails({ id }: TradeDetailsProps) {
  let DefaultTransactionDetails: TransactionDetailType[] = [
    {
      label: "Total SOL",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "Locked SOL",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "Unlocked SOL",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "Total USDC",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "Locked USDC",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "Unlocked USDC",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "On-Chain Price",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "Total Pool Volume",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "L SOL Pool Volume",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "L USDC Pool Volume",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "Total Premium",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "Total Selling Fees",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "On-chain Price Sold",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "Utilization Rate SOL",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "Utilization Rate USDC",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "Total SLP Supply",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "SLP Price",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "Weightage SOL",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "Weightage USDC",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "Interest Rate",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "Volatility",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "USDC Withdrawal Fee",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "USDC Deposit Fee",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "SOL Withdrawal Fee",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "SOL Deposit Fee",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "Open Interest",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "Open Interest Call",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
    {
      label: "Open Interest Put",
      before: "",
      after: "",
      change: "",
      difference: "",
    },
  ];
  const { connected, publicKey, sendTransaction } = useWallet();
  const wallet = useAnchorWallet();
  const [program, setProgram] = useState<Program<OptionContract>>();
  const [pub, setPubKey] = useState<PublicKey>();
  const [detail, setDetail] = useState<TransactionDetailType[]>(
    DefaultTransactionDetails
  );

  const updateTransactionDetail = (
    label: string,
    field: keyof Omit<TransactionDetailType, "label">, // "before", "after", "change", or "difference"
    value: any
  ) => {
    DefaultTransactionDetails = DefaultTransactionDetails.map(
      (v) =>
        v.label === label
          ? { ...v, [field]: value } // Update the specific field
          : v // Keep other details unchanged
    );
  };

  const updateWholeTransactionDetail = (label: string, value: any) => {
    DefaultTransactionDetails = DefaultTransactionDetails.map(
      (v) =>
        v.label === label
          ? value // Update the specific field
          : v // Keep other details unchanged
    );
  };
  const getTransactionDetail = (
    label: string,
    field: keyof Omit<TransactionDetailType, "label"> // "before", "after", "change", or "difference"
  ) => {
    const info = DefaultTransactionDetails.find((c) => c.label === label);
    if (!info || !info?.[field]) return 0;
    const numericString = info[field].match(/^-?\d*\.?\d+/)?.[0]; // null if no match
    return numericString ? parseFloat(numericString) : 0;
  };
  useEffect(() => {
    (async () => {
      let provider: Provider;
      if (wallet && publicKey) {
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
        setPubKey(publicKey);
        const price = await getPythPrice("Crypto.SOL/USD", Date.now())
        updateWholeTransactionDetail("On-Chain Price", {
          label: "On-Chain Price",
          before: `$${price.toFixed(2)}`,
          after: `$${price.toFixed(2)}`,
          change: `0.00%`,
          difference: `$0.00`,
        });
        try {
          const txParser = new SolanaParser([
            { idl: idl as OptionContract, programId: program.programId },
          ]);
          const parsedData = await connection.getParsedTransaction(id);
          const ordered = await txParser.parseTransactionByHash(
            connection,
            id,
            true
          );
          console.log("parsed", ordered);
          console.log("parsedData", parsedData);
          if (!parsedData || !ordered) return;
          if (parsedData.meta?.err) {
            console.log("Transaction failed due to an error.");
            return;
          }
          console.log("methodType:", ordered[0].name);
          const transferIx = ordered.find((ix) => ix.name == "transfer");
          if (transferIx) {
            const allCustodyData = [];
            const transferAmount = (transferIx.args as { amount: BN }).amount;
            const sourceATA = transferIx.accounts.find(
              (ix) => ix.name == "source"
            );
            const destinationATA = transferIx.accounts.find(
              (ix) => ix.name == "destination"
            );
            const lockedAmount = (ordered[0].args as { params: { amount: BN } })
              .params.amount;
            console.log("lockedAmount", lockedAmount, ordered[0].args);
            const a1 = ordered[0].accounts.find((ix) =>
              ix.pubkey.equals(sourceATA!.pubkey)
            );
            const a2 = ordered[0].accounts.find((ix) =>
              ix.pubkey.equals(destinationATA!.pubkey)
            );
            const payCustody = ordered[0].accounts.find(
              (ix) => ix.name == "pay_custody"
            );
            const lockedCustody = ordered[0].accounts.find(
              (ix) => ix.name == "locked_custody"
            );
            const custody = ordered[0].accounts.find(
              (ix) => ix.name == "custody"
            );
            const pool = ordered[0].accounts.find((ix) => ix.name == "pool");
            const poolData = await program.account.pool.fetch(
              pool!.pubkey.toBase58()
            );

            const payCustodyData = await program.account.custody.fetch(
              payCustody!.pubkey.toBase58()
            );
            const lockedCustodyData = await program.account.custody.fetch(
              lockedCustody!.pubkey.toBase58()
            );
            const custodyData = await program.account.custody.fetch(
              custody!.pubkey.toBase58()
            );
            for await (let custody of poolData.custodies) {
              let c = await program.account.custody.fetch(
                new PublicKey(custody)
              );
              if (c.mint.toBase58() == WSOL_MINT.toBase58()) {
                updateWholeTransactionDetail("Total SOL", {
                  label: "Total SOL",
                  before: `${(
                    c.tokenOwned.toNumber() /
                    10 ** c.decimals
                  ).toFixed(2)} SOL`,
                  after: `${(
                    c.tokenOwned.toNumber() /
                    10 ** c.decimals
                  ).toFixed(2)} SOL`,
                  change: `0.00%`,
                  difference: `0.00 SOL`,
                });
                updateWholeTransactionDetail("Locked SOL", {
                  label: "Locked SOL",
                  before: `${(
                    c.tokenLocked.toNumber() /
                    10 ** c.decimals
                  ).toFixed(2)} SOL`,
                  after: `${(
                    c.tokenLocked.toNumber() /
                    10 ** c.decimals
                  ).toFixed(2)} SOL`,
                  change: `0.00%`,
                  difference: `0.00 SOL`,
                });
                updateWholeTransactionDetail("Unlocked SOL", {
                  label: "Unlocked SOL",
                  before: `${(
                    (c.tokenOwned.toNumber() - c.tokenLocked.toNumber()) /
                    10 ** c.decimals
                  ).toFixed(2)} SOL`,
                  after: `${(
                    (c.tokenOwned.toNumber() - c.tokenLocked.toNumber()) /
                    10 ** c.decimals
                  ).toFixed(2)} SOL`,
                  change: `0.00%`,
                  difference: `0.00 SOL`,
                });
              } else if (c.mint.toBase58() == USDC_MINT.toBase58()) {
                updateWholeTransactionDetail("Total USDC", {
                  label: "Total USDC",
                  before: `${(
                    c.tokenOwned.toNumber() /
                    10 ** c.decimals
                  ).toFixed(2)} USDC`,
                  after: `${(
                    c.tokenOwned.toNumber() /
                    10 ** c.decimals
                  ).toFixed(2)} USDC`,
                  change: `0.00%`,
                  difference: `0.00 USDC`,
                });
                updateWholeTransactionDetail("Locked USDC", {
                  label: "Locked USDC",
                  before: `${(
                    c.tokenLocked.toNumber() /
                    10 ** c.decimals
                  ).toFixed(2)} USDC`,
                  after: `${(
                    c.tokenLocked.toNumber() /
                    10 ** c.decimals
                  ).toFixed(2)} USDC`,
                  change: `0.00%`,
                  difference: `0.00 USDC`,
                });
                updateWholeTransactionDetail("Unlocked USDC", {
                  label: "Unlocked USDC",
                  before: `${(
                    (c.tokenOwned.toNumber() - c.tokenLocked.toNumber()) /
                    10 ** c.decimals
                  ).toFixed(2)} USDC`,
                  after: `${(
                    (c.tokenOwned.toNumber() - c.tokenLocked.toNumber()) /
                    10 ** c.decimals
                  ).toFixed(2)} USDC`,
                  change: `0.00%`,
                  difference: `0.00 USDC`,
                });
              }
            }
            if (lockedCustodyData.mint.toBase58() == WSOL_MINT.toBase58()) {
              const change =
                lockedAmount.toNumber() / 10 ** lockedCustodyData.decimals;
              const afterLock = getTransactionDetail("Locked SOL", "after");
              updateWholeTransactionDetail("Locked SOL", {
                label: "Locked SOL",
                before: `${(afterLock - change).toFixed(2)} SOL`,
                after: `${afterLock.toFixed(2)} SOL`,
                change: `${((change / (afterLock - change)) * 100).toFixed(
                  2
                )}%`,
                difference: `${change.toFixed(2)} SOL`,
              });
              const afterUnLock = getTransactionDetail("Unlocked SOL", "after");

              updateWholeTransactionDetail("Unlocked SOL", {
                label: "Unlocked SOL",
                before: `${(afterUnLock+ change).toFixed(2)} SOL`,
                after: `${afterUnLock.toFixed(2)} SOL`,
                change: `${((- change / (afterLock + change)) * 100).toFixed(
                  2
                )}%`,
                difference: `${-change.toFixed(2)} SOL`,
              });
            } else if (
              lockedCustodyData.mint.toBase58() == USDC_MINT.toBase58()
            ) {
              const change =
                lockedAmount.toNumber() / 10 ** lockedCustodyData.decimals;
              const afterLock = getTransactionDetail("Locked USDC", "after");
              updateWholeTransactionDetail("Locked USDC", {
                label: "Locked USDC",
                before: `${(afterLock - change).toFixed(2)} USDC`,
                after: `${afterLock.toFixed(2)} USDC`,
                change: `${((change / (afterLock - change)) * 100).toFixed(
                  2
                )}%`,
                difference: `${change.toFixed(2)} USDC`,
              });
              const afterUnLock = getTransactionDetail("Unlocked USDC", "after");

              updateWholeTransactionDetail("Unlocked USDC", {
                label: "Unlocked USDC",
                before: `${(afterUnLock+ change).toFixed(2)} USDC`,
                after: `${afterUnLock.toFixed(2)} USDC`,
                change: `${((- change / (afterLock + change)) * 100).toFixed(
                  2
                )}%`,
                difference: `${-change.toFixed(2)} USDC`,
              });
            }
            if(payCustodyData.mint.equals(USDC_MINT)){
              const change =
              lockedAmount.toNumber() / 10 ** lockedCustodyData.decimals;
            const afterLock = getTransactionDetail("Total USDC", "after");
            updateWholeTransactionDetail("Locked USDC", {
              label: "Locked USDC",
              before: `${(afterLock - change).toFixed(2)} USDC`,
              after: `${afterLock.toFixed(2)} USDC`,
              change: `${((change / (afterLock - change)) * 100).toFixed(
                2
              )}%`,
              difference: `${change.toFixed(2)} USDC`,
            });
            const afterUnLock = getTransactionDetail("Unlocked USDC", "after");

            updateWholeTransactionDetail("Unlocked USDC", {
              label: "Unlocked USDC",
              before: `${(afterUnLock+ change).toFixed(2)} USDC`,
              after: `${afterUnLock.toFixed(2)} USDC`,
              change: `${((- change / (afterLock + change)) * 100).toFixed(
                2
              )}%`,
              difference: `${-change.toFixed(2)} USDC`,
            });
            } else if(payCustodyData.mint.equals(WSOL_MINT)){

            }
            updateWholeTransactionDetail("Total Pool Volume", {
              label: "Total Pool Volume",
              before: `$${(getTransactionDetail("Total SOL", "before") * price + getTransactionDetail("Total USDC", "before")).toFixed(2)}`,
              after: `$${(getTransactionDetail("Total SOL", "before") * price + getTransactionDetail("Total USDC", "before")).toFixed(2)}`,
              change: `${((getTransactionDetail("Total SOL", "before") * price + getTransactionDetail("Total USDC", "before") - getTransactionDetail("Total SOL", "before") * price - getTransactionDetail("Total USDC", "before"))/(getTransactionDetail("Total SOL", "before") * price + getTransactionDetail("Total USDC", "before"))).toFixed(2)}%`,
              difference: `$${(getTransactionDetail("Total SOL", "before") * price + getTransactionDetail("Total USDC", "before") - getTransactionDetail("Total SOL", "before") * price - getTransactionDetail("Total USDC", "before")).toFixed(2)}`,
            });

            updateWholeTransactionDetail("Total Premium", {
              label: "Total Premium",
              before: `$0`,
              after: `$${payCustodyData.mint.equals(USDC_MINT) ? (transferAmount / 10 ** payCustodyData.decimals).toFixed(2) : (transferAmount / 10 ** payCustodyData.decimals * price).toFixed(2)}`,
              change: `100%`,
              difference: `$${payCustodyData.mint.equals(USDC_MINT) ? (transferAmount / 10 ** payCustodyData.decimals).toFixed(2) : (transferAmount / 10 ** payCustodyData.decimals * price).toFixed(2)}`,
            });
            updateWholeTransactionDetail("Total Selling Fees", {
              label: "Total Selling Fees",
              before: `$0`,
              after: `$0`,
              change: `0%`,
              difference: `$0`,
            });
          }
          setDetail([...DefaultTransactionDetails]);
        } catch (error) {
          console.error("Error fetching transaction:", error);
        }
      }
    })();
  }, [wallet]);

  return (
    <div className="w-full border rounded-sm">
      <div className="w-full p-3 flex flex-col border-b">
        <span>Transaction ID: {id}</span>
        <span>Type: Put</span> {/*change to actual type if its call or put*/}
        <span>Amount: 5 Contracts</span> {/*change to actual number/amount of contracts*/}
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow className="">
            <TableHead></TableHead>
            <TableHead>Before</TableHead>
            <TableHead>After</TableHead>
            <TableHead>% Change</TableHead>
            <TableHead>Difference</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {detail.map((trade, index) => (
            <TableRow key={`${trade.label}-${index}`}>
              <TableCell className="border-r w-52">{trade.label}</TableCell>
              <TableCell className="border-r">{trade.before}</TableCell>
              <TableCell className="border-r">{trade.after}</TableCell>
              <TableCell className="border-r">{trade.change}</TableCell>
              <TableCell className="border-r">{trade.difference}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
