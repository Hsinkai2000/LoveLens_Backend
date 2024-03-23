var express = require('express');
var router = express.Router();
const { getAuth, verifyIdToken } = require('firebase/auth');
var { verifyID } = require('../../../controller/fbAuth.js');
const fbAuth = require('../../../controller/fbAuth.js');
const Images = require('../../../models/image_schema.js');
const { firebase } = require('../../../config/fbConfig.js');
const { ref, getStorage, uploadBytes } = require('firebase/storage');
const auth = getAuth();
var multer = require('multer');
const path = require('path');
// var upload = multer({
//     dest: './routes/api/room/uploads/',
//     filename: file.originalname
// });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });

var fs = require('fs');
//const wedpic = require("./wed1.png");

function getRandomInt() {
    return Math.floor(Math.random() * 9999);
}

router.post(
    '/',
    fbAuth,
    upload.single('image'),
    async function (req, res, next) {
        // var { image } = req.file;
        const storage = getStorage();
        const fileRef = ref(storage, 'pictures/' + req.file.originalname);
        const metaData = {
            contentType: req.file.mimetype
        };

        const fs = require('fs');

        const imagePath = path.join('upload/', req.file.originalname); // Replace with your image path
        console.log(imagePath);
        fs.readFile(imagePath, async (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            // Convert the file data to a Blob object
            const blob = new Blob([data], { type: 'image/png' }); // Replace 'image/png' with the correct image type

            try {
                await uploadBytes(fileRef, blob, metaData);
                res.status(200).json({ image: req.file.originalname });
            } catch (error) {
                res.status(500).json({ erorr: error.message });
            }

            // Use the blob for further processing (e.g., upload to Firebase Storage)
            // ...
        });

        // const selectedFile = image;
        // const storage = getStorage();
        // const fileRef = ref(storage, "/images/hi.png");

        // fileRef.put(selectedFile).then((snapshot) => {
        //   snapshot.ref.getDownloadURL().then((downloadURL) => {
        //     console.log(downloadURL);
        //     setImgUrl(downloadURL);
        //   });
        // });
        //   console.log("start sending image" + req.user);
        //   var { imageUrl } = req.body;
        //   if (req.user) {
        //     var newImage = new Images({
        //       imageURL: imageUrl
        //     })

        //     try{
        //       newImage.save();
        //       res.status(200).json({ room: newImage });
        //     }catch (error){
        //       res.status(500).json({error: error.message});
        //     }

        //   }
    }
);

module.exports = router;
