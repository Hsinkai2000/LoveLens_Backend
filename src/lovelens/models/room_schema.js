const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const roomSchema = new Schema({
    name: String,
    room_code: String,
    owner: String,
    pictures: [String],
    num_of_pics: Number,
    creation_date: Date
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
