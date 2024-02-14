import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns';

const tempEvent = {
    _id: new Date().getTime(),
    title: 'boss birthdate',
    notes: 'we have to buy the cake',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafa',
    user: {
        _id: '123',
        name: 'Kevin'
    }
}

const initialState = {
    events: [
        tempEvent
    ],
    activeEvent: null
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        onSetActiveEvent: ( state, { payload } ) => {
            state.activeEvent = payload;
        }
    }
});

export const { onSetActiveEvent } = calendarSlice.actions