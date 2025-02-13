import { XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import solscan from '@/public/images/solscan.png'
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowDown, GreenCircleIcon, MoonIcon, PurpleCircleIcon, SunIcon } from "@/public/svgs/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Input } from "./ui/input";
import { useTheme } from "next-themes";

export default function SettingsMobile(){
    const [explorer, setExplorer] = useState<string>('Solscan')
    const [endpoint, setEndpoint] = useState<string>('Triton')
    const [isOpen, setIsOpen] = useState(false)
    const { theme, setTheme } = useTheme()

    const handleExplorer = (value:string) => {
        if(explorer !== value){
            setExplorer(value)
        }
    }

    const handleEndPoint = (value:string) => {
        if(endpoint !== value){
            setEndpoint(value)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-accent justify-start text-secondary-foreground rounded-[12px]">
                    Settings
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full h-full bg-accent flex flex-col p-0 space-y-5 gap-0 px-3">
                <div className="w-full flex flex-col space-y-3">
                    <div className="py-2 w-full flex justify-between items-center border-b">
                        <DialogTitle className="text-base font-medium">Settings</DialogTitle>
                        <Button 
                            className="bg-secondary p-[9px] shadow-none [&_svg]:size-[18px] rounded-[12px] border"
                            onClick={() => setIsOpen(false)}
                        >
                            <XIcon size={18} className="text-secondary-foreground"/>
                        </Button>
                    </div>
                    <Label className="text-xs font-medium">Language</Label>
                    <Select>
                        <SelectTrigger className="w-full text-xs flex justify-between bg-secondary text-foreground px-3 py-2">
                            <SelectValue placeholder='English'/>
                            <span className="text-secondary-foreground">
                                <ArrowDown />
                            </span>
                        </SelectTrigger>
                        <SelectContent align="center" className="w-fit bg-secondary">
                            <SelectItem className='text-xs text-foreground'value="eng">English</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-full flex flex-col space-y-3">
                    <Label className="text-xs font-medium text-foreground">
                        Preferred Explorer
                    </Label>
                    <div className="flex space-x-3">
                        <Button
                            className={cn((explorer === 'Solscan' ? 'border-primary' : 'border-transparent'),"w-full bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-[8px] border hover:border-primary")}
                            onClick={()=>handleExplorer('Solscan')}
                        >
                            <Image src={solscan} alt="solscan" width={13} height={13} className="rounded-full"/>
                            <span className="text-xs text-foreground font-normal">Solscan</span>
                        </Button>
                        <Button 
                            className={cn((explorer === 'Explorer' ? 'border-primary' : 'border-transparent'),"w-full bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-[8px] border hover:border-primary")}
                            onClick={()=>handleExplorer('Explorer')}
                        >
                            <Image src={solscan} alt="solscan" width={13} height={13} className="rounded-full"/>
                            <span className="text-xs text-foreground font-normal">Explorer</span>
                        </Button>
                        <Button 
                            className={cn((explorer === 'FM' ? 'border-primary' : 'border-transparent'),"w-full bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-[8px] border hover:border-primary")}
                            onClick={()=>handleExplorer('FM')}
                        >
                            <Image src={solscan} alt="solscan" width={13} height={13} className="rounded-full"/>
                            <span className="text-xs text-foreground font-normal">Solana FM</span>
                        </Button>
                    </div>
                </div>
                <div className="w-full flex flex-col space-y-3">
                    <Label className="text-xs font-medium text-foreground">
                        RPC Endpoint
                    </Label>
                    <div className="flex space-x-3">
                        <Button 
                            className={cn((endpoint === 'Triton' ? 'border-primary' : 'border-transparent'),"w-full bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-[8px] border hover:border-primary")}
                            onClick={() => handleEndPoint('Triton')}
                        >
                            <span className="text-xs text-foreground font-normal">Triton</span>
                        </Button>
                        <Button
                            className={cn((endpoint === 'Helius' ? 'border-primary' : 'border-transparent'),"w-full bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-[8px] border hover:border-primary")}
                            onClick={() => handleEndPoint('Helius')}
                        >
                            <span className="text-xs text-foreground font-normal">Helius</span>
                        </Button>
                        <Button
                            className={cn((endpoint === 'Custom' ? 'border-primary' : 'border-transparent'),"w-full bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-[8px] border hover:border-primary")}
                            onClick={() => handleEndPoint('Custom')}
                        >
                            <span className="text-xs text-foreground font-normal">Custom</span>
                        </Button>
                    </div>
                    <Input
                        type='string'
                        placeholder="https://raydium-raydium-5ad5.mainnet.rpcpool.com/"
                        className="bg-secondary border-none py-2 px-3 text-xs placeholder:text-muted"
                        disabled={endpoint!=='Custom'}
                    />
                </div>
                <div className="w-full flex flex-col space-y-3">
                    <Label className="text-xs font-medium text-foreground">
                        Color Theme
                    </Label>
                    <div className="flex space-x-3">
                        <Button
                                className={cn((theme === 'light-green' ? 'border-primary' : 'border-transparent'),"w-full bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-[8px] border hover:border-primary")}
                            onClick={()=>setTheme('light-green')}
                        >
                            <SunIcon />
                            <GreenCircleIcon />
                            <span className="text-xs text-foreground font-normal">Light Green</span>
                        </Button>
                        <Button 
                            className={cn((theme === 'dark-green' ? 'border-primary' : 'border-transparent'),"w-full bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-[8px] border hover:border-primary")}
                            onClick={()=>setTheme('dark-green')}
                        >
                            <MoonIcon />
                            <GreenCircleIcon />
                            <span className="text-xs text-foreground font-normal">Dark Green</span>
                        </Button>
                    </div>
                    <div className="flex space-x-3">
                        <Button
                                className={cn((theme === 'light-purple' ? 'border-primary' : 'border-transparent'),"w-full bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-[8px] border hover:border-primary")}
                            onClick={()=>setTheme('light-purple')}
                        >
                            <SunIcon />
                            <PurpleCircleIcon />
                            <span className="text-xs text-foreground font-normal">Light Purple</span>
                        </Button>
                        <Button 
                            className={cn((theme === 'dark-purple' ? 'border-primary' : 'border-transparent'),"w-full bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-[8px] border hover:border-primary")}
                            onClick={()=>setTheme('dark-purple')}
                        >
                            <MoonIcon />
                            <PurpleCircleIcon />
                            <span className="text-xs text-foreground font-normal">Dark Purple</span>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}