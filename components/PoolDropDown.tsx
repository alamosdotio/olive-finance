import Image from "next/image";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

interface PoolDropDownProps{
    isOpen: boolean;
    handleOpenChange: (state: boolean) => void;
    poolDatas: any;
    selectedToken: number;
    logo: string;
    handleClickToken: (idx: number) => void;
}

export default function PoolDropdown({
    isOpen, 
    handleOpenChange,
    poolDatas,
    selectedToken,
    logo,
    handleClickToken,
} : PoolDropDownProps){
    return (
        <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
            <DropdownMenuTrigger asChild>
                <Button className="w-fit h-fit rounded-full bg-transparent flex p-0">
                <Image
                    src={poolDatas ? poolDatas[selectedToken].img : logo}
                    alt={"Sol"}
                    width={20}
                    height={20}
                    className="rounded-full w-6 h-6"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="start"
                className="w-[420px] py-5 px-3 bg-accent rounded-sm"
            >
                <div className="w-full flex flex-col space-y-4 px-2">
                <div className="w-full flex flex-col space-y-3">
                    <div className="flex w-full h-fit space-x-2 items-center px-4 py-[10px] rounded-sm text-sm text-secondary-foreground bg-secondary border focus-within:border-primary">
                    <Input
                        type="text"
                        placeholder="Search Token"
                        className="h-fit border-none p-0 shadow-none rounded-none text-foreground placeholder:text-secondary-foreground"
                    />
                    <Search size={16} className="w-4 h-4 text-foreground" />
                    </div>
                    <div className="w-full flex space-x-[10px]">
                    {poolDatas &&
                        poolDatas.map((token: any, index: number) => (
                        <div
                            key={index}
                            className="w-fit flex items-center p-2 space-x-[6px] bg-secondary rounded-[8px] cursor-pointer"
                            onClick={() => handleClickToken(index)}
                        >
                            <Image
                            src={token.img}
                            alt={token.name}
                            width={16}
                            height={16}
                            className="rounded-full"
                            />
                            <span className="text-sm">{token.symbol}</span>
                        </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-between text-xs font-normal text-secondary-foreground">
                    <span>All Tokens</span>
                    <span>Balance</span>
                </div>
                </div>
                {poolDatas &&
                poolDatas.map((token: any, index: number) => (
                    <div
                    key={index}
                    onClick={() => handleClickToken(index)}
                    className="w-full h-fit rounded-[8px] p-2 flex justify-between space-x-4 hover:bg-secondary cursor-pointer"
                    >
                    <div className="flex items-center space-x-[6px]">
                        <Image
                        src={token.img}
                        alt={token.name}
                        width={28}
                        height={28}
                        className="w-7 h-7 rounded-full"
                        />
                        <div className="flex flex-col justify-center space-y-0 h-8">
                        <div className="flex space-x-1 items-center h-fit">
                            <span className="text-base text-foreground font-medium">
                            {token.symbol}
                            </span>
                        </div>
                        <span className="text-xs text-secondary-foreground font-medium">
                            {token.name}
                        </span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center space-y-0 h-8">
                        <div className="flex space-x-1 text-sm font-medium text-foreground">
                        <span>0.346371829</span>
                        <span>•</span>
                        <span>$87.29</span>
                        </div>
                        <span className="text-xs font-medium text-secondary-foreground text-end">
                        EPjFWd...yTDt1v
                        </span>
                    </div>
                    </div>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}