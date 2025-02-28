import { Separator } from "./ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { BoostIcon, GrayPointsIcon, PointsIcon, RankingIcon } from "@/public/svgs/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

interface PointsDropDownProps{
    setActive: (state: string) => void;
}

export default function PointsDropDown({setActive} : PointsDropDownProps){
    const router = useRouter()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false)
    const handleOpenChange = (open: boolean) => {
            setIsOpen(open)
        }
    
        const handleClickPoints = () => {
            router.push('/leaderboards')
            setIsOpen(false)
            setIsMobileOpen(false)
            setActive('leaderboards')
        }
    return (
        <div>
            <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
                <DropdownMenuTrigger asChild className="hidden sm:flex">
                    <div className={cn((isOpen ? 'border-[#FEEDCB] bg-[rgb(254,237,203,0.2)]' : 'border bg-inherit'),"border rounded-[12px] p-2 cursor-pointer flex justify-center items-center hover:border-[#FEEDCB] hover:bg-[rgb(254,237,203,0.2)]")}>
                        <PointsIcon />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[280px] p-5 bg-accent rounded-[20px] space-y-4 sm:flex flex-col hidden">
                    <div className="w-full flex flex-col p-3 border rounded-[12px]">
                        <div className="w-full flex flex-col justify-center items-center space-y-[6px]">
                            <span className="text-secondary-foreground text-xs font-medium">Season 1 Points</span>
                            <span className="text-primary text-2xl font-medium">1,953,676</span>
                            <div className="w-full flex justify-center items-center gap-1">
                                <BoostIcon />
                                <span className="text-xs text-foreground font-medium">6.9x Boost</span>
                            </div>
                        </div>
                        <div className="w-full py-3">
                            <Separator />
                        </div>
                        <div className="w-full flex flex-col space-y-3">
                            <div className="w-full flex justify-between items-center">
                                <div className="flex items-center gap-1">
                                    <RankingIcon />
                                    <span className="text-xs text-secondary-foreground font-medium">Ranking</span>
                                </div>
                                <span className="text-xs text-foreground font-medium">#16189</span>
                            </div>
                            <div className="w-full flex justify-between items-center">
                                <div className="flex items-center gap-1">
                                    <GrayPointsIcon />
                                    <span className="text-xs text-secondary-foreground font-medium">Points Per Day</span>
                                </div>
                                <span className="text-xs text-foreground font-medium">0</span>
                            </div>
                        </div>
                    </div>
                    <Button
                        className="bg-inherit border rounded-[12px] text-primary py-2 px-4 w-full text-xs font-medium shadow-none hover:border-primary"
                        onClick={()=>handleClickPoints()}
                    >
                        Go to leaderboard
                    </Button>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                <DialogTrigger asChild className="sm:hidden">
                    <div className={cn((isMobileOpen ? 'border-[#FEEDCB] bg-[rgb(254,237,203,0.2)]' : 'border bg-inherit'),"border rounded-[12px] p-2 cursor-pointer flex justify-center items-center hover:border-[#FEEDCB] hover:bg-[rgb(254,237,203,0.2)]")}>
                        <PointsIcon />
                    </div>
                </DialogTrigger>
                <DialogContent className="w-full h-full border-none outline outline-accent bg-accent py-0 px-3 flex flex-col justify-between space-y-3 gap-0">
                    <div className="w-full flex justify-between items-center px-0 py-2">
                        <DialogTitle className="text-base font-medium text-foreground">Points</DialogTitle>
                        <Button 
                            className="bg-secondary w-9 p-[9px] shadow-none [&_svg]:size-[18px] rounded-[12px] border"
                            onClick={() => setIsMobileOpen(false)}
                        >
                            <XIcon size={18} className="text-secondary-foreground"/>
                        </Button>
                    </div>
                    <div className="w-full h-full flex flex-col space-y-3">
                        <div className="w-full bg-background p-4 rounded-[12px]">
                            <div className="w-full flex flex-col space-y-[6px] justify-center items-center">
                                <span className="text-secondary-foreground text-xs font-medium">Season 1 Points</span>
                                <span className="text-primary text-2xl font-medium">1,953,676</span>
                                <div className="w-full flex justify-center items-center gap-1">
                                    <BoostIcon />
                                    <span className="text-xs text-foreground font-medium">6.9x Boost</span>
                                </div>
                            </div>
                            <div className="w-full py-4">
                                <Separator />
                            </div>
                            <div className="w-full flex flex-col space-y-4">
                                <div className="w-full flex justify-between items-center">
                                    <div className="flex items-center gap-1">
                                        <RankingIcon />
                                        <span className="text-xs text-secondary-foreground font-medium">Ranking</span>
                                    </div>
                                    <span className="text-xs text-foreground font-medium">#16189</span>
                                </div>
                                <div className="w-full flex justify-between items-center">
                                    <div className="flex items-center gap-1">
                                        <GrayPointsIcon />
                                        <span className="text-xs text-secondary-foreground font-medium">Points Per Day</span>
                                    </div>
                                    <span className="text-xs text-foreground font-medium">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pb-10 w-full">
                        <Button 
                            className="bg-inherit border rounded-[12px] text-primary py-2 px-4 w-full text-xs font-medium shadow-none hover:border-primary"
                            onClick={()=>handleClickPoints()}
                        >
                            Go to leaderboard
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}