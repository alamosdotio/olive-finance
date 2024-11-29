'use client'

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import PortfolioStat from "@/components/PortfolioStat"
import PortfolioCards from "@/components/PortfolioCards"
import { useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Card, CardContent } from "@/components/ui/card"
import { useWallet } from "@/contexts/walletprovider"
import WalletModal from "@/components/WalletModal"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"




export default function PortfolioPage(){
    const [active, setActive] = useState<string>("Positions")
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)

    const handleClickActive = (state:string) =>{
        if(state!==active){
            setActive(state);
        }
    }

    const ConnectWalletFallback = () => (
        <div className="flex flex-col items-center justify-center">
            <Card className="w-1/3 max-wd-md m-auto mt-8">
            <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-center">Connect Wallet to See Your Portfolio</h2>
                <p className="text-center text-gray-600">You need to connect your wallet to view and manage your portfolio</p>
                <Button variant='selected' onClick={() => setIsWalletModalOpen(true)}>
                    Connect Wallet
                </Button>
            </CardContent>
            </Card>
        </div>

    )

    return (
        <div className="space-y-6">
            <ProtectedRoute fallback={<ConnectWalletFallback />}>
                <h1 className="text-3xl font-semibold">Portfolio Dashboard</h1>
                <PortfolioStat />
                <div className="flex justify-start gap-3">
                    <Button
                        className={cn(buttonVariants({variant: active === 'Positions' ? 'selected' : 'unselected'}))}
                        onClick={()=>handleClickActive('Positions')}
                    >Position</Button>
                    <Button
                        className={cn(buttonVariants({variant: active === 'Transactions' ? 'selected' : 'unselected'}))}
                        onClick={()=>handleClickActive('Transactions')}
                    >Transaction History</Button>
                </div>
                <div className="flex flex-col space-y-6">
                    <div className="flex justify-between items-center">
                        <h1 className="font-semibold text-3xl">Open Positions</h1>
                        <div className="flex gap-4 items-center">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="text" 
                                    placeholder="Search..." 
                                    className="w-auto rounded-md border border-border bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground"
                                />
                            </div>
                            <Button variant='unselected'>Add</Button>
                        </div>
                    </div>
                    <PortfolioCards />
                </div>
            </ProtectedRoute>
            <WalletModal 
                isOpen={isWalletModalOpen}
                onClose={() => setIsWalletModalOpen(false)}
            />
        </div>
    )
}