import AnalyticSidebar from "@/components/AnalyticSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Layout({children} : Readonly<{children: React.ReactNode}>){
    return (
        <main className="w-full flex h-[calc(100vh-52px)] border-t">
            <div className="w-1/6 h-full border-r">
                <AnalyticSidebar />
            </div>
            <div className="w-full h-full border-r">
                <ScrollArea className="w-full h-full">
                    {children} 
                </ScrollArea>
            </div>
        </main>
    )
}