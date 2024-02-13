import { Calendar } from 'react-big-calendar';
import './Calendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { localizer } from '../../helpers';
import { Navbar, CalendarEvent, CalendarModal } from '../';
import { useState } from 'react';

const events = [{
  title: 'boss birthdate',
  notes: 'we have to buy the cake',
  start: new Date(),
  end: addHours( new Date(), 2 ),
  bgColor: '#fafa',
  user: {
    _id: '123',
    name: 'Kevin'
  }
}]

export const CalendarPage = () => {

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
    console.log({ dobleClick: event })
  }

  const handleClick = (event) => {
    console.log({ click: event })
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
