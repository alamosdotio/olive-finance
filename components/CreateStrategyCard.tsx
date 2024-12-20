import { CircleCheck, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useState } from "react";

// interface CreateStrategyCardProps {
//     isOpen: boolean;
//     onClose: () => void
// }

export default function CreateStrategyCard(){
    const [selectedOption, setSelectedOption] = useState<string | null>(null)

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
                            ${selectedOption === 'options' ? 'border border-foreground' : 'hover:bg-secondary'}`}
                        onClick={() => setSelectedOption('options')}
                    >
                        <div className="flex justify-between items-start">
                            <span className="text-foreground font-medium">Create Options Pool</span>
                            {selectedOption === 'options' && (
                                <div className="flex items-center justify-center w-auto h-auto rounded-full bg-primary">
                                    <CircleCheck />
                                </div>
                            )}
                        </div>
                    </button>
                    <button 
                        className={`w-full p-4 text-left rounded-lg transition-colors bg-backgroundSecondary 
                            ${selectedOption === 'futures' ? 'border border-foreground' : 'hover:bg-secondary'}`}
                        onClick={() => setSelectedOption('futures')}
                    >
                        <div className="flex justify-between items-start">
                            <span className="text-foreground font-medium">Create Futures Pool</span>
                            {selectedOption === 'futures' && (
                                <div className="flex items-center justify-center w-auto h-auto rounded-full bg-primary">
                                    <CircleCheck />
                                </div>
                            )}
                        </div>
                    </button>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                    <Button 
                        className="w-full bg-primary hover:bg-primary-foreground text-foreground font-medium"
                        disabled={!selectedOption}
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