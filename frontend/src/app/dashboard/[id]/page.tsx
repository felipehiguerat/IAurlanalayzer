'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { leadService } from '@/services/leads';
import { Lead } from '@/lib/types';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { Icon } from '@/components/ui/Icon';
import Background from '@/components/ui/Background';
import { AnalyticsHeader } from '@/components/layout/AnalyticsHeader';

export default function LeadDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [lead, setLead] = useState<Lead | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLead = async () => {
            if (params.id) {
                try {
                    const data = await leadService.getLead(params.id as string);
                    setLead(data);
                } catch (error) {
                    console.error('Error fetching lead:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchLead();
    }, [params.id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center">
                <Icon name="sync" className="animate-spin text-primary text-4xl" />
            </div>
        );
    }

    if (!lead) {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center text-white">
                Lead not found
            </div>
        );
    }

    return (
        <AuthGuard>
            <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100 selection:bg-primary selection:text-white">
                <Background />
                <AnalyticsHeader />

                <main className="max-w-[1200px] mx-auto px-6 py-12 relative z-10">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
                    >
                        <Icon name="arrow_back" />
                        <span>Back to Dashboard</span>
                    </button>

                    <div className="glass-card rounded-2xl p-8 border border-white/10">
                        <div className="flex justify-between items-start mb-6">
                            <h1 className="text-3xl font-bold text-white">{lead.title || 'Untitled Lead'}</h1>
                            <span className={`px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest ${(lead.status || '').toLowerCase() === 'hot'
                                ? 'bg-hot-emerald/20 text-hot-emerald'
                                : 'bg-warm-amber/20 text-warm-amber'
                                }`}>
                                {lead.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-2">Score</span>
                                <span className="text-4xl font-bold text-white">
                                    {lead.ml_score ? Math.round(lead.ml_score * 100) : 0}
                                </span>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 col-span-2">
                                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-2">URL</span>
                                <a href={lead.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate block">
                                    {lead.url}
                                </a>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-white mb-4">Description</h3>
                            <p className="text-slate-300 leading-relaxed">
                                {lead.description || 'No description available.'}
                            </p>
                        </div>

                        {lead.ml_analysis && (
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4">Analysis</h3>
                                <div className="bg-slate-900/50 rounded-xl p-6 border border-white/5">
                                    <pre className="whitespace-pre-wrap font-mono text-sm text-slate-400">
                                        {JSON.stringify(lead.ml_analysis, null, 2)}
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </AuthGuard>
    );
}
