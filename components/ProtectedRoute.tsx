'use client'

import { useWallet } from "@solana/wallet-adapter-react";
import React from "react"

interface ProtectedRouteProps {
    children: React.ReactNode;
    fallback: React.ReactNode;
}

export default function ProtectedRoute({children, fallback} : ProtectedRouteProps){
    const { connected } = useWallet()

    if (!connected){
        return <>{fallback}</>
    }

    return <>{children}</>
}