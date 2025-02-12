import { ChevronDown, MenuIcon, XIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";
import { useState } from "react";
import { EarnIcon, MoreIcon, OptionsIcon } from "@/public/svgs/icons";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Separator } from "./ui/separator";

export default function NavBarMobile(){
    const [isOpen, setIsOpen] = useState(false)
    const [active, setActive] = useState<string>("Options");
    const [isDropped, setIsDropped] = useState(false)
    const router = useRouter()
    const handleClick = (state:string) =>{
        if(active!==state){
            setActive(state)
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="focus:outline-none md:hidden">
                <div className="bg-secondary rounded-[12px] p-[9px] text-foreground hover:text-primary">
                    <MenuIcon size={18} />
                </div>
            </DialogTrigger>
            <DialogContent className="w-full h-full bg-background flex flex-col p-0">
                <DialogTitle className="hidden">Navigation Menu</DialogTitle>
                <div className="px-3 py-2 w-full flex justify-between items-center">
                    <div className="w-[78px] h-[28px] flex items-center px-[6px] py-1">
                        <Image src='/images/logo-dark.png' alt="logo" width={65} height={21} />
                    </div>
                    <Button 
                        className="bg-secondary p-[9px] shadow-none [&_svg]:size-[18px] rounded-[12px]"
                        onClick={() => setIsOpen(false)}
                    >
                        <XIcon size={18} className="text-secondary-foreground"/>
                    </Button>
                </div>
                <div className="flex flex-col w-full px-3 space-y-3">
                    <Button 
                        className={cn(buttonVariants({variant: active === 'Options' ? 'active' : 'inactive'}),"bg-accent justify-start px-5 py-3 flex rounded-[12px]")}
                        onClick={() => {handleClick('Options'); router.push('/'); setIsOpen(false)}}
                    >
                        <OptionsIcon />
                        <h1 className="text-sm font-medium group-hover:text-primary">Options</h1>
                        <Badge className={cn((active === 'Options' ? 'border-primary text-gradient-primary' : 'border-secondary-foreground text-secondary-foreground'),"border text-[8px] px-1 py-[3px] rounded-[3px] h-4 bg-transparent text-center flex group-hover:border-primary group-hover:text-primary")}>BETA</Badge>
                    </Button>
                    <Button
                        className={cn(buttonVariants({variant: active === 'Earn' ? 'active' : 'inactive'}),"bg-accent justify-start px-5 py-3 flex rounded-[12px]")}
                        onClick={() => {handleClick('Earn'); router.push('/earn'); setIsOpen(false)}}
                    >
                        <EarnIcon />
                        <h1 className="text-sm font-medium">Earn</h1>
                        <Badge className="rounded-[4px] bg-gradient-primary px-1 py-[3px] text-background h-4 text-[8px] border-none">48% APY</Badge>
                    </Button>
                    <div className="w-full bg-accent rounded-[12px] p-0">
                        <Button 
                            className="w-full bg-accent px-5 py-3 flex justify-between text-secondary-foreground rounded-[12px] shadow-none"
                            onClick={() => setIsDropped(!isDropped)}
                        >
                            <div className="flex space-x-2 items-center">
                                <MoreIcon />
                                <h1 className="text-sm font-medium">More</h1>
                            </div>
                            <ChevronDown size={12}/>
                        </Button>
                        {isDropped && (
                            <div className="w-full px-5 py-3 pt-0 text-sm text-secondary-foreground flex flex-col">
                                <Separator className="mb-3"/>
                                <span>Menu Item</span>
                                <Separator className="my-3"/>
                                <span>Menu Item</span>
                                <Separator className="my-3"/>
                                <span>Menu Item</span>
                                <Separator className="my-3"/>
                                <span>Menu Item</span>
                            </div>
                        )}
                    </div>
                   
                   <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-accent justify-start text-secondary-foreground rounded-[12px]">
                            Settings
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="w-full h-full bg-accent flex flex-col p-0">
                        Content goes here
                    </DialogContent>
                   </Dialog>
                    
                </div>
            </DialogContent>
        </Dialog>
    )
}