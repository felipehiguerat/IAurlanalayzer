'use client';

export const AnalysisProgressBar = ({ progress = 68 }: { progress?: number }) => {
    return (
        <div className="max-w-3xl mx-auto mt-8 px-2">
            <div className="flex justify-between items-end mb-3">
                <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </span>
                    <p className="text-slate-300 text-sm font-medium">Neural engine mapping firmographics...</p>
                </div>
                <p className="text-white text-sm font-bold">{progress}%</p>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-primary via-hot-emerald to-primary bg-[length:200%_100%] animate-pulse rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="flex justify-between mt-2">
                <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Operation: Profile_Deep_Scan</p>
                <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Time remaining: 4s</p>
            </div>
        </div>
    );
};
