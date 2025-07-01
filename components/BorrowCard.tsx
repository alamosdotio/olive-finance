import { useState } from "react";
import { Button } from "./ui/button";

export function BorrowCard(){
    const [selectedType, setSelectedType] = useState('fixed');
    return (
        <div className="border rounded-sm rounded-t-none flex flex-col flex-1 py-0.5">
            <div className="flex-1 p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <Button
                        variant="outline"
                        className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-sm transition-all group border ${
                        selectedType === 'fixed' 
                            ? 'bg-primary/10 text-primary border-primary hover:bg-primary/20' 
                            : 'hover:border-secondary-foreground'
                        }`}
                        onClick={() => setSelectedType('fixed')}
                    >
                        <span className="text-base font-medium">Fixed</span>
                    </Button>
                    <Button
                        variant="outline"
                        className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-sm transition-all group border ${
                        selectedType === 'variable' 
                            ? 'bg-primary/10 text-primary border-primary hover:bg-primary/20' 
                            : 'hover:border-secondary-foreground'
                        }`}
                        onClick={() => setSelectedType('variable')}
                    >
                        <span className="text-base font-medium">Variable</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}