var express = require("express");
var router = express.Router();
const {
  getAuth,
  verifyIdToken,
} = require("firebase/auth");
var { verifyID } = require("../../../controller/fbAuth.js");
const fbAuth = require("../../../controller/fbAuth.js");
const Images = require("../../../models/image_schema.js");
const { firebase } = require("../../../config/fbConfig.js");
const {ref, getStorage} = require("firebase/storage");
const auth = getAuth();
//const wedpic = require("./wed1.png");

function getRandomInt() {
  return Math.floor(Math.random() * 9999);
}

router.post("/", fbAuth, function async (req, res, next) {
    console.log("start sending image" + req.user);
    var { image } = req.body;
    const selectedFile = image
    const storage = getStorage()
    const storageRef = ref(storage)
    const fileRef = storageRef.child(selectedFile)

    fileRef.put(selectedFile).then((snapshot)=>{
        snapshot.ref.getDownloadURL().then((downloadURL)=>{
            console.log(downloadURL);
            setImgUrl(downloadURL);
        })
    })
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
});

module.exports = router;
