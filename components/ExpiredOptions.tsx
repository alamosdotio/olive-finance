import Image from "next/image";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { CallIconDark, PutIconDark } from "@/public/svgs/icons";
import { Separator } from "./ui/separator";

const expiredPositions = [
    {
        token: 'bitcoin', 
        transaction: 'Put',
        strikePrice: 60000,
        qty: 50,
        expiryPrice: 70000,
        tokenAmount: 60000,
        dollarAmount: 800,
        iconPath: '/images/bitcoin.png'
    },
    {
        token: 'ethereum', 
        transaction: 'Call',
        strikePrice: 2500,
        qty: 30,
        expiryPrice: 2600,
        tokenAmount: 2500,
        dollarAmount: 750,
        iconPath: '/images/ethereum.png'
    },
    {
        token: 'solana', 
        transaction: 'Put',
        strikePrice: 150,
        qty: 100,
        expiryPrice: 160,
        tokenAmount: 150,
        dollarAmount: 1200,
        iconPath: '/images/solana.png'
    },
    {
        token: 'chainlink', 
        transaction: 'Call',
        strikePrice: 50000,
        qty: 40,
        expiryPrice: 52000,
        tokenAmount: 50000,
        dollarAmount: 1000,
        iconPath: '/images/chainlink.png'
    },
    {
        token: 'dogwifhat', 
        transaction: 'Put',
        strikePrice: 0.3,
        qty: 500,
        expiryPrice: 0.35,
        tokenAmount: 0.3,
        dollarAmount: 200,
        iconPath: '/images/wif.png'
    },
    {
        token: 'render', 
        transaction: 'Call',
        strikePrice: 2,
        qty: 200,
        expiryPrice: 2.1,
        tokenAmount: 2,
        dollarAmount: 400,
        iconPath: '/images/render.png'
    },
    {
        token: 'bonk', 
        transaction: 'Put',
        strikePrice: 40,
        qty: 50,
        expiryPrice: 45,
        tokenAmount: 40,
        dollarAmount: 1000,
        iconPath: '/images/bonk.png'
    },
    {
        token: 'the graph', 
        transaction: 'Call',
        strikePrice: 300,
        qty: 10,
        expiryPrice: 320,
        tokenAmount: 300,
        dollarAmount: 1500,
        iconPath: '/images/grt.png'
    }
];



export default function ExpiredOptions(){
    return (
        <>
            <div className="hidden md:flex">
                <Table className="w-full">
                    <TableHeader className="w-full">
                        <TableRow className="text-xs font-medium">
                            <TableHead className="pl-5">Option</TableHead>
                            <TableHead>Strike Price</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Token Price at Expiry</TableHead>
                            <TableHead>Amount in Tokens</TableHead>
                            <TableHead>Amount in Dollars</TableHead>
                            <TableHead className="hidden">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="w-full">
                        {expiredPositions.map((pos, index) => (
                            <TableRow key={index} className="border-none">
                                <TableCell className="flex space-x-[10px] pl-5">
                                    <div className="flex -space-x-1">
                                        <Image src={pos.iconPath} alt={pos.token} width={20} height={20} className="rounded-full w-5 h-5 ring ring-background"/>
                                        <span className="rounded-full w-fit h-fit ring ring-background">
                                            {pos.transaction === 'Call' ? (
                                                <CallIconDark width="20" height="20"/>
                                            ) : (
                                                <PutIconDark width="20" height="20"/>
                                            )}
                                        </span>
                                        
                                    </div>
                                    <span>{pos.token[0].toUpperCase() + pos.token.slice(1)} {pos.transaction}</span>
                                </TableCell>
                                <TableCell>{pos.strikePrice}</TableCell>
                                <TableCell>{pos.qty}</TableCell>
                                <TableCell>{pos.expiryPrice}</TableCell>
                                <TableCell>{pos.tokenAmount}</TableCell>
                                <TableCell>{pos.dollarAmount}</TableCell>
                                <TableCell>
                                    <Button className="bg-inherit border border-primary-foreground px-[10px] py-1 w-fit h-fit shadow-none rounded-[8px] text-primary text-xs font-medium">
                                        Claim
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="w-full md:hidden flex flex-col p-3">
                {expiredPositions.map((pos, index) => (
                    <div key={index} className="w-full flex flex-col">
                        <div className="w-full flex flex-col space-y-[10px]">
                            <div className="flex space-x-[10px]">
                                <div className="flex -space-x-1">
                                    <Image src={pos.iconPath} alt={pos.token} width={24} height={24} className="rounded-full w-6 h-6 ring ring-background"/>
                                    <span className="rounded-full w-fit h-fit ring ring-background">
                                        {pos.transaction === 'Call' ? (
                                            <CallIconDark width="24" height="24"/>
                                        ) : (
                                            <PutIconDark width="24" height="24"/>
                                        )}
                                    </span>
                                </div>
                                <span>{pos.token[0].toUpperCase() + pos.token.slice(1)} {pos.transaction}</span>
                            </div>
                            <div className="flex space-x-[14px]">
                                <div className="w-full flex flex-col space-y-1">
                                    <span>Strike Price</span>
                                    <span>{pos.strikePrice}</span>
                                </div>
                                <div className="w-full flex flex-col space-y-1">
                                    <span>Quantity</span>
                                    <span>{pos.qty}</span>
                                </div>
                            </div>
                            <div className="flex space-x-[14px]">
                                <div className="w-full flex flex-col space-y-1">
                                    <span>Token Price at Expiry</span>
                                    <span>{pos.expiryPrice}</span>
                                </div>
                                <div className="w-full flex flex-col space-y-1">
                                    <span>Amount in Tokens</span>
                                    <span>{pos.tokenAmount}</span>
                                </div>
                            </div>
                            <div className="flex space-x-[14px]">
                                <div className="w-full flex flex-col space-y-1">
                                    <span>Amount in Dollars</span>
                                    <span>{pos.dollarAmount}</span>
                                </div>
                            </div>
                            <Button className="bg-inherit border border-primary-foreground px-[10px] py-1 w-full h-fit shadow-none rounded-[8px] text-primary text-xs font-medium">
                                Claim
                            </Button>
                        </div>
                        <Separator className="my-5"/>
                    </div>
                ))}
            </div>
        </>
    )
}