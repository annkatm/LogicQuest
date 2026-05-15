import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
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
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 p-3 rounded-lg">
                    {status}
                </div>
            )}

            {/* The Login Card - Fixed to Dark Style */}
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
                                className="w-full bg-[#050b1a] border border-blue-900/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                placeholder="name@example.com"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 flex items-center gap-2" htmlFor="password">
                                <Lock className="w-4 h-4 text-blue-400" /> Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                className="w-full bg-[#050b1a] border border-blue-900/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                placeholder="••••••••"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="border-blue-900 bg-[#050b1a] text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ms-2 text-sm text-slate-400">Remember my session</span>
                        </div>

                        <button
                            disabled={processing}
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {processing ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Log in <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-500">
                        Don't have an account?{' '}
                        <Link href={route('register')} className="text-blue-400 font-semibold hover:underline">
                            Register now
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}