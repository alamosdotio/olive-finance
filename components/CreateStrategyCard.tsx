'use client'

import { CircleCheck, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";



export default function CreateStrategyCard(){
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const router = useRouter();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='unselected' className="py-[6px] h-8 w-8 rounded-[10px]">
                    <Plus size={10}/>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-background">
                <DialogHeader className="flex flex-row items-center justify-between">
                    <DialogTitle className="text-foreground text-xl">I want to...</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <button 
                        className={`w-full p-4 text-left rounded-lg transition-colors bg-backgroundSecondary 
                            ${selectedOption === 'create-options-pool' ? 'border border-foreground' : 'hover:bg-secondary'}`}
                        onClick={() => setSelectedOption('create-options-pool')}
                    >
                        <div className="flex justify-between items-start">
                            <span className="text-foreground font-medium">Create Options Pool</span>
                            {selectedOption === 'create-options-pool' && (
                                    <CircleCheck className="text-foreground"/>
                            )}
                        </div>
                    </button>
                    <button 
                        className={`w-full p-4 text-left rounded-lg transition-colors bg-backgroundSecondary 
                            ${selectedOption === 'create-futures-pool' ? 'border border-foreground' : 'hover:bg-secondary'}`}
                        onClick={() => setSelectedOption('create-futures-pool')}
                    >
                        <div className="flex justify-between items-start">
                            <span className="text-foreground font-medium">Create Futures Pool</span>
                            {selectedOption === 'create-futures-pool' && (
                                <CircleCheck className="text-foreground"/>
                            )}
                        </div>
                    </button>
                    <button 
                        className={`w-full p-4 text-left rounded-lg transition-colors bg-backgroundSecondary 
                            ${selectedOption === 'create-exotic-pool' ? 'border border-foreground' : 'hover:bg-secondary'}`}
                        onClick={() => setSelectedOption('create-exotic-pool')}
                    >
                        <div className="flex justify-between items-start">
                            <span className="text-foreground font-medium">Create Exotic Options Pool</span>
                            {selectedOption === 'create-exotic-pool' && (
                                <CircleCheck className="text-foreground"/>
                            )}
                        </div>
                    </button>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                    <Button 
                        className="w-full bg-primary hover:opacity-85 text-black font-medium disabled:pointer-events-auto disabled:cursor-not-allowed disabled:bg-primary-foreground"
                        disabled={!selectedOption}
                        onClick={() => router.push(`/${selectedOption}`)}
                    >
                        Continue
                    </Button>
                    <DialogTrigger asChild>
                        <Button
                            variant='ghost'
                            className="text-foreground hover:text-red-500 hover:bg-secondary"
                        >
                            Cancel
                        </Button>
                    </DialogTrigger>
                </div>
            </DialogContent>
        </Dialog>
    )
}