import React, { useState } from 'react';
import axios from 'axios';
import './EventForm.css';

const EventForm = ({ onEventAdd }) => {
    const [newEvent, setNewEvent] = useState({ title: '', date: '', reminder: false });
    const [image, setImage] = useState(null);

    const handleInputChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', newEvent.title);
        formData.append('date', newEvent.date);
        formData.append('reminder', newEvent.reminder);
        if (image) formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:5000/api/events', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            onEventAdd(response.data);
            setNewEvent({ title: '', date: '', reminder: false });
            setImage(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input type="text" name="title" value={newEvent.title} onChange={handleInputChange} required />
            
            <label>Date:</label>
            <input type="date" name="date" value={newEvent.date} onChange={handleInputChange} required />
            
            <label>Image:</label>
            <input type="file" onChange={handleImageChange} />
            
            <button type="submit">Add Event</button>
        </form>
    );
};

export default EventForm;

