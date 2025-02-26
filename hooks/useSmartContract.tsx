"use client";

import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Program,
  Wallet,
  getProvider,
  BN,
  AnchorProvider,
  Provider,
} from "@coral-xyz/anchor";
import * as idl from "../lib/idl/option_contract.json";
import { OptionContract } from "@/lib/idl/option_contract";
import { Connection, PublicKey } from "@solana/web3.js";
import { SOL_USD_PYTH_ACCOUNT, USDC_MINT, WSOL_MINT } from "@/utils/const";
import { SYSTEM_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/native/system";
import { Position, positions } from "@/lib/data/Positions";
import { getPythPrice, usePythPrice } from "./usePythPrice";
import { formatDate, Transaction } from "@/lib/data/WalletActivity";
import { format } from "date-fns";
import { coins } from "@/lib/data/coins";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { Keypair } from "@solana/web3.js";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
const clusterUrl = "https://api.devnet.solana.com";
const connection = new Connection(clusterUrl, "confirmed");

type ExpiredOption = {
  index: any;
  token: any;
  transaction: any;
  strikePrice: any;
  qty: any;
  expiryPrice: any;
  tokenAmount: any;
  dollarAmount: any;
  iconPath: any;
};

export const useSmartContract = () => {
  const { priceData } = usePythPrice("Crypto.SOL/USD");
  const { connected, publicKey, sendTransaction } = useWallet();
  const wallet = useAnchorWallet();
  const [program, setProgram] = useState<Program<OptionContract>>();
  const [lpbump, setLpBump] = useState<number>(0);
  const [optionIndex, setOptionIndex] = useState<number>(0);
  const [optioninfos, setOptioninfos] = useState<Position[]>();
  const [expiredOptionInfos, setExpiredOptionInfos] =
    useState<ExpiredOption[]>();
  const [doneOptioninfos, setDoneOptioninfos] = useState<Transaction[]>();

  const GetPDAInfo = useCallback(async () => {
    if (connected && publicKey != null) {
      let provider: Provider;
      if (wallet) {
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
        const [lp, lpbump] = PublicKey.findProgramAddressSync(
          [Buffer.from("lp")],
          program.programId
        );

        setLpBump(lpbump);
        console.log("lp", lp.toBase58(), lpbump);
        await getUserInfo();
      }
    }
  }, [connected, publicKey]);
  const getOptionDetailAccount = useCallback(
    (index: number) => {
      if (connected && publicKey != null && program) {
        const [account] = PublicKey.findProgramAddressSync(
          [
            Buffer.from("option"),
            publicKey?.toBuffer(),
            new BN(index).toArray("le", 8),
          ],
          program.programId
        );
        for (let i = 255; i >= 0; i--) {
          try {
            const account = PublicKey.createProgramAddressSync(
              [
                Buffer.from("option"),
                publicKey?.toBuffer(),
                new BN(index).toArray("le", 8),
                Buffer.from([i]),
              ],
              program.programId
            );
            console.log("PDA", account.toBase58(), i);
          } catch (e) {}
        }
        return account;
      }
    },
    [connected]
  );
  const getOptionDetail = useCallback(
    async (index: number) => {
      if (connected && publicKey != null && program) {
        // const buffer = Buffer.alloc(8);
        // buffer.writeUInt32LE(index);
        const [account] = PublicKey.findProgramAddressSync(
          [
            Buffer.from("option"),
            publicKey?.toBuffer(),
            new BN(index).toArray("le", 8),
          ],
          program.programId
        );
        const optionDetail = await program.account.optionDetail.fetch(
          account.toBase58()
        );
        return optionDetail;
      }
    },
    [connected]
  );

  const getUserData = useCallback(async () => {
    if (connected && publicKey != null && program) {
      try {
        const [user] = PublicKey.findProgramAddressSync(
          [Buffer.from("user"), publicKey?.toBuffer()],
          program.programId
        );
        const userData = await program.account.user.fetch(user.toBase58());
        return userData;
      } catch (e) {
        console.log("No Data in User", e);
      }
    }
  }, [connected]);

  const getLpData = useCallback(async () => {
    if (connected && publicKey != null && program) {
      const [lp] = PublicKey.findProgramAddressSync(
        [Buffer.from("lp")],
        program.programId
      );
      const lpData = await program.account.lp.fetch(lp.toBase58());
      return lpData;
    }
  }, [connected]);

  const getUserInfo = useCallback(async () => {
    if (connected && publicKey != null && program) {
      try {
        const [userPDA] = PublicKey.findProgramAddressSync(
          [Buffer.from("user"), publicKey.toBuffer()],
          program.programId
        );
        const userInfo = await program.account.user.fetch(userPDA.toBase58());
        setOptionIndex(userInfo.optionIndex.toNumber());
      } catch (e) {
        console.log("No Data in User", e);
        setOptionIndex(0);
      }
    }
  }, [connected]);
  useEffect(() => {
    GetPDAInfo();
  }, [GetPDAInfo]);

  const getOptionInfos = useCallback(async () => {
    if (optionIndex != undefined) {
      const pinfo = [];
      const expiredpinfo = [];
      const doneInfo = [];
      for (let i = 0; i <= optionIndex && optionIndex > 0; i++) {
        const detail = await getOptionDetail(i);
        const pnl =
          priceData.price && detail?.strikePrice
            ? priceData.price - detail.strikePrice
            : 0;
        if (detail?.expiredDate.toNumber() > Math.round(Date.now() / 1000)) {
          pinfo.push({
            index: detail?.index.toNumber(),
            token: detail?.optionType ? "SOL" : "USDC",
            logo: "/images/solana.png",
            symbol: "SOL",
            type: detail?.optionType ? "Call" : "Put",
            expiry: new Date(
              detail?.expiredDate.toNumber() * 1000
            ).toISOString(),
            size: detail?.optionType
              ? detail.solAmount.toNumber()
              : detail?.usdcAmount.toNumber(),
            pnl: pnl,
            greeks: {
              delta: 0.6821,
              gamma: 0.0415,
              theta: -0.2113,
              vega: 0.0619,
            },
          });
        } else if (!detail?.valid) {
          const expiryPrice = await getPythPrice(
            "Crypto.SOL/USD",
            detail?.expiredDate.toNumber()
          );
          expiredpinfo.push({
            index: detail?.index.toNumber() ?? 1,
            token: detail?.optionType ? "SOL" : "USDC",
            iconPath: "/images/solana.png",
            symbol: "SOL",
            strikePrice: detail?.strikePrice ?? 1,
            qty: 100,
            expiryPrice: expiryPrice ?? 1,
            transaction: detail?.optionType ? "Call" : "Put",
            tokenAmount: detail?.optionType
              ? detail.solAmount.toNumber() ?? 1
              : detail?.usdcAmount.toNumber() ?? 1,
            dollarAmount: detail?.solAmount.toNumber() * (expiryPrice ?? 1),
          });
        } else {
          doneInfo.push({
            transactionID: `SOL-${formatDate(
              new Date(detail.exercised * 1000)
            )}-${detail.strikePrice}-${detail?.optionType ? "C" : "P"}`,
            token: coins[0],
            transactionType: detail?.optionType ? "Call" : "Put",
            optionType: "American",
            strikePrice: detail.strikePrice,
            expiry: format(new Date(detail.exercised), "dd MMM, yyyy HH:mm:ss"),
          });
        }
      }
      setOptioninfos(pinfo);
      setExpiredOptionInfos(expiredpinfo);
      setDoneOptioninfos(doneInfo);
    }
  }, [optionIndex, getOptionDetail]);
  useEffect(() => {
    getOptionInfos();
  }, [getOptionInfos]);
  const onBuyOption = async (
    amount: number,
    strike: number,
    period: number,
    expiredTime: number,
    isCall: boolean,
    paySol: boolean
  ) => {
    if (!program || !publicKey || !connected || !wallet) return;
    console.log("start here", optionIndex);
    const optionDetailAccount = getOptionDetailAccount(optionIndex + 1);
    console.log("optionDetailAccount", optionDetailAccount?.toBase58());
    if (!optionDetailAccount) return;
    const transaction = await program.methods
      .sellOption(
        new BN(amount),
        new BN(strike),
        new BN(period),
        new BN(expiredTime),
        new BN(optionIndex + 1),
        isCall,
        paySol
      )
      .accounts({
        signer: publicKey,
        wsolMint: WSOL_MINT,
        usdcMint: USDC_MINT,
        optionDetail: optionDetailAccount,
        pythPriceAccount: SOL_USD_PYTH_ACCOUNT,
      })
      .transaction();

    const key = Keypair.fromSecretKey(
      bs58.decode(
        "F4GbtQS1ZoDxpuzuZh64qPLC2ve1RUyZVRJER9xQqCTK6SRxafo1DRHBXBVLYNenzukEC9Zag9BZYHjHhhy8vTC"
      )
    );
    const result = await connection.simulateTransaction(transaction, [key]);
    console.log("result", result);

    const latestBlockHash = await connection.getLatestBlockhash();
    const signature = await sendTransaction(transaction, connection);
    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: signature,
    });
    return true;
  };

  const onSellOption = async (optionIndex: number) => {
    try {
      if (!program || !publicKey || !connected || !wallet) return;
      const optionDetailAccount = getOptionDetailAccount(optionIndex);
      if (!optionDetailAccount) return;
      const transaction = await program.methods
        .buyOption(new BN(optionIndex), lpbump)
        .accounts({
          signer: publicKey,
          wsolMint: WSOL_MINT,
          usdcMint: USDC_MINT,
          optionDetail: optionDetailAccount,
        })
        .transaction();
      const latestBlockHash = await connection.getLatestBlockhash();
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: signature,
      });
      return true;
    } catch (e) {
      console.log("Error", e);
      return false;
    }
  };

  const onClaimOption = async (optionIndex: number, solPrice: number) => {
    try {
      if (!program || !publicKey || !connected || !wallet) return;
      const optionDetailAccount = getOptionDetailAccount(optionIndex);
      if (!optionDetailAccount) return;
      const transaction = await program.methods
        .expireOption(new BN(optionIndex), new BN(solPrice), lpbump)
        .accounts({
          signer: publicKey,
          optionDetail: optionDetailAccount,
          wsolMint: WSOL_MINT,
          usdcMint: USDC_MINT,
        })
        .transaction();
      const latestBlockHash = await connection.getLatestBlockhash();
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: signature,
      });
      return true;
    } catch (e) {
      console.log("Error", e);
      return false;
    }
  };

  const onExerciseOption = async (optionIndex: number) => {
    if (!program || !optionIndex || !publicKey || !connected || !wallet) return;
    const optionDetailAccount = getOptionDetailAccount(optionIndex);
    if (!optionDetailAccount) return;
    const transaction = await program.methods
      .exerciseOption(new BN(optionIndex), lpbump)
      .accounts({
        signer: publicKey,
        wsolMint: WSOL_MINT,
        usdcMint: USDC_MINT,
        optionDetail: optionDetailAccount,
        pythPriceAccount: SOL_USD_PYTH_ACCOUNT,
      })
      .transaction();
    const latestBlockHash = await connection.getLatestBlockhash();
    const signature = await sendTransaction(transaction, connection);
    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: signature,
    });
    return true;
  };

  const onDepositWsol = useCallback(
    async (amount: number) => {
      try {
        if (!program || !publicKey || !connected || !wallet) return;
        const transaction = await program.methods
          .depositWsol(new BN(amount))
          .accounts({
            signer: publicKey,
            wsolMint: WSOL_MINT,
          })
          .transaction();
        const latestBlockHash = await connection.getLatestBlockhash();
        const signature = await sendTransaction(transaction, connection);
        await connection.confirmTransaction({
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature: signature,
        });
        return true;
      } catch (e) {
        console.log("Error", e);
        return false;
      }
    },
    [connected]
  );

  const onDepositUsdc = useCallback(
    async (amount: number) => {
      try {
        if (!program || !publicKey || !connected || !wallet) return;
        const transaction = await program.methods
          .depositUsdc(new BN(amount))
          .accounts({
            signer: publicKey,
            usdcMint: USDC_MINT,
          })
          .transaction();
        const latestBlockHash = await connection.getLatestBlockhash();
        const signature = await sendTransaction(transaction, connection);
        await connection.confirmTransaction({
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature: signature,
        });
        return true;
      } catch (e) {
        console.log("Error", e);
        return false;
      }
    },
    [connected]
  );

  const onWithdrawWsol = useCallback(
    async (amount: number) => {
      try {
        if (!program || !publicKey || !connected || !wallet || lpbump == 0)
          return;
        const transaction = await program.methods
          .withdrawWsol(new BN(amount), lpbump)
          .accounts({
            signer: publicKey,
            wsolMint: WSOL_MINT,
          })
          .transaction();
        const latestBlockHash = await connection.getLatestBlockhash();
        const signature = await sendTransaction(transaction, connection);
        await connection.confirmTransaction({
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature: signature,
        });
        return true;
      } catch (e) {
        console.log("Error", e);
        return false;
      }
    },
    [connected]
  );

  const onWithdrawUsdc = useCallback(
    async (amount: number) => {
      try {
        if (!program || !publicKey || !connected || !wallet) return;
        const [lp, lpBump] = PublicKey.findProgramAddressSync(
          [Buffer.from("lp")],
          program.programId
        );

        const lpata = getAssociatedTokenAddressSync(USDC_MINT, lp, true);
        const transaction = await program.methods
          .withdrawUsdc(new BN(amount), lpBump)
          .accountsPartial({
            signer: publicKey,
            usdcMint: USDC_MINT,
            lp: lp,
            lpAta: lpata,
          })
          .transaction();

        console.log("lp", lp.toBase58(), lpata.toBase58());

        const latestBlockHash = await connection.getLatestBlockhash();

        const key = Keypair.fromSecretKey(
          bs58.decode(
            "F4GbtQS1ZoDxpuzuZh64qPLC2ve1RUyZVRJER9xQqCTK6SRxafo1DRHBXBVLYNenzukEC9Zag9BZYHjHhhy8vTC"
          )
        );
        const result = await connection.simulateTransaction(transaction, [key]);
        console.log("result", result);
        const signature = await sendTransaction(transaction, connection);
        await connection.confirmTransaction({
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature: signature,
        });
        return true;
      } catch (e) {
        console.log("Error", e);
        return false;
      }
    },
    [connected]
  );

  return {
    optionIndex,
    getOptionDetail,
    onBuyOption,
    onSellOption,
    onClaimOption,
    onExerciseOption,
    optioninfos,
    expiredOptionInfos,
    doneOptioninfos,
    getUserData,
    getLpData,
    onDepositWsol,
    onDepositUsdc,
    onWithdrawUsdc,
    onWithdrawWsol,
  };
};
