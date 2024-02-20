import { useSelector, useDispatch } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';
import calendarApi from './../api/calendarApi';
import { DateEventsParse } from '../helpers';

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth )

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent(calendarEvent) )
    }

    const startSavingEvent = async ( calendarEvent ) => {
        
        if( calendarEvent.id )  {
            // Editing an existing event
            dispatch( onUpdateEvent({ ...calendarEvent }));
        } else {
            // Creating new event
            const { data } = await calendarApi.post( '/events', calendarEvent);

            console.log({data});

            dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) )
        }
    }

    const startDeleteEvent = () => {
        dispatch( onDeleteEvent() );
    }

    const startLoadingEvents = async() => {

        try {
            
            const { data } = await calendarApi.get('/events');
            
            const events = DateEventsParse( data.events );
            dispatch( onLoadEvents( events ) );

        } catch (error) {
            console.log(error)
        }

    }

    return {
        //* Properties
        events,
        activeEvent,

        //* Methods
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent,
        startLoadingEvents
    }

}