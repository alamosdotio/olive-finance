import LeaderboardPagination from "@/components/LeaderboardPagination";
import LeaderboardStats from "@/components/LeaderboardStats";
import LeaderboardTable from "@/components/LeaderboardTable";

export default function leaderBoards(){
    return (
        <div className="px-6 py-7 w-full space-y-6 mx-auto">
            <h1 className="text-2xl font-medium">Leaderboard</h1>
            <LeaderboardStats />
            <LeaderboardTable />
            <LeaderboardPagination />
        </div>
    )
}