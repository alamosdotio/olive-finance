'use client'
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { WalletIcon } from "@/public/svgs/icons";
import WalletModal from "./WalletModal";
import ProtectedRoute from "./ProtectedRoute";
import OpenFutures from "./OpenFutures";
import Pagination from "./Pagination";
import ExpiredFutures from "./ExpiredFutures";
import FuturesOrderHistory from "./FuturesOrderHistory";
import { futurePos, FuturePos, FuturesTransaction, futuresTx } from "@/lib/data/WalletActivity";


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

export default function FuturesPositions(){
    const [activeTab, setActiveTab] = useState('positions')
    const [currentPage, setCurrentPage] = useState(1)
    const [dummyTx, setDummyTx] = useState<FuturesTransaction[]>([])
    const [dummyPos, setDummyPos] = useState<FuturePos[]>([])

    useEffect(() => {
        setDummyTx(futuresTx)
        setDummyPos(futurePos)
    }, [])

    const itemsPerPage = 5

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = dummyPos.slice(indexOfFirstItem, indexOfLastItem)

    const orderHistoryItems = dummyTx.slice(indexOfFirstItem, indexOfLastItem)

    const handleClickTab = (value: string) => {
        setActiveTab(value);
        setCurrentPage(1);
    }

    return (
        <div className="w-full border rounded-sm flex flex-col mb-3">
            <section className="border-b rounded-none px-6 py-3">
                <Tabs defaultValue={activeTab} onValueChange={handleClickTab}>
                    <TabsList className="w-full flex justify-start bg-inherit text-secondary-foreground p-0 gap-2 md:gap-3 lg:gap-6">
                        <TabsTrigger
                            value="positions"
                            className="text-[11px] md:text-sm px-2 py-[2px] border-b rounded-none border-transparent data-[state=active]:border-primary"
                        >
                            Positions
                        </TabsTrigger>
                        <TabsTrigger
                            value="Orders"
                            className="text-[11px] md:text-sm px-2 py-[2px] border-b rounded-none border-transparent data-[state=active]:border-primary"
                        >
                            Orders
                        </TabsTrigger>
                        <TabsTrigger
                            value="expired" 
                            className="text-[11px] md:text-sm px-2 py-[2px] border-b rounded-none border-transparent data-[state=active]:border-primary"  
                        >
                            Expired
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
                {activeTab === 'positions' && (
                    <>
                        <section className="px-6 py-3 space-y-[10px]">
                            {currentItems.map((pos, idx) => (
                                <OpenFutures 
                                    key={idx} 
                                    token={pos.token.name} 
                                    logo={pos.logo} 
                                    symbol={pos.symbol} 
                                    type={pos.futureType} 
                                    position={pos.position} 
                                    leverage={pos.leverage}
                                    entry={pos.entryPrice}
                                    liquidation={pos.LiqPrice}
                                    size={pos.size}
                                    collateral={pos.collateral}
                                    tpsl={pos.TPSL}
                                    purchaseDate={pos.purchaseDate}
                                />
                            ))}
                        </section>
                        <div className="px-3 md:px-6 pb-4 w-full">
                            <Pagination
                                currentPage={currentPage}
                                totalItems={dummyPos.length}
                                itemsPerPage={itemsPerPage}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    </>
                )}
                {activeTab === 'expired' && (
                    <>
                        <section className="px-6 py-3 space-y-[10px]">
                            <ExpiredFutures />
                        </section>
                        <div className="px-3 md:px-6 pb-4 w-full hidden">
                            <Pagination
                                currentPage={currentPage}
                                totalItems={0}
                                itemsPerPage={itemsPerPage}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    </>
                )}
                {activeTab === 'history' && (
                    <>
                        <section className="px-6 py-3 space-y-[10px]">
                            <FuturesOrderHistory dummyFutures={orderHistoryItems}/>
                        </section>
                        <div className="px-3 md:px-6 pb-4 w-full">
                            <Pagination
                                currentPage={currentPage}
                                totalItems={dummyTx.length}
                                itemsPerPage={itemsPerPage}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    </>
                )}
            </ProtectedRoute>
        </div>
    )
}