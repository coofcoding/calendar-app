import { TrashIcon } from '@heroicons/react/24/solid';
import { useCalendarStore } from '../../hooks';

export const FabDelete = () => {

    const { startDeleteEvent, activeEvent } = useCalendarStore();

    const handleDelete = () => {
        startDeleteEvent();
    }

    return (
        <button
            className={ `rounded-full bg-red-400 fixed bottom-6 left-6 text-md p-3 hover:bg-red-600 none transition-all duration-200 hover:scale-105 ${ !!activeEvent ? '' : 'hidden' }` }
            onClick={handleDelete}
            data-testid="btn-delete"
        >
            <TrashIcon className='h-6 w-6 text-white' />
        </button>
    ) 
}
