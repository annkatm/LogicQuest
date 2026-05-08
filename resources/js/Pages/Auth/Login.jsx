import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Zap, Lock, Mail } from 'lucide-react';

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

            <div className="min-h-screen bg-white text-slate-900 relative">
                {/* Background soft accents */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-50/50 rounded-full blur-3xl -z-0" />

                <div className="relative z-10 flex flex-col items-center justify-center px-6 py-12">

                    {/* Header/Logo Section */}
                    <div className="mb-8 text-center">
                        {/* <div className="inline-flex w-12 h-12 rounded-xl bg-indigo-600 items-center justify-center shadow-lg shadow-indigo-200 mb-4">
                            <Zap className="w-7 h-7 text-white" />
                        </div> */}
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome Back</h1>
                        <p className="text-slate-500 mt-2">Log in to continue your streak.</p>
                    </div>

                    {/* Login Card */}
                    <div className="w-full max-w-md bg-white border border-slate-100 rounded-2xl p-8 shadow-xl shadow-slate-100">

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 p-3 rounded-lg border border-green-100">
                                {status}
                            </div>
                        )}

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <InputLabel htmlFor="email" value="Email" className="text-slate-700 font-medium mb-1" />
                                <div className="relative">

                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="name@example.com"
                                    />
                                </div>

                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            {/* Password Field */}
                            <div>
                                <div className="flex items-center justify-between">
                                    <InputLabel htmlFor="password" value="Password" className="text-slate-700 font-medium mb-1" />
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-xs text-indigo-600 hover:text-indigo-500 font-medium underline-offset-4 hover:underline"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            {/* Remember Me */}
                            <div className="block">
                                <label className="flex items-center cursor-pointer group">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="rounded border-slate-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                    />
                                    <span className="ms-2 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                                        Keep me logged in
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <PrimaryButton
                                    className="w-full justify-center py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]"
                                    disabled={processing}
                                >
                                    {processing ? 'Signing in...' : 'Sign In'}
                                </PrimaryButton>
                            </div>
                        </form>

                        {/* Register Link */}
                        <div className="mt-8 text-center border-t border-slate-50 pt-6">
                            <p className="text-sm text-slate-500">
                                Don't have an account?{' '}
                                <Link href={route('register')} className="text-indigo-600 font-bold hover:text-indigo-500">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}