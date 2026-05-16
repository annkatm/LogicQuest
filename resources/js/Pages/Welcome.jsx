import { Head, Link } from '@inertiajs/react';

const Zap = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);
const Trophy = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
);
const Target = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
);

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <div className="dark">
            <Head title="Welcome" />

            <style>{`
                :root {
                    --background: 210 40% 98%;
                    --foreground: 222 47% 11%;
                    --card: 0 0% 100%;
                    --primary: 217 91% 60%; 
                    --accent: 188 95% 50%;
                    --border: 214 32% 91%;
                    --gradient-hero: linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(188 95% 50%) 100%);
                }

                .dark {
                    --background: 222 84% 5%;
                    --foreground: 210 40% 98%;
                    --card: 222 47% 7%;
                    --border: 217 32% 15%;
                }
                .bg-gradient-hero { background: var(--gradient-hero); }
                .shadow-glow { box-shadow: 0 20px 60px -15px hsl(217 91% 60% / 0.4); }
                .text-gradient {
                    background: var(--gradient-hero);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>

            <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] relative overflow-hidden font-sans">

                {/* Grid Pattern Background */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(to right, hsl(var(--foreground) / 0.05) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground) / 0.05) 1px, transparent 1px)',
                        backgroundSize: '48px 48px',
                        maskImage: 'radial-gradient(ellipse at top, black 20%, transparent 70%)',
                        WebkitMaskImage: 'radial-gradient(ellipse at top, black 20%, transparent 70%)'
                    }}
                />

                {/* Background Glows */}
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[hsl(var(--primary)/0.12)] rounded-full blur-[120px] -z-0" />

                {/* HEADER */}
                <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12 w-full max-w-7xl mx-auto">
                    {/* Logo on the Left */}
                    <div className="flex items-center gap-2">
                        <img
                            src="/images/LQ_logo.png"
                            alt="LogicQuest Logo"
                            className="h-12 w-auto brightness-150 contrast-125"
                        />
                        <span className="text-lg font-bold tracking-tight text-[hsl(var(--foreground))] transition-colors duration-300">LogicQuest</span>
                    </div>

                    {/* Navigation on the Right */}
                    <nav className="flex items-center gap-2 md:gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-xl px-5 py-2.5 bg-gradient-hero text-white font-semibold shadow-glow hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 text-sm"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-xl px-5 py-2.5 text-sm font-semibold text-[hsl(var(--foreground))] hover:bg-[hsl(var(--foreground)/0.1)] hover:text-white transition-all duration-300"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-xl px-5 py-2.5 bg-gradient-hero text-white font-semibold shadow-glow hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 text-sm"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-16 pb-20 mt-10 md:mt-20">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-[hsl(var(--foreground))]">
                        Engage Your Logic. <br className="hidden md:block" />
                        <span className="text-gradient">Master the Quest</span>
                    </h1>
                    <p className="text-lg md:text-xl text-[hsl(var(--foreground)/0.7)] max-w-2xl leading-relaxed">
                        A new way to engage at work. Conquer daily logic challenges, secure your base score, and race the clock for a speed bonus.
                    </p>
                    {/* CALL TO ACTION BUTTONS */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-10 mb-10">
                        <Link
                            href={route('register')}
                            className="rounded-2xl px-8 py-4 bg-gradient-hero text-white font-bold shadow-glow hover:brightness-110 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] transition-all duration-300 text-base"
                        >
                            Start playing free
                        </Link>
                        <Link
                            href={route('login')}
                            className="rounded-2xl px-8 py-4 border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.3)] backdrop-blur-sm text-[hsl(var(--foreground))] font-bold hover:bg-[hsl(var(--card)/0.6)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] transition-all duration-300 text-base"
                        >
                            I have an account
                        </Link>
                    </div>

                    {/* FEATURES GRID */}
                    <div className="grid md:grid-cols-3 gap-6 mt-4 text-center">
                        {[
                            { icon: Target, title: "Daily Challenges", desc: "A fresh logic problem every 24 hours to keep your mind sharp." },
                            { icon: Zap, title: "Speed Bonuses", desc: "The faster you solve, the higher your score. Precision meets pace." },
                            { icon: Trophy, title: "Leaderboards", desc: "Compete with colleagues and climb the company ranks." },
                        ].map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="group bg-[hsl(var(--card)/0.4)] backdrop-blur-md border border-[hsl(var(--border))] rounded-3xl p-8 hover:border-[hsl(var(--primary)/0.5)] hover:-translate-y-1 transition-all duration-500 flex flex-col items-center cursor-default">
                                <div className="w-12 h-12 rounded-2xl bg-[hsl(var(--primary)/0.1)] flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(59,130,246,0.08)] group-hover:scale-105 transition-transform duration-500">
                                    <Icon className="w-6 h-6 text-[hsl(var(--accent))]" />
                                </div>
                                <h3 className="text-lg font-bold mb-3 tracking-wide text-[hsl(var(--foreground))] uppercase transition-colors duration-300">{title}</h3>
                                <p className="text-sm text-[hsl(var(--foreground)/0.6)] leading-relaxed max-w-[200px] mx-auto transition-colors duration-300 group-hover:text-[hsl(var(--foreground)/0.8)]">
                                    {desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </main>

                {/* FOOTER-LIKE INFO */}
                <footer className="relative z-10 text-center pb-10 text-[hsl(var(--foreground)/0.3)] text-xs font-medium uppercase tracking-[0.2em]">
                    © 2026 LogicQuest — Built for the curious
                </footer>
            </div>
        </div>
    );
}