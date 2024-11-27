import CryptoNav from "@/components/CryptoNav";
import OptionsCard from "@/components/OptionsCard";



export default function Home() {
  return (
    <div className="space-y-6 flex flex-col">
          <CryptoNav />
          <OptionsCard />
    </div>
  );
}
