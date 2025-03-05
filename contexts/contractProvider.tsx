"use client";

import { getPythPrice, usePythPrice } from "@/hooks/usePythPrice";
import { Connection, PublicKey } from "@solana/web3.js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import {
  AnchorProvider,
  BN,
  getProvider,
  Program,
  Provider,
} from "@coral-xyz/anchor";
import { OptionContract } from "@/lib/idl/option_contract";
import { Position } from "@/lib/data/Positions";
import { formatDate, Transaction } from "@/lib/data/WalletActivity";
import { coins } from "@/lib/data/coins";
import { format } from "date-fns";
import * as idl from "../lib/idl/option_contract.json";
import {
  USDC_DECIMALS,
  USDC_MINT,
  WSOL_DECIMALS,
  WSOL_MINT,
} from "@/utils/const";

interface ContractContextType {
  program: Program<OptionContract> | undefined;
  pub: PublicKey | undefined;
  getLpUserData: Function;
  getDetailInfos: Function;
  onBuyOption: Function;
  onSellOption: Function;
  onClaimOption: Function;
  onExerciseOption: Function;
  onDepositWsol: Function;
  onDepositUsdc: Function;
  onWithdrawWsol: Function;
  onWithdrawUsdc: Function;
}

export const ContractContext = createContext<ContractContextType>({
  program: undefined,
  pub: undefined,
  getLpUserData: () => {},
  getDetailInfos: () => {},
  onBuyOption: async () => {},
  onSellOption: () => {},
  onClaimOption: () => {},
  onExerciseOption: () => {},
  onDepositWsol: () => {},
  onDepositUsdc: () => {},
  onWithdrawWsol: () => {},
  onWithdrawUsdc: () => {},
});

const clusterUrl = "https://api.devnet.solana.com";
const connection = new Connection(clusterUrl, "confirmed");
export type ExpiredOption = {
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

export const ContractProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { priceData } = usePythPrice("Crypto.SOL/USD");
  const { connected, publicKey, sendTransaction } = useWallet();
  const wallet = useAnchorWallet();
  const [program, setProgram] = useState<Program<OptionContract>>();
  const [pub, setPubKey] = useState<PublicKey>();
  const getOptionDetailAccount = (index: number) => {
    if (connected && publicKey != null && program) {
      const [account] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("option"),
          publicKey?.toBuffer(),
          new BN(index + 1).toArrayLike(Buffer, "le", 8),
        ],
        program.programId
      );
      return account;
    }
  };

  const getOptionDetail = async (
    index: number,
    program: Program<OptionContract>
  ) => {
    if (connected && publicKey != null && program) {
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
  };

  const getLpUserData = async (program: Program<OptionContract>) => {
    if (connected && publicKey != null && program) {
      const [lp] = PublicKey.findProgramAddressSync(
        [Buffer.from("lp")],
        program.programId
      );
      const lpData = await program.account.lp.fetch(lp.toBase58());
      const [user] = PublicKey.findProgramAddressSync(
        [Buffer.from("user"), publicKey?.toBuffer()],
        program.programId
      );
      const userData = await program.account.user.fetch(user.toBase58());
      return [lpData, userData];
    }
  };

  const getDetailInfos = async (
    program: Program<OptionContract>,
    publicKey: PublicKey
  ) => {
    const pinfo = [];
    const expiredpinfo = [];
    const doneInfo = [];
    const [userPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("user"), publicKey.toBuffer()],
      program.programId
    );
    const userInfo = await program.account.user.fetch(userPDA.toBase58());
    const optionIndex = userInfo.optionIndex.toNumber();
    if (optionIndex == 0) return;
    for (let i = 1; i <= optionIndex; i++) {
      const detail = await getOptionDetail(i, program);
      if (!detail) continue;
      const pnl =
        priceData.price && detail.strikePrice
          ? priceData.price - detail.strikePrice
          : 0;
      if (
        detail?.expiredDate.toNumber() > Math.round(Date.now() / 1000) &&
        detail?.valid
      ) {
        pinfo.push({
          index: detail?.index.toNumber(),
          token: detail?.optionType ? "SOL" : "USDC",
          logo: "/images/solana.png",
          symbol: "SOL",
          type: detail?.optionType ? "Call" : "Put",
          expiry: new Date(detail?.expiredDate.toNumber() * 1000).toISOString(),
          size: detail?.optionType
            ? detail.solAmount.toNumber() / WSOL_DECIMALS
            : detail?.usdcAmount.toNumber() / USDC_DECIMALS,
          pnl: pnl,
          greeks: {
            delta: 0.6821,
            gamma: 0.0415,
            theta: -0.2113,
            vega: 0.0619,
          },
        });
      } else if (
        detail?.expiredDate.toNumber() < Math.round(Date.now() / 1000) &&
        detail?.valid
      ) {
        const expiryPrice = await getPythPrice(
          "Crypto.SOL/USD",
          detail?.expiredDate.toNumber()
        );
        expiredpinfo.push({
          index: detail?.index.toNumber() ?? 1,
          token: detail?.optionType ? "SOL" : "USDC",
          iconPath: "/images/solana.png",
          symbol: "SOL",
          strikePrice: detail?.strikePrice!,
          qty: 100,
          expiryPrice: expiryPrice!,
          transaction: detail?.optionType ? "Call" : "Put",
          tokenAmount: detail?.optionType
            ? detail.solAmount.toNumber()! / WSOL_DECIMALS
            : detail?.usdcAmount.toNumber()! / USDC_DECIMALS,
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
    return [pinfo, expiredpinfo, doneInfo];
  };

  const onBuyOption = async (
    amount: number,
    strike: number,
    period: number,
    expiredTime: number,
    isCall: boolean,
    paySol: boolean
  ) => {
    try {
      if (!program || !publicKey || !connected || !wallet) return false;
      const [userPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("user"), publicKey.toBuffer()],
        program.programId
      );
      const userInfo = await program.account.user.fetch(userPDA.toBase58());
      const optionIndex = userInfo.optionIndex.toNumber();
      const optionDetailAccount = getOptionDetailAccount(optionIndex);
      if (!optionDetailAccount) return false;
      const transaction = await program.methods
        .sellOption(
          new BN(amount),
          strike,
          new BN(period),
          new BN(expiredTime),
          isCall,
          paySol
        )
        .accountsPartial({
          signer: publicKey,
          wsolMint: WSOL_MINT,
          usdcMint: USDC_MINT,
          optionDetail: optionDetailAccount,
        })
        .transaction();
      const latestBlockHash = await connection.getLatestBlockhash();
      // transaction.feePayer = publicKey;
      // let result = await connection.simulateTransaction(transaction);
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: signature,
      });
      return true;
    } catch (e) {
      console.log("error", e);
      return false;
    }
  };

  const onSellOption = async (optionIndex: number) => {
    try {
      if (!program || !publicKey || !connected || !wallet) return;
      const optionDetailAccount = getOptionDetailAccount(optionIndex);
      if (!optionDetailAccount) return;
      const transaction = await program.methods
        .buyOption(new BN(optionIndex))
        .accounts({
          signer: publicKey,
          wsolMint: WSOL_MINT,
          usdcMint: USDC_MINT,
        })
        .transaction();
      const latestBlockHash = await connection.getLatestBlockhash();
      transaction.feePayer = publicKey;
      let result = await connection.simulateTransaction(transaction);
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
  };

  const onClaimOption = async (optionIndex: number, solPrice: number) => {
    try {
      if (!program || !publicKey || !connected || !wallet) return;
      const optionDetailAccount = getOptionDetailAccount(optionIndex);
      if (!optionDetailAccount) return;
      const transaction = await program.methods
        .expireOption(new BN(optionIndex), solPrice)
        .accounts({
          signer: publicKey,
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
    console.log("OptionIndex", optionIndex);
    if (!program || !optionIndex || !publicKey || !connected || !wallet) return;
    const optionDetailAccount = getOptionDetailAccount(optionIndex);
    if (!optionDetailAccount) return;
    const transaction = await program.methods
      .exerciseOption(new BN(optionIndex))
      .accounts({
        signer: publicKey,
        wsolMint: WSOL_MINT,
        usdcMint: USDC_MINT,
      })
      .transaction();
    const latestBlockHash = await connection.getLatestBlockhash();
    // transaction.feePayer = publicKey;
    // let result = await connection.simulateTransaction(transaction);
    //   console.log("result", result)
    const signature = await sendTransaction(transaction, connection);
    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: signature,
    });
    return true;
  };

  const onDepositWsol = async (
    amount: number,
    program: Program<OptionContract>,
    publicKey: PublicKey
  ) => {
    try {
      if (!program || !publicKey) return;
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
  };

  const onDepositUsdc = async (
    amount: number,
    program: Program<OptionContract>,
    publicKey: PublicKey
  ) => {
    try {
      if (!program || !publicKey) return;
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
  };

  const onWithdrawWsol = async (
    amount: number,
    program: Program<OptionContract>,
    publicKey: PublicKey
  ) => {
    try {
      if (!program || !publicKey) return;
      const transaction = await program.methods
        .withdrawWsol(new BN(amount))
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
  };

  const onWithdrawUsdc = async (
    amount: number,
    program: Program<OptionContract>,
    publicKey: PublicKey
  ) => {
    try {
      if (!program || !publicKey) return;
      const transaction = await program.methods
        .withdrawUsdc(new BN(amount))
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
      }
    })();
  }, [wallet]);

  return (
    <ContractContext.Provider
      value={{
        program,
        pub,
        getLpUserData,
        getDetailInfos,
        onBuyOption,
        onSellOption,
        onClaimOption,
        onExerciseOption,
        onDepositWsol,
        onDepositUsdc,
        onWithdrawWsol,
        onWithdrawUsdc,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
