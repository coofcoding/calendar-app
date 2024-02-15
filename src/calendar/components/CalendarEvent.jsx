
export const CalendarEvent = ({ event }) => {

    const { title, user } = event;


    return (
        <div>
            <h4 className="font-bold">{ ` ${ title } ` }</h4>
            <span className="text-sm italic">{ `- ${ user.name } ` }</span>
        </div>
    )
}
