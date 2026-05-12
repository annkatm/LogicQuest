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
        /* The 'dark' class here is now controlled by state, but since 
           there's no button, it stays dark by default. */
        <div className="min-h-screen bg-slate-50 dark:bg-[#050b1a] flex flex-col items-center justify-center pt-6 sm:pt-0 relative overflow-hidden transition-colors duration-300">

            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-0" />

            {/* Navigation */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-5 flex justify-between items-center absolute top-0">
                <Link href="/" className="flex items-center gap-2 group">
                    <img
                        src="/images/LQ_logo.png"
                        alt="Logo"
                        className="h-10 w-auto transition-transform group-hover:scale-105 dark:brightness-150 dark:contrast-125"
                    />
                    <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        LogicQuest
                    </span>
                </Link>

            </div>

            <div className="relative z-10 mt-6 w-full px-6 py-4 sm:max-w-md">
                {children}
            </div>

            <p className="relative z-10 mt-8 text-slate-400 dark:text-slate-600 text-xs uppercase tracking-widest">
                LogicQuest v1.0
            </p>
        </div>
    );
}