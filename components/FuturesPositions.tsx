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
import { FuturesTransaction, futuresTx } from "@/lib/data/WalletActivity";

const DummyFutures = [
    {
        token: 'solana',  // Solana
        symbol: 'SOL',
        futureType: 'perps',  // perpetual futures
        position: 'long',
        entryPrice: 122.50,
        LiqPrice: 135.00,  // liquidation price for long
        size: 50,  // contract size
        collateral: 1500,  // margin used
        TPSL: 145.00,  // target price for take profit/stop loss
        logo: '/images/solana.png',  // Solana logo path
        leverage: 31
    },
    {
        token: 'bitcoin',  // Bitcoin
        symbol: 'BTC',
        futureType: 'dated',  // dated futures
        position: 'short',
        entryPrice: 35000.00,
        LiqPrice: 36000.00,  // liquidation price for short
        size: 0.5,  // contract size (in BTC)
        collateral: 15000,  // margin used
        TPSL: 34000.00,  // target price for short position
        logo: '/images/bitcoin.png',  // Bitcoin logo path
        leverage: 22.2
    },
    {
        token: 'dogwifhat',  // Wif (assumed to be a token)
        symbol: 'WIF',
        futureType: 'perps',  // perpetual futures
        position: 'long',
        entryPrice: 5.30,
        LiqPrice: 6.00,  // liquidation price for long
        size: 1000,  // contract size
        collateral: 5300,  // margin used
        TPSL: 6.50,  // target price for take profit/stop loss
        logo: '/images/wif.png',  // Wif logo path
        leverage: 10.2
    },
    {
        token: 'ethereum',  // Ethereum
        symbol: 'ETH',
        futureType: 'dated',  // dated futures
        position: 'short',
        entryPrice: 2500.00,
        LiqPrice: 2650.00,  // liquidation price for short
        size: 10,  // contract size (in ETH)
        collateral: 25000,  // margin used
        TPSL: 2400.00,  // target price for short position
        logo: '/images/ethereum.png',  // Ethereum logo path
        leverage: 11
    },
    {
        token: 'chainlink',  // Chainlink
        symbol: 'LINK',
        futureType: 'perps',  // perpetual futures
        position: 'long',
        entryPrice: 8.00,
        LiqPrice: 9.00,  // liquidation price for long
        size: 500,  // contract size (LINK)
        collateral: 4000,  // margin used
        TPSL: 10.00,  // target price for long position
        logo: '/images/chainlink.png',  // Chainlink logo path
        leverage: 14
    },
    {
        token: 'bonk',  // Bonk
        symbol: 'BONK',
        futureType: 'dated',  // dated futures
        position: 'short',
        entryPrice: 0.00000250,
        LiqPrice: 0.00000270,  // liquidation price for short
        size: 5000000,  // contract size (BONK)
        collateral: 12500,  // margin used
        TPSL: 0.00000200,  // target price for short position
        logo: '/images/bonk.png',  // Placeholder logo path for Bonk, change as needed
        leverage: 5
    },
];



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
    const [dummyFutures, setDummyFutures] = useState<FuturesTransaction[]>([])

    useEffect(() => {
        setDummyFutures(futuresTx)
    }, [])

    const itemsPerPage = 5

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = DummyFutures.slice(indexOfFirstItem, indexOfLastItem)

    const orderHistoryItems = dummyFutures.slice(indexOfFirstItem, indexOfLastItem)

    const handleClickTab = (value: string) => {
        setActiveTab(value);
        setCurrentPage(1);
    }

    return (
        <div className="w-full border rounded-sm flex flex-col mb-3">
            <section className="border-b rounded-none px-6 py-3">
                <Tabs defaultValue={activeTab} onValueChange={handleClickTab}>
                    <TabsList className="bg-inherit grid grid-cols-6 text-secondary-foreground py-0 gap-2 md:gap-6 h-fit">
                        <TabsTrigger
                            value="positions"
                            className="text-[11px] col-span-2 md:col-span-1 md:text-sm px-2 py-[2px] border-b rounded-none border-transparent data-[state=active]:border-primary"
                        >
                            Open Positions
                        </TabsTrigger>
                        <TabsTrigger
                            value="expired" 
                            className="text-[11px] col-span-2 md:col-span-1 md:text-sm px-2 py-[2px] border-b rounded-none border-transparent data-[state=active]:border-primary"  
                        >
                            Expired Positions
                        </TabsTrigger>
                        <TabsTrigger
                            value="history"
                            className="text-[11px] col-span-2 md:col-span-1 md:text-sm px-2 py-[2px] border-b rounded-none border-transparent data-[state=active]:border-primary"
                        >
                           Order History
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
                                    token={pos.token} 
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
                                />
                            ))}
                        </section>
                        <div className="px-3 md:px-6 pb-4 w-full">
                            <Pagination
                                currentPage={currentPage}
                                totalItems={DummyFutures.length}
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
                                totalItems={dummyFutures.length}
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