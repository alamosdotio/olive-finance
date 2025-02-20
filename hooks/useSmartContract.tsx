"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import { Program, getProvider } from "@coral-xyz/anchor";
import * as idl from "../lib/idl/option_contract.json";
import { OptionContract } from "@/lib/idl/option_contract";
import { PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddressSync, NATIVE_MINT } from "@solana/spl-token";
import { USDC_MINT } from "@/utils/const";
const useSmartContract = () => {
  const { connected, publicKey } = useWallet();
  const [program, setProgram] = useState<Program<OptionContract>>();
  const [lp, setLp] = useState<PublicKey>();
  const [lpbump, setLpBump] = useState<Number>();
  const [users, setUsers] = useState<PublicKey>();
  const [lpWsolAta, setLpWsolAta] = useState<PublicKey>();
  const [lpUsdcAta, setLpUsdcAta] = useState<PublicKey>();
  const [userWsolAta, setUserWsolAta] = useState<PublicKey>();
  const [userUsdcAta, setUserUsdcAta] = useState<PublicKey>();
  const [optionIndex, setOptionIndex] = useState<Number>();
  const GetPDAInfo = useCallback(async () => {
    if (connected && publicKey != null) {
      const provider = getProvider();
      const program = new Program(idl as OptionContract, provider);
      setProgram(program);
      const [liquidity, lpbump] = PublicKey.findProgramAddressSync(
        [Buffer.from("lp")],
        program.programId
      );
      setLp(liquidity);
      setLpBump(lpbump);
      const [usersinfo] = PublicKey.findProgramAddressSync(
        [Buffer.from("users")],
        program.programId
      );
      setUsers(usersinfo);

      const lpWsolAta = getAssociatedTokenAddressSync(NATIVE_MINT, liquidity);
      setLpWsolAta(lpWsolAta);
      const lpUsdcAta = getAssociatedTokenAddressSync(USDC_MINT, liquidity);
      setLpUsdcAta(lpUsdcAta);

      const userWsolAta = getAssociatedTokenAddressSync(NATIVE_MINT, publicKey);
      const userUsdcAta = getAssociatedTokenAddressSync(USDC_MINT, publicKey);
      setUserWsolAta(userWsolAta);
      setUserUsdcAta(userUsdcAta);

      await getUserInfo();
    }
  }, [connected]);
  const getOptionDetailAccount = useCallback(
    (index: number) => {
      if (connected && publicKey != null && program) {
        const buffer = Buffer.alloc(8);
        buffer.writeUInt32LE(index);
        const [account] = PublicKey.findProgramAddressSync(
          [Buffer.from("option"), publicKey?.toBuffer(), buffer],
          program.programId
        );
        return account;
      }
    },
    [connected, program]
  );
  const getUserInfo = useCallback(async () => {
    if (connected && publicKey != null && program) {
      const [userPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("user"), publicKey.toBuffer()],
        program.programId
      );
      const userInfo = await program.account.user.fetch(userPDA.toBase58());
      setOptionIndex(userInfo.optionIndex.toNumber());
    }
  }, []);
  useEffect(() => {
    GetPDAInfo();
  }, [GetPDAInfo]);

  return [
    program,
    lp,
    lpbump,
    users,
    lpWsolAta,
    lpUsdcAta,
    userWsolAta,
    userUsdcAta,
    optionIndex,
    getOptionDetailAccount,
    getUserInfo,
  ];
};
