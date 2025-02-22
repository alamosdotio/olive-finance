import { InfoIcon, NotificationIcon, RedCircle } from "@/public/svgs/icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function Notifications(){
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
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
    )
}