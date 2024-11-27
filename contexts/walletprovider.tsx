'use client'

import { createContext, useCallback, useContext, useEffect, useState } from "react";


interface WalletContextType{
    isConnected: boolean;
    walletName: string | null;
    address: string | null;
    connect: (name: string) => void;
    disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const WalletProvider: React.FC<{children: React.ReactNode}> = ({children}) =>{
    const [isConnected, setIsConnected] = useState(false);
    const [walletName, setWalletName] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null)

    useEffect(() => {
        const savedConnection = localStorage.getItem('walletConnected');
        const savedWalletName = localStorage.getItem('walletName');
        const savedAddress = localStorage.getItem('walletAddress')
        if(savedConnection === 'true' && savedWalletName){
            setIsConnected(true)
            setWalletName(savedWalletName)
            setAddress(savedAddress);
        }
    }, [])

    const connect = useCallback((name: string) => {
        setTimeout(() => {
            const simulatedAddress = `${Array.from({length: 32}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
            setIsConnected(true);
            setWalletName(name)
            setAddress(simulatedAddress);
            localStorage.setItem('walletConnected', 'true')
            localStorage.setItem('walletName', name)
            localStorage.setItem('walletAddress', simulatedAddress);
        }, 1000)
    }, [])

    const disconnect = useCallback(() => {
        setIsConnected(false);
        setWalletName(null);
        setAddress(null)
        localStorage.removeItem('walletConnected');
        localStorage.removeItem('walletName')
        localStorage.removeItem('walletAddress');
    }, [])

    return (
        <WalletContext.Provider value={{isConnected, walletName, address,connect, disconnect}}>
            {children}
        </WalletContext.Provider>
    )
}

export function useWallet() {
    const context = useContext(WalletContext);
    if(context === undefined){
        throw new Error('useWallet must be used within a WalletProvider')
    }
    return context;
}