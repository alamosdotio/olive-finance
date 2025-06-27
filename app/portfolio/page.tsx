import { PortfolioCard } from "@/components/portfolio/portfolio-card";
import { PortfolioChart } from "@/components/portfolio/portfolio-chart";
import { PortfolioHeader } from "@/components/portfolio/portfolio-header";
import { VolumeCard } from "@/components/portfolio/volume-card";

export default function Portfolio(){
    return (
        <main className="mx-auto py-4 rounded-sm">
            <PortfolioHeader />
            <div className="grid grid-cols-12 gap-6 mb-4">
                <div className="flex flex-col sm:flex-row lg:flex-col col-span-12 lg:col-span-4 gap-4">
                    <PortfolioCard />
                    <VolumeCard />
                </div>
               
               <PortfolioChart />
            </div>
        </main>
    )
}