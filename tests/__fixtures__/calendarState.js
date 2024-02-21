export const events = [
    {
        id: '1',
        title: 'boss birthdate',
        notes: 'We have to buy the cake',
        start: new Date('2024-01-01 13:00:00'),
        start: new Date('2024-01-01 14:00:00'),
    },
    {
        id: '2',
        title: 'my birthdate',
        notes: 'I dont want a birthdate party',
        start: new Date('2024-13-10 00:00:00'),
        start: new Date('2024-13-10 23:59:59'),
    },
]

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
}

export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: null,
}

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: { ...events[0] },
}