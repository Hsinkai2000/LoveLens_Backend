var express = require('express');
var router = express.Router();
const fbAuth = require('../../../controller/fbAuth.js');
const Rooms = require('../../../models/room_schema.js');

router.get('/:uid', fbAuth, async function (req, res, next) {
    if (req.user) {
        try {
            var uid = req.params.uid;
            const rooms = await Rooms.find().where({ owner: uid });
            res.status(200).json({ rooms: rooms });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
});

module.exports = router;
