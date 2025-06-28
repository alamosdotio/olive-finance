import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import { PortfolioChart } from "./portfolio-chart";

export function PortfolioTabs(){
    return (
        <Tabs defaultValue="positions" className="w-full space-y-4 flex-1 flex flex-col">
            <div className="grid grid-cols-12 gap-5"> 
                <TabsList className="grid h-fit p-2 w-full grid-cols-5 col-span-10 border bg-inherit rounded-sm">
                        <TabsTrigger
                            value="positions"
                        >
                            Positions
                        </TabsTrigger>
                        <TabsTrigger
                            value="orders"
                        >
                            Open Orders
                        </TabsTrigger>
                        <TabsTrigger
                            value="order-history"
                        >
                            Order History
                        </TabsTrigger>
                        <TabsTrigger
                            value="trade-history"
                        >
                            Trade History
                        </TabsTrigger>
                        <TabsTrigger
                            value="funding-history"
                        >
                            Funding History
                        </TabsTrigger>
                </TabsList>
                <Button
                    variant={'outline'}
                    className="col-span-2 h-fit py-3"
                >
                    Filter
                    <ChevronDown />
                </Button>
            </div>
            <TabsContent
                value="positions"
                className="flex-1"
            >
                <Card className="rounded-sm h-full">
                    <CardContent className="p-8 text-center h-full flex flex-col justify-center items-center">
                        <p>No open positions</p>
                        <p className="text-sm mt-2">Your trading positions will appear here</p>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent
                value="orders"
                className="flex-1"
            >
                <Card className="rounded-sm h-full">
                    <CardContent className="p-8 text-center h-full flex flex-col justify-center items-center">
                        <p>No open orders</p>
                        <p className="text-sm mt-2">Your pending orders will appear here</p>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent
                value="order-history"
                className="flex-1"
            >
                <Card className="rounded-sm h-full">
                    <CardContent className="p-8 text-center h-full flex flex-col justify-center items-center">
                        <p>No order history</p>
                        <p className="text-sm mt-2">Your order history will appear here</p>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent
                value="trade-history"
                className="flex-1"
            >
                <Card className="rounded-sm h-full">
                    <CardContent className="p-8 text-center h-full flex flex-col justify-center items-center">
                        <p>No trade history</p>
                        <p className="text-sm mt-2">Your completed trades will appear here</p>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent
                value="funding-history"
                className="flex-1"
            >
                <Card className="rounded-sm h-full">
                    <CardContent className="p-8 text-center h-full flex flex-col justify-center items-center">
                        <p>No funding history</p>
                        <p className="text-sm mt-2">Funding payments will appear here</p>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}