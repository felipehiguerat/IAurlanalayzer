'use client';

import React from 'react';
import { Icon } from '@/components/ui/Icon';

export const StatsCards = () => {
    return (
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="glass-panel p-6 flex flex-col gap-2 hover:border-primary/30 transition-all rounded-2xl bg-surface-dark/50 backdrop-blur-md border border-white/10">
                <div className="flex justify-between items-start">
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Leads</p>
                    <Icon name="groups" className="text-primary" />
                </div>
                <div className="flex items-baseline gap-3">
                    <p className="text-white tracking-tight text-4xl font-bold">12,480</p>
                    <p className="text-cyber-emerald text-sm font-bold flex items-center">
                        <Icon name="trending_up" className="text-[16px] mr-1" />
                        12.5%
                    </p>
                </div>
                <div className="mt-4 w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[75%] rounded-full"></div>
                </div>
            </div>

            <div className="glass-panel p-6 flex flex-col gap-2 hover:border-primary/30 transition-all rounded-2xl bg-surface-dark/50 backdrop-blur-md border border-white/10">
                <div className="flex justify-between items-start">
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Conversion Rate</p>
                    <Icon name="task_alt" className="text-cyber-emerald" />
                </div>
                <div className="flex items-baseline gap-3">
                    <p className="text-white tracking-tight text-4xl font-bold">8.4%</p>
                    <p className="text-cyber-emerald text-sm font-bold flex items-center">
                        <Icon name="trending_up" className="text-[16px] mr-1" />
                        2.1%
                    </p>
                </div>
                <div className="mt-4 flex gap-1">
                    <div className="h-4 flex-1 bg-cyber-emerald/20 rounded-sm"></div>
                    <div className="h-4 flex-1 bg-cyber-emerald/40 rounded-sm"></div>
                    <div className="h-4 flex-1 bg-cyber-emerald/60 rounded-sm"></div>
                    <div className="h-4 flex-1 bg-cyber-emerald/80 rounded-sm"></div>
                    <div className="h-4 flex-1 bg-cyber-emerald rounded-sm"></div>
                </div>
            </div>

            <div className="glass-panel p-6 flex flex-col gap-2 hover:border-primary/30 transition-all rounded-2xl bg-surface-dark/50 backdrop-blur-md border border-white/10">
                <div className="flex justify-between items-start">
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Response Time</p>
                    <Icon name="timer" className="text-cyber-amber" />
                </div>
                <div className="flex items-baseline gap-3">
                    <p className="text-white tracking-tight text-4xl font-bold">1.2h</p>
                    <p className="text-slate-500 text-sm font-medium">-14m avg</p>
                </div>
                <div className="mt-4 flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    <span>Fastest: 0.2h</span>
                    <span>Target: 2.0h</span>
                </div>
            </div>
        </div>
    );
};
