import {
  Ban,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  RotateCw,
} from "lucide-react";
import { Button } from "./ui/button";
import { useContext, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import OpenPositions from "./OpenPositions";
import OrderHistory from "./OrderHistory";
import { orders, Position, positions } from "@/lib/data/Positions";
import ExpiredOptions from "./ExpiredOptions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ContractContext, ExpiredOption } from "@/contexts/contractProvider";
import { Transaction } from "@/lib/data/WalletActivity";
import { BN } from "@coral-xyz/anchor";
import Pagination from "./Pagination";
import OpenOptionOrders from "./OpenOptionOrders";

export default function TradingPositions() {
  const [activeTab, setActiveTab] = useState<string>("Positions");
  const [optioninfos, setOptionInfos] = useState<Position[]>([]);
  const [expiredInfos, setExpiredInfos] = useState<ExpiredOption[]>([]);
  const [doneInfo, setDoneInfo] = useState<Transaction[]>([]);
  const { program, getDetailInfos, pub, onClaimOption, onExerciseOption } =
    useContext(ContractContext);

  const handleClickTab = (state: string) => {
    if (activeTab !== state) {
      setActiveTab(state);
    }
  };
  const onClaim = (optionindex: number, solPrice: number) => {
    onClaimOption(optionindex, solPrice);
  };
  const onExercise =(index: number)=>{
    onExerciseOption(index);
  }
  useEffect(() => {
    (async () => {
      if (program && pub) {
        const [pinfo, expiredpinfo, doneinfo] = await getDetailInfos(
          program,
          pub
        );
        setOptionInfos(pinfo);
        setExpiredInfos(expiredpinfo);
        setDoneInfo(doneinfo);
      }
    })();
  }, [program]);

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const dummyOrders = orders;

  const actionTextMap: Record<string, string> = {
    Positions: "Close all",
    OpenOrders: "Cancel all",
    Expired: "Claim all",
  };

  

  return (
    <div className="w-full h-fit border rounded-sm flex flex-col">
      <div className="w-full flex justify-between px-3 py-1 md:px-6 md:py-3 border-b">
        <Tabs defaultValue={activeTab} className="p-0">
          <TabsList className="w-full flex bg-inherit text-secondary-foreground p-0 gap-2 md:gap-3 lg:gap-6">
            <TabsTrigger
              value="Positions"
              className="text-[11px] md:text-sm px-2 py-[2px] border-b rounded-none border-transparent data-[state=active]:border-primary"
              onClick={() => handleClickTab("Positions")}
            >
              Positions
            </TabsTrigger>
            <TabsTrigger
              value="OpenOrders"
              className="text-[11px] md:text-sm px-2 py-[2px] border-b rounded-none border-transparent data-[state=active]:border-primary"
              onClick={() => handleClickTab("OpenOrders")}
            >
              Orders
            </TabsTrigger>
            <TabsTrigger
              value="Expired"
              className="text-[11px] md:text-sm px-2 py-[2px] border-b rounded-none border-transparent data-[state=active]:border-primary"
              onClick={() => handleClickTab("Expired")}
            >
              Expired
            </TabsTrigger>
            <TabsTrigger
              value="History"
              className="text-[11px] md:text-sm px-2 py-[2px] border-b rounded-none border-transparent data-[state=active]:border-primary"
              onClick={() => handleClickTab("History")}
            >
              History
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="hidden md:flex gap-3 items-center">
          <Button className="bg-secondary p-2 w-full h-auto rounded-sm">
            <RotateCw className="text-secondary-foreground" />
          </Button>
          {activeTab !== 'History' && (
            <Button className="bg-secondary w-full h-auto py-[6px] px-[10px] rounded-sm">
              <Ban className="text-secondary-foreground p-0" />
              {actionTextMap[activeTab] && (
                <span className="text-sm font-normal text-secondary-foreground p-0">
                  {actionTextMap[activeTab]}
                </span>
              )}
            </Button>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-inherit p-[6px] w-fit h-auto rounded-sm md:hidden shadow-none">
              <EllipsisVertical className="text-secondary-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="p-1 min-w-fit rounded-[12px]"
          >
            <DropdownMenuItem className="space-x-[6px] gap-0 w-fit">
              <RotateCw className="w-fit text-secondary-foreground" />
              <span>Reload</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="w-fit space-x-[6px] gap-0">
              <Ban className="text-secondary-foreground" />
              {actionTextMap[activeTab] && (
                <span className="text-sm font-normal text-secondary-foreground p-0">
                  {actionTextMap[activeTab]}
                </span>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {activeTab === "Positions" && (
        <div className="px-3 md:px-6 py-4 pb-[10px] space-y-[10px]">
          {optioninfos &&
            optioninfos.map((position, index) => (
              <OpenPositions
                key={index}
                index={position.index}
                token={position.token}
                logo={position.logo}
                symbol={position.symbol}
                type={position.type}
                strikePrice={position.strikePrice}
                expiry={position.expiry}
                size={position.size}
                pnl={position.pnl}
                greeks={position.greeks}
                onExercise={()=>onExercise(position.index)}
              />
            ))}
            <div className="pb-4 w-full">
                <Pagination
                    currentPage={currentPage}
                    totalItems={optioninfos.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            </div>
            
        </div>
      )}
      {activeTab === "Expired" && (
        <div className="md:pb-[44px]">
          <ExpiredOptions infos={expiredInfos} onClaim={onClaim} />
        </div>
      )}
      {activeTab === "OpenOrders" && (
        <div className="px-3 md:px-6 py-4 pb-[10px] space-y-[10px]">
          {dummyOrders.map((pos, idx) => (
            <OpenOptionOrders 
              key={idx}
              logo={pos.logo}
              token={pos.token}
              symbol={pos.symbol}
              type={pos.type}
              limitPrice={pos.limitPrice}
              transaction={pos.transaction}
              strikePrice={pos.strikePrice}
              expiry={pos.expiry}
              size={pos.size}
              orderDate={pos.orderDate}
            />
          ))}
          <div className="pb-4 w-full">
              <Pagination
                  currentPage={currentPage}
                  totalItems={dummyOrders.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
              />
          </div>
        </div>
      )}
      {activeTab === "History" && (
        <div className="px-3 md:px-6 py-4 pb-[20px] md:pb-[10px]">
          <OrderHistory doneOptioninfos={doneInfo} />
        </div>
      )}
    </div>
  );
}
