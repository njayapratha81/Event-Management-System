import React, { useState, useEffect } from 'react';
import moment from 'moment';

const EventItem = ({ event, onEventDelete, onToggleReminder, onEventEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(event.title);
    const [editedDate, setEditedDate] = useState(moment(event.date).format("YYYY-MM-DD"));
    const [rem, setRem] = useState("");

    useEffect(() => {
        setRem(event.reminder ? "Reminder On" : "");

        const today = moment().startOf('day');
        const eventDate = moment(event.date).startOf('day');
        if (today.isSame(eventDate) && event.reminder) {
            alert(`Today is the day of the event: ${event.title}`);
        }
    }, [event]);

    const handleEditClick = () => setIsEditing(true);

    const handleSaveClick = async () => {
        try {
            await onEventEdit(event._id, { title: editedTitle, date: editedDate });
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleCancelClick = () => {
        setEditedTitle(event.title);
        setEditedDate(moment(event.date).format("YYYY-MM-DD"));
        setIsEditing(false);
    };

    return (
        <div className="event-card">
            {event.imageUrl && <img src={`http://localhost:5000${event.imageUrl}`} alt="Event" style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />}
            <p className='rem-para'>{rem}</p>
            <div className="event-info">
                {isEditing ? (
                    <>
                        <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                        <input type="date" value={editedDate} onChange={(e) => setEditedDate(e.target.value)} />
                    </>
                ) : (
                    <>
                        <h3 className="event-title">{event.title}</h3>
                        <span className="event-date">{moment(event.date).format("MMMM Do YYYY")}</span>
                    </>
                )}
            </div>
            <div className="event-actions">
                {isEditing ? (
                    <>
                        <button onClick={handleSaveClick}>Save</button>
                        <button onClick={handleCancelClick}>Cancel</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => onToggleReminder(event._id)}>
                            {event.reminder ? 'Disable Reminder' : 'Enable Reminder'}
                        </button>
                        <button className='delete-btn' onClick={() => onEventDelete(event._id)}>Delete</button>
                        <button onClick={handleEditClick}>Edit</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default EventItem;

