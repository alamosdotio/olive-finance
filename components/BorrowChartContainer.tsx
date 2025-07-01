import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export function BorrowChartContainer(){
        const [activeTab, setActiveTab] = useState<string>("interest")
        const handleClick = (state: string) => {
            if(activeTab!==state){
            setActiveTab(state);
            }
        }
    return(
        <>
            <div className="w-full h-full flex flex-col">
                <div className="border-b">
                    <Tabs>
                        <TabsList className="grid grid-cols-3 py-1 px-4 w-full h-10 bg-inherit">
                            <TabsTrigger
                                value="interest"
                                className="border-b  py-2 px-0 text-secondary-foreground rounded-none hover:text-primary data-[state=active]:text-primary data-[state=active]:border-primary"
                                onClick={()=>handleClick('interest')}
                            >
                                Interest
                            </TabsTrigger>
                            <TabsTrigger
                                value="yield"
                                className="border-b  py-2 px-0 text-secondary-foreground rounded-none hover:text-primary data-[state=active]:text-primary data-[state=active]:border-primary"
                                onClick={()=>handleClick('yield')}
                            >
                                Yield Chart
                            </TabsTrigger>
                            <TabsTrigger
                                value="chart"
                                className="border-b  py-2 px-0 text-secondary-foreground rounded-none hover:text-primary data-[state=active]:text-primary data-[state=active]:border-primary"
                                onClick={()=>handleClick('chart')}
                            >
                                Chart
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

            </div>
        </>
    )
}