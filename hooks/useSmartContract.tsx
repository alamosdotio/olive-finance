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
import { PublicKey } from "@solana/web3.js";
import {
  HERMES_URL,
  SOL_PRICE_FEED_ID,
  USDC_MINT,
  WSOL_MINT,
} from "@/utils/const";
import {
  InstructionWithEphemeralSigners,
  PythSolanaReceiver,
} from "@pythnetwork/pyth-solana-receiver";
import { HermesClient } from "@pythnetwork/hermes-client";
import { SYSTEM_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/native/system";

export const useSmartContract = () => {
  const { connected, publicKey, sendTransaction } = useWallet();
  const wallet = useAnchorWallet();
  const [program, setProgram] = useState<Program<OptionContract>>();
  const [lpbump, setLpBump] = useState<number>();
  const [optionIndex, setOptionIndex] = useState<number>();
  const { connection } = useConnection();

  const pythSolanaReceiver = new PythSolanaReceiver({
    connection,
    wallet: wallet as Wallet,
  });

  const priceServiceConnection = new HermesClient(HERMES_URL, {});

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
        const [, lpbump] = PublicKey.findProgramAddressSync(
          [Buffer.from("lp")],
          program.programId
        );
        setLpBump(lpbump);
        await getUserInfo();
      }
    }
  }, [connected]);
  const getOptionDetailAccount = (index: number) => {
    if (connected && publicKey != null && program) {
      const buffer = Buffer.alloc(8);
      buffer.writeUInt32LE(index);
      const [account] = PublicKey.findProgramAddressSync(
        [Buffer.from("option"), publicKey?.toBuffer(), buffer],
        program.programId
      );
      return account;
    }
  };
  const getOptionDetail = async (index: number) => {
    if (connected && publicKey != null && program) {
      const buffer = Buffer.alloc(8);
      buffer.writeUInt32LE(index);
      const [account] = PublicKey.findProgramAddressSync(
        [Buffer.from("option"), publicKey?.toBuffer(), buffer],
        program.programId
      );
      const optionDetail = await program.account.optionDetail.fetch(
        account.toBase58()
      );
      return optionDetail;
    }
  };
  const getUserInfo = useCallback(async () => {
    if (connected && publicKey != null && program) {
      const [userPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("user"), publicKey.toBuffer()],
        program.programId
      );
      const userInfo = await program.account.user.fetch(userPDA.toBase58());
      setOptionIndex(userInfo.optionIndex.toNumber());
    }
  }, [connected]);
  useEffect(() => {
    GetPDAInfo();
  }, [GetPDAInfo]);

  const onBuyOption = async (
    amount: number,
    strike: number,
    period: number,
    isCall: boolean,
    paySol: boolean
  ) => {
    if (!program || !optionIndex || !publicKey || !connected || !wallet) return;
    const optionDetailAccount = getOptionDetailAccount(optionIndex + 1);
    if (!optionDetailAccount) return;
    const priceUpdateData = (
      await priceServiceConnection.getLatestPriceUpdates(
        ["0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43"],
        { encoding: "base64" }
      )
    ).binary.data;
    const transactionBuilder = pythSolanaReceiver.newTransactionBuilder({
      closeUpdateAccounts: false,
    });
    await transactionBuilder.addPostPriceUpdates(priceUpdateData);
    await transactionBuilder.addPriceConsumerInstructions(
      async (
        getPriceUpdateAccount: (priceFeedId: string) => PublicKey
      ): Promise<InstructionWithEphemeralSigners[]> => {
        return [
          {
            instruction: await program.methods
              .sellOption(
                new BN(amount),
                new BN(strike),
                new BN(period),
                new BN(optionIndex + 1),
                isCall,
                paySol
              )
              .accounts({
                signer: publicKey,
                wsolMint: WSOL_MINT,
                usdcMint: USDC_MINT,
                optionDetail: optionDetailAccount,
                priceUpdate: getPriceUpdateAccount(SOL_PRICE_FEED_ID),
              })
              .instruction(),
            signers: [],
          },
        ];
      }
    );

    const transaction = await transactionBuilder.buildVersionedTransactions({
      computeUnitPriceMicroLamports: 10000,
    });
    await sendTransaction(transaction[0].tx, connection);
  };

  const onSellOption = async (optionIndex: number) => {
    try {
      if (!program || !publicKey || !connected || !wallet) return;
      const optionDetailAccount = getOptionDetailAccount(optionIndex);
      if (!optionDetailAccount) return;
      const transaction = await program.methods
        .buyOption(new BN(optionIndex), new BN(lpbump))
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

  const onExpireOption = async (optionIndex: number) => {
    try {
      if (!program || !publicKey || !connected || !wallet) return;
      const optionDetailAccount = getOptionDetailAccount(optionIndex);
      if (!optionDetailAccount) return;
      const transaction = await program.methods
        .expireOption(new BN(optionIndex))
        .accounts({
          signer: publicKey,
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

  const onExerciseOption = async (optionIndex: number) => {
    if (!program || !optionIndex || !publicKey || !connected || !wallet) return;
    const optionDetailAccount = getOptionDetailAccount(optionIndex);
    if (!optionDetailAccount) return;
    const priceUpdateData = (
      await priceServiceConnection.getLatestPriceUpdates(
        ["0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43"],
        { encoding: "base64" }
      )
    ).binary.data;
    const transactionBuilder = pythSolanaReceiver.newTransactionBuilder({
      closeUpdateAccounts: false,
    });
    await transactionBuilder.addPostPriceUpdates(priceUpdateData);
    await transactionBuilder.addPriceConsumerInstructions(
      async (
        getPriceUpdateAccount: (priceFeedId: string) => PublicKey
      ): Promise<InstructionWithEphemeralSigners[]> => {
        return [
          {
            instruction: await program.methods
              .exerciseOption(new BN(optionIndex))
              .accounts({
                signer: publicKey,
                wsolMint: WSOL_MINT,
                usdcMint: USDC_MINT,
                optionDetail: optionDetailAccount,
                priceUpdate: getPriceUpdateAccount(SOL_PRICE_FEED_ID),
              })
              .instruction(),
            signers: [],
          },
        ];
      }
    );

    const transaction = await transactionBuilder.buildVersionedTransactions({
      computeUnitPriceMicroLamports: 10000,
    });
    await sendTransaction(transaction[0].tx, connection);
  };

  return {
    optionIndex,
    getOptionDetail,
    onBuyOption,
    onSellOption,
    onExpireOption,
    onExerciseOption,
  };
};
