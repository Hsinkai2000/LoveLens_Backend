var express = require("express");
var router = express.Router();
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  verifyIdToken,
} = require("firebase/auth");
var { verifyID } = require("../../controller/fbAuth.js");
const fbAuth = require("../../controller/fbAuth.js");
const Rooms = require("../../models/room_schema.js");
const auth = getAuth();

function getRandomInt() {
  return Math.floor(Math.random() * 9999);
}

router.post("/", fbAuth, function async (req, res, next) {
  console.log("LALALALALALA in create room" + req.user);
  var { roomName } = req.body;
  if (req.user) {
    var newRoom = new Rooms({
      name: roomName,
      room_code: getRandomInt(),
      owner: req.user,
      pictures: [],
      num_of_pics: 0,
      creation_date: Date.now()
    })

    try{
      newRoom.save();
      res.status(200).json({ room: newRoom });
    }catch (error){
      res.status(500).json({error: error.message});
    }    

  }
});

module.exports = router;
