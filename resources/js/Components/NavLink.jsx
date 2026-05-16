import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-blue-500 text-slate-900 dark:text-white focus:border-blue-400'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-blue-400/50 dark:hover:border-blue-500/50 focus:text-slate-900 dark:focus:text-white focus:border-gray-300') +
                className
            }
        >
            {children}
        </Link>
    );
}