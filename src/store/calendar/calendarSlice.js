import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

// * Template
// const tempEvent = {
//     id: new Date().getTime(),
//     title: 'boss birthdate',
//     notes: 'we have to buy the cake',
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgColor: '#fafa',
//     user: {
//         id: '123',
//         name: 'Kevin'
//     }
// }

const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
};

export const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event =>
                event.id === payload.id ? payload : event
            );
        },
        onDeleteEvent: state => {
            if (state.activeEvent) {
                state.events = state.events.filter(
                    event => event.id !== state.activeEvent.id
                );
                state.activeEvent = null;
            }
        },
        onLoadEvents: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            payload.forEach(event => {
                const exists = state.events.some(e => e.id === event.id);
                if (!exists) {
                    state.events.push(event);
                }
            });
        },
        onLogoutCalendar: state => {
            state.isLoadingEvents = true;
            state.events = [];
            state.activeEvent = null;
        },
    },
});

export const {
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onLoadEvents,
    onLogoutCalendar,
} = calendarSlice.actions;
