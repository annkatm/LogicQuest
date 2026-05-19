import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

// ─── Helper: option button class ────────────────────────────────────────────
function optionClass(letter, selected, session) {
    const base =
        'w-full cursor-pointer flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all duration-200 text-left ';
    if (session) {
        if (letter === session.correct_answer)
            return base + 'border-cyan-500 bg-cyan-500/10 text-cyan-300';
        if (letter === session.submitted_answer && !session.is_correct)
            return base + 'border-red-500/50 bg-red-500/10 text-red-400';
        return base + 'border-blue-900/30 bg-[#050b1a] text-slate-500 cursor-default';
    }
    if (selected === letter)
        return base + 'border-blue-500 bg-blue-500/20 text-blue-300 scale-[1.02]';
    return (
        base +
        'border-blue-900/30 bg-[#050b1a] text-slate-300 hover:border-blue-600/50 hover:bg-blue-900/10'
    );
}

// ─── Single question card ────────────────────────────────────────────────────
function QuestionCard({ question, questionIndex, totalQuestions, session, onNext, isStarted, onStart }) {
    const [selected, setSelected] = useState(null);
    const [elapsed, setElapsed]   = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const timerRef = useRef(null);

    const answered = !!session;

    useEffect(() => {
        if (answered || !isStarted) return;
        timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
        return () => clearInterval(timerRef.current);
    }, [answered, isStarted]);

    function handleSubmit() {
        if (!selected || submitting) return;
        clearInterval(timerRef.current);
        setSubmitting(true);
        router.post(
            route('dashboard.submit'),
            { question_id: question.id, answer: selected, time_taken: elapsed },
            { preserveScroll: true, onFinish: () => setSubmitting(false) }
        );
    }

    return (
        <div className="bg-[#0a101f] border border-blue-900/30 rounded-3xl p-8 shadow-2xl space-y-6">
            {/* Card header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-white">Daily Challenge</h3>
                        {/* Progress dots */}
                        <div className="flex gap-1.5 ml-2">
                            {Array.from({ length: totalQuestions }).map((_, i) => (
                                <span
                                    key={i}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        i < questionIndex
                                            ? 'bg-cyan-400'
                                            : i === questionIndex
                                            ? 'bg-blue-500'
                                            : 'bg-slate-700'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                    <span className="text-xs uppercase tracking-widest font-bold text-blue-500 mt-1 block">
                        {question.category} &nbsp;·&nbsp; Question {questionIndex + 1} of {totalQuestions}
                    </span>
                </div>

                {/* Timer */}
                {!answered && isStarted && (
                    <div className="flex items-center gap-2 rounded-xl bg-[#050b1a] border border-blue-900/30 px-3 py-1.5 font-mono text-sm text-slate-300">
                        <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {String(Math.floor(elapsed / 60)).padStart(2, '0')}:
                        {String(elapsed % 60).padStart(2, '0')}
                    </div>
                )}
            </div>

            {/* Question prompt */}
            {isStarted || answered ? (
                <>
                    <p className="text-slate-200 text-base leading-relaxed border-l-2 border-blue-700 pl-4">
                        {question.prompt}
                    </p>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {Object.entries(question.options).map(([letter, text]) => (
                            <button
                                key={letter}
                                onClick={() => !answered && setSelected(letter)}
                                className={optionClass(letter, selected, session)}
                                disabled={answered}
                            >
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                                    session?.correct_answer === letter
                                        ? 'bg-cyan-500/20 text-cyan-400'
                                        : selected === letter
                                        ? 'bg-blue-600/30 text-blue-300'
                                        : 'bg-slate-800 text-slate-500'
                                }`}>
                                    {letter}
                                </span>
                                {text}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center py-10 space-y-4 bg-[#050b1a] border border-blue-900/30 rounded-xl">
                    <h4 className="text-lg font-bold text-white">Ready for your challenge?</h4>
                    <p className="text-slate-400 text-sm">
                        The timer will start as soon as you reveal the question. Good luck!
                    </p>
                </div>
            )}

            {/* Result banner */}
            {session && (
                <div className={`rounded-xl px-4 py-3 border text-sm font-medium flex flex-col gap-2 ${
                    session.is_correct
                        ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                        : 'bg-red-500/10 border-red-500/40 text-red-300'
                }`}>
                    <div className="flex items-center gap-3">
                        {session.is_correct ? (
                            <>
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>
                                    Correct! You earned{' '}
                                    <span className="font-bold text-cyan-200 mx-1">{session.score} pts</span>
                                </span>
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>
                                    Not quite — the correct answer was{' '}
                                    <span className="font-bold text-slate-200 mx-1">{session.correct_answer}</span>
                                </span>
                            </>
                        )}
                    </div>
                    {session.fun_fact && (
                        <div className="mt-1 pt-2 border-t border-current/20 text-slate-300 flex gap-2 items-start">
                            <span className="text-xl leading-none">💡</span>
                            <p className="text-sm italic leading-snug">
                                <span className="font-bold text-slate-400 not-italic mr-1">Did you know?</span>
                                {session.fun_fact.replace(/^Did you know\??\s*/i, '')}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Action buttons */}
            <div className="flex justify-end gap-3">
                {/* Next question button (visible after answering if not last) */}
                {session && onNext && (
                    <button
                        onClick={onNext}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm
                            bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-900/40
                            hover:from-blue-500 hover:to-cyan-400 transition-all duration-200"
                    >
                        Next Question
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                )}

                {/* Start button */}
                {!answered && !isStarted && (
                    <button
                        onClick={onStart}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm
                            bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow-lg shadow-emerald-900/40
                            hover:from-emerald-500 hover:to-green-400 transition-all duration-200"
                    >
                        Start Quiz
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                )}

                {/* Submit button (only when not yet answered) */}
                {!answered && isStarted && (
                    <button
                        onClick={handleSubmit}
                        disabled={!selected || submitting}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm
                            bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-900/40
                            hover:from-blue-500 hover:to-cyan-400 transition-all duration-200
                            disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {submitting ? 'Submitting…' : 'Submit Answer'}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}

// ─── "All done" screen ───────────────────────────────────────────────────────
function AllDoneCard({ sessions, questions }) {
    const total   = Object.values(sessions).reduce((sum, s) => sum + s.score, 0);
    const correct = Object.values(sessions).filter((s) => s.is_correct).length;

    return (
        <div className="bg-[#0a101f] border border-blue-900/30 rounded-3xl p-10 shadow-2xl text-center space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-900/50">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04
                            A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622
                            0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-white">That's all for today!</h2>
                <p className="text-slate-400 mt-2 text-sm">
                    You've completed all 3 of today's challenges. Come back tomorrow for a new set!
                </p>
            </div>

            {/* Score summary */}
            <div className="flex justify-center gap-6 flex-wrap">
                <div className="bg-[#050b1a] border border-blue-900/30 rounded-2xl px-6 py-4 text-center">
                    <div className="text-3xl font-bold font-mono bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        {total}
                    </div>
                    <div className="text-xs uppercase tracking-widest text-slate-500 mt-1 font-bold">Points Earned</div>
                </div>
                <div className="bg-[#050b1a] border border-blue-900/30 rounded-2xl px-6 py-4 text-center">
                    <div className="text-3xl font-bold font-mono text-cyan-400">
                        {correct}/{questions.length}
                    </div>
                    <div className="text-xs uppercase tracking-widest text-slate-500 mt-1 font-bold">Correct</div>
                </div>
            </div>

            {/* Per-question recap */}
            <div className="space-y-2 text-left max-w-md mx-auto">
                {questions.map((q) => {
                    const s = sessions[q.id];
                    return (
                        <div key={q.id} className="flex flex-col gap-2 rounded-xl bg-[#050b1a] border border-blue-900/20 px-4 py-3">
                            <div className="flex items-center gap-3">
                                {s?.is_correct ? (
                                    <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                                <span className="text-sm text-slate-300 truncate flex-grow">{q.prompt}</span>
                                <span className={`text-xs font-mono font-bold flex-shrink-0 ${s?.is_correct ? 'text-cyan-400' : 'text-slate-600'}`}>
                                    +{s?.score ?? 0}
                                </span>
                            </div>
                            {s?.fun_fact && (
                                <div className="mt-1 pt-2 border-t border-blue-900/30 text-slate-400 text-xs flex gap-2 items-start">
                                    <span className="text-sm leading-none">💡</span>
                                    <span className="italic leading-relaxed">
                                        <span className="font-bold text-slate-500 not-italic mr-1">Did you know?</span>
                                        {s.fun_fact.replace(/^Did you know\??\s*/i, '')}
                                    </span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ─── Main Dashboard ──────────────────────────────────────────────────────────
export default function Dashboard({
    auth,
    questions,
    sessions,
    leaderboard,
    userRank,
    userTotalScore,
}) {
    // sessions is keyed by question_id (string keys from PHP)
    const sessionMap = sessions ?? {};

    // Find the index of the first unanswered question
    const firstUnanswered = questions.findIndex((q) => !sessionMap[q.id]);
    const [activeIndex, setActiveIndex] = useState(
        firstUnanswered === -1 ? 0 : firstUnanswered
    );
    const [sessionStarted, setSessionStarted] = useState(
        firstUnanswered > 0 || firstUnanswered === -1
    );

    const allDone = questions.length > 0 && questions.every((q) => !!sessionMap[q.id]);

    const activeQuestion = questions[activeIndex] ?? null;
    const activeSession  = activeQuestion ? (sessionMap[activeQuestion.id] ?? null) : null;

    // After submitting, auto-advance if the "Next" button isn't needed
    useEffect(() => {
        if (!activeSession) return; // not yet answered
        // If there's a next unanswered question, stay put so user can click Next
    }, [activeSession]);

    function goToNext() {
        const next = questions.findIndex((q, i) => i > activeIndex && !sessionMap[q.id]);
        if (next !== -1) setActiveIndex(next);
    }

    const hasNext =
        activeSession &&
        questions.findIndex((q, i) => i > activeIndex && !sessionMap[q.id]) !== -1;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="relative min-h-screen bg-[#050b1a] text-slate-200 overflow-hidden font-sans">
                {/* Ambient glow */}
                <div className="pointer-events-none absolute inset-0 -z-0">
                    <div className="absolute -top-40 -left-32 w-[480px] h-[480px] rounded-full bg-blue-600/10 blur-[120px]" />
                    <div className="absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full bg-cyan-500/5 blur-[100px]" />
                </div>

                <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:px-12 space-y-10">
                    {/* Header */}
                    <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                Welcome back, {auth.user.name.split(' ')[0]}!
                            </h1>
                            <p className="text-slate-400 mt-2">
                                Three questions. One minute each. Climb the board and keep your streak alive.
                            </p>
                        </div>

                        {/* User stat chips */}
                        <div className="flex gap-3 flex-wrap">
                            <div className="flex items-center gap-2 rounded-xl bg-[#0a101f] border border-blue-900/30 px-4 py-2 text-sm">
                                <span className="text-slate-400">Total Score</span>
                                <span className="font-bold text-blue-400 font-mono">{userTotalScore.toLocaleString()}</span>
                            </div>
                            {userRank && (
                                <div className="flex items-center gap-2 rounded-xl bg-[#0a101f] border border-blue-900/30 px-4 py-2 text-sm">
                                    <span className="text-slate-400">Rank</span>
                                    <span className="font-bold text-cyan-400 font-mono">#{userRank}</span>
                                </div>
                            )}
                        </div>
                    </header>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* ── Left: Quiz area ── */}
                        <div className="lg:col-span-2">
                            {questions.length === 0 ? (
                                <div className="bg-[#0a101f] border border-blue-900/30 rounded-3xl p-8 shadow-2xl flex items-center justify-center aspect-video text-slate-500 italic">
                                    No questions scheduled for today — check back soon!
                                </div>
                            ) : allDone ? (
                                <AllDoneCard sessions={sessionMap} questions={questions} />
                            ) : (
                                <QuestionCard
                                    key={activeQuestion?.id}
                                    question={activeQuestion}
                                    questionIndex={activeIndex}
                                    totalQuestions={questions.length}
                                    session={activeSession}
                                    onNext={hasNext ? goToNext : null}
                                    isStarted={sessionStarted}
                                    onStart={() => setSessionStarted(true)}
                                />
                            )}
                        </div>

                        {/* ── Right: Leaderboard ── */}
                        <div className="bg-[#0a101f] border border-blue-900/30 rounded-3xl p-6 shadow-2xl flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-white">Leaderboard</h3>
                                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0
                                        001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42
                                        3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0
                                        01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946
                                        3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>

                            <div className="space-y-3 flex-grow">
                                {leaderboard.length > 0 ? (
                                    leaderboard.map((entry) => {
                                        const isMe = entry.name === auth.user.name;
                                        return (
                                            <div
                                                key={entry.rank}
                                                className={`flex items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-300 ${
                                                    isMe
                                                        ? 'bg-blue-600/10 border border-blue-700/30'
                                                        : 'hover:bg-blue-900/20'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                                                        entry.rank === 1
                                                            ? 'bg-yellow-500/20 text-yellow-400'
                                                            : entry.rank <= 3
                                                            ? 'bg-cyan-500/10 text-cyan-400'
                                                            : 'bg-slate-800 text-slate-500'
                                                    }`}>
                                                        {entry.rank}
                                                    </span>
                                                    <div>
                                                        <div className={`text-sm font-medium leading-tight ${isMe ? 'text-blue-300' : 'text-white'}`}>
                                                            {entry.name}{isMe && ' (you)'}
                                                        </div>
                                                        <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                                                            {entry.total} attempt{entry.total !== 1 ? 's' : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-sm font-mono font-bold text-blue-400">
                                                    {entry.points.toLocaleString()}
                                                </span>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-center text-slate-500 italic text-sm py-8">
                                        No scores yet — be the first!
                                    </p>
                                )}
                            </div>

                            <Link
                                href={route('dashboard')}
                                className="mt-6 flex items-center justify-between w-full px-4 py-3 rounded-xl bg-slate-900/50 text-slate-400 text-sm font-semibold hover:text-white hover:bg-slate-800 transition-all group"
                            >
                                Refresh leaderboard
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}