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
import { Position } from "@/lib/data/Positions";
import { formatDate, Transaction } from "@/lib/data/WalletActivity";
import { coins } from "@/lib/data/coins";
import { format } from "date-fns";
import { OptionContract } from "@/lib/idl/option_contract";
import * as idl from "../lib/idl/option_contract.json";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import {
  USDC_DECIMALS,
  USDC_MINT,
  WSOL_DECIMALS,
  WSOL_MINT,
} from "@/utils/const";

interface ContractContextType {
  program: Program<OptionContract> | undefined;
  pub: PublicKey | undefined;
  getCustodies: Function;
  getDetailInfos: Function;
  onOpenOption: Function;
  onCloseOption: Function;
  onClaimOption: Function;
  onExerciseOption: Function;
  onAddLiquidity: Function;
  onRemoveLiquidity: Function;
  getOptionDetailAccount: Function;
}

export const ContractContext = createContext<ContractContextType>({
  program: undefined,
  pub: undefined,
  getCustodies: () => {},
  getDetailInfos: () => {},
  onOpenOption: async () => {},
  onCloseOption: () => {},
  onClaimOption: () => {},
  onExerciseOption: () => {},
  onAddLiquidity: () => {},
  onRemoveLiquidity: () => {},
  getOptionDetailAccount: () => {},
});

export const clusterUrl = "https://api.devnet.solana.com";
export const connection = new Connection(clusterUrl, "confirmed");
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
  const getOptionDetailAccount = (
    index: number,
    pool: PublicKey,
    custody: PublicKey
  ) => {
    if (connected && publicKey != null && program && wallet != undefined) {
      const [optionDetail] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("option"),
          wallet.publicKey.toBuffer(),
          new BN(index).toArrayLike(Buffer, "le", 8),
          pool.toBuffer(),
          custody.toBuffer(),
        ],
        program.programId
      );
      return optionDetail;
    }
  };

  const getCustodies = async (program: Program<OptionContract>) => {
    if (connected && publicKey != null && program) {
      const [pool] = PublicKey.findProgramAddressSync(
        [Buffer.from("pool"), Buffer.from("SOL-USDC")],
        program.programId
      );
      const custodies = new Map<string, any>();
      const ratios = new Map<string, any>();
      const poolData = await program.account.pool.fetch(pool);
      for await (let custody of poolData.custodies) {
        let c = await program.account.custody.fetch(new PublicKey(custody));
        let mint = c.mint;
        custodies.set(mint.toBase58(), c);
        ratios.set(
          mint.toBase58(),
          poolData.ratios[
            poolData.custodies.findIndex((e) => e.equals(custody))
          ]
        );
      }
      return [custodies, ratios];
    }
  };

  const getDetailInfos = async (
    program: Program<OptionContract>,
    publicKey: PublicKey
  ) => {
    const pinfo = [];
    const expiredpinfo = [];
    const doneInfo = [];
    const [pool] = PublicKey.findProgramAddressSync(
      [Buffer.from("pool"), Buffer.from("SOL-USDC")],
      program.programId
    );
    const [custody] = PublicKey.findProgramAddressSync(
      [Buffer.from("custody"), pool.toBuffer(), WSOL_MINT.toBuffer()],
      program.programId
    );
    const [userPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("user"), publicKey.toBuffer()],
      program.programId
    );
    const userInfo = await program.account.user.fetch(userPDA).catch((e) => {
      return null;
    });
    if (!userInfo) return [[], [], []];
    const optionIndex = userInfo.optionIndex.toNumber();

    if (optionIndex == 0) return [[], [], []];
    for (let i = 1; i <= optionIndex; i++) {
      try {
        const optionDetailAccount = getOptionDetailAccount(i, pool, custody);
        if (!optionDetailAccount) continue;
        const detail = await program.account.optionDetail.fetch(
          optionDetailAccount
        );
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
            token: detail?.lockedAsset.equals(custody) ? "SOL" : "USDC",
            logo: "/images/solana.png",
            symbol: "SOL",
            strikePrice: detail?.strikePrice ?? 0,
            type: detail?.lockedAsset.equals(custody) ? "Call" : "Put",
            expiry: new Date(detail?.expiredDate.toNumber() * 1000).toString(),
            size: detail?.lockedAsset.equals(custody)
              ? detail.amount.toNumber() / 10 ** WSOL_DECIMALS
              : detail.amount.toNumber() / 10 ** USDC_DECIMALS,
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
            token: detail?.lockedAsset.equals(custody) ? "SOL" : "USDC",
            iconPath: "/images/solana.png",
            symbol: "SOL",
            strikePrice: detail?.strikePrice ?? 0,
            qty: 100,
            expiryPrice: expiryPrice!,
            transaction: detail?.lockedAsset.equals(custody) ? "Call" : "Put",
            tokenAmount: detail?.lockedAsset.equals(custody)
              ? detail.amount.toNumber() / 10 ** WSOL_DECIMALS
              : detail.amount.toNumber() / 10 ** USDC_DECIMALS,
            dollarAmount: detail?.lockedAsset.equals(custody)
              ? detail.profit * (expiryPrice ?? 1)
              : detail.profit,
          });
        } else {
          doneInfo.push({
            transactionID: `SOL-${formatDate(
              new Date(detail.exercised * 1000)
            )}-${detail.strikePrice}-${
              detail?.lockedAsset.equals(custody) ? "C" : "P"
            }`,
            token: coins[0],
            transactionType: detail?.lockedAsset.equals(custody)
              ? "Call"
              : "Put",
            optionType: "American",
            strikePrice: detail.strikePrice,
            expiry: format(new Date(detail.exercised), "dd MMM, yyyy HH:mm:ss"),
          });
        }
      } catch (e) {
        console.log(e);
        continue;
      }
    }
    return [pinfo, expiredpinfo, doneInfo];
  };

  const onOpenOption = async (
    amount: number,
    strike: number,
    period: number,
    expiredTime: number,
    isCall: boolean,
    paySol: boolean
  ) => {
    // try {
    if (!program || !publicKey || !connected || !wallet) return false;
    const [pool] = PublicKey.findProgramAddressSync(
      [Buffer.from("pool"), Buffer.from("SOL-USDC")],
      program.programId
    );
    const [custody] = PublicKey.findProgramAddressSync(
      [Buffer.from("custody"), pool.toBuffer(), WSOL_MINT.toBuffer()],
      program.programId
    );
    const [userPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("user"), publicKey.toBuffer()],
      program.programId
    );
    let optionIndex;
    try {
      const userInfo = await program.account.user.fetch(userPDA);
      optionIndex = userInfo.optionIndex.toNumber() + 1;
    } catch {
      optionIndex = 1;
    }

    const optionDetailAccount = getOptionDetailAccount(
      optionIndex,
      pool,
      custody
    );

    if (!optionDetailAccount) return false;
    const fundingAccount = getAssociatedTokenAddressSync(
      paySol ? WSOL_MINT : USDC_MINT,
      wallet.publicKey
    );

    const [paycustody] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("custody"),
        pool.toBuffer(),
        paySol ? WSOL_MINT.toBuffer() : USDC_MINT.toBuffer(),
      ],
      program.programId
    );

    const paycustodyData = await program.account.custody.fetch(paycustody);

    const transaction = await program.methods
      .openOption({
        amount: new BN(amount),
        strike: strike,
        period: new BN(period),
        expiredTime: new BN(expiredTime),
        poolName: "SOL-USDC",
      })
      .accountsPartial({
        owner: publicKey,
        fundingAccount: fundingAccount,
        custodyMint: WSOL_MINT,
        payCustodyMint: paySol ? WSOL_MINT : USDC_MINT,
        custodyOracleAccount: new PublicKey(
          "J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix"
        ),
        payCustodyOracleAccount: paySol
          ? new PublicKey("J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix")
          : new PublicKey("5SSkXsEKQepHHAewytPVwdej4epN1nxgLVM84L4KXgy7"),
        lockedCustodyMint: isCall ? WSOL_MINT : USDC_MINT,
        optionDetail: optionDetailAccount,
        payCustodyTokenAccount: paycustodyData.tokenAccount,
      })
      .transaction();
    const latestBlockHash = await connection.getLatestBlockhash();
    // transaction.feePayer = publicKey;
    // let result = await connection.simulateTransaction(transaction);
    // console.log("result", result);
    const signature = await sendTransaction(transaction, connection);
    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: signature,
    });
    return true;
    // } catch (e) {
    //   console.log("error", e);
    //   return false;
    // }
  };

  const onCloseOption = async (optionIndex: number) => {
    try {
      if (!program || !publicKey || !connected || !wallet) return;
      const [pool] = PublicKey.findProgramAddressSync(
        [Buffer.from("pool"), Buffer.from("SOL-USDC")],
        program.programId
      );
      const [custody] = PublicKey.findProgramAddressSync(
        [Buffer.from("custody"), pool.toBuffer(), WSOL_MINT.toBuffer()],
        program.programId
      );
      const optionDetailAccount = getOptionDetailAccount(
        optionIndex,
        pool,
        custody
      );
      if (!optionDetailAccount) return;
      const optionDetailAccountData = await program.account.optionDetail.fetch(
        optionDetailAccount
      );

      const fundingAccount = getAssociatedTokenAddressSync(
        optionDetailAccountData.premiumAsset.equals(custody)
          ? WSOL_MINT
          : USDC_MINT,
        wallet.publicKey
      );
      const transaction = await program.methods
        .closeOption({ optionIndex: new BN(optionIndex), poolName: "SOL-USDC" })
        .accountsPartial({
          owner: publicKey,
          fundingAccount,
          custodyMint: WSOL_MINT,
          payCustodyMint: optionDetailAccountData.premiumAsset.equals(custody)
            ? WSOL_MINT
            : USDC_MINT,
          lockedCustodyMint: optionDetailAccountData.lockedAsset.equals(custody)
            ? WSOL_MINT
            : USDC_MINT,
        })
        .transaction();

      const latestBlockHash = await connection.getLatestBlockhash();
      // transaction.feePayer = publicKey;
      // let result = await connection.simulateTransaction(transaction);
      // console.log("result", result);
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
      const [pool] = PublicKey.findProgramAddressSync(
        [Buffer.from("pool"), Buffer.from("SOL-USDC")],
        program.programId
      );
      const [custody] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("custody_token_account"),
          pool.toBuffer(),
          WSOL_MINT.toBuffer(),
        ],
        program.programId
      );
      const optionDetailAccount = getOptionDetailAccount(
        optionIndex,
        pool,
        custody
      );
      if (!optionDetailAccount) return;
      const transaction = await program.methods
        .claimOption(new BN(optionIndex), solPrice)
        .accountsPartial({
          owner: publicKey,
          custodyMint: WSOL_MINT,
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
    const [pool] = PublicKey.findProgramAddressSync(
      [Buffer.from("pool"), Buffer.from("SOL-USDC")],
      program.programId
    );
    const [custody] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("custody_token_account"),
        pool.toBuffer(),
        WSOL_MINT.toBuffer(),
      ],
      program.programId
    );
    const optionDetailAccount = getOptionDetailAccount(
      optionIndex,
      pool,
      custody
    );
    if (!optionDetailAccount) return;
    const transaction = await program.methods
      .exerciseOption(new BN(optionIndex))
      .accountsPartial({
        owner: publicKey,
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

  const onAddLiquidity = async (
    amount: number,
    program: Program<OptionContract>,
    asset: PublicKey
  ) => {
    try {
      if (!program || !publicKey) return;
      if (!wallet) return;

      const [pool] = PublicKey.findProgramAddressSync(
        [Buffer.from("pool"), Buffer.from("SOL-USDC")],
        program.programId
      );
      const [custody] = PublicKey.findProgramAddressSync(
        [Buffer.from("custody"), pool.toBuffer(), asset.toBuffer()],
        program.programId
      );
      const poolData = await program.account.pool.fetch(pool);
      const custodyData = await program.account.custody.fetch(custody);
      const fundingAccount = getAssociatedTokenAddressSync(
        asset,
        wallet.publicKey
      );
      let custodies = [];
      let oracles = [];
      for await (let custody of poolData.custodies) {
        let c = await program.account.custody.fetch(new PublicKey(custody));
        let ora = c.oracle;
        custodies.push({ pubkey: custody, isSigner: false, isWritable: true });
        oracles.push({ pubkey: ora, isSigner: false, isWritable: true });
      }

      const remainingAccounts = custodies.concat(oracles);

      const transaction = await program.methods
        .addLiquidity({
          amountIn: new BN(amount),
          minLpAmountOut: new BN(1),
          poolName: "SOL-USDC",
        })
        .accountsPartial({
          owner: publicKey,
          fundingAccount: fundingAccount,
          custodyMint: asset,
          custodyOracleAccount: custodyData.oracle,
        })
        .remainingAccounts(remainingAccounts)
        .transaction();
      const latestBlockHash = await connection.getLatestBlockhash();
      // transaction.feePayer = publicKey;
      // let result = await connection.simulateTransaction(transaction);
      // console.log("result", result);
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

  const onRemoveLiquidity = async (
    amount: number,
    program: Program<OptionContract>,
    asset: PublicKey
  ) => {
    try {
      if (!program || !publicKey) return;
      if (!wallet) return;

      const [pool] = PublicKey.findProgramAddressSync(
        [Buffer.from("pool"), Buffer.from("SOL-USDC")],
        program.programId
      );
      const [custody] = PublicKey.findProgramAddressSync(
        [Buffer.from("custody"), pool.toBuffer(), asset.toBuffer()],
        program.programId
      );
      const poolData = await program.account.pool.fetch(pool);

      const custodyData = await program.account.custody.fetch(custody);
      const receivingAccount = getAssociatedTokenAddressSync(
        asset,
        wallet.publicKey
      );
      let custodies = [];
      let oracles = [];
      for await (let custody of poolData.custodies) {
        let c = await program.account.custody.fetch(new PublicKey(custody));
        let ora = c.oracle;
        custodies.push({ pubkey: custody, isSigner: false, isWritable: true });
        oracles.push({ pubkey: ora, isSigner: false, isWritable: true });
      }

      const remainingAccounts = custodies.concat(oracles);

      const transaction = await program.methods
        .removeLiquidity({
          removeAmount: new BN(amount),
          poolName: "SOL-USDC",
        })
        .accountsPartial({
          owner: publicKey,
          receivingAccount: receivingAccount,
          custodyMint: asset,
          custodyOracleAccount: custodyData.oracle,
        })
        .remainingAccounts(remainingAccounts)
        .transaction();
      const latestBlockHash = await connection.getLatestBlockhash();
      // transaction.feePayer = publicKey;
      // let result = await connection.simulateTransaction(transaction);
      // console.log("result", result);
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
        getCustodies,
        getDetailInfos,
        onOpenOption,
        onCloseOption,
        onClaimOption,
        onExerciseOption,
        onAddLiquidity,
        onRemoveLiquidity,
        getOptionDetailAccount,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
