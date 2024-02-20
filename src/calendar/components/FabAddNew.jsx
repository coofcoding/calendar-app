import { PlusIcon } from '@heroicons/react/24/solid';
import { useCalendarStore, useUiStore } from '../../hooks';
import { addHours } from 'date-fns';

export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleModalClick = () => {

        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafa',
            user: {
                id: '123',
                name: 'Kevin'
            }
        })

        openDateModal();

    }

    return (
        <button
            className="rounded-full bg-violet-500 fixed bottom-6 right-6 text-md p-3 hover:bg-violet-700 transition-all duration-200 hover:scale-105"
            onClick={handleModalClick}
        >
            <PlusIcon className='h-6 w-6 text-white' />
        </button>
    )
}
