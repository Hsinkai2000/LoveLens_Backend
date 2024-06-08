var express = require('express');
var router = express.Router();
const fbAuth = require('../../config/fbConfig.js');
const Image = require('../../models/image_schema.js');
const { getStorage, ref, deleteObject } = require('firebase/storage');
const Room = require('../../models/room_schema.js');

const deleteImageFromMongo = async (imageURL, room_code) => {
    try {
        //find image with imageURL
        var image = await Image.findOne({ imageURL: imageURL }).exec();
        var room = await Room.findOne({ room_code: room_code }).exec();
        console.log('room : ' + room.pictures);
        var pictures = room['pictures'];
        var indexOfImage = pictures.indexOf(image._id);

        pictures.splice(indexOfImage, 1);
        room.updateOne({
            pictures: pictures,
            num_of_pics: room.num_of_pics - 1
        }).exec();
        image.deleteOne().exec();
    } catch (err) {
        throw err;
    }
};

const deleteImageFromFirebaseStorage = async (imageURL) => {
    try {
        const storage = getStorage();
        const storageRef = ref(storage, imageURL);
        deleteObject(storageRef)
            .then(() => {
                console.log('object deleted from this url: ' + storageRef);
                return true;
            })
            .catch((error) => {
                throw error;
            });
    } catch (err) {
        throw err;
    }
};

router.delete('/', async function (req, res, next) {
    if (req.user) {
        try {
            var { room_code, imageURL } = req.body;
            await deleteImageFromMongo(imageURL, room_code);
            deleteImageFromFirebaseStorage(imageURL);
            res.status(200).json({ success: 'Image has been deleted' });
        } catch (error) {
            res.status(422).json({ error: error.message });
        }

        res.status(200).json({ success: 'Image has been deleted' });
    }
});

module.exports = router;
