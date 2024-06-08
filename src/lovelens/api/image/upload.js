var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const {
    ref,
    getStorage,
    uploadBytes,
    getDownloadURL
} = require('firebase/storage');
var fs = require('fs');
var multer = require('multer');
const path = require('path');
const Image = require('../../models/image_schema.js');
const Room = require('../../models/room_schema.js');
const { updatePassword } = require('firebase/auth');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });

const uploadToStorage = (fileRef, metaData, blob) => {
    return uploadBytes(fileRef, blob, metaData);
};

const readFile = (imagePath, fileRef, metaData) => {
    return new Promise((resolve, reject) => {
        fs.readFile(imagePath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const blob = new Blob([data], { type: 'image/png' });
                uploadToStorage(fileRef, metaData, blob)
                    .then(() => resolve())
                    .catch(reject);
            }
        });
    });
};
const handleFBupload = (metaData, imagePath, fileRef) => {
    return new Promise((resolve, reject) => {
        readFile(imagePath, fileRef, metaData)
            .then(() => resolve())
            .catch(reject);
    });
};

const handleMongoImageURLUpload = (downloadURL, room_code) => {
    return new Promise((resolve, reject) => {
        const image = new Image({ imageURL: downloadURL });
        image
            .save()
            .then(async (image) => {
                var imageID = image._id;
                var room = await Room.findOne({
                    room_code: room_code
                }).exec();
                

                if (room.num_of_pics == null) {
                    room.num_of_pics = 0;
                }
                var updateParams = {
                    num_of_pics: room.num_of_pics + 1,
                    $push: { pictures: imageID }
                };
                var updateRoom = Room.findOneAndUpdate(
                    { room_code: room_code },
                    updateParams,
                    {
                        new: true
                    }
                );
                resolve(updateRoom.exec());
            })
            .catch(reject);
    });
};

router.post('/', upload.single('image'), async function (req, res, next) {
    const { room_code } = req.body;
    const metaData = {
        contentType: req.file.mimetype
    };
    const imagePath = path.join('upload/', req.file.originalname);
    const storage = getStorage();
    const fileRef = ref(storage, 'pictures/' + req.file.originalname);
    try {
        await handleFBupload(metaData, imagePath, fileRef);
        const imageURL = await getDownloadURL(fileRef);
        var room = await handleMongoImageURLUpload(imageURL, room_code);
        res.status(200).json({ imageURL: imageURL, room: room });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
