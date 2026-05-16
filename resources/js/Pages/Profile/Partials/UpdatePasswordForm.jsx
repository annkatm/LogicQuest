import InputError from '@/Components/InputError';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm() {
    const passwordInput         = useRef();
    const currentPasswordInput  = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password:      '',
        password:              '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errs) => {
                if (errs.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }
                if (errs.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    const fieldClass = "w-full bg-white dark:bg-[#050b1a] border border-slate-300 dark:border-blue-900/50 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm font-mono tracking-widest";
    const labelClass = "text-xs font-bold text-slate-400 uppercase tracking-widest";

    return (
        <form onSubmit={updatePassword} className="space-y-5">
            <div className="space-y-1.5">
                <label htmlFor="current_password" className={labelClass}>Current Password</label>
                <input
                    id="current_password"
                    ref={currentPasswordInput}
                    type="password"
                    value={data.current_password}
                    onChange={(e) => setData('current_password', e.target.value)}
                    autoComplete="current-password"
                    className={fieldClass}
                    placeholder="••••••••"
                />
                <InputError message={errors.current_password} />
            </div>

            <div className="space-y-1.5">
                <label htmlFor="new_password" className={labelClass}>New Password</label>
                <input
                    id="new_password"
                    ref={passwordInput}
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    autoComplete="new-password"
                    className={fieldClass}
                    placeholder="••••••••"
                />
                <InputError message={errors.password} />
            </div>

            <div className="space-y-1.5">
                <label htmlFor="password_confirmation" className={labelClass}>Confirm New Password</label>
                <input
                    id="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    autoComplete="new-password"
                    className={fieldClass}
                    placeholder="••••••••"
                />
                <InputError message={errors.password_confirmation} />
            </div>

            <div className="flex items-center gap-4 pt-2">
                <button
                    type="submit"
                    disabled={processing}
                    className="bg-gradient-to-r from-cyan-600 to-blue-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg"
                >
                    {processing ? 'Updating…' : 'Update Password'}
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
                        Updated
                    </span>
                </Transition>
            </div>
        </form>
    );
}
