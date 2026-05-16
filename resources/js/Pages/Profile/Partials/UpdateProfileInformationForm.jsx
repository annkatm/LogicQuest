import InputError from '@/Components/InputError';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name:  user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <form onSubmit={submit} className="space-y-5">
            {/* Name */}
            <div className="space-y-1.5">
                <label htmlFor="profile-name" className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Display Name
                </label>
                <input
                    id="profile-name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                    autoComplete="name"
                    className="w-full bg-white dark:bg-[#050b1a] border border-slate-300 dark:border-blue-900/50 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm"
                    placeholder="Your full name"
                />
                <InputError message={errors.name} />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
                <label htmlFor="profile-email" className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Email Address
                </label>
                <input
                    id="profile-email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    required
                    autoComplete="username"
                    className="w-full bg-white dark:bg-[#050b1a] border border-slate-300 dark:border-blue-900/50 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm"
                    placeholder="name@example.com"
                />
                <InputError message={errors.email} />
            </div>

            {/* Email verification warning */}
            {mustVerifyEmail && user.email_verified_at === null && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-4 py-3">
                    <p className="text-xs text-yellow-400">
                        Your email is unverified.{' '}
                        <Link
                            href={route('verification.send')}
                            method="post"
                            as="button"
                            className="font-bold underline hover:text-yellow-300 transition-colors"
                        >
                            Resend verification link
                        </Link>
                    </p>
                    {status === 'verification-link-sent' && (
                        <p className="text-xs text-green-400 mt-1">Verification link sent!</p>
                    )}
                </div>
            )}

            {/* Save */}
            <div className="flex items-center gap-4 pt-2">
                <button
                    type="submit"
                    disabled={processing}
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg"
                >
                    {processing ? 'Saving…' : 'Save Changes'}
                </button>

                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out duration-300"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <span className="text-xs text-cyan-400 font-semibold flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                        Saved
                    </span>
                </Transition>
            </div>
        </form>
    );
}
