import LeaderboardPagination from "@/components/LeaderboardPagination";
import LeaderboardTable from "@/components/LeaderboardTable";
import { Rank1Big, Rank2Big, Rank3Big, StarIcon } from "@/public/svgs/icons";


export default function leaderBoards(){
    return (
        <div className="px-6 py-7 w-full space-y-14 mx-auto">
            <div className="flex mx-auto gap-4 justify-center">
                <div className="flex flex-col space-y-5">
                    <div className="flex flex-col space-y-[14px] items-center mt-[30px]">
                        <div>
                            <Rank2Big />
                        </div>
                        <span className="text-sm font-medium text-foreground">
                            CAi4Dxk6...wb7oUYRQ
                        </span>
                    </div>
                    <div>
                        <div>
                            <svg width="266" height="126" viewBox="0 0 266 126" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="20" width="266" height="106" fill="url(#paint0_linear_0_1)"/>
                            <path d="M50 0H216L266 20H0L50 0Z" fill="url(#paint1_linear_0_1)"/>
                            <defs>
                            <linearGradient id="paint0_linear_0_1" x1="154" y1="126" x2="154" y2="20" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#141519"/>
                            <stop offset="1" stop-color="#262430"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear_0_1" x1="154" y1="20" x2="154.5" y2="-6.59888e-07" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#141519"/>
                            <stop offset="1" stop-color="#262430"/>
                            </linearGradient>
                            </defs>
                            </svg>
                            <div className="relative -mt-[90px] flex flex-col items-center space-y-2">
                                <div className="flex items-center gap-2 bg-[#2F2B32] px-2 py-1 rounded-[10px]">
                                    <StarIcon />
                                    <span className="text-sm font-normal text-foreground">57,983,412,105</span>
                                </div>
                                <span className="text-sm text-secondary-foreground">Total Points</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-5">
                    <div className="flex flex-col space-y-[14px] items-center">
                        <div>
                            <Rank1Big />
                        </div>
                        <span className="text-sm font-medium text-foreground">
                            4FDKx3S3...1GTUWkti
                        </span>
                    </div>
                    <div>
                        <div>
                            <svg width="266" height="126" viewBox="0 0 266 126" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect y="20" width="266" height="106" fill="url(#paint0_linear_0_1)"/>
                                <path d="M50 0H216L266 20H0L50 0Z" fill="url(#paint1_linear_0_1)"/>
                                <defs>
                                <linearGradient id="paint0_linear_0_1" x1="154" y1="126" x2="154" y2="20" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#141519"/>
                                <stop offset="1" stop-color="#262430"/>
                                </linearGradient>
                                <linearGradient id="paint1_linear_0_1" x1="154" y1="20" x2="154.5" y2="-6.59888e-07" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#141519"/>
                                <stop offset="1" stop-color="#262430"/>
                                </linearGradient>
                                </defs>
                            </svg>
                            <div className="relative -mt-[90px] flex flex-col items-center space-y-2">
                                <div className="flex items-center gap-2 bg-[#2F2B32] px-2 py-1 rounded-[10px]">
                                    <StarIcon />
                                    <span className="text-sm font-normal text-foreground">57,983,412,105</span>
                                </div>
                                <span className="text-sm text-secondary-foreground">Total Points</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-5">
                    <div className="flex flex-col space-y-[14px] items-center mt-[60px]">
                        <div>
                            <Rank3Big />
                        </div>
                        <span className="text-sm font-medium text-foreground">
                            7WVG5b9b...iuuCr8jE
                        </span>
                    </div>
                    <div>
                        <div>
                            <svg width="266" height="126" viewBox="0 0 266 126" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect y="20" width="266" height="106" fill="url(#paint0_linear_0_1)"/>
                                <path d="M50 0H216L266 20H0L50 0Z" fill="url(#paint1_linear_0_1)"/>
                                <defs>
                                <linearGradient id="paint0_linear_0_1" x1="154" y1="126" x2="154" y2="20" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#141519"/>
                                <stop offset="1" stop-color="#262430"/>
                                </linearGradient>
                                <linearGradient id="paint1_linear_0_1" x1="154" y1="20" x2="154.5" y2="-6.59888e-07" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#141519"/>
                                <stop offset="1" stop-color="#262430"/>
                                </linearGradient>
                                </defs>
                            </svg>
                            <div className="relative -mt-[90px] flex flex-col items-center space-y-2">
                                <div className="flex items-center gap-2 bg-[#2F2B32] px-2 py-1 rounded-[10px]">
                                    <StarIcon />
                                    <span className="text-sm font-normal text-foreground">57,983,412,105</span>
                                </div>
                                <span className="text-sm text-secondary-foreground">Total Points</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col space-y-6">
                <LeaderboardTable />
                <LeaderboardPagination />
            </div>
            
        </div>
    )
}