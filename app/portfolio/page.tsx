import { PointsCard } from "@/components/portfolio/points-card";
import { PortfolioCard } from "@/components/portfolio/portfolio-card";
import { PortfolioChart } from "@/components/portfolio/portfolio-chart";
import { PortfolioHeader } from "@/components/portfolio/portfolio-header";
import { PortfolioTabs } from "@/components/portfolio/portfolio-tabs";
import { VolumeCard } from "@/components/portfolio/volume-card";

export default function Portfolio(){
    return (
        <main className="flex-1 py-4 rounded-sm flex flex-col">
            {/* <PortfolioHeader /> */}
            <div className="grid grid-cols-12 gap-6 mb-4">
                <div className="flex flex-col sm:flex-row lg:flex-col col-span-12 lg:col-span-3 gap-4">
                    <VolumeCard />
                    <PointsCard />
                </div>
                <div className="col-span-3"> 
                    <PortfolioCard />
                </div>
               <PortfolioChart />
            </div>
            <div className="flex-1 flex">
                <PortfolioTabs />
            </div>
            
        </main>
    )
}