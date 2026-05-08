import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

const Zap = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);

const Sun = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
);

const Moon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
);

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [isDark, setIsDark] = useState(true);
    const toggleTheme = () => setIsDark(!isDark);

    return (
        <div className={`${isDark ? 'dark' : ''} transition-colors duration-300`}>
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

                {/* Background Glows */}
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[hsl(var(--primary)/0.12)] rounded-full blur-[120px] -z-0" />

                {/* HEADER: Original Positioning (Logo Left, Nav Right) */}
                <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12 w-full max-w-7xl mx-auto">
                    {/* Logo on the Left */}
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold tracking-tight">LogicQuest</span>
                    </div>

                    {/* Navigation on the Right */}
                    <nav className="flex items-center gap-2 md:gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 mr-2 rounded-full hover:bg-[hsl(var(--foreground)/0.1)] transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {isDark ? <Sun className="w-5 h-5 text-blue-300" /> : <Moon className="w-5 h-5 text-blue-600" />}
                        </button>

                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-xl px-5 py-2.5 bg-gradient-hero text-white font-semibold shadow-glow hover:brightness-110 transition-all text-sm"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-[hsl(var(--foreground)/0.05)] transition-all"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-xl px-5 py-2.5 bg-gradient-hero text-white font-semibold shadow-glow hover:brightness-110 transition-all text-sm"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 mt-10 md:mt-20">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-[hsl(var(--foreground))]">
                        Engage Your Logic. <br className="hidden md:block" />
                        <span className="text-gradient">Master the Quest</span>
                    </h1>
                    <p className="text-lg md:text-xl text-[hsl(var(--foreground)/0.7)] max-w-2xl leading-relaxed">
                        A new way to engage at work. Tackle the daily logic quest, secure your base score, and race for the speed bonus.
                    </p>
                </main>
            </div>
        </div>
    );
}
