import { TrendingUp } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export function PortfolioChart(){
    return (
        <Card className="rounded-sm col-span-12 w-full lg:col-span-6">
            <CardContent className="p-6 h-full">
                <div className="flex h-full items-center justify-center border-2 border-dashed">
                    <div className="text-center">
                        <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Portfolio Performance Chart</p>
                        <p className="text-sm">Connect wallet to view your portfolio data</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}