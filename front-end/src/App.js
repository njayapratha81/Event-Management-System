import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventForm from './components/EventForm';
import EventItem from './components/EventItem';
import './App.css';

const App = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await axios.get('http://localhost:5000/api/events');
            setEvents(response.data);
        };
        fetchEvents();
    }, []);

    const onEventAdd = (newEvent) => {
        setEvents([...events, newEvent]);
    };

    const onEventDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/events/${id}`);
            setEvents(events.filter((event) => event._id !== id));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const onToggleReminder = async (id) => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/events/${id}/toggleReminder`);
            setEvents(events.map((event) => (event._id === id ? response.data : event)));
        } catch (error) {
            console.error('Error toggling reminder:', error);
        }
    };

    const onEventEdit = async (id, updatedEvent) => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/events/${id}`, updatedEvent);
            setEvents(events.map((event) => (event._id === id ? response.data : event)));
        } catch (error) {
            console.error('Error editing event:', error);
        }
    };

    return (
        <div className="App">
            <h1>Event Management</h1>
            <EventForm onEventAdd={onEventAdd} />
            <div className="event-list">
                {events.map((event) => (
                    <EventItem 
                        key={event._id} 
                        event={event} 
                        onEventDelete={onEventDelete} 
                        onToggleReminder={onToggleReminder} 
                        onEventEdit={onEventEdit} 
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
