import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import positionSvg from "@/public/svgs/positions.svg"


export default function PortfolioStat(){
    return (
        <div className="flex gap-10">
            <div className="grid grid-cols-3 gap-4 mb-6 w-5/6">
                <Card className="gap-6 flex flex-col justify-center items-start">
                    <CardContent className="space-y-3">
                        <div className="text-2xl font-normal">
                            Net Value
                        </div>
                        <div className="text-5xl font-semibold">
                            $10,561
                        </div>
                        <div className="text-base text-muted-foreground font-normal">
                            100 BTC
                        </div>
                    </CardContent>
                </Card>
                <Card className="gap-6 flex flex-col justify-center items-start">
                    <CardContent className="space-y-3">
                        <div className="text-2xl font-normal">
                            Profits and Loss
                        </div>
                        <div className="text-5xl font-semibold">
                            $5,329
                        </div>
                        <div className="text-base text-muted-foreground font-normal">
                            100 BTC
                        </div>
                    </CardContent>
                </Card>
                <Card className="gap-6 flex flex-col justify-center items-start">
                    <CardContent className="space-y-3">
                        <div className="text-2xl font-normal">
                            Points
                        </div>
                        <div className="text-5xl font-semibold">
                            8,712
                        </div>
                        <div className="text-base text-muted-foreground font-normal">
                            Data
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card className="border-none shadow-none">
                <CardContent>
                    <Image src={positionSvg} alt="positions" width={200} height={200}/>
                </CardContent>
            </Card>
        </div>
    )
}