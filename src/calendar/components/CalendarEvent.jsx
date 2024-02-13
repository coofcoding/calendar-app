
export const CalendarEvent = ({ event }) => {

    const { title, user } = event;

    return (
        <div>{ ` ${ title } - ${ user.name } ` }</div>
    )
}
