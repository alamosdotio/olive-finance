import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import ProtectedRoute from "./ProtectedRoute";
import { Button } from "./ui/button";
import { WalletIcon } from "@/public/svgs/icons";
import WalletModal from "./WalletModal";

const Fallback = () => {
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
    return(
        <div className="w-full m-auto p-6 flex h-[186px] justify-center items-center">
            <div className="flex flex-col gap-3 items-center">
                <span>To view your orders</span>
                <Button
                    onClick={() => setIsWalletModalOpen(true)}
                    className="text-background rounded-sm bg-primary hover:bg-gradient-primary"
                >
                    <WalletIcon />
                    <span className="text-sm font-semibold">Connect Wallet</span>
                </Button>
                <WalletModal 
                    isOpen={isWalletModalOpen} 
                    onClose={() => setIsWalletModalOpen(false)}
                />
            </div>
        </div>
    )
}

export function BorrowPositions(){
    const [activeTab, setActiveTab] = useState('borrows');

    const handleClickTab = (value: string) => {
        setActiveTab(value);
    }

    return (
        <div className="w-full border rounded-sm flex flex-col mb-3">
            <section className="border-b rounded-none px-6 py-3">
                <Tabs defaultValue={activeTab} onValueChange={handleClickTab}>
                    <TabsList className="w-full flex justify-start bg-inherit text-secondary-foreground p-0 gap-2 md:gap-3 lg:gap-6">
                        <TabsTrigger
                            value="borrows"
                            className="text-[11px] md:text-sm px-2 py-[2px] border-b rounded-none border-transparent data-[state=active]:border-primary"
                        >
                            Borrows
                        </TabsTrigger>
                        <TabsTrigger
                            value="orders"
                            className="text-[11px] md:text-sm px-2 py-[2px] border-b rounded-none border-transparent data-[state=active]:border-primary"
                        >
                            Orders
                        </TabsTrigger>
                        <TabsTrigger
                            value="liquidations"
                            className="text-[11px] md:text-sm px-2 py-[2px] border-b rounded-none border-transparent data-[state=active]:border-primary"
                        >
                            Liquidations
                        </TabsTrigger>
                        <TabsTrigger
                            value="history"
                            className="text-[11px] md:text-sm px-2 py-[2px] border-b rounded-none border-transparent data-[state=active]:border-primary"
                        >
                            History
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </section>
            <ProtectedRoute fallback={<Fallback />}>
                {activeTab === 'borrows' && (
                    <div className="h-[300px]">

                    </div>
                )}
                {activeTab === 'orders' && (
                    <div className="h-[300px]">

                    </div>
                )}
                {activeTab === 'liquidations' && (
                    <div className="h-[300px]">

                    </div>
                )}
                {activeTab === 'history' && (
                    <div className="h-[300px]">

                    </div>
                )}
            </ProtectedRoute>
        </div>
    )
}