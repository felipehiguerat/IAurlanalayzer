'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

export const Header = () => {
    return (
        <header className="w-full px-6 py-6 lg:px-20 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
                <div className="size-10 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                    <Icon name="bolt" className="text-primary text-2xl" />
                </div>
                <h2 className="text-white text-xl font-bold tracking-tight">
                    AI Lead Scraper
                </h2>
            </div>
        </header>
    );
};
