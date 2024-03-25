var express = require('express');
var router = express.Router();
const { getAuth, verifyIdToken } = require('firebase/auth');
var { verifyID } = require('../../../controller/fbAuth.js');
const fbAuth = require('../../../controller/fbAuth.js');
const Images = require('../../../models/image_schema.js');
const { firebase } = require('../../../config/fbConfig.js');
const {
    ref,
    getStorage,
    uploadBytes,
    getDownloadURL
} = require('firebase/storage');
const auth = getAuth();
var fs = require('fs');
var multer = require('multer');
const path = require('path');
const { matchedData } = require('express-validator');

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
const handle_upload = async (req, res, fileRef) => {
    const metaData = {
        contentType: req.file.mimetype
    };
    const imagePath = path.join('upload/', req.file.originalname);

    try {
        return new Promise((resolve, reject) => {
            readFile(imagePath, fileRef, metaData)
                .then(() => resolve())
                .catch(reject);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

router.post(
    '/',
    fbAuth,
    upload.single('image'),
    async function (req, res, next) {
        const storage = getStorage();
        const fileRef = ref(storage, 'pictures/' + req.file.originalname);
        await handle_upload(req, res, fileRef);
        const p = await getDownloadURL(fileRef);
        res.status(200).json({ url: p });
    }
);

module.exports = router;
