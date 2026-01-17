'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/ui/Icon';

interface HeroSectionProps {
    onAnalyze: (url: string) => void;
    isLoading: boolean;
    error?: string | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onAnalyze, isLoading, error }) => {
    const [url, setUrl] = useState('');

    // Clear error when user starts typing again if we wanted to be fancy, 
    // but for now relying on parent to clear it on submit is fine,
    // or we can't clear parent state easily from here without another callback.

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (url.trim()) {
            onAnalyze(url);
        }
    };

    return (
        <section className="mb-16">
            <div className="text-center mb-10">
                <h1 className="text-white tracking-tight text-4xl lg:text-5xl font-bold leading-tight pb-4">
                    Intelligence from <span className="text-primary italic">any</span> URL.
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Transform corporate websites into deep strategic dossiers using our neural lead scoring.
                </p>
            </div>

            <div className="max-w-3xl mx-auto">
                <div className={`gradient-border-container ${error ? 'shadow-red-500/20' : 'shadow-2xl shadow-primary/10'}`}>
                    <form
                        onSubmit={handleSubmit}
                        className={`flex flex-col md:flex-row bg-[#0f172a] rounded-[0.65rem] overflow-hidden p-2 gap-2 ${error ? 'border border-red-500/50' : ''}`}
                    >
                        <div className="flex-1 flex items-center px-4">
                            <Icon name="link" className={error ? "text-red-400 mr-3" : "text-slate-500 mr-3"} />
                            <input
                                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-slate-600 text-lg py-3"
                                placeholder="Paste Company URL..."
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading || !url.trim()}
                            className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95 whitespace-nowrap"
                        >
                            <Icon name={isLoading ? "sync" : "psychology"} className={isLoading ? "animate-spin" : ""} />
                            {isLoading ? "Analyzing..." : "Analyze with AI"}
                        </button>
                    </form>
                </div>

                {error && (
                    <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start animate-in fade-in slide-in-from-top-2">
                        <Icon name="error_outline" className="text-red-400 mt-0.5 mr-3 shrink-0" />
                        <p className="text-red-200 text-sm">{error}</p>
                    </div>
                )}
            </div>
        </section>
    );
};
