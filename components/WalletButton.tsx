'use client'

import Image from "next/image";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

interface WalletButtonProps{
    name: string,
    iconPath: string,
    onClick: () => void
}

export default function WalletButton({name, iconPath, onClick} : WalletButtonProps){
    const [icon, setIcon] = useState<string | null >(null);

    useEffect(() => {
        const path = iconPath.startsWith('/') ? iconPath : `/${iconPath}`
        setIcon(path)
      }, [iconPath])

    return (
        <Button
            variant="outline"
            className="flex items-center justify-start w-full h-[40px] px-[16px] py-[8px]"
            onClick={onClick}
        >
            <Image src={iconPath} alt={name} width={24} height={24} className="rounded-full" />
            <span className="text-sm font-normal text-center">{name}</span>
        </Button>
    )
}