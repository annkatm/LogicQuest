import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ auth, mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;

    const initials = user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <AuthenticatedLayout>
            <Head title="Edit Profile" />

            <div className="py-12 bg-[#f8fafc] dark:bg-[#050b1a] min-h-screen transition-colors duration-300">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">

                    {/* LEFT COLUMN: Identity Preview Card */}
                    <div className="w-full md:w-1/3">
                        <div className="bg-white dark:bg-[#0a101f] border border-slate-200/60 dark:border-blue-900/30 rounded-3xl p-8 sticky top-24 shadow-sm dark:shadow-2xl transition-colors duration-300">
                            <div className="flex flex-col items-center text-center">
                                {/* Avatar with change overlay */}
                                <div className="relative group cursor-pointer">
                                    <div className="w-28 h-28 rounded-full border-2 border-blue-500 p-1 shadow-[0_0_25px_rgba(59,130,246,0.35)] bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center select-none">
                                        <span className="text-4xl font-extrabold text-white">{initials}</span>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-[10px] text-white font-bold leading-tight text-center px-2">CHANGE<br/>AVATAR</span>
                                    </div>
                                </div>

                                <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight transition-colors duration-300">{user.name}</h2>
                                <p className="text-blue-400 font-mono text-xs tracking-widest mt-1">GRANDMASTER ANALYST</p>
                                <p className="text-slate-600 text-xs mt-1 truncate max-w-full">{user.email}</p>

                                <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent my-6" />

                                <p className="text-slate-500 text-xs leading-relaxed text-center">
                                    Changes to your identity details will reflect across the entire platform.
                                </p>

                                <Link
                                    href={route('profile.show')}
                                    className="mt-6 w-full py-3 bg-blue-600/10 border border-blue-500/50 text-blue-400 rounded-xl font-bold text-sm hover:bg-blue-600 hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all block text-center"
                                >
                                    ← VIEW PROFILE
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Edit Forms */}
                    <div className="w-full md:w-2/3 space-y-8">

                        {/* Identity Details */}
                        <div className="bg-white dark:bg-[#0a101f] border border-slate-200/60 dark:border-blue-900/30 rounded-3xl p-8 shadow-sm transition-colors duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wider transition-colors duration-300">Identity Details</h3>
                                    <p className="text-slate-500 text-xs">Update your display name and email address</p>
                                </div>
                            </div>
                            <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />
                        </div>

                        {/* Security Protocol */}
                        <div className="bg-white dark:bg-[#0a101f] border border-slate-200/60 dark:border-blue-900/30 rounded-3xl p-8 shadow-sm transition-colors duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wider transition-colors duration-300">Security Protocol</h3>
                                    <p className="text-slate-500 text-xs">Change your account password</p>
                                </div>
                            </div>
                            <UpdatePasswordForm />
                        </div>

                        {/* Danger Zone */}
                        <div className="bg-white dark:bg-[#0a101f] border border-red-200/60 dark:border-red-900/30 rounded-3xl p-8 shadow-sm transition-colors duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <polyline points="3 6 5 6 21 6"/>
                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                                        <path d="M10 11v6M14 11v6"/>
                                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-red-400 font-bold text-sm uppercase tracking-wider">Danger Zone</h3>
                                    <p className="text-slate-500 text-xs">Permanently delete your account</p>
                                </div>
                            </div>
                            <DeleteUserForm />
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}