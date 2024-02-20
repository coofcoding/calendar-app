import { Calendar } from 'react-big-calendar';
import './Calendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { localizer } from '../../helpers';
import { Navbar, CalendarEvent, CalendarModal, FabDelete, FabAddNew } from '../';
import { useState } from 'react';
import { useUiStore } from '../../hooks/useUiStore';
import { useAuthStore, useCalendarStore } from '../../hooks';
import { useEffect } from 'react';

export const CalendarPage = () => {
  
  const { user } = useAuthStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { openDateModal } = useUiStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'day');

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );
    
    const style = {
      backgroundColor: isMyEvent ? '#c9a3ff' : '#b0b0b0',
      color: 'black',
      opacity: '0.8',
      borderRadius: '4px',
      border: '2px solid #00000040',
      fontSize: '13px',
    };

    return {
      style
    };

  }

  const handleDobleClick = (event) => {
    openDateModal()
  }

  const handleClick = (event) => {
    setActiveEvent( event )
  }

  const ViewChanged = (event) => {
    localStorage.setItem('lastView', event);
  }

  useEffect(() => {

    startLoadingEvents();
  
  }, []);
  

  return (
    <>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 105px)' }}
        eventPropGetter={ eventStyleGetter }
        components={ {event: CalendarEvent} }
        onDoubleClickEvent={ handleDobleClick }
        onSelectEvent={ handleClick }
        onView={ ViewChanged }
      />

      <CalendarModal/>
      <FabAddNew/>
      <FabDelete/>
    </>

  )
}
