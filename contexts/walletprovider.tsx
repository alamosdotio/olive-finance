'use client'

import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface WalletContextType{
    isConnected: boolean;
    walletName: string | null;
    address: string | null;
    iconPath: string | null;
    connect: (name: string, iconPath: string) => void;
    disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const WalletProvider1: React.FC<{children: React.ReactNode}> = ({children}) =>{
    const [isConnected, setIsConnected] = useState(false);
    const [walletName, setWalletName] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null)
    const [iconPath, setIconPath] = useState<string | null>(null);

    useEffect(() => {
        const savedConnection = localStorage.getItem('walletConnected');
        const savedWalletName = localStorage.getItem('walletName');
        const savedAddress = localStorage.getItem('walletAddress')
        const savedIconPath = localStorage.getItem('walletIconPath');
        if(savedConnection === 'true' && savedWalletName){
            setIsConnected(true)
            setWalletName(savedWalletName)
            setAddress(savedAddress);
            setIconPath(savedIconPath);
        }
    }, [])

    const connect = useCallback((name: string, iconPath: string) => {
        setTimeout(() => {
            const simulatedAddress = `${Array.from({length: 32}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
            setIsConnected(true);
            setWalletName(name)
            setAddress(simulatedAddress);
            setIconPath(iconPath);
            localStorage.setItem('walletConnected', 'true')
            localStorage.setItem('walletName', name)
            localStorage.setItem('walletAddress', simulatedAddress);
            localStorage.setItem('walletIconPath', iconPath);
        }, 1000)
    }, [])

    const disconnect = useCallback(() => {
        setIsConnected(false);
        setWalletName(null);
        setAddress(null)
        setIconPath(null);
        localStorage.removeItem('walletConnected');
        localStorage.removeItem('walletName')
        localStorage.removeItem('walletAddress');
        localStorage.removeItem('walletIconPath');
    }, [])

    return (
        <WalletContext.Provider value={{isConnected, walletName, address,iconPath, connect, disconnect}}>
            {children}
        </WalletContext.Provider>
    )
}

export function useWallet() {
    // const context = useContext(WalletContext);
    // if(context === undefined){
    //     throw new Error('useWallet must be used within a WalletProvider')
    // }
    return {
        isConnected: false,
        walletName: "Phantom",
        address: "o3lodkfeo0923okjsodf9u23498weur",
        iconPath: "",
        connect: (name: string, iconPath: string) => {console.log(name, iconPath)},
        disconnect: () => {console.log("disconnect")}
    };
}