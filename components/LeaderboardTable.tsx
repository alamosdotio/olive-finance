import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"


const leaderboardData = [
    {
      rank: 1,
      address: "4FDKx3S3...1GTUWktI",
      tradingPoints: "12,987,654,321",
      liquidityPoints: "22,987,654,321",
      referralPoints: "19,654,321,098",
      totalPoints: "62,341,907,289",
    },
    {
      rank: 2,
      address: "CA14Dxk6...wb7oUYRQ",
      tradingPoints: "11,876,543,210",
      liquidityPoints: "21,876,543,210",
      referralPoints: "18,543,210,987",
      totalPoints: "57,983,412,105",
    },
    {
      rank: 3,
      address: "7WVG5b9b...iuuCr8jE",
      tradingPoints: "10,765,432,109",
      liquidityPoints: "20,765,432,109",
      referralPoints: "17,432,109,876",
      totalPoints: "50,172,943,614",
    },
    {
      rank: 4,
      address: "53gDPFjM...ipxPmde7",
      tradingPoints: "9,654,321,098",
      liquidityPoints: "19,654,321,098",
      referralPoints: "16,321,098,765",
      totalPoints: "48,716,503,821",
    },
    {
      rank: 5,
      address: "GWE2zPNp...rf23CBSC",
      tradingPoints: "8,543,210,987",
      liquidityPoints: "18,543,210,987",
      referralPoints: "15,210,987,654",
      totalPoints: "45,908,312,749",
    },
    {
      rank: 6,
      address: "HDG5LNix...XpSp7XcY",
      tradingPoints: "7,432,109,876",
      liquidityPoints: "17,432,109,876",
      referralPoints: "14,109,876,543",
      totalPoints: "44,769,019,206",
    },
    {
      rank: 7,
      address: "4FDKx3S3...1GTUWktI",
      tradingPoints: "6,321,098,765",
      liquidityPoints: "16,321,098,765",
      referralPoints: "13,098,765,432",
      totalPoints: "41,287,609,345",
    },
    {
      rank: 8,
      address: "CA14Dxk6...wb7oUYRQ",
      tradingPoints: "5,210,987,654",
      liquidityPoints: "15,210,987,654",
      referralPoints: "12,987,654,321",
      totalPoints: "39,217,806,473",
    },
    {
      rank: 9,
      address: "7WVG5b9b...iuuCr8jE",
      tradingPoints: "4,109,876,543",
      liquidityPoints: "14,109,876,543",
      referralPoints: "11,876,543,210",
      totalPoints: "36,890,401,256",
    },
    {
      rank: 10,
      address: "53gDPFjM...ipxPmde7",
      tradingPoints: "3,098,765,432",
      liquidityPoints: "13,098,765,432",
      referralPoints: "10,765,432,109",
      totalPoints: "29,354,807,602",
    },
];


export default function LeaderboardTable() {
    return (
        <div className="rounded-[26px] border">
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
                            <TableCell className="text-center text-foreground px-[10px] py-3">{row.rank}</TableCell>
                            <TableCell className="text-foreground px-[10px] py-3">{row.address}</TableCell>
                            <TableCell className="text-foreground text-center px-[10px] py-3">{row.tradingPoints}</TableCell>
                            <TableCell className="text-foreground text-center px-[10px] py-3">{row.liquidityPoints}</TableCell>
                            <TableCell className="text-foreground text-center px-[10px] py-3">{row.referralPoints}</TableCell>
                            <TableCell className="text-primary text-center px-[10px] py-3">{row.totalPoints}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}