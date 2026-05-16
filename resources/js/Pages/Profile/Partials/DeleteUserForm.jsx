import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm() {
    const [confirming, setConfirming] = useState(false);
    const passwordInput = useRef();

    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({
        password: '',
    });

    const confirmDeletion = () => setConfirming(true);

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError:   () => passwordInput.current.focus(),
            onFinish:  () => reset(),
        });
    };

    const closeModal = () => {
        setConfirming(false);
        clearErrors();
        reset();
    };

    return (
        <div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Once your account is deleted, all of its resources and data will be permanently erased.
                This action <span className="text-red-400 font-semibold">cannot be undone</span>.
            </p>

            <button
                onClick={confirmDeletion}
                className="bg-red-600/10 border border-red-500/40 text-red-400 font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-red-600 hover:text-white hover:border-transparent hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
                Delete My Account
            </button>

            <Modal show={confirming} onClose={closeModal}>
                <form onSubmit={deleteUser} className="bg-white dark:bg-[#0a101f] rounded-2xl p-8 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                        </div>
                        <h2 className="text-slate-900 dark:text-white font-bold text-lg transition-colors duration-300">Confirm Account Deletion</h2>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 transition-colors duration-300">
                        This is a permanent action. All your progress, streaks, and achievements will be lost forever.
                        Enter your password to confirm.
                    </p>

                    <div className="space-y-1.5 mb-6">
                        <label htmlFor="delete-password" className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Your Password
                        </label>
                        <input
                            id="delete-password"
                            type="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full bg-slate-50 dark:bg-[#050b1a] border border-red-200 dark:border-red-900/50 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500/40 transition-all text-sm"
                            placeholder="••••••••"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-blue-900/30 hover:bg-slate-100 dark:hover:bg-blue-900/20 hover:text-slate-900 dark:hover:text-white transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-5 py-2.5 rounded-xl text-sm font-bold bg-red-600 text-white hover:bg-red-500 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                        >
                            {processing ? 'Deleting…' : 'Yes, Delete Account'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
