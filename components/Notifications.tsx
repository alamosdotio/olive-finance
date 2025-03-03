import { InfoIcon, NotificationIcon, RedCircle } from "@/public/svgs/icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
import { Separator } from "./ui/separator";

export default function Notifications(){
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none hidden sm:flex">
                    <div className="bg-secondary rounded-[12px] p-[9px] text-foreground hover:text-primary">
                        <NotificationIcon />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[392px] bg-accent rounded-[16px] flex flex-col p-0">
                    <div className="w-full px-5 py-3 shadow-lg">
                        <span className="text-foreground text-xs font-semibold">Notifications (2)</span>
                    </div>
                    <div className="w-full p-5">
                        <div className="w-full flex space-x-3">
                            <div className="p-[9px] bg-secondary rounded-[8px] h-fit text-primary">
                                <InfoIcon />
                            </div>
                            <span className="text-xs font-normal text-foreground">Lorem ipsum dolor sit amet conse. Urna dui enim turpis gravida. Elementum fermentum tin posuere.</span>
                            <div className="flex flex-col justify-between">
                                <div className="flex justify-end">
                                    <RedCircle />
                                </div>
                                <span className="flex text-xs text-secondary-foreground whitespace-nowrap">6 min ago</span>
                            </div>
                        </div>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger className="focus:outline-none sm:hidden">
                    <div className="bg-secondary rounded-[12px] p-[9px] text-foreground hover:text-primary">
                        <NotificationIcon />
                    </div>
                </DialogTrigger>
                <DialogContent className="w-full h-full border-none outline outline-accent bg-accent space-y-3 p-0 flex flex-col gap-0">
                    <div className="w-full flex justify-between items-center px-3 py-2">
                        <DialogTitle className="text-base font-medium text-foreground">Notifications</DialogTitle>
                        <Button 
                            className="bg-secondary w-9 p-[9px] shadow-none [&_svg]:size-[18px] rounded-[12px] border"
                            onClick={() => setIsOpen(false)}
                        >
                            <XIcon size={18} className="text-secondary-foreground"/>
                        </Button>
                    </div>
                    <div className="w-full px-3">
                        <div className="w-full">
                            <div className="w-full flex space-x-3">
                                <div className="p-[9px] bg-secondary rounded-[8px] h-fit text-primary">
                                    <InfoIcon />
                                </div>
                                <span className="text-xs font-normal text-foreground">Lorem ipsum dolor sit amet conse. Urna dui enim turpis gravida. Elementum fermentum tin posuere.</span>
                                <div className="flex flex-col justify-between">
                                    <div className="flex justify-end rounded-full">
                                        <RedCircle />
                                    </div>
                                    <span className="flex text-xs text-secondary-foreground whitespace-nowrap">6 min ago</span>
                                </div>
                            </div>
                            <Separator className="my-4"/>
                        </div>
                        <div className="w-full">
                            <div className="w-full flex space-x-3">
                                <div className="p-[9px] bg-secondary rounded-[8px] h-fit text-primary">
                                    <InfoIcon />
                                </div>
                                <span className="text-xs font-normal text-foreground">Lorem ipsum dolor sit amet conse. Urna dui enim turpis gravida. Elementum fermentum tin posuere.</span>
                                <div className="flex flex-col justify-between">
                                    <div className="flex justify-end rounded-full">
                                        
                                    </div>
                                    <span className="flex text-xs text-secondary-foreground whitespace-nowrap">10 min ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}