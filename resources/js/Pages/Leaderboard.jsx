import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Leaderboard({ auth }) {
    // Extended Mock data for the full leaderboard
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

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Leaderboard" />

            <div className="relative min-h-screen bg-[#050b1a] text-slate-200 overflow-hidden font-sans">
                {/* Ambient background glow */}
                <div className="pointer-events-none absolute inset-0 -z-0">
                    <div className="absolute -top-40 -left-32 w-[480px] h-[480px] rounded-full bg-blue-600/10 blur-[120px]" />
                    <div className="absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full bg-cyan-500/5 blur-[100px]" />
                </div>

                <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:px-12 space-y-10">
                    <header className="flex flex-col gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                Global Leaderboard
                            </h1>
                            <p className="text-slate-400 mt-2">
                                See how you stack up against the best minds in the company.
                            </p>
                        </div>
                    </header>

                    <div className="bg-[#0a101f] border border-blue-900/30 rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-white">Top Performers</h3>
                            <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                        </div>

                        <div className="space-y-4 flex-grow">
                            {fullLeaderboard.map((e) => (
                                <div
                                    key={e.rank}
                                    className="flex items-center justify-between rounded-2xl px-4 py-3 hover:bg-blue-900/20 transition-all duration-300 border border-transparent hover:border-blue-900/30"
                                >
                                    <div className="flex items-center gap-4 md:gap-6">
                                        <span className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm md:text-base font-bold ${e.rank === 1 ? "bg-blue-600/20 text-blue-400" :
                                            e.rank <= 3 ? "bg-cyan-500/10 text-cyan-400" :
                                                "bg-slate-800 text-slate-500"
                                            }`}>
                                            {e.rank}
                                        </span>
                                        <div>
                                            <div className="text-base md:text-lg font-medium leading-tight text-white">{e.name}</div>
                                            <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mt-1">{e.department}</div>
                                        </div>
                                    </div>
                                    <span className="text-lg md:text-xl font-mono font-bold text-blue-400">{e.points.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
