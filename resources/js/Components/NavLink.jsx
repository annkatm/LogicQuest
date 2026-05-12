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
                    ? 'border-blue-500 text-white focus:border-blue-400'
                    : 'border-transparent text-slate-400 hover:text-white hover:border-blue-500/50 focus:text-white focus:border-gray-300') +
                className
            }
        >
            {children}
        </Link>
    );
}