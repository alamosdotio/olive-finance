import { useState } from "react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ChevronDown } from "lucide-react";
import FutureCard from "./FutureCard";

export default function FutureCardContainer(){
    const [selectedTrade, setSelectedTrade] = useState('perps')
    return (
        <main className="w-full h-full flex flex-col">
            <section className="w-full border border-b-0 rounded-sm rounded-b-none px-4 h-[45px] flex justify-between items-center">
                <div className="flex space-x-2 h-full">
                    <Button 
                        className={`bg-inherit h-full shadow-none rounded-none border-b ${selectedTrade === 'perps' ? 'border-primary text-primary' : 'border-transparent text-secondary-foreground'}`}
                        onClick={() => setSelectedTrade('perps')}
                    >
                        Perps
                    </Button>
                    <Button 
                        className={`bg-inherit h-full shadow-none rounded-none border-b ${selectedTrade === 'dated' ? 'border-primary text-primary' : 'border-transparent text-secondary-foreground'}`}
                        onClick={() => setSelectedTrade('dated')}
                    >
                        Dated
                    </Button>
                </div>
                <Select defaultValue={'market'}>
                    <SelectTrigger className="w-fit bg-inherit flex space-x-2 items-center text-secondary-foreground focus:outline-none">
                        <SelectValue />
                        <ChevronDown size={16}/>
                    </SelectTrigger>
                    <SelectContent align="end">
                        <SelectItem value="market">Market</SelectItem>
                        <SelectItem value="limit">Limit</SelectItem>
                    </SelectContent>
                </Select>
            </section>
            <FutureCard />
        </main>
    )
}