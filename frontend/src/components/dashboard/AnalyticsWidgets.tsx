'use client';

export const AnalyticsWidgets = () => {
    return (
        <section className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="glass-card p-4 rounded-xl">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Avg Lead Quality</p>
                <div className="flex items-end gap-2">
                    <h5 className="text-2xl font-bold text-white">82%</h5>
                    <span className="text-hot-emerald text-xs font-bold mb-1">+4% vs LW</span>
                </div>
            </div>

            <div className="glass-card p-4 rounded-xl">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Profile Depth</p>
                <div className="flex items-end gap-2">
                    <h5 className="text-2xl font-bold text-white">Advanced</h5>
                    <div className="flex gap-0.5 mb-1">
                        <div className="h-1.5 w-3 bg-primary rounded-full"></div>
                        <div className="h-1.5 w-3 bg-primary rounded-full"></div>
                        <div className="h-1.5 w-3 bg-primary rounded-full"></div>
                    </div>
                </div>
            </div>

            <div className="glass-card p-4 rounded-xl">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Analyzed Today</p>
                <h5 className="text-2xl font-bold text-white">142</h5>
            </div>

            <div className="glass-card p-4 rounded-xl border border-primary/20 bg-primary/5">
                <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-1">Neural Uptime</p>
                <div className="flex items-center gap-2">
                    <h5 className="text-2xl font-bold text-white">99.9%</h5>
                    <div className="h-2 w-2 rounded-full bg-hot-emerald animate-pulse"></div>
                </div>
            </div>
        </section>
    );
};
