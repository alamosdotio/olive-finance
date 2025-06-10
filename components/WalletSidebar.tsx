"use client";

import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CopyIcon, LogOutIcon, SendIcon } from "@/public/svgs/icons";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import WalletPortfolio from "./WalletPortfolio";
import WalletActivity from "./WalletActivity";
import { useWallet } from "@solana/wallet-adapter-react";
import { allWallets } from "./WalletModal";
import { XIcon } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

export default function WalletSideBar() {
  const { wallet, publicKey, disconnect, connected } = useWallet();
  const [activeTab, setActiveTab] = useState<string>("portfolio");
  const [isOpen, setIsOpen] = useState(false)
  const [iconPath, setIconPath] = useState<string>("");
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };
  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
    }
    toast.success('Address Copied', {
      position: 'bottom-right'
    })
  };
  const handleClickTab = (state: string) => {
    if (activeTab !== state) {
      setActiveTab(state);
    }
  };
  const handleDisconnect = () => {
    toast.success('Wallet Disconnected', {
      position: 'bottom-right'
    })
    disconnect();
  }
  useEffect(() => {
    if (wallet) {
        setIconPath(allWallets.filter((value) => value.name === wallet.adapter.name)[0].iconPath);
    }
  }, [publicKey, connected]);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="w-full py-[5px] px-[15px] h-9 rounded-sm gap-2 text-foreground text-sm border bg-inherit hover:bg-primary-foreground hover:border-primary flex justify-center items-center">
          {iconPath && (
            <Image
              src={iconPath}
              alt="Wallet Icon"
              width={20}
              height={20}
              className="rounded-full"
            />
          )}
          {publicKey?.toBase58() ? truncateAddress(publicKey?.toBase58()) : "Connected"}
        </button>
      </SheetTrigger>
      <SheetContent className="bg-accent rounded-none md:rounded-l-sm p-6 space-y-4 w-full md:w-[550px]">
        <SheetTitle className="flex justify-between">
          <div className="flex space-x-2 items-center">
            {iconPath && (
              <Image src={iconPath} alt="Wallet Icon" width={20} height={20} />
            )}
            <span className="text-base text-foreground font-medium items-center pt-1">
              {publicKey?.toBase58() ? truncateAddress(publicKey?.toBase58()) : "Connected"}
            </span>
            <SendIcon />
          </div>
          <div className="flex space-x-3">
            <Button
              className="bg-secondary p-2 h-fit shadow-none rounded-sm"
              onClick={copyAddress}
            >
              <CopyIcon />
            </Button>
            <Button
              className="bg-secondary p-2 h-fit shadow-none rounded-sm"
              onClick={() => handleDisconnect()}
            >
              <LogOutIcon />
            </Button>
            <Button 
                className="bg-secondary p-2 h-fit shadow-none rounded-sm md:hidden"
                onClick={()=>setIsOpen(false)}
            >
                <XIcon className="text-foreground"/>
            </Button>
          </div>
        </SheetTitle>
        <div className="w-full flex space-x-4 justify-between">
          <div className="w-full flex flex-col p-4 bg-background rounded-sm space-y-2">
            <span className="text-sm text-secondary-foreground font-medium">
              Tokens
            </span>
            <span className="text-[28px] text-foreground font-medium">
              $10 567
            </span>
          </div>
          <div className="w-full flex flex-col p-4 bg-background rounded-sm space-y-2">
            <span className="text-sm text-secondary-foreground font-medium">
              Points
            </span>
            <span className="text-[28px] text-foreground font-medium">
              10 900
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col space-y-4">
          <Tabs defaultValue={activeTab}>
            <TabsList className="w-full grid grid-cols-2 h-fit bg-accent-foreground rounded-sm p-2">
              <TabsTrigger
                value="portfolio"
                className="border border-transparent rounded-sm px-5 py-[6px] text-sm data-[state=active]:border-primary"
                onClick={() => handleClickTab("portfolio")}
              >
                Portfolio
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="border border-transparent rounded-sm px-5 py-[6px] text-sm data-[state=active]:border-primary"
                onClick={() => handleClickTab("activity")}
              >
                Activity
              </TabsTrigger>
            </TabsList>
          </Tabs>
          {activeTab === "portfolio" ? <WalletPortfolio /> : <WalletActivity />}
        </div>
        <ToastContainer 
          theme="dark"
        />
      </SheetContent>
    </Sheet>
  );
}
