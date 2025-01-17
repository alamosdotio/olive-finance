import { Rank1Icon, Rank2Icon, Rank3Icon, StarIcon } from "@/public/svgs/icons";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { ScrollArea } from "./ui/scroll-area";

export default function LeaderboardTable() {

  const generateLeaderboardData = (numEntries: number) => {
    const baseAddress = ["4FDKx3S3", "CA14Dxk6", "7WVG5b9b", "53gDPFjM", "GWE2zPNp", "HDG5LNix"];
    const leaderboardData = [];
  
    for (let i = 1; i <= numEntries; i++) {
      const basePoints = 130000000000 - (i * 100000000);
      const totalPoints = basePoints * 5; 
  
      leaderboardData.push({
        rank: i,
        address: `${baseAddress[i % baseAddress.length]}...${Math.random().toString(36).substring(2, 10)}`,
        tradingPoints: basePoints.toLocaleString(),
        liquidityPoints: (basePoints - 100000000).toLocaleString(),
        referralPoints: (basePoints - 200000000).toLocaleString(),
        totalPoints: totalPoints.toLocaleString(),
      });
    }
  
    return leaderboardData;
  };

  const leaderboardData = generateLeaderboardData(50);

    return (
        <div className="rounded-[26px] border">
          <ScrollArea className="h-[575px] w-full rounded-[25px]">
            <Table>
                <TableHeader>
                    <TableRow className="w-full">
                        <TableHead className="text-secondary-foreground font-normal text-center px-3 py-4">Rank</TableHead>
                        <TableHead className="text-secondary-foreground font-normal px-3 py-4">Address</TableHead>
                        <TableHead className="text-secondary-foreground font-normal text-center px-3 py-4">Trading Points</TableHead>
                        <TableHead className="text-secondary-foreground font-normal text-center px-3 py-4">Liquidity Points</TableHead>
                        <TableHead className="text-secondary-foreground font-normal text-center px-3 py-4">Referral Points</TableHead>
                        <TableHead className="text-secondary-foreground font-normal text-center px-3 py-4">Total Points</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {leaderboardData.map((row) => (
                        <TableRow key={row.rank} className="border-none">
                            <TableCell className="text-center text-foreground px-[10px] py-3">
                              {row.rank === 1 && (
                                <span className="flex justify-center">
                                  <Rank1Icon />
                                </span>
                              )}

                              {row.rank === 2 && (
                                <span className="flex justify-center">
                                  <Rank2Icon />
                                </span>
                              )}

                              {row.rank === 3 && (
                                <span className="flex justify-center">
                                  <Rank3Icon />
                                </span>
                              )}

                              {row.rank > 3 && (
                                row.rank
                              )}
                            </TableCell>
                            <TableCell className="text-foreground px-[10px] py-3">{row.address}</TableCell>
                            <TableCell className="text-foreground text-center px-[10px] py-3">{row.tradingPoints}</TableCell>
                            <TableCell className="text-foreground text-center px-[10px] py-3">{row.liquidityPoints}</TableCell>
                            <TableCell className="text-foreground text-center px-[10px] py-3">{row.referralPoints}</TableCell>
                            <TableCell className="flex justify-center px-[10px] py-3">
                              <div className="flex items-center gap-2 bg-[#2F2B32] px-2 py-1 rounded-[10px]">
                                  <StarIcon />
                                  <span className="text-sm font-normal text-foreground">{row.totalPoints}</span>
                              </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </ScrollArea>
        </div>
    )
}