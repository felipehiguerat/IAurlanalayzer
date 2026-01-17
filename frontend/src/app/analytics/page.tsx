'use client';

import React from 'react';
import { AnalyticsHeader } from '@/components/layout/AnalyticsHeader';
import { StatsCards } from '@/components/analytics/StatsCards';
import { LeadDistribution } from '@/components/analytics/LeadDistribution';
import { SecondaryMetrics } from '@/components/analytics/SecondaryMetrics';
import { Icon } from '@/components/ui/Icon';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { leadService } from '@/services/leads';
import { Lead } from '@/lib/types';
import Papa from 'papaparse';
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/components/ui/Toast';

interface CSVRow {
    url: string;
    [key: string]: string;
}

export default function AnalyticsPage() {
    const { showToast } = useToast();
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isImporting, setIsImporting] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [importProgress, setImportProgress] = useState('');
    const [csvPreview, setCsvPreview] = useState<CSVRow[]>([]);
    const [showPreview, setShowPreview] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchLeads = async () => {
        try {
            const data = await leadService.getLeads();
            setLeads(data);
        } catch (error) {
            console.error('Error fetching leads:', error);
            showToast('Error loading leads', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setImportProgress('Parsing CSV...');

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                try {
                    const rows = results.data as CSVRow[];

                    // Validate that we have URLs
                    const validRows = rows.filter(r => r.url && r.url.trim() !== '');

                    if (validRows.length === 0) {
                        showToast('No valid URLs found in CSV. Make sure you have a "url" column.', 'error');
                        setImportProgress('');
                        if (fileInputRef.current) fileInputRef.current.value = '';
                        return;
                    }

                    // Show preview
                    setCsvPreview(validRows.slice(0, 10)); // Show first 10 rows
                    setShowPreview(true);
                    setImportProgress(`Found ${validRows.length} URLs. Review and confirm import.`);
                } catch (error) {
                    console.error('Error parsing CSV:', error);
                    showToast('Error parsing CSV file', 'error');
                    setImportProgress('');
                }
            },
            error: (error) => {
                console.error('Papa Parse error:', error);
                showToast('Error reading CSV file', 'error');
                setImportProgress('');
            }
        });
    };

    const handleConfirmImport = async () => {
        if (csvPreview.length === 0) return;

        setIsImporting(true);
        setShowPreview(false);
        setImportProgress('Importing URLs...');

        try {
            const urls = csvPreview.map(row => row.url.trim());

            // Use bulk import endpoint
            const result = await leadService.bulkImport(urls, 1);

            // Refresh leads
            await fetchLeads();

            // Show results
            if (result.failed > 0) {
                showToast(
                    `Import completed: ${result.successful} successful, ${result.failed} failed`,
                    'warning'
                );
                console.log('Failed imports:', result.errors);
            } else {
                showToast(`Successfully imported ${result.successful} leads!`, 'success');
            }
        } catch (error) {
            console.error('Error importing CSV:', error);
            showToast('Error importing leads', 'error');
        } finally {
            setIsImporting(false);
            setImportProgress('');
            setCsvPreview([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleCancelImport = () => {
        setShowPreview(false);
        setCsvPreview([]);
        setImportProgress('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleExportClick = async () => {
        setIsExporting(true);
        try {
            await leadService.exportCSV();
            showToast('CSV exported successfully!', 'success');
        } catch (error) {
            console.error('Error exporting CSV:', error);
            showToast('Error exporting leads', 'error');
        } finally {
            setIsExporting(false);
        }
    };
    return (
        <AuthGuard>
            <div
                className="bg-background-dark min-h-screen text-slate-200 font-display selection:bg-primary selection:text-white"
                style={{ background: 'radial-gradient(circle at 50% 0%, #1e293b 0%, #0f1729 100%)' }}
            >
                <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                    <div className="layout-container flex h-full grow flex-col">
                        <AnalyticsHeader />

                        <main className="flex-1 px-4 lg:px-40 py-8">
                            {/* Page Heading */}
                            <div className="flex flex-wrap justify-between items-end gap-3 mb-8">
                                <div className="flex min-w-72 flex-col gap-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-pulse"></span>
                                        <span className="text-[10px] font-bold text-cyber-emerald uppercase tracking-[0.2em]">System Live</span>
                                    </div>
                                    <h1 className="text-white text-4xl font-bold leading-tight tracking-tight">Analytics Overview</h1>
                                    <p className="text-slate-400 text-base font-normal">Intelligence report for the last 30 days</p>
                                </div>
                                <div className="flex gap-3">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        accept=".csv"
                                        className="hidden"
                                    />
                                    <button
                                        onClick={handleImportClick}
                                        disabled={isImporting}
                                        className={`flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm font-bold hover:bg-white/10 transition-all ${isImporting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <Icon name={isImporting ? "hourglass_empty" : "upload_file"} className="text-[18px]" />
                                        <span>{isImporting ? importProgress : 'Import CSV'}</span>
                                    </button>
                                    <button
                                        onClick={handleExportClick}
                                        disabled={isExporting || leads.length === 0}
                                        className={`flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm font-bold hover:bg-white/10 transition-all ${(isExporting || leads.length === 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <Icon name={isExporting ? "hourglass_empty" : "download"} className="text-[18px]" />
                                        <span>{isExporting ? 'Exporting...' : 'Export CSV'}</span>
                                    </button>


                                </div>
                            </div>

                            {/* CSV Preview Modal */}
                            {showPreview && (
                                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                                    <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
                                        <div className="p-6 border-b border-white/10">
                                            <h2 className="text-2xl font-bold text-white mb-2">CSV Import Preview</h2>
                                            <p className="text-slate-400">
                                                {importProgress} - Showing first 10 rows
                                            </p>
                                        </div>

                                        <div className="overflow-auto max-h-[50vh] p-6">
                                            <table className="w-full">
                                                <thead className="sticky top-0 bg-slate-800 border-b border-white/10">
                                                    <tr>
                                                        <th className="text-left p-3 text-sm font-bold text-slate-300">#</th>
                                                        <th className="text-left p-3 text-sm font-bold text-slate-300">URL</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {csvPreview.map((row, index) => (
                                                        <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                            <td className="p-3 text-sm text-slate-400">{index + 1}</td>
                                                            <td className="p-3 text-sm text-slate-200 font-mono break-all">{row.url}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="p-6 border-t border-white/10 flex justify-end gap-3">
                                            <button
                                                onClick={handleCancelImport}
                                                className="px-6 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm font-bold hover:bg-white/10 transition-all"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleConfirmImport}
                                                className="px-6 py-2 bg-primary rounded-lg text-white text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                                            >
                                                Confirm Import ({csvPreview.length} URLs)
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Tabs */}
                            <div className="pb-6">
                                <div className="flex border-b border-white/5 px-0 gap-8">
                                    <a className="flex items-center gap-2 border-b-2 border-primary text-white pb-4 px-2" href="#">
                                        <span className="text-sm font-bold tracking-wide">Overview</span>
                                    </a>
                                    <a className="flex items-center gap-2 border-b-2 border-transparent text-slate-500 pb-4 px-2 hover:text-slate-300 transition-colors" href="#">
                                        <span className="text-sm font-bold tracking-wide">Quality Scoring</span>
                                    </a>
                                    <a className="flex items-center gap-2 border-b-2 border-transparent text-slate-500 pb-4 px-2 hover:text-slate-300 transition-colors" href="#">
                                        <span className="text-sm font-bold tracking-wide">Funnel Insights</span>
                                    </a>
                                </div>
                            </div>

                            {/* Main Grid */}
                            <div className="grid grid-cols-12 gap-6">
                                <StatsCards />
                                <LeadDistribution leads={leads} />
                            </div>

                            {/* Secondary Row */}
                            <SecondaryMetrics />
                        </main>
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
}
