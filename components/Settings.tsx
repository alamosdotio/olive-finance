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
    const [fee, setFee] = useState<'medium' | 'high' | 'ultra' | 'custom'>('high')
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

    const handleFeeType = (value: 'medium' | 'high' | 'ultra' | 'custom') => {
        if(fee !== value){
            setFee(value)
        }
    }

    return (
        <Dialog>
            <DialogTrigger className="hidden sm:flex">
                <div className="bg-secondary rounded-sm p-[9px] text-foreground hover:text-primary">
                    <SettingsIcon />
                </div>
            </DialogTrigger>
            <DialogContent className="w-[420px] p-5 border-none bg-accent flex flex-col sm:rounded-sm">
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
                            <SelectTrigger className="w-[190px] text-xs flex justify-between bg-secondary text-foreground border hover:border-primary">
                                <SelectValue placeholder='English'/>
                                <span className="text-secondary-foreground">
                                    <ArrowDown />
                                </span>
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
                                className={cn((explorer === 'Solscan' ? 'border-primary' : 'border-transparent'),"bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-sm border hover:border-primary")}
                                onClick={()=>handleExplorer('Solscan')}
                            >
                                <Image src={solscan} alt="solscan" width={13} height={13} className="rounded-full"/>
                                <span className="text-xs text-foreground font-normal">Solscan</span>
                            </Button>
                            <Button 
                                className={cn((explorer === 'Explorer' ? 'border-primary' : 'border-transparent'),"bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-sm border hover:border-primary")}
                                onClick={()=>handleExplorer('Explorer')}
                            >
                                <Image src={solscan} alt="solscan" width={13} height={13} className="rounded-full"/>
                                <span className="text-xs text-foreground font-normal">Explorer</span>
                            </Button>
                            <Button 
                                className={cn((explorer === 'FM' ? 'border-primary' : 'border-transparent'),"bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-sm border hover:border-primary")}
                                onClick={()=>handleExplorer('FM')}
                            >
                                <Image src={solscan} alt="solscan" width={13} height={13} className="rounded-full"/>
                                <span className="text-xs text-foreground font-normal">Solana FM</span>
                            </Button>
                        </div>
                    </div>
                    <div className="w-full flex flex-col space-y-3">
                        <Label className="text-xs font-medium text-foreground">
                            Priority Fees
                        </Label>
                        <div className="flex space-x-3">
                            <Button
                                className={cn((fee === 'medium' ? 'border-primary' : 'border-transparent'),"bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-sm border hover:border-primary")}
                                onClick={()=>handleFeeType('medium')}
                            >
                                <span className="text-xs text-foreground font-normal">Medium</span>
                            </Button>
                            <Button 
                                className={cn((fee === 'high' ? 'border-primary' : 'border-transparent'),"bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-sm border hover:border-primary")}
                                onClick={()=>handleFeeType('high')}
                            >
                                <span className="text-xs text-foreground font-normal">High</span>
                            </Button>
                            <Button 
                                className={cn((fee === 'ultra' ? 'border-primary' : 'border-transparent'),"bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-sm border hover:border-primary")}
                                onClick={()=>handleFeeType('ultra')}
                            >
                                <span className="text-xs text-foreground font-normal">Ultra</span>
                            </Button>
                            <Button 
                                className={cn((fee === 'custom' ? 'border-primary' : 'border-transparent'),"bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-sm border hover:border-primary")}
                                onClick={()=>handleFeeType('custom')}
                            >
                                <span className="text-xs text-foreground font-normal">Custom</span>
                            </Button>
                        </div>
                        <Input
                            type='string'
                            placeholder="0.0001"
                            className="bg-secondary border rounded-sm py-2 px-3 text-xs placeholder:text-muted focus:border-primary"
                            disabled={fee!=='custom'}
                        />
                    </div>
                    <div className="w-full flex flex-col space-y-3">
                        <Label className="text-xs font-medium text-foreground">
                            RPC Endpoint
                        </Label>
                        <div className="flex space-x-3">
                            <Button 
                                className={cn((endpoint === 'Triton' ? 'border-primary' : 'border-transparent'),"bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-sm border hover:border-primary")}
                                onClick={() => handleEndPoint('Triton')}
                            >
                                <span className="text-xs text-foreground font-normal">Triton</span>
                            </Button>
                            <Button
                                className={cn((endpoint === 'Helius' ? 'border-primary' : 'border-transparent'),"bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-sm border hover:border-primary")}
                                onClick={() => handleEndPoint('Helius')}
                            >
                                <span className="text-xs text-foreground font-normal">Helius</span>
                            </Button>
                            <Button
                                className={cn((endpoint === 'Custom' ? 'border-primary' : 'border-transparent'),"bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-sm border hover:border-primary")}
                                onClick={() => handleEndPoint('Custom')}
                            >
                                <span className="text-xs text-foreground font-normal">Custom</span>
                            </Button>
                        </div>
                        <Input
                            type='string'
                            placeholder="https://raydium-raydium-5ad5.mainnet.rpcpool.com/"
                            className="bg-secondary border rounded-sm py-2 px-3 text-xs placeholder:text-muted focus:border-primary"
                            disabled={endpoint!=='Custom'}
                        />
                    </div>
                    <div className="w-full flex flex-col space-y-3">
                        <Label className="text-xs font-medium text-foreground">
                            Color Theme
                        </Label>
                        <div className="flex space-x-3">
                            <Button
                                 className={cn((theme === 'light-green' ? 'border-primary' : 'border-transparent'),"bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-sm border hover:border-primary")}
                                onClick={()=>setTheme('light-green')}
                            >
                                <SunIcon />
                                <GreenCircleIcon />
                                <span className="text-xs text-foreground font-normal">Light Green</span>
                            </Button>
                            <Button 
                                className={cn((theme === 'dark-green' ? 'border-primary' : 'border-transparent'),"bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-sm border hover:border-primary")}
                                onClick={()=>setTheme('dark-green')}
                            >
                                <MoonIcon />
                                <GreenCircleIcon />
                                <span className="text-xs text-foreground font-normal">Dark Green</span>
                            </Button>
                        </div>
                        <div className="flex space-x-3">
                            <Button
                                 className={cn((theme === 'light-purple' ? 'border-primary' : 'border-transparent'),"bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-sm border hover:border-primary")}
                                onClick={()=>setTheme('light-purple')}
                            >
                                <SunIcon />
                                <PurpleCircleIcon />
                                <span className="text-xs text-foreground font-normal">Light Purple</span>
                            </Button>
                            <Button 
                                className={cn((theme === 'dark-purple' ? 'border-primary' : 'border-transparent'),"bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-sm border hover:border-primary")}
                                onClick={()=>setTheme('dark-purple')}
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