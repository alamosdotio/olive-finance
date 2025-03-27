import Image from "next/image";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export default function FutureCard(){
    const [selectedTx, setSelectedTx] = useState('long')
    return (
        <main className="border rounded-sm rounded-t-none w-full flex-grow flex flex-col p-6 space-y-6">
            <Dialog>
                <DialogTrigger className="w-auto bg-inherit text-foreground flex space-x-2 items-center">
                    <Image src={'/images/solana.png'} alt="logo" className="rounded-full" width={24} height={24}/>
                    <span className="font-semibold">SOL</span>
                    <ChevronDown size={16} className="text-secondary-foreground"/>
                </DialogTrigger>
            </Dialog>

            <section className="w-full flex space-x-2">
                <Button
                    variant={"outline"}
                    className={`w-full rounded-sm ${selectedTx === 'long' ? 'text-green-500 border-green-500' : 'text-secondary-foreground border-secondary-foreground'}`}
                    onClick={() => setSelectedTx('long')}
                >
                    Long
                </Button>
                <Button
                    variant={"outline"}
                    className={`w-full rounded-sm ${selectedTx === 'short' ? 'text-red-500 border-red-500' : 'text-secondary-foreground border-secondary-foreground'}`}
                    onClick={() => setSelectedTx('short')}
                >
                    Short
                </Button>
            </section>

            <Button className="w-full bg-gradient-primary text-black">
                Connect Wallet
            </Button>

        </main>
    )
}