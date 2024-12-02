import { Info } from 'lucide-react';

export default function PoolInfo(){
    return (
        <div className='space-y-6'>
            <div>
                <h2 className='text-lg font-semibold'>OFLP Pool</h2>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <span>Your LP</span>
                    <Info />
                    <span>57.97%</span>
                </div>
            </div>
            <div className='space-y-4 text-sm'>
                <p>The Olive Finance Liquidity Provider (OFLP) Pool is a liquidity pool where it acts as a counterparty to traders — when traders seek to open leverage positions, they borrow tokens from the pool.</p>
                <p>The OFLP token is the liquidity provider token where it's value is derived from:</p>
                <ul className='ml-6 list-disc space-y-2'>
                    <li>An index fund of SOL, ETH, WBTC, USDC, USDT.</li>
                    <li>Trader's profit and loss</li>
                    <li>75% of the generated fees from opening and closing fees, price impact, borrowing fees, and trading fees of the pool</li>
                </ul>
                <p>
                    The APY, denominated in USD, is calculated based on 75% of fees generated from various trading activities which does not include assets appreciation and traders PnL. The generated fees are distributed back to holders by redepositng the fees into the pool hourly.
                </p>
            </div>
        </div>
    )
}