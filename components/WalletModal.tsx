"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { cn } from "@/lib/utils";
import WalletButton from "./WalletButton";
import { useWallet } from "@solana/wallet-adapter-react";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Wallet {
  name: string;
  iconPath: string;
}

export const allWallets: Wallet[] = [
  { name: "Phantom", iconPath: "/images/phantom.png" },
  { name: "Solflare", iconPath: "/images/solflare.png" },
  { name: "Trust", iconPath: "/images/trust.png" },
];

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { select, wallets } = useWallet();
  const [isMoreWalletOpen, setIsMoreWalletOpen] = useState(false);
  const installedWallets = wallets.filter(
    (wallet) => wallet.readyState === "Installed"
  );
  const filterSet = new Set(
    installedWallets.map((item) => String(item.adapter.name))
  );
  const primaryWallets =
    installedWallets.length > 0
      ? allWallets.filter((item) => filterSet.has(item.name))
      : allWallets.slice(0, 0);
  const moreWallets =
    installedWallets.length > 0
      ? allWallets.filter((item) => !filterSet.has(item.name))
      : allWallets.slice(1);
  const handleWalletConnect = (walletName: string, iconPath: string) => {
    select(
      wallets.filter((value) => value.adapter.name === walletName)[0].adapter
        .name
    );
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90%] p-[40px]">
        <DialogHeader className="flex flex-row items-center justify-between pb-[20px]">
          <DialogTitle className="text-2xl">Connect Wallet</DialogTitle>
        </DialogHeader>
        <div className="space-y-10">
          <div className="space-y-5 flex flex-col justify-between">
            <div className="grid grid-cols-3 gap-5">
              {primaryWallets.map((wallet) => (
                <WalletButton
                  key={wallet.name}
                  {...wallet}
                  onClick={() =>
                    handleWalletConnect(wallet.name, wallet.iconPath)
                  }
                />
              ))}
            </div>
            <div
              id="more-wallets"
              className={cn(
                "grid grid-cols-3 gap-4 transition-all duration-200 mb-4",
                isMoreWalletOpen ? "opacity-100" : "hidden opacity-0"
              )}
            >
              {moreWallets.map((wallet) => (
                <WalletButton
                  key={wallet.name}
                  {...wallet}
                  onClick={() =>
                    handleWalletConnect(wallet.name, wallet.iconPath)
                  }
                />
              ))}
            </div>
          </div>
          <Button
            variant="selected"
            className="w-full flex justify-between"
            onClick={() => setIsMoreWalletOpen(!isMoreWalletOpen)}
          >
            {isMoreWalletOpen ? "Less" : "More"} Wallets
            {isMoreWalletOpen ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
