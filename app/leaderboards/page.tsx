import LeaderboardPagination from "@/components/LeaderboardPagination";
import LeaderboardTable from "@/components/LeaderboardTable";
import LeaderBoardTopRanks from "@/components/LeaderBoardTopRanks";



export default function leaderBoards(){
    return (
        <div className="px-0 md:px-6 py-7 w-full space-y-14 mx-auto">
            <LeaderBoardTopRanks />
            <div className="w-full flex flex-col space-y-6">
                <LeaderboardTable />
                <LeaderboardPagination />
            </div>
        </div>
    )
}