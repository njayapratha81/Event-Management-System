const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    reminder: { type: Boolean, default: false },
    imageUrl: { type: String }
});

module.exports = mongoose.model('Event', eventSchema);
