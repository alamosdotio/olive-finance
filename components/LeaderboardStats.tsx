import { TooltipIcon } from "@/public/svgs/icons";


export default function LeaderboardStats(){
    return (
        <div className="grid grid-cols-5 gap-4">
            <div className="p-5 bg-accent rounded-sm flex flex-col gap-2">
                <div className="flex justify-start gap-2 text-sm items-center">
                    <span className="text-secondary-foreground">Total Points</span>
                    <TooltipIcon />
                </div>
                <div className="text-[32px]">425.25K</div>
            </div>
            <div className="p-5 bg-accent rounded-sm  flex flex-col gap-2">
                <div className="flex justify-start gap-2 text-sm items-center">
                    <span className="text-secondary-foreground">Global Rank</span>
                    <TooltipIcon />
                </div>
                <div className="text-[32px]">#42.25K</div>
            </div>
            <div className="p-5 bg-accent rounded-sm  flex flex-col gap-2">
                <div className="flex justify-start gap-2 text-sm items-center">
                    <span className="text-secondary-foreground">Lending Points</span>
                    <TooltipIcon />
                </div>
                <div className="text-[32px]">302.7K</div>
            </div>
            <div className="p-5 bg-accent rounded-sm  flex flex-col gap-2">
                <div className="flex justify-start gap-2 text-sm items-center">
                    <span className="text-secondary-foreground">Borrowing Points</span>
                    <TooltipIcon />
                </div>
                <div className="text-[32px]">142.25K</div>
            </div>
            <div className="p-5 bg-accent rounded-sm  flex flex-col gap-2">
                <div className="flex justify-start gap-2 text-sm items-center">
                    <span className="text-secondary-foreground">Referral Points</span>
                    <TooltipIcon />
                </div>
                <div className="text-[32px]">12.25K</div>
            </div>
        </div>
    )
}