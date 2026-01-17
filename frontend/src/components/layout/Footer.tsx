import Link from 'next/link';

export const Footer = () => {
    const links = [
        { href: '/status', label: 'Status' },
        { href: '/docs', label: 'Documentation' },
        { href: '/security', label: 'Security' },
    ];

    return (
        <footer className="w-full p-8 text-center z-10">
            <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex gap-6 text-slate-600 text-sm">
                    {links.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="hover:text-primary transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
                <p className="text-slate-600 text-sm">
                    © 2024 AI Lead Scraper Engine. All systems operational.
                </p>
            </div>
        </footer>
    );
};
