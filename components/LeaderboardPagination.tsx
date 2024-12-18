import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export default function LeaderboardPagination(){
    return (
        <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
                <span>Showing</span>
                <Select>
                    <SelectTrigger className="bg-backgroundSecondary w-full px-3 py-[6px] flex justify-between items-center gap-2 rounded-[12px]">
                        <SelectValue placeholder="1-10"/>
                        <ChevronDown className="opacity-50" size={14}/>
                    </SelectTrigger>
                    <SelectContent className="w-full" align="start">
                        <SelectItem value="10">1-10</SelectItem>
                        <SelectItem value="20">2-20</SelectItem>
                    </SelectContent>
                </Select>
                <span>258,152</span>
            </div>
            <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg bg-secondary">
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="px-3 py-1 rounded-lg bg-backgroundSecondary">1</button>
                <button className="px-3 py-1 rounded-lg bg-backgroundSecondary">2</button>
                <button className="px-3 py-1 rounded-lg bg-backgroundSecondary">3</button>
                <span>...</span>
                <button className="px-3 py-1 rounded-lg bg-backgroundSecondary">5169</button>
                <button className="p-2 rounded-lg bg-secondary">
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}