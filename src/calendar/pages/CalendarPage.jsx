import { Calendar } from 'react-big-calendar';
import './Calendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { localizer } from '../../helpers';
import { Navbar, CalendarEvent, CalendarModal } from '../';
import { useState } from 'react';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks';


export const CalendarPage = () => {
  
  const { events, setActiveEvent } = useCalendarStore();
  const { openDateModal } = useUiStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'day');

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    
    const style = {
      backgroundColor: '#3cfa5d',
      color: 'black',
      opacity: '0.8',
      borderRadius: '0px'
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
    </>

  )
}
