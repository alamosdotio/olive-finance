import React from "react";

const CircularProgressBar = ({percentage = 33, size=80, stroke = 10, color = 'rgb(var(--primary))'}) => {
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="transform -rotate-90"
        >
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke='var(--primary-foreground)'
                strokeWidth={stroke}
                fill="transparent"
            />
            <circle 
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={color}
                strokeWidth={stroke}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
            <text
                x="50%"
                y="50%"
                dominantBaseline="central"
                textAnchor="middle"
                fontSize="1em"
                fill='var(--foreground)'
                transform="rotate(90, 40, 40)"
            >
                {percentage}%
            </text>
        </svg>
    )
}

export default CircularProgressBar;