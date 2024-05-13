var express = require('express');
var router = express.Router();
const fbAuth = require('../../controller/fbAuth.js');
const Rooms = require('../../models/room_schema.js');
const Image = require('../../models/image_schema.js');
const Room = require('../../models/room_schema.js');

const deleteImageFromImages = async (imageID) => {
    try {
        let result = await Image.deleteOne({ _id: imageID })
            .exec()
            .then((result) => {
                return result;
            });
        return result.deletedCount;
    } catch (err) {
        throw err;
    }
};

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

const findRoom = async (room_code) => {
    try {
        return await Room.findOne({
            room_code: room_code
        })
            .exec()
            .then((room) => {
                return room;
            });
    } catch (err) {
        throw err;
    }
};

const deleteImageFromRoom = async (imageID, room_code) => {
    try {
        const { pictures } = await findRoom(room_code);

        const newPictures = pictures.filter(function (id) {
            return id != imageID;
        });

        const updateParams = { pictures: newPictures };
        const result = await Room.updateOne(
            { room_code: room_code },
            updateParams,
            {
                new: true
            }
        )
            .exec()
            .then((result) => {
                return result;
            });
        return result;
    } catch (err) {
        throw err;
    }
};

const getImage = async (imageURL) => {
    try {
        //find image with imageURL
        const image = await Image.findOne({
            imageURL: imageURL
        }).exec();
        return image._id;
    } catch (err) {
        throw err;
    }
};

const deleteImage = async (room_code, imageURL) => {
    try {
        const imageID = await getImage(imageURL);
        if ((await deleteImageFromImages(imageID)) > 0) {
            const { msg } = await deleteImageFromRoom(imageID, room_code);
            return msg.modifiedCount;
        } else {
            return 0;
        }
    } catch (err) {
        throw err;
    }
};

const manageOutput = (res, result) => {
    if (result == 1) {
        res.status(200).json({
            successful: 'image has been deleted'
        });
    } else if (result == 2) {
        res.status(500).json({
            unsuccessful: 'image not found or insucfficient permission'
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
            var { room_code, imageURL } = req.body;
            const result = await deleteImage(room_code, imageURL);
            if (result == 1) {
                res.status(200).json({ msg: result });
            } else {
                res.status(500).json({ error: error.message });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
});

module.exports = router;
