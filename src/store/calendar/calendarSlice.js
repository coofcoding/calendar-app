import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns';

const tempEvent = {
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
    activeEvents: null
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
    }
});

export const { } = calendarSlice.actions