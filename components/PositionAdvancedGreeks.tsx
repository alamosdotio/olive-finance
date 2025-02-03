import { CharmIcon, ColorIcon, DualDeltaIcon, DualGammaIcon, ParmicharmaIcon, SpeedIcon, UltimaIcon, VannaIcon, VeraIcon, VetaIcon, VommaIcon, WIcon, ZommaIcon } from "@/public/svgs/icons";
import { Button } from "./ui/button";
import { Dialog, DialogTitle,  DialogContent, DialogTrigger } from "./ui/dialog";
import { useState } from "react";

export default function PositionAdvancedGreeks(){
    const [isOpen , setIsOpen] = useState(false)
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-inherit p-0 w-fit h-fit shadow-none">
                    <span className="text-sm font-medium text-primary">Show Advanced Greeks</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[420px] px-3 py-5 space-y-[14px] bg-accent sm:rounded-[20px] gap-0">
                <DialogTitle>
                    <span className="text-base font-medium text-foreground">Advanced Greeks</span>
                </DialogTitle>
                <div className="w-full flex flex-col space-y-2">
                    <div className="w-full px-2">
                        <div className="w-full border p-3 rounded-[14px] flex flex-col space-y-[6px]">
                            <h2 className="text-sm font-medium text-foreground">
                                Second Order 
                            </h2>
                            <div className="w-full flex flex-col">
                                <div className="w-full flex space-x-2 items-center">
                                    <VannaIcon />
                                    <div className="w-full flex justify-between">
                                        <span className="text-sm font-normal text-secondary-foreground">Vanna</span>
                                        <span className="text-sm font-medium text-secondary-foreground">0.7914</span>
                                    </div>
                                </div>
                                <div className="w-full flex space-x-2 items-center">
                                    <CharmIcon />
                                    <div className="w-full flex justify-between">
                                        <span className="text-sm font-normal text-secondary-foreground">Charm</span>
                                        <span className="text-sm font-medium text-secondary-foreground">0.0723</span>
                                    </div>
                                </div>
                                <div className="w-full flex space-x-2 items-center">
                                    <VommaIcon />
                                    <div className="w-full flex justify-between">
                                        <span className="text-sm font-normal text-secondary-foreground">Vomma</span>
                                        <span className="text-sm font-medium text-secondary-foreground">-1.1042</span>
                                    </div>
                                </div>
                                <div className="w-full flex space-x-2 items-center">
                                    <VeraIcon />
                                    <div className="w-full flex justify-between">
                                        <span className="text-sm font-normal text-secondary-foreground">Vera</span>
                                        <span className="text-sm font-medium text-secondary-foreground">0.2471</span>
                                    </div>
                                </div>
                                <div className="w-full flex space-x-2 items-center">
                                    <VetaIcon />
                                    <div className="w-full flex justify-between">
                                        <span className="text-sm font-normal text-secondary-foreground">Veta</span>
                                        <span className="text-sm font-medium text-secondary-foreground">0.9812</span>
                                    </div>
                                </div>
                                <div className="w-full flex space-x-2 items-center">
                                    <DualDeltaIcon />
                                    <div className="w-full flex justify-between">
                                        <span className="text-sm font-normal text-secondary-foreground">Dual Delta</span>
                                        <span className="text-sm font-medium text-secondary-foreground">0.5489</span>
                                    </div>
                                </div>
                                <div className="w-full flex space-x-2 items-center">
                                    <DualGammaIcon />
                                    <div className="w-full flex justify-between">
                                        <span className="text-sm font-normal text-secondary-foreground">Dual Gamma</span>
                                        <span className="text-sm font-medium text-secondary-foreground">0.5489</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-2">
                        <div className="w-full border p-3 rounded-[14px] flex flex-col space-y-[6px]">
                            <h2 className="text-sm font-medium text-foreground">
                                Third Order 
                            </h2>
                            <div className="w-full flex flex-col">
                                <div className="w-full flex space-x-2 items-center">
                                    <SpeedIcon />
                                    <div className="w-full flex justify-between">
                                        <span className="text-sm font-normal text-secondary-foreground">Speed</span>
                                        <span className="text-sm font-medium text-secondary-foreground">0.7914</span>
                                    </div>
                                </div>
                                <div className="w-full flex space-x-2 items-center">
                                    <ZommaIcon />
                                    <div className="w-full flex justify-between">
                                        <span className="text-sm font-normal text-secondary-foreground">Zomma</span>
                                        <span className="text-sm font-medium text-secondary-foreground">0.0723</span>
                                    </div>
                                </div>
                                <div className="w-full flex space-x-2 items-center">
                                    <ColorIcon />
                                    <div className="w-full flex justify-between">
                                        <span className="text-sm font-normal text-secondary-foreground">Color</span>
                                        <span className="text-sm font-medium text-secondary-foreground">-1.1042</span>
                                    </div>
                                </div>
                                <div className="w-full flex space-x-2 items-center">
                                    <UltimaIcon />
                                    <div className="w-full flex justify-between">
                                        <span className="text-sm font-normal text-secondary-foreground">Ultima</span>
                                        <span className="text-sm font-medium text-secondary-foreground">0.2471</span>
                                    </div>
                                </div>
                                <div className="w-full flex space-x-2 items-center">
                                    <ParmicharmaIcon />
                                    <div className="w-full flex justify-between">
                                        <span className="text-sm font-normal text-secondary-foreground">Parmicharma</span>
                                        <span className="text-sm font-medium text-secondary-foreground">0.9812</span>
                                    </div>
                                </div>
                                <div className="w-full flex space-x-2 items-center">
                                    <WIcon />
                                    <div className="w-full flex justify-between">
                                        <span className="text-sm font-normal text-secondary-foreground">W</span>
                                        <span className="text-sm font-medium text-secondary-foreground">0.9812</span>
                                    </div>
                                </div>                     
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-end">
                    <Button 
                        className="bg-inherit border px-4 py-2 shadow-none text-sm text-foreground rounded-[12px]"
                        onClick={() => setIsOpen(false)}
                    >
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}