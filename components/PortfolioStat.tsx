import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import positionSvg from "@/public/svgs/positions.svg"
import { Fullscreen,Database } from 'lucide-react';
import chart from "@/public/svgs/chart.svg"


export default function PortfolioStat(){
    return (
       <div className="flex justify-start gap-5">
            <Card className="p-8 rounded-[48px]">
                <CardContent className="space-y-8 p-0">
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Database className="text-2xl"/>
                                <h1 className="text-2xl">Net Value</h1>
                            </div>
                            <Fullscreen />
                        </div>
                        <h1 className="text-5xl font-medium">$10,561</h1>
                    </div>
                    <div>
                        <Image src={chart} alt="temporary chart" />
                    </div>
                </CardContent>
            </Card>
       </div>
    )
}