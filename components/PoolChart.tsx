'use client'

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useTheme } from 'next-themes';

const data = [
    {time: '11/01', value: 0.024},
    {time: '11/05', value: 0.025},
    {time: '11/10', value: 0.023},
    {time: '11/15', value: 0.026},
    {time: '11/20', value: 0.022},
    {time: '11/25', value: 0.024},
    {time: '11/30', value: 0.025},
]

export default function PoolChart() {
    const { theme } = useTheme()

    return(
        <div className="h-52 w-full">
            <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={data}>
                    <XAxis
                        dataKey='time'
                        stroke='#888888'
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke='#888888'
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip
                        content={({active, payload}) =>{
                            if(active && payload && payload.length) {
                                return (
                                    <div className="rounded-lg border bg-background p-2 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className='flex flex-col'>
                                                <span className='text-[0.70rem] uppercase text-muted-foreground'>
                                                    Value
                                                </span>
                                                <span className='font-bold text-muted-foreground'>
                                                    {payload[0].value}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            return null
                        }}
                    />
                    <Line
                        type='monotone'
                        dataKey='value'
                        stroke='#88888'
                        strokeWidth={2}
                        dot={false}
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={theme === 'dark' ? "#9B7EBD" : "#DDD1E8"} />
                            <stop offset="100%" stopColor={theme === 'dark' ? "#9B7EBD" : "#DDD1E8"} stopOpacity={0.2} />
                        </linearGradient>
                    </defs>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}