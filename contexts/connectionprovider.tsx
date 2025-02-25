"use client"
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { TrustWalletAdapter } from "@solana/wallet-adapter-trust";
import { SafePalWalletAdapter } from "@solana/wallet-adapter-safepal";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { TorusWalletAdapter } from "@solana/wallet-adapter-torus";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";

export default ({ children }: { children: React.ReactNode }) => {
  const network = WalletAdapterNetwork.Mainnet;
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TrustWalletAdapter(),
      // new SafePalWalletAdapter(),
      // new TorusWalletAdapter(),
    ],
    [network]
  );
  const endpoint = useMemo(() => clusterApiUrl("devnet"), []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};
