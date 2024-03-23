var express = require('express');
var router = express.Router();
const { getAuth, verifyIdToken } = require('firebase/auth');
var { verifyID } = require('../../../controller/fbAuth.js');
const fbAuth = require('../../../controller/fbAuth.js');
const Images = require('../../../models/image_schema.js');
const { firebase } = require('../../../config/fbConfig.js');
const { ref, getStorage } = require('firebase/storage');
const auth = getAuth();
var multer = require('multer');
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
    function async(req, res, next) {
        // var { image } = req.file;
        console.log('here');
        var response = '<a href="/">Home</a><br>';
        response += 'Files uploaded successfully.<br>';
        response += `<img src="${req.file.path}" /><br>`;
        //return res.send(response);

        const selectedFile = req.file;

        const storage = getStorage();
        const fileRef = ref(storage, req.file.path);
        console.log("Fileref: " + fileRef)

        fileRef.put(selectedFile).then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log(downloadURL);
            setImgUrl(downloadURL);
          });
        });

        return "into firebase liao"


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