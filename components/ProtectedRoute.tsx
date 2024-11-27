'use client'

import { useWallet } from "@/contexts/walletprovider"
import React from "react"

interface ProtectedRouteProps {
    children: React.ReactNode;
    fallback: React.ReactNode;
}

export default function ProtectedRoute({children, fallback} : ProtectedRouteProps){
    const { isConnected } = useWallet()

    if (!isConnected){
        return <>{fallback}</>
    }

    return <>{children}</>
}