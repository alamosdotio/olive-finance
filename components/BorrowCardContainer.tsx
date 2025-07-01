import { useState } from "react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ChevronDown } from "lucide-react";
import { BorrowCard } from "./BorrowCard";

export function BorrowCardContainer(){
    const [selectedType, setSelectedType] = useState<'borrow'|'payback'>('borrow');
      const [orderType, setOrderType] = useState<'market'|'limit'>('market');


    return (
        <div className="w-full h-full flex flex-col bg-background">
            <section className="w-full border border-b-0 rounded-sm rounded-b-none px-4 h-11 flex justify-between items-center">
                <div className="flex space-x-2 h-full">
                    <Button
                       className={`bg-inherit h-full shadow-none rounded-none border-b ${selectedType === 'borrow' ? 'border-primary text-primary' : 'border-transparent text-secondary-foreground hover:text-primary'}`}
                       onClick={() => setSelectedType('borrow')}
                    >
                        Borrow
                    </Button>
                    <Button
                       className={`bg-inherit h-full shadow-none rounded-none border-b ${selectedType === 'payback' ? 'border-primary text-primary' : 'border-transparent text-secondary-foreground hover:text-primary'}`}
                       onClick={() => setSelectedType('payback')}
                    >
                        Payback
                    </Button>
                </div>
                <Select defaultValue="market" onValueChange={(value) => {
                    if(value === 'market' || value === 'limit'){
                        setOrderType(value)
                    }
                }}>
                    <SelectTrigger className="w-fit space-x-2 bg-inherit border-0 focus:ring-0 focus:ring-offset-0">
                        <SelectValue />
                        <ChevronDown size={16} className="text-secondary-foreground"/>
                    </SelectTrigger>
                    <SelectContent align="end">
                        <SelectItem value="market">Market</SelectItem>
                        <SelectItem value="limit">Limit</SelectItem>
                    </SelectContent>
                </Select>
            </section>
            <BorrowCard
            
            />
        </div>
    )
}