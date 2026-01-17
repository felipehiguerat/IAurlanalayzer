import React, { useState, useEffect } from 'react';

export interface PieChartSegment {
    id: string;
    label: string;
    value: number; // Percentage 0-100
    color: string;
    subLabel?: string;
}

interface LeadsPieChartProps {
    data: PieChartSegment[];
    totalLabel: string;
    totalValue: string;
}

export const LeadPieChart: React.FC<LeadsPieChartProps> = ({ data, totalLabel, totalValue }) => {
    const [hoveredSegment, setHoveredSegment] = useState<PieChartSegment | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const radius = 40;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        // Trigger animation after mount
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Filter out segments with 0 value for rendering
    const visibleSegments = data.filter(segment => segment.value > 0);

    // Calculate cumulative offsets for stacking segments
    let cumulativePercent = 0;

    // Check if we have any data
    const hasData = visibleSegments.length > 0;

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transform overflow-visible">
                {/* Background Track */}
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    stroke="currentColor"
                    className="text-slate-800/50"
                    strokeWidth="8"
                />

                {/* Segments */}
                {hasData ? (
                    visibleSegments.map((segment) => {
                        // Ensure we don't exceed 100%
                        const segmentValue = Math.min(segment.value, 100 - cumulativePercent);
                        const strokeDasharray = `${(segmentValue / 100) * circumference} ${circumference}`;
                        const strokeDashoffset = -((cumulativePercent / 100) * circumference);

                        // Update cumulative for next segment
                        cumulativePercent += segmentValue;

                        const isHovered = hoveredSegment?.id === segment.id;

                        return (
                            <circle
                                key={segment.id}
                                cx="50"
                                cy="50"
                                r={radius}
                                fill="transparent"
                                stroke={segment.color}
                                strokeWidth={isHovered ? "12" : "10"}
                                strokeDasharray={strokeDasharray}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                className={`transition-all duration-700 ease-out cursor-pointer ${!isLoaded ? 'opacity-0' : 'opacity-100'}`}
                                style={{
                                    strokeDasharray: isLoaded ? strokeDasharray : `0 ${circumference}`,
                                    filter: isHovered ? 'drop-shadow(0 0 4px rgba(255,255,255,0.3))' : 'none',
                                    opacity: hoveredSegment && !isHovered ? 0.5 : 1
                                }}
                                onMouseEnter={() => setHoveredSegment(segment)}
                                onMouseLeave={() => setHoveredSegment(null)}
                            />
                        );
                    })
                ) : (
                    // Show placeholder circle when no data
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="transparent"
                        stroke="#475569"
                        strokeWidth="10"
                        strokeDasharray={`${circumference} ${circumference}`}
                        strokeDashoffset="0"
                        className="opacity-30"
                    />
                )}
            </svg>

            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className={`text-4xl font-black text-white transition-all duration-300 ${hoveredSegment ? 'scale-110' : ''}`}>
                    {hoveredSegment ? `${hoveredSegment.value}%` : totalValue}
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] transition-all duration-300">
                    {hoveredSegment ? hoveredSegment.label : totalLabel}
                </span>
            </div>
        </div>
    );
};

