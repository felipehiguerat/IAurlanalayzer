'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import { Lead } from '@/lib/types';

interface LeadCardProps {
    lead?: Lead;
    status?: 'processing';
}

export const LeadCard: React.FC<LeadCardProps> = ({
    lead,
    status
}) => {
    if (status === 'processing' || !lead) {
        return (
            <div className="glass-card rounded-xl p-5 flex flex-col items-center justify-center border-dashed border-2 border-white/10 opacity-60 h-full min-h-[300px]">
                <div className="relative mb-4">
                    <Icon name="data_exploration" className="text-slate-600 text-5xl animate-spin" />
                </div>
                <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">Awaiting Analysis</p>
                <p className="text-slate-600 text-[10px] text-center mt-2 px-6">Input a URL above to populate this intelligence node</p>
            </div>
        );
    }

    const isHot = (lead.status || '').toLowerCase() === 'hot';
    const score = lead.ml_score ? Math.round(lead.ml_score * 100) : 0;

    return (
        <div className={cn(
            "glass-card rounded-xl p-5 hover:scale-[1.02] transition-all duration-300 group border-l-4",
            isHot ? "glow-hot border-l-hot-emerald" : "glow-warm border-l-warm-amber"
        )}>
            <div className="flex justify-between items-start mb-4">
                <div className={cn(
                    "size-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 transition-colors",
                    isHot ? "group-hover:border-hot-emerald/50" : "group-hover:border-warm-amber/50"
                )}>
                    <Icon
                        name={isHot ? "hub" : "corporate_fare"}
                        className={cn("text-3xl", isHot ? "text-hot-emerald" : "text-warm-amber")}
                    />
                </div>
                <div className="flex flex-col items-end">
                    <span className={cn(
                        "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full mb-1",
                        isHot ? "bg-hot-emerald/20 text-hot-emerald" : "bg-warm-amber/20 text-warm-amber"
                    )}>
                        {isHot ? 'Hot Prospect' : 'Warm Lead'}
                    </span>
                    <span className="text-white font-bold text-lg">{score} Fit Score</span>
                </div>
            </div>

            <div className="mb-6">
                <h4 className="text-white font-bold text-xl mb-1 truncate" title={lead.title || 'No Title'}>
                    {lead.title || 'Untitled Lead'}
                </h4>
                <p className="text-slate-400 text-sm line-clamp-2" title={lead.description || lead.url}>
                    {lead.description || lead.url}
                </p>
            </div>

            <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                    <span className="text-slate-500 uppercase font-bold tracking-tight">Signal</span>
                    <span className="text-slate-300 truncate ml-4" title={lead.ml_analysis?.reasoning || 'AI Analysis in progress'}>
                        {lead.status || 'Unknown'} Signal Detected
                    </span>
                </div>
                <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                    <span className="text-slate-500 uppercase font-bold tracking-tight">Source</span>
                    <span className="text-slate-300 truncate ml-4" title={lead.url}>
                        {(() => {
                            try {
                                return new URL(lead.url).hostname;
                            } catch (e) {
                                return lead.url.replace(/^https?:\/\//, '').split('/')[0] || 'Unknown Source';
                            }
                        })()}
                    </span>
                </div>
            </div>

            <Link
                href={`/dashboard/${lead._id}`}
                className={cn(
                    "w-full py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-bold text-slate-300 transition-all flex items-center justify-center gap-2",
                    isHot ? "hover:bg-hot-emerald hover:text-white hover:border-hot-emerald" : "hover:bg-warm-amber hover:text-white hover:border-warm-amber"
                )}
            >
                View details <Icon name="arrow_forward" className="text-sm" />
            </Link>
        </div>
    );
};

