import { CalendarIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid'
import { useAuthStore } from '../../hooks/useAuthStore'

export const Navbar = () => {

    const { startLogout, user } = useAuthStore();

    return (
        <div className='bg-violet-100 m-3 rounded-full p-4 flex justify-between items-center'>
            <div className='flex items-center gap-2'>
                <CalendarIcon className="ml-4 h-6 w-6 text-violet-700" />
                <span className='text-violet-700 font-semibold'>{ user.name }</span>
            </div>
            <button
                type="button"
                onClick={ startLogout }
                className="px-3 py-1.5 font-medium text-sm rounded-full bg-violet-700 hover:bg-violet-800 text-white focus:ring-2 focus:ring-violet-400  flex items-center gap-1">
                <ArrowLeftStartOnRectangleIcon className="h-6 w-6 text-white" />
                Logout
            </button>
        </div>
    )
}
