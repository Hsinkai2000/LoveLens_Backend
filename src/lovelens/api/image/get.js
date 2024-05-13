var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Room = require('../../../models/room_schema');
const Image = require('../../../models/image_schema');

const getRoom = async (room_code) => {
    return new Promise((resolve, reject) => {
        var rooms = Room.findOne({ room_code: room_code })
            .exec()
            .then((rooms) => {
                resolve(rooms);
            })
            .catch(reject);
    });
};

const getPictureUrl = async (pictureID) => {
    return new Promise((resolve, reject) => {
        Image.findById({ _id: pictureID })
            .exec()
            .then(({ imageURL }) => {
                resolve(imageURL);
            })
            .catch(reject);
    });
};

const convertToUrl = async (pictures) => {
    var urls = [];
    try {
        for (pictureID of pictures) {
            var picURL = '';
            try {
                picURL = await getPictureUrl(pictureID);
            } catch (error) {}
            urls.push(picURL);
        }
        return urls;
    } catch (error) {}
};

router.get('/:room_code', async function (req, res, next) {
    try {
        var room_code = req.params.room_code;
        const room = await getRoom(room_code);
        var { pictures } = room;
        try {
            var pictureURL = await convertToUrl(pictures);
            res.status(200).json({ room: pictureURL });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    } catch (error) {
        console.log('no room found');
        return res.status(500).json({ error: 'no room found' });
    }
});

module.exports = router;
