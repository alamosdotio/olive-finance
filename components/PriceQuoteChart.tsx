import { Card, CardContent } from "./ui/card";

export default function PriceQuoteChart(){
    return (
        <Card className="bg-inherit shadow-none border-none">
            <CardContent className="p-6 shadow-none">
                <div className="w-full h-[200px] relative border border-dashed border-l-0 border-r-0 border-foreground">
                    <div className="absolute top-0 left-1/2 w-0 h-full border-l border-dashed border-foreground"></div>
                    <div className="absolute top-1/2 left-0 w-full h-0 border-t border-solid border-foreground"></div>
                    <div className="absolute top-1/2 left-0 w-[calc(50%-1px)] h-[25%] bg-purple-100">
                        <div className="absolute bottom-0 left-0 w-full h-0 border-t-2 border-purple-300"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-purple-300"></div>
                    </div>
                    <div className="absolute top-[25%] left-[calc(50%+1px)] w-[calc(50%-1px)] h-[25%] bg-green-100">
                        <div className="absolute top-0 left-0 w-full h-0 border-t-2 border-green-300"></div>
                        <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-green-300"></div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}