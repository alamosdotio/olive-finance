interface PositionOverviewProps{
    type: string
    expiry: string
    size: number
    pnl: number
}

export default function PositionOverview({type, expiry, size, pnl} : PositionOverviewProps){
    return (
        <div className='w-full flex flex-col space-y-1'>
            <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                <div className='flex space-x-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1.74545 9.33301L4.07879 11.6663L6.41212 9.33301" stroke="#808693" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.08334 11.6663V2.33301" stroke="#808693" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12.25 4.66634L9.91668 2.33301L7.58334 4.66634" stroke="#808693" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.91667 2.33301V11.6663" stroke="#808693" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Position Type:</span>
                </div>
                <span>{type}</span>
            </div>
            <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                <div className='flex space-x-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M4.66666 1.16699V3.50033" stroke="#808693" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.33333 1.16699V3.50033" stroke="#808693" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12.2455 7.58301V3.49967C12.2455 3.19026 12.1225 2.89351 11.9037 2.67472C11.685 2.45592 11.3882 2.33301 11.0788 2.33301H2.91212C2.6027 2.33301 2.30595 2.45592 2.08716 2.67472C1.86837 2.89351 1.74545 3.19026 1.74545 3.49967V11.6663C1.74545 11.9758 1.86837 12.2725 2.08716 12.4913C2.30595 12.7101 2.6027 12.833 2.91212 12.833H7.57879" stroke="#808693" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1.74545 5.83301H12.2455" stroke="#808693" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.91667 12.8337L12.8333 9.91699" stroke="#808693" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.91667 9.91699L12.8333 12.8337" stroke="#808693" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Expiry:</span>
                </div>
                <span>{expiry}</span>
            </div>
            <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                <div className='flex space-x-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <g clipPath="url(#clip0_257_25264)">
                            <path d="M4.66666 8.16602C6.59965 8.16602 8.16666 6.59901 8.16666 4.66602C8.16666 2.73302 6.59965 1.16602 4.66666 1.16602C2.73366 1.16602 1.16666 2.73302 1.16666 4.66602C1.16666 6.59901 2.73366 8.16602 4.66666 8.16602Z" stroke="#808693" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10.5501 6.04883C11.1016 6.25441 11.5922 6.59572 11.9768 7.04119C12.3614 7.48667 12.6274 8.02192 12.7503 8.59745C12.8732 9.17298 12.849 9.77021 12.6799 10.3339C12.5108 10.8976 12.2023 11.4096 11.783 11.8224C11.3636 12.2353 10.8469 12.5358 10.2806 12.696C9.71436 12.8563 9.11682 12.8712 8.54328 12.7393C7.96973 12.6075 7.4387 12.3331 6.99928 11.9417C6.55986 11.5502 6.22625 11.0542 6.0293 10.4997" stroke="#808693" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4.08334 3.5H4.66668V5.83333" stroke="#808693" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9.7497 8.09668L10.158 8.51085L8.51303 10.1558" stroke="#808693" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_257_25264">
                            <rect width="14" height="14" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                    <span>Size:</span>
                </div>
                <span>{size}</span>
            </div>
            <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                <div className='flex space-x-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <g clipPath="url(#clip0_257_25264)">
                            <path d="M4.66666 8.16602C6.59965 8.16602 8.16666 6.59901 8.16666 4.66602C8.16666 2.73302 6.59965 1.16602 4.66666 1.16602C2.73366 1.16602 1.16666 2.73302 1.16666 4.66602C1.16666 6.59901 2.73366 8.16602 4.66666 8.16602Z" stroke="#808693" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10.5501 6.04883C11.1016 6.25441 11.5922 6.59572 11.9768 7.04119C12.3614 7.48667 12.6274 8.02192 12.7503 8.59745C12.8732 9.17298 12.849 9.77021 12.6799 10.3339C12.5108 10.8976 12.2023 11.4096 11.783 11.8224C11.3636 12.2353 10.8469 12.5358 10.2806 12.696C9.71436 12.8563 9.11682 12.8712 8.54328 12.7393C7.96973 12.6075 7.4387 12.3331 6.99928 11.9417C6.55986 11.5502 6.22625 11.0542 6.0293 10.4997" stroke="#808693" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4.08334 3.5H4.66668V5.83333" stroke="#808693" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9.7497 8.09668L10.158 8.51085L8.51303 10.1558" stroke="#808693" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_257_25264">
                            <rect width="14" height="14" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                    <span>Strike Price:</span>
                </div>
                <span>strike price</span>
            </div>
            <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                <div className='flex space-x-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <g clipPath="url(#clip0_257_25264)">
                            <path d="M4.66666 8.16602C6.59965 8.16602 8.16666 6.59901 8.16666 4.66602C8.16666 2.73302 6.59965 1.16602 4.66666 1.16602C2.73366 1.16602 1.16666 2.73302 1.16666 4.66602C1.16666 6.59901 2.73366 8.16602 4.66666 8.16602Z" stroke="#808693" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10.5501 6.04883C11.1016 6.25441 11.5922 6.59572 11.9768 7.04119C12.3614 7.48667 12.6274 8.02192 12.7503 8.59745C12.8732 9.17298 12.849 9.77021 12.6799 10.3339C12.5108 10.8976 12.2023 11.4096 11.783 11.8224C11.3636 12.2353 10.8469 12.5358 10.2806 12.696C9.71436 12.8563 9.11682 12.8712 8.54328 12.7393C7.96973 12.6075 7.4387 12.3331 6.99928 11.9417C6.55986 11.5502 6.22625 11.0542 6.0293 10.4997" stroke="#808693" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4.08334 3.5H4.66668V5.83333" stroke="#808693" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9.7497 8.09668L10.158 8.51085L8.51303 10.1558" stroke="#808693" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_257_25264">
                            <rect width="14" height="14" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                    <span>Value:</span>
                </div>
                <span>value</span>
            </div>
            <div className='w-full flex justify-between text-sm text-[#FF6889] font-normal'>
                <div className='flex space-x-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M12.8333 9.91634L7.87499 4.95801L4.95832 7.87467L1.16666 4.08301" stroke="#FF6889" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.33333 9.91699H12.8333V6.41699" stroke="#FF6889" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>P&L:</span>
                </div>
                <span>{pnl}</span>
            </div>
        </div>
    )
}