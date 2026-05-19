import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

function StatCard({ label, value, icon, color = 'blue' }) {
    const accent = {
        blue:   'dark:border-blue-900/30 dark:hover:border-blue-500/40 hover:border-blue-300',
        orange: 'dark:border-orange-900/30 dark:hover:border-orange-500/40 hover:border-orange-300',
        cyan:   'dark:border-cyan-900/30 dark:hover:border-cyan-500/40 hover:border-cyan-300',
        purple: 'dark:border-purple-900/30 dark:hover:border-purple-500/40 hover:border-purple-300',
    };
    return (
        <div className={`bg-white dark:bg-[#0a101f] border border-slate-200 dark:border-blue-900/30 shadow-md hover:shadow-lg hover:-translate-y-1 ${accent[color]} rounded-2xl p-6 transition-all duration-300`}>
            <span className="text-2xl mb-3 block">{icon}</span>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{label}</p>
            <p className="text-slate-900 dark:text-white text-2xl font-bold mt-1 transition-colors duration-300">{value}</p>
        </div>
    );
}

function Badge({ title, icon, glow, locked = false }) {
    const colors = {
        orange: 'border-orange-500/50 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.2)]',
        cyan:   'border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.2)]',
        purple: 'border-purple-500/50 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.2)]',
        gold:   'border-yellow-500/50 bg-yellow-500/10 shadow-[0_0_15px_rgba(234,179,8,0.2)]',
        locked: 'border-slate-300 border-dashed bg-slate-50/50 dark:border-blue-900/20 dark:bg-blue-900/5 dark:border-solid',
    };
    return (
        <div className={`aspect-square rounded-2xl border flex flex-col items-center justify-center gap-1 group relative transition-transform hover:scale-105 ${locked ? 'cursor-default' : 'cursor-help'} ${colors[glow]}`}>
            <span className={`text-xl ${locked ? 'opacity-20 grayscale' : ''}`}>{icon}</span>
            {!locked && (
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-white dark:bg-[#0a101f] border border-slate-200 dark:border-blue-900/40 text-slate-800 dark:text-white text-[10px] px-2 py-1.5 rounded-lg whitespace-nowrap z-50 shadow-xl transition-colors duration-300">
                    {title}
                </div>
            )}
        </div>
    );
}

export default function Show() {
    const { auth } = usePage().props;
    const [isDark, setIsDark] = useState(auth.user.theme !== 'light');

    const toggleTheme = () => {
        const newTheme = isDark ? 'light' : 'dark';
        setIsDark(!isDark);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
        router.patch(route('profile.theme.update'), { theme: newTheme }, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const initials = auth.user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <div className="py-12 bg-[#f8fafc] dark:bg-[#050b1a] min-h-screen transition-colors duration-300">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">

                    {/* LEFT: Identity Card */}
                    <div className="w-full md:w-1/3">
                        <div className="bg-white dark:bg-[#0a101f] border border-slate-200 dark:border-blue-900/30 rounded-3xl p-8 sticky top-24 shadow-md dark:shadow-2xl transition-colors duration-300">
                            <div className="flex flex-col items-center text-center">
                                {/* Avatar */}
                                <div className="w-28 h-28 rounded-full border-2 border-blue-500 p-1 shadow-[0_0_25px_rgba(59,130,246,0.35)] bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center select-none">
                                    <span className="text-4xl font-extrabold text-white">{initials}</span>
                                </div>

                                <h2 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight transition-colors duration-300">{auth.user.name}</h2>
                                <p className="text-blue-400 font-mono text-xs tracking-widest mt-1">GRANDMASTER ANALYST</p>
                                <p className="text-slate-600 text-xs mt-1">{auth.user.email}</p>

                                <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent my-6" />

                                {/* Rank/Tier */}
                                <div className="w-full space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 uppercase font-bold text-xs">Current Rank</span>
                                        <span className="text-slate-900 dark:text-white font-bold text-sm transition-colors duration-300">Top 1%</span>
                                    </div>
                                    <div className="w-full bg-slate-200 dark:bg-blue-900/20 h-2 rounded-full overflow-hidden transition-colors duration-300">
                                        <div className="bg-gradient-to-r from-blue-600 to-cyan-400 h-full w-[85%] shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-700" />
                                    </div>
                                    <p className="text-[10px] text-slate-500 text-left">1,240 XP UNTIL NEXT TIER</p>
                                </div>

                                <Link
                                    href={route('profile.edit')}
                                    className="mt-8 w-full py-3 bg-blue-600/10 border border-blue-500/50 text-blue-400 rounded-xl font-bold text-sm hover:bg-blue-600 hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all block text-center"
                                >
                                    EDIT PROFILE
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Stats, Achievements, Preferences */}
                    <div className="w-full md:w-2/3 space-y-8">

                        {/* Performance Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <StatCard label="Current Streak" value="12 Days" icon="🔥" color="orange" />
                            <StatCard label="Accuracy Rate"  value="94%"     icon="🎯" color="cyan"   />
                            <StatCard label="Total XP"       value="14,250"  icon="💎" color="purple" />
                            <StatCard label="Avg Solve Time" value="14.2s"   icon="⚡" color="blue"  />
                        </div>

                        {/* Achievement Gallery */}
                        <div className="bg-white dark:bg-[#0a101f] border border-slate-200 dark:border-blue-900/30 rounded-3xl p-8 shadow-md transition-colors duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-slate-900 dark:text-white font-bold text-lg uppercase tracking-wider transition-colors duration-300">Achievement Gallery</h3>
                                <span className="text-xs text-slate-500 font-mono">3 / 12 UNLOCKED</span>
                            </div>
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                                <Badge title="7-Day Streak"  icon="🔥" glow="orange" />
                                <Badge title="Speed Demon"   icon="⚡" glow="cyan"   />
                                <Badge title="Logic King"    icon="👑" glow="gold"   />
                                <Badge title="Locked"        icon="🔒" glow="locked" locked />
                                <Badge title="Locked"        icon="🔒" glow="locked" locked />
                                <Badge title="Locked"        icon="🔒" glow="locked" locked />
                            </div>
                        </div>

                        {/* System Preferences */}
                        <div className="bg-white dark:bg-[#0a101f] border border-slate-200 dark:border-blue-900/30 rounded-3xl p-8 shadow-md transition-colors duration-300">
                            <h3 className="text-slate-900 dark:text-white font-bold text-lg uppercase tracking-wider mb-6 transition-colors duration-300">System Preferences</h3>

                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-blue-900/10 rounded-2xl border border-slate-200 dark:border-blue-900/20 transition-colors duration-300">
                                <div>
                                    <p className="text-slate-900 dark:text-white font-bold transition-colors duration-300">
                                        {isDark ? 'Dark Mode Protocol' : 'Light Mode Protocol'}
                                    </p>
                                    <p className="text-xs text-slate-500 italic">
                                        {isDark ? 'High-contrast interface for focus' : 'Bright interface for well-lit environments'}
                                    </p>
                                </div>
                                <button
                                    onClick={toggleTheme}
                                    className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${isDark ? 'bg-blue-600' : 'bg-slate-300'}`}
                                    aria-label="Toggle dark mode"
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${isDark ? 'right-1' : 'left-1'}`} />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
