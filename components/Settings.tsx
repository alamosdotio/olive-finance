import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import solscan from '@/public/images/solscan.png'
import { Button } from "./ui/button";
import Image from "next/image";
import { Input } from "./ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { ArrowDown, GreenCircleIcon, MoonIcon, PurpleCircleIcon, SettingsIcon, SunIcon } from "@/public/svgs/icons";

export default function Settings(){
    const [explorer, setExplorer] = useState<string>('Solscan')
    const [endpoint, setEndpoint] = useState<string>('Triton')
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
        <Dialog>
            <DialogTrigger>
                <div className="bg-secondary rounded-[12px] p-[9px]">
                    <SettingsIcon />
                </div>
            </DialogTrigger>
            <DialogContent className="w-[420px] p-5 border-none bg-accent flex flex-col sm:rounded-[20px]">
                <DialogTitle className="text-base font-medium text-foreground">
                    Settings
                </DialogTitle>
                <Separator className="bg-secondary"/>
                <div className="w-full flex flex-col space-y-5">
                    <div className="w-full flex flex-col space-y-[14px]">
                        <Label className="text-xs font-medium text-foreground">
                            Language
                        </Label>
                        <Select>
                            <SelectTrigger className="w-[190px] text-xs flex justify-between bg-secondary text-foreground">
                                <SelectValue placeholder='English'/>
                                <ArrowDown />
                            </SelectTrigger>
                            <SelectContent className="w-fit bg-secondary">
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
                                className={cn((explorer === 'Solscan' ? 'border-primary' : 'border-transparent'),"bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-[8px] border hover:border-primary")}
                                onClick={()=>handleExplorer('Solscan')}
                            >
                                <Image src={solscan} alt="solscan" width={13} height={13} className="rounded-full"/>
                                <span className="text-xs text-foreground font-normal">Solscan</span>
                            </Button>
                            <Button 
                                className={cn((explorer === 'Explorer' ? 'border-primary' : 'border-transparent'),"bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-[8px] border hover:border-primary")}
                                onClick={()=>handleExplorer('Explorer')}
                            >
                                <Image src={solscan} alt="solscan" width={13} height={13} className="rounded-full"/>
                                <span className="text-xs text-foreground font-normal">Explorer</span>
                            </Button>
                            <Button 
                                className={cn((explorer === 'FM' ? 'border-primary' : 'border-transparent'),"bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-[8px] border hover:border-primary")}
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
                                className={cn((endpoint === 'Triton' ? 'border-primary' : 'border-transparent'),"bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-[8px] border hover:border-primary")}
                                onClick={() => handleEndPoint('Triton')}
                            >
                                <span className="text-xs text-foreground font-normal">Triton</span>
                            </Button>
                            <Button
                                className={cn((endpoint === 'Helius' ? 'border-primary' : 'border-transparent'),"bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-[8px] border hover:border-primary")}
                                onClick={() => handleEndPoint('Helius')}
                            >
                                <span className="text-xs text-foreground font-normal">Helius</span>
                            </Button>
                            <Button
                                className={cn((endpoint === 'Custom' ? 'border-primary' : 'border-transparent'),"bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-[8px] border hover:border-primary")}
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
                            <Button className="bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-[8px] border border-transparent hover:border-primary">
                                <SunIcon />
                                <GreenCircleIcon />
                                <span className="text-xs text-foreground font-normal">Light Green</span>
                            </Button>
                            <Button className="bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-[8px] border border-transparent hover:border-primary">
                                <MoonIcon />
                                <GreenCircleIcon />
                                <span className="text-xs text-foreground font-normal">Dark Green</span>
                            </Button>
                        </div>
                        <div className="flex space-x-3">
                            <Button
                                 className={cn((theme === 'light' ? 'border-primary' : 'border-transparent'),"bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-[8px] border hover:border-primary")}
                                onClick={()=>setTheme('light')}
                            >
                                <SunIcon />
                                <PurpleCircleIcon />
                                <span className="text-xs text-foreground font-normal">Light Purple</span>
                            </Button>
                            <Button 
                                className={cn((theme === 'dark' ? 'border-primary' : 'border-transparent'),"bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-[8px] border hover:border-primary")}
                                onClick={()=>setTheme('dark')}
                            >
                                <MoonIcon />
                                <PurpleCircleIcon />
                                <span className="text-xs text-foreground font-normal">Dark Purple</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}