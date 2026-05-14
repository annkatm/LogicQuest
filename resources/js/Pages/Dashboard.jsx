import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from "react";
import PrimaryButton from '@/Components/PrimaryButton';

export default function Dashboard({ auth }) {
    // Initialize state for the quiz interaction
    const [completed, setCompleted] = useState(false);
    const [score, setScore] = useState(0);

    // Mock data moved inside or imported as usual
    const mockLeaderboard = [
        { rank: 1, name: 'Alex Rivera', department: 'Engineering', points: 2850 },
        { rank: 2, name: 'Sarah Chen', department: 'Design', points: 2720 },
        { rank: 3, name: 'Jordan Smyth', department: 'Product', points: 2680 },
        { rank: 4, name: auth.user.name, department: 'Engineering', points: 2510 },
        { rank: 5, name: 'Taylor Reed', department: 'Marketing', points: 2440 },
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="relative min-h-screen bg-[#050b1a] text-slate-200 overflow-hidden font-sans">
                {/* Ambient background glow */}
                <div className="pointer-events-none absolute inset-0 -z-0">
                    <div className="absolute -top-40 -left-32 w-[480px] h-[480px] rounded-full bg-blue-600/10 blur-[120px]" />
                    <div className="absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full bg-cyan-500/5 blur-[100px]" />
                </div>

                <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:px-12 space-y-10">
                    <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            {/* Updated Welcome Text */}
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                Welcome back, {auth.user.name.split(' ')[0]}!
                            </h1>
                            <p className="text-slate-400 mt-2">
                                Three daily challenges. Sharpen your mind, climb the board, and keep your streak alive.
                            </p>
                        </div>
                    </header>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Quiz Section - Placeholder for QuizCard logic */}
                        <div className="lg:col-span-2">
                            <div className="bg-[#0a101f] border border-blue-900/30 rounded-3xl p-8 shadow-2xl">
                                <h3 className="text-xl font-bold text-white mb-4">Daily Challenge</h3>
                                <div className="aspect-video bg-[#050b1a] rounded-2xl border border-blue-900/50 flex items-center justify-center text-slate-500 italic">
                                    [ Quiz Content Loading... ]
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <PrimaryButton className="bg-gradient-to-r from-blue-600 to-cyan-500 border-none">
                                        Submit Answer
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>

                        {/* Leaderboard Section - Standard Tailwind Card */}
                        <div className="bg-[#0a101f] border border-blue-900/30 rounded-3xl p-6 shadow-2xl flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-white">Leaderboard</h3>
                                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                            </div>

                            <div className="space-y-3 flex-grow">
                                {mockLeaderboard.map((e) => (
                                    <div
                                        key={e.rank}
                                        className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-blue-900/20 transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${e.rank === 1 ? "bg-blue-600/20 text-blue-400" :
                                                e.rank <= 3 ? "bg-cyan-500/10 text-cyan-400" :
                                                    "bg-slate-800 text-slate-500"
                                                }`}>
                                                {e.rank}
                                            </span>
                                            <div>
                                                <div className="text-sm font-medium leading-tight text-white">{e.name}</div>
                                                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{e.department}</div>
                                            </div>
                                        </div>
                                        <span className="text-sm font-mono font-bold text-blue-400">{e.points.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href={route('leaderboard')}
                                className="mt-6 flex items-center justify-between w-full px-4 py-3 rounded-xl bg-slate-900/50 text-slate-400 text-sm font-semibold hover:text-white hover:bg-slate-800 transition-all group"
                            >
                                View full leaderboard
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}