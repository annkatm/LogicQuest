import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const mockLeaderboard = [
        { rank: 1, name: 'Alex Rivera', department: 'Engineering', points: 2850 },
        { rank: 2, name: 'Sarah Chen', department: 'Design', points: 2720 },
        { rank: 3, name: 'Jordan Smyth', department: 'Product', points: 2680 },
        { rank: 4, name: auth.user.name, department: 'Engineering', points: 2510 },
        { rank: 5, name: 'Taylor Reed', department: 'Marketing', points: 2440 },
    ];

    const rankStyle = (rank) => {
        if (rank === 1) return 'bg-amber-100 text-amber-600 ring-1 ring-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-500/30';
        if (rank === 2) return 'bg-slate-100 text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-600';
        if (rank === 3) return 'bg-orange-100 text-orange-600 ring-1 ring-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:ring-orange-500/30';
        return 'bg-slate-50 text-slate-400 ring-1 ring-slate-100 dark:bg-[#0a101f] dark:text-slate-500 dark:ring-slate-800';
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="relative min-h-screen bg-[#f8fafc] dark:bg-[#050b1a] text-slate-800 dark:text-slate-200 overflow-hidden font-sans transition-colors duration-300">
                {/* Ambient background glow — visible only in dark mode */}
                <div className="pointer-events-none absolute inset-0 -z-0 hidden dark:block">
                    <div className="absolute -top-40 -left-32 w-[480px] h-[480px] rounded-full bg-blue-600/10 blur-[120px]" />
                    <div className="absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full bg-cyan-500/5 blur-[100px]" />
                </div>

                <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:px-12 space-y-10">
                    {/* Page Header */}
                    <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Welcome back, <span className="text-blue-600 dark:text-blue-400">{auth.user.name.split(' ')[0]}</span>!
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-2 transition-colors duration-300">
                                Three daily challenges. Sharpen your mind, climb the board, and keep your streak alive.
                            </p>
                        </div>
                    </header>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Daily Challenge Card */}
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-[#0a101f] border border-slate-200/60 dark:border-blue-900/30 rounded-3xl p-8 shadow-sm transition-all duration-300 hover:shadow-md">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors duration-300">Daily Challenge</h3>
                                </div>

                                <div className="aspect-video bg-[#f8fafc] dark:bg-[#050b1a] rounded-2xl border-2 border-dashed border-slate-200 dark:border-blue-900/50 flex flex-col items-center justify-center gap-4 transition-colors duration-300 shadow-inner">
                                    <div className="w-12 h-12 rounded-full bg-white dark:bg-blue-500/10 border border-slate-200 dark:border-blue-500/20 flex items-center justify-center shadow-sm">
                                        <svg className="w-6 h-6 text-blue-400 dark:text-blue-400 animate-pulse" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Preparing quiz content…</p>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-blue-500/20">
                                        Submit Answer
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Mini Leaderboard Card */}
                        <div className="bg-white dark:bg-[#0a101f] border border-slate-200/60 dark:border-blue-900/30 rounded-3xl p-6 pb-8 shadow-sm dark:shadow-2xl flex flex-col transition-colors duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors duration-300">Leaderboard</h3>
                                <svg className="w-5 h-5 text-cyan-500 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>

                            <div className="space-y-2 flex-grow">
                                {mockLeaderboard.map((e) => (
                                    <div
                                        key={e.rank}
                                        className={`flex items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-300 hover:bg-slate-50 dark:hover:bg-blue-900/20 ${e.name === auth.user.name ? 'bg-blue-50/60 dark:bg-blue-900/20 shadow-sm ring-1 ring-blue-200/50 dark:ring-blue-800/40' : 'border border-transparent'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${rankStyle(e.rank)}`}>
                                                {e.rank}
                                            </span>
                                            <div>
                                                <div className="text-sm font-semibold leading-tight text-slate-900 dark:text-white transition-colors duration-300">{e.name}</div>
                                                <div className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">{e.department}</div>
                                            </div>
                                        </div>
                                        <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">{e.points.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href={route('leaderboard')}
                                className="mt-6 flex items-center justify-between w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-transparent text-slate-500 dark:text-slate-400 text-sm font-semibold hover:text-blue-600 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-slate-800 hover:border-blue-100 dark:hover:border-transparent transition-all group"
                            >
                                View full leaderboard
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: '🔥', label: 'Current Streak', value: '12 Days', color: 'orange' },
                            { icon: '🎯', label: 'Accuracy Rate', value: '94%', color: 'cyan' },
                            { icon: '💎', label: 'Total XP', value: '14,250', color: 'purple' },
                            { icon: '⚡', label: 'Avg Solve Time', value: '14.2s', color: 'blue' },
                        ].map(({ icon, label, value }) => (
                            <div key={label} className="bg-white dark:bg-[#0a101f] border border-slate-200/60 dark:border-blue-900/30 rounded-2xl p-5 shadow-sm dark:shadow-none hover:shadow-md hover:-translate-y-1 dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.08)] transition-all duration-300">
                                <span className="text-xl block mb-2">{icon}</span>
                                <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest">{label}</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white mt-1 transition-colors duration-300">{value}</p>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}