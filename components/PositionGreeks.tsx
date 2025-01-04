interface PositionGreeksProps{
    delta: number
    gamma: number
    theta: number
    vega: number
}

export default function PositionGreeks({delta, gamma, theta, vega} : PositionGreeksProps){
    return (
        <div className='w-full flex flex-col space-y-1'>
            <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                <div className='flex space-x-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.33337 11.6663H11.6667L7.00004 2.33301L2.33337 11.6663Z" stroke="#808693" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Delta: </span>
                </div>
                <span>{delta}</span>
            </div>
            <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                <div className='flex space-x-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M9.91663 2.33301H5.66663C5.11434 2.33301 4.66663 2.78072 4.66663 3.33301V11.6663" stroke="#808693" strokeLinecap="round"/>
                    </svg>
                    <span>Gamma: </span>
                </div>
                <span>{gamma}</span>
            </div>
            <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                <div className='flex space-x-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.33337 11.6663H11.6667L7.00004 2.33301L2.33337 11.6663Z" stroke="#808693" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Theta: </span>
                </div>
                <span>{theta}</span>
            </div>
            <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                <div className='flex space-x-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.91663 2.33301L5.8961 9.56889C6.22711 10.3727 7.35544 10.4005 7.7256 9.61393L11.1519 2.33301" stroke="#808693" strokeLinecap="round"/>
                    </svg>
                    <span>Vega: </span>
                </div>
                <span>{vega}</span>
            </div>
            <div className='w-full flex justify-between text-sm text-secondary-foreground font-normal'>
                <div className='flex space-x-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M4.08337 11.6663V7.84124M4.08337 7.84124V3.28173C4.08337 2.76798 4.47257 2.33371 4.98632 2.33302C6.89621 2.33046 9.54784 2.87119 9.54784 5.10898C9.54784 7.73192 5.90486 8.02338 4.08337 7.84124Z" stroke="#808693" strokeLinecap="round"/>
                    </svg>
                    <span>Rho: </span>
                </div>
                <span>0.9812</span>
            </div>
        </div>
    )
}