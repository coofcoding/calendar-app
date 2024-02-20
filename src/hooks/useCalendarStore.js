import { useSelector, useDispatch } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";
import calendarApi from "./../api/calendarApi";
import { DateEventsParse } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);
  const { user } = useSelector(state => state.auth);

  const setActiveEvent = calendarEvent => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async calendarEvent => {
    try {
      if (calendarEvent.id) {
        // Editing an exist event

        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      } else {
        // Creating new event
        const { data } = await calendarApi.post("/events", calendarEvent);

        console.log({ data });

        dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error to save', error.response.data.msg, 'error');
    }
  };

  const startDeleteEvent = () => {
    dispatch(onDeleteEvent());
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");

      const events = DateEventsParse(data.events);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //* Properties
    events,
    activeEvent,

    //* Methods
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent,
    startLoadingEvents,
  };
};
