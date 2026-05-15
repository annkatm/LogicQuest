import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function GuestLayout({ children }) {
    // Keep the state logic so the Dashboard can use it later
    const [isDark, setIsDark] = useState(() => {
        // Default to dark, but check if a preference already exists
        return localStorage.getItem('theme') !== 'light';
    });

    useEffect(() => {
        // This ensures the 'dark' class is applied to the HTML tag
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#050b1a] flex flex-col relative overflow-hidden transition-colors duration-300 font-sans">
            {/* Grid Pattern Background */}
            <div
                className="absolute inset-0 z-0 pointer-events-none text-black/5 dark:text-white/5"
                style={{
                    backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                    maskImage: 'radial-gradient(ellipse at top, black 20%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at top, black 20%, transparent 70%)'
                }}
            />

            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-0" />

            {/* Navigation Header */}
            <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12 w-full max-w-7xl mx-auto">
                <Link href="/" className="flex items-center gap-2 group">
                    <img
                        src="/images/LQ_logo.png"
                        alt="LogicQuest Logo"
                        className="h-12 w-auto brightness-150 contrast-125 transition-transform group-hover:scale-105"
                    />
                    <span className="text-lg font-bold tracking-tight text-white">
                        LogicQuest
                    </span>
                </Link>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 z-10 relative">
                <div className="w-full sm:max-w-md">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 text-center pb-10 text-slate-500 text-xs font-medium uppercase tracking-[0.2em]">
                © 2026 LogicQuest
            </footer>
        </div>
    );
}