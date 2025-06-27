import { Card, CardContent } from "../ui/card";

export function VolumeCard(){
    return (
        <Card className="rounded-sm w-full">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h1>14 Day Volume</h1>
                </div>
                <div className="text-3xl font-bold mb-2">$0</div>
            </CardContent>
        </Card>
    )
}