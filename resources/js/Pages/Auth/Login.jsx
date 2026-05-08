import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const Lock = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

const Mail = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
);

const ArrowRight = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
);

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-[#050b1a] text-slate-200 relative overflow-hidden font-sans flex flex-col justify-center items-center px-6">
            <Head title="Log in" />

            {/* Background Glows - Matching the Welcome style */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-0" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] -z-0" />

            {/* Logo Link back to Welcome */}
            <Link href="/" className="relative z-10 flex items-center gap-2 mb-8 group">
                <span className="text-2xl font-bold tracking-tight text-white">LogicQuest</span>
            </Link>

            <div className="relative z-10 w-full max-w-md">
                {/* Status Message */}
                {status && (
                    <div className="mb-4 text-sm font-medium text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 p-3 rounded-lg">
                        {status}
                    </div>
                )}

                <div className="p-[1px] rounded-3xl bg-gradient-to-b from-blue-500/30 to-transparent shadow-2xl">
                    <div className="bg-[#0a101f] border border-blue-900/30 rounded-[calc(1.5rem-1px)] p-8">
                        <div className="mb-8 text-center">
                            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
                            <p className="text-slate-400 text-sm mt-1">Log in to continue your streak</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300 flex items-center gap-2" htmlFor="email">
                                    <Mail className="w-4 h-4 text-blue-400" /> Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    className="w-full bg-[#050b1a] border border-blue-900/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                    placeholder="name@example.com"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2" htmlFor="password">
                                        <Lock className="w-4 h-4 text-blue-400" /> Password
                                    </label>
                                    { /* canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-xs text-blue-400 hover:text-cyan-400 transition-colors"
                                        >
                                            Forgot?
                                        </Link>
                                    ) */}
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    className="w-full bg-[#050b1a] border border-blue-900/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="border-blue-900 bg-[#050b1a] text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ms-2 text-sm text-slate-400">Remember my session</span>
                            </div>

                            {/* Submit Button */}
                            <button
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-4 rounded-xl shadow-[0_10px_20px_-10px_rgba(37,99,235,0.5)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Log in <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm text-slate-500">
                            Don't have an account?{' '}
                            <Link href={route('register')} className="text-blue-400 font-semibold hover:underline">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <p className="mt-8 text-slate-600 text-xs uppercase tracking-widest">
                LogicQuest v1.0
            </p>
        </div>
    );
}
