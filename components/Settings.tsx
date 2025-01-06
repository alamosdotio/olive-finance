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
                <div className="bg-secondary rounded-[12px] p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M16.7484 7.68336C15.24 7.68336 14.6234 6.6167 15.3734 5.30836C15.8067 4.55003 15.5484 3.58336 14.79 3.15003L13.3484 2.32503C12.69 1.93336 11.84 2.1667 11.4484 2.82503L11.3567 2.98336C10.6067 4.2917 9.37337 4.2917 8.61504 2.98336L8.52337 2.82503C8.14837 2.1667 7.29837 1.93336 6.64004 2.32503L5.19837 3.15003C4.44004 3.58336 4.18171 4.55836 4.61504 5.3167C5.37337 6.6167 4.75671 7.68336 3.24837 7.68336C2.38171 7.68336 1.66504 8.3917 1.66504 9.2667V10.7334C1.66504 11.6 2.37337 12.3167 3.24837 12.3167C4.75671 12.3167 5.37337 13.3834 4.61504 14.6917C4.18171 15.45 4.44004 16.4167 5.19837 16.85L6.64004 17.675C7.29837 18.0667 8.14837 17.8334 8.54004 17.175L8.63171 17.0167C9.38171 15.7084 10.615 15.7084 11.3734 17.0167L11.465 17.175C11.8567 17.8334 12.7067 18.0667 13.365 17.675L14.8067 16.85C15.565 16.4167 15.8234 15.4417 15.39 14.6917C14.6317 13.3834 15.2484 12.3167 16.7567 12.3167C17.6234 12.3167 18.34 11.6084 18.34 10.7334V9.2667C18.3317 8.40003 17.6234 7.68336 16.7484 7.68336ZM9.99837 12.7084C8.50671 12.7084 7.29004 11.4917 7.29004 10C7.29004 8.50836 8.50671 7.2917 9.99837 7.2917C11.49 7.2917 12.7067 8.50836 12.7067 10C12.7067 11.4917 11.49 12.7084 9.99837 12.7084Z" fill="#C0BFC7"/>
                    </svg>
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <path d="M8.30001 3.72949L5.58335 6.44616C5.26251 6.76699 4.73751 6.76699 4.41668 6.44616L1.70001 3.72949" stroke="#808693" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 12.6663C8.16329 12.6664 8.3209 12.7263 8.44292 12.8348C8.56494 12.9433 8.6429 13.0928 8.662 13.255L8.66667 13.333V13.9997C8.66648 14.1696 8.60142 14.333 8.48477 14.4566C8.36813 14.5801 8.2087 14.6545 8.03907 14.6645C7.86945 14.6744 7.70242 14.6192 7.57212 14.5102C7.44181 14.4011 7.35807 14.2464 7.338 14.0777L7.33334 13.9997V13.333C7.33334 13.1562 7.40358 12.9866 7.5286 12.8616C7.65362 12.7366 7.82319 12.6663 8 12.6663ZM12.2087 11.273L12.2713 11.3283L12.738 11.795C12.8576 11.915 12.927 12.076 12.9322 12.2453C12.9373 12.4146 12.8779 12.5795 12.7658 12.7065C12.6538 12.8336 12.4976 12.9132 12.329 12.9293C12.1604 12.9453 11.992 12.8966 11.858 12.793L11.7953 12.7377L11.3287 12.271C11.2136 12.1562 11.1445 12.0032 11.1343 11.841C11.1241 11.6788 11.1735 11.5184 11.2733 11.3901C11.3731 11.2617 11.5163 11.1742 11.676 11.1441C11.8357 11.1139 12.001 11.1432 12.1407 11.2263L12.2087 11.273ZM4.67134 11.3283C4.78612 11.4431 4.85508 11.5959 4.86526 11.7579C4.87545 11.9199 4.82617 12.0801 4.72667 12.2083L4.67134 12.271L4.20467 12.7377C4.0847 12.8572 3.92371 12.9267 3.75441 12.9318C3.58512 12.937 3.4202 12.8775 3.29315 12.7655C3.16611 12.6535 3.08647 12.4973 3.0704 12.3287C3.05434 12.1601 3.10306 11.9917 3.20667 11.8577L3.262 11.795L3.72867 11.3283C3.85369 11.2034 4.02323 11.1332 4.2 11.1332C4.37678 11.1332 4.54632 11.2034 4.67134 11.3283ZM2.66667 7.33301C2.83659 7.3332 3.00003 7.39826 3.12358 7.51491C3.24714 7.63155 3.32149 7.79098 3.33145 7.9606C3.34141 8.13023 3.28622 8.29726 3.17716 8.42756C3.0681 8.55787 2.9134 8.64161 2.74467 8.66167L2.66667 8.66634H2C1.83008 8.66615 1.66665 8.60109 1.54309 8.48444C1.41953 8.3678 1.34518 8.20837 1.33522 8.03874C1.32526 7.86912 1.38045 7.70209 1.48951 7.57179C1.59857 7.44148 1.75327 7.35774 1.922 7.33767L2 7.33301H2.66667ZM14 7.33301C14.1699 7.3332 14.3334 7.39826 14.4569 7.51491C14.5805 7.63155 14.6548 7.79098 14.6648 7.9606C14.6747 8.13023 14.6196 8.29726 14.5105 8.42756C14.4014 8.55787 14.2467 8.64161 14.078 8.66167L14 8.66634H13.3333C13.1634 8.66615 13 8.60109 12.8764 8.48444C12.7529 8.3678 12.6785 8.20837 12.6686 8.03874C12.6586 7.86912 12.7138 7.70209 12.8228 7.57179C12.9319 7.44148 13.0866 7.35774 13.2553 7.33767L13.3333 7.33301H14ZM4.142 3.20634L4.20467 3.26167L4.67134 3.72834C4.7909 3.84831 4.86032 4.0093 4.86549 4.1786C4.87066 4.3479 4.81119 4.51282 4.69917 4.63986C4.58715 4.7669 4.43097 4.84654 4.26235 4.86261C4.09374 4.87867 3.92533 4.82995 3.79134 4.72634L3.72867 4.67101L3.262 4.20434C3.1474 4.08946 3.07863 3.93672 3.06858 3.77476C3.05854 3.6128 3.10791 3.45274 3.20745 3.32458C3.30698 3.19642 3.44984 3.10896 3.60925 3.0786C3.76866 3.04824 3.93366 3.07707 4.07334 3.15967L4.142 3.20634ZM12.738 3.26167C12.8528 3.37647 12.9217 3.5292 12.9319 3.69122C12.9421 3.85324 12.8928 4.01341 12.7933 4.14167L12.738 4.20434L12.2713 4.67101C12.1514 4.79057 11.9904 4.85999 11.8211 4.86516C11.6518 4.87033 11.4869 4.81086 11.3598 4.69884C11.2328 4.58682 11.1531 4.43064 11.1371 4.26202C11.121 4.09341 11.1697 3.925 11.2733 3.79101L11.3287 3.72834L11.7953 3.26167C11.9204 3.13669 12.0899 3.06648 12.2667 3.06648C12.4434 3.06648 12.613 3.13669 12.738 3.26167ZM8 1.33301C8.16329 1.33303 8.3209 1.39298 8.44292 1.50148C8.56494 1.60999 8.6429 1.75951 8.662 1.92167L8.66667 1.99967V2.66634C8.66648 2.83626 8.60142 2.9997 8.48477 3.12325C8.36813 3.24681 8.2087 3.32116 8.03907 3.33112C7.86945 3.34108 7.70242 3.28589 7.57212 3.17683C7.44181 3.06777 7.35807 2.91307 7.338 2.74434L7.33334 2.66634V1.99967C7.33334 1.82286 7.40358 1.65329 7.5286 1.52827C7.65362 1.40325 7.82319 1.33301 8 1.33301ZM8 4.66634C8.65312 4.6663 9.29186 4.85813 9.83689 5.21801C10.3819 5.57788 10.8092 6.08994 11.0657 6.69058C11.3222 7.29123 11.3966 7.95399 11.2797 8.59655C11.1627 9.23911 10.8596 9.83316 10.4079 10.3049C9.95621 10.7767 9.3759 11.1053 8.73903 11.2501C8.10215 11.3949 7.43678 11.3493 6.82556 11.1192C6.21434 10.889 5.6842 10.4844 5.30098 9.95552C4.91776 9.42664 4.69835 8.79684 4.67 8.14434L4.66667 7.99967L4.67 7.85501C4.70728 6.99684 5.07441 6.18619 5.69482 5.59211C6.31523 4.99804 7.14103 4.66639 8 4.66634Z" fill="#808693"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <circle cx="6" cy="6" r="5" fill="#CDF553"/>
                                </svg>
                                <span className="text-xs text-foreground font-normal">Light Green</span>
                            </Button>
                            <Button className="bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-[8px] border border-transparent hover:border-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M7.84243 3.32346C7.89006 3.25997 7.91825 3.18404 7.92359 3.10485C7.92893 3.02567 7.91118 2.94663 7.87251 2.87733C7.83383 2.80802 7.77588 2.75142 7.70569 2.71439C7.63549 2.67736 7.55606 2.66148 7.47702 2.66869C4.5155 2.93891 2.86242 5.26809 2.683 7.64924C2.50358 10.0348 3.79727 12.5587 6.75879 13.2102C9.86911 13.8939 13.0341 11.6583 13.3317 8.4807C13.3391 8.40202 13.3236 8.32289 13.2871 8.2528C13.2507 8.18271 13.1947 8.12465 13.126 8.08559C13.0573 8.04654 12.9788 8.02815 12.8999 8.03264C12.821 8.03713 12.7451 8.06431 12.6813 8.11091C11.1294 9.24268 9.35546 8.83078 8.23081 7.71488C7.10724 6.59952 6.69917 4.84908 7.84243 3.32346Z" fill="#808693"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <circle cx="6" cy="6" r="5" fill="#CDF553"/>
                                </svg>
                                <span className="text-xs text-foreground font-normal">Dark Green</span>
                            </Button>
                        </div>
                        <div className="flex space-x-3">
                            <Button
                                 className={cn((theme === 'light' ? 'border-primary' : 'border-transparent'),"bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-[8px] border hover:border-primary")}
                                onClick={()=>setTheme('light')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 12.6663C8.16329 12.6664 8.3209 12.7263 8.44292 12.8348C8.56494 12.9433 8.6429 13.0928 8.662 13.255L8.66667 13.333V13.9997C8.66648 14.1696 8.60142 14.333 8.48477 14.4566C8.36813 14.5801 8.2087 14.6545 8.03907 14.6645C7.86945 14.6744 7.70242 14.6192 7.57212 14.5102C7.44181 14.4011 7.35807 14.2464 7.338 14.0777L7.33334 13.9997V13.333C7.33334 13.1562 7.40358 12.9866 7.5286 12.8616C7.65362 12.7366 7.82319 12.6663 8 12.6663ZM12.2087 11.273L12.2713 11.3283L12.738 11.795C12.8576 11.915 12.927 12.076 12.9322 12.2453C12.9373 12.4146 12.8779 12.5795 12.7658 12.7065C12.6538 12.8336 12.4976 12.9132 12.329 12.9293C12.1604 12.9453 11.992 12.8966 11.858 12.793L11.7953 12.7377L11.3287 12.271C11.2136 12.1562 11.1445 12.0032 11.1343 11.841C11.1241 11.6788 11.1735 11.5184 11.2733 11.3901C11.3731 11.2617 11.5163 11.1742 11.676 11.1441C11.8357 11.1139 12.001 11.1432 12.1407 11.2263L12.2087 11.273ZM4.67134 11.3283C4.78612 11.4431 4.85508 11.5959 4.86526 11.7579C4.87545 11.9199 4.82617 12.0801 4.72667 12.2083L4.67134 12.271L4.20467 12.7377C4.0847 12.8572 3.92371 12.9267 3.75441 12.9318C3.58512 12.937 3.4202 12.8775 3.29315 12.7655C3.16611 12.6535 3.08647 12.4973 3.0704 12.3287C3.05434 12.1601 3.10306 11.9917 3.20667 11.8577L3.262 11.795L3.72867 11.3283C3.85369 11.2034 4.02323 11.1332 4.2 11.1332C4.37678 11.1332 4.54632 11.2034 4.67134 11.3283ZM2.66667 7.33301C2.83659 7.3332 3.00003 7.39826 3.12358 7.51491C3.24714 7.63155 3.32149 7.79098 3.33145 7.9606C3.34141 8.13023 3.28622 8.29726 3.17716 8.42756C3.0681 8.55787 2.9134 8.64161 2.74467 8.66167L2.66667 8.66634H2C1.83008 8.66615 1.66665 8.60109 1.54309 8.48444C1.41953 8.3678 1.34518 8.20837 1.33522 8.03874C1.32526 7.86912 1.38045 7.70209 1.48951 7.57179C1.59857 7.44148 1.75327 7.35774 1.922 7.33767L2 7.33301H2.66667ZM14 7.33301C14.1699 7.3332 14.3334 7.39826 14.4569 7.51491C14.5805 7.63155 14.6548 7.79098 14.6648 7.9606C14.6747 8.13023 14.6196 8.29726 14.5105 8.42756C14.4014 8.55787 14.2467 8.64161 14.078 8.66167L14 8.66634H13.3333C13.1634 8.66615 13 8.60109 12.8764 8.48444C12.7529 8.3678 12.6785 8.20837 12.6686 8.03874C12.6586 7.86912 12.7138 7.70209 12.8228 7.57179C12.9319 7.44148 13.0866 7.35774 13.2553 7.33767L13.3333 7.33301H14ZM4.142 3.20634L4.20467 3.26167L4.67134 3.72834C4.7909 3.84831 4.86032 4.0093 4.86549 4.1786C4.87066 4.3479 4.81119 4.51282 4.69917 4.63986C4.58715 4.7669 4.43097 4.84654 4.26235 4.86261C4.09374 4.87867 3.92533 4.82995 3.79134 4.72634L3.72867 4.67101L3.262 4.20434C3.1474 4.08946 3.07863 3.93672 3.06858 3.77476C3.05854 3.6128 3.10791 3.45274 3.20745 3.32458C3.30698 3.19642 3.44984 3.10896 3.60925 3.0786C3.76866 3.04824 3.93366 3.07707 4.07334 3.15967L4.142 3.20634ZM12.738 3.26167C12.8528 3.37647 12.9217 3.5292 12.9319 3.69122C12.9421 3.85324 12.8928 4.01341 12.7933 4.14167L12.738 4.20434L12.2713 4.67101C12.1514 4.79057 11.9904 4.85999 11.8211 4.86516C11.6518 4.87033 11.4869 4.81086 11.3598 4.69884C11.2328 4.58682 11.1531 4.43064 11.1371 4.26202C11.121 4.09341 11.1697 3.925 11.2733 3.79101L11.3287 3.72834L11.7953 3.26167C11.9204 3.13669 12.0899 3.06648 12.2667 3.06648C12.4434 3.06648 12.613 3.13669 12.738 3.26167ZM8 1.33301C8.16329 1.33303 8.3209 1.39298 8.44292 1.50148C8.56494 1.60999 8.6429 1.75951 8.662 1.92167L8.66667 1.99967V2.66634C8.66648 2.83626 8.60142 2.9997 8.48477 3.12325C8.36813 3.24681 8.2087 3.32116 8.03907 3.33112C7.86945 3.34108 7.70242 3.28589 7.57212 3.17683C7.44181 3.06777 7.35807 2.91307 7.338 2.74434L7.33334 2.66634V1.99967C7.33334 1.82286 7.40358 1.65329 7.5286 1.52827C7.65362 1.40325 7.82319 1.33301 8 1.33301ZM8 4.66634C8.65312 4.6663 9.29186 4.85813 9.83689 5.21801C10.3819 5.57788 10.8092 6.08994 11.0657 6.69058C11.3222 7.29123 11.3966 7.95399 11.2797 8.59655C11.1627 9.23911 10.8596 9.83316 10.4079 10.3049C9.95621 10.7767 9.3759 11.1053 8.73903 11.2501C8.10215 11.3949 7.43678 11.3493 6.82556 11.1192C6.21434 10.889 5.6842 10.4844 5.30098 9.95552C4.91776 9.42664 4.69835 8.79684 4.67 8.14434L4.66667 7.99967L4.67 7.85501C4.70728 6.99684 5.07441 6.18619 5.69482 5.59211C6.31523 4.99804 7.14103 4.66639 8 4.66634Z" fill="#808693"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <circle cx="6" cy="6" r="5" fill="#B1A3FB"/>
                                </svg>
                                <span className="text-xs text-foreground font-normal">Light Purple</span>
                            </Button>
                            <Button 
                                className={cn((theme === 'dark' ? 'border-primary' : 'border-transparent'),"bg-secondary py-2 px-[10px] flex gap-1 items-center h-fit shadow-none rounded-[8px] border hover:border-primary")}
                                onClick={()=>setTheme('dark')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M7.84243 3.32346C7.89006 3.25997 7.91825 3.18404 7.92359 3.10485C7.92893 3.02567 7.91118 2.94663 7.87251 2.87733C7.83383 2.80802 7.77588 2.75142 7.70569 2.71439C7.63549 2.67736 7.55606 2.66148 7.47702 2.66869C4.5155 2.93891 2.86242 5.26809 2.683 7.64924C2.50358 10.0348 3.79727 12.5587 6.75879 13.2102C9.86911 13.8939 13.0341 11.6583 13.3317 8.4807C13.3391 8.40202 13.3236 8.32289 13.2871 8.2528C13.2507 8.18271 13.1947 8.12465 13.126 8.08559C13.0573 8.04654 12.9788 8.02815 12.8999 8.03264C12.821 8.03713 12.7451 8.06431 12.6813 8.11091C11.1294 9.24268 9.35546 8.83078 8.23081 7.71488C7.10724 6.59952 6.69917 4.84908 7.84243 3.32346Z" fill="#808693"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <circle cx="6" cy="6" r="5" fill="#B1A3FB"/>
                                </svg>
                                <span className="text-xs text-foreground font-normal">Dark Purple</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}