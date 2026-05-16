import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

const User = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

const Lock = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

const Mail = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
);

const ArrowRight = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
);

const Eye = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
);

const EyeOff = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
);

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const passwordsMatch = data.password === data.password_confirmation;
    const showMatchError = data.password_confirmation.length > 0 && !passwordsMatch;

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="p-[1px] rounded-3xl bg-gradient-to-b from-blue-500/30 to-transparent shadow-2xl">
                <div className="bg-[#0a101f] border border-blue-900/30 rounded-[calc(1.5rem-1px)] p-8">

                    <div className="mb-8 text-center">
                        <h1 className="text-2xl font-bold text-white tracking-tight">Create your account</h1>
                        <p className="text-slate-400 text-sm mt-1">Start your first daily quest today</p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        {/* Name Field */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300 flex items-center gap-2" htmlFor="name">
                                <User className="w-4 h-4 text-blue-400" /> Name
                            </label>
                            <input id="name" value={data.name} className="w-full bg-[#050b1a] border border-blue-900/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" placeholder="Your full name" onChange={(e) => setData('name', e.target.value)} required />
                            <InputError message={errors.name} />
                        </div>

                        {/* Email Field */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300 flex items-center gap-2" htmlFor="email">
                                <Mail className="w-4 h-4 text-blue-400" /> Email
                            </label>
                            <input id="email" type="email" value={data.email} className="w-full bg-[#050b1a] border border-blue-900/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" placeholder="name@example.com" onChange={(e) => setData('email', e.target.value)} required />
                            <InputError message={errors.email} />
                        </div>

                        {/* Password Field with Toggle */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300 flex items-center gap-2" htmlFor="password">
                                <Lock className="w-4 h-4 text-blue-400" /> Password
                            </label>
                            <div className="relative group">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    className="w-full bg-[#050b1a] border border-blue-900/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all pr-12"
                                    placeholder="••••••••"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-blue-400 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            <InputError message={errors.password} />
                        </div>

                        {/* Confirm Password Field with Toggle & Match Check */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300 flex items-center gap-2" htmlFor="password_confirmation">
                                <Lock className="w-4 h-4 text-blue-400" /> Confirm Password
                            </label>
                            <div className="relative group">
                                <input
                                    id="password_confirmation"
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password_confirmation}
                                    className={`w-full bg-[#050b1a] border ${showMatchError ? 'border-red-500/50 focus:ring-red-500/50' :
                                        passwordsMatch && data.password_confirmation.length > 0 ? 'border-cyan-400/50 focus:ring-cyan-400/50' : 'border-blue-900/50 focus:ring-blue-500/50'
                                        } rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 transition-all pr-12`}
                                    placeholder="••••••••"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-blue-400 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {/* Validation Feedback */}
                            {showMatchError && (
                                <p className="text-xs text-red-400 mt-1 italic flex items-center gap-1">
                                    <span className="text-[10px]">●</span> Passwords do not match
                                </p>
                            )}
                            {!showMatchError && data.password_confirmation.length > 0 && (
                                <span></span>
                            )}
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <button disabled={processing} className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                            {processing ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Create account <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-500">
                        Already registered?{' '}
                        <Link href={route('login')} className="text-blue-400 font-semibold hover:underline">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}