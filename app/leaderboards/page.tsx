import LeaderboardPagination from "@/components/LeaderboardPagination";
import LeaderboardStats from "@/components/LeaderboardStats";
import LeaderboardTable from "@/components/LeaderboardTable";
import { User } from "lucide-react";

export default function leaderBoards(){
    return (
        <div className="px-6 py-7 w-full space-y-6 mx-auto">
            <div className="flex mx-auto gap-4 justify-center">
                <div className="flex flex-col space-y-5">
                    <div className="flex flex-col space-y-[14px] items-center mt-[30px]">
                        <div className="w-[72px] h-[72px] rounded-[14px] border bg-secondary text-center items-center flex justify-center text-black shadow-lg shadow-primary">
                            <User className="w-10 h-10 text-primary"/>
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
                                <path d="M131 1.1547C132.238 0.440169 133.762 0.440169 135 1.1547L144.856 6.8453C146.094 7.55983 146.856 8.88034 146.856 10.3094V21.6906C146.856 23.1197 146.094 24.4402 144.856 25.1547L135 30.8453C133.762 31.5598 132.238 31.5598 131 30.8453L121.144 25.1547C119.906 24.4402 119.144 23.1197 119.144 21.6906V10.3094C119.144 8.88034 119.906 7.55983 121.144 6.8453L131 1.1547Z" fill="url(#paint2_linear_0_1)"/>
                                <path d="M128.511 21.4759C130.091 20.2304 131.329 19.2109 132.225 18.4173C133.121 17.6114 133.874 16.775 134.484 15.9081C135.106 15.029 135.417 14.1682 135.417 13.3257C135.417 12.532 135.218 11.9093 134.82 11.4576C134.434 10.9936 133.806 10.7616 132.935 10.7616C132.089 10.7616 131.429 11.0241 130.956 11.5491C130.496 12.0619 130.247 12.7518 130.209 13.6187H128.567C128.617 12.2512 129.04 11.195 129.836 10.4502C130.633 9.70541 131.659 9.33301 132.916 9.33301C134.198 9.33301 135.212 9.68099 135.959 10.377C136.718 11.0729 137.097 12.0314 137.097 13.2524C137.097 14.2659 136.786 15.2549 136.164 16.2195C135.554 17.1718 134.857 18.0143 134.073 18.7469C133.289 19.4673 132.288 20.3098 131.068 21.2744H137.489V22.6663H128.511V21.4759Z" fill="#141519"/>
                                <defs>
                                    <linearGradient id="paint0_linear_0_1" x1="154" y1="126" x2="154" y2="20" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#141519"/>
                                        <stop offset="1" stopColor="#262430"/>
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_0_1" x1="154" y1="20" x2="154.5" y2="-6.59888e-07" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#141519"/>
                                        <stop offset="1" stopColor="#262430"/>
                                    </linearGradient>
                                    <linearGradient id="paint2_linear_0_1" x1="147" y1="5.33333" x2="121" y2="25.3333" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#AEAEAE"/>
                                        <stop offset="0.575865" stopColor="#FEFEFE"/>
                                        <stop offset="0.985" stopColor="#AEAEAE"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-5">
                    <div className="flex flex-col space-y-[14px] items-center">
                        <div className="w-[72px] h-[72px] rounded-[14px] border bg-secondary text-center items-center flex justify-center text-black shadow-lg shadow-primary">
                            <User className="w-10 h-10 text-primary"/>
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
                                <path d="M131 1.1547C132.238 0.440169 133.762 0.440169 135 1.1547L144.856 6.8453C146.094 7.55983 146.856 8.88034 146.856 10.3094V21.6906C146.856 23.1197 146.094 24.4402 144.856 25.1547L135 30.8453C133.762 31.5598 132.238 31.5598 131 30.8453L121.144 25.1547C119.906 24.4402 119.144 23.1197 119.144 21.6906V10.3094C119.144 8.88034 119.906 7.55983 121.144 6.8453L131 1.1547Z" fill="url(#paint2_linear_0_1)"/>
                                <path d="M131.245 10.8637V9.33301H134.754V22.6663H133.037V10.8637H131.245Z" fill="#141519"/>
                                <defs>
                                    <linearGradient id="paint0_linear_0_1" x1="154" y1="126" x2="154" y2="20" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#141519"/>
                                        <stop offset="1" stopColor="#262430"/>
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_0_1" x1="154" y1="20" x2="154.5" y2="-6.59888e-07" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#141519"/>
                                        <stop offset="1" stopColor="#262430"/>
                                    </linearGradient>
                                    <linearGradient id="paint2_linear_0_1" x1="147" y1="5.33333" x2="121" y2="25.3333" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#FFBF35"/>
                                        <stop offset="0.575865" stopColor="#FFF2D5"/>
                                        <stop offset="0.985" stopColor="#FFBF35"/>
                                    </linearGradient>
                                </defs>
                            </svg>


                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-5">
                    <div className="flex flex-col space-y-[14px] items-center mt-[60px]">
                        <div className="w-[72px] h-[72px] rounded-[14px] border bg-secondary text-center items-center flex justify-center text-black shadow-lg shadow-primary">
                            <User className="w-10 h-10 text-primary"/>
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
                                <path d="M131 1.1547C132.238 0.440169 133.762 0.440169 135 1.1547L144.856 6.8453C146.094 7.55983 146.856 8.88034 146.856 10.3094V21.6906C146.856 23.1197 146.094 24.4402 144.856 25.1547L135 30.8453C133.762 31.5598 132.238 31.5598 131 30.8453L121.144 25.1547C119.906 24.4402 119.144 23.1197 119.144 21.6906V10.3094C119.144 8.88034 119.906 7.55983 121.144 6.8453L131 1.1547Z" fill="url(#paint2_linear_0_1)"/>
                                <path d="M128.735 12.855C128.822 11.7529 129.264 10.8904 130.06 10.2674C130.856 9.64448 131.889 9.33301 133.159 9.33301C134.005 9.33301 134.733 9.48275 135.343 9.78224C135.965 10.0698 136.432 10.4651 136.743 10.9682C137.066 11.4714 137.228 12.0404 137.228 12.6753C137.228 13.4181 137.004 14.059 136.556 14.5981C136.12 15.1371 135.548 15.4845 134.839 15.6403V15.7301C135.648 15.9218 136.288 16.2992 136.761 16.8622C137.234 17.4253 137.471 18.162 137.471 19.0725C137.471 19.7553 137.309 20.3722 136.985 20.9233C136.662 21.4624 136.176 21.8877 135.529 22.1991C134.882 22.5106 134.104 22.6663 133.196 22.6663C131.877 22.6663 130.794 22.3369 129.948 21.678C129.102 21.0072 128.629 20.0608 128.529 18.8388H130.172C130.259 19.5576 130.564 20.1446 131.087 20.5999C131.609 21.0551 132.306 21.2827 133.177 21.2827C134.048 21.2827 134.708 21.0671 135.156 20.6358C135.616 20.1925 135.847 19.6235 135.847 18.9287C135.847 18.0302 135.536 17.3833 134.913 16.988C134.291 16.5927 133.352 16.395 132.095 16.395H131.665V15.0293H132.113C133.258 15.0173 134.123 14.8376 134.708 14.4902C135.293 14.1309 135.585 13.5798 135.585 12.8371C135.585 12.2021 135.368 11.693 134.932 11.3096C134.509 10.9263 133.899 10.7346 133.103 10.7346C132.331 10.7346 131.709 10.9263 131.236 11.3096C130.763 11.693 130.483 12.2081 130.396 12.855H128.735Z" fill="#141519"/>
                                <defs>
                                    <linearGradient id="paint0_linear_0_1" x1="154" y1="126" x2="154" y2="20" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#141519"/>
                                        <stop offset="1" stopColor="#262430"/>
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_0_1" x1="154" y1="20" x2="154.5" y2="-6.59888e-07" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#141519"/>
                                        <stop offset="1" stopColor="#262430"/>
                                    </linearGradient>
                                    <linearGradient id="paint2_linear_0_1" x1="147" y1="5.33333" x2="121" y2="25.3333" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#A36E33"/>
                                        <stop offset="0.575865" stopColor="#DCCCAA"/>
                                        <stop offset="0.985" stopColor="#A36E33"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <LeaderboardStats />
            <LeaderboardTable />
            <LeaderboardPagination />
        </div>
    )
}