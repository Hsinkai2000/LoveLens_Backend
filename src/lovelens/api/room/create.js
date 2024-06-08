var express = require('express');
var router = express.Router();
const fbAuth = require('../../controller/fbAuth.js');
const Rooms = require('../../models/room_schema.js');

function getRoomCode() {
    return Math.floor(Math.random() * 9999);
}

const setRoomDetails = (roomName, uid) => {
    var newRoom = new Rooms({
        name: roomName,
        room_code: getRoomCode(),
        owner: uid,
        pictures: [],
        num_of_pics: 0,
        creation_date: Date.now()
    });

    return newRoom;
};

router.post('/', fbAuth, async function (req, res, next) {
    if (req.user) {
        try {
            var { roomName } = req.body;
            var newRoom = setRoomDetails(roomName, req.user);
            await newRoom.save();
            res.status(200).json({ room: newRoom });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
});

module.exports = router;
