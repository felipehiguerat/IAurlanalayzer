'use client';

import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { useRouter } from 'next/navigation';

export const AnalyticsHeader = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };
    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-white/5 bg-background-dark/80 backdrop-blur-md px-10 py-3 sticky top-0 z-50">
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-3 text-white">
                    <div className="size-8 bg-primary rounded flex items-center justify-center">
                        <Icon name="bolt" className="text-white text-xl" />
                    </div>
                    <h2 className="text-white text-xl font-bold leading-tight tracking-tight">LeadGen <span className="text-primary">AI</span></h2>
                </div>

            </div>
            <div className="flex flex-1 justify-end gap-6 items-center">
                <nav className="flex items-center gap-8">
                    <Link className="text-white text-sm font-medium hover:text-primary transition-colors" href="/dashboard">Dashboard</Link>
                    <Link className="text-slate-400 text-sm font-medium hover:text-white transition-colors" href="/analytics">Analytics</Link>

                </nav>
                <div className="h-6 w-px bg-white/10 mx-2"></div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 group px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-all"
                >
                    <Icon name="logout" className="text-slate-400 group-hover:text-white transition-colors" />
                    <span className="text-sm font-bold">Log Out</span>
                </button>
                <div className="h-10 w-10 rounded-full border-2 border-primary/50 overflow-hidden ring-4 ring-primary/10">
                    <img
                        className="w-full h-full object-cover"
                        alt="User avatar"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmnqW0LQY4qv9BmgYYccach6PfkBMPq7c083H7JcHir2PkTnATaH_RJr_ttH_-klP1a-F117DH7dDdmOrFsrBZkFhXl30UPOxj71OgG_cuCpZK3YMsHlDpTlb_5WFSzo0BM8kyewrf29oeoD3KdTlRRn4vCKNgNKGzNXC5wZIfR9dIkTSAlo6fzPoU58kQHih4AZPsep09k_uSWrr0Jb43kKQ06RV5SjnzYaS1JpCBmnLZ_ZZCnxq5AK5w6y3xuuWE9qGwdkmNEw"
                    />
                </div>
            </div>
        </header>
    );
};
