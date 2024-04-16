var express = require('express');
var router = express.Router();
const fbAuth = require('../../../controller/fbAuth.js');
const Rooms = require('../../../models/room_schema.js');
const Image = require('../../../models/image_schema.js');

const deleteImage = async (room_code, imageURL) => {
    try {
        //find image with imageURL
        const image = Image.findOne({ imageURL: imageURL });
        console.log('image: ' + image);
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
            await manageOutput(res, result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
});

module.exports = router;
