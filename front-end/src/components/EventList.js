import React from 'react';
import EventItem from './EventItem';

const EventList = ({ events, onEventDelete, onToggleReminder, onEventEdit }) => {
    return (
        <div className="event-list">
            {events.map(event => (
                <EventItem
                    key={event._id}
                    event={event}
                    onToggleReminder={onToggleReminder}
                    onEventDelete={onEventDelete}
                    onEventEdit={onEventEdit}
                />
            ))}
        </div>
    );
};

export default EventList;
