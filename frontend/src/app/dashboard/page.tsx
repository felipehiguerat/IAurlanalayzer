'use client';

import React, { useState, useEffect } from 'react';
import { AnalyticsHeader } from '@/components/layout/AnalyticsHeader';
import { Footer } from '@/components/layout/Footer';
import Background from '@/components/ui/Background';
import { Icon } from '@/components/ui/Icon';
import { HeroSection } from '@/components/dashboard/HeroSection';
import { AnalysisProgressBar } from '@/components/dashboard/AnalysisProgressBar';
import { LeadCard } from '@/components/dashboard/LeadCard';
import { AnalyticsWidgets } from '@/components/dashboard/AnalyticsWidgets';
import { leadService } from '@/services/leads';
import { Lead } from '@/lib/types';
import { AuthGuard } from '@/components/auth/AuthGuard';

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch leads on mount
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const data = await leadService.getLeads();
        setLeads(data);
      } catch (error) {
        console.error('Error fetching leads:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const handleAnalyze = async (url: string) => {
    setIsAnalyzing(true);
    setError(null);
    setProgress(10);

    // Simulate progress while calling API
    const interval = setInterval(() => {
      setProgress(prev => (prev < 90 ? prev + 5 : prev));
    }, 500);

    try {
      const newLead = await leadService.extractLead(url);
      setProgress(100);
      setLeads(prev => [newLead, ...prev]);

      // Reset progress bar after 1s
      setTimeout(() => {
        setIsAnalyzing(false);
        setProgress(0);
      }, 1000);
    } catch (error: any) {
      console.error('Error analyzing lead:', error);
      setIsAnalyzing(false);
      setProgress(0);

      const errorMessage = error.response?.data?.detail || 'Failed to analyze the URL. Please check your connection.';
      setError(errorMessage);
    } finally {
      clearInterval(interval);
    }
  };

  return (
    <AuthGuard>
      <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100 selection:bg-primary selection:text-white">
        <Background />
        <AnalyticsHeader />

        <main className="max-w-[1200px] mx-auto px-6 py-12 relative z-10">
          {/* Hero Section & Input */}
          <HeroSection onAnalyze={handleAnalyze} isLoading={isAnalyzing} error={error} />

          {/* Progress Bar Area */}
          {isAnalyzing && <AnalysisProgressBar progress={progress} />}

          {/* Lead Grid Area */}
          <section className="mt-20">
            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-bold text-white">Recent Analyses</h3>
                <span className="bg-surface-dark px-3 py-1 rounded-full text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {leads.length} Results
                </span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-surface-dark text-slate-400 hover:text-white transition-colors">
                  <Icon name="filter_list" />
                </button>
                <button className="p-2 rounded-lg bg-surface-dark text-slate-400 hover:text-white transition-colors">
                  <Icon name="grid_view" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                // Loading Skeleton State
                [1, 2, 3].map(i => <LeadCard key={i} status="processing" />)
              ) : leads.length > 0 ? (
                leads.map(lead => (
                  <LeadCard key={lead._id} lead={lead} />
                ))
              ) : (
                // Empty State
                <div className="col-span-full py-20 text-center glass-card rounded-xl border-dashed border-2 border-white/10 opacity-60">
                  <Icon name="find_in_page" className="text-5xl text-slate-600 mb-4" />
                  <p className="text-slate-500 font-bold uppercase tracking-widest">No Analyses Found</p>
                  <p className="text-slate-600 text-sm mt-2">Enter a URL above to start your first strategic analysis.</p>
                </div>
              )}

              {/* Show a processing card if asnylyzing but not yet in list */}
              {isAnalyzing && progress < 100 && <LeadCard status="processing" />}
            </div>
          </section>

          {/* Secondary Analytics Widgets */}
          <AnalyticsWidgets />
        </main>

        <Footer />
      </div>
    </AuthGuard>
  );
}
