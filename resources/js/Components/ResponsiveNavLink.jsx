import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-400 focus:border-blue-600'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-blue-900/50 hover:bg-slate-50 dark:hover:bg-blue-900/10 hover:text-slate-800 dark:hover:text-white'
            } text-sm font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
