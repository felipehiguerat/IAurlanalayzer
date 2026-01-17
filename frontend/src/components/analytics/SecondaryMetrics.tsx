'use client';

import React from 'react';
import { Icon } from '@/components/ui/Icon';

export const SecondaryMetrics = () => {
    return (
        <div className="grid grid-cols-12 gap-6 mt-6">
            <div className="col-span-12 lg:col-span-6 glass-panel p-6 rounded-2xl bg-surface-dark/50 backdrop-blur-md border border-white/10">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-white font-bold">Campaign Performance</h3>
                    <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                        View Detailed Report <Icon name="arrow_forward" className="text-[14px]" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg border border-white/5">
                        <div className="size-10 bg-slate-800 rounded flex items-center justify-center text-primary">
                            <Icon name="rocket_launch" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-bold text-white">Q3 Executive Search</p>
                            <div className="w-full bg-white/5 h-1 rounded-full mt-2">
                                <div className="bg-primary h-full w-[88%] rounded-full"></div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-bold text-white">88%</p>
                            <p className="text-[10px] text-slate-500">Target Reached</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg border border-white/5">
                        <div className="size-10 bg-slate-800 rounded flex items-center justify-center text-cyber-emerald">
                            <Icon name="hub" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-bold text-white">Mid-Level Dev Sourcing</p>
                            <div className="w-full bg-white/5 h-1 rounded-full mt-2">
                                <div className="bg-cyber-emerald h-full w-[42%] rounded-full"></div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-bold text-white">42%</p>
                            <p className="text-[10px] text-slate-500">In Progress</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-span-12 lg:col-span-6 glass-panel p-6 rounded-2xl bg-surface-dark/50 backdrop-blur-md border border-white/10">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-white font-bold">Volume Trends</h3>
                    <div className="flex gap-2">
                        <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-bold text-slate-400">7D</span>
                        <span className="px-2 py-0.5 rounded bg-primary/20 text-[10px] font-bold text-primary">30D</span>
                    </div>
                </div>
                <div className="h-32 flex items-end gap-2 px-2">
                    {/* Visual Sparkline Placeholder */}
                    <div className="flex-1 bg-primary/20 rounded-t-sm h-[40%] hover:bg-primary transition-all"></div>
                    <div className="flex-1 bg-primary/20 rounded-t-sm h-[55%] hover:bg-primary transition-all"></div>
                    <div className="flex-1 bg-primary/20 rounded-t-sm h-[35%] hover:bg-primary transition-all"></div>
                    <div className="flex-1 bg-primary/20 rounded-t-sm h-[70%] hover:bg-primary transition-all"></div>
                    <div className="flex-1 bg-primary/20 rounded-t-sm h-[65%] hover:bg-primary transition-all"></div>
                    <div className="flex-1 bg-primary/20 rounded-t-sm h-[85%] hover:bg-primary transition-all"></div>
                    <div className="flex-1 bg-primary/20 rounded-t-sm h-[95%] hover:bg-primary transition-all"></div>
                    <div className="flex-1 bg-primary/20 rounded-t-sm h-[80%] hover:bg-primary transition-all"></div>
                    <div className="flex-1 bg-primary/20 rounded-t-sm h-[60%] hover:bg-primary transition-all"></div>
                    <div className="flex-1 bg-primary/20 rounded-t-sm h-[75%] hover:bg-primary transition-all"></div>
                </div>
                <div className="flex justify-between mt-3 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    <span>May 01</span>
                    <span>May 15</span>
                    <span>May 31</span>
                </div>
            </div>
        </div>
    );
};
