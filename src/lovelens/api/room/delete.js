var express = require('express');
var router = express.Router();
const fbAuth = require('../../../controller/fbAuth.js');
const Rooms = require('../../../models/room_schema.js');
const deleteRoom = async (room_code, userID) => {
    try {
        const room = await Rooms.deleteOne()
            .where({
                owner: userID,
                room_code: room_code
            })
            .then((room) => {
                if (room.deletedCount > 0) {
                    return 1;
                } else {
                    return 2;
                }
            })
            .catch((error) => {
                throw error;
            });
        return room;
    } catch (err) {
        throw err;
    }
};

const manageOutput = (res, result) => {
    if (result == 1) {
        res.status(200).json({
            successful: 'room has been deleted'
        });
    } else if (result == 2) {
        res.status(500).json({
            unsuccessful: 'room not found or insucfficient permission'
        });
    } else {
        res.status(500).json({
            error: error
        });
    }
};

router.delete('/', fbAuth, async function (req, res, next) {
    if (req.user) {
        try {
            var { room_code } = req.body;
            const result = await deleteRoom(room_code, req.user);
            await manageOutput(res, result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
});

module.exports = router;
