import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const initials = user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#050b1a] flex flex-col transition-colors duration-300">
            <nav className="sticky top-0 z-50 border-b border-slate-200/60 dark:border-blue-900/30 bg-white/80 backdrop-blur-md dark:bg-[#050b1a] dark:backdrop-blur-none transition-colors duration-300">
                <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
                    <div className="flex h-16 justify-between">

                        {/* LEFT: Brand & Links Grouped */}
                        <div className="flex items-center gap-10">
                            <div className="flex shrink-0 items-center">
                                <Link href="/dashboard" className="flex items-center gap-2 group">
                                    <img
                                        src="/images/LQ_logo.png"
                                        alt="LogicQuest Logo"
                                        className="h-9 w-auto brightness-150 contrast-125 transition-transform group-hover:scale-105"
                                    />
                                    <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white hidden md:block transition-colors duration-300 uppercase tracking-widest">
                                        LogicQuest
                                    </span>
                                </Link>
                            </div>

                            {/* Navigation Links - Now anchored to the left */}
                            <div className="hidden space-x-8 sm:-my-px sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                                <NavLink href={route('leaderboard')} active={route().current('leaderboard')}>
                                    Leaderboard
                                </NavLink>
                                <NavLink href={route('profile.show')} active={route().current('profile.show') || route().current('profile.edit')}>
                                    Profile
                                </NavLink>
                            </div>
                        </div>

                        {/* RIGHT: Avatar Dropdown */}
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className="group flex items-center gap-3 focus:outline-none"
                                        >
                                            <div className="flex flex-col items-end text-right">
                                                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-400 transition-colors">
                                                    {user.name}
                                                </span>
                                                <span className="text-[10px] text-blue-500 font-mono tracking-tighter uppercase">
                                                    Analyst
                                                </span>
                                            </div>
                                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 text-sm font-bold text-white transition duration-150 ease-in-out group-hover:scale-105 shadow-[0_0_10px_rgba(59,130,246,0.3)] border border-blue-400/20">
                                                {initials}
                                            </div>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content contentClasses="py-1 bg-white dark:bg-[#0a101f] border border-slate-200 dark:border-blue-900/30">
                                        <Dropdown.Link href={route('profile.show')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('dashboard')}>Dashboard</Dropdown.Link>
                                        <Dropdown.Link href={route('leaderboard')}>Leaderboard</Dropdown.Link>
                                        <div className="border-t border-slate-100 dark:border-blue-900/20 my-1"></div>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Hamburger for mobile */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 dark:text-blue-400 transition duration-150 ease-in-out hover:bg-slate-100 dark:hover:bg-blue-900/30 hover:text-slate-900 dark:hover:text-white focus:outline-none"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>Dashboard</ResponsiveNavLink>
                        <ResponsiveNavLink href={route('leaderboard')} active={route().current('leaderboard')}>Leaderboard</ResponsiveNavLink>
                        <ResponsiveNavLink href={route('profile.show')} active={route().current('profile.show')}>Profile</ResponsiveNavLink>
                    </div>

                    <div className="border-t border-slate-200 dark:border-blue-900/30 pb-1 pt-4">
                        <div className="px-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 text-base font-bold text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                                {initials}
                            </div>
                            <div>
                                <div className="text-base font-medium text-slate-900 dark:text-white">{user.name}</div>
                                <div className="text-sm font-medium text-slate-500 dark:text-gray-400">{user.email}</div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">Log Out</ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white dark:bg-[#050b1a] border-b border-slate-200 dark:border-blue-900/30 shadow transition-colors duration-300">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="flex-1">{children}</main>

            <footer className="text-center pt-8 pb-10 text-slate-400 dark:text-slate-500 text-xs font-medium uppercase tracking-[0.2em]">
                © 2026 LogicQuest
            </footer>
        </div>
    );
}