'use client';

import React, { useMemo } from 'react';
import { Icon } from '@/components/ui/Icon';
import { LeadPieChart, PieChartSegment } from './LeadsPieChart';
import { Lead } from '@/lib/types';
import { calculatePieData } from '@/lib/calculatePieData';

interface LeadDistributionProps {
    leads?: Lead[];
}

export const LeadDistribution: React.FC<LeadDistributionProps> = ({ leads = [] }) => {

    // Calculate percentages using helper
    const { green: hotPercent, yellow: neutralPercent, blue: coldPercent } = useMemo(() =>
        calculatePieData(leads),
        [leads]);

    const chartData: PieChartSegment[] = useMemo(() => [
        {
            id: 'hot',
            label: 'Hot Leads',
            value: hotPercent,
            color: '#10b981', // cyber-emerald
            subLabel: 'Engaged & qualified'
        },
        {
            id: 'neutral',
            label: 'Neutral Leads',
            value: neutralPercent,
            color: '#f59e0b', // cyber-amber
            subLabel: 'Moderate potential'
        },
        {
            id: 'cold',
            label: 'Cold Leads',
            value: coldPercent,
            color: '#3b82f6', // primary blue
            subLabel: 'Low engagement'
        }
    ], [hotPercent, neutralPercent, coldPercent]);

    // Calculate actual counts for legend
    const hotCount = leads.filter(l => l.status?.toLowerCase() === 'hot').length;
    const neutralCount = leads.filter(l => l.status?.toLowerCase() === 'neutral').length;
    const coldCount = leads.filter(l => l.status?.toLowerCase() === 'cold').length;

    // Calculate efficiency based on hot leads percentage
    const totalLeads = leads.length;
    const efficiency = totalLeads > 0 ? `${Math.round((hotCount / totalLeads) * 100)}%` : '0%';

    return (
        <div className="col-span-12 lg:col-span-8">
            <div className="glass-panel p-8 h-full flex flex-col relative overflow-hidden rounded-2xl bg-surface-dark/50 backdrop-blur-md border border-white/10">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Icon name="analytics" className="text-[120px]" />
                </div>
                <h2 className="text-white text-xl font-bold mb-8">Lead Distribution Quality</h2>
                <div className="flex flex-1 items-center justify-center gap-12">
                    {/* Doughnut Chart with Internal Interactive Text */}
                    <div className="relative size-64 flex items-center justify-center">
                        <LeadPieChart
                            data={chartData}
                            totalLabel="Efficiency"
                            totalValue={efficiency}
                        />
                    </div>

                    {/* Legend */}
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-3">
                                <div className="size-3 rounded-full bg-cyber-emerald"></div>
                                <span className="text-sm font-bold text-white">Hot Leads</span>
                                <span className="text-xs text-slate-500 ml-auto">{hotCount.toLocaleString()}</span>
                            </div>
                            <p className="text-[11px] text-slate-400 ml-6 italic">Engaged & highly qualified</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-3">
                                <div className="size-3 rounded-full bg-cyber-amber"></div>
                                <span className="text-sm font-bold text-white">Neutral Leads</span>
                                <span className="text-xs text-slate-500 ml-auto">{neutralCount.toLocaleString()}</span>
                            </div>
                            <p className="text-[11px] text-slate-400 ml-6 italic">Moderate potential, needs review</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-3">
                                <div className="size-3 rounded-full bg-primary"></div>
                                <span className="text-sm font-bold text-white">Cold Leads</span>
                                <span className="text-xs text-slate-500 ml-auto">{coldCount.toLocaleString()}</span>
                            </div>
                            <p className="text-[11px] text-slate-400 ml-6 italic">Low engagement, requires nurturing</p>
                        </div>
                    </div>
                </div>
                {/* Bottom Insights */}
                <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-8">
                    <div className="flex items-start gap-4">
                        <div className="p-2 rounded bg-primary/10">
                            <Icon name="psychology" className="text-primary text-[20px]" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-white mb-1">AI Insight</p>
                            <p className="text-xs text-slate-400 leading-relaxed">Hot leads have increased by 18% in the 'Tech' sector over the last 48 hours.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="p-2 rounded bg-cyber-emerald/10">
                            <Icon name="auto_awesome" className="text-cyber-emerald text-[20px]" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-white mb-1">Smart Action</p>
                            <p className="text-xs text-slate-400 leading-relaxed">System recommends increasing Outreach budget for the 'North America' campaign.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
