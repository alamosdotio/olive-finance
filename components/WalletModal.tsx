'use client'

import { useState } from "react"
import { Button } from "./ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { cn } from "@/lib/utils"
import WalletButton from "./WalletButton"
import { useWallet } from "@/contexts/walletprovider"


interface WalletModalProps {
    isOpen: boolean
    onClose: () => void
}

interface Wallet{
    name: string,
    iconPath: string,
}

const allWallets: Wallet[] = [
    { name: "Solfare", iconPath: "/images/solfare.png" },
    { name: "Phantom", iconPath: "/images/phantom.png" },
    { name: "Turnkey", iconPath: "/images/turnkey.png" },
    { name: "Backpack", iconPath: "/images/backpack.png" },
    { name: "Coinbase", iconPath: "/images/coinbase.png" },
    { name: "Ledger", iconPath: "/images/ledger.png" },
    { name: "Fuse", iconPath: "/images/fuse.png" },
    { name: "Dynamic", iconPath: "/images/dynamic.png" },
    { name: "Trezor", iconPath: "/images/trezor.png" },
    { name: "Capsule", iconPath: "/images/capsule.png" },
    { name: "OKX", iconPath: "/images/okx.png" },
    { name: "Keystone", iconPath: "/images/keystone.png" },
    { name: "Privy", iconPath: "/images/privy.png" },
    { name: "Web3Auth", iconPath: "/images/web3auth.png" },
    { name: "Bitget", iconPath: "/images/bitget.png" },
    { name: "Exodus", iconPath: "/images/exodus.png" },
    { name: "Circle", iconPath: "/images/circle.png" },
    { name: "Binance", iconPath: "/images/binance.png" },
    { name: "Brave", iconPath: "/images/brave.png" },
    { name: "Robinhood", iconPath: "/images/robinhood.png" },
    { name: "Gem", iconPath: "/images/gemwallet.png" },
    { name: "Tiplink", iconPath: "/images/tiplink.png" },
    { name: "Trust", iconPath: "/images/trust.png" },
    { name: "Okto", iconPath: "/images/okto.png" },
    { name: "Helium", iconPath: "/images/helium.png" },
    { name: "Decaf", iconPath: "/images/decaf.png" },
    { name: "WalletConnect", iconPath: "/images/walletconnect.png" },
]



export default function WalletModal({isOpen, onClose} : WalletModalProps){
    const [isMoreWalletOpen, setIsMoreWalletOpen] = useState(false);
    const primaryWallets = allWallets.slice(0,9);
    const moreWallets = allWallets.slice(9);
    const { connect } = useWallet();

    const handleWalletConnect = (walletName: string, iconPath: string) => {
        connect(walletName, iconPath);
        onClose();
    }

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
                                <WalletButton key={wallet.name} {...wallet} onClick={() => handleWalletConnect(wallet.name, wallet.iconPath)}/>
                            ))}
                        </div>
                        <div id="more-wallets"
                            className={cn(
                            "grid grid-cols-3 gap-4 transition-all duration-200 mb-4",
                            isMoreWalletOpen ? "opacity-100" : "hidden opacity-0"
                        )}>
                            {moreWallets.map((wallet) => (
                                <WalletButton key={wallet.name} {...wallet} onClick={() => handleWalletConnect(wallet.name, wallet.iconPath)}/>
                            ))}
                        </div>
                    </div>
                    <Button
                        variant="selected"
                        className="w-full flex justify-between"
                        onClick={() => setIsMoreWalletOpen(!isMoreWalletOpen)}
                    >
                        {isMoreWalletOpen ? "Less" : "More"} Wallets
                        {isMoreWalletOpen ? (<ChevronUp />):(<ChevronDown />)}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}