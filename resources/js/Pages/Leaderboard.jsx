import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const MEDAL = { 1: '🥇', 2: '🥈', 3: '🥉' };

const PodiumCard = ({ entry, height, rank }) => {
    const isFirst = rank === 1;
    const pedestalColors = {
        1: 'from-amber-100 to-amber-50 dark:from-amber-900/20 dark:to-amber-600/10 border-amber-200/60 dark:border-amber-500/40 shadow-amber-500/20',
        2: 'from-slate-100 to-white dark:from-slate-800/40 dark:to-slate-600/10 border-slate-200/60 dark:border-slate-500/40 shadow-slate-500/10',
        3: 'from-orange-100 to-orange-50 dark:from-orange-900/20 dark:to-orange-700/10 border-orange-200/60 dark:border-orange-500/40 shadow-orange-500/10',
    };
    return (
        <div className={`relative flex flex-col items-center text-center w-28 sm:w-36 md:w-48 transition-all duration-300 ${isFirst ? 'z-10' : 'z-0'}`}>
            {/* Avatar */}
            <div className={`relative z-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 text-white font-bold mb-[-20px] shadow-md border-4 border-white dark:border-[#050b1a] transition-all duration-300 ${isFirst ? 'w-20 h-20 text-2xl' : 'w-14 h-14 text-lg'}`}>
                {entry.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                <div className="absolute -bottom-2 -right-2 text-2xl drop-shadow-md">
                    {MEDAL[entry.rank]}
                </div>
            </div>
            
            {/* Pedestal block */}
            <div className={`w-full rounded-t-2xl border-t border-x shadow-md flex flex-col justify-end pb-4 px-2 transition-all duration-300 ${height} bg-gradient-to-t ${pedestalColors[rank]}`}>
                <p className={`font-bold text-slate-900 dark:text-white leading-tight truncate w-full transition-colors duration-300 ${isFirst ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'}`}>{entry.name}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mt-1 truncate w-full">{entry.department}</p>
                <p className={`font-mono font-bold mt-1 transition-colors duration-300 ${isFirst ? 'text-blue-600 dark:text-blue-400 text-lg' : 'text-slate-600 dark:text-slate-300 text-sm'}`}>{entry.points.toLocaleString()}</p>
            </div>
        </div>
    );
};

export default function Leaderboard({ auth }) {
    const fullLeaderboard = [
        { rank: 1, name: 'Alex Rivera', department: 'Engineering', points: 2850 },
        { rank: 2, name: 'Sarah Chen', department: 'Design', points: 2720 },
        { rank: 3, name: 'Jordan Smyth', department: 'Product', points: 2680 },
        { rank: 4, name: auth.user.name, department: 'Engineering', points: 2510 },
        { rank: 5, name: 'Taylor Reed', department: 'Marketing', points: 2440 },
        { rank: 6, name: 'Morgan Lee', department: 'Sales', points: 2310 },
        { rank: 7, name: 'Casey Jones', department: 'HR', points: 2150 },
        { rank: 8, name: 'Riley Smith', department: 'Engineering', points: 2040 },
        { rank: 9, name: 'Jamie Doe', department: 'Design', points: 1980 },
        { rank: 10, name: 'Quinn Taylor', department: 'Marketing', points: 1820 },
    ];

    const pastWinners = [
        { week: 'Week 42', name: 'Alex Rivera',   points: 3100, avatar: 'AR' },
        { week: 'Week 41', name: 'Jordan Smyth',  points: 2950, avatar: 'JS' },
        { week: 'Week 40', name: 'Taylor Reed',   points: 3050, avatar: 'TR' },
        { week: 'Week 39', name: 'Sarah Chen',    points: 3200, avatar: 'SC' },
    ];

    const rankBadge = (rank) => {
        if (rank === 1) return 'bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 ring-1 ring-blue-200 dark:ring-blue-500/30';
        if (rank <= 3) return 'bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 ring-1 ring-cyan-200 dark:ring-cyan-500/20';
        return 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-500';
    };

    const rowStyle = (entry, isLast) => {
        const isMe = entry.name === auth.user.name;
        const base = `flex items-center justify-between px-4 py-4 transition-all duration-300 ${!isLast ? 'border-b border-slate-100 dark:border-blue-900/20' : ''}`;
        if (isMe) return `${base} bg-blue-50/50 dark:bg-blue-900/10`;
        return `${base} hover:bg-slate-50 dark:hover:bg-blue-900/10`;
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Leaderboard" />

            <div className="relative min-h-screen bg-[#f8fafc] dark:bg-[#050b1a] text-slate-800 dark:text-slate-200 overflow-hidden font-sans transition-colors duration-300">
                {/* Ambient glows — visible only in dark mode */}
                <div className="pointer-events-none absolute inset-0 -z-0 hidden dark:block">
                    <div className="absolute -top-40 -left-32 w-[480px] h-[480px] rounded-full bg-blue-600/10 blur-[120px]" />
                    <div className="absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full bg-cyan-500/5 blur-[100px]" />
                </div>

                <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:px-12 space-y-8">
                    {/* Page Header */}
                    <header>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-800 via-blue-600 to-cyan-500 dark:from-white dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                            Global Leaderboard
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 transition-colors duration-300">
                            See how you stack up against the best minds in the company.
                        </p>
                    </header>

                    {/* Podium — Top 3 */}
                    <div className="flex justify-center items-end gap-2 sm:gap-4 md:gap-6 mt-16 mb-12">
                        {/* 2nd Place */}
                        <PodiumCard entry={fullLeaderboard[1]} height="h-32" rank={2} />
                        
                        {/* 1st Place */}
                        <PodiumCard entry={fullLeaderboard[0]} height="h-44" rank={1} />
                        
                        {/* 3rd Place */}
                        <PodiumCard entry={fullLeaderboard[2]} height="h-28" rank={3} />
                    </div>

                    {/* Weekly Winners History */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors duration-300">Past Weekly Winners</h3>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
                            {pastWinners.map((w, i) => (
                                <div key={i} className="min-w-[210px] bg-gradient-to-r from-white to-slate-50 dark:from-[#0a101f] dark:to-blue-900/10 shadow-sm border border-slate-200/60 dark:border-blue-900/30 rounded-full p-2 pr-6 flex items-center gap-3 snap-start hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold shadow-inner shrink-0">
                                        {w.avatar}
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold leading-none mb-1">{w.week}</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight truncate">{w.name}</p>
                                        <p className="text-xs font-mono text-blue-600 dark:text-cyan-400 font-bold mt-0.5">{w.points.toLocaleString()} pts</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Full Table */}
                    <div className="bg-white dark:bg-[#0a101f] border border-slate-200/60 dark:border-blue-900/30 rounded-3xl p-6 md:p-8 shadow-sm dark:shadow-2xl flex flex-col transition-colors duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors duration-300">All Performers</h3>
                        </div>

                        {/* Column headers */}
                        <div className="grid grid-cols-[auto_1fr_auto] gap-4 px-4 mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 w-10 text-center">#</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Player</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Score</span>
                        </div>

                        <div className="flex-grow flex flex-col">
                            {fullLeaderboard.map((e, index) => (
                                <div key={e.rank} className={rowStyle(e, index === fullLeaderboard.length - 1)}>
                                    <div className="flex items-center gap-4 md:gap-5">
                                        <span className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${rankBadge(e.rank)}`}>
                                            {e.rank <= 3 ? MEDAL[e.rank] : e.rank}
                                        </span>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm md:text-base font-semibold leading-tight text-slate-900 dark:text-white transition-colors duration-300">
                                                    {e.name}
                                                </span>
                                                {e.name === auth.user.name && (
                                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 uppercase tracking-wider">You</span>
                                                )}
                                            </div>
                                            <div className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold mt-0.5">
                                                {e.department}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-base md:text-lg font-mono font-bold text-blue-600 dark:text-blue-400">
                                        {e.points.toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
