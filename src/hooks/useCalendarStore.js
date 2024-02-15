import { useSelector, useDispatch } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store';

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent(calendarEvent) )
    }

    const startSavingEvent = async ( calendarEvent ) => {
        
        if( calendarEvent._id )  {
            // Editing an existing event
            dispatch( onUpdateEvent({ ...calendarEvent }));
        } else {
            // Creating new event
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) )
        }
    }

    const startDeleteEvent = () => {
        dispatch( onDeleteEvent() );
    }

    return {
        //* Properties
        events,
        activeEvent,

        //* Methods
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent
    }

}